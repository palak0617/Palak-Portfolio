'use client';

import { motion } from 'framer-motion';
import type { ChapterId } from '@/lib/data';

interface Bookmark {
  id: ChapterId;
  label: string;
  shortLabel: string;
  color: string;
  darkColor: string;
}

const BOOKMARKS: Bookmark[] = [
  { id: 'intro',    label: 'Preface',     shortLabel: 'I',    color: '#8b4f3a', darkColor: '#a86040' },
  { id: 'about',    label: 'About',       shortLabel: 'II',   color: '#5c7a4e', darkColor: '#6e9060' },
  { id: 'skills',   label: 'Skills',      shortLabel: 'III',  color: '#4a5e8a', darkColor: '#5a72a8' },
  { id: 'projects', label: 'Projects',    shortLabel: 'IV',   color: '#7a4f8a', darkColor: '#9060a8' },
  { id: 'journey',  label: 'Journey',     shortLabel: 'V',    color: '#8a4f2a', darkColor: '#a86030' },
  { id: 'contact',  label: 'Write to Me', shortLabel: 'VI',   color: '#8a6a2a', darkColor: '#c9a84c' },
];

interface InteractiveBookmarksProps {
  activeChapter: ChapterId;
  onNavigate: (id: ChapterId) => void;
}

export default function InteractiveBookmarks({ activeChapter, onNavigate }: InteractiveBookmarksProps) {
  return (
    <nav
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1"
      aria-label="Chapter navigation"
    >
      {BOOKMARKS.map((bm, i) => {
        const isActive = activeChapter === bm.id;
        return (
          <motion.button
            key={bm.id}
            onClick={() => onNavigate(bm.id)}
            title={bm.label}
            aria-label={`Navigate to ${bm.label}`}
            aria-current={isActive ? 'page' : undefined}
            initial={{ x: 0 }}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.97 }}
            animate={{ x: isActive ? -5 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              background: bm.color,
              position: 'relative',
            }}
            className={`
              group flex items-center
              pl-3 pr-5 py-2.5
              rounded-l-md
              text-parchment-100
              shadow-[−3px_2px_8px_rgba(0,0,0,0.3)]
              transition-all duration-200
              ${isActive ? 'opacity-100' : 'opacity-80 hover:opacity-100'}
            `}
          >
            {/* Ribbon tail */}
            <span
              className="absolute -bottom-2 left-0 w-full h-2 pointer-events-none"
              style={{
                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                background: bm.color,
                filter: 'brightness(0.8)',
              }}
            />

            {/* Active indicator */}
            {isActive && (
              <motion.span
                layoutId="active-bookmark-dot"
                className="w-1.5 h-1.5 rounded-full bg-gold mr-2 flex-shrink-0"
              />
            )}
            {!isActive && <span className="w-1.5 h-1.5 mr-2 flex-shrink-0" />}

            <span
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                color: '#f5ead6',
                whiteSpace: 'nowrap',
              }}
            >
              {bm.label}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
}
