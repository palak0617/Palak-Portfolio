'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

interface DiaryWritingAnimationProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  showCursor?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export default function DiaryWritingAnimation({
  text,
  className = '',
  style,
  speed = 40,
  delay = 0,
  onComplete,
  showCursor = true,
  as: Tag = 'p',
}: DiaryWritingAnimationProps) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    indexRef.current = 0;
    setDisplayed('');
    setDone(false);

    const startTimeout = setTimeout(() => {
      function type() {
        if (indexRef.current < text.length) {
          const char = text[indexRef.current];
          setDisplayed(prev => prev + char);
          indexRef.current++;
          timerRef.current = setTimeout(type, speed);
        } else {
          setDone(true);
          onComplete?.();
        }
      }
      type();
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timerRef.current);
    };
  }, [text, speed, delay, onComplete]);

  return (
    <Tag className={className} style={style}>
      {displayed}
      {showCursor && !done && (
        <span
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: '2px',
            height: '1em',
            background: 'var(--brown, #5c3d2e)',
            marginLeft: '2px',
            verticalAlign: 'middle',
            animation: 'cursorBlink 0.7s infinite',
          }}
        />
      )}
    </Tag>
  );
}
