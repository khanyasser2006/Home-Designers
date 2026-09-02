import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '../router';
import { useCMS } from '../cms';
import { useScrollReveal, useCounter } from '../hooks/useScrollReveal';
import AnimatedHeading from './AnimatedHeading';

function MetricCounterDisplay({ rawVal, isRevealed }) {
  // Extract number and suffix/prefix if any
  const match = String(rawVal).match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return <span>{rawVal}</span>;
  }

  const prefix = match[1] || '';
  const numVal = parseFloat(match[2]);
  const suffix = match[3] || '';
  const isDecimal = match[2].includes('.');

  const currentCount = useCounter(numVal, isRevealed, 1600);

  return (
    <span>
      {prefix}
      {isDecimal ? currentCount.toFixed(1) : Math.floor(currentCount)}
      {suffix}
    </span>
  );
}

export default function SpatialMetrics() {
  const { standards } = useCMS();
  const metrics = standards?.metrics || [];
  const [metricsRef, isMetricsRevealed] = useScrollReveal({ threshold: 0.15 });

  return (
    <section id="specifications" className="py-20 md:py-36 bg-bg-secondary relative border-t border-border-subtle overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Animated Architectural Header */}
        <AnimatedHeading
          script={standards?.script || 'Engineering'}
          title={standards?.title || 'Precision'}
          subtitle={standards?.subtitle || 'We hold our architecture to rigorous standards of craftsmanship and durability.'}
          rightContent={
            <Link
              to="/standards"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-primary hover:text-accent-ochre font-bold group"
            >
              <span>Explore All Quality Standards</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          }
        />

        {/* Asymmetric Baseline Layout with Counter Dial-Up */}
        <div ref={metricsRef} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch">
          {/* Main Stat (e.g. 48+ Homes) - 7 cols */}
          {metrics[0] && (
            <div
              className={`md:col-span-7 bg-bg-tertiary rounded-lg p-6 sm:p-10 md:p-12 border border-border-subtle shadow-md flex flex-col justify-between relative overflow-hidden group card-architectural transition-all duration-700 ease-luxury-out ${
                isMetricsRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center text-[11px] sm:text-xs font-mono text-text-muted font-bold">
                  <span>{metrics[0].label}</span>
                  <span className="text-accent-ochre">{metrics[0].tag}</span>
                </div>

                <div className="font-heading text-5xl sm:text-7xl md:text-9xl text-text-primary font-normal leading-none group-hover:text-accent-ochre transition-colors">
                  <MetricCounterDisplay rawVal={metrics[0].val} isRevealed={isMetricsRevealed} />
                </div>
              </div>

              <div className="pt-6 sm:pt-8 border-t border-border-subtle space-y-1.5 sm:space-y-2 mt-4 sm:mt-0">
                <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-normal text-text-primary">
                  {metrics[0].heading}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-text-secondary max-w-lg leading-relaxed">
                  {metrics[0].description}
                </p>
              </div>
            </div>
          )}

          {/* Secondary Stacked Column (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between gap-6 md:gap-8">
            {/* Stat 2 */}
            {metrics[1] && (
              <div
                className={`bg-bg-tertiary rounded-lg p-6 sm:p-8 border border-border-subtle shadow-md flex-1 flex flex-col justify-between group card-architectural transition-all duration-700 ease-luxury-out delay-150 ${
                  isMetricsRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <span className="font-mono text-[11px] sm:text-xs text-text-muted font-bold">{metrics[1].label}</span>
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase text-text-secondary bg-bg-elevated px-2.5 py-0.5 sm:px-3 sm:py-1 rounded border border-border-subtle">
                    {metrics[1].tag}
                  </span>
                </div>

                <div className="font-heading text-4xl sm:text-5xl md:text-6xl text-text-primary font-normal group-hover:text-accent-ochre transition-colors mb-3 sm:mb-4">
                  <MetricCounterDisplay rawVal={metrics[1].val} isRevealed={isMetricsRevealed} />
                </div>

                <div className="pt-3 sm:pt-4 border-t border-border-subtle">
                  <h4 className="font-heading text-base sm:text-lg text-text-primary font-normal">
                    {metrics[1].heading}
                  </h4>
                  <p className="font-sans text-xs text-text-secondary mt-1">
                    {metrics[1].description}
                  </p>
                </div>
              </div>
            )}

            {/* Stat 3 */}
            {metrics[2] && (
              <div
                className={`bg-bg-tertiary rounded-lg p-6 sm:p-8 border border-border-subtle shadow-md flex-1 flex flex-col justify-between group card-architectural transition-all duration-700 ease-luxury-out delay-300 ${
                  isMetricsRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <span className="font-mono text-[11px] sm:text-xs text-text-muted font-bold">{metrics[2].label}</span>
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase text-text-secondary bg-bg-elevated px-2.5 py-0.5 sm:px-3 sm:py-1 rounded border border-border-subtle">
                    {metrics[2].tag}
                  </span>
                </div>

                <div className="font-heading text-4xl sm:text-5xl md:text-6xl text-text-primary font-normal group-hover:text-accent-ochre transition-colors mb-3 sm:mb-4">
                  <MetricCounterDisplay rawVal={metrics[2].val} isRevealed={isMetricsRevealed} />
                </div>

                <div className="pt-3 sm:pt-4 border-t border-border-subtle">
                  <h4 className="font-heading text-base sm:text-lg text-text-primary font-normal">
                    {metrics[2].heading}
                  </h4>
                  <p className="font-sans text-xs text-text-secondary mt-1">
                    {metrics[2].description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section Bottom Bridge Button to /standards */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            to="/standards"
            className="inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded bg-bg-tertiary hover:bg-bg-elevated text-text-primary font-mono text-[11px] sm:text-xs uppercase tracking-widest border border-border-subtle hover:border-border-graphite transition-all duration-300 ease-luxury-out shadow-sm group hover:scale-105"
          >
            <span>View Full 5-Phase Construction Process & Warranties</span>
            <ArrowRight className="w-4 h-4 text-accent-ochre group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
