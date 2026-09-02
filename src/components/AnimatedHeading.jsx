import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * AnimatedHeading Component
 * Haute Architectural Monograph Typography Reveal
 * Splits cursive flourish, masked display title, and drafting hairline draw.
 */
export default function AnimatedHeading({
  script,
  title,
  subtitle,
  rightContent,
  className = '',
}) {
  const [ref, isRevealed] = useScrollReveal({ threshold: 0.15 });

  return (
    <div ref={ref} className={`space-y-6 mb-12 sm:mb-16 md:mb-20 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
        {/* Left Display Monograph */}
        <div className="lg:col-span-8 space-y-2">
          <div className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-4">
            {script && (
              <span
                className={`font-script text-4xl sm:text-6xl md:text-8xl text-accent-ochre font-normal inline-block transition-all duration-700 ease-luxury-out ${
                  isRevealed
                    ? 'opacity-100 translate-y-0 filter blur-0'
                    : 'opacity-0 translate-y-6 filter blur-[2px]'
                }`}
              >
                {script}
              </span>
            )}
            
            <div className="overflow-hidden inline-block">
              <h2
                className={`font-heading text-3xl sm:text-5xl md:text-7xl text-text-primary tracking-tight font-normal transition-transform duration-700 ease-luxury-out delay-100 ${
                  isRevealed ? 'translate-y-0' : 'translate-y-full'
                }`}
              >
                {title}
              </h2>
            </div>
          </div>
        </div>

        {/* Right Editorial Context / Link */}
        {(subtitle || rightContent) && (
          <div
            className={`lg:col-span-4 lg:pl-6 border-l-0 lg:border-l border-border-subtle flex flex-col justify-between space-y-3 sm:space-y-4 pt-1 lg:pt-0 transition-all duration-700 ease-luxury-out delay-200 ${
              isRevealed
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-4'
            }`}
          >
            {subtitle && (
              <p className="font-sans text-xs sm:text-sm md:text-base text-text-secondary leading-relaxed">
                {subtitle}
              </p>
            )}
            {rightContent}
          </div>
        )}
      </div>

      {/* Architectural Drafting Line Draw */}
      <div className="relative w-full h-[1px] bg-border-subtle/30 overflow-hidden">
        <div
          className={`absolute inset-0 bg-border-subtle transition-transform duration-1000 ease-luxury-out delay-300 origin-left ${
            isRevealed ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
      </div>
    </div>
  );
}
