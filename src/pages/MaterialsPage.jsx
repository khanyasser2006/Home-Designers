import React, { useState } from 'react';
import { Sparkles, Shield, CheckCircle2, ArrowRight, Package } from 'lucide-react';
import { Link } from '../router';
import { useCMS } from '../cms';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function MaterialsPage({ onOpenCommission }) {
  const { materials } = useCMS();
  const [selectedMat, setSelectedMat] = useState(materials[0] || {});
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedSamples, setSelectedSamples] = useState(['travertine', 'yakisugi']);
  const [headerRef, isHeaderRevealed] = useScrollReveal({ threshold: 0.1 });
  const [workbenchRef, isWorkbenchRevealed] = useScrollReveal({ threshold: 0.1 });

  const activeMat = materials.find((m) => m.id === selectedMat.id) || materials[0] || {};

  const toggleSample = (id) => {
    if (selectedSamples.includes(id)) {
      setSelectedSamples(selectedSamples.filter((s) => s !== id));
    } else {
      if (selectedSamples.length < 3) {
        setSelectedSamples([...selectedSamples, id]);
      }
    }
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
              Tactile Archive & Craft
            </span>
          </div>

          <h1 className={`flex flex-wrap items-baseline gap-x-4 transition-all duration-700 ease-luxury-out ${
            isHeaderRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="font-script text-6xl sm:text-7xl md:text-9xl text-accent-ochre font-normal">
              Natural
            </span>
            <span className="font-heading text-4xl sm:text-6xl md:text-8xl text-text-primary tracking-tight font-normal">
              Materiality
            </span>
          </h1>

          <p className={`font-sans text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed pt-2 max-w-3xl transition-all duration-700 ease-luxury-out delay-150 ${
            isHeaderRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            We build with living geological stone, honest timber, and forged bronze—materials that gain character, soft patina, and memories as your family lives with them.
          </p>

          <div className="relative w-full h-[1px] bg-border-subtle/30 overflow-hidden pt-4">
            <div
              className={`absolute inset-0 bg-border-subtle transition-transform duration-1000 ease-luxury-out delay-300 origin-left ${
                isHeaderRevealed ? 'scale-x-100' : 'scale-x-0'
              }`}
            />
          </div>
        </div>

        {/* Interactive Specimen Workbench */}
        <div ref={workbenchRef} className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-32 transition-all duration-700 ease-luxury-out ${
          isWorkbenchRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Left: Specimen Viewer (7 cols) */}
          {activeMat && activeMat.id && (
            <div className="lg:col-span-7 bg-bg-tertiary rounded-lg p-8 md:p-10 border border-border-subtle shadow-md flex flex-col justify-between space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-5">
                <div>
                  <span className="font-mono text-xs text-text-muted uppercase tracking-widest font-semibold">
                    ORIGIN: {activeMat.origin}
                  </span>
                  <h2 className="font-heading text-3xl md:text-4xl text-text-primary font-normal">
                    {activeMat.name}
                  </h2>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-text-secondary bg-bg-elevated px-3.5 py-1.5 rounded border border-border-subtle shadow-sm">
                  <Shield className="w-3.5 h-3.5 text-accent-ochre" />
                  <span>{activeMat.finish}</span>
                </div>
              </div>

              {/* Microscopic Surface Viewer */}
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

                <div className="absolute bottom-4 left-4 font-mono text-[11px] text-text-primary bg-bg-primary/95 backdrop-blur-md px-3.5 py-1.5 rounded border border-border-subtle flex items-center gap-2 font-semibold shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-accent-ochre" />
                  <span>{isZoomed ? "Macro Zoom: Active (Click to reset)" : "Click to zoom into surface texture"}</span>
                </div>
              </div>

              <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed">
                {activeMat.description}
              </p>

              {activeMat.applications && (
                <div className="p-4 rounded-md bg-bg-elevated border border-border-subtle">
                  <span className="block font-mono text-[10px] text-text-muted uppercase font-bold mb-1">
                    RECOMMENDED APPLICATIONS
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-text-primary font-medium">
                    {Array.isArray(activeMat.applications) ? activeMat.applications.join(', ') : activeMat.applications}
                  </p>
                </div>
              )}

              {/* Performance Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-border-subtle">
                <div className="p-3 bg-bg-elevated rounded border border-border-subtle shadow-sm">
                  <span className="block font-mono text-[10px] text-text-muted uppercase font-semibold">Density</span>
                  <span className="font-heading text-sm sm:text-base text-text-primary font-normal">{activeMat.density}</span>
                </div>
                <div className="p-3 bg-bg-elevated rounded border border-border-subtle shadow-sm">
                  <span className="block font-mono text-[10px] text-text-muted uppercase font-semibold">Acoustic</span>
                  <span className="font-heading text-sm sm:text-base text-text-primary font-normal">{activeMat.acousticAbsorption}</span>
                </div>
                <div className="p-3 bg-bg-elevated rounded border border-border-subtle shadow-sm">
                  <span className="block font-mono text-[10px] text-text-muted uppercase font-semibold">Thermal</span>
                  <span className="font-heading text-sm sm:text-base text-text-primary font-normal">{activeMat.thermalConductivity}</span>
                </div>
                <div className="p-3 bg-bg-elevated rounded border border-border-subtle shadow-sm">
                  <span className="block font-mono text-[10px] text-text-muted uppercase font-semibold">Haptic</span>
                  <span className="font-sans text-xs text-text-secondary truncate font-medium">{activeMat.hapticFeel}</span>
                </div>
              </div>

              {/* Link to Full Dedicated Preview Page */}
              <div className="pt-2 flex justify-between items-center">
                <Link
                  to={`/material/${activeMat.id}`}
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-primary hover:text-accent-ochre font-bold group cursor-pointer"
                >
                  <span>View Full {activeMat.name} Detailed Monograph</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}

          {/* Right: Specimen Catalogue (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            <div className="space-y-3">
              <span className="block font-mono text-xs text-text-muted uppercase tracking-widest font-semibold mb-1">
                Atelier Geological Archive
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
                    className={`p-5 rounded-lg border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-bg-elevated border-l-4 border-l-bg-graphite border-y border-r border-border-subtle shadow-md translate-x-1.5'
                        : 'bg-bg-tertiary border-border-subtle hover:bg-bg-elevated/80 shadow-sm hover:translate-x-1'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-text-muted font-bold">0{mat.num}</span>
                        <span className="text-border-medium">|</span>
                        <span className="font-heading text-lg sm:text-xl text-text-primary font-normal">
                          {mat.name}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-text-muted block pl-7">
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
          </div>
        </div>

        {/* Physical Material Sample Box Order Section */}
        <div className="bg-bg-tertiary rounded-lg p-8 sm:p-12 border border-border-subtle shadow-md space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border-subtle pb-6">
            <div className="space-y-2 max-w-xl">
              <span className="font-script text-4xl text-accent-ochre block">
                Patron Swatch Case
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl text-text-primary font-normal">
                Request a Physical Material Sample Case
              </h2>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">
                Experience the weight, temperature, and texture of genuine travertine, cedar, and bronze in your own home. Select up to 3 materials below.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-text-muted bg-bg-elevated px-4 py-2 rounded border border-border-subtle font-bold">
              <Package className="w-4 h-4 text-accent-ochre" />
              <span>{selectedSamples.length}/3 SWATCHES SELECTED</span>
            </div>
          </div>

          {/* Sample Swatch Selection Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {materials.map((mat) => {
              const isChecked = selectedSamples.includes(mat.id);
              return (
                <div
                  key={mat.id}
                  onClick={() => toggleSample(mat.id)}
                  className={`p-4 rounded-md border text-center transition-all cursor-pointer space-y-2 ${
                    isChecked
                      ? 'bg-bg-elevated border-2 border-border-graphite shadow-md'
                      : 'bg-bg-primary border-border-subtle hover:bg-bg-elevated'
                  }`}
                >
                  <div className="w-full aspect-square rounded overflow-hidden border border-border-subtle">
                    <img src={mat.image} alt={mat.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-heading text-sm text-text-primary block font-normal leading-snug truncate">
                    {mat.name}
                  </span>
                  <span className="font-mono text-[10px] text-text-muted block">
                    {isChecked ? '✓ INCLUDED' : '+ ADD'}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-sans text-xs text-text-muted">
              Delivered in a custom wood keepsake case to private residences and family offices worldwide.
            </p>
            <button
              onClick={onOpenCommission}
              className="px-8 py-3.5 rounded bg-bg-graphite text-text-light font-bold text-xs uppercase tracking-wider hover:bg-accent-graphite-hover transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            >
              Order Material Sample Box →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
