import React, { useState } from 'react';
import { ArrowUpRight, MapPin, Layers, SlidersHorizontal } from 'lucide-react';
import { useRouter, Link } from '../router';
import { useCMS } from '../cms';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function HomesPage({ onOpenCommission }) {
  const { residences } = useCMS();
  const { navigate } = useRouter();
  const categories = ['All', ...new Set((residences || []).map((r) => r.category).filter(Boolean))];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewModes, setViewModes] = useState({});
  const [headerRef, isHeaderRevealed] = useScrollReveal({ threshold: 0.1 });
  const [gridRef, isGridRevealed] = useScrollReveal({ threshold: 0.1 });

  const filteredResidences =
    selectedCategory === 'All'
      ? residences
      : residences.filter((r) => r.category === selectedCategory);

  const toggleViewMode = (e, id) => {
    e.stopPropagation();
    setViewModes((prev) => ({
      ...prev,
      [id]: prev[id] === 'blueprint' ? 'photo' : 'blueprint',
    }));
  };

  return (
    <div className="pt-28 pb-32 bg-bg-primary text-text-primary">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className={`h-[1px] bg-text-muted transition-all duration-700 ease-luxury-out ${
                isHeaderRevealed ? 'w-8 opacity-100' : 'w-0 opacity-0'
              }`} />
              <span className="font-mono text-xs text-text-muted uppercase tracking-[0.25em] font-semibold">
                Built Works Catalogue
              </span>
            </div>

            <h1 className={`flex flex-wrap items-baseline gap-x-4 transition-all duration-700 ease-luxury-out ${
              isHeaderRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <span className="font-script text-6xl sm:text-7xl md:text-9xl text-accent-ochre font-normal">
                Curated
              </span>
              <span className="font-heading text-4xl sm:text-6xl md:text-8xl text-text-primary tracking-tight font-normal">
                Residences
              </span>
            </h1>

            <p className={`font-sans text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed pt-2 transition-all duration-700 ease-luxury-out delay-150 ${
              isHeaderRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              A monograph collection of {residences.length} private custom homes designed and built across mountains, coastlines, gardens, and cities worldwide.
            </p>
          </div>

          {/* Category Filter Bar */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ease-luxury-out cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-bg-graphite text-text-light font-bold shadow-sm scale-105'
                    : 'bg-bg-tertiary text-text-secondary hover:text-text-primary border border-border-subtle hover:bg-bg-elevated'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Monograph Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredResidences.map((r, idx) => (
            <div
              key={r.id}
              onClick={() => navigate(`/residence/${r.id}`)}
              style={{ transitionDelay: `${(idx % 4) * 100}ms` }}
              className={`group bg-bg-tertiary rounded-lg overflow-hidden border border-border-subtle hover:border-border-accent transition-all duration-700 ease-luxury-out cursor-pointer shadow-sm flex flex-col justify-between card-architectural ${
                isGridRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Media Plate with Blueprint/Photo Toggle */}
              <div className="relative aspect-[16/10] overflow-hidden bg-bg-secondary">
                <img
                  src={
                    viewModes[r.id] === 'blueprint'
                      ? (r.blueprint || r.photo)
                      : r.photo
                  }
                  alt={r.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-graphite/70 via-transparent to-transparent opacity-80" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-text-light px-3 py-1 rounded bg-bg-graphite/85 backdrop-blur-md border border-border-subtle font-semibold">
                    {r.category} // {r.year}
                  </div>

                  <button
                    onClick={(e) => toggleViewMode(e, r.id)}
                    className="font-mono text-[10px] uppercase tracking-wider text-text-light px-3 py-1 rounded bg-bg-primary/20 backdrop-blur-md hover:bg-bg-graphite border border-white/30 transition-colors flex items-center gap-1.5"
                  >
                    <Layers className="w-3 h-3 text-accent-ochre" />
                    <span>{viewModes[r.id] === 'blueprint' ? 'View Photo' : 'View Floorplan'}</span>
                  </button>
                </div>

                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-bg-primary/90 backdrop-blur-md border border-border-subtle flex items-center justify-center text-text-primary group-hover:bg-bg-graphite group-hover:text-text-light transition-colors shadow-sm">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Monograph Meta */}
              <div className="p-7 space-y-3">
                <div className="flex items-center gap-2 text-text-muted text-xs font-mono font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-accent-ochre" />
                  <span>{r.location}</span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl text-text-primary font-normal group-hover:text-accent-ochre transition-colors">
                  {r.title}
                </h2>

                <p className="font-sans text-sm text-text-secondary leading-relaxed line-clamp-2">
                  {r.description}
                </p>

                <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-text-muted">
                  <span>SIZE: {r.area}</span>
                  <span className="font-bold text-text-primary group-hover:underline">Open Full Residence Monograph →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
