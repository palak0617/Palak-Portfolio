'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface PageTurnProps {
  turning: boolean;
  direction?: 'forward' | 'backward';
}

export default function PageTurn({ turning, direction = 'forward' }: PageTurnProps) {
  if (!turning) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="page-turn"
        className="fixed inset-0 z-[80] pointer-events-none"
        style={{ perspective: '1400px' }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Page layer that flips */}
        <motion.div
          className="absolute inset-y-0 right-0 book-page"
          style={{
            width: '70%',
            originX: 0,
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
          initial={{ rotateY: direction === 'forward' ? 0 : -178 }}
          animate={{ rotateY: direction === 'forward' ? -178 : 0 }}
          transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="absolute inset-0 texture-lines opacity-30" />
          {/* Page shadow edge */}
          <div
            className="absolute left-0 inset-y-0 pointer-events-none"
            style={{
              width: '40px',
              background: 'linear-gradient(to right, rgba(92,61,46,0.15), transparent)',
            }}
          />
        </motion.div>

        {/* Shadow on current page */}
        <motion.div
          className="absolute inset-y-0 right-0"
          style={{ width: '70%', background: 'transparent', pointerEvents: 'none' }}
          initial={{ boxShadow: 'none' }}
          animate={{ boxShadow: '-12px 0 24px rgba(0,0,0,0.2)' }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
