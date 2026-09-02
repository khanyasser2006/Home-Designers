import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Layers,
  Building,
  Shield,
  FileText,
  Sliders,
  Globe,
  Award,
  Eye,
  LogOut,
  X,
  Lock,
  Compass,
  Clock,
  BookOpen,
  Send,
} from 'lucide-react';
import { useCMS } from '../cms';
import { useAuth } from '../auth';
import { useRouter, Link } from '../router';
import ImageDropzone from '../components/ImageDropzone';
import { useScrollLock } from '../hooks/useScrollLock';

export default function AdminCMSPage() {
  const {
    residences,
    materials,
    philosophy,
    detailedPillars,
    essays,
    founderLetter,
    standards,
    benchmarks,
    phases,
    heroChapters,
    acclaim,
    studios,
    commissionConfig,
    createResidence,
    updateResidence,
    deleteResidence,
    createMaterial,
    updateMaterial,
    deleteMaterial,
    updatePhilosophy,
    updatePillar,
    updateDetailedPillar,
    createEssay,
    updateEssay,
    deleteEssay,
    updateFounderLetter,
    updateStandards,
    updateBenchmark,
    createPhase,
    updatePhase,
    deletePhase,
    updateHeroChapter,
    createAcclaim,
    updateAcclaim,
    deleteAcclaim,
    createStudio,
    updateStudio,
    deleteStudio,
    updateCommissionConfig,
    resetToDefaults,
  } = useCMS();

  const { user, logout } = useAuth();
  const { navigate } = useRouter();

  const [activeTab, setActiveTab] = useState('residences');
  const [notification, setNotification] = useState('');

  // Editing Modals State
  const [editingResidence, setEditingResidence] = useState(null);
  const [isCreatingResidence, setIsCreatingResidence] = useState(false);

  const [editingMaterial, setEditingMaterial] = useState(null);
  const [isCreatingMaterial, setIsCreatingMaterial] = useState(false);

  const [editingAcclaim, setEditingAcclaim] = useState(null);
  const [isCreatingAcclaim, setIsCreatingAcclaim] = useState(false);

  const [editingStudio, setEditingStudio] = useState(null);
  const [isCreatingStudio, setIsCreatingStudio] = useState(false);

  const [editingEssay, setEditingEssay] = useState(null);
  const [isCreatingEssay, setIsCreatingEssay] = useState(false);

  const [editingPhase, setEditingPhase] = useState(null);
  const [isCreatingPhase, setIsCreatingPhase] = useState(false);

  // Lock background scroll (including Lenis) when any CMS modal is open
  const isAnyModalOpen =
    !!editingResidence ||
    !!editingMaterial ||
    !!editingAcclaim ||
    !!editingStudio ||
    !!editingEssay ||
    !!editingPhase;
  useScrollLock(isAnyModalOpen);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  // ADMIN SECURITY GUARD
  if (!user || !user.isAdmin) {
    return (
      <div className="pt-32 pb-32 bg-bg-primary text-text-primary min-h-screen flex items-center">
        <div className="max-w-md mx-auto px-6 w-full text-center space-y-6">
          <div className="w-12 h-12 rounded-sm bg-bg-graphite text-text-light flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-5 h-5 text-accent-ochre" />
          </div>

          <div className="space-y-2">
            <span className="font-mono text-xs text-accent-ochre uppercase tracking-widest font-bold block">
              Restricted Atelier Access
            </span>
            <h1 className="font-heading text-3xl text-text-primary font-normal">
              Admin Authentication Required
            </h1>
            <p className="font-sans text-xs text-text-secondary leading-relaxed">
              The Headless Content Management System is restricted to atelier directors. Please sign in with your administrator credentials.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <Link
              to="/auth"
              className="w-full py-3 rounded bg-bg-graphite text-text-light font-mono text-xs uppercase tracking-wider font-bold hover:bg-accent-graphite-hover transition-colors block text-center shadow-sm"
            >
              Sign In with Admin Credentials →
            </Link>

            <Link
              to="/"
              className="text-xs font-mono text-text-muted hover:text-text-primary uppercase tracking-wider block"
            >
              ← Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 sm:pt-24 pb-24 sm:pb-32 bg-bg-primary text-text-primary min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-8 sm:space-y-10">
        {/* Top Control Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4 sm:pb-6">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-text-primary uppercase tracking-wider transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home Flight</span>
            </Link>

            <span className="font-mono text-xs text-text-muted hidden sm:inline">
              LIVE HEADLESS CMS // INSTANT REACTIVE SYNC
            </span>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="flex items-center gap-2 font-mono text-xs text-text-primary bg-bg-elevated px-3 sm:px-3.5 py-1.5 rounded border border-border-graphite font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
              <span className="truncate max-w-[200px] sm:max-w-none">Admin: {user.name}</span>
            </div>

            <button
              onClick={() => {
                logout();
                navigate('/auth');
              }}
              className="p-2 rounded bg-bg-tertiary hover:bg-bg-elevated border border-border-subtle text-text-secondary hover:text-text-primary cursor-pointer"
              title="Sign Out of CMS"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CMS Headline Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[1px] bg-accent-ochre" />
              <span className="font-mono text-xs text-accent-ochre uppercase tracking-widest font-bold">
                Atelier Architectural Engine
              </span>
            </div>
            <h1 className="flex flex-wrap items-baseline gap-x-3">
              <span className="font-script text-4xl sm:text-6xl md:text-7xl text-accent-ochre font-normal">
                Headless
              </span>
              <span className="font-heading text-3xl sm:text-5xl md:text-6xl text-text-primary font-normal">
                Content Management System
              </span>
            </h1>
            <p className="font-sans text-xs sm:text-sm text-text-secondary max-w-2xl">
              Create, read, update, and delete any content across residences, materials, philosophy pillars, quality standards, hero waypoints, press acclaim, global studios, and inquiry forms.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (window.confirm('Reset all CMS data back to clean architectural portfolio defaults? This will restore original images and monographs.')) {
                  resetToDefaults();
                  showNotification('All CMS data reset to original defaults!');
                }
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded bg-bg-tertiary hover:bg-bg-elevated border border-border-subtle text-text-secondary hover:text-text-primary font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer shadow-sm"
              title="Reset CMS to original architectural defaults"
            >
              <RotateCcw className="w-3.5 h-3.5 text-accent-ochre" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="p-4 rounded-md bg-green-500/10 border border-green-500/20 text-green-900 font-mono text-xs flex items-center gap-2 shadow-sm animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-green-700 flex-shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Tab Navigation Bar with Smooth Horizontal Touch Rail */}
        <div className="flex items-center gap-2 border-b border-border-subtle pb-4 overflow-x-auto no-scrollbar max-w-full flex-nowrap sm:flex-wrap">
          {[
            { id: 'residences', label: `Homes (${residences.length})`, icon: Building },
            { id: 'materials', label: `Materials (${materials.length})`, icon: Layers },
            { id: 'philosophy', label: 'Philosophy & Essays', icon: Sparkles },
            { id: 'standards', label: 'Standards & Phases', icon: Shield },
            { id: 'hero', label: `Hero Flight (${heroChapters.length})`, icon: Compass },
            { id: 'acclaim', label: `Press Acclaim (${acclaim.length})`, icon: Award },
            { id: 'studios', label: `Global Studios (${studios.length})`, icon: Globe },
            { id: 'commission', label: 'Inquiry Forms', icon: Send },
          ].map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-md font-mono text-xs uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-bg-graphite text-text-light font-bold shadow-md'
                    : 'bg-bg-tertiary text-text-secondary hover:text-text-primary border border-border-subtle'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: RESIDENCES CRUD */}
        {/* ========================================================================= */}
        {activeTab === 'residences' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-heading text-2xl text-text-primary font-normal">
                  Residences Portfolio Archive
                </h2>
                <p className="font-sans text-xs text-text-secondary">
                  Manage the private monograph catalog, spatial programs, and blueprints.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingResidence({
                    id: '',
                    title: 'New Custom Villa',
                    subtitle: 'Bespoke architectural residence',
                    location: 'Geneva, Switzerland',
                    category: 'Mountain',
                    year: '2026',
                    area: '1,100 m²',
                    orientation: 'South-Facing Alpine Valley',
                    materials: ['travertine', 'yakisugi'],
                    photo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
                    blueprint: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85',
                    description: 'A bespoke family home built with natural stone and timber.',
                  });
                  setIsCreatingResidence(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-bg-graphite text-text-light font-mono text-xs uppercase tracking-wider font-bold hover:bg-accent-graphite-hover transition-colors cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Residence Monograph</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {residences.map((res) => (
                <div
                  key={res.id}
                  className="rounded-lg bg-bg-tertiary border border-border-subtle overflow-hidden flex flex-col justify-between shadow-sm hover:border-border-accent transition-all"
                >
                  <div className="aspect-[16/10] bg-bg-secondary relative overflow-hidden">
                    <img src={res.photo} alt={res.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 bg-bg-graphite/80 backdrop-blur-sm text-text-light px-2.5 py-1 rounded text-[10px] font-mono uppercase">
                      {res.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-accent-ochre uppercase font-bold block">
                        {res.location} // {res.year}
                      </span>
                      <h3 className="font-heading text-2xl text-text-primary font-normal leading-snug">
                        {res.title}
                      </h3>
                      <p className="font-sans text-xs text-text-secondary line-clamp-2 mt-1">
                        {res.subtitle || res.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-border-subtle flex items-center justify-between">
                      <span className="font-mono text-xs text-text-muted">{res.area}</span>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/residence/${res.id}`}
                          className="p-1.5 rounded bg-bg-primary text-text-secondary hover:text-text-primary cursor-pointer"
                          title="Preview Live Page"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => {
                            setEditingResidence(res);
                            setIsCreatingResidence(false);
                          }}
                          className="p-1.5 rounded bg-bg-primary text-text-primary hover:text-accent-ochre cursor-pointer"
                          title="Edit Residence"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${res.title}"?`)) {
                              deleteResidence(res.id);
                              showNotification(`Residence "${res.title}" deleted.`);
                            }
                          }}
                          className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-700 border border-red-500/20 cursor-pointer"
                          title="Delete Residence"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: MATERIALS CRUD */}
        {/* ========================================================================= */}
        {activeTab === 'materials' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-heading text-2xl text-text-primary font-normal">
                  Geological Materials Archive
                </h2>
                <p className="font-sans text-xs text-text-secondary">
                  Manage natural stone swatches, timber finishes, tactile ratings, and technical specs.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingMaterial({
                    id: '',
                    num: String(materials.length + 1).padStart(2, '0'),
                    name: 'New Geological Specimen',
                    category: 'Sedimentary Stone',
                    origin: 'Heritage Quarry, Europe',
                    quarryAge: 'Quarried Sustainably',
                    finish: 'Velvet Satin Honed',
                    density: '2,500 kg/m³',
                    compressiveStrength: '120 MPa',
                    acousticAbsorption: '0.40 αw',
                    thermalConductivity: '1.5 W/mK',
                    porosity: '2.5%',
                    fireRating: 'Class A1 Non-Combustible',
                    hapticFeel: 'Silky, cool geological touch',
                    image: 'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=1400&q=85',
                    description: 'A genuine natural specimen crafted for timeless permanence.',
                  });
                  setIsCreatingMaterial(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-bg-graphite text-text-light font-mono text-xs uppercase tracking-wider font-bold hover:bg-accent-graphite-hover transition-colors cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Material Specimen</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map((mat) => (
                <div
                  key={mat.id}
                  className="rounded-lg bg-bg-tertiary border border-border-subtle overflow-hidden flex flex-col justify-between shadow-sm hover:border-border-accent transition-all"
                >
                  <div className="aspect-[16/10] bg-bg-secondary relative overflow-hidden">
                    <img src={mat.image} alt={mat.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 bg-bg-graphite/80 backdrop-blur-sm text-text-light px-2.5 py-1 rounded text-[10px] font-mono">
                      SPECIMEN {mat.num}
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-accent-ochre uppercase font-bold block">
                        {mat.origin}
                      </span>
                      <h3 className="font-heading text-2xl text-text-primary font-normal leading-snug">
                        {mat.name}
                      </h3>
                      <p className="font-sans text-xs text-text-secondary line-clamp-2 mt-1">
                        {mat.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-border-subtle flex items-center justify-between">
                      <span className="font-mono text-[11px] text-text-muted">{mat.finish}</span>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/material/${mat.id}`}
                          className="p-1.5 rounded bg-bg-primary text-text-secondary hover:text-text-primary cursor-pointer"
                          title="Preview Live Page"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => {
                            setEditingMaterial(mat);
                            setIsCreatingMaterial(false);
                          }}
                          className="p-1.5 rounded bg-bg-primary text-text-primary hover:text-accent-ochre cursor-pointer"
                          title="Edit Material"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete material "${mat.name}"?`)) {
                              deleteMaterial(mat.id);
                              showNotification(`Material "${mat.name}" removed from archive.`);
                            }
                          }}
                          className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-700 border border-red-500/20 cursor-pointer"
                          title="Delete Material"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: PHILOSOPHY, PILLARS, ESSAYS & FOUNDER'S LETTER */}
        {/* ========================================================================= */}
        {activeTab === 'philosophy' && (
          <div className="space-y-10">
            {/* Header & Subtitle */}
            <div className="p-8 rounded-lg bg-bg-tertiary border border-border-subtle space-y-6 shadow-sm">
              <h2 className="font-heading text-2xl text-text-primary font-normal border-b border-border-subtle pb-4">
                Philosophy Section Header & Subtitle
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-mono text-xs text-text-muted uppercase font-bold">
                    Cursive Accent Flourish
                  </label>
                  <input
                    type="text"
                    value={philosophy.script}
                    onChange={(e) => updatePhilosophy({ script: e.target.value })}
                    className="w-full px-4 py-2.5 rounded bg-bg-primary border border-border-subtle font-sans text-sm outline-none focus:border-border-graphite"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-xs text-text-muted uppercase font-bold">
                    Heading Title
                  </label>
                  <input
                    type="text"
                    value={philosophy.title}
                    onChange={(e) => updatePhilosophy({ title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded bg-bg-primary border border-border-subtle font-sans text-sm outline-none focus:border-border-graphite"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-xs text-text-muted uppercase font-bold">
                  Overview Subtitle
                </label>
                <textarea
                  rows={2}
                  value={philosophy.subtitle}
                  onChange={(e) => updatePhilosophy({ subtitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded bg-bg-primary border border-border-subtle font-sans text-sm outline-none focus:border-border-graphite"
                />
              </div>

              <button
                onClick={() => showNotification('Philosophy header updated live.')}
                className="px-6 py-2 rounded bg-bg-graphite text-text-light font-mono text-xs uppercase font-bold hover:bg-accent-graphite-hover cursor-pointer"
              >
                Save Philosophy Header
              </button>
            </div>

            {/* Homepage 3 Core Principles */}
            <div className="space-y-4">
              <h3 className="font-heading text-2xl text-text-primary font-normal">
                Homepage 3 Interactive Principles
              </h3>

              <div className="space-y-4">
                {philosophy.pillars.map((pillar) => (
                  <div key={pillar.id} className="p-6 rounded-lg bg-bg-tertiary border border-border-subtle space-y-4 shadow-sm">
                    <div className="flex justify-between items-center border-b border-border-subtle pb-3">
                      <span className="font-mono text-xs text-text-muted font-bold">PILLAR 0{pillar.num}</span>
                      <span className="font-script text-2xl text-accent-ochre">{pillar.script}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block font-mono text-[10px] text-text-muted uppercase font-bold">Pillar Title</label>
                        <input
                          type="text"
                          value={pillar.title}
                          onChange={(e) => updatePillar(pillar.id, { title: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-xs font-sans outline-none focus:border-border-graphite"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block font-mono text-[10px] text-text-muted uppercase font-bold">Subtitle</label>
                        <input
                          type="text"
                          value={pillar.subtitle}
                          onChange={(e) => updatePillar(pillar.id, { subtitle: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-xs font-sans outline-none focus:border-border-graphite"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-mono text-[10px] text-text-muted uppercase font-bold">Description</label>
                      <textarea
                        rows={2}
                        value={pillar.description}
                        onChange={(e) => updatePillar(pillar.id, { description: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-xs font-sans outline-none focus:border-border-graphite"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Architectural Essays */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-2xl text-text-primary font-normal">
                  Architectural Essays ({essays.length})
                </h3>
                <button
                  onClick={() => {
                    setEditingEssay({
                      id: '',
                      tag: 'Design Theory',
                      title: 'New Architectural Essay',
                      readTime: '5 Min Read',
                      excerpt: 'Short summary of the architectural theory...',
                      content: 'Full essay content written for the philosophy monograph page...',
                    });
                    setIsCreatingEssay(true);
                  }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-bg-graphite text-text-light font-mono text-xs uppercase font-bold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Essay</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {essays.map((essay) => (
                  <div key={essay.id} className="p-6 rounded-lg bg-bg-tertiary border border-border-subtle space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center text-xs font-mono text-text-muted mb-2">
                        <span className="bg-bg-elevated px-2 py-0.5 rounded border border-border-subtle font-bold text-text-primary">
                          {essay.tag}
                        </span>
                        <span>{essay.readTime}</span>
                      </div>
                      <h4 className="font-heading text-xl text-text-primary">{essay.title}</h4>
                      <p className="font-sans text-xs text-text-secondary line-clamp-2 mt-1">{essay.excerpt}</p>
                    </div>

                    <div className="pt-3 border-t border-border-subtle flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingEssay(essay);
                          setIsCreatingEssay(false);
                        }}
                        className="p-1.5 rounded bg-bg-primary text-text-primary hover:text-accent-ochre cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete essay "${essay.title}"?`)) {
                            deleteEssay(essay.id);
                            showNotification('Essay removed.');
                          }
                        }}
                        className="p-1.5 rounded bg-red-500/10 text-red-700 hover:bg-red-500/20 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Founder's Letter */}
            <div className="p-8 rounded-lg bg-bg-tertiary border border-border-subtle space-y-4 shadow-sm">
              <h3 className="font-heading text-2xl text-text-primary font-normal border-b border-border-subtle pb-3">
                Founder's Letter Monograph
              </h3>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-text-muted uppercase font-bold">Script Heading</label>
                  <input
                    type="text"
                    value={founderLetter.script}
                    onChange={(e) => updateFounderLetter({ script: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm outline-none focus:border-border-graphite"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-xs text-text-muted uppercase font-bold">Quote Text</label>
                  <textarea
                    rows={3}
                    value={founderLetter.quote}
                    onChange={(e) => updateFounderLetter({ quote: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm outline-none focus:border-border-graphite italic"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block font-mono text-xs text-text-muted uppercase font-bold">Architect Name</label>
                    <input
                      type="text"
                      value={founderLetter.author}
                      onChange={(e) => updateFounderLetter({ author: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm outline-none focus:border-border-graphite"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block font-mono text-xs text-text-muted uppercase font-bold">Architect Title / Role</label>
                    <input
                      type="text"
                      value={founderLetter.role}
                      onChange={(e) => updateFounderLetter({ role: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm outline-none focus:border-border-graphite"
                    />
                  </div>
                </div>

                <button
                  onClick={() => showNotification("Founder's letter updated live.")}
                  className="px-6 py-2 rounded bg-bg-graphite text-text-light font-mono text-xs uppercase font-bold hover:bg-accent-graphite-hover cursor-pointer"
                >
                  Save Letter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: QUALITY STANDARDS, BENCHMARKS & PHASES */}
        {/* ========================================================================= */}
        {activeTab === 'standards' && (
          <div className="space-y-10">
            {/* Quantitative Quality Benchmarks */}
            <div className="p-8 rounded-lg bg-bg-tertiary border border-border-subtle space-y-6 shadow-sm">
              <h2 className="font-heading text-2xl text-text-primary font-normal border-b border-border-subtle pb-4">
                Standards Header & Metrics
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {standards.metrics.map((metric, idx) => (
                  <div key={metric.id} className="p-5 rounded-md bg-bg-elevated border border-border-subtle space-y-3">
                    <div className="space-y-1">
                      <label className="block font-mono text-[10px] text-text-muted uppercase font-bold">Metric Value</label>
                      <input
                        type="text"
                        value={metric.val}
                        onChange={(e) => {
                          const updated = [...standards.metrics];
                          updated[idx].val = e.target.value;
                          updateStandards({ metrics: updated });
                        }}
                        className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm font-heading font-bold outline-none focus:border-border-graphite"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-mono text-[10px] text-text-muted uppercase font-bold">Heading</label>
                      <input
                        type="text"
                        value={metric.heading}
                        onChange={(e) => {
                          const updated = [...standards.metrics];
                          updated[idx].heading = e.target.value;
                          updateStandards({ metrics: updated });
                        }}
                        className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-xs font-sans outline-none focus:border-border-graphite"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-mono text-[10px] text-text-muted uppercase font-bold">Description</label>
                      <textarea
                        rows={2}
                        value={metric.description}
                        onChange={(e) => {
                          const updated = [...standards.metrics];
                          updated[idx].description = e.target.value;
                          updateStandards({ metrics: updated });
                        }}
                        className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-xs font-sans outline-none focus:border-border-graphite"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border-subtle">
                <div className="space-y-1.5">
                  <label className="block font-mono text-xs text-text-muted uppercase font-bold">Structural Warranty</label>
                  <input
                    type="text"
                    value={standards.warranty}
                    onChange={(e) => updateStandards({ warranty: e.target.value })}
                    className="w-full px-4 py-2.5 rounded bg-bg-primary border border-border-subtle text-sm font-sans outline-none focus:border-border-graphite"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-xs text-text-muted uppercase font-bold">Precision Millimetric Tolerance</label>
                  <input
                    type="text"
                    value={standards.precisionTolerance}
                    onChange={(e) => updateStandards({ precisionTolerance: e.target.value })}
                    className="w-full px-4 py-2.5 rounded bg-bg-primary border border-border-subtle text-sm font-sans outline-none focus:border-border-graphite"
                  />
                </div>
              </div>

              <button
                onClick={() => showNotification('Quality standards updated live.')}
                className="px-6 py-2 rounded bg-bg-graphite text-text-light font-mono text-xs uppercase font-bold hover:bg-accent-graphite-hover cursor-pointer"
              >
                Save Standards
              </button>
            </div>

            {/* 4 Core Benchmarks */}
            <div className="space-y-4">
              <h3 className="font-heading text-2xl text-text-primary font-normal">
                4 Core Engineering Benchmarks
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benchmarks.map((bm) => (
                  <div key={bm.id} className="p-6 rounded-lg bg-bg-tertiary border border-border-subtle space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[10px] text-text-muted uppercase font-bold">Benchmark Value</label>
                        <input
                          type="text"
                          value={bm.num}
                          onChange={(e) => updateBenchmark(bm.id, { num: e.target.value })}
                          className="w-full px-3 py-1.5 rounded bg-bg-primary border border-border-subtle text-sm font-heading font-bold outline-none focus:border-border-graphite"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] text-text-muted uppercase font-bold">Label</label>
                        <input
                          type="text"
                          value={bm.label}
                          onChange={(e) => updateBenchmark(bm.id, { label: e.target.value })}
                          className="w-full px-3 py-1.5 rounded bg-bg-primary border border-border-subtle text-xs font-sans outline-none focus:border-border-graphite"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block font-mono text-[10px] text-text-muted uppercase font-bold">Description</label>
                      <textarea
                        rows={2}
                        value={bm.description}
                        onChange={(e) => updateBenchmark(bm.id, { description: e.target.value })}
                        className="w-full px-3 py-1.5 rounded bg-bg-primary border border-border-subtle text-xs font-sans outline-none focus:border-border-graphite"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5-Phase Project Journey */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-2xl text-text-primary font-normal">
                  5-Phase Project Journey ({phases.length})
                </h3>
                <button
                  onClick={() => {
                    setEditingPhase({
                      id: '',
                      phase: String(phases.length + 1).padStart(2, '0'),
                      name: 'New Build Phase',
                      duration: 'Month X',
                      description: 'Description of the construction and inspection milestones...',
                    });
                    setIsCreatingPhase(true);
                  }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-bg-graphite text-text-light font-mono text-xs uppercase font-bold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Phase</span>
                </button>
              </div>

              <div className="space-y-3">
                {phases.map((phase) => (
                  <div key={phase.id} className="p-5 rounded-lg bg-bg-tertiary border border-border-subtle grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-2">
                      <span className="font-heading text-3xl text-text-primary font-normal block">{phase.phase}</span>
                      <span className="font-mono text-xs text-text-muted font-bold">{phase.duration}</span>
                    </div>

                    <div className="md:col-span-4">
                      <h4 className="font-heading text-xl text-text-primary">{phase.name}</h4>
                    </div>

                    <div className="md:col-span-5">
                      <p className="font-sans text-xs text-text-secondary">{phase.description}</p>
                    </div>

                    <div className="md:col-span-1 flex justify-end gap-1">
                      <button
                        onClick={() => {
                          setEditingPhase(phase);
                          setIsCreatingPhase(false);
                        }}
                        className="p-1.5 rounded bg-bg-primary text-text-primary hover:text-accent-ochre cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete Phase "${phase.name}"?`)) {
                            deletePhase(phase.id);
                            showNotification('Phase removed.');
                          }
                        }}
                        className="p-1.5 rounded bg-red-500/10 text-red-700 hover:bg-red-500/20 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: HERO FLIGHT 4-CHAPTER WAYPOINTS */}
        {/* ========================================================================= */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-heading text-2xl text-text-primary font-normal">
                Homepage Hero Flight 4-Chapter Waypoints
              </h2>
              <p className="font-sans text-xs text-text-secondary">
                Edit the script flourishes, monumental titles, and subtitles displayed as visitors scroll through the 600-frame FPV drone sequence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {heroChapters.map((ch, idx) => (
                <div key={ch.id} className="p-6 rounded-lg bg-bg-tertiary border border-border-subtle space-y-4 shadow-sm">
                  <div className="flex justify-between items-center border-b border-border-subtle pb-3">
                    <span className="font-mono text-xs text-text-muted font-bold">WAYPOINT 0{idx + 1}</span>
                    <span className="font-mono text-[10px] text-text-muted bg-bg-elevated px-2 py-0.5 rounded border border-border-subtle">
                      Scroll Range: {ch.range ? `${ch.range[0]} – ${ch.range[1]}` : 'Auto'}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="block font-mono text-[10px] text-text-muted uppercase font-bold">
                        Cursive Script Flourish
                      </label>
                      <input
                        type="text"
                        value={ch.script}
                        onChange={(e) => updateHeroChapter(ch.id, { script: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm outline-none focus:border-border-graphite"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-mono text-[10px] text-text-muted uppercase font-bold">
                        Monumental Heading Title
                      </label>
                      <input
                        type="text"
                        value={ch.title}
                        onChange={(e) => updateHeroChapter(ch.id, { title: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm outline-none focus:border-border-graphite font-heading"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-mono text-[10px] text-text-muted uppercase font-bold">
                        Subtitle Description
                      </label>
                      <textarea
                        rows={2}
                        value={ch.subtitle}
                        onChange={(e) => updateHeroChapter(ch.id, { subtitle: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-xs outline-none focus:border-border-graphite"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => showNotification('Hero Flight waypoints updated live.')}
              className="px-6 py-2.5 rounded bg-bg-graphite text-text-light font-mono text-xs uppercase font-bold hover:bg-accent-graphite-hover cursor-pointer"
            >
              Save Hero Flight Waypoints
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: PRESS ACCLAIM CRUD */}
        {/* ========================================================================= */}
        {activeTab === 'acclaim' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-heading text-2xl text-text-primary font-normal">
                  Magazine & Press Reviews
                </h2>
                <p className="font-sans text-xs text-text-secondary">
                  Manage quotes from Architectural Digest, Wallpaper*, and Dezeen.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingAcclaim({
                    id: '',
                    pub: 'Magazine Name',
                    date: 'Autumn Edition',
                    quote: 'Review quote here...',
                    author: 'Author Name',
                    role: 'Design Editor',
                    stat: 'Award Title',
                  });
                  setIsCreatingAcclaim(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-bg-graphite text-text-light font-mono text-xs uppercase tracking-wider font-bold hover:bg-accent-graphite-hover cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Review</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {acclaim.map((item) => (
                <div key={item.id} className="p-6 rounded-lg bg-bg-tertiary border border-border-subtle flex flex-col justify-between space-y-4 shadow-sm">
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] text-accent-ochre uppercase font-bold block">{item.pub} // {item.date}</span>
                    <p className="font-heading text-base italic text-text-primary">"{item.quote}"</p>
                  </div>

                  <div className="pt-3 border-t border-border-subtle flex items-center justify-between">
                    <div>
                      <span className="font-sans text-xs font-bold text-text-primary block">{item.author}</span>
                      <span className="font-mono text-[10px] text-text-muted">{item.role}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingAcclaim(item);
                          setIsCreatingAcclaim(false);
                        }}
                        className="p-1.5 rounded bg-bg-primary text-text-primary hover:text-accent-ochre cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          deleteAcclaim(item.id);
                          showNotification('Review deleted.');
                        }}
                        className="p-1.5 rounded bg-red-500/10 text-red-700 hover:bg-red-500/20 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: GLOBAL STUDIOS CRUD */}
        {/* ========================================================================= */}
        {activeTab === 'studios' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-heading text-2xl text-text-primary font-normal">
                  Global Atelier Directory ({studios.length})
                </h2>
                <p className="font-sans text-xs text-text-secondary">
                  Manage worldwide atelier offices, local timezones, addresses, and telephone contacts.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingStudio({
                    id: '',
                    city: 'Paris',
                    country: 'France',
                    role: 'European Design Atelier',
                    address: 'Place Vendôme, 75001 Paris',
                    timezone: 'Europe/Paris',
                    utcOffset: 1,
                    phone: '+33 1 42 68 00 00',
                  });
                  setIsCreatingStudio(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-bg-graphite text-text-light font-mono text-xs uppercase tracking-wider font-bold hover:bg-accent-graphite-hover cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Global Studio</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {studios.map((studio) => (
                <div key={studio.id} className="p-6 rounded-lg bg-bg-tertiary border border-border-subtle space-y-4 shadow-sm flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono text-xs text-text-muted uppercase font-bold">{studio.country}</span>
                      <span className="font-mono text-[10px] text-accent-ochre bg-bg-elevated px-2 py-0.5 rounded border border-border-subtle">
                        {studio.timezone}
                      </span>
                    </div>
                    <h3 className="font-heading text-2xl text-text-primary font-normal">{studio.city}</h3>

                    <div className="space-y-1 font-sans text-xs text-text-secondary pt-2">
                      <p className="font-medium text-text-primary">{studio.role}</p>
                      <p>{studio.address}</p>
                      <p className="font-mono text-[11px] text-text-muted">{studio.phone}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border-subtle flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingStudio(studio);
                        setIsCreatingStudio(false);
                      }}
                      className="p-1.5 rounded bg-bg-primary text-text-primary hover:text-accent-ochre cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete studio in "${studio.city}"?`)) {
                          deleteStudio(studio.id);
                          showNotification(`Studio "${studio.city}" removed.`);
                        }
                      }}
                      className="p-1.5 rounded bg-red-500/10 text-red-700 hover:bg-red-500/20 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: COMMISSION & INQUIRY FORM OPTIONS */}
        {/* ========================================================================= */}
        {activeTab === 'commission' && (
          <div className="p-8 rounded-lg bg-bg-tertiary border border-border-subtle space-y-6 shadow-sm">
            <h2 className="font-heading text-2xl text-text-primary font-normal border-b border-border-subtle pb-4">
              Commission & Feasibility Form Options
            </h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block font-mono text-xs text-text-muted uppercase font-bold">
                  Home Typologies (comma-separated)
                </label>
                <input
                  type="text"
                  value={(commissionConfig?.typologies || []).join(', ')}
                  onChange={(e) =>
                    updateCommissionConfig({
                      typologies: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-4 py-2.5 rounded bg-bg-primary border border-border-subtle font-sans text-sm outline-none focus:border-border-graphite"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-xs text-text-muted uppercase font-bold">
                  Living Area Scales (comma-separated)
                </label>
                <input
                  type="text"
                  value={(commissionConfig?.scales || []).join(', ')}
                  onChange={(e) =>
                    updateCommissionConfig({
                      scales: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-4 py-2.5 rounded bg-bg-primary border border-border-subtle font-sans text-sm outline-none focus:border-border-graphite"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-xs text-text-muted uppercase font-bold">
                  Project Scopes (comma-separated)
                </label>
                <input
                  type="text"
                  value={(commissionConfig?.scopes || []).join(', ')}
                  onChange={(e) =>
                    updateCommissionConfig({
                      scopes: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-4 py-2.5 rounded bg-bg-primary border border-border-subtle font-sans text-sm outline-none focus:border-border-graphite"
                />
              </div>

              <button
                onClick={() => showNotification('Inquiry form options updated live.')}
                className="px-6 py-2 rounded bg-bg-graphite text-text-light font-mono text-xs uppercase font-bold hover:bg-accent-graphite-hover cursor-pointer"
              >
                Save Form Options
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL: RESIDENCE CREATE / EDIT */}
      {/* ========================================================================= */}
      {editingResidence && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-bg-tertiary rounded-lg border border-border-subtle max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl" style={{ overscrollBehavior: 'contain' }}>
            <div className="flex justify-between items-center border-b border-border-subtle pb-4">
              <h3 className="font-heading text-2xl text-text-primary font-normal">
                {isCreatingResidence ? 'Add New Residence' : `Edit "${editingResidence.title}"`}
              </h3>
              <button onClick={() => setEditingResidence(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-text-muted uppercase font-bold">Title</label>
                  <input
                    type="text"
                    value={editingResidence.title}
                    onChange={(e) => setEditingResidence({ ...editingResidence, title: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm outline-none focus:border-border-graphite"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-text-muted uppercase font-bold">Category</label>
                  <select
                    value={editingResidence.category}
                    onChange={(e) => setEditingResidence({ ...editingResidence, category: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm outline-none focus:border-border-graphite"
                  >
                    <option value="Mountain">Mountain</option>
                    <option value="Garden">Garden</option>
                    <option value="Coastal">Coastal</option>
                    <option value="City">City</option>
                    <option value="Country Estate">Country Estate</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-text-muted uppercase font-bold">Location</label>
                  <input
                    type="text"
                    value={editingResidence.location}
                    onChange={(e) => setEditingResidence({ ...editingResidence, location: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm outline-none focus:border-border-graphite"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-text-muted uppercase font-bold">Area</label>
                  <input
                    type="text"
                    value={editingResidence.area}
                    onChange={(e) => setEditingResidence({ ...editingResidence, area: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm outline-none focus:border-border-graphite"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-text-muted uppercase font-bold">Year</label>
                  <input
                    type="text"
                    value={editingResidence.year}
                    onChange={(e) => setEditingResidence({ ...editingResidence, year: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm outline-none focus:border-border-graphite"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-xs text-text-muted uppercase font-bold">Subtitle</label>
                <input
                  type="text"
                  value={editingResidence.subtitle}
                  onChange={(e) => setEditingResidence({ ...editingResidence, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm outline-none focus:border-border-graphite"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ImageDropzone
                  label="Residence Monograph Photo"
                  value={editingResidence.photo}
                  onChange={(url) => setEditingResidence({ ...editingResidence, photo: url })}
                />
                <ImageDropzone
                  label="Floorplan / Blueprint Image"
                  value={editingResidence.blueprint}
                  onChange={(url) => setEditingResidence({ ...editingResidence, blueprint: url })}
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-xs text-text-muted uppercase font-bold">Description</label>
                <textarea
                  rows={3}
                  value={editingResidence.description}
                  onChange={(e) => setEditingResidence({ ...editingResidence, description: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-xs outline-none focus:border-border-graphite"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border-subtle">
              <button
                type="button"
                onClick={() => setEditingResidence(null)}
                className="px-4 py-2 rounded bg-bg-primary text-xs font-mono uppercase"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isCreatingResidence) {
                    createResidence(editingResidence);
                    showNotification(`Residence "${editingResidence.title}" created successfully!`);
                  } else {
                    updateResidence(editingResidence.id, editingResidence);
                    showNotification(`Residence "${editingResidence.title}" updated live!`);
                  }
                  setEditingResidence(null);
                }}
                className="px-6 py-2 rounded bg-bg-graphite text-text-light text-xs font-mono uppercase font-bold"
              >
                Save Residence
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: MATERIAL CREATE / EDIT */}
      {/* ========================================================================= */}
      {editingMaterial && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-bg-tertiary rounded-lg border border-border-subtle max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl" style={{ overscrollBehavior: 'contain' }}>
            <div className="flex justify-between items-center border-b border-border-subtle pb-4">
              <h3 className="font-heading text-2xl text-text-primary font-normal">
                {isCreatingMaterial ? 'Add New Geological Specimen' : `Edit "${editingMaterial.name}"`}
              </h3>
              <button onClick={() => setEditingMaterial(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-text-muted uppercase font-bold">Material Name</label>
                  <input
                    type="text"
                    value={editingMaterial.name}
                    onChange={(e) => setEditingMaterial({ ...editingMaterial, name: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm outline-none focus:border-border-graphite"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-text-muted uppercase font-bold">Category</label>
                  <input
                    type="text"
                    value={editingMaterial.category}
                    onChange={(e) => setEditingMaterial({ ...editingMaterial, category: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm outline-none focus:border-border-graphite"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-text-muted uppercase font-bold">Quarry Origin</label>
                  <input
                    type="text"
                    value={editingMaterial.origin}
                    onChange={(e) => setEditingMaterial({ ...editingMaterial, origin: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm outline-none focus:border-border-graphite"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-text-muted uppercase font-bold">Finish Standard</label>
                  <input
                    type="text"
                    value={editingMaterial.finish}
                    onChange={(e) => setEditingMaterial({ ...editingMaterial, finish: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm outline-none focus:border-border-graphite"
                  />
                </div>
              </div>

              <ImageDropzone
                label="Material Texture Swatch Image"
                value={editingMaterial.image}
                onChange={(url) => setEditingMaterial({ ...editingMaterial, image: url })}
              />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="block font-mono text-[10px] text-text-muted uppercase font-bold">Density</label>
                  <input
                    type="text"
                    value={editingMaterial.density}
                    onChange={(e) => setEditingMaterial({ ...editingMaterial, density: e.target.value })}
                    className="w-full px-2 py-1 rounded bg-bg-primary border border-border-subtle text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-[10px] text-text-muted uppercase font-bold">Strength</label>
                  <input
                    type="text"
                    value={editingMaterial.compressiveStrength}
                    onChange={(e) => setEditingMaterial({ ...editingMaterial, compressiveStrength: e.target.value })}
                    className="w-full px-2 py-1 rounded bg-bg-primary border border-border-subtle text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-[10px] text-text-muted uppercase font-bold">Acoustic</label>
                  <input
                    type="text"
                    value={editingMaterial.acousticAbsorption}
                    onChange={(e) => setEditingMaterial({ ...editingMaterial, acousticAbsorption: e.target.value })}
                    className="w-full px-2 py-1 rounded bg-bg-primary border border-border-subtle text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-[10px] text-text-muted uppercase font-bold">Thermal</label>
                  <input
                    type="text"
                    value={editingMaterial.thermalConductivity}
                    onChange={(e) => setEditingMaterial({ ...editingMaterial, thermalConductivity: e.target.value })}
                    className="w-full px-2 py-1 rounded bg-bg-primary border border-border-subtle text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-xs text-text-muted uppercase font-bold">Description</label>
                <textarea
                  rows={3}
                  value={editingMaterial.description}
                  onChange={(e) => setEditingMaterial({ ...editingMaterial, description: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-xs outline-none focus:border-border-graphite"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border-subtle">
              <button
                type="button"
                onClick={() => setEditingMaterial(null)}
                className="px-4 py-2 rounded bg-bg-primary text-xs font-mono uppercase"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isCreatingMaterial) {
                    createMaterial(editingMaterial);
                    showNotification(`Material "${editingMaterial.name}" added to archive!`);
                  } else {
                    updateMaterial(editingMaterial.id, editingMaterial);
                    showNotification(`Material "${editingMaterial.name}" updated live!`);
                  }
                  setEditingMaterial(null);
                }}
                className="px-6 py-2 rounded bg-bg-graphite text-text-light text-xs font-mono uppercase font-bold"
              >
                Save Material
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ACCLAIM CREATE / EDIT */}
      {/* ========================================================================= */}
      {editingAcclaim && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-bg-tertiary rounded-lg border border-border-subtle max-w-lg w-full p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto" style={{ overscrollBehavior: 'contain' }}>
            <div className="flex justify-between items-center border-b border-border-subtle pb-3">
              <h3 className="font-heading text-2xl text-text-primary font-normal">
                {isCreatingAcclaim ? 'Add Publication Review' : `Edit Review from ${editingAcclaim.pub}`}
              </h3>
              <button onClick={() => setEditingAcclaim(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="block font-mono text-xs text-text-muted uppercase font-bold">Publication Name</label>
                <input
                  type="text"
                  value={editingAcclaim.pub}
                  onChange={(e) => setEditingAcclaim({ ...editingAcclaim, pub: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm outline-none focus:border-border-graphite"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-xs text-text-muted uppercase font-bold">Editorial Quote</label>
                <textarea
                  rows={3}
                  value={editingAcclaim.quote}
                  onChange={(e) => setEditingAcclaim({ ...editingAcclaim, quote: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-xs outline-none focus:border-border-graphite"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-text-muted uppercase font-bold">Author Name</label>
                  <input
                    type="text"
                    value={editingAcclaim.author}
                    onChange={(e) => setEditingAcclaim({ ...editingAcclaim, author: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-xs outline-none focus:border-border-graphite"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-text-muted uppercase font-bold">Award / Distinction</label>
                  <input
                    type="text"
                    value={editingAcclaim.stat}
                    onChange={(e) => setEditingAcclaim({ ...editingAcclaim, stat: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-xs outline-none focus:border-border-graphite"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-border-subtle">
              <button
                type="button"
                onClick={() => setEditingAcclaim(null)}
                className="px-4 py-2 rounded bg-bg-primary text-xs font-mono uppercase"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isCreatingAcclaim) {
                    createAcclaim(editingAcclaim);
                    showNotification('Review added to press section!');
                  } else {
                    updateAcclaim(editingAcclaim.id, editingAcclaim);
                    showNotification('Review updated live!');
                  }
                  setEditingAcclaim(null);
                }}
                className="px-6 py-2 rounded bg-bg-graphite text-text-light text-xs font-mono uppercase font-bold"
              >
                Save Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: STUDIO CREATE / EDIT */}
      {/* ========================================================================= */}
      {editingStudio && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-bg-tertiary rounded-lg border border-border-subtle max-w-lg w-full p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto" style={{ overscrollBehavior: 'contain' }}>
            <div className="flex justify-between items-center border-b border-border-subtle pb-3">
              <h3 className="font-heading text-2xl text-text-primary font-normal">
                {isCreatingStudio ? 'Add Global Studio' : `Edit Studio in ${editingStudio.city}`}
              </h3>
              <button onClick={() => setEditingStudio(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-text-muted uppercase font-bold">City</label>
                  <input
                    type="text"
                    value={editingStudio.city}
                    onChange={(e) => setEditingStudio({ ...editingStudio, city: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm outline-none focus:border-border-graphite"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-text-muted uppercase font-bold">Country</label>
                  <input
                    type="text"
                    value={editingStudio.country}
                    onChange={(e) => setEditingStudio({ ...editingStudio, country: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm outline-none focus:border-border-graphite"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-xs text-text-muted uppercase font-bold">Studio Specialization / Role</label>
                <input
                  type="text"
                  value={editingStudio.role}
                  onChange={(e) => setEditingStudio({ ...editingStudio, role: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm outline-none focus:border-border-graphite"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-xs text-text-muted uppercase font-bold">Street Address</label>
                <input
                  type="text"
                  value={editingStudio.address}
                  onChange={(e) => setEditingStudio({ ...editingStudio, address: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm outline-none focus:border-border-graphite"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-text-muted uppercase font-bold">Timezone</label>
                  <input
                    type="text"
                    value={editingStudio.timezone}
                    onChange={(e) => setEditingStudio({ ...editingStudio, timezone: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-xs outline-none focus:border-border-graphite"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-text-muted uppercase font-bold">Phone Number</label>
                  <input
                    type="text"
                    value={editingStudio.phone}
                    onChange={(e) => setEditingStudio({ ...editingStudio, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-xs outline-none focus:border-border-graphite"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-border-subtle">
              <button
                type="button"
                onClick={() => setEditingStudio(null)}
                className="px-4 py-2 rounded bg-bg-primary text-xs font-mono uppercase"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isCreatingStudio) {
                    createStudio(editingStudio);
                    showNotification(`Studio in ${editingStudio.city} added!`);
                  } else {
                    updateStudio(editingStudio.id, editingStudio);
                    showNotification(`Studio in ${editingStudio.city} updated live!`);
                  }
                  setEditingStudio(null);
                }}
                className="px-6 py-2 rounded bg-bg-graphite text-text-light text-xs font-mono uppercase font-bold"
              >
                Save Studio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ESSAY CREATE / EDIT */}
      {/* ========================================================================= */}
      {editingEssay && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-bg-tertiary rounded-lg border border-border-subtle max-w-lg w-full p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto" style={{ overscrollBehavior: 'contain' }}>
            <div className="flex justify-between items-center border-b border-border-subtle pb-3">
              <h3 className="font-heading text-2xl text-text-primary font-normal">
                {isCreatingEssay ? 'Add Architectural Essay' : `Edit "${editingEssay.title}"`}
              </h3>
              <button onClick={() => setEditingEssay(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-text-muted uppercase font-bold">Topic Tag</label>
                  <input
                    type="text"
                    value={editingEssay.tag}
                    onChange={(e) => setEditingEssay({ ...editingEssay, tag: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm outline-none focus:border-border-graphite"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-text-muted uppercase font-bold">Read Time</label>
                  <input
                    type="text"
                    value={editingEssay.readTime}
                    onChange={(e) => setEditingEssay({ ...editingEssay, readTime: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm outline-none focus:border-border-graphite"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-xs text-text-muted uppercase font-bold">Essay Title</label>
                <input
                  type="text"
                  value={editingEssay.title}
                  onChange={(e) => setEditingEssay({ ...editingEssay, title: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm outline-none focus:border-border-graphite font-heading"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-xs text-text-muted uppercase font-bold">Short Excerpt</label>
                <textarea
                  rows={2}
                  value={editingEssay.excerpt}
                  onChange={(e) => setEditingEssay({ ...editingEssay, excerpt: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-xs outline-none focus:border-border-graphite"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-xs text-text-muted uppercase font-bold">Full Essay Content</label>
                <textarea
                  rows={5}
                  value={editingEssay.content}
                  onChange={(e) => setEditingEssay({ ...editingEssay, content: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-xs outline-none focus:border-border-graphite"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-border-subtle">
              <button
                type="button"
                onClick={() => setEditingEssay(null)}
                className="px-4 py-2 rounded bg-bg-primary text-xs font-mono uppercase"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isCreatingEssay) {
                    createEssay(editingEssay);
                    showNotification('Essay added to philosophy section!');
                  } else {
                    updateEssay(editingEssay.id, editingEssay);
                    showNotification('Essay updated live!');
                  }
                  setEditingEssay(null);
                }}
                className="px-6 py-2 rounded bg-bg-graphite text-text-light text-xs font-mono uppercase font-bold"
              >
                Save Essay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: PHASE CREATE / EDIT */}
      {/* ========================================================================= */}
      {editingPhase && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-bg-tertiary rounded-lg border border-border-subtle max-w-lg w-full p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto" style={{ overscrollBehavior: 'contain' }}>
            <div className="flex justify-between items-center border-b border-border-subtle pb-3">
              <h3 className="font-heading text-2xl text-text-primary font-normal">
                {isCreatingPhase ? 'Add Build Phase' : `Edit Phase ${editingPhase.phase}`}
              </h3>
              <button onClick={() => setEditingPhase(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-text-muted uppercase font-bold">Phase Number</label>
                  <input
                    type="text"
                    value={editingPhase.phase}
                    onChange={(e) => setEditingPhase({ ...editingPhase, phase: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm outline-none focus:border-border-graphite"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-text-muted uppercase font-bold">Duration</label>
                  <input
                    type="text"
                    value={editingPhase.duration}
                    onChange={(e) => setEditingPhase({ ...editingPhase, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm outline-none focus:border-border-graphite"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-xs text-text-muted uppercase font-bold">Phase Name</label>
                <input
                  type="text"
                  value={editingPhase.name}
                  onChange={(e) => setEditingPhase({ ...editingPhase, name: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-sm outline-none focus:border-border-graphite font-heading"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-xs text-text-muted uppercase font-bold">Description</label>
                <textarea
                  rows={3}
                  value={editingPhase.description}
                  onChange={(e) => setEditingPhase({ ...editingPhase, description: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-bg-primary border border-border-subtle text-xs outline-none focus:border-border-graphite"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-border-subtle">
              <button
                type="button"
                onClick={() => setEditingPhase(null)}
                className="px-4 py-2 rounded bg-bg-primary text-xs font-mono uppercase"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isCreatingPhase) {
                    createPhase(editingPhase);
                    showNotification('Build phase added to project journey!');
                  } else {
                    updatePhase(editingPhase.id, editingPhase);
                    showNotification('Build phase updated live!');
                  }
                  setEditingPhase(null);
                }}
                className="px-6 py-2 rounded bg-bg-graphite text-text-light text-xs font-mono uppercase font-bold"
              >
                Save Phase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
