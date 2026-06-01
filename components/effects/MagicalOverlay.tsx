'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface MagicalOverlayProps {
  active: boolean;
}

export default function MagicalOverlay({ active }: MagicalOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Burst particles
    interface BurstParticle {
      x: number; y: number;
      vx: number; vy: number;
      r: number; alpha: number;
      color: string;
    }

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const colors = ['rgba(201,168,76,', 'rgba(212,131,74,', 'rgba(255,220,100,', 'rgba(196,133,122,'];

    const parts: BurstParticle[] = Array.from({ length: 80 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      return {
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        r: 1.5 + Math.random() * 3,
        alpha: 0.9,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = false;
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.alpha -= 0.012;
        p.vx *= 0.99;

        if (p.alpha > 0) {
          alive = true;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.alpha.toFixed(2)})`;
          ctx.fill();
        }
      }
      if (alive) {
        rafRef.current = requestAnimationFrame(draw);
      }
    }
    draw();

    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  if (!active) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[90] pointer-events-none flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background radial flash */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(201,168,76,0.25) 0%, rgba(13,8,5,0.95) 70%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.8] }}
        transition={{ duration: 0.6 }}
      />

      {/* Gold ring expansion */}
      <motion.div
        className="absolute rounded-full border-2 border-gold/40"
        initial={{ width: 0, height: 0, opacity: 1 }}
        animate={{ width: '120vmax', height: '120vmax', opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.div
        className="absolute rounded-full border border-gold/20"
        initial={{ width: 0, height: 0, opacity: 1 }}
        animate={{ width: '80vmax', height: '80vmax', opacity: 0 }}
        transition={{ duration: 1.0, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />

      {/* Floating text */}
      <motion.p
        className="relative z-10 font-fell italic text-gold text-lg tracking-widest"
        style={{ fontFamily: 'var(--font-fell)' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        The pages turn…
      </motion.p>
    </motion.div>
  );
}
