import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Shield } from 'lucide-react';
import { useScrollLock } from '../hooks/useScrollLock';
import { useCMS } from '../cms';

export default function CommissionDrawer({ isOpen, onClose }) {
  const { commissionConfig } = useCMS();
  const typologies = commissionConfig?.typologies || [
    'Mountain Villa',
    'Coastal Beach Home',
    'Country Estate',
    'City Penthouse',
    'Modern Family House',
  ];
  const scales = commissionConfig?.scales || [
    'Small (300 – 600 m²)',
    'Medium (600 – 1,200 m²)',
    'Large (1,200 m²+)',
  ];

  const [typology, setTypology] = useState(typologies[0]);
  const [scale, setScale] = useState(scales[0]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    notes: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Lock background scroll (including Lenis) when drawer is open
  useScrollLock(isOpen);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Anti-Bot Honeypot check: If bot populated hidden field, block silently
    if (honeypot.trim()) {
      setIsSubmitted(true);
      return;
    }
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-bg-graphite/60 backdrop-blur-xl flex items-end sm:items-center justify-center p-0 sm:p-6 animate-fadeIn">
      <div className="bg-bg-primary rounded-t-2xl sm:rounded-lg max-w-2xl w-full p-6 sm:p-10 border border-border-accent relative max-h-[90vh] sm:max-h-[95vh] overflow-y-auto shadow-2xl" style={{ overscrollBehavior: 'contain' }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 rounded border border-border-subtle text-text-secondary hover:text-text-primary hover:border-text-primary transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-1.5 sm:space-y-2 pr-8">
              <span className="font-mono text-[11px] sm:text-xs text-text-muted uppercase tracking-widest font-semibold">
                Start a Conversation
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl text-text-primary font-normal">
                Tell Us About Your Dream Home
              </h3>
              <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed">
                Whether you have already purchased land or are exploring ideas, we would love to learn more about your vision.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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

              {/* Home Style */}
              <div className="space-y-2">
                <label className="block font-mono text-[11px] sm:text-xs uppercase text-text-muted font-semibold">
                  What type of home are you planning?
                </label>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {typologies.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTypology(t)}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-mono text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                        typology === t
                          ? 'bg-bg-graphite text-text-light font-bold shadow-sm'
                          : 'bg-bg-tertiary text-text-secondary hover:text-text-primary border border-border-subtle'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Home Size */}
              <div className="space-y-2">
                <label className="block font-mono text-[11px] sm:text-xs uppercase text-text-muted font-semibold">
                  Approximate Home Size
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {scales.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setScale(s)}
                      className={`p-2.5 sm:p-3 rounded-md font-mono text-xs uppercase text-center transition-all duration-200 cursor-pointer ${
                        scale === s
                          ? 'bg-bg-graphite text-text-light font-bold shadow-sm'
                          : 'bg-bg-tertiary text-text-secondary hover:text-text-primary border border-border-subtle'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-[11px] sm:text-xs uppercase text-text-muted font-semibold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-md bg-bg-tertiary border border-border-subtle focus:border-border-graphite text-text-primary font-sans text-sm outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[11px] sm:text-xs uppercase text-text-muted font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-md bg-bg-tertiary border border-border-subtle focus:border-border-graphite text-text-primary font-sans text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[11px] sm:text-xs uppercase text-text-muted font-semibold">
                  Project Location (City & Country)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zurich, Switzerland or California, USA"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-md bg-bg-tertiary border border-border-subtle focus:border-border-graphite text-text-primary font-sans text-sm outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[11px] sm:text-xs uppercase text-text-muted font-semibold">
                  Tell us a bit about your family or project goals
                </label>
                <textarea
                  rows="3"
                  placeholder="e.g. We love natural sunlight, indoor-outdoor garden spaces, and quiet rooms for reading..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-md bg-bg-tertiary border border-border-subtle focus:border-border-graphite text-text-primary font-sans text-sm outline-none transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-text-muted font-medium">
                  <Shield className="w-3.5 h-3.5 text-accent-ochre" />
                  <span>Your privacy is always strictly protected</span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-md bg-bg-graphite hover:bg-accent-graphite-hover text-text-light font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <span>Send Message</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-12 space-y-6">
            <div className="w-16 h-16 rounded-full bg-bg-graphite text-text-light flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs text-text-muted uppercase tracking-widest font-semibold">
                Message Sent
              </span>
              <h3 className="font-heading text-3xl text-text-primary font-normal">
                Thank You, {formData.name}
              </h3>
              <p className="font-sans text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                We have received your message. Our principal architect will review your project details and get in touch with you within 24 hours.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-md bg-bg-graphite text-text-light font-bold text-xs uppercase tracking-wider hover:bg-accent-graphite-hover transition-colors cursor-pointer shadow-md"
            >
              Back to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
