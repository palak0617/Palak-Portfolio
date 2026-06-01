'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ChapterId } from '@/lib/data';
import { CHAPTERS } from '@/lib/data';

export interface Bookmark {
  id: ChapterId;
  label: string;
  savedAt: string;
  note: string;
}

interface BookmarkContextValue {
  bookmarks: Bookmark[];
  isBookmarked: (id: ChapterId) => boolean;
  toggleBookmark: (id: ChapterId) => void;
  removeBookmark: (id: ChapterId) => void;
  clearAll: () => void;
}

const BookmarkContext = createContext<BookmarkContextValue>({
  bookmarks: [],
  isBookmarked: () => false,
  toggleBookmark: () => {},
  removeBookmark: () => {},
  clearAll: () => {},
});

const STORAGE_KEY = 'palak-portfolio-bookmarks';

const AUTO_NOTES: Record<string, string> = {
  intro:    "You saved the opening page ✦",
  about:    "You connected with Palak's story",
  skills:   "You liked Palak's skill set",
  projects: "You saved the projects chapter",
  journey:  "You bookmarked the journey timeline",
  contact:  "You want to reach out to Palak",
};

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setBookmarks(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch { /* ignore */ }
  }, [bookmarks]);

  const isBookmarked = useCallback((id: ChapterId) =>
    bookmarks.some(b => b.id === id), [bookmarks]);

  const toggleBookmark = useCallback((id: ChapterId) => {
    setBookmarks(prev => {
      if (prev.some(b => b.id === id)) return prev.filter(b => b.id !== id);
      const chapter = CHAPTERS.find(c => c.id === id);
      return [...prev, {
        id, label: chapter?.label ?? id,
        savedAt: new Date().toISOString(),
        note: AUTO_NOTES[id] ?? 'Saved this chapter',
      }];
    });
  }, []);

  const removeBookmark = useCallback((id: ChapterId) =>
    setBookmarks(prev => prev.filter(b => b.id !== id)), []);

  const clearAll = useCallback(() => setBookmarks([]), []);

  return (
    <BookmarkContext.Provider value={{ bookmarks, isBookmarked, toggleBookmark, removeBookmark, clearAll }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(BookmarkContext);
}
