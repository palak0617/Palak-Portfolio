'use client';

import { motion, useAnimation } from 'framer-motion';
import { useTheme } from './ThemeProvider';

/**
 * Vintage Edison bulb with pull cord.
 * Light mode = bulb ON (warm amber glow).
 * Dark mode  = bulb OFF (dim glass).
 * Clicking the cord triggers a swing animation + toggles theme.
 */
export default function BulbToggle() {
  const { isDark, toggleTheme } = useTheme();
  const cordControls = useAnimation();

  async function handleClick() {
    // Cord pull animation: quick tug then settle
    await cordControls.start({
      rotate: [0, 12, -8, 5, -3, 1, 0],
      transition: { duration: 0.65, ease: 'easeInOut' },
    });
    toggleTheme();
  }

  const bulbOn = !isDark;

  return (
    <motion.button
      onClick={handleClick}
      title={isDark ? 'Pull for light mode' : 'Pull for dark mode'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      whileHover={{ scale: 1.08 }}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        padding: '0', display: 'flex', flexDirection: 'column',
        alignItems: 'center', position: 'relative', userSelect: 'none',
      }}
    >
      <motion.div
        animate={cordControls}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transformOrigin: 'top center' }}
      >
        {/* Ceiling mount */}
        <div style={{
          width: '10px', height: '4px', borderRadius: '2px',
          background: bulbOn ? 'rgba(201,168,76,0.6)' : 'rgba(150,140,120,0.4)',
          marginBottom: '0px',
          transition: 'background 0.4s ease',
        }}/>

        {/* Cord */}
        <motion.div style={{ position: 'relative', width: '2px', height: '14px' }}>
          <div style={{
            width: '1.5px', height: '100%',
            background: bulbOn
              ? 'linear-gradient(to bottom, rgba(201,168,76,0.7), rgba(180,150,60,0.5))'
              : 'linear-gradient(to bottom, rgba(120,110,90,0.5), rgba(100,90,70,0.4))',
            margin: '0 auto',
            transition: 'background 0.4s ease',
          }}/>
        </motion.div>

        {/* Bulb glow halo — only when ON */}
        <div style={{ position: 'relative', width: '32px', height: '44px' }}>
          {bulbOn && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                inset: '-10px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,200,60,0.35) 0%, rgba(255,160,30,0.15) 45%, transparent 70%)',
                filter: 'blur(6px)',
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Bulb SVG */}
          <svg viewBox="0 0 32 44" fill="none" width="32" height="44" style={{ position: 'relative', zIndex: 1 }}>
            {/* Bulb glass body */}
            <path
              d="M16 6 C7 6 4 13 4 19 C4 27 9 32 12 34 L20 34 C23 32 28 27 28 19 C28 13 25 6 16 6Z"
              fill={bulbOn
                ? 'url(#bulbGlowGrad)'
                : '#9a9080'}
              stroke={bulbOn ? 'rgba(201,168,76,0.5)' : 'rgba(120,110,90,0.4)'}
              strokeWidth="0.8"
            />

            {/* Inner glow when on */}
            {bulbOn && (
              <path
                d="M16 10 C10 10 8 15 8 19 C8 25 11 29 13 31 L19 31 C21 29 24 25 24 19 C24 15 22 10 16 10Z"
                fill="rgba(255,230,120,0.55)"
              />
            )}

            {/* Filament */}
            <path
              d="M12 26 Q14 20 16 26 Q18 20 20 26"
              stroke={bulbOn ? 'rgba(255,180,40,0.9)' : 'rgba(120,110,90,0.5)'}
              strokeWidth={bulbOn ? '1.2' : '0.8'}
              fill="none"
              strokeLinecap="round"
            />

            {/* Base ring 1 */}
            <rect x="11" y="34" width="10" height="3" rx="1"
              fill={bulbOn ? 'rgba(180,150,60,0.8)' : 'rgba(100,90,70,0.5)'}
            />
            {/* Base ring 2 */}
            <rect x="12" y="37" width="8" height="3" rx="1"
              fill={bulbOn ? 'rgba(160,130,50,0.8)' : 'rgba(90,80,60,0.5)'}
            />
            {/* Base tip */}
            <rect x="14" y="40" width="4" height="2" rx="1"
              fill={bulbOn ? 'rgba(140,110,40,0.8)' : 'rgba(80,70,50,0.5)'}
            />

            {/* Gradient def for on-state */}
            <defs>
              <radialGradient id="bulbGlowGrad" cx="50%" cy="45%" r="55%">
                <stop offset="0%"  stopColor="rgba(255,240,180,0.95)" />
                <stop offset="40%" stopColor="rgba(255,210,100,0.85)" />
                <stop offset="100%" stopColor="rgba(200,160,60,0.7)" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Pull bead / knob at end of cord */}
        <div style={{
          width: '8px', height: '8px', borderRadius: '50%',
          background: bulbOn
            ? 'radial-gradient(circle at 35% 35%, #e8c96e, #a07828)'
            : 'radial-gradient(circle at 35% 35%, #908070, #504030)',
          boxShadow: bulbOn ? '0 1px 4px rgba(201,168,76,0.5)' : '0 1px 3px rgba(0,0,0,0.3)',
          transition: 'background 0.4s ease, box-shadow 0.4s ease',
          marginTop: '1px',
        }}/>
      </motion.div>
    </motion.button>
  );
}
