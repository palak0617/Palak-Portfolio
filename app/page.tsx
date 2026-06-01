'use client';

import { useState, useEffect, useCallback } from 'react';
import LandingScene        from '@/components/book/LandingScene';
import StorybookLayout     from '@/components/layout/StorybookLayout';
import ScrollableView      from '@/components/layout/ScrollableView';
import OpeningAnimation    from '@/components/book/OpeningAnimation';
import { SoundProvider }   from '@/components/ui/SoundProvider';
import { ThemeProvider }   from '@/components/ui/ThemeProvider';
import { BookmarkProvider } from '@/components/ui/BookmarkContext';

export type AppState = 'landing' | 'opening' | 'storybook';
export type ViewMode = 'book' | 'scroll';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [viewMode, setViewMode] = useState<ViewMode>('book');

  /* ── Lock / unlock body scroll correctly for every state ── */
  useEffect(() => {
    const shouldLock =
      appState === 'landing' ||
      appState === 'opening' ||
      (appState === 'storybook' && viewMode === 'book');

    document.body.style.overflow = shouldLock ? 'hidden' : '';
    document.documentElement.style.overflow = shouldLock ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [appState, viewMode]);

  /* ── Toggle between book and scroll ── */
  const toggleView = useCallback(() => {
    setViewMode(prev => {
      const next = prev === 'book' ? 'scroll' : 'book';

      // When returning to book mode: reset window scroll position
      if (next === 'book') {
        // Tiny delay so the DOM swaps before we reset scroll
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }, 10);
      }

      try { localStorage.setItem('palak-view-mode', next); } catch {}
      return next;
    });
  }, []);

  /* ── Restore saved preference once storybook is ready ── */
  useEffect(() => {
    if (appState !== 'storybook') return;
    try {
      const saved = localStorage.getItem('palak-view-mode') as ViewMode | null;
      if (saved) setViewMode(saved);
    } catch {}
  }, [appState]);

  return (
    <ThemeProvider>
      <SoundProvider>
        <BookmarkProvider>
          {/* 
            IMPORTANT: use a keyed wrapper so StorybookLayout fully remounts
            when coming back from scroll mode — prevents stale DOM state.
          */}
          {appState === 'landing' && (
            <LandingScene onOpen={() => setAppState('opening')} />
          )}

          {appState === 'opening' && (
            <OpeningAnimation onComplete={() => setAppState('storybook')} />
          )}

          {appState === 'storybook' && viewMode === 'book' && (
            <div key="book-mode" style={{ width:'100%', height:'100dvh', overflow:'hidden', position:'fixed', inset:0 }}>
              <StorybookLayout onSwitchToScroll={toggleView} />
            </div>
          )}

          {appState === 'storybook' && viewMode === 'scroll' && (
            <div key="scroll-mode" style={{ width:'100%', minHeight:'100vh' }}>
              <ScrollableView onSwitchToBook={toggleView} />
            </div>
          )}
        </BookmarkProvider>
      </SoundProvider>
    </ThemeProvider>
  );
}
