'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

/* ── White + Blue LED palette ──────────────────────────── */
const SCHEME = [
  { fill:'#ffffff', glow:'rgba(255,255,255,0.95)', size:7   },
  { fill:'#7bb8e8', glow:'rgba(100,170,240,0.85)', size:6   },
  { fill:'#e8f4ff', glow:'rgba(220,238,255,0.9)',  size:5.5 },
  { fill:'#4a9fd4', glow:'rgba(60,140,220,0.88)',  size:6.5 },
  { fill:'#ffffff', glow:'rgba(255,255,255,0.95)', size:6   },
  { fill:'#8ab4e8', glow:'rgba(120,175,235,0.82)', size:5   },
  { fill:'#c8e8ff', glow:'rgba(180,220,255,0.85)', size:5.5 },
  { fill:'#ffffff', glow:'rgba(255,255,255,0.9)',  size:7.5 },
];

function blinkVariants(delay: number, dur: number) {
  return {
    animate: {
      opacity: [0.06, 0.06, 1, 1, 0.06, 0.08, 0.95, 1, 0.06],
      scale:   [0.65, 0.65, 1.18, 1, 0.7, 0.65, 1.1, 1.2, 0.65],
    },
    transition: {
      duration: dur,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
      times: [0, 0.16, 0.21, 0.42, 0.46, 0.58, 0.63, 0.74, 1],
    },
  };
}

interface StripProps { side: 'left' | 'right' }

function LEDStrip({ side }: StripProps) {
  /* Fill full viewport height — count enough LEDs */
  const COUNT = 28;

  const leds = useMemo(() =>
    Array.from({ length: COUNT }, (_, i) => {
      const s = SCHEME[i % SCHEME.length];
      return { ...s, delay: (i * 0.17) % 4, duration: 1.8 + (i % 5) * 0.45 };
    }), []
  );

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        [side]: '10px',
        top: 0,
        bottom: 0,
        zIndex: 25,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',   /* evenly spaced top to bottom */
        padding: '16px 0',
      }}
    >
      {/* Wire running full height */}
      <div style={{
        position: 'absolute',
        top: 0, bottom: 0,
        left: '50%', transform: 'translateX(-50%)',
        width: '1.5px',
        background: 'linear-gradient(to bottom, transparent 1%, rgba(160,210,255,0.22) 8%, rgba(160,210,255,0.25) 92%, transparent 99%)',
      }}/>

      {leds.map((led, i) => {
        const blink = blinkVariants(led.delay, led.duration);
        return (
          <motion.div
            key={i}
            animate={blink.animate}
            transition={blink.transition}
            style={{
              position: 'relative',
              width: led.size, height: led.size,
              borderRadius: '50%',
              flexShrink: 0,
              background: led.fill,
              outline: '1px solid rgba(180,220,255,0.22)',
            }}
          >
            {/* Inner bright core */}
            <div style={{
              position: 'absolute', inset: '15%',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.92)',
            }}/>
            {/* Outer glow halo */}
            <motion.div
              animate={blink.animate}
              transition={{ ...blink.transition, delay: led.delay + 0.025 }}
              style={{
                position: 'absolute',
                inset: `-${led.size * 0.9}px`,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${led.glow} 0%, transparent 68%)`,
                filter: 'blur(2.5px)',
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

export default function LEDLights() {
  return (
    <>
      <LEDStrip side="left"  />
      <LEDStrip side="right" />
    </>
  );
}
