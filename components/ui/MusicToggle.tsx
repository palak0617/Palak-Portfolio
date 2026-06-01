'use client';

import { motion } from 'framer-motion';
import { useAmbientMusicContext } from './SoundProvider';

export default function MusicToggle() {
  const { enabled, toggle } = useAmbientMusicContext();

  return (
    <motion.button
      onClick={toggle}
      title={enabled ? 'Pause fairy music' : 'Play fairy music'}
      aria-label={enabled ? 'Pause ambient music' : 'Play ambient fairy-tale music'}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      style={{
        width: '36px', height: '36px', borderRadius: '10px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: enabled ? 'rgba(107,159,196,0.18)' : 'var(--bg-card)',
        border: `0.5px solid ${enabled ? 'rgba(107,159,196,0.45)' : 'var(--border-soft)'}`,
        color: enabled ? 'var(--blue)' : 'var(--muted)',
        fontSize: '17px', cursor: 'pointer',
        backdropFilter: 'blur(8px)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}
    >
      {/* Animated musical note when playing */}
      {enabled ? (
        <motion.span
          animate={{ y: [0, -2, 0], opacity: [1, 0.7, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        >♫</motion.span>
      ) : (
        <span>♪</span>
      )}
      {/* Sound wave ripples when playing */}
      {enabled && (
        <motion.div
          className="absolute inset-0 rounded-[10px] pointer-events-none"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
          style={{ border: '1px solid rgba(107,159,196,0.3)' }}
        />
      )}
    </motion.button>
  );
}
