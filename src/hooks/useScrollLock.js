import { useEffect } from 'react';

/**
 * useScrollLock - Locks page scroll (including Lenis) when a modal/overlay is open.
 *
 * When `isLocked` is true:
 *   1. Stops Lenis smooth scroll from intercepting wheel events
 *   2. Adds overflow:hidden to document.body to prevent native scroll
 *   3. Preserves scroll position so the page doesn't jump
 *
 * When `isLocked` becomes false, everything is restored.
 */
export function useScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return;

    // Save current scroll position and lock body
    const scrollY = window.scrollY;
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    // Stop Lenis if it exists on window
    if (window.__lenis) {
      window.__lenis.stop();
    }

    return () => {
      // Restore body styles
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;

      // Restore scroll position
      window.scrollTo(0, scrollY);

      // Resume Lenis
      if (window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [isLocked]);
}
