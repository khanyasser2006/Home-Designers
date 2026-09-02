import React, { useState } from 'react';
import { Award, Star } from 'lucide-react';
import { useCMS } from '../cms';
import { useScrollReveal } from '../hooks/useScrollReveal';
import AnimatedHeading from './AnimatedHeading';

export default function CriticalAcclaim() {
  const { acclaim } = useCMS();
  const reviews = acclaim || [];
  const [activeReviewId, setActiveReviewId] = useState(reviews[0]?.id || '');
  const [acclaimRef, isAcclaimRevealed] = useScrollReveal({ threshold: 0.15 });

  const currentReview =
    reviews.find((item) => item.id === activeReviewId) || reviews[0] || {};

  return (
    <section className="py-20 md:py-36 bg-bg-primary relative border-t border-border-subtle overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Animated Editorial Monograph Header */}
        <AnimatedHeading
          script="Magazine"
          title="Editorial Reviews"
          subtitle="Honored worldwide by leading architectural institutions and design journals."
          rightContent={
            <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-text-secondary bg-bg-tertiary px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-md border border-border-subtle shadow-sm self-start lg:self-auto">
              <Award className="w-4 h-4 text-accent-ochre" />
              <span>Award-Winning Architectural Practice</span>
            </div>
          }
        />

        {/* Asymmetrical Editorial Publication Spread with Staggered Entrance */}
        <div ref={acclaimRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Publication Selector Strip (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5 sm:space-y-3">
              <span className="block font-mono text-xs text-text-muted uppercase tracking-widest font-semibold mb-1">
                Selected Press Features
              </span>

              {acclaim.map((item) => {
                const isActive = currentReview.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveReviewId(item.id)}
                    className={`p-4 sm:p-5 rounded-lg border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-bg-elevated border-l-4 border-l-bg-graphite border-y border-r border-border-subtle shadow-md translate-x-1 sm:translate-x-1.5'
                        : 'bg-bg-tertiary border-border-subtle hover:bg-bg-elevated/80 shadow-sm hover:translate-x-1'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-heading text-base sm:text-lg text-text-primary font-normal">
                        {item.pub}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-accent-ochre" />
                      )}
                    </div>
                    <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider block">
                      {item.date}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Client Privacy Badge */}
            <div className="p-4 sm:p-5 rounded-lg bg-bg-tertiary border border-border-subtle shadow-sm">
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest font-semibold block mb-1">
                DISCRETION & PRIVACY
              </span>
              <p className="font-sans text-xs text-text-secondary leading-relaxed">
                All client residences are photographed with private anonymity. Family names and exact parcel numbers are held under strict non-disclosure agreements.
              </p>
            </div>
          </div>

          {/* Right: Featured Monograph Quote Plate (8 cols) */}
          {currentReview && currentReview.id && (
            <div className="lg:col-span-8 bg-bg-tertiary rounded-lg p-6 sm:p-10 md:p-14 border border-border-subtle shadow-md flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-1 text-accent-ochre">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent-ochre text-accent-ochre" />
                  ))}
                </div>

                <blockquote className="font-heading text-xl sm:text-2xl md:text-4xl text-text-primary font-normal leading-snug">
                  "{currentReview.quote}"
                </blockquote>
              </div>

              <div className="pt-6 sm:pt-8 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 sm:mt-8">
                <div>
                  <span className="font-heading text-lg sm:text-xl text-text-primary font-normal block">
                    {currentReview.author}
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs text-text-muted uppercase tracking-wider">
                    {currentReview.role} — {currentReview.pub}
                  </span>
                </div>

                <div className="font-mono text-xs text-text-secondary bg-bg-elevated px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-md border border-border-subtle shadow-sm font-semibold self-start sm:self-auto">
                  {currentReview.stat}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
