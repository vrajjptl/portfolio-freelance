// src/components/SmoothCursor.tsx
import React, { useEffect, useRef, useState } from 'react';

const SmoothCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (hasTouch && window.innerWidth < 1024) {
      setIsTouchDevice(true);
      return;
    }

    // Positions and smooth lerp interpolation
    let mouseX = -200;
    let mouseY = -200;
    let ringX = -200;
    let ringY = -200;
    let glowX = -200;
    let glowY = -200;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!visible) setVisible(true);

      // Instant pinpoint dot positioning
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check if hovering over an interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, input, select, textarea, [role="button"], label, .interactive-hover')
        );
        setIsHovered(isInteractive);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Ultra-smooth lerp loop for trailing ring and ambient aura glow
    const render = () => {
      // 0.18 lerp factor for crisp, fluid momentum
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      // 0.08 lerp factor for softer, dreamy aura follow
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [visible]);

  if (isTouchDevice) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* 1. Ambient Cursor Glow Aura (Soft Backlight) */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 -ml-28 -mt-28 w-56 h-56 rounded-full pointer-events-none will-change-transform opacity-60 dark:opacity-40 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle, rgba(6, 182, 212, 0.18) 0%, rgba(99, 102, 241, 0.08) 40%, transparent 70%)',
          transform: 'translate3d(-200px, -200px, 0)',
        }}
      />

      {/* 2. Outer Smooth Trailing Ring / Halo with Luminous Glow */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform transition-[width,height,background-color,border-color,box-shadow,opacity] duration-200 ease-out"
        style={{
          width: isHovered ? '48px' : '34px',
          height: isHovered ? '48px' : '34px',
          marginLeft: isHovered ? '-24px' : '-17px',
          marginTop: isHovered ? '-24px' : '-17px',
          backgroundColor: isHovered
            ? 'rgba(6, 182, 212, 0.16)'
            : 'rgba(6, 182, 212, 0.08)',
          border: isHovered
            ? '1.5px solid rgba(6, 182, 212, 0.75)'
            : '1px solid rgba(6, 182, 212, 0.45)',
          boxShadow: isHovered
            ? '0 0 24px rgba(6, 182, 212, 0.45), inset 0 0 10px rgba(6, 182, 212, 0.2)'
            : '0 0 14px rgba(6, 182, 212, 0.25)',
          backdropFilter: isHovered ? 'blur(1px)' : 'none',
          transform: 'translate3d(-200px, -200px, 0)',
          scale: isClicked ? '0.85' : '1',
        }}
      />

      {/* 3. Precision Glowing Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform bg-cyan-400 dark:bg-cyan-300 transition-transform duration-75 ease-out"
        style={{
          width: isHovered ? '6px' : '5px',
          height: isHovered ? '6px' : '5px',
          marginLeft: isHovered ? '-3px' : '-2.5px',
          marginTop: isHovered ? '-3px' : '-2.5px',
          boxShadow:
            '0 0 10px 2px rgba(6, 182, 212, 0.9), 0 0 20px 4px rgba(14, 165, 233, 0.5)',
          transform: 'translate3d(-200px, -200px, 0)',
          scale: isClicked ? '0.7' : '1',
        }}
      />
    </div>
  );
};

export default SmoothCursor;

