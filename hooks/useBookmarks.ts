'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ChapterId } from '@/lib/data';

const STORAGE_KEY = 'palak-portfolio-bookmarks';

export interface BookmarkEntry {
  id: ChapterId;
  label: string;
  savedAt: number; // timestamp
}

/**
 * Manages bookmarked chapters.
 * Persists to localStorage (client-side only — SSR safe).
 */
export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setBookmarks(JSON.parse(raw));
    } catch {
      // localStorage blocked or invalid JSON — start fresh
    }
    setHydrated(true);
  }, []);

  // Persist whenever bookmarks change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch { /* storage full or blocked */ }
  }, [bookmarks, hydrated]);

  const isBookmarked = useCallback(
    (id: ChapterId) => bookmarks.some(b => b.id === id),
    [bookmarks]
  );

  const toggle = useCallback((id: ChapterId, label: string) => {
    setBookmarks(prev => {
      if (prev.some(b => b.id === id)) {
        return prev.filter(b => b.id !== id);
      }
      return [...prev, { id, label, savedAt: Date.now() }];
    });
  }, []);

  const remove = useCallback((id: ChapterId) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  }, []);

  const clearAll = useCallback(() => setBookmarks([]), []);

  return { bookmarks, isBookmarked, toggle, remove, clearAll, hydrated };
}
