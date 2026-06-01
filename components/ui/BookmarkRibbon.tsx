'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useBookmarkContext } from './BookmarkContext';
import type { ChapterId } from '@/lib/data';

interface BookmarkRibbonProps {
  chapterId: ChapterId;
  chapterLabel: string;
}

/**
 * A fabric-ribbon-style bookmark button that appears at the top of each chapter page.
 * Clicking it bookmarks / unbookmarks the chapter and shows a satisfying animation.
 */
export default function BookmarkRibbon({ chapterId, chapterLabel }: BookmarkRibbonProps) {
  const { isBookmarked, toggle } = useBookmarkContext();
  const active = isBookmarked(chapterId);

  function handleClick() {
    toggle(chapterId, chapterLabel);
  }

  return (
    <motion.button
      onClick={handleClick}
      aria-label={active ? `Remove bookmark for ${chapterLabel}` : `Bookmark ${chapterLabel}`}
      title={active ? `Remove bookmark` : `Bookmark this chapter`}
      className="relative group"
      style={{ outline: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Ribbon body */}
      <motion.div
        animate={{
          background: active
            ? 'linear-gradient(to bottom, #6b9fc4, #5a8ab0)'
            : 'linear-gradient(to bottom, rgba(122,158,138,0.25), rgba(107,159,196,0.2))',
          boxShadow: active
            ? '0 4px 12px rgba(107,159,196,0.35)'
            : '0 2px 6px rgba(0,0,0,0.06)',
        }}
        transition={{ duration: 0.3 }}
        style={{
          width: '22px',
          height: '54px',
          borderRadius: '0 0 3px 3px',
          position: 'relative',
          border: active ? 'none' : '0.5px solid rgba(122,158,138,0.35)',
        }}
      >
        {/* Ribbon notch at bottom */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '-8px',
            left: 0,
            right: 0,
            height: '9px',
            clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
          }}
          animate={{
            background: active ? '#5a8ab0' : 'rgba(107,159,196,0.25)',
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Star icon when active */}
        <AnimatePresence>
          {active && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -55%)',
                fontSize: '10px',
                color: 'white',
                userSelect: 'none',
              }}
            >✦</motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Tooltip on hover */}
      <div
        className="absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          top: '50%',
          right: '28px',
          transform: 'translateY(-50%)',
          background: 'rgba(42,40,32,0.78)',
          color: '#f8f3ea',
          fontSize: '10px',
          padding: '4px 10px',
          borderRadius: '6px',
          whiteSpace: 'nowrap',
          fontFamily: 'var(--font-sans)',
          letterSpacing: '0.05em',
        }}
      >
        {active ? 'Remove bookmark' : 'Bookmark this chapter'}
      </div>
    </motion.button>
  );
}
