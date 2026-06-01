'use client';

import { useEffect } from 'react';

/**
 * Adds a subtle golden glow trail that follows the cursor inside the storybook.
 * Uses a canvas overlay injected into body.
 */
export function useCursorTrail(active = true) {
  useEffect(() => {
    if (!active || typeof window === 'undefined') return;

    const canvas = document.createElement('canvas');
    canvas.id = 'cursor-trail';
    canvas.style.cssText = `
      position: fixed; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 9999;
    `;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d')!;

    interface Trail { x: number; y: number; alpha: number; r: number; }
    const trail: Trail[] = [];
    let mouse = { x: -100, y: -100 };

    function onMove(e: MouseEvent) { mouse = { x: e.clientX, y: e.clientY }; }
    function onResize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('resize', onResize);

    let raf: number;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new point
      if (mouse.x > 0) {
        trail.push({ x: mouse.x, y: mouse.y, alpha: 0.35, r: 6 });
      }

      // Draw and decay
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.alpha -= 0.018;
        p.r     *= 0.97;
        if (p.alpha <= 0) { trail.splice(i, 1); continue; }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        grad.addColorStop(0, `rgba(201,168,76,${p.alpha})`);
        grad.addColorStop(1, 'rgba(201,168,76,0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
      canvas.remove();
    };
  }, [active]);
}
