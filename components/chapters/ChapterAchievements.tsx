'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ChapterLayout from '@/components/layout/ChapterLayout';

/* ─── Edit these to add your own photos and captions ─── */
const FRAMES = [
  { src: '/images/achievements/achievement-1.jpg', caption: 'Under 12 Chess Championship Win 🏆', year: '2018' },
  { src: '/images/achievements/achievement-2.jpg', caption: 'Third Place, National Netball Championship', year: '2019' },
  { src: '/images/achievements/achievement-3.jpg', caption: 'Student Organizer, National Science Day', year: '2024' },
  { src: '/images/achievements/achievement-4.jpg', caption: 'Third Place, National Level Robotics Competition', year: '2024' },
  { src: '/images/achievements/achievement-5.jpg', caption: 'Created and Launched a rocket at IIT Roorkee', year: '2024' },
  { src: '/images/achievements/achievement-6.jpg', caption: 'Appointed as a member of the organising team in Ecolution Club', year: '2025' },
  { src: '/images/achievements/achievement-7.jpg', caption: 'Celebrated World Plantation Day with Ecolution Club', year: '2025' },
  { src: '/images/achievements/achievement-8.jpg', caption: 'Took part in Business and AI Immersion Program at Middlesex University, Dubai', year: '2025' },
  { src: '/images/achievements/achievement-9.jpg', caption: 'IOT Group Project', year: '2025' },  
  { src: '/images/achievements/achievement-10.jpg', caption: 'Secured TOP 5 in National Level Coding + Mathematics Competition, Codemathon 2k24', year: '2024' },
];
/* ─────────────────────────────────────────────────────── */

function Sprockets({ count = 14 }: { count?: number }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-around', padding:'0 8px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          width: '10px', height: '14px', borderRadius: '2px',
          background: 'rgba(0,0,0,0.55)',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)',
          flex: '0 0 auto',
        }}/>
      ))}
    </div>
  );
}

function FilmFrame({ frame, index }: { frame: typeof FRAMES[0]; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      style={{
        flex: '0 0 auto',
        width: '160px',
        margin: '0 6px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Photo frame */}
      <div style={{
        width: '160px', height: '115px',
        background: imgError ? 'linear-gradient(145deg, #2a2218, #1a1610)' : '#1a1610',
        borderRadius: '2px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: 'inset 0 0 8px rgba(0,0,0,0.6)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}>
        {imgError ? (
          /* Placeholder when image not yet added */
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '8px', padding: '12px',
          }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              border: '1.5px dashed rgba(201,168,76,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px', color: 'rgba(201,168,76,0.4)',
            }}>+</div>
            <p style={{
              fontFamily: 'var(--font-dm)', fontSize: '10px',
              color: 'rgba(201,168,76,0.35)', textAlign: 'center',
              lineHeight: 1.4, letterSpacing: '0.05em',
            }}>Add photo<br/>to /public/images/<br/>achievements/</p>
          </div>
        ) : (
          <img
            src={frame.src}
            alt={frame.caption}
            onError={() => setImgError(true)}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              filter: 'sepia(0.35) contrast(1.05) brightness(0.92)',
              display: 'block',
            }}
          />
        )}
        {/* Film grain overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='80' height='80' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")`,
        }}/>
        {/* Light leak */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '30px', height: '100%',
          background: 'linear-gradient(to left, rgba(255,180,80,0.04), transparent)',
          pointerEvents: 'none',
        }}/>
        {/* Frame number */}
        <div style={{
          position: 'absolute', bottom: '4px', left: '5px',
          fontFamily: 'monospace', fontSize: '8px',
          color: 'rgba(255,220,100,0.45)', letterSpacing: '0.1em',
        }}>◉ {String(index+1).padStart(2,'0')}</div>
      </div>

      {/* Caption strip below frame */}
      <div style={{
        width: '160px',
        background: 'rgba(15,12,8,0.9)',
        padding: '6px 8px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}>
        <p style={{
          fontFamily: 'var(--font-dancing)', fontSize: '11px',
          color: 'rgba(232,201,110,0.85)', textAlign: 'center',
          lineHeight: 1.4, letterSpacing: '0.02em',
        }}>{frame.caption}</p>
        <p style={{
          fontFamily: 'monospace', fontSize: '9px',
          color: 'rgba(180,160,100,0.45)', textAlign: 'center',
          marginTop: '2px', letterSpacing: '0.12em',
        }}>{frame.year}</p>
      </div>
    </motion.div>
  );
}

export default function ChapterAchievements() {
  const stripRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const rafRef = useRef<number>(0);
  const speedRef = useRef(0.5); // px per frame

  // Auto-scroll the film strip
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    let pos = 0;

    function tick() {
      if (!paused && strip) {
        pos += speedRef.current;
        // Seamless loop when we've scrolled half (duplicated content)
        if (pos >= strip.scrollWidth / 2) pos = 0;
        strip.scrollLeft = pos;
        setScrollPos(pos);
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused]);

  // Duplicate frames for seamless loop
  const allFrames = [...FRAMES, ...FRAMES];

  return (
    <ChapterLayout id="ch-achievements">
      <div className="page-reveal">
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <p style={{
            fontFamily:'var(--font-cormorant)',fontStyle:'italic',fontSize:'13px',
            color:'var(--blue)',letterSpacing:'0.18em',textTransform:'uppercase',
            marginBottom:'6px',opacity:0.85,
          }}>Chapter Seven</p>
          <h2 className="chapter-heading">The <em>Reel</em></h2>
          <div className="chapter-rule"/>
          <p className="chapter-intro-para">
            Moments captured on film — achievements, milestones, and memories worth framing.
          </p>
        </div>

        {/* ── FILM REEL STRIP ──────────────────── */}
        <motion.div
          style={{
            borderRadius: '6px', overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.04)',
            position: 'relative',
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Film strip body */}
          <div style={{ background: 'linear-gradient(to bottom, #0f0c08, #1a1410, #0f0c08)' }}>
            {/* Top sprockets */}
            <div style={{ padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <Sprockets count={18} />
            </div>

            {/* Photo frames — scrolling */}
            <div
              ref={stripRef}
              style={{
                display: 'flex', overflow: 'hidden', padding: '10px 0',
                scrollbarWidth: 'none', msOverflowStyle: 'none',
              }}
            >
              {allFrames.map((f, i) => (
                <FilmFrame key={`${f.caption}-${i}`} frame={f} index={i % FRAMES.length} />
              ))}
            </div>

            {/* Bottom sprockets */}
            <div style={{ padding: '5px 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <Sprockets count={18} />
            </div>

            {/* Flickering film light — left edge */}
            <motion.div
              style={{
                position: 'absolute', top: 0, left: 0, bottom: 0, width: '12px',
                background: 'linear-gradient(to right, rgba(255,200,80,0.06), transparent)',
                pointerEvents: 'none',
              }}
              animate={{ opacity: [0.5, 1, 0.3, 0.9, 0.4, 1] }}
              transition={{ duration: 0.22, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
            />

            {/* "Now Showing" badge */}
            <div style={{
              position: 'absolute', top: '8px', right: '12px',
              fontFamily: 'monospace', fontSize: '9px',
              color: 'rgba(255,200,80,0.5)', letterSpacing: '0.18em',
              textTransform: 'uppercase', pointerEvents: 'none',
            }}>
              {paused ? '⏸ paused' : '▶ playing'}
            </div>
          </div>
        </motion.div>

        {/* Hover hint */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 0.55 }} transition={{ delay: 1 }}
          style={{
            textAlign: 'center', marginTop: '14px',
            fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
            fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.1em',
          }}
        >
          Hover to pause the reel · Add your photos to <code style={{ fontSize: '11px', opacity: 0.7 }}>/public/images/achievements/</code>
        </motion.p>

        {/* Achievement count badges */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:'10px', marginTop:'20px', justifyContent:'center' }}>
          {FRAMES.map((f, i) => (
            <motion.div key={i}
              initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
              transition={{ delay: 0.4 + i*0.06 }}
              style={{
                padding:'6px 14px', borderRadius:'20px',
                background: 'var(--bg-card)',
                border: '0.5px solid var(--border-soft)',
                fontFamily: 'var(--font-dm)', fontSize: '12px',
                color: 'var(--muted)', display:'flex', gap:'6px', alignItems:'center',
              }}
            >
              <span style={{ fontSize:'13px' }}>{f.caption.split(' ').slice(-1)[0]}</span>
              <span>{f.caption.split(' ').slice(0,-1).join(' ')}</span>
              <span style={{ color:'var(--blue)', fontFamily:'monospace', fontSize:'10px' }}>{f.year}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </ChapterLayout>
  );
}
