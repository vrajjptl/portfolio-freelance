// src/components/ReptileCursor.tsx
import React, { useEffect, useRef, useState } from 'react';

interface Segment {
  x: number;
  y: number;
  radius: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

const ReptileCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [enabled, setEnabled] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Hide cursor on touch-only devices
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (hasTouch && window.innerWidth < 768) {
      setIsMobile(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates
    let mouse = { x: width / 2, y: height / 2 };
    let isVisible = false;
    let clickPulse = 0;

    // Body segments configuration: Head to tail with refined proportions
    const segmentCount = 9;
    const segmentLengths = [14, 13, 12, 11, 10, 9, 8, 7, 6];
    const segmentRadii = [8, 9, 8.5, 7.5, 6.5, 5.5, 4.5, 3.5, 2.5];

    const segments: Segment[] = Array.from({ length: segmentCount }, (_, i) => ({
      x: mouse.x - i * 12,
      y: mouse.y,
      radius: segmentRadii[i] || 4,
    }));

    const sparks: Spark[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      isVisible = true;
    };

    const handleMouseDown = () => {
      clickPulse = 1.0;
      // Spawn burst sparks
      for (let i = 0; i < 8; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 2;
        sparks.push({
          x: mouse.x,
          y: mouse.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 20 + Math.random() * 15,
          color: Math.random() > 0.5 ? '#0ea5e9' : '#10b981',
        });
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop with buttery smooth sub-pixel lerp
    let animationId: number;
    let stepCycle = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      if (isVisible && enabled) {
        // Move head towards mouse with smooth silky damping
        const head = segments[0];
        const dx = mouse.x - head.x;
        const dy = mouse.y - head.y;
        const dist = Math.hypot(dx, dy);

        head.x += dx * 0.22;
        head.y += dy * 0.22;

        if (dist > 0.8) {
          stepCycle += dist * 0.1;

          // Emit small stardust trail from the tail
          if (Math.random() < 0.22) {
            const tail = segments[segments.length - 1];
            sparks.push({
              x: tail.x + (Math.random() - 0.5) * 4,
              y: tail.y + (Math.random() - 0.5) * 4,
              vx: (Math.random() - 0.5) * 0.5,
              vy: (Math.random() - 0.5) * 0.5,
              life: 0,
              maxLife: 24,
              color: '#0284c7',
            });
          }
        }

        // Chain segments behind head using distance constraint
        for (let i = 1; i < segmentCount; i++) {
          const prev = segments[i - 1];
          const curr = segments[i];
          const segDx = prev.x - curr.x;
          const segDy = prev.y - curr.y;
          const targetDist = segmentLengths[i - 1];
          const currentDist = Math.hypot(segDx, segDy) || 0.001;
          const factor = (currentDist - targetDist) / currentDist;

          // Natural spine wave wiggling when moving
          const waveAngle = Math.sin(stepCycle + i * 0.5) * 1.4;
          const perpX = -segDy / currentDist;
          const perpY = segDx / currentDist;

          curr.x += segDx * factor + perpX * waveAngle * 0.14;
          curr.y += segDy * factor + perpY * waveAngle * 0.14;
        }

        // Compute Head angle
        const headAngle = Math.atan2(mouse.y - head.y, mouse.x - head.x);

        // Draw Sparks
        for (let i = sparks.length - 1; i >= 0; i--) {
          const s = sparks[i];
          s.x += s.vx;
          s.y += s.vy;
          s.life++;
          const progress = 1 - s.life / s.maxLife;

          if (progress <= 0) {
            sparks.splice(i, 1);
            continue;
          }

          ctx.fillStyle = s.color;
          ctx.globalAlpha = progress * 0.75;
          ctx.beginPath();
          ctx.arc(s.x, s.y, 2 * progress, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1.0;

        // Draw Gecko Feet (front legs at segment 2, back legs at segment 5)
        const legPairs = [
          { segIdx: 2, length: 13, gaitOffset: 0 },
          { segIdx: 5, length: 14, gaitOffset: Math.PI },
        ];

        legPairs.forEach(({ segIdx, length, gaitOffset }) => {
          const bodySeg = segments[segIdx];
          const nextSeg = segments[segIdx + 1] || bodySeg;
          const bodyAngle = Math.atan2(bodySeg.y - nextSeg.y, bodySeg.x - nextSeg.x);

          [-1, 1].forEach((side) => {
            const sideAngle = bodyAngle + (side * Math.PI) / 2;
            const walkStep = Math.sin(stepCycle + gaitOffset + (side > 0 ? 0 : Math.PI)) * 0.38;
            const legAngle = sideAngle + walkStep;

            const footX = bodySeg.x + Math.cos(legAngle) * length;
            const footY = bodySeg.y + Math.sin(legAngle) * length;

            // Leg joint
            ctx.strokeStyle = '#0284c7';
            ctx.lineWidth = 2.5;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(bodySeg.x, bodySeg.y);
            ctx.lineTo(footX, footY);
            ctx.stroke();

            // Foot / Claws
            ctx.fillStyle = '#0ea5e9';
            ctx.beginPath();
            ctx.arc(footX, footY, 2.5, 0, Math.PI * 2);
            ctx.fill();
          });
        });

        // Draw Body Spine & Tapered Segments
        for (let i = segments.length - 1; i >= 0; i--) {
          const seg = segments[i];
          const pulse = (1 + clickPulse * 0.25);
          const r = seg.radius * pulse;

          // Glowing body gradient with high contrast on both light and dark
          const grad = ctx.createRadialGradient(seg.x, seg.y, 1, seg.x, seg.y, r);
          grad.addColorStop(0, '#38bdf8');
          grad.addColorStop(0.6, '#0284c7');
          grad.addColorStop(1, '#075985');

          ctx.fillStyle = grad;
          ctx.shadowColor = '#0ea5e9';
          ctx.shadowBlur = i === 0 ? 12 : 5;

          ctx.beginPath();
          ctx.arc(seg.x, seg.y, r, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw Head details: 2 glowing eyes and snout
        const eyeOffsetDist = 5;
        const eyeAngle = Math.PI / 3;
        const leftEyeX = head.x + Math.cos(headAngle - eyeAngle) * eyeOffsetDist;
        const leftEyeY = head.y + Math.sin(headAngle - eyeAngle) * eyeOffsetDist;
        const rightEyeX = head.x + Math.cos(headAngle + eyeAngle) * eyeOffsetDist;
        const rightEyeY = head.y + Math.sin(headAngle + eyeAngle) * eyeOffsetDist;

        // Eyes
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#10b981';
        ctx.fillStyle = '#34d399';
        ctx.beginPath();
        ctx.arc(leftEyeX, leftEyeY, 2.2, 0, Math.PI * 2);
        ctx.arc(rightEyeX, rightEyeY, 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Pupils
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(leftEyeX + Math.cos(headAngle) * 0.8, leftEyeY + Math.sin(headAngle) * 0.8, 1, 0, Math.PI * 2);
        ctx.arc(rightEyeX + Math.cos(headAngle) * 0.8, rightEyeY + Math.sin(headAngle) * 0.8, 1, 0, Math.PI * 2);
        ctx.fill();

        // Snout
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(head.x + Math.cos(headAngle) * 6, head.y + Math.sin(headAngle) * 6, 1.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;

        if (clickPulse > 0) {
          clickPulse = Math.max(0, clickPulse - 0.08);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [enabled, isMobile]);

  if (isMobile) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9999]"
        style={{ mixBlendMode: 'normal' }}
      />
      {/* Floating Reptile Toggle Pill in bottom left */}
      <button
        onClick={() => setEnabled((prev) => !prev)}
        className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-800/90 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 backdrop-blur-md text-xs font-medium text-slate-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-300 shadow-lg shadow-black/10 dark:shadow-black/40 transition-all duration-300"
        title="Toggle interactive reptile cursor"
      >
        <span>🦎</span>
        <span className="hidden md:inline">Reptile Cursor:</span>
        <span className={enabled ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-400 dark:text-gray-500'}>
          {enabled ? 'ON' : 'OFF'}
        </span>
      </button>
    </>
  );
};

export default ReptileCursor;
