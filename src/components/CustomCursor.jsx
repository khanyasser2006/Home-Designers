import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    let frameId;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target.closest('[data-cursor]');
      if (target) {
        setCursorText(target.getAttribute('data-cursor-text') || '');
        setCursorVariant(target.getAttribute('data-cursor') || 'hover');
      } else {
        setCursorText('');
        setCursorVariant('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const followLoop = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      frameId = requestAnimationFrame(followLoop);
    };
    frameId = requestAnimationFrame(followLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(frameId);
    };
  }, [position, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Warm Sand inner center dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-text-primary pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out shadow-sm"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      />

      {/* Luxury smooth outer follow ring in Deep Graphite / Warm Sand */}
      <div
        className={`fixed top-0 left-0 rounded-full border border-text-primary/30 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out flex items-center justify-center ${
          cursorVariant === 'hover'
            ? 'w-16 h-16 bg-text-primary/10 border-text-primary backdrop-blur-[2px]'
            : cursorVariant === 'drag'
            ? 'w-20 h-20 bg-bg-secondary/90 border-text-primary shadow-2xl scale-110'
            : 'w-8 h-8'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
        }}
      >
        {cursorText && (
          <span className="font-mono text-[9px] uppercase tracking-widest text-text-primary font-semibold px-1 text-center select-none">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
