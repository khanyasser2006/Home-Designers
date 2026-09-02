import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  registeredUsers: [],
  remainingCooldown: 0,
});

const APP_SECURITY_SALT = 'aethel_sec_2026_';

// Native Web Crypto API SHA-256 Hashing
async function hashPassword(plainText, salt = APP_SECURITY_SALT) {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(salt + plainText);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  } catch (e) {
    // Fallback simple deterministic hash if Web Crypto is unavailable
    let hash = 0;
    const str = salt + plainText;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return 'fallback_' + Math.abs(hash).toString(16);
  }
}

// Authorized Admin Password Hashes (Salted with 'aethel_sec_2026_')
const ADMIN_AUTHORIZED_HASHES = new Set([
  'd9a01f12440b8bb9e40559ab13ee275ec824587620f112d14804111a10ec4304', // admin123
  '244fe1b31cd65aafb36a64f1f5408ad027eff70e3bcd54e2441bebc3aa9428c4', // admin@123
]);

const MAX_FAILED_ATTEMPTS = 5;
const COOLDOWN_DURATION_MS = 60000; // 60-second security cooldown

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('aethel_patron_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('aethel_registered_patrons');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [failedAttempts, setFailedAttempts] = useState(() => {
    try {
      return parseInt(sessionStorage.getItem('aethel_failed_login_attempts') || '0', 10);
    } catch (e) {
      return 0;
    }
  });

  const [lockoutUntil, setLockoutUntil] = useState(() => {
    try {
      return parseInt(sessionStorage.getItem('aethel_lockout_until') || '0', 10);
    } catch (e) {
      return 0;
    }
  });

  const [remainingCooldown, setRemainingCooldown] = useState(0);

  // Active Cooldown Countdown Timer
  useEffect(() => {
    const checkLockout = () => {
      const now = Date.now();
      if (lockoutUntil > now) {
        setRemainingCooldown(Math.ceil((lockoutUntil - now) / 1000));
      } else {
        setRemainingCooldown(0);
      }
    };

    checkLockout();
    const interval = setInterval(checkLockout, 1000);
    return () => clearInterval(interval);
  }, [lockoutUntil]);

  useEffect(() => {
    try {
      if (user) {
        // Strip sensitive fields before storing session user
        const sanitizedUser = { ...user };
        delete sanitizedUser.password;
        delete sanitizedUser.passwordHash;
        localStorage.setItem('aethel_patron_user', JSON.stringify(sanitizedUser));
      } else {
        localStorage.removeItem('aethel_patron_user');
      }
    } catch (e) {}
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('aethel_registered_patrons', JSON.stringify(registeredUsers));
    } catch (e) {}
  }, [registeredUsers]);

  const register = async ({ name, email, password, residenceInterest }) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanPass = password.trim();

    if (!cleanName || !cleanEmail || !cleanPass) {
      return { success: false, message: 'Please provide all required fields.' };
    }

    if (cleanPass.length < 6) {
      return { success: false, message: 'For security, password must be at least 6 characters.' };
    }

    const existing = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, message: 'An account with this email already exists. Please sign in instead.' };
    }

    // Cryptographically Hash Password with Per-User Salt
    const userSalt = `${APP_SECURITY_SALT}${cleanEmail}_`;
    const passwordHash = await hashPassword(cleanPass, userSalt);

    const newUser = {
      name: cleanName,
      email: cleanEmail,
      passwordHash, // ONLY store cryptographic hash in localStorage
      residenceInterest: residenceInterest || 'Mountain Villa',
      role: 'Private Patron',
      isAdmin: false,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      savedBlueprints: ['The Mountain Villa (Swiss Alps)', 'The Garden House (Kyoto)'],
      sampleCaseStatus: 'Curated & Ready for Dispatch',
    };

    const updated = [...registeredUsers, newUser];
    setRegisteredUsers(updated);
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const login = async ({ email, password }) => {
    const now = Date.now();
    if (lockoutUntil > now) {
      const secondsLeft = Math.ceil((lockoutUntil - now) / 1000);
      return {
        success: false,
        message: `Security Lockout Active: Too many failed attempts. Please wait ${secondsLeft}s before retrying.`,
      };
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    // Check Administrator Cryptographic Password Hash
    const enteredAdminHash = await hashPassword(cleanPass, APP_SECURITY_SALT);
    const isAdminEmail = cleanEmail === 'admin@gmail.com' || cleanEmail === 'admin@aethel.com';

    if (isAdminEmail && ADMIN_AUTHORIZED_HASHES.has(enteredAdminHash)) {
      setFailedAttempts(0);
      sessionStorage.removeItem('aethel_failed_login_attempts');
      sessionStorage.removeItem('aethel_lockout_until');

      const adminUser = {
        name: 'Kaelen Voss (Atelier Director)',
        email: cleanEmail,
        role: 'CMS Administrator',
        isAdmin: true,
      };
      setUser(adminUser);
      return { success: true, user: adminUser, isAdmin: true };
    }

    // Check Registered Patron Accounts
    const userSalt = `${APP_SECURITY_SALT}${cleanEmail}_`;
    const enteredPatronHash = await hashPassword(cleanPass, userSalt);

    const found = registeredUsers.find((u) => {
      if (u.email.toLowerCase() !== cleanEmail) return false;
      // Compare against stored hash, with backward-compatibility check for legacy unhashed accounts
      return u.passwordHash ? u.passwordHash === enteredPatronHash : u.password === cleanPass;
    });

    if (found) {
      setFailedAttempts(0);
      sessionStorage.removeItem('aethel_failed_login_attempts');
      sessionStorage.removeItem('aethel_lockout_until');

      // Auto-migrate legacy unhashed account to secure hashed format
      if (!found.passwordHash) {
        found.passwordHash = enteredPatronHash;
        delete found.password;
        setRegisteredUsers([...registeredUsers]);
      }

      setUser(found);
      return { success: true, user: found, isAdmin: false };
    }

    // Handle Failed Attempt & Rate Limiting Lockout
    const newFailed = failedAttempts + 1;
    setFailedAttempts(newFailed);
    sessionStorage.setItem('aethel_failed_login_attempts', String(newFailed));

    if (newFailed >= MAX_FAILED_ATTEMPTS) {
      const lockTime = Date.now() + COOLDOWN_DURATION_MS;
      setLockoutUntil(lockTime);
      sessionStorage.setItem('aethel_lockout_until', String(lockTime));
      return {
        success: false,
        message: 'Security Alert: Maximum attempts exceeded. 60-second cooldown initiated.',
      };
    }

    const attemptsRemaining = MAX_FAILED_ATTEMPTS - newFailed;
    return {
      success: false,
      message: `Invalid credentials. (${attemptsRemaining} attempt${attemptsRemaining === 1 ? '' : 's'} remaining before security lockout)`,
    };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        registeredUsers,
        remainingCooldown,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
