import React, { useState } from 'react';
import { ArrowUpRight, MapPin, Layers, ArrowRight } from 'lucide-react';
import { useRouter, Link } from '../router';
import { useCMS } from '../cms';
import { useScrollReveal } from '../hooks/useScrollReveal';
import AnimatedHeading from './AnimatedHeading';

export default function CuratedResidences({ onOpenCommission }) {
  const { residences } = useCMS();
  const { navigate } = useRouter();
  const categories = ['All', ...new Set((residences || []).map((r) => r.category).filter(Boolean))];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewModes, setViewModes] = useState({});
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
    <section id="curated-works" className="py-20 md:py-36 bg-bg-primary relative border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Animated Editorial Section Header */}
        <AnimatedHeading
          script="Featured"
          title="Homes"
          subtitle="Explore private sanctuaries shaped by stone, timber, and daylight."
          rightContent={
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ease-luxury-out cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-bg-graphite text-text-light font-bold shadow-sm scale-105'
                      : 'bg-bg-tertiary text-text-secondary hover:text-text-primary border border-border-subtle hover:bg-bg-elevated'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          }
        />

        {/* Asymmetrical Editorial Grid Layout with Staggered Entrance */}
        <div ref={gridRef} className="space-y-8 sm:space-y-10">
          {/* Row 1: 8-Column Wide Plate + 4-Column Vertical Plate */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Project 1 - 8 cols */}
            {filteredResidences[0] && (
              <div
                onClick={() => navigate(`/residence/${filteredResidences[0].id}`)}
                className={`lg:col-span-8 group relative rounded-lg overflow-hidden bg-bg-tertiary border border-border-subtle hover:border-border-accent transition-all duration-700 ease-luxury-out cursor-pointer shadow-sm flex flex-col justify-between card-architectural ${
                  isGridRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-bg-secondary">
                  <img
                    src={
                      viewModes[filteredResidences[0].id] === 'blueprint'
                        ? (filteredResidences[0].blueprint || filteredResidences[0].photo)
                        : filteredResidences[0].photo
                    }
                    alt={filteredResidences[0].title}
                    className="w-full h-full object-cover transition-all duration-700 ease-luxury-out group-hover:scale-105 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-graphite/70 via-transparent to-transparent opacity-80" />

                  {/* Top Badges & Blueprint View Mode Toggle */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex items-center gap-2">
                    <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-text-light px-2.5 sm:px-3 py-1 rounded bg-bg-graphite/85 backdrop-blur-md border border-border-subtle font-semibold">
                      {filteredResidences[0].category} // {filteredResidences[0].year}
                    </div>

                    <button
                      onClick={(e) => toggleViewMode(e, filteredResidences[0].id)}
                      className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-text-light px-2.5 sm:px-3 py-1 rounded bg-bg-primary/20 backdrop-blur-md hover:bg-bg-graphite border border-white/30 transition-colors flex items-center gap-1.5"
                    >
                      <Layers className="w-3 h-3 text-accent-ochre" />
                      <span>{viewModes[filteredResidences[0].id] === 'blueprint' ? 'View Photo' : 'View Floorplan'}</span>
                    </button>
                  </div>

                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-bg-primary/90 backdrop-blur-md border border-border-subtle flex items-center justify-center text-text-primary group-hover:bg-bg-graphite group-hover:text-text-light transition-all duration-300 shadow-sm group-hover:scale-110">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-5 sm:p-7 space-y-3">
                  <div className="flex items-center gap-2 text-text-muted text-xs font-mono font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-accent-ochre" />
                    <span>{filteredResidences[0].location}</span>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl text-text-primary font-normal group-hover:text-accent-ochre transition-colors">
                    {filteredResidences[0].title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed max-w-2xl">
                    {filteredResidences[0].description}
                  </p>

                  <div className="pt-3 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-text-muted">
                    <span>HOME SIZE: {filteredResidences[0].area}</span>
                    <span className="font-bold text-text-primary group-hover:underline">Open Detailed Residence Monograph →</span>
                  </div>
                </div>
              </div>
            )}

            {/* Project 2 - 4 cols */}
            {filteredResidences[1] && (
              <div
                onClick={() => navigate(`/residence/${filteredResidences[1].id}`)}
                className={`lg:col-span-4 group relative rounded-lg overflow-hidden bg-bg-tertiary border border-border-subtle hover:border-border-accent transition-all duration-700 ease-luxury-out delay-150 cursor-pointer shadow-sm flex flex-col justify-between card-architectural ${
                  isGridRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="relative aspect-[16/10] sm:aspect-[4/5] overflow-hidden bg-bg-secondary">
                  <img
                    src={
                      viewModes[filteredResidences[1].id] === 'blueprint'
                        ? (filteredResidences[1].blueprint || filteredResidences[1].photo)
                        : filteredResidences[1].photo
                    }
                    alt={filteredResidences[1].title}
                    className="w-full h-full object-cover transition-all duration-700 ease-luxury-out group-hover:scale-105 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-graphite/70 via-transparent to-transparent opacity-80" />

                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex items-center gap-2">
                    <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-text-light px-2.5 sm:px-3 py-1 rounded bg-bg-graphite/85 backdrop-blur-md border border-border-subtle font-semibold">
                      {filteredResidences[1].category}
                    </div>

                    <button
                      onClick={(e) => toggleViewMode(e, filteredResidences[1].id)}
                      className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-text-light px-2.5 py-1 rounded bg-bg-primary/20 backdrop-blur-md hover:bg-bg-graphite border border-white/30 transition-colors flex items-center gap-1"
                    >
                      <Layers className="w-3 h-3 text-accent-ochre" />
                      <span>{viewModes[filteredResidences[1].id] === 'blueprint' ? 'Photo' : 'Plan'}</span>
                    </button>
                  </div>

                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-bg-primary/90 backdrop-blur-md border border-border-subtle flex items-center justify-center text-text-primary group-hover:bg-bg-graphite group-hover:text-text-light transition-all duration-300 shadow-sm group-hover:scale-110">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-2">
                  <div className="flex items-center gap-2 text-text-muted text-xs font-mono font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-accent-ochre" />
                    <span>{filteredResidences[1].location}</span>
                  </div>

                  <h3 className="font-heading text-2xl text-text-primary font-normal group-hover:text-accent-ochre transition-colors">
                    {filteredResidences[1].title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-3">
                    {filteredResidences[1].description}
                  </p>

                  <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-text-muted">
                    <span>SIZE: {filteredResidences[1].area}</span>
                    <span className="font-bold text-text-primary">Inspect →</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Row 2: 5-Column + 7-Column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Project 3 - 5 cols */}
            {filteredResidences[2] && (
              <div
                onClick={() => navigate(`/residence/${filteredResidences[2].id}`)}
                className={`lg:col-span-5 group relative rounded-lg overflow-hidden bg-bg-tertiary border border-border-subtle hover:border-border-accent transition-all duration-700 ease-luxury-out delay-300 cursor-pointer shadow-sm flex flex-col justify-between card-architectural ${
                  isGridRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-bg-secondary">
                  <img
                    src={
                      viewModes[filteredResidences[2].id] === 'blueprint'
                        ? (filteredResidences[2].blueprint || filteredResidences[2].photo)
                        : filteredResidences[2].photo
                    }
                    alt={filteredResidences[2].title}
                    className="w-full h-full object-cover transition-all duration-700 ease-luxury-out group-hover:scale-105 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-graphite/70 via-transparent to-transparent opacity-80" />

                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex items-center gap-2">
                    <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-text-light px-2.5 sm:px-3 py-1 rounded bg-bg-graphite/85 backdrop-blur-md border border-border-subtle font-semibold">
                      {filteredResidences[2].category}
                    </div>

                    <button
                      onClick={(e) => toggleViewMode(e, filteredResidences[2].id)}
                      className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-text-light px-2.5 py-1 rounded bg-bg-primary/20 backdrop-blur-md hover:bg-bg-graphite border border-white/30 transition-colors flex items-center gap-1"
                    >
                      <Layers className="w-3 h-3 text-accent-ochre" />
                      <span>{viewModes[filteredResidences[2].id] === 'blueprint' ? 'Photo' : 'Plan'}</span>
                    </button>
                  </div>

                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-bg-primary/90 backdrop-blur-md border border-border-subtle flex items-center justify-center text-text-primary group-hover:bg-bg-graphite group-hover:text-text-light transition-all duration-300 shadow-sm group-hover:scale-110">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-2">
                  <div className="flex items-center gap-2 text-text-muted text-xs font-mono font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-accent-ochre" />
                    <span>{filteredResidences[2].location}</span>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl text-text-primary font-normal group-hover:text-accent-ochre transition-colors">
                    {filteredResidences[2].title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-3">
                    {filteredResidences[2].description}
                  </p>

                  <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-text-muted">
                    <span>SIZE: {filteredResidences[2].area}</span>
                    <span className="font-bold text-text-primary">Inspect →</span>
                  </div>
                </div>
              </div>
            )}

            {/* Project 4 - 7 cols */}
            {filteredResidences[3] && (
              <div
                onClick={() => navigate(`/residence/${filteredResidences[3].id}`)}
                className={`lg:col-span-7 group relative rounded-lg overflow-hidden bg-bg-tertiary border border-border-subtle hover:border-border-accent transition-all duration-700 ease-luxury-out delay-400 cursor-pointer shadow-sm flex flex-col justify-between card-architectural ${
                  isGridRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-bg-secondary">
                  <img
                    src={
                      viewModes[filteredResidences[3].id] === 'blueprint'
                        ? (filteredResidences[3].blueprint || filteredResidences[3].photo)
                        : filteredResidences[3].photo
                    }
                    alt={filteredResidences[3].title}
                    className="w-full h-full object-cover transition-all duration-700 ease-luxury-out group-hover:scale-105 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-graphite/70 via-transparent to-transparent opacity-80" />

                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex items-center gap-2">
                    <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-text-light px-2.5 sm:px-3 py-1 rounded bg-bg-graphite/85 backdrop-blur-md border border-border-subtle font-semibold">
                      {filteredResidences[3].category}
                    </div>

                    <button
                      onClick={(e) => toggleViewMode(e, filteredResidences[3].id)}
                      className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-text-light px-2.5 sm:px-3 py-1 rounded bg-bg-primary/20 backdrop-blur-md hover:bg-bg-graphite border border-white/30 transition-colors flex items-center gap-1.5"
                    >
                      <Layers className="w-3 h-3 text-accent-ochre" />
                      <span>{viewModes[filteredResidences[3].id] === 'blueprint' ? 'View Photo' : 'View Floorplan'}</span>
                    </button>
                  </div>

                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-bg-primary/90 backdrop-blur-md border border-border-subtle flex items-center justify-center text-text-primary group-hover:bg-bg-graphite group-hover:text-text-light transition-all duration-300 shadow-sm group-hover:scale-110">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-5 sm:p-7 space-y-3">
                  <div className="flex items-center gap-2 text-text-muted text-xs font-mono font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-accent-ochre" />
                    <span>{filteredResidences[3].location}</span>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl text-text-primary font-normal group-hover:text-accent-ochre transition-colors">
                    {filteredResidences[3].title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {filteredResidences[3].description}
                  </p>

                  <div className="pt-3 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-text-muted">
                    <span>PENTHOUSE SIZE: {filteredResidences[3].area}</span>
                    <span className="font-bold text-text-primary group-hover:underline">Open Detailed Residence Monograph →</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section Bottom Bridge Button to /homes */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            to="/homes"
            className="inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded bg-bg-tertiary hover:bg-bg-elevated text-text-primary font-mono text-[11px] sm:text-xs uppercase tracking-widest border border-border-subtle hover:border-border-graphite transition-all shadow-sm group"
          >
            <span>View All {residences.length} Built Works in Full Catalogue</span>
            <ArrowRight className="w-4 h-4 text-accent-ochre group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
