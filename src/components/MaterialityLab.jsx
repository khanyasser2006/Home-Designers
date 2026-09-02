import React, { useState } from 'react';
import { Sparkles, Shield, ArrowRight } from 'lucide-react';
import { useRouter, Link } from '../router';
import { useCMS } from '../cms';
import { useScrollReveal } from '../hooks/useScrollReveal';
import AnimatedHeading from './AnimatedHeading';

export default function MaterialityLab({ onOpenCommission }) {
  const { materials } = useCMS();
  const { navigate } = useRouter();
  const mats = materials || [];
  const [selectedMat, setSelectedMat] = useState(mats[0] || {});
  const [isZoomed, setIsZoomed] = useState(false);
  const [labRef, isLabRevealed] = useScrollReveal({ threshold: 0.1 });

  const activeMat = mats.find((m) => m.id === selectedMat?.id) || mats[0] || {};

  return (
    <section id="materiality" className="py-20 md:py-36 bg-bg-secondary relative border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Animated Architectural Header */}
        <AnimatedHeading
          script="Natural"
          title="Materials & Finishes"
          subtitle="We select honest, natural materials that feel wonderful to touch and grow more beautiful with age."
          rightContent={
            <Link
              to="/materials"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-primary hover:text-accent-ochre font-bold group"
            >
              <span>Explore Complete Material Archive</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          }
        />

        {/* Asymmetric Materiality Workbench */}
        <div ref={labRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left: Specimen Inspector */}
          {activeMat && activeMat.id && (
            <div className="lg:col-span-7 bg-bg-tertiary rounded-lg p-5 sm:p-8 md:p-10 border border-border-subtle shadow-md flex flex-col justify-between space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-border-subtle pb-4 sm:pb-5">
                <div>
                  <span className="font-mono text-[11px] sm:text-xs text-text-muted uppercase tracking-widest font-semibold">
                    ORIGIN: {activeMat.origin}
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl text-text-primary font-normal">
                    {activeMat.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-text-secondary bg-bg-elevated px-3 py-1 sm:px-3.5 sm:py-1.5 rounded border border-border-subtle shadow-sm self-start sm:self-auto">
                  <Shield className="w-3.5 h-3.5 text-accent-ochre" />
                  <span>{activeMat.finish}</span>
                </div>
              </div>

              {/* Specimen Texture Viewer */}
              <div
                onClick={() => setIsZoomed(!isZoomed)}
                className="relative aspect-[16/10] rounded-md overflow-hidden border border-border-subtle cursor-pointer group shadow-sm"
              >
                <img
                  src={activeMat.image}
                  alt={activeMat.name}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    isZoomed ? 'scale-150' : 'group-hover:scale-105'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-graphite/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 font-mono text-[10px] sm:text-[11px] text-text-primary bg-bg-primary/90 backdrop-blur-md px-3 py-1 sm:px-3.5 sm:py-1.5 rounded border border-border-subtle flex items-center gap-2 font-semibold shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-accent-ochre" />
                  <span>{isZoomed ? "Zoom: Active (Tap to reset)" : "Tap to zoom texture"}</span>
                </div>
              </div>

              <p className="font-sans text-xs sm:text-sm md:text-base text-text-secondary leading-relaxed">
                {activeMat.description}
              </p>

              {/* Simple Performance Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-3 border-t border-border-subtle">
                <div className="p-3 bg-bg-elevated rounded border border-border-subtle shadow-sm">
                  <span className="block font-mono text-[9px] sm:text-[10px] text-text-muted uppercase font-semibold">Material</span>
                  <span className="font-heading text-sm sm:text-base text-text-primary font-normal truncate block">{activeMat.density}</span>
                </div>
                <div className="p-3 bg-bg-elevated rounded border border-border-subtle shadow-sm">
                  <span className="block font-mono text-[9px] sm:text-[10px] text-text-muted uppercase font-semibold">Sound</span>
                  <span className="font-heading text-sm sm:text-base text-text-primary font-normal truncate block">{activeMat.acousticAbsorption}</span>
                </div>
                <div className="p-3 bg-bg-elevated rounded border border-border-subtle shadow-sm">
                  <span className="block font-mono text-[9px] sm:text-[10px] text-text-muted uppercase font-semibold">Comfort</span>
                  <span className="font-heading text-sm sm:text-base text-text-primary font-normal truncate block">{activeMat.thermalConductivity}</span>
                </div>
                <div className="p-3 bg-bg-elevated rounded border border-border-subtle shadow-sm">
                  <span className="block font-mono text-[9px] sm:text-[10px] text-text-muted uppercase font-semibold">Texture</span>
                  <span className="font-sans text-xs text-text-secondary truncate font-medium block">{activeMat.hapticFeel}</span>
                </div>
              </div>

              {/* Link to Dedicated Preview Page */}
              <div className="pt-2 flex justify-between items-center">
                <Link
                  to={`/material/${activeMat.id}`}
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-primary hover:text-accent-ochre font-bold group cursor-pointer"
                >
                  <span>Open Detailed {activeMat.name} Monograph</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}

          {/* Right: Material List */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5 sm:space-y-3">
              <span className="block font-mono text-xs text-text-muted uppercase tracking-widest font-semibold mb-1">
                Explore Available Materials
              </span>

              {materials.map((mat) => {
                const isSelected = activeMat.id === mat.id;
                return (
                  <div
                    key={mat.id}
                    onClick={() => {
                      setSelectedMat(mat);
                      setIsZoomed(false);
                    }}
                    className={`p-4 sm:p-5 rounded-lg border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-bg-elevated border-l-4 border-l-bg-graphite border-y border-r border-border-subtle shadow-md translate-x-1 sm:translate-x-1.5'
                        : 'bg-bg-tertiary border-border-subtle hover:bg-bg-elevated/80 shadow-sm hover:translate-x-1'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-text-muted font-bold">0{mat.num}</span>
                        <span className="text-border-medium">|</span>
                        <span className="font-heading text-base sm:text-xl text-text-primary font-normal">
                          {mat.name}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] sm:text-xs text-text-muted block pl-6 sm:pl-7">
                        {mat.origin}
                      </span>
                    </div>

                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-bg-graphite animate-pulse" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Physical Sample Box CTA */}
            <div className="p-6 sm:p-8 rounded-lg bg-bg-tertiary border border-border-subtle space-y-3 sm:space-y-4 shadow-md">
              <span className="font-script text-2xl sm:text-3xl text-accent-ochre block">
                Order Physical Material Samples
              </span>
              <p className="font-sans text-xs text-text-secondary leading-relaxed">
                We deliver curated sample boxes with real stone, wood, and metal finishes directly to your doorstep.
              </p>
              <button
                onClick={onOpenCommission}
                className="w-full py-3.5 rounded bg-bg-graphite text-text-light font-bold text-xs uppercase tracking-wider hover:bg-accent-graphite-hover transition-colors shadow-sm cursor-pointer"
              >
                Request Material Samples →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
