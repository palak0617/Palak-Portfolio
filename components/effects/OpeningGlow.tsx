'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface OpeningGlowProps {
  active: boolean;
  phase?: 'anticipation' | 'opening' | 'burst' | 'settle';
}

export default function OpeningGlow({ active, phase = 'opening' }: OpeningGlowProps) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-[94] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeOut' } }}
          transition={{ duration: 0.3 }}
        >
          {/* ── Layer 1: warm core flash — from the book spine outward ── */}
          <motion.div
            className="absolute rounded-full"
            style={{
              background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,252,245,0.95) 0%, rgba(240,232,210,0.55) 30%, transparent 70%)',
              transformOrigin: 'center',
            }}
            initial={{ width: 40, height: 60, opacity: 0 }}
            animate={{
              width: ['40px','120px','55vmax','70vmax'],
              height: ['60px','100px','70vmax','80vmax'],
              opacity: [0, 1, 0.7, 0],
            }}
            transition={{
              duration: 2.0,
              times: [0, 0.12, 0.65, 1],
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* ── Layer 2: sage-green halo ── */}
          <motion.div
            className="absolute rounded-full"
            style={{
              background: 'radial-gradient(circle, transparent 18%, rgba(122,158,138,0.2) 42%, rgba(122,158,138,0.08) 62%, transparent 80%)',
            }}
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{
              width: ['0px','80vmax','120vmax'],
              height: ['0px','80vmax','120vmax'],
              opacity: [0, 0.9, 0],
            }}
            transition={{ duration: 2.2, delay: 0.18, times: [0, 0.45, 1], ease: [0.12, 1, 0.3, 1] }}
          />

          {/* ── Layer 3: dusty-blue outer ring ── */}
          <motion.div
            className="absolute rounded-full"
            style={{
              background: 'radial-gradient(circle, transparent 35%, rgba(107,159,196,0.15) 58%, rgba(107,159,196,0.05) 74%, transparent 85%)',
            }}
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{
              width: ['0px','150vmax'],
              height: ['0px','150vmax'],
              opacity: [0, 0.8, 0],
            }}
            transition={{ duration: 2.5, delay: 0.28, times: [0, 0.5, 1], ease: [0.1, 1, 0.25, 1] }}
          />

          {/* ── Layer 4: lavender shimmer ── */}
          <motion.div
            className="absolute rounded-full"
            style={{
              background: 'radial-gradient(circle, transparent 45%, rgba(180,168,208,0.1) 65%, transparent 82%)',
            }}
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{
              width: ['0px','190vmax'],
              height: ['0px','190vmax'],
              opacity: [0, 0.65, 0],
            }}
            transition={{ duration: 2.8, delay: 0.38, times: [0, 0.5, 1], ease: [0.1, 1, 0.2, 1] }}
          />

          {/* ── Directional light rays (from book center outward) ── */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = i * 30;
            const delay = 0.3 + i * 0.03;
            const len = 35 + (i % 3) * 8;
            return (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{
                  width: '1.5px',
                  height: `${len}vmax`,
                  background: i % 3 === 0
                    ? 'linear-gradient(to top, transparent, rgba(200,218,208,0.28), transparent)'
                    : i % 3 === 1
                      ? 'linear-gradient(to top, transparent, rgba(180,210,230,0.2), transparent)'
                      : 'linear-gradient(to top, transparent, rgba(220,212,200,0.22), transparent)',
                  transformOrigin: 'bottom center',
                  bottom: '50%',
                  left: 'calc(50% - 0.75px)',
                  rotate: `${angle}deg`,
                  filter: 'blur(2.5px)',
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{
                  scaleY: [0, 1, 0.7, 0],
                  opacity: [0, 0.85, 0.6, 0],
                }}
                transition={{
                  duration: 1.9,
                  delay,
                  times: [0, 0.3, 0.65, 1],
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            );
          })}

          {/* ── Bokeh orbs floating outward from book ── */}
          {[
            { x: -190, y: -140, sz: 65, c: 'rgba(107,159,196,0.25)', d: 0.35 },
            { x:  210, y: -150, sz: 50, c: 'rgba(180,168,208,0.28)', d: 0.42 },
            { x: -160, y:  150, sz: 55, c: 'rgba(122,158,138,0.22)', d: 0.38 },
            { x:  180, y:  120, sz: 45, c: 'rgba(232,180,176,0.24)', d: 0.48 },
            { x:    5, y: -210, sz: 38, c: 'rgba(107,159,196,0.2)',  d: 0.4  },
            { x: -240, y:    5, sz: 32, c: 'rgba(180,168,208,0.22)', d: 0.45 },
            { x:  250, y:  -10, sz: 30, c: 'rgba(122,158,138,0.18)', d: 0.5  },
            { x:  -80, y:  200, sz: 28, c: 'rgba(107,159,196,0.18)', d: 0.55 },
          ].map((orb, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: orb.sz, height: orb.sz,
                background: `radial-gradient(circle, ${orb.c} 0%, transparent 72%)`,
                filter: 'blur(10px)',
              }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.2 }}
              animate={{
                x: orb.x, y: orb.y,
                opacity: [0, 1, 0.7, 0],
                scale: [0.2, 1.3, 1.0, 0.6],
              }}
              transition={{
                duration: 2.0,
                delay: orb.d,
                times: [0, 0.25, 0.65, 1],
                ease: [0.12, 0.8, 0.4, 1],
              }}
            />
          ))}

          {/* ── Spine crack — thin vertical line of warm light (the book opening) ── */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: '3px',
              height: '0px',
              background: 'linear-gradient(to bottom, transparent, rgba(255,248,230,0.95), rgba(220,200,160,0.7), transparent)',
              borderRadius: '2px',
              filter: 'blur(1px)',
              boxShadow: '0 0 12px 4px rgba(255,240,200,0.5)',
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: ['0px','160px','220px','0px'],
              opacity: [0, 1, 0.8, 0],
            }}
            transition={{
              duration: 1.4,
              delay: 0.1,
              times: [0, 0.2, 0.6, 1],
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
