import React, { useState, useEffect } from 'react';
import { Menu, X, User, Settings, Shield } from 'lucide-react';
import { useRouter, Link } from '../router';
import { useAuth } from '../auth';
import { useScrollLock } from '../hooks/useScrollLock';

export default function Navbar() {
  const { path } = useRouter();
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock background scroll when mobile menu is open
  useScrollLock(isMobileMenuOpen);

  const isHomePage = path === '/' || path === '';

  useEffect(() => {
    if (!isHomePage) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const philosophyEl = document.getElementById('philosophy');
      if (philosophyEl) {
        const rect = philosophyEl.getBoundingClientRect();
        setIsVisible(rect.top <= window.innerHeight * 0.85);
      } else {
        setIsVisible(window.scrollY > window.innerHeight * 2.5);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage, path]);

  const navLinks = [
    { label: 'Home', num: 'I', path: '/' },
    { label: 'Philosophy', num: 'II', path: '/philosophy' },
    { label: 'Homes', num: 'III', path: '/homes' },
    { label: 'Materials', num: 'IV', path: '/materials' },
    { label: 'Standards', num: 'V', path: '/standards' },
    { label: 'Contact', num: 'VI', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-luxury-out ${
          isVisible || isMobileMenuOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto glass-panel py-3 md:py-4 border-b border-border-subtle shadow-md'
            : '-translate-y-full md:-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between relative">
          {/* Left: Atelier Logo */}
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2.5 sm:gap-3 text-text-primary focus:outline-none z-10"
          >
            <div className="w-8 h-8 rounded-sm bg-bg-graphite text-text-light flex items-center justify-center font-heading font-bold text-sm tracking-tighter transition-transform hover:scale-105 shadow-sm">
              Æ
            </div>
            <div className="flex flex-col">
              <span className="font-heading tracking-[0.25em] text-sm md:text-base font-bold uppercase text-text-primary">
                Aethel
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] tracking-widest text-text-muted uppercase">
                Home Design Studio
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
            <div className="flex items-center gap-6 lg:gap-8 pointer-events-auto">
              {navLinks.map((link) => {
                const isActive =
                  link.path === '/'
                    ? path === '/' || path === ''
                    : path.startsWith(link.path);
                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`font-mono text-xs uppercase tracking-widest transition-colors duration-200 relative py-1 ${
                      isActive
                        ? 'text-text-primary font-bold'
                        : 'text-text-secondary hover:text-text-primary font-medium'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-text-primary transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 hover:w-full'
                      }`}
                    />
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right Corner: Patron Login / Admin CMS Button / Mobile Hamburger */}
          <div className="z-10 flex items-center gap-2">
            {user?.email === 'admin@aethel.com' || user?.isAdmin ? (
              <Link
                to="/admin"
                className="hidden sm:flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-3.5 py-1.5 rounded bg-bg-graphite text-text-light font-bold shadow-sm hover:bg-black transition-colors"
              >
                <Settings className="w-3.5 h-3.5 text-accent-ochre" />
                <span>Admin CMS</span>
              </Link>
            ) : (
              <Link
                to="/auth"
                className={`hidden sm:flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-3.5 py-1.5 rounded transition-all font-bold shadow-sm ${
                  path === '/auth' || path === '/login' || path === '/register'
                    ? 'bg-bg-graphite text-text-light'
                    : user
                    ? 'bg-bg-elevated text-text-primary border border-border-graphite'
                    : 'bg-bg-tertiary hover:bg-bg-elevated text-text-primary border border-border-subtle hover:border-border-graphite'
                }`}
              >
                {user ? (
                  <>
                    <div className="w-2 h-2 rounded-full bg-accent-ochre animate-pulse" />
                    <span>{user.name.split(' ')[0]} (Patron)</span>
                  </>
                ) : (
                  <>
                    <User className="w-3.5 h-3.5 text-accent-ochre" />
                    <span>Patron Login</span>
                  </>
                )}
              </Link>
            )}

            {/* Mobile Hamburger Toggle with 44px min touch target */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-md bg-bg-tertiary/80 border border-border-subtle text-text-primary hover:text-accent-ochre transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Floating Minimalist Mobile Menu Button (Only on home flight before full header scrolls in) */}
      {isHomePage && !isVisible && (
        <div className="fixed top-4 right-4 z-50 md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-text-primary border border-border-subtle shadow-md focus:outline-none cursor-pointer"
            aria-label="Open Navigation"
          >
            <Menu className="w-5 h-5 text-text-primary" />
          </button>
        </div>
      )}

      {/* Mobile Slide-out Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-bg-primary/98 backdrop-blur-2xl md:hidden flex flex-col justify-between p-6 sm:p-8 pt-24 overflow-y-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <span className="font-mono text-[11px] text-text-muted uppercase tracking-[0.25em] font-semibold">
                Atelier Directory
              </span>
              <span className="font-mono text-[10px] text-accent-ochre font-bold">
                EST. MMXXIV
              </span>
            </div>

            <div className="space-y-2">
              {navLinks.map((link) => {
                const isActive =
                  link.path === '/'
                    ? path === '/' || path === ''
                    : path.startsWith(link.path);
                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3.5 rounded-lg border transition-all ${
                      isActive
                        ? 'bg-bg-elevated border-l-4 border-l-bg-graphite border-y border-r border-border-subtle shadow-sm font-bold text-text-primary'
                        : 'bg-bg-tertiary/70 border-border-subtle text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-text-muted">{link.num}.</span>
                      <span className="font-heading text-xl">{link.label}</span>
                    </div>
                    <span className="font-mono text-xs text-accent-ochre">→</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Patron Auth & CMS Links */}
            <div className="pt-2 space-y-2 border-t border-border-subtle">
              <Link
                to="/auth"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-lg bg-bg-elevated border border-border-subtle shadow-sm font-heading text-lg text-text-primary"
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-accent-ochre" />
                  <span>{user ? `Patron: ${user.name}` : 'Patron Portal & Account'}</span>
                </div>
                <span className="font-mono text-xs text-text-muted">{user ? 'Signed In' : 'Login'}</span>
              </Link>

              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-lg bg-bg-graphite text-text-light font-heading text-lg shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <Settings className="w-4 h-4 text-accent-ochre" />
                  <span>Headless CMS Dashboard</span>
                </div>
                <span className="font-mono text-xs text-text-light/60">Admin</span>
              </Link>
            </div>
          </div>

          <div className="text-center font-mono text-[10px] text-text-muted border-t border-border-subtle pt-4 mt-6">
            <span>© AETHEL ATELIER • ALL RIGHTS RESERVED</span>
          </div>
        </div>
      )}
    </>
  );
}
