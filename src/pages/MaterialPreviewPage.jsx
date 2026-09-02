import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Shield, MapPin, CheckCircle2, ArrowRight, Layers, Compass } from 'lucide-react';
import { useRouter, Link } from '../router';
import { useCMS } from '../cms';

export default function MaterialPreviewPage({ onOpenCommission }) {
  const { materials, residences } = useCMS();
  const { path } = useRouter();
  const [isZoomed, setIsZoomed] = useState(false);

  // Extract material id from path: /material/:id
  const materialId = path.split('/')[2] || 'travertine';
  const material = materials.find((m) => m.id === materialId) || materials[0] || {};

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [materialId]);

  if (!material || !material.id) {
    return (
      <div className="pt-36 pb-32 text-center text-text-primary bg-bg-primary min-h-screen">
        <h1 className="font-heading text-3xl mb-4">Material Not Found</h1>
        <Link to="/materials" className="font-mono text-xs uppercase underline">Back to Materials</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 sm:pt-28 pb-24 sm:pb-32 bg-bg-primary text-text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-12 sm:space-y-16">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle pb-4 sm:pb-6">
          <Link
            to="/materials"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Materials Archive</span>
          </Link>

          <span className="font-mono text-[10px] sm:text-xs text-text-muted">
            SPECIMEN 0{material.num} // {material.category}
          </span>
        </div>

        {/* Hero Title Section */}
        <div className="space-y-3 sm:space-y-4 max-w-4xl">
          <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-text-muted uppercase tracking-widest font-semibold">
            <MapPin className="w-3.5 h-3.5 text-accent-ochre" />
            <span>{material.origin}</span>
          </div>

          <h1 className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-4">
            <span className="font-script text-4xl sm:text-6xl md:text-8xl text-accent-ochre font-normal">
              {material.name?.split(' ')[0]}
            </span>
            <span className="font-heading text-3xl sm:text-5xl md:text-7xl text-text-primary tracking-tight font-normal">
              {material.name?.split(' ').slice(1).join(' ')}
            </span>
          </h1>

          <p className="font-sans text-xs sm:text-base md:text-lg text-text-secondary leading-relaxed pt-1 sm:pt-2 max-w-3xl">
            {material.description}
          </p>
        </div>

        {/* Large Specimen Texture Viewer (with Microscopic Zoom) */}
        <div
          onClick={() => setIsZoomed(!isZoomed)}
          className="relative aspect-[16/10] sm:aspect-[16/9] rounded-lg overflow-hidden border border-border-subtle cursor-pointer group shadow-md"
        >
          <img
            src={material.image}
            alt={material.name}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isZoomed ? 'scale-150' : 'group-hover:scale-105'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-graphite/60 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 font-mono text-[10px] sm:text-xs text-text-primary bg-bg-primary/95 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded border border-border-subtle flex items-center gap-1.5 sm:gap-2 font-bold shadow-md">
            <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-accent-ochre" />
            <span>{isZoomed ? "Macro Zoom: Active (Tap to reset)" : "Tap image for texture zoom"}</span>
          </div>

          <div className="absolute top-3 sm:top-6 right-3 sm:right-6 font-mono text-[10px] sm:text-xs text-text-light bg-bg-graphite/85 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded border border-border-subtle font-semibold">
            FINISH: {material.finish}
          </div>
        </div>

        {/* 2-Column Geological Monograph Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Geological Narrative & Applications (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <span className="font-mono text-xs text-text-muted uppercase tracking-widest font-semibold block">
                Geological Narrative & Craftsmanship
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl text-text-primary font-normal">
                Origin & Tactile Character
              </h2>
              <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed">
                {material.geologicalNarrative || material.description}
              </p>
            </div>

            {/* Recommended Applications */}
            {material.applications && (
              <div className="p-8 rounded-lg bg-bg-tertiary border border-border-subtle space-y-4 shadow-sm">
                <h3 className="font-heading text-2xl text-text-primary font-normal">
                  Architectural Applications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(Array.isArray(material.applications) ? material.applications : [material.applications]).map((app) => (
                    <div key={app} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-accent-ochre mt-1 flex-shrink-0" />
                      <span className="font-sans text-sm text-text-primary font-medium">{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Scientific Specification Table (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-lg bg-bg-tertiary border border-border-subtle shadow-sm space-y-6">
              <h3 className="font-heading text-2xl text-text-primary font-normal border-b border-border-subtle pb-4">
                Physical Specifications
              </h3>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex justify-between py-2 border-b border-border-subtle">
                  <span className="text-text-muted">ORIGIN</span>
                  <span className="text-text-primary font-bold">{material.origin}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-subtle">
                  <span className="text-text-muted">MATERIAL DENSITY</span>
                  <span className="text-text-primary font-bold">{material.density}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-subtle">
                  <span className="text-text-muted">COMPRESSIVE STRENGTH</span>
                  <span className="text-text-primary font-bold">{material.compressiveStrength || '120 MPa'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-subtle">
                  <span className="text-text-muted">ACOUSTIC ABSORPTION</span>
                  <span className="text-text-primary font-bold">{material.acousticAbsorption || '0.45 αw'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-subtle">
                  <span className="text-text-muted">THERMAL CONDUCTIVITY</span>
                  <span className="text-text-primary font-bold">{material.thermalConductivity || '1.8 W/mK'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-subtle">
                  <span className="text-text-muted">POROSITY MATRIX</span>
                  <span className="text-text-primary font-bold">{material.porosity || '3.5%'}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-text-muted">FIRE SAFETY RATING</span>
                  <span className="text-text-primary font-bold">{material.fireRating || 'Class A1'}</span>
                </div>
              </div>
            </div>

            {/* Other Materials Switcher */}
            <div className="p-6 rounded-lg bg-bg-tertiary border border-border-subtle space-y-3 shadow-sm">
              <span className="font-mono text-xs text-text-muted uppercase tracking-widest font-semibold block">
                Explore Other Materials
              </span>
              <div className="grid grid-cols-2 gap-2">
                {materials
                  .filter((m) => m.id !== material.id)
                  .map((other) => (
                    <Link
                      key={other.id}
                      to={`/material/${other.id}`}
                      className="p-3 rounded-md bg-bg-elevated border border-border-subtle hover:border-border-accent transition-all text-xs font-mono text-text-primary hover:text-accent-ochre truncate block"
                    >
                      {other.name}
                    </Link>
                  ))}
              </div>
            </div>

            {/* Request Sample Swatch CTA */}
            <div className="p-8 rounded-lg bg-bg-graphite text-text-light space-y-4 shadow-md">
              <span className="font-script text-3xl text-accent-ochre block">
                Physical Material Sample
              </span>
              <p className="font-sans text-xs text-text-light/80 leading-relaxed">
                Order a physical hand-finished swatch of {material.name} delivered directly to your home or office in a custom keepsake wood box.
              </p>
              <button
                onClick={onOpenCommission}
                className="w-full py-3.5 rounded bg-bg-primary text-text-primary font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors cursor-pointer shadow-sm"
              >
                Request Sample Swatch →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
