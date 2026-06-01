import { useEffect } from 'react';

interface UseKeyboardNavOptions {
  onNext: () => void;
  onPrev: () => void;
  active?: boolean;
}

/**
 * Arrow key navigation for the storybook chapters.
 * ArrowRight / ArrowDown → next
 * ArrowLeft  / ArrowUp   → prev
 */
export function useKeyboardNav({ onNext, onPrev, active = true }: UseKeyboardNavOptions) {
  useEffect(() => {
    if (!active) return;

    function handler(e: KeyboardEvent) {
      // Don't steal events from inputs/textareas
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        onNext();
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        onPrev();
      }
    }

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onNext, onPrev, active]);
}
