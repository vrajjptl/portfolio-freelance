// src/components/SmoothCursor.tsx
import React, { useEffect, useRef } from 'react';

const SmoothCursor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  // Keep all mutable pointer data in a ref to avoid triggering React re-renders
  const state = useRef({
    mouseX: -500,
    mouseY: -500,
    ringX: -500,
    ringY: -500,
    glowX: -500,
    glowY: -500,
    isHovered: false,
    isClicked: false,
    visible: false,
  });

  useEffect(() => {
    // Disable on touch devices
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (hasTouch && window.innerWidth < 1024) {
      return;
    }

    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      const s = state.current;
      s.mouseX = e.clientX;
      s.mouseY = e.clientY;

      if (!s.visible) {
        s.visible = true;
        // Snap initial ring and glow positions to mouse to avoid flying in from corner
        s.ringX = e.clientX;
        s.ringY = e.clientY;
        s.glowX = e.clientX;
        s.glowY = e.clientY;

        if (containerRef.current) {
          containerRef.current.style.opacity = '1';
        }
      }

      // Check if hovering over an interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, input, select, textarea, [role="button"], label, .interactive-hover')
        );
        s.isHovered = isInteractive;

        if (ringRef.current) {
          if (isInteractive) {
            ringRef.current.style.borderColor = 'rgba(6, 182, 212, 0.85)';
            ringRef.current.style.backgroundColor = 'rgba(6, 182, 212, 0.18)';
            ringRef.current.style.boxShadow =
              '0 0 24px rgba(6, 182, 212, 0.5), inset 0 0 10px rgba(6, 182, 212, 0.25)';
          } else {
            ringRef.current.style.borderColor = 'rgba(6, 182, 212, 0.45)';
            ringRef.current.style.backgroundColor = 'rgba(6, 182, 212, 0.08)';
            ringRef.current.style.boxShadow = '0 0 14px rgba(6, 182, 212, 0.25)';
          }
        }
      }
    };

    const onMouseDown = () => {
      state.current.isClicked = true;
    };

    const onMouseUp = () => {
      state.current.isClicked = false;
    };

    const onMouseLeave = () => {
      state.current.visible = false;
      if (containerRef.current) {
        containerRef.current.style.opacity = '0';
      }
    };

    const onMouseEnter = () => {
      state.current.visible = true;
      if (containerRef.current) {
        containerRef.current.style.opacity = '1';
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Continuous 60fps RAF loop
    const render = () => {
      const s = state.current;

      if (s.visible) {
        // Smooth lerp interpolation
        s.ringX += (s.mouseX - s.ringX) * 0.22;
        s.ringY += (s.mouseY - s.ringY) * 0.22;

        s.glowX += (s.mouseX - s.glowX) * 0.1;
        s.glowY += (s.mouseY - s.glowY) * 0.1;

        // Apply transforms with translate(-50%, -50%) for perfect centering
        if (dotRef.current) {
          const dotScale = s.isClicked ? 0.75 : 1;
          dotRef.current.style.transform = `translate3d(${s.mouseX}px, ${s.mouseY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
        }

        if (ringRef.current) {
          const ringScale = s.isClicked ? 0.85 : s.isHovered ? 1.4 : 1;
          ringRef.current.style.transform = `translate3d(${s.ringX}px, ${s.ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;
        }

        if (glowRef.current) {
          glowRef.current.style.transform = `translate3d(${s.glowX}px, ${s.glowY}px, 0) translate(-50%, -50%)`;
        }
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
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden opacity-0 transition-opacity duration-200"
      aria-hidden="true"
    >
      {/* 1. Ambient Glow Aura Spotlight (Centered at pointer) */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-64 h-64 rounded-full pointer-events-none will-change-transform opacity-60 dark:opacity-40"
        style={{
          background:
            'radial-gradient(circle, rgba(6, 182, 212, 0.18) 0%, rgba(99, 102, 241, 0.08) 40%, transparent 70%)',
          willChange: 'transform',
        }}
      />

      {/* 2. Precision Outer Ring with Luminous Glow (Centered at pointer) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none will-change-transform border border-cyan-500/40 bg-cyan-500/[0.08] backdrop-blur-[0.5px] transition-[border-color,background-color,box-shadow] duration-150 ease-out"
        style={{
          boxShadow: '0 0 14px rgba(6, 182, 212, 0.25)',
          willChange: 'transform',
        }}
      />

      {/* 3. Center Dot (Zero Latency Pinpoint) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none will-change-transform bg-cyan-400 dark:bg-cyan-300"
        style={{
          boxShadow:
            '0 0 10px 2px rgba(6, 182, 212, 0.9), 0 0 20px 4px rgba(14, 165, 233, 0.5)',
          willChange: 'transform',
        }}
      />
    </div>
  );
};

export default SmoothCursor;
