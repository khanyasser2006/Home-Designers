import React, { useState } from 'react';
import { Layers, Sun, Trees, ArrowRight, CheckCircle2, Compass, Clock, BookOpen, Quote } from 'lucide-react';
import { Link } from '../router';
import { useCMS } from '../cms';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function PhilosophyPage({ onOpenCommission }) {
  const { detailedPillars, essays, founderLetter, philosophy } = useCMS();
  const [activeEssay, setActiveEssay] = useState(null);
  const [headerRef, isHeaderRevealed] = useScrollReveal({ threshold: 0.1 });

  return (
    <div className="pt-28 pb-32 bg-bg-primary text-text-primary">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Monograph Header */}
        <div ref={headerRef} className="space-y-4 mb-20 max-w-4xl">
          <div className="flex items-center gap-3">
            <span className={`h-[1px] bg-text-muted transition-all duration-700 ease-luxury-out ${
              isHeaderRevealed ? 'w-8 opacity-100' : 'w-0 opacity-0'
            }`} />
            <span className="font-mono text-xs text-text-muted uppercase tracking-[0.25em] font-semibold">
              Spatial Philosophy & Manifesto
            </span>
          </div>

          <h1 className={`flex flex-wrap items-baseline gap-x-4 transition-all duration-700 ease-luxury-out ${
            isHeaderRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="font-script text-6xl sm:text-7xl md:text-9xl text-accent-ochre font-normal">
              {philosophy?.script || 'Radical'}
            </span>
            <span className="font-heading text-4xl sm:text-6xl md:text-8xl text-text-primary tracking-tight font-normal">
              {philosophy?.title || 'Simplicity'}
            </span>
          </h1>

          <p className={`font-sans text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed pt-2 max-w-3xl transition-all duration-700 ease-luxury-out delay-150 ${
            isHeaderRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            {philosophy?.subtitle || 'We design custom homes using honest materials, abundant natural light, and open layouts that help you feel relaxed and at peace.'}
          </p>

          <div className="relative w-full h-[1px] bg-border-subtle/30 overflow-hidden pt-4">
            <div
              className={`absolute inset-0 bg-border-subtle transition-transform duration-1000 ease-luxury-out delay-300 origin-left ${
                isHeaderRevealed ? 'scale-x-100' : 'scale-x-0'
              }`}
            />
          </div>
        </div>

        {/* 3 Expanded Pillars */}
        <div className="space-y-24 mb-32">
          {(detailedPillars || []).map((p, idx) => (
            <div
              key={p.id || p.num}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                idx % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* Text Description (6 cols) */}
              <div
                className={`lg:col-span-6 space-y-6 ${
                  idx % 2 === 1 ? 'lg:col-start-7' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-text-muted font-bold tracking-widest">
                    PRINCIPLE 0{p.num}
                  </span>
                  <span className="text-border-medium font-semibold">/</span>
                  <span className="font-script text-3xl text-accent-ochre">
                    {p.script}
                  </span>
                </div>

                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-text-primary font-normal leading-tight">
                  {p.title}
                </h2>

                <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed">
                  {p.description}
                </p>

                {p.points && p.points.length > 0 && (
                  <div className="space-y-3 pt-2">
                    {p.points.map((pt) => (
                      <div key={pt} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-accent-ochre mt-1 flex-shrink-0" />
                        <span className="font-sans text-sm text-text-primary font-medium">
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {p.spec && (
                  <div className="pt-4 border-t border-border-subtle font-mono text-xs text-text-muted">
                    <span>METRIC: {p.spec}</span>
                  </div>
                )}
              </div>

              {/* Architectural Image Plate (6 cols) */}
              <div
                className={`lg:col-span-6 ${
                  idx % 2 === 1 ? 'lg:col-start-1' : ''
                }`}
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border-subtle shadow-md group">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-graphite/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 font-mono text-[11px] text-text-light bg-bg-graphite/85 backdrop-blur-md px-3.5 py-1.5 rounded border border-border-subtle">
                    {p.title} // Spatial Detail
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Architectural Essays Section */}
        <div className="border-t border-border-subtle pt-24 mb-32 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="font-mono text-xs text-text-muted uppercase tracking-widest font-semibold">
                Thought Leadership
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-text-primary font-normal">
                Architectural Essays
              </h2>
            </div>
            <p className="font-sans text-sm text-text-secondary max-w-md">
              Reflections from our design atelier on permanence, materials, and the psychology of living space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(essays || []).map((essay) => (
              <div
                key={essay.id}
                onClick={() => setActiveEssay(activeEssay?.id === essay.id ? null : essay)}
                className="p-8 rounded-lg bg-bg-tertiary border border-border-subtle hover:border-border-accent transition-all duration-300 cursor-pointer shadow-sm flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-mono text-text-muted">
                    <span className="bg-bg-elevated px-3 py-1 rounded border border-border-subtle font-bold text-text-primary">
                      {essay.tag}
                    </span>
                    <span>{essay.readTime}</span>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl text-text-primary font-normal group-hover:text-accent-ochre transition-colors">
                    {essay.title}
                  </h3>

                  <p className="font-sans text-sm text-text-secondary leading-relaxed">
                    {essay.excerpt}
                  </p>

                  {activeEssay?.id === essay.id && (
                    <div className="mt-4 pt-4 border-t border-border-subtle font-sans text-sm text-text-primary leading-relaxed bg-bg-elevated p-6 rounded-md border border-border-subtle animate-fadeIn">
                      {essay.content}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-text-muted font-bold group-hover:text-text-primary">
                  <span>{activeEssay?.id === essay.id ? 'COLLAPSE ESSAY' : 'READ ESSAY'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Founder's Letter Monograph Spread */}
        {founderLetter && (
          <div className="bg-bg-tertiary rounded-lg p-8 sm:p-12 md:p-16 border border-border-subtle shadow-md relative overflow-hidden mb-24">
            <Quote className="absolute -bottom-6 -right-6 w-48 h-48 text-bg-graphite/[0.03] pointer-events-none" />

            <div className="max-w-3xl space-y-6 relative z-10">
              <span className="font-script text-4xl text-accent-ochre block">
                {founderLetter.script}
              </span>

              <blockquote className="font-editorial italic text-2xl sm:text-3xl md:text-4xl text-text-primary font-normal leading-snug">
                "{founderLetter.quote}"
              </blockquote>

              <div className="pt-6 border-t border-border-subtle flex items-center justify-between">
                <div>
                  <span className="block font-heading text-xl text-text-primary font-normal">
                    {founderLetter.author}
                  </span>
                  <span className="block font-sans text-xs text-text-muted">
                    {founderLetter.role}
                  </span>
                </div>

                <button
                  onClick={onOpenCommission}
                  className="px-6 py-3 rounded-md bg-bg-graphite text-text-light font-bold text-xs uppercase tracking-wider hover:bg-accent-graphite-hover transition-colors shadow-sm cursor-pointer"
                >
                  Discuss a Project →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
