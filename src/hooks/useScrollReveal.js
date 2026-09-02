import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal Hook
 * Lightweight, GPU-accelerated scroll trigger using IntersectionObserver
 * Triggers architectural mask reveals, drafting line draws, and staggered entries.
 */
export function useScrollReveal(options = {}) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -40px 0px',
    triggerOnce = true,
  } = options;

  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsRevealed(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isRevealed];
}

/**
 * useCounter Hook
 * Creates a precision numerical dial-up effect for engineering metrics
 */
export function useCounter(targetNumber, isTriggered, durationMs = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isTriggered) return;

    const num = parseFloat(targetNumber);
    if (isNaN(num)) return;

    let startTimestamp = null;
    let animFrameId = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);
      
      // Architectural ease-out deceleration curve: 1 - Math.pow(1 - progress, 3)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(easeProgress * num);

      if (progress < 1) {
        animFrameId = requestAnimationFrame(step);
      }
    };

    animFrameId = requestAnimationFrame(step);

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, [targetNumber, isTriggered, durationMs]);

  return count;
}
