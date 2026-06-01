import { useState, useCallback, useRef } from 'react';
import type { ChapterId } from '@/lib/data';

const CHAPTER_ORDER: ChapterId[] = ['intro', 'about', 'skills', 'projects', 'journey', 'contact'];

interface UseBookNavigationOptions {
  onNavigate?: (id: ChapterId, direction: number) => void;
}

/**
 * Manages storybook chapter state, direction, and turning lock.
 * Provides navigateTo, goNext, goPrev and current index.
 */
export function useBookNavigation({ onNavigate }: UseBookNavigationOptions = {}) {
  const [currentChapter, setCurrentChapter] = useState<ChapterId>('intro');
  const [direction, setDirection] = useState(1);
  const [isTurning, setIsTurning] = useState(false);

  // Refs for stable access inside effects without stale closures
  const currentRef  = useRef(currentChapter);
  const turningRef  = useRef(isTurning);
  currentRef.current = currentChapter;
  turningRef.current = isTurning;

  const navigateTo = useCallback((id: ChapterId, dir?: number) => {
    if (id === currentRef.current || turningRef.current) return;

    const currentIdx = CHAPTER_ORDER.indexOf(currentRef.current);
    const targetIdx  = CHAPTER_ORDER.indexOf(id);
    const resolvedDir = dir ?? (targetIdx > currentIdx ? 1 : -1);

    setDirection(resolvedDir);
    setIsTurning(true);
    turningRef.current = true;
    onNavigate?.(id, resolvedDir);

    // Brief lock while page turn animation plays
    setTimeout(() => {
      setCurrentChapter(id);
      currentRef.current = id;
      setIsTurning(false);
      turningRef.current = false;
    }, 220);
  }, [onNavigate]);

  const goNext = useCallback(() => {
    const idx = CHAPTER_ORDER.indexOf(currentRef.current);
    if (idx < CHAPTER_ORDER.length - 1) navigateTo(CHAPTER_ORDER[idx + 1], 1);
  }, [navigateTo]);

  const goPrev = useCallback(() => {
    const idx = CHAPTER_ORDER.indexOf(currentRef.current);
    if (idx > 0) navigateTo(CHAPTER_ORDER[idx - 1], -1);
  }, [navigateTo]);

  const currentIdx  = CHAPTER_ORDER.indexOf(currentChapter);
  const isFirst     = currentIdx === 0;
  const isLast      = currentIdx === CHAPTER_ORDER.length - 1;

  return {
    currentChapter,
    direction,
    isTurning,
    currentIdx,
    isFirst,
    isLast,
    chapterOrder: CHAPTER_ORDER,
    navigateTo,
    goNext,
    goPrev,
  };
}
