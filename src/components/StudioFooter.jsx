import React, { useState, useEffect } from 'react';
import { ArrowUp, Clock, Globe } from 'lucide-react';
import { useRouter, Link } from '../router';
import { useCMS } from '../cms';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function StudioFooter({ onOpenCommission }) {
  const { studios } = useCMS();
  const { path } = useRouter();
  const [times, setTimes] = useState({});
  const [footerRef, isFooterRevealed] = useScrollReveal({ threshold: 0.1 });

  useEffect(() => {
    const updateTimes = () => {
      const newTimes = {};
      studios.forEach((s) => {
        try {
          const now = new Date();
          newTimes[s.city] = new Intl.DateTimeFormat('en-GB', {
            timeZone: s.timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          }).format(now);
        } catch (e) {
          newTimes[s.city] = '--:--:--';
        }
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [studios]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Philosophy', path: '/philosophy' },
    { label: 'Curated Homes', path: '/homes' },
    { label: 'Materials Archive', path: '/materials' },
    { label: 'Engineering Standards', path: '/standards' },
    { label: 'Contact Atelier', path: '/contact' },
    { label: 'Patron Portal & CMS', path: '/auth' },
  ];

  return (
    <footer ref={footerRef} className="bg-bg-graphite text-text-light relative z-20 border-t border-border-graphite overflow-hidden">
      {/* Upper Footer: Asymmetrical Studio Monograph */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-24 md:py-32">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-start transition-all duration-700 ease-luxury-out ${
          isFooterRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Brand Manifesto Column (5 cols) */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-bg-primary text-text-primary flex items-center justify-center font-heading font-bold text-base tracking-tighter shadow-sm">
                Æ
              </div>
              <div className="flex flex-col">
                <span className="font-heading tracking-[0.25em] text-base sm:text-lg font-bold uppercase text-text-light">
                  Aethel
                </span>
                <span className="font-mono text-[8px] sm:text-[9px] tracking-widest text-text-light/60 uppercase">
                  Home Design Studio
                </span>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-text-light/70 leading-relaxed max-w-md">
              We design and build bespoke private residences around the world using honest natural stone, timber, and daylight.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenCommission}
                className="w-full sm:w-auto px-6 py-3 rounded bg-bg-primary text-text-primary font-bold text-xs uppercase tracking-wider hover:bg-white transition-all duration-300 ease-luxury-out cursor-pointer shadow-sm hover:scale-105 text-center"
              >
                Start Your Project →
              </button>
            </div>
          </div>

          {/* Quick Page Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-4">
            <span className="font-mono text-[11px] sm:text-xs text-text-light/40 uppercase tracking-widest block font-bold">
              Navigation
            </span>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2 font-sans text-xs sm:text-sm">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-text-light/70 hover:text-text-light transition-colors block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Global Studio Directory & Clocks (4 cols) */}
          <div className="lg:col-span-4 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 text-text-light/40 font-mono text-[11px] sm:text-xs uppercase tracking-widest font-bold">
              <Clock className="w-3.5 h-3.5 text-accent-ochre" />
              <span>Global Studio Clocks</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 font-mono text-xs">
              {studios.map((s) => (
                <div
                  key={s.city}
                  className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <div>
                      <span className="text-text-light font-bold block">{s.city}</span>
                      <span className="text-[10px] text-text-light/50">{s.country}</span>
                    </div>
                  </div>
                  <span className="font-bold text-accent-ochre text-xs sm:text-sm">
                    {times[s.city] || '--:--:--'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="mt-12 sm:mt-20 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs font-mono text-text-light/50 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} AETHEL ARCHITECTURAL ATELIER. ALL RIGHTS RESERVED.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-text-light transition-colors cursor-pointer py-1"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
