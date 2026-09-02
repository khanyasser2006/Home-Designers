import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { RouterProvider, useRouter } from './router';
import { AuthProvider } from './auth';
import { CMSProvider } from './cms';
import Navbar from './components/Navbar';
import HeroSequence from './components/HeroSequence';
import PhilosophySection from './components/PhilosophySection';
import CuratedResidences from './components/CuratedResidences';
import MaterialityLab from './components/MaterialityLab';
import SpatialMetrics from './components/SpatialMetrics';
import CriticalAcclaim from './components/CriticalAcclaim';
import CommissionDrawer from './components/CommissionDrawer';
import StudioFooter from './components/StudioFooter';

// Dedicated Sub-Pages
import PhilosophyPage from './pages/PhilosophyPage';
import HomesPage from './pages/HomesPage';
import MaterialsPage from './pages/MaterialsPage';
import StandardsPage from './pages/StandardsPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';
import AdminCMSPage from './pages/AdminCMSPage';

// Dedicated Detailed Preview Pages
import MaterialPreviewPage from './pages/MaterialPreviewPage';
import ResidencePreviewPage from './pages/ResidencePreviewPage';

function AppContent() {
  const { path } = useRouter();
  const [isCommissionOpen, setIsCommissionOpen] = useState(false);

  // Initialize Lenis Smooth Scrolling Engine (Refreshed on every page navigation)
  // Stored on window.__lenis so useScrollLock can stop/start it when modals open
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    window.__lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.__lenis = null;
    };
  }, [path]);

  // Page Routing Switcher
  const renderCurrentPage = () => {
    // Dynamic Material Detailed Preview Page: /material/:id
    if (path.startsWith('/material/')) {
      return <MaterialPreviewPage onOpenCommission={() => setIsCommissionOpen(true)} />;
    }

    // Dynamic Residence Detailed Preview Page: /residence/:id
    if (path.startsWith('/residence/')) {
      return <ResidencePreviewPage onOpenCommission={() => setIsCommissionOpen(true)} />;
    }

    switch (path) {
      case '/admin':
      case '/cms':
        return <AdminCMSPage />;
      case '/auth':
      case '/login':
      case '/register':
        return <AuthPage />;
      case '/philosophy':
        return <PhilosophyPage onOpenCommission={() => setIsCommissionOpen(true)} />;
      case '/homes':
        return <HomesPage onOpenCommission={() => setIsCommissionOpen(true)} />;
      case '/materials':
        return <MaterialsPage onOpenCommission={() => setIsCommissionOpen(true)} />;
      case '/standards':
        return <StandardsPage onOpenCommission={() => setIsCommissionOpen(true)} />;
      case '/contact':
        return <ContactPage />;
      default:
        // Main Landing Page with 600-Frame FPV Hero Flight
        return (
          <main>
            {/* 1. Hero 600-Frame Optical-Flow Motion-Interpolated Canvas Scroll Sequence */}
            <HeroSequence onOpenCommission={() => setIsCommissionOpen(true)} />

            {/* 2. Simple, Natural Design Philosophy */}
            <PhilosophySection onOpenCommission={() => setIsCommissionOpen(true)} />

            {/* 3. Featured Homes Portfolio */}
            <CuratedResidences onOpenCommission={() => setIsCommissionOpen(true)} />

            {/* 4. Natural Materials & Finishes */}
            <MaterialityLab onOpenCommission={() => setIsCommissionOpen(true)} />

            {/* 5. Quality Standards & Metrics */}
            <SpatialMetrics />

            {/* 6. Magazine Editorial Reviews */}
            <CriticalAcclaim />
          </main>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-bg-primary text-text-primary selection:bg-bg-graphite selection:text-text-light">
      {/* Global Navigation Header with Top-Right Authentication & CMS */}
      <Navbar />

      {/* Dynamic Page Content with Natural Top-to-Bottom Smooth Scroll */}
      {renderCurrentPage()}

      {/* Global Atelier Clocks & Footer */}
      <StudioFooter onOpenCommission={() => setIsCommissionOpen(true)} />

      {/* Confidential Commission Inquiry Drawer */}
      <CommissionDrawer
        isOpen={isCommissionOpen}
        onClose={() => setIsCommissionOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <CMSProvider>
      <AuthProvider>
        <RouterProvider>
          <AppContent />
        </RouterProvider>
      </AuthProvider>
    </CMSProvider>
  );
}
