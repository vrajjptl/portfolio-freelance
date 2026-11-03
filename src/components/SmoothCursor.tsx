// src/components/SmoothCursor.tsx
import React, { useEffect, useRef, useState } from 'react';

const SmoothCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

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
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
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

    // Ultra-smooth spring-lerp loop for trailing ring
    const render = () => {
      // 0.16 lerp factor gives fluid, lag-free momentum
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
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
      {/* 1. Outer Smooth Trailing Ring / Halo */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -ml-4 -mt-4 rounded-full pointer-events-none will-change-transform transition-[width,height,background-color,border-color,opacity] duration-200 ease-out"
        style={{
          width: isHovered ? '48px' : '32px',
          height: isHovered ? '48px' : '32px',
          marginLeft: isHovered ? '-24px' : '-16px',
          marginTop: isHovered ? '-24px' : '-16px',
          backgroundColor: isHovered
            ? 'rgba(6, 182, 212, 0.14)'
            : 'rgba(6, 182, 212, 0.05)',
          border: isHovered
            ? '1.5px solid rgba(6, 182, 212, 0.7)'
            : '1px solid rgba(6, 182, 212, 0.35)',
          backdropFilter: isHovered ? 'blur(1px)' : 'none',
          transform: 'translate3d(-100px, -100px, 0)',
          scale: isClicked ? '0.85' : '1',
        }}
      />

      {/* 2. Precision Center Dot (0 Latency) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 rounded-full pointer-events-none will-change-transform bg-gradient-to-tr from-cyan-500 to-blue-500 shadow-sm shadow-cyan-500/50 transition-transform duration-75 ease-out"
        style={{
          width: isHovered ? '6px' : '5px',
          height: isHovered ? '6px' : '5px',
          marginLeft: isHovered ? '-3px' : '-2.5px',
          marginTop: isHovered ? '-3px' : '-2.5px',
          transform: 'translate3d(-100px, -100px, 0)',
          scale: isClicked ? '0.7' : '1',
        }}
      />
    </div>
  );
};

export default SmoothCursor;
