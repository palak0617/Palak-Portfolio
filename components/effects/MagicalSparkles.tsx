'use client';

import { useEffect, useRef } from 'react';
import { rand } from '@/utils/helpers';

/**
 * Canvas-based floating magical sparkles / stars.
 * Gives the portfolio a fairy-tale dreamy atmosphere.
 */
export default function MagicalSparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    type Sparkle = {
      x: number; y: number; size: number;
      vx: number; vy: number;
      opacity: number; maxOpacity: number;
      growing: boolean;
      speed: number;
      hue: number;          // 200–280 = blue/purple, 100–160 = sage
      shape: 'star' | 'circle';
      angle: number; angleSpeed: number;
    };

    const sparkles: Sparkle[] = Array.from({ length: 55 }, () => ({
      x:          rand(0, canvas.width),
      y:          rand(0, canvas.height),
      size:       rand(1, 3.5),
      vx:         rand(-0.08, 0.08),
      vy:         rand(-0.14, -0.04),
      opacity:    0,
      maxOpacity: rand(0.25, 0.75),
      growing:    true,
      speed:      rand(0.004, 0.012),
      hue:        Math.random() > 0.4 ? rand(200, 280) : rand(100, 160),
      shape:      Math.random() > 0.45 ? 'star' : 'circle',
      angle:      rand(0, Math.PI * 2),
      angleSpeed: rand(-0.02, 0.02),
    }));

    function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, angle: number) {
      const spikes = 4;
      const inner  = r * 0.42;
      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const a   = angle + (i * Math.PI) / spikes;
        const rad = i % 2 === 0 ? r : inner;
        i === 0 ? ctx.moveTo(x + rad * Math.cos(a), y + rad * Math.sin(a))
                : ctx.lineTo(x + rad * Math.cos(a), y + rad * Math.sin(a));
      }
      ctx.closePath();
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const s of sparkles) {
        /* Fade in/out */
        if (s.growing) {
          s.opacity += s.speed;
          if (s.opacity >= s.maxOpacity) s.growing = false;
        } else {
          s.opacity -= s.speed * 0.7;
          if (s.opacity <= 0) {
            /* Reset at random position */
            s.x = rand(0, canvas.width);
            s.y = rand(0, canvas.height);
            s.opacity = 0;
            s.growing = true;
            s.maxOpacity = rand(0.25, 0.75);
            s.hue = Math.random() > 0.4 ? rand(200, 280) : rand(100, 160);
          }
        }

        s.x += s.vx; s.y += s.vy; s.angle += s.angleSpeed;
        if (s.y < -10) { s.y = canvas.height + 10; s.x = rand(0, canvas.width); }

        ctx.save();
        ctx.globalAlpha = Math.max(0, s.opacity);

        if (s.shape === 'star') {
          drawStar(ctx, s.x, s.y, s.size, s.angle);
          const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 2.5);
          grad.addColorStop(0,   `hsla(${s.hue}, 80%, 90%, 1)`);
          grad.addColorStop(0.5, `hsla(${s.hue}, 70%, 80%, 0.6)`);
          grad.addColorStop(1,   `hsla(${s.hue}, 60%, 70%, 0)`);
          ctx.fillStyle = grad;
          ctx.fill();
          /* Cross sparkle arms */
          ctx.strokeStyle = `hsla(${s.hue}, 80%, 92%, ${s.opacity * 0.6})`;
          ctx.lineWidth   = 0.5;
          ctx.beginPath();
          ctx.moveTo(s.x - s.size * 2, s.y);
          ctx.lineTo(s.x + s.size * 2, s.y);
          ctx.moveTo(s.x, s.y - s.size * 2);
          ctx.lineTo(s.x, s.y + s.size * 2);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 0.65, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${s.hue}, 70%, 88%, 1)`;
          ctx.fill();
          /* Soft glow */
          const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 3);
          g.addColorStop(0, `hsla(${s.hue}, 80%, 95%, 0.4)`);
          g.addColorStop(1, `hsla(${s.hue}, 60%, 80%, 0)`);
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }

        ctx.restore();
      }
      rafRef.current = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 3 }}
    />
  );
}
