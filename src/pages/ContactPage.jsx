import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, Shield, Globe, MapPin, Phone, Mail, Calendar } from 'lucide-react';
import { Link } from '../router';
import { useCMS } from '../cms';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function ContactPage() {
  const { studios, commissionConfig } = useCMS();
  const typologies = commissionConfig?.typologies || [
    'Mountain Villa',
    'Coastal Beach Home',
    'Country Estate',
    'City Penthouse',
    'Modern Family House',
  ];
  const scopes = commissionConfig?.scopes || [
    'New Build on Raw Land',
    'Complete Architectural Design & Build',
    'Private Family Compound',
    'Major Architectural Renovation',
  ];
  const scales = commissionConfig?.scales || ['300 – 600 m²', '600 – 1,200 m²', '1,200 m²+'];

  const [typology, setTypology] = useState(typologies[0]);
  const [scope, setScope] = useState(scopes[0]);
  const [scale, setScale] = useState(scales[0]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    meetingType: 'Video Consultation',
    notes: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [times, setTimes] = useState({});
  const [headerRef, isHeaderRevealed] = useScrollReveal({ threshold: 0.1 });
  const [contentRef, isContentRevealed] = useScrollReveal({ threshold: 0.1 });

  useEffect(() => {
    const updateTimes = () => {
      const newTimes = {};
      (studios || []).forEach((a) => {
        try {
          newTimes[a.city] = new Intl.DateTimeFormat('en-US', {
            timeZone: a.timezone || a.timeZone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }).format(new Date());
        } catch (e) {
          newTimes[a.city] = '12:00';
        }
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [studios]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="pt-28 pb-32 bg-bg-primary text-text-primary">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="space-y-4 mb-20 max-w-4xl">
          <div className="flex items-center gap-3">
            <span className={`h-[1px] bg-text-muted transition-all duration-700 ease-luxury-out ${
              isHeaderRevealed ? 'w-8 opacity-100' : 'w-0 opacity-0'
            }`} />
            <span className="font-mono text-xs text-text-muted uppercase tracking-[0.25em] font-semibold">
              Private Commission & Feasibility
            </span>
          </div>

          <h1 className={`flex flex-wrap items-baseline gap-x-4 transition-all duration-700 ease-luxury-out ${
            isHeaderRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="font-script text-6xl sm:text-7xl md:text-9xl text-accent-ochre font-normal">
              Start Your
            </span>
            <span className="font-heading text-4xl sm:text-6xl md:text-8xl text-text-primary tracking-tight font-normal">
              Conversation
            </span>
          </h1>

          <p className={`font-sans text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed pt-2 max-w-3xl transition-all duration-700 ease-luxury-out delay-150 ${
            isHeaderRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            Whether you already own land or are exploring ideas for a new home, we invite you to share your vision with our principal architect.
          </p>

          <div className="relative w-full h-[1px] bg-border-subtle/30 overflow-hidden pt-4">
            <div
              className={`absolute inset-0 bg-border-subtle transition-transform duration-1000 ease-luxury-out delay-300 origin-left ${
                isHeaderRevealed ? 'scale-x-100' : 'scale-x-0'
              }`}
            />
          </div>
        </div>

        {/* 2-Column Monograph Layout */}
        <div ref={contentRef} className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32 transition-all duration-700 ease-luxury-out ${
          isContentRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Left Column: Project Consultation Dossier Form (7 cols) */}
          <div className="lg:col-span-7 bg-bg-tertiary rounded-lg p-8 sm:p-12 border border-border-subtle shadow-md">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Anti-Bot Security Honeypot */}
                <input
                  type="text"
                  name="user_website_hp"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex="-1"
                  autoComplete="off"
                  className="opacity-0 absolute -left-[9999px] w-0 h-0 pointer-events-none"
                />

                <div className="space-y-2 border-b border-border-subtle pb-6">
                  <h2 className="font-heading text-2xl sm:text-3xl text-text-primary font-normal">
                    Project Feasibility Dossier
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-text-secondary">
                    Please provide initial details about your planned home.
                  </p>
                </div>

                {/* 1. Home Typology */}
                <div className="space-y-2.5">
                  <label className="block font-mono text-xs uppercase text-text-muted font-bold">
                    1. What type of home are you planning?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {typologies.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setTypology(t)}
                        className={`px-3.5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                          typology === t
                            ? 'bg-bg-graphite text-text-light font-bold shadow-sm'
                            : 'bg-bg-primary text-text-secondary hover:text-text-primary border border-border-subtle'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Project Scope */}
                <div className="space-y-2.5">
                  <label className="block font-mono text-xs uppercase text-text-muted font-bold">
                    2. Project Scope
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {scopes.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setScope(s)}
                        className={`p-3 rounded-md font-mono text-xs uppercase text-left transition-all duration-200 cursor-pointer ${
                          scope === s
                            ? 'bg-bg-graphite text-text-light font-bold shadow-sm'
                            : 'bg-bg-primary text-text-secondary hover:text-text-primary border border-border-subtle'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Scale Target */}
                <div className="space-y-2.5">
                  <label className="block font-mono text-xs uppercase text-text-muted font-bold">
                    3. Approximate Living Area
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {scales.map((sc) => (
                      <button
                        type="button"
                        key={sc}
                        onClick={() => setScale(sc)}
                        className={`p-3 rounded-md font-mono text-xs uppercase text-center transition-all duration-200 cursor-pointer ${
                          scale === sc
                            ? 'bg-bg-graphite text-text-light font-bold shadow-sm'
                            : 'bg-bg-primary text-text-secondary hover:text-text-primary border border-border-subtle'
                        }`}
                      >
                        {sc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Patron Information */}
                <div className="space-y-4 pt-2">
                  <label className="block font-mono text-xs uppercase text-text-muted font-bold">
                    4. Patron Contact Details
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-md bg-bg-primary border border-border-subtle focus:border-border-graphite text-text-primary font-sans text-sm outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-md bg-bg-primary border border-border-subtle focus:border-border-graphite text-text-primary font-sans text-sm outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      placeholder="Phone / WhatsApp Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-md bg-bg-primary border border-border-subtle focus:border-border-graphite text-text-primary font-sans text-sm outline-none transition-colors"
                    />

                    <input
                      type="text"
                      required
                      placeholder="Property Location (City & Country)"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-md bg-bg-primary border border-border-subtle focus:border-border-graphite text-text-primary font-sans text-sm outline-none transition-colors"
                    />
                  </div>

                  <textarea
                    rows="4"
                    placeholder="Tell us about your property, desired rooms, or family vision..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-md bg-bg-primary border border-border-subtle focus:border-border-graphite text-text-primary font-sans text-sm outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border-subtle">
                  <div className="flex items-center gap-2 font-mono text-[11px] text-text-muted">
                    <Shield className="w-3.5 h-3.5 text-accent-ochre" />
                    <span>Strict Patron Confidentiality Guaranteed</span>
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded bg-bg-graphite text-text-light font-bold text-xs uppercase tracking-wider hover:bg-accent-graphite-hover transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Submit Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-16 space-y-6">
                <div className="w-16 h-16 rounded-full bg-bg-graphite text-text-light flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-xs text-text-muted uppercase tracking-widest font-semibold">
                    Dossier Received
                  </span>
                  <h3 className="font-heading text-3xl sm:text-4xl text-text-primary font-normal">
                    Thank You, {formData.name}
                  </h3>
                  <p className="font-sans text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                    Our principal architect will review your project requirements and contact you within 24 hours to schedule an initial consultation.
                  </p>
                </div>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded bg-bg-graphite text-text-light font-bold text-xs uppercase tracking-wider hover:bg-accent-graphite-hover transition-colors cursor-pointer shadow-sm"
                >
                  Submit Another Inquiry
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Global Studios & Contact Directory (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="block font-mono text-xs text-text-muted uppercase tracking-widest font-semibold">
                Direct Atelier Contact
              </span>
              <h2 className="font-heading text-3xl text-text-primary font-normal">
                Our Global Locations
              </h2>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">
                Visit us in person or book a secure private video conference with our architectural directors.
              </p>
            </div>

            <div className="space-y-4">
              {(studios || []).map((a) => (
                <div
                  key={a.id || a.city}
                  className="p-6 rounded-lg bg-bg-tertiary border border-border-subtle space-y-2 shadow-sm"
                >
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-heading text-2xl text-text-primary font-normal">{a.city}</h3>
                    <span className="font-mono text-xs text-accent-ochre font-bold">
                      {times[a.city] || '--:--'}
                    </span>
                  </div>

                  <p className="font-sans text-xs text-text-secondary">
                    {a.address}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs font-mono text-text-muted">
                    <span>{a.country}</span>
                    <span className="text-text-primary font-medium">{a.phone}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Email Card */}
            <div className="p-6 rounded-lg bg-bg-tertiary border border-border-subtle space-y-3 shadow-sm">
              <span className="font-mono text-xs text-text-muted uppercase tracking-widest font-semibold block">
                Direct Inquiries
              </span>
              <p className="font-mono text-sm text-text-primary font-bold">
                atelier@aethel-architecture.com
              </p>
              <p className="font-sans text-xs text-text-secondary">
                For land surveys, media requests, and family office representations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
