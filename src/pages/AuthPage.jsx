import React, { useState } from 'react';
import {
  Shield,
  User,
  Mail,
  Lock,
  CheckCircle2,
  ArrowRight,
  LogOut,
  FileText,
  Package,
  ArrowLeft,
  Settings,
} from 'lucide-react';
import { useAuth } from '../auth';
import { useRouter, Link } from '../router';

const RESIDENCE_OPTIONS = [
  'Mountain Villa',
  'Coastal Beach Home',
  'Garden Villa',
  'City Penthouse',
  'Country Estate',
];

export default function AuthPage() {
  const { user, login, register, logout, remainingCooldown } = useAuth();
  const { navigate } = useRouter();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    residenceInterest: 'Mountain Villa',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      if (mode === 'register') {
        if (!formData.name || !formData.email || !formData.password) {
          setErrorMessage('Please fill in all required fields.');
          setIsLoading(false);
          return;
        }

        const res = await register(formData);
        if (res.success) {
          setSuccessMessage('Account created successfully! Welcome to your private dossier.');
        } else {
          setErrorMessage(res.message);
        }
      } else {
        if (!formData.email || !formData.password) {
          setErrorMessage('Please enter your email and password.');
          setIsLoading(false);
          return;
        }

        const res = await login({ email: formData.email, password: formData.password });
        if (res.success) {
          setSuccessMessage('Signed in successfully.');
          // If administrator, route directly to the Headless CMS Admin Studio
          if (res.isAdmin) {
            navigate('/admin');
          }
        } else {
          setErrorMessage(res.message);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // If user is already authenticated, show the Private Dossier / Admin status
  if (user) {
    return (
      <div className="pt-24 sm:pt-28 pb-24 sm:pb-32 bg-bg-primary text-text-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-12 sm:space-y-16">
          {/* Top Breadcrumb with Back to Home Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-4 sm:pb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home Flight</span>
            </Link>

            {user.isAdmin && (
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-light px-3.5 py-1.5 rounded bg-bg-graphite hover:bg-accent-graphite-hover font-bold transition-all shadow-sm self-start sm:self-auto"
              >
                <Settings className="w-3.5 h-3.5 text-accent-ochre" />
                <span>Open Headless CMS Studio →</span>
              </Link>
            )}
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border-subtle pb-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 font-mono text-xs text-text-muted uppercase tracking-widest font-semibold">
                <Shield className="w-3.5 h-3.5 text-accent-ochre" />
                <span>Authenticated Access // {user.role}</span>
              </div>

              <h1 className="flex flex-wrap items-baseline gap-x-4">
                <span className="font-script text-5xl sm:text-6xl md:text-8xl text-accent-ochre font-normal">
                  Welcome,
                </span>
                <span className="font-heading text-4xl sm:text-5xl md:text-7xl text-text-primary tracking-tight font-normal">
                  {user.name}
                </span>
              </h1>

              <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed">
                {user.isAdmin
                  ? 'You are authenticated as an Atelier Director with full administrative and content editing privileges.'
                  : 'Welcome to your private architectural dossier. Here you can inspect high-resolution CAD floorplans and track your physical material sample case.'}
              </p>
            </div>

            <button
              onClick={logout}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-secondary hover:text-text-primary px-4 py-2.5 rounded-md bg-bg-tertiary border border-border-subtle hover:border-border-graphite transition-colors cursor-pointer font-bold self-start md:self-end"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* User Portal Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Dossiers / Blueprints (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {user.isAdmin ? (
                <div className="p-8 rounded-lg bg-bg-tertiary border border-border-subtle shadow-sm space-y-6">
                  <div className="flex justify-between items-center border-b border-border-subtle pb-4">
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-accent-ochre" />
                      <h2 className="font-heading text-2xl text-text-primary font-normal">
                        Atelier Content Management
                      </h2>
                    </div>
                    <span className="font-mono text-xs text-text-muted font-bold">ADMINISTRATIVE ACCESS</span>
                  </div>

                  <p className="font-sans text-sm text-text-secondary leading-relaxed">
                    You have administrative control over residences, materials, philosophy, and quality standards across the live site.
                  </p>

                  <Link
                    to="/admin"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded bg-bg-graphite text-text-light font-mono text-xs uppercase tracking-wider font-bold hover:bg-accent-graphite-hover transition-colors shadow-sm"
                  >
                    <span>Launch Headless CMS Studio →</span>
                  </Link>
                </div>
              ) : (
                <div className="p-8 rounded-lg bg-bg-tertiary border border-border-subtle shadow-sm space-y-6">
                  <div className="flex justify-between items-center border-b border-border-subtle pb-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-accent-ochre" />
                      <h2 className="font-heading text-2xl text-text-primary font-normal">
                        Your Architectural Blueprints
                      </h2>
                    </div>
                    <span className="font-mono text-xs text-text-muted font-bold">ACTIVE DOSSIERS</span>
                  </div>

                  <div className="space-y-3">
                    {(user.savedBlueprints || ['The Mountain Villa', 'The Garden House']).map((bp, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-md bg-bg-elevated border border-border-subtle flex items-center justify-between shadow-sm"
                      >
                        <div className="space-y-1">
                          <span className="font-heading text-lg text-text-primary font-normal block">
                            {bp}
                          </span>
                          <span className="font-mono text-xs text-text-muted">High-Resolution CAD & Spatial Specifications Ready</span>
                        </div>
                        <Link
                          to="/homes"
                          className="font-mono text-xs uppercase text-text-primary font-bold hover:text-accent-ochre transition-colors"
                        >
                          Inspect →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Physical Sample Box Status */}
              {!user.isAdmin && (
                <div className="p-8 rounded-lg bg-bg-tertiary border border-border-subtle shadow-sm space-y-4">
                  <div className="flex items-center gap-2 border-b border-border-subtle pb-4">
                    <Package className="w-4 h-4 text-accent-ochre" />
                    <h3 className="font-heading text-2xl text-text-primary font-normal">
                      Physical Material Swatch Case
                    </h3>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-md bg-bg-elevated border border-border-subtle">
                    <span className="font-sans text-sm text-text-primary font-medium">Status</span>
                    <span className="font-mono text-xs font-bold text-accent-ochre">
                      {user.sampleCaseStatus || 'Curated & Ready for Dispatch'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Account Credentials (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-lg bg-bg-tertiary border border-border-subtle shadow-sm space-y-6">
                <h3 className="font-heading text-2xl text-text-primary font-normal border-b border-border-subtle pb-4">
                  Account Credentials
                </h3>

                <div className="space-y-4 font-mono text-xs">
                  <div className="flex justify-between py-2 border-b border-border-subtle">
                    <span className="text-text-muted">NAME</span>
                    <span className="text-text-primary font-bold">{user.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border-subtle">
                    <span className="text-text-muted">EMAIL</span>
                    <span className="text-text-primary font-bold">{user.email}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-text-muted">ROLE</span>
                    <span className="text-accent-ochre font-bold">{user.role}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If user is not authenticated, render Clean, Secure Login / Register Form
  return (
    <div className="pt-24 sm:pt-28 pb-24 sm:pb-32 bg-bg-primary text-text-primary flex items-center justify-center min-h-[85vh]">
      <div className="max-w-xl mx-auto px-4 sm:px-6 w-full space-y-6">
        {/* Prominent Back to Home Button */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors font-bold px-3 py-1.5 rounded bg-bg-tertiary border border-border-subtle hover:border-border-graphite shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to Home</span>
          </Link>

          <span className="font-mono text-[10px] sm:text-[11px] text-text-muted">
            AETHEL ATELIER ACCESS
          </span>
        </div>

        {/* Monograph Auth Container */}
        <div className="bg-bg-tertiary rounded-lg p-6 sm:p-12 border border-border-subtle shadow-md space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded-sm bg-bg-graphite text-text-light flex items-center justify-center font-heading font-bold text-base mx-auto mb-3">
              Æ
            </div>
            <span className="font-mono text-xs text-text-muted uppercase tracking-widest font-semibold block">
              Private Atelier Portal
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl text-text-primary font-normal">
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </h1>
            <p className="font-sans text-xs sm:text-sm text-text-secondary">
              {mode === 'login'
                ? 'Sign in with your email and password to access your private architectural portal.'
                : 'Register for private access to architectural blueprints and studio services.'}
            </p>
          </div>

          {/* Mode Tabs (Sign In vs Register) */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-md bg-bg-primary border border-border-subtle">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMessage('');
                setSuccessMessage('');
              }}
              className={`py-2 rounded font-mono text-xs uppercase tracking-wider transition-all font-bold cursor-pointer ${
                mode === 'login'
                  ? 'bg-bg-graphite text-text-light shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setErrorMessage('');
                setSuccessMessage('');
              }}
              className={`py-2 rounded font-mono text-xs uppercase tracking-wider transition-all font-bold cursor-pointer ${
                mode === 'register'
                  ? 'bg-bg-graphite text-text-light shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Register First
            </button>
          </div>

          {/* Error & Success Feedback Alerts */}
          {errorMessage && (
            <div className="p-4 rounded-md bg-red-500/10 border border-red-500/20 text-red-700 text-xs font-mono">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="p-4 rounded-md bg-green-500/10 border border-green-500/20 text-green-800 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Register: Full Name */}
            {mode === 'register' && (
              <div className="space-y-1.5">
                <label className="block font-mono text-xs uppercase text-text-muted font-bold">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    required
                    placeholder="Elena Rostova"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-md bg-bg-primary border border-border-subtle focus:border-border-graphite text-text-primary font-sans text-sm outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="block font-mono text-xs uppercase text-text-muted font-bold">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-text-muted" />
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-md bg-bg-primary border border-border-subtle focus:border-border-graphite text-text-primary font-sans text-sm outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block font-mono text-xs uppercase text-text-muted font-bold">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-text-muted" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-md bg-bg-primary border border-border-subtle focus:border-border-graphite text-text-primary font-sans text-sm outline-none transition-colors"
                />
              </div>
            </div>

            {/* Register: Residence Style Preference */}
            {mode === 'register' && (
              <div className="space-y-1.5">
                <label className="block font-mono text-xs uppercase text-text-muted font-bold">
                  Primary Residence Interest
                </label>
                <select
                  value={formData.residenceInterest}
                  onChange={(e) => setFormData({ ...formData, residenceInterest: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-md bg-bg-primary border border-border-subtle focus:border-border-graphite text-text-primary font-sans text-sm outline-none transition-colors"
                >
                  {RESIDENCE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || (mode === 'login' && remainingCooldown > 0)}
              className={`w-full py-3.5 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2 mt-2 ${
                remainingCooldown > 0 && mode === 'login'
                  ? 'bg-red-900/30 text-red-700 cursor-not-allowed border border-red-500/30'
                  : isLoading
                  ? 'bg-bg-graphite/70 text-text-light/60 cursor-wait'
                  : 'bg-bg-graphite text-text-light hover:bg-accent-graphite-hover cursor-pointer'
              }`}
            >
              <span>
                {mode === 'login'
                  ? remainingCooldown > 0
                    ? `Security Cooldown (${remainingCooldown}s)`
                    : isLoading
                    ? 'Authenticating...'
                    : 'Sign In to Portal'
                  : isLoading
                  ? 'Creating Account...'
                  : 'Register Account'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
