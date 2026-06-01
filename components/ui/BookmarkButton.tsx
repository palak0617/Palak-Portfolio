'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useBookmarks } from './BookmarkContext';
import type { ChapterId } from '@/lib/data';

export default function BookmarkButton({ chapterId, className = '' }: { chapterId: ChapterId; className?: string }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [showToast, setShowToast] = useState(false);
  const bookmarked = isBookmarked(chapterId);

  function handleClick() {
    toggleBookmark(chapterId);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <motion.button
        onClick={handleClick}
        whileHover={{ scale:1.12 }} whileTap={{ scale:0.9 }}
        aria-label={bookmarked ? 'Remove bookmark from this chapter' : 'Bookmark this chapter'}
        title={bookmarked ? 'Remove bookmark' : 'Bookmark this chapter'}
        style={{
          width:'34px', height:'34px', borderRadius:'10px',
          border:`0.5px solid ${bookmarked ? 'rgba(107,159,196,0.5)' : 'var(--border-soft)'}`,
          background: bookmarked ? 'rgba(107,159,196,0.14)' : 'var(--bg-card)',
          cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
          backdropFilter:'blur(8px)', transition:'all 0.25s ease', position:'relative',
          fontSize:'15px',
        }}
      >
        🔖
        <AnimatePresence>
          {bookmarked && (
            <motion.div className="absolute inset-0 rounded-[10px] pointer-events-none"
              initial={{ scale:0, opacity:0.6 }} animate={{ scale:1.5, opacity:0 }} exit={{}}
              transition={{ duration:0.5 }}
              style={{ background:'radial-gradient(circle, rgba(107,159,196,0.4), transparent)' }}
            />
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity:0, x:8, scale:0.9 }} animate={{ opacity:1, x:0, scale:1 }} exit={{ opacity:0, x:8, scale:0.9 }}
            transition={{ type:'spring', stiffness:300, damping:22 }}
            style={{
              position:'absolute', right:'42px', top:'50%', translateY:'-50%',
              whiteSpace:'nowrap', padding:'5px 13px', borderRadius:'20px',
              background:'var(--bg-card)', border:'0.5px solid var(--border-blue)',
              fontFamily:'var(--font-dm)', fontSize:'12px',
              color: bookmarked ? 'var(--blue)' : 'var(--muted)',
              backdropFilter:'blur(8px)', boxShadow:'0 4px 12px rgba(0,0,0,0.1)',
              pointerEvents:'none', zIndex:50,
            }}
          >
            {bookmarked ? '🔖 Bookmarked!' : '✓ Removed'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
