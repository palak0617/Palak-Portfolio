import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 40%, #2a1a0a 0%, #0d0805 70%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px',
        gap: '0',
      }}
    >
      <p
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: '100px',
          color: 'rgba(201,168,76,0.2)',
          lineHeight: 1,
          marginBottom: '8px',
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(22px, 4vw, 34px)',
          color: 'rgba(232,201,110,0.8)',
          marginBottom: '16px',
          letterSpacing: '0.03em',
        }}
      >
        This page has not been written yet
      </h1>
      <p
        style={{
          fontFamily: "'Crimson Text', serif",
          fontSize: '16px',
          color: 'rgba(196,133,122,0.7)',
          maxWidth: '360px',
          lineHeight: 1.8,
          marginBottom: '36px',
        }}
      >
        The chapter you are looking for seems to have wandered off into the margins.
        Let us find our way back.
      </p>
      <Link
        href="/"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '13px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#c9a84c',
          textDecoration: 'none',
          padding: '10px 28px',
          border: '1px solid rgba(201,168,76,0.45)',
          borderRadius: '2px',
          background: 'rgba(201,168,76,0.07)',
          transition: 'background 0.2s ease',
        }}
      >
        Return to the Book
      </Link>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400&family=Crimson+Text&family=Dancing+Script:wght@400&display=swap');
      `}</style>
    </div>
  );
}
