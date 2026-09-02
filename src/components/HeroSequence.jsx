import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ambiance } from '../utils/audio';
import frameFiles from './frames.json';
import { useCMS } from '../cms';

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    id: 'ch-1',
    range: [0.03, 0.22],
    positionClass: 'bottom-10 left-6 md:left-14 text-left items-start',
    script: 'Welcome Home',
    title: 'The Main Entrance',
    subtitle: 'Built with solid stone and timeless architecture.',
  },
  {
    id: 'ch-2',
    range: [0.26, 0.49],
    positionClass: 'top-14 right-6 md:right-14 text-right items-end',
    script: 'Living Space',
    title: 'The Great Room',
    subtitle: 'High ceilings, natural wood, and warm sunlight.',
  },
  {
    id: 'ch-3',
    range: [0.53, 0.75],
    positionClass: 'bottom-10 right-6 md:right-14 text-right items-end',
    script: 'Outdoor Views',
    title: 'The Sunset Terrace',
    subtitle: 'Glass walls that open completely to the fresh mountain air.',
  },
  {
    id: 'ch-4',
    range: [0.78, 0.98],
    positionClass: 'top-1/3 left-6 md:left-14 text-left items-start',
    script: 'Rest & Quiet',
    title: 'The Master Suite',
    subtitle: 'A private, peaceful space designed for pure comfort.',
  },
];

export default function HeroSequence() {
  const { heroChapters } = useCMS();
  const chapters = heroChapters || CHAPTERS;
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const frameIndexRef = useRef(0);
  const imagesRef = useRef([]);
  const animFrameIdRef = useRef(null);
  const scrollTriggerInstanceRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  // 1. Instant First-Frame Loading + Progressive Background Buffer
  useEffect(() => {
    let isCancelled = false;
    const totalFrames = frameFiles.length || 600;
    const frameImages = new Array(totalFrames);
    imagesRef.current = frameImages;

    // Load first frame immediately
    const firstImg = new Image();
    firstImg.src = `/cabinet_frames_600fps/${frameFiles[0] || 'frame_001.jpg'}`;
    frameImages[0] = firstImg;

    // Buffer remaining frames progressively
    const loadRemainingFrames = async () => {
      const batchSize = 16;
      for (let i = 0; i < totalFrames; i += batchSize) {
        if (isCancelled) return;
        const currentBatch = [];

        for (let j = i; j < Math.min(i + batchSize, totalFrames); j++) {
          const fileName = frameFiles[j] || `frame_${String(j + 1).padStart(3, '0')}.jpg`;
          const url = `/cabinet_frames_600fps/${fileName}`;

          currentBatch.push(
            new Promise((resolve) => {
              const img = new Image();
              img.onload = () => {
                frameImages[j] = img;
                resolve();
              };
              img.onerror = () => {
                frameImages[j] = frameImages[0] || null;
                resolve();
              };
              img.src = url;
            })
          );
        }

        await Promise.all(currentBatch);
      }
    };

    loadRemainingFrames();

    return () => {
      isCancelled = true;
    };
  }, []);

  // 2. High-Performance Decoupled Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = (width * dpr) | 0;
      canvas.height = (height * dpr) | 0;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    let lastPaintedIndex = -1;

    const renderLoop = () => {
      const targetIndex = frameIndexRef.current | 0;
      const frames = imagesRef.current;

      if (frames && frames.length > 0) {
        const safeIndex = Math.max(0, Math.min(targetIndex, frames.length - 1));
        let image = frames[safeIndex];
        if (!image) {
          for (let k = safeIndex; k >= 0; k--) {
            if (frames[k]) {
              image = frames[k];
              break;
            }
          }
        }
        if (!image) image = frames[0];

        if (
          image &&
          image.complete &&
          image.naturalWidth > 0 &&
          (safeIndex !== lastPaintedIndex || canvas.width !== canvas._lastWidth)
        ) {
          try {
            const cw = canvas.width;
            const ch = canvas.height;
            const imgW = image.naturalWidth || image.width || 1920;
            const imgH = image.naturalHeight || image.height || 1080;

            const scale = Math.max(cw / imgW, ch / imgH);
            const drawW = (imgW * scale) | 0;
            const drawH = (imgH * scale) | 0;
            const drawX = ((cw - drawW) / 2) | 0;
            const drawY = ((ch - drawH) / 2) | 0;

            ctx.drawImage(image, drawX, drawY, drawW, drawH);
            lastPaintedIndex = safeIndex;
            canvas._lastWidth = cw;
          } catch (e) {
            // Guard
          }
        }
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  // 3. GSAP ScrollTrigger Sequence Setup
  useEffect(() => {
    if (!containerRef.current) return;

    const totalFrames = frameFiles.length || 600;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=450%',
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const targetFrame = Math.round(progress * (totalFrames - 1));
        frameIndexRef.current = targetFrame;
        setScrollProgress(progress);
        ambiance.updateSpatialTone(progress);
      },
    });

    scrollTriggerInstanceRef.current = trigger;

    return () => {
      trigger.kill();
    };
  }, []);

  // Smooth opacity and transform calculation
  const getChapterStyles = (range) => {
    if (!range || !Array.isArray(range) || range.length < 2) {
      return { opacity: 0, transform: 'translateY(14px)', pointerEvents: 'none' };
    }
    const [start, end] = range;
    const fadeDuration = 0.035;

    if (scrollProgress < start || scrollProgress > end) {
      return { opacity: 0, transform: 'translateY(14px)', pointerEvents: 'none' };
    }

    let opacity = 1;
    let translateY = 0;

    if (scrollProgress < start + fadeDuration) {
      const t = Math.max(0, Math.min(1, (scrollProgress - start) / fadeDuration));
      opacity = t;
      translateY = 14 * (1 - t);
    } else if (scrollProgress > end - fadeDuration) {
      const t = Math.max(0, Math.min(1, (end - scrollProgress) / fadeDuration));
      opacity = t;
      translateY = -14 * (1 - t);
    }

    return {
      opacity,
      transform: `translateY(${translateY}px)`,
      transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
      pointerEvents: opacity > 0.1 ? 'auto' : 'none',
    };
  };

  return (
    <section
      id="residence-tour"
      ref={containerRef}
      className="relative w-full h-screen bg-bg-primary overflow-hidden select-none"
    >
      {/* Decoupled Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Dynamic Multi-Position Floating Titles in Simple, Clear Language */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {chapters.map((ch) => {
          const styles = getChapterStyles(ch.range);
          return (
            <div
              key={ch.id}
              style={styles}
              className={`absolute ${ch.positionClass} max-w-[85vw] sm:max-w-xl p-3 sm:p-6 flex flex-col`}
            >
              <span className="font-script text-3xl sm:text-5xl md:text-6xl text-accent-ochre block mb-1 drop-shadow-lg">
                {ch.script}
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl md:text-7xl text-text-primary tracking-tight font-normal uppercase leading-[0.95] drop-shadow-lg">
                {ch.title}
              </h2>
              <p className="font-sans text-xs sm:text-base md:text-lg text-text-secondary mt-2 sm:mt-3 max-w-md leading-relaxed font-medium drop-shadow-md">
                {ch.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
