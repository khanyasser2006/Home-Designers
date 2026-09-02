import React from 'react';
import { Shield, Award, CheckCircle2, Ruler, Zap, Compass, Leaf, ArrowRight, Clock } from 'lucide-react';
import { Link } from '../router';
import { useCMS } from '../cms';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function StandardsPage({ onOpenCommission }) {
  const { benchmarks, phases, standards } = useCMS();
  const [headerRef, isHeaderRevealed] = useScrollReveal({ threshold: 0.1 });
  const [benchmarksRef, isBenchmarksRevealed] = useScrollReveal({ threshold: 0.1 });

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
              Quality & Engineering Rigor
            </span>
          </div>

          <h1 className={`flex flex-wrap items-baseline gap-x-4 transition-all duration-700 ease-luxury-out ${
            isHeaderRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="font-script text-6xl sm:text-7xl md:text-9xl text-accent-ochre font-normal">
              {standards?.script || 'Quality'}
            </span>
            <span className="font-heading text-4xl sm:text-6xl md:text-8xl text-text-primary tracking-tight font-normal">
              {standards?.title || 'Standards'}
            </span>
          </h1>

          <p className={`font-sans text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed pt-2 max-w-3xl transition-all duration-700 ease-luxury-out delay-150 ${
            isHeaderRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            {standards?.subtitle || 'We hold our architecture to the highest standards of craftsmanship, structural longevity, and energy efficiency in the world.'}
          </p>

          <div className="relative w-full h-[1px] bg-border-subtle/30 overflow-hidden pt-4">
            <div
              className={`absolute inset-0 bg-border-subtle transition-transform duration-1000 ease-luxury-out delay-300 origin-left ${
                isHeaderRevealed ? 'scale-x-100' : 'scale-x-0'
              }`}
            />
          </div>
        </div>

        {/* 4 Core Benchmarks (Asymmetric 2x2 Grid) */}
        <div ref={benchmarksRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {(benchmarks || []).map((bm) => (
            <div
              key={bm.id || bm.label}
              className="p-8 sm:p-10 rounded-lg bg-bg-tertiary border border-border-subtle hover:border-border-accent transition-all duration-300 shadow-sm flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="font-heading text-5xl sm:text-6xl md:text-7xl text-text-primary font-normal group-hover:text-accent-ochre transition-colors">
                    {bm.num}
                  </span>
                  <Award className="w-6 h-6 text-accent-ochre" />
                </div>

                <div className="space-y-1">
                  <h2 className="font-heading text-2xl sm:text-3xl text-text-primary font-normal">
                    {bm.label}
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-text-muted font-medium">
                    {bm.subtitle}
                  </p>
                </div>

                <p className="font-sans text-sm text-text-secondary leading-relaxed">
                  {bm.description}
                </p>
              </div>

              {bm.tags && bm.tags.length > 0 && (
                <div className="pt-4 border-t border-border-subtle flex flex-wrap gap-2">
                  {bm.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] text-text-secondary bg-bg-elevated px-2.5 py-1 rounded border border-border-subtle font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 5-Phase Project Timeline */}
        <div className="border-t border-border-subtle pt-24 mb-32 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="font-mono text-xs text-text-muted uppercase tracking-widest font-semibold">
                Project Journey
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-text-primary font-normal">
                How We Build Your Home
              </h2>
            </div>
            <p className="font-sans text-sm text-text-secondary max-w-md">
              From the initial laser survey of your land to the day you move in, our transparent process ensures complete peace of mind.
            </p>
          </div>

          <div className="space-y-4">
            {(phases || []).map((p) => (
              <div
                key={p.id || p.phase}
                className="p-6 sm:p-8 rounded-lg bg-bg-tertiary border border-border-subtle hover:border-border-accent transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-sm"
              >
                <div className="lg:col-span-2 flex items-center gap-3">
                  <span className="font-heading text-3xl sm:text-4xl text-text-primary font-normal">
                    {p.phase}
                  </span>
                  <span className="font-mono text-xs text-text-muted font-bold block">
                    {p.duration}
                  </span>
                </div>

                <div className="lg:col-span-4">
                  <h3 className="font-heading text-2xl text-text-primary font-normal">
                    {p.name}
                  </h3>
                </div>

                <div className="lg:col-span-6">
                  <p className="font-sans text-sm text-text-secondary leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Environmental Quality Banner */}
        <div className="bg-bg-tertiary rounded-lg p-8 sm:p-12 border border-border-subtle shadow-md flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="font-script text-4xl text-accent-ochre block">
              Eco-Friendly Architecture
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl text-text-primary font-normal">
              100% Clean Energy & Carbon-Negative Materials
            </h3>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              We design homes that produce more clean solar and geothermal energy than they consume, saving thousands on power bills while protecting our planet.
            </p>
          </div>

          <button
            onClick={onOpenCommission}
            className="px-8 py-4 rounded bg-bg-graphite text-text-light font-bold text-xs uppercase tracking-wider hover:bg-accent-graphite-hover transition-colors shadow-sm whitespace-nowrap cursor-pointer"
          >
            Start Your Custom Build →
          </button>
        </div>
      </div>
    </div>
  );
}
