import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';
import { Link } from '../router';
import { useCMS } from '../cms';
import { useScrollReveal } from '../hooks/useScrollReveal';
import AnimatedHeading from './AnimatedHeading';

export default function PhilosophySection({ onOpenCommission }) {
  const { philosophy } = useCMS();
  const pillars = philosophy?.pillars || [];
  const [activePillar, setActivePillar] = useState(pillars[0] || {});
  const [contentRef, isContentRevealed] = useScrollReveal({ threshold: 0.1 });

  const currentPillar =
    pillars.find((p) => p.id === activePillar?.id) || pillars[0] || {};

  return (
    <section id="philosophy" className="py-20 md:py-36 bg-bg-secondary relative border-t border-border-subtle overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Animated Editorial Monograph Header with Drafting Line Draw */}
        <AnimatedHeading
          script={philosophy?.script || 'Simple'}
          title={philosophy?.title || 'Design'}
          subtitle={philosophy?.subtitle || 'We design residences with natural materials and open layouts.'}
          rightContent={
            <Link
              to="/philosophy"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-primary hover:text-accent-ochre font-bold group"
            >
              <span>Read Full Spatial Manifesto</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          }
        />

        {/* Asymmetric Monograph Spread with Staggered Entrance */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: 3 Pillars with Crisp Borders */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              {pillars.map((p, idx) => {
                const isActive = currentPillar.id === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setActivePillar(p)}
                    style={{ transitionDelay: `${idx * 120}ms` }}
                    className={`p-4 sm:p-6 rounded-lg transition-all duration-500 ease-luxury-out cursor-pointer relative group ${
                      isContentRevealed
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                    } ${
                      isActive
                        ? 'bg-bg-elevated shadow-md border-l-4 border-l-bg-graphite border-y border-r border-border-subtle translate-x-1 sm:translate-x-1.5'
                        : 'bg-bg-tertiary hover:bg-bg-elevated/90 border border-border-subtle hover:translate-x-1'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[11px] sm:text-xs text-text-muted font-bold tracking-wider">
                        PRINCIPLE 0{p.num}
                      </span>
                      <span className="font-script text-xl sm:text-2xl text-accent-ochre">
                        {p.script}
                      </span>
                    </div>

                    <h3 className="font-heading text-xl sm:text-2xl text-text-primary mb-1 font-normal group-hover:text-accent-ochre transition-colors">
                      {p.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {p.subtitle}
                    </p>

                    {isActive && (
                      <div className="mt-3 pt-3 border-t border-border-subtle flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-text-muted">
                        <span>INSPECTING</span>
                        <span className="font-bold text-text-primary">ACTIVE SELECTION →</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Atelier Quality Assurance */}
            <div
              className={`p-5 rounded-lg bg-bg-tertiary border border-border-subtle hidden lg:block transition-all duration-700 ease-luxury-out delay-500 ${
                isContentRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="flex items-center gap-2 font-mono text-[11px] text-text-muted uppercase tracking-widest mb-1.5 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-ochre" />
                <span>Custom Built For Your Land</span>
              </div>
              <p className="font-sans text-xs text-text-secondary leading-relaxed">
                Every detail is tailored to your family’s lifestyle, sunlight angles, and local natural surroundings.
              </p>
            </div>
          </div>

          {/* Right Column: Architectural Plate with Curtain Reveal */}
          {currentPillar && currentPillar.id && (
            <div
              className={`lg:col-span-7 flex flex-col justify-between bg-bg-tertiary rounded-lg p-6 sm:p-8 md:p-10 border border-border-subtle shadow-md relative overflow-hidden transition-all duration-700 ease-luxury-out delay-200 ${
                isContentRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-border-subtle pb-4 sm:pb-5 mb-5 sm:mb-6">
                <div>
                  <span className="font-script text-2xl sm:text-3xl text-accent-ochre block">
                    {currentPillar.script}
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl text-text-primary font-normal">
                    {currentPillar.title}
                  </h3>
                </div>

                <div className="font-mono text-[11px] sm:text-xs text-text-secondary bg-bg-elevated px-3 py-1 sm:px-3.5 sm:py-1.5 rounded border border-border-subtle shadow-sm self-start sm:self-auto">
                  <span>{currentPillar.location || 'Atelier Masterpiece'}</span>
                </div>
              </div>

              {currentPillar.blueprintImg && (
                <div className="relative aspect-[16/10] rounded-md overflow-hidden border border-border-subtle mb-5 sm:mb-6 group shadow-sm">
                  <img
                    key={currentPillar.blueprintImg}
                    src={currentPillar.blueprintImg}
                    alt={currentPillar.title}
                    className="w-full h-full object-cover transition-all duration-700 ease-luxury-out group-hover:scale-105 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-graphite/70 via-transparent to-transparent pointer-events-none" />

                  {currentPillar.material && (
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex justify-between items-end text-text-light font-mono text-[10px] sm:text-[11px]">
                      <div className="bg-bg-graphite/85 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded border border-border-subtle">
                        MATERIAL: {currentPillar.material}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-4 sm:space-y-5">
                <p className="font-sans text-xs sm:text-sm md:text-base text-text-secondary leading-relaxed">
                  {currentPillar.description}
                </p>

                {currentPillar.specs && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-3 border-t border-border-subtle">
                    {currentPillar.specs.map((s) => (
                      <div key={s.label} className="p-3 sm:p-3.5 rounded-md bg-bg-elevated border border-border-subtle shadow-sm">
                        <span className="block font-mono text-[9px] sm:text-[10px] text-text-muted uppercase mb-0.5 sm:mb-1 font-semibold">
                          {s.label}
                        </span>
                        <span className="block font-heading text-base sm:text-lg md:text-xl font-normal text-text-primary">
                          {s.val}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <Link
                    to="/philosophy"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-text-primary hover:text-accent-ochre font-bold group cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-accent-ochre" />
                    <span>Read Full Philosophy & Solar Essays →</span>
                  </Link>

                  <button
                    onClick={onOpenCommission}
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-text-primary hover:text-accent-ochre group cursor-pointer font-bold"
                  >
                    <span>Ask About Custom Plans</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
