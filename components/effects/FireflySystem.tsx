'use client';

import { useEffect, useRef } from 'react';
import { rand, randInt } from '@/utils/helpers';

const FIREFLY_COUNT = 12;

interface FireflyDot {
  el: HTMLDivElement;
  timeoutId: ReturnType<typeof setTimeout>;
}

const FIREFLY_COLORS = [
  'rgba(107,159,196,0.9)',   // blue
  'rgba(180,168,208,0.85)',  // lavender
  'rgba(122,158,138,0.85)',  // sage
  'rgba(142,184,212,0.9)',   // light blue
];
const GLOW_COLORS = [
  'rgba(107,159,196,0.4)',
  'rgba(180,168,208,0.35)',
  'rgba(122,158,138,0.35)',
  'rgba(142,184,212,0.4)',
];

export default function FireflySystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const firefliesRef = useRef<FireflyDot[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Inject keyframes once
    if (!document.getElementById('firefly-keyframes-v4')) {
      const style = document.createElement('style');
      style.id = 'firefly-keyframes-v4';
      style.textContent = `
        @keyframes fireflyMoveV4 {
          0%   { opacity: 0;   transform: translate(0, 0); }
          10%  { opacity: 0.9; }
          50%  { opacity: 0.5; transform: translate(var(--fx), var(--fy)); }
          90%  { opacity: 0.8; }
          100% { opacity: 0;   transform: translate(0, 0); }
        }`;
      document.head.appendChild(style);
    }

    function spawnFirefly() {
      if (!container) return;
      const i = randInt(0, FIREFLY_COLORS.length - 1);
      const el = document.createElement('div');
      const size = rand(3, 5);
      const x = rand(5, 95);
      const y = rand(5, 88);
      const dur = rand(4, 9);
      const dx = rand(-150, 150);
      const dy = rand(-150, 150);
      const delay = rand(0, dur);

      el.style.cssText = `
        position: fixed;
        left: ${x}vw; top: ${y}vh;
        width: ${size}px; height: ${size}px;
        border-radius: 50%;
        background: ${FIREFLY_COLORS[i]};
        box-shadow: 0 0 ${size * 2}px ${size}px ${GLOW_COLORS[i]};
        pointer-events: none; z-index: 6;
        --fx: ${dx}px; --fy: ${dy}px;
        animation: fireflyMoveV4 ${dur}s ease-in-out ${delay}s infinite;
      `;
      container.appendChild(el);

      const timeoutId = setTimeout(() => {
        el.remove();
        const idx = firefliesRef.current.findIndex(f => f.el === el);
        if (idx > -1) firefliesRef.current.splice(idx, 1);
        spawnFirefly();
      }, (dur + delay) * 1000 + randInt(0, 2000));

      firefliesRef.current.push({ el, timeoutId });
    }

    for (let i = 0; i < FIREFLY_COUNT; i++) {
      setTimeout(spawnFirefly, i * 250);
    }

    return () => {
      firefliesRef.current.forEach(({ el, timeoutId }) => {
        clearTimeout(timeoutId); el.remove();
      });
      firefliesRef.current = [];
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" />;
}
