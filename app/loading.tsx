export default function Loading() {
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
        gap: '20px',
      }}
    >
      {/* Animated candle flame placeholder */}
      <div
        style={{
          width: '12px',
          height: '26px',
          background: 'linear-gradient(to top, #ff9500, #ffdd00, #fffde7)',
          borderRadius: '50% 50% 30% 30%',
          boxShadow: '0 0 18px 8px rgba(255,180,50,0.5)',
          animation: 'flickerFlame 1.5s ease-in-out infinite alternate',
        }}
      />
      <p
        style={{
          fontFamily: "'IM Fell English', serif",
          fontStyle: 'italic',
          fontSize: '14px',
          color: 'rgba(201,168,76,0.55)',
          letterSpacing: '0.2em',
          animation: 'pulse 1.5s ease-in-out infinite',
        }}
      >
        lighting the candle…
      </p>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@1&display=swap');
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:0.9} }
        @keyframes flickerFlame {
          0%{transform:scaleX(1) scaleY(1) rotate(-1deg)}
          50%{transform:scaleX(0.88) scaleY(1.1) rotate(1deg)}
          100%{transform:scaleX(1.08) scaleY(0.95) rotate(-0.5deg)}
        }
      `}</style>
    </div>
  );
}
