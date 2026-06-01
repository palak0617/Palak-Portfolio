'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0d0805',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px',
        gap: '16px',
      }}
    >
      <p
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: '20px',
          color: 'rgba(196,133,122,0.75)',
          letterSpacing: '0.05em',
        }}
      >
        ✦ Something went awry ✦
      </p>
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic',
          fontSize: '28px',
          color: 'rgba(232,201,110,0.75)',
        }}
      >
        The ink spilled on this page
      </h2>
      <p
        style={{
          fontFamily: "'Crimson Text', serif",
          fontSize: '15px',
          color: 'rgba(245,234,214,0.5)',
          maxWidth: '340px',
          lineHeight: 1.8,
        }}
      >
        A mishap in the manuscript. Let us try turning the page again.
      </p>
      <button
        onClick={reset}
        style={{
          marginTop: '12px',
          fontFamily: "'Playfair Display', serif",
          fontSize: '13px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase' as const,
          color: '#c9a84c',
          padding: '10px 28px',
          border: '1px solid rgba(201,168,76,0.4)',
          borderRadius: '2px',
          background: 'rgba(201,168,76,0.07)',
          cursor: 'pointer',
        }}
      >
        Try Again
      </button>
    </div>
  );
}
