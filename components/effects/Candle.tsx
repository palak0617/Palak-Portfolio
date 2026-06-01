'use client';

interface CandleProps {
  height?: number;
  delay?: number;
  className?: string;
}

export default function Candle({ height = 60, delay = 0, className = '' }: CandleProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Flame */}
      <div className="relative flex justify-center">
        {/* Outer glow */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: '32px',
            height: '32px',
            top: '-6px',
            background: 'radial-gradient(circle, rgba(255,180,50,0.45) 0%, transparent 70%)',
            filter: 'blur(4px)',
            animationName: 'flickerFlame',
            animationDuration: '1.8s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDirection: 'alternate',
            animationDelay: `${delay}s`,
          }}
        />
        {/* Flame body */}
        <div
          className="relative candle-flame"
          style={{
            width: '10px',
            height: '22px',
            background: 'linear-gradient(to top, #ff9500, #ffdd00, #fffde7)',
            borderRadius: '50% 50% 30% 30%',
            boxShadow:
              '0 0 18px 8px rgba(255,180,50,0.55), 0 0 40px 15px rgba(255,140,0,0.25)',
            filter: 'blur(0.4px)',
            animationDelay: `${delay}s`,
          }}
        >
          {/* Inner light */}
          <div
            className="absolute rounded-full"
            style={{
              width: '4px',
              height: '10px',
              top: '4px',
              left: '3px',
              background: 'rgba(255,255,220,0.9)',
            }}
          />
        </div>
      </div>

      {/* Wax body */}
      <div
        className="relative mt-0.5 rounded-sm"
        style={{
          width: '16px',
          height: `${height}px`,
          background: 'linear-gradient(135deg, #f5ead6 30%, #e0c9a0 70%, #c9a87a 100%)',
        }}
      >
        {/* Highlight stripe */}
        <div
          className="absolute top-0 rounded-sm"
          style={{
            left: '3px',
            width: '3px',
            height: '100%',
            background: 'rgba(255,255,255,0.28)',
          }}
        />
        {/* Drip effect */}
        <div
          className="absolute top-0 right-1"
          style={{
            width: '3px',
            height: '12px',
            background: 'linear-gradient(to bottom, rgba(245,234,214,0.9), transparent)',
            borderRadius: '0 0 2px 2px',
          }}
        />
      </div>

      {/* Base */}
      <div
        className="rounded-sm mt-px"
        style={{ width: '22px', height: '8px', background: '#8b6347' }}
      />
    </div>
  );
}
