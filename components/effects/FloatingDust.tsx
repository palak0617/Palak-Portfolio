'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { rand } from '@/utils/helpers';

interface FloatingDustProps {
  count?: number;
  className?: string;
  style?: CSSProperties;
}

export default function FloatingDust({ count = 25, className = '', style }: FloatingDustProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

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

    interface Mote { x: number; y: number; r: number; vx: number; vy: number; o: number; }
    const motes: Mote[] = Array.from({ length: count }, () => ({
      x: rand(0, canvas.width), y: rand(0, canvas.height),
      r: rand(0.4, 1.5), vx: rand(-0.08, 0.08), vy: rand(-0.12, -0.03), o: rand(0.05, 0.2),
    }));

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const m of motes) {
        m.x += m.vx; m.y += m.vy;
        m.vx += rand(-0.003, 0.003);
        if (m.y < -3) { m.y = canvas.height + 3; m.x = rand(0, canvas.width); }
        if (m.x < -3 || m.x > canvas.width + 3) m.x = rand(0, canvas.width);
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(122,158,138,${m.o})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef} aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={style}
    />
  );
}
