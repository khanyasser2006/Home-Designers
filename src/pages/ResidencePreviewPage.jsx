import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Layers, CheckCircle2, ArrowRight, Compass, Sun, Shield } from 'lucide-react';
import { useRouter, Link } from '../router';
import { useCMS } from '../cms';

export default function ResidencePreviewPage({ onOpenCommission }) {
  const { residences } = useCMS();
  const { path } = useRouter();
  const [viewMode, setViewMode] = useState('photo');

  // Extract residence id from path: /residence/:id
  const residenceId = path.split('/')[2] || 'villa-obsidian';
  const residence = residences.find((r) => r.id === residenceId) || residences[0] || {};

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [residenceId]);

  if (!residence || !residence.id) {
    return (
      <div className="pt-36 pb-32 text-center text-text-primary bg-bg-primary min-h-screen">
        <h1 className="font-heading text-3xl mb-4">Residence Not Found</h1>
        <Link to="/homes" className="font-mono text-xs uppercase underline">Back to Residences</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 sm:pt-28 pb-24 sm:pb-32 bg-bg-primary text-text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-12 sm:space-y-16">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle pb-4 sm:pb-6">
          <Link
            to="/homes"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Curated Residences</span>
          </Link>

          <span className="font-mono text-[10px] sm:text-xs text-text-muted">
            PORTFOLIO // {residence.category} // {residence.year}
          </span>
        </div>

        {/* Hero Header */}
        <div className="space-y-3 sm:space-y-4 max-w-4xl">
          <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-text-muted uppercase tracking-widest font-semibold">
            <MapPin className="w-3.5 h-3.5 text-accent-ochre" />
            <span>{residence.location}</span>
          </div>

          <h1 className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-4">
            <span className="font-script text-4xl sm:text-6xl md:text-8xl text-accent-ochre font-normal">
              {residence.title?.split(' ')[0]}
            </span>
            <span className="font-heading text-3xl sm:text-5xl md:text-7xl text-text-primary tracking-tight font-normal">
              {residence.title?.split(' ').slice(1).join(' ')}
            </span>
          </h1>

          <p className="font-sans text-xs sm:text-base md:text-lg text-text-secondary leading-relaxed pt-1 sm:pt-2 max-w-3xl">
            {residence.description}
          </p>
        </div>

        {/* Large Media Viewer with Photo/Floorplan Switch */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-lg overflow-hidden border border-border-subtle shadow-md">
          <img
            src={viewMode === 'blueprint' ? (residence.blueprint || residence.photo) : residence.photo}
            alt={residence.title}
            className="w-full h-full object-cover filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-graphite/60 via-transparent to-transparent pointer-events-none" />

          {/* View Mode Switcher */}
          <div className="absolute top-3 sm:top-6 left-3 sm:left-6 flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'blueprint' ? 'photo' : 'blueprint')}
              className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-text-light px-3 sm:px-4 py-1.5 sm:py-2 rounded bg-bg-graphite/90 backdrop-blur-md hover:bg-black border border-white/30 transition-colors flex items-center gap-1.5 sm:gap-2 font-bold shadow-md cursor-pointer"
            >
              <Layers className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-accent-ochre" />
              <span>{viewMode === 'blueprint' ? 'Switch to Photo' : 'Switch to CAD Plan'}</span>
            </button>
          </div>

          <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 font-mono text-[10px] sm:text-xs text-text-light bg-bg-graphite/85 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded border border-border-subtle">
            LIVING SPACE: {residence.area} // {residence.orientation}
          </div>
        </div>

        {/* 2-Column Monograph Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Spatial Room Program (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="font-mono text-xs text-text-muted uppercase tracking-widest font-semibold block">
                Spatial Floorplan Program
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl text-text-primary font-normal">
                Room Layout & Walkthrough
              </h2>
            </div>

            <div className="space-y-3">
              {(residence.spatialProgram || []).map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-lg bg-bg-tertiary border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
                >
                  <div className="space-y-1">
                    <h3 className="font-heading text-xl text-text-primary font-normal">{item.room}</h3>
                    <p className="font-sans text-xs text-text-secondary">{item.note}</p>
                  </div>
                  <span className="font-mono text-xs font-bold text-text-primary bg-bg-elevated px-3 py-1.5 rounded border border-border-subtle self-start sm:self-center">
                    {item.area}
                  </span>
                </div>
              ))}
            </div>

            {/* Gallery Strip */}
            {residence.gallery && residence.gallery.length > 0 && (
              <div className="space-y-4 pt-4">
                <span className="font-mono text-xs text-text-muted uppercase tracking-widest font-semibold block">
                  Interior Perspectives
                </span>
                <div className="grid grid-cols-2 gap-4">
                  {residence.gallery.map((img, idx) => (
                    <div key={idx} className="aspect-[4/3] rounded-md overflow-hidden border border-border-subtle shadow-sm">
                      <img src={img} alt="Residence gallery" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Environmental Performance & Material Palette (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Environmental Rigor */}
            {residence.environmentalMetrics && (
              <div className="p-8 rounded-lg bg-bg-tertiary border border-border-subtle shadow-sm space-y-6">
                <h3 className="font-heading text-2xl text-text-primary font-normal border-b border-border-subtle pb-4">
                  Environmental Metrics
                </h3>

                <div className="space-y-4 font-mono text-xs">
                  <div className="flex justify-between py-2 border-b border-border-subtle">
                    <span className="text-text-muted">ENERGY RATING</span>
                    <span className="text-text-primary font-bold">{residence.environmentalMetrics.energyRating}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border-subtle">
                    <span className="text-text-muted">HEATING SOURCE</span>
                    <span className="text-text-primary font-bold">{residence.environmentalMetrics.heatingSystem}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border-subtle">
                    <span className="text-text-muted">GLAZING SYSTEM</span>
                    <span className="text-text-primary font-bold">{residence.environmentalMetrics.glazing}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-text-muted">AIR TIGHTNESS</span>
                    <span className="text-text-primary font-bold">{residence.environmentalMetrics.airTightness}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Material Palette (Links directly to Material Preview pages) */}
            {residence.materials && (
              <div className="p-6 rounded-lg bg-bg-tertiary border border-border-subtle space-y-4 shadow-sm">
                <span className="font-mono text-xs text-text-muted uppercase tracking-widest font-semibold block">
                  Primary Material Palette (Click to inspect)
                </span>

                <div className="space-y-2">
                  {residence.materials.map((matId) => (
                    <Link
                      key={matId}
                      to={`/material/${matId}`}
                      className="p-4 rounded-md bg-bg-elevated border border-border-subtle hover:border-border-accent transition-all flex items-center justify-between group"
                    >
                      <div>
                        <span className="font-heading text-lg text-text-primary font-normal block group-hover:text-accent-ochre transition-colors capitalize">
                          {matId.replace('-', ' ')}
                        </span>
                        <span className="font-mono text-xs text-text-muted">Inspect Material Monograph →</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-text-secondary group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Other Residences Navigator */}
            <div className="p-6 rounded-lg bg-bg-tertiary border border-border-subtle space-y-3 shadow-sm">
              <span className="font-mono text-xs text-text-muted uppercase tracking-widest font-semibold block">
                Explore Other Residences
              </span>
              <div className="grid grid-cols-2 gap-2">
                {residences
                  .filter((r) => r.id !== residence.id)
                  .slice(0, 4)
                  .map((other) => (
                    <Link
                      key={other.id}
                      to={`/residence/${other.id}`}
                      className="p-3 rounded-md bg-bg-elevated border border-border-subtle hover:border-border-accent transition-all text-xs font-mono text-text-primary hover:text-accent-ochre truncate block"
                    >
                      {other.title}
                    </Link>
                  ))}
              </div>
            </div>

            {/* Commission CTA Card */}
            <div className="p-8 rounded-lg bg-bg-graphite text-text-light space-y-4 shadow-md">
              <span className="font-script text-3xl text-accent-ochre block">
                Private Commission
              </span>
              <p className="font-sans text-xs text-text-light/80 leading-relaxed">
                Interested in building a custom residence inspired by {residence.title}? Schedule a confidential project consultation with our principal architect.
              </p>
              <button
                onClick={onOpenCommission}
                className="w-full py-3.5 rounded bg-bg-primary text-text-primary font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors cursor-pointer shadow-sm"
              >
                Inquire About This Residence Style →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
