import { useEffect, useRef } from 'react';
import { rand } from '@/utils/helpers';

interface Particle {
  x: number; y: number;
  r: number;
  vx: number; vy: number;
  opacity: number;
}

interface UseParticlesOptions {
  count?: number;
  color?: string;
  active?: boolean;
}

/**
 * Attach to a canvas ref.
 * Draws floating dust particles and returns start/stop controls.
 */
export function useParticles(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  { count = 60, color = 'rgba(201,168,76,', active = true }: UseParticlesOptions = {}
) {
  const particles = useRef<Particle[]>([]);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
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

    particles.current = Array.from({ length: count }, () => ({
      x: rand(0, canvas.width),
      y: rand(0, canvas.height),
      r: rand(0.3, 1.8),
      vx: rand(-0.12, 0.12),
      vy: rand(-0.25, -0.06),
      opacity: rand(0.1, 0.45),
    }));

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles.current) {
        p.x  += p.vx;
        p.y  += p.vy;
        p.vx += rand(-0.004, 0.004);
        p.vx  = Math.max(-0.15, Math.min(0.15, p.vx));

        if (p.y < -4)               { p.y = canvas.height + 4; p.x = rand(0, canvas.width); }
        if (p.x < -4)               p.x = canvas.width + 4;
        if (p.x > canvas.width + 4) p.x = -4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${p.opacity})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [canvasRef, count, color, active]);
}
