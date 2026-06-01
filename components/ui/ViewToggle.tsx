'use client';

import { motion } from 'framer-motion';

interface ViewToggleProps {
  mode: 'book' | 'scroll';
  onToggle: () => void;
}

export default function ViewToggle({ mode, onToggle }: ViewToggleProps) {
  const isScroll = mode === 'scroll';

  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.94 }}
      title={isScroll ? 'Switch to book mode' : 'Switch to scroll mode'}
      aria-label={isScroll ? 'Switch to book mode' : 'Switch to normal scroll mode'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '7px',
        padding: '8px 16px',
        borderRadius: '22px',
        border: '0.5px solid var(--border-soft)',
        background: 'var(--bg-card)',
        backdropFilter: 'blur(10px)',
        cursor: 'pointer',
        fontFamily: 'var(--font-dm)',
        fontSize: '12px',
        fontWeight: 500,
        color: 'var(--btn-c)',
        letterSpacing: '0.06em',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        transition: 'all 0.25s ease',
      }}
    >
      <motion.span
        key={mode}
        initial={{ rotate: -20, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        style={{ fontSize: '15px' }}
      >
        {isScroll ? '📖' : '☰'}
      </motion.span>
      <span>{isScroll ? 'Book mode' : 'Scroll mode'}</span>
    </motion.button>
  );
}
