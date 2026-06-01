'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

interface VintageBookProps { onOpen: () => void; }

export default function VintageBook({ onOpen }: VintageBookProps) {
  const bookRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const spring = { stiffness: 100, damping: 18, mass: 0.9 };
  const rotX = useSpring(useTransform(my, [-140, 140], [10, -10]), spring);
  const rotY = useSpring(useTransform(mx, [-140, 140], [-15, 15]), spring);

  function onMove(e: React.MouseEvent) {
    const r = bookRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  }
  function onLeave() { mx.set(0); my.set(0); }

  /* Responsive: big on desktop, comfortably sized on mobile */
  const W = 'clamp(260px, 48vw, 390px)';
  const H = 'clamp(338px, 62vw, 507px)';
  const SPINE_W = 'clamp(28px, 7vw, 42px)';

  return (
    <div ref={bookRef} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ perspective: '1200px', display: 'inline-block', position: 'relative' }}
      className="select-none cursor-pointer"
    >
      {/* Ambient glow behind the book — gives it an "illuminated" feel */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ inset: '-30px', borderRadius: '50%', filter: 'blur(38px)', zIndex: 0 }}
        animate={{
          background: [
            'radial-gradient(ellipse, rgba(122,158,138,0.18) 0%, rgba(107,159,196,0.1) 45%, transparent 75%)',
            'radial-gradient(ellipse, rgba(107,159,196,0.22) 0%, rgba(180,168,208,0.1) 45%, transparent 75%)',
            'radial-gradient(ellipse, rgba(122,158,138,0.18) 0%, rgba(107,159,196,0.1) 45%, transparent 75%)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        onClick={onOpen}
        onKeyDown={e => e.key === 'Enter' && onOpen()}
        role="button" tabIndex={0} aria-label="Open Palak's portfolio"
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', position: 'relative', zIndex: 1, width: W, height: H }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* ══ SPINE (visible left face) ══ */}
        <div style={{
          position: 'absolute',
          left: `calc(-1 * ${SPINE_W})`, top: '6px', bottom: '6px', width: SPINE_W,
          transformStyle: 'preserve-3d',
          transform: 'rotateY(90deg)',
          transformOrigin: 'right center',
          background: 'linear-gradient(to right, #7a6848, #b89e72, #c8ae82, #a08858, #7a6848)',
          borderRadius: '5px 0 0 5px',
          boxShadow: '-8px 0 24px rgba(0,0,0,0.35)',
          overflow: 'hidden',
        }}>
          {/* Spine bands */}
          {[16, 24, 76, 84].map(pct => (
            <div key={pct} style={{ position:'absolute', top:`${pct}%`, left:0, right:0, height:'1px', background:'rgba(201,168,76,0.5)' }}/>
          ))}
          {/* Spine sheen */}
          <div style={{ position:'absolute', top:0, left:'28%', width:'18%', height:'100%', background:'linear-gradient(to right, transparent, rgba(255,255,255,0.22), transparent)' }}/>
          {/* Vertical title */}
          <div style={{
            position:'absolute', bottom:'22%', left:'50%',
            transform:'translateX(-50%) rotate(-90deg)',
            transformOrigin:'center',
            whiteSpace:'nowrap',
            fontFamily:'var(--font-cormorant)',
            fontStyle:'italic', fontWeight:300,
            fontSize:'clamp(9px,2vw,13px)',
            letterSpacing:'0.22em',
            color:'rgba(253,246,227,0.7)',
          }}>PALAK</div>
        </div>

        {/* ══ TOP PAGE EDGE ══ */}
        <div style={{
          position:'absolute', top:'-10px', left:'2px', right:'-12px', height:'10px',
          background:'linear-gradient(to bottom, #ede4ce, #f4eedc)',
          borderRadius:'3px 3px 0 0',
          boxShadow:'0 -4px 10px rgba(0,0,0,0.12)',
          opacity: 0.85,
        }}/>

        {/* ══ BACK COVER EDGE ══ */}
        <div style={{ position:'absolute', right:'-10px', top:'5px', bottom:'5px', width:'10px', background:'linear-gradient(to right, #d0c4a4, #c4b890)', borderRadius:'0 4px 4px 0' }}/>

        {/* ══ MAIN COVER ══ */}
        <div
          style={{
            width:'100%', height:'100%',
            borderRadius:'0 6px 6px 0',
            position:'relative', overflow:'hidden',
            background:'linear-gradient(155deg, #fdf8ef 0%, #f5ede0 25%, #ece0cc 55%, #e2d4be 80%, #d8c8ac 100%)',
            boxShadow: `
              10px 16px 40px rgba(0,0,0,0.22),
              5px 8px 16px rgba(0,0,0,0.14),
              inset -4px 0 10px rgba(0,0,0,0.07),
              inset 3px 3px 8px rgba(255,255,255,0.4),
              inset 0 0 0 1px rgba(255,255,255,0.15)
            `,
          }}
        >
          {/* Linen texture */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 4px,rgba(0,0,0,0.016) 4px,rgba(0,0,0,0.016) 5px),repeating-linear-gradient(90deg,transparent,transparent 9px,rgba(0,0,0,0.007) 9px,rgba(0,0,0,0.007) 10px)',
          }}/>
          {/* Cover sheen — top-left light source */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background:'linear-gradient(145deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 35%, transparent 60%)',
          }}/>
          {/* Bottom-right ambient shadow */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background:'linear-gradient(325deg, rgba(0,0,0,0.06) 0%, transparent 55%)',
          }}/>

          {/* ── Double border frame ── */}
          <div className="absolute pointer-events-none" style={{ inset:'12px', border:'1.5px solid rgba(122,158,138,0.42)', borderRadius:'1px' }}/>
          <div className="absolute pointer-events-none" style={{ inset:'18px', border:'0.5px solid rgba(122,158,138,0.22)', borderRadius:'1px' }}/>

          {/* ── Corner ornaments ── */}
          {[
            { t:'11px', l:'11px' },
            { t:'11px', r:'11px', sx:-1, sy: 1 },
            { b:'11px', l:'11px', sx: 1, sy:-1 },
            { b:'11px', r:'11px', sx:-1, sy:-1 },
          ].map(({ t,l,r,b, sx=1, sy=1 }, i) => (
            <div key={i} className="absolute pointer-events-none"
              style={{ top:t, left:l, right:r, bottom:b, width:'46px', height:'46px', transform:`scale(${sx},${sy})` }}>
              <svg viewBox="0 0 46 46" fill="none">
                <path d="M2,44 C2,18 18,2 44,2 C28,8 8,28 2,44Z" fill="#7a9e8a" opacity="0.52"/>
                <path d="M2,44 C8,30 16,18 30,8" stroke="#7a9e8a" strokeWidth="0.9" opacity="0.38" fill="none"/>
                <path d="M2,44 C12,28 22,16 38,6" stroke="#7a9e8a" strokeWidth="0.5" opacity="0.22" fill="none" strokeDasharray="2 3"/>
                <circle cx="6"  cy="40" r="1.5" fill="#7a9e8a" opacity="0.32"/>
                <circle cx="14" cy="28" r="1.0" fill="#7a9e8a" opacity="0.26"/>
              </svg>
            </div>
          ))}

          {/* ── Dusty blue ribbon bookmark ── */}
          <div style={{
            position:'absolute', top:0, right:'clamp(24px,9%,42px)',
            width:'clamp(14px,4%,20px)', height:'clamp(52px,13%,72px)', zIndex:3,
            background:'linear-gradient(180deg, #5a90b8 0%, #4a80a8 70%, #38688a 100%)',
            borderRadius:'0 0 5px 5px',
            boxShadow:'2px 4px 14px rgba(74,128,168,0.4), inset 1px 0 3px rgba(255,255,255,0.22)',
          }}>
            <div style={{ position:'absolute', bottom:'-10px', left:0, right:0, height:'11px', background:'#3a6080', clipPath:'polygon(0 0,50% 100%,100% 0)' }}/>
            <div style={{ position:'absolute', top:0, left:'30%', width:'20%', height:'100%', background:'rgba(255,255,255,0.28)', borderRadius:'1px' }}/>
          </div>

          {/* ── Botanical watermark ── */}
          <div className="absolute pointer-events-none" style={{ inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg viewBox="0 0 200 260" width="68%" height="68%" opacity="0.09">
              <path d="M100,245 C100,190 100,130 100,75" stroke="#7a9e8a" strokeWidth="2" fill="none" strokeLinecap="round"/>
              {[[155,105],[140,85],[160,128],[148,148]].map(([y,x],i)=>(
                <g key={i}>
                  <path d={`M100,${y} C${x},${y-16} ${x-15},${y-28} ${x-5},${y-36} C${x+5},${y-20} ${100+(x-100)*0.6},${y-8} 100,${y}Z`} fill="#7a9e8a"/>
                  <path d={`M100,${y} C${200-x},${y-16} ${215-x},${y-28} ${205-x},${y-36} C${195-x},${y-20} ${100+(100-x)*0.6+100},${y-8} 100,${y}Z`} fill="#7a9e8a"/>
                </g>
              ))}
              <circle cx="100" cy="75" r="12" fill="#c4857a" opacity="0.75"/>
              <circle cx="100" cy="75" r="6"  fill="#e8b4b0" opacity="0.9"/>
              <circle cx="100" cy="75" r="2.5" fill="rgba(255,255,255,0.6)"/>
            </svg>
          </div>

          {/* ── Title content ── */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10 gap-0">
            {/* Animated triple ornament */}
            <motion.div
              animate={{ opacity:[0.4,0.95,0.4] }}
              transition={{ duration:3.5, repeat:Infinity, ease:'easeInOut' }}
              style={{ letterSpacing:'7px', marginBottom:'14px', color:'rgba(122,158,138,0.7)', fontSize:'clamp(11px,2.5vw,16px)' }}
            >✦ ✦ ✦</motion.div>

            {/* Name */}
            <h1 style={{
              fontFamily:'var(--font-cormorant)', fontWeight:300,
              fontSize:'clamp(30px,8vw,48px)',
              color:'#241e14', letterSpacing:'0.12em', lineHeight:1.1,
              textShadow:'0 1px 4px rgba(0,0,0,0.1)',
            }}>Palak</h1>

            {/* Decorative rule with diamond */}
            <div style={{ display:'flex', alignItems:'center', gap:'10px', margin:'14px auto', width:'72%' }}>
              <div style={{ flex:1, height:'0.5px', background:'linear-gradient(to right,transparent,rgba(122,158,138,0.65))' }}/>
              <span style={{ color:'rgba(196,168,106,0.75)', fontSize:'12px', lineHeight:1 }}>✦</span>
              <div style={{ flex:1, height:'0.5px', background:'linear-gradient(to left,transparent,rgba(122,158,138,0.65))' }}/>
            </div>

            {/* Subtitle */}
            <p style={{
              fontFamily:'var(--font-cormorant)', fontStyle:'italic',
              fontSize:'clamp(10px,2.2vw,13.5px)',
              color:'rgba(107,159,196,0.85)', letterSpacing:'0.13em', lineHeight:1.85,
            }}>
              A glimpse through<br/>the chapters of my life
            </p>

            {/* Year at bottom */}
            <div style={{
              position:'absolute', bottom:'clamp(18px,5%,30px)',
              fontFamily:'var(--font-dm)', fontSize:'clamp(7px,1.8vw,9.5px)',
              letterSpacing:'0.24em', color:'rgba(42,40,32,0.36)', textTransform:'uppercase',
            }}>2024</div>
          </div>
        </div>

        {/* ══ PAGE EDGE STACK (right side) ══ */}
        <div className="absolute flex" style={{ right:'-16px', top:'8px', bottom:'8px' }}>
          {[
            { w:5.5, o:0.9,  bg:'#f4ede0,#ece0cc' },
            { w:4.5, o:0.70, bg:'#ede4d0,#e4d8bc' },
            { w:3.5, o:0.52, bg:'#e8dac8,#ddd0b4' },
            { w:3.0, o:0.36, bg:'#e2d0be,#d8c8a8' },
            { w:2.5, o:0.22, bg:'#dcc8b4,#d0bc9a' },
            { w:2.0, o:0.13, bg:'#d4bea8,#c8b090' },
          ].map((p,i) => (
            <div key={i} style={{
              width:`${p.w}px`, height:'100%',
              background:`linear-gradient(to bottom,${p.bg})`,
              opacity:p.o, borderRadius:'0 1.5px 1.5px 0',
            }}/>
          ))}
        </div>

        {/* ══ GROUND SHADOW ══ */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            bottom:'-44px', left:'6%', right:'-10px', height:'30px',
            background:'radial-gradient(ellipse 82% 55% at 44% 50%, rgba(0,0,0,0.25) 0%, transparent 80%)',
            filter:'blur(12px)',
          }}
          animate={{ opacity:[0.7,0.45,0.7], scaleX:[1,1.08,1] }}
          transition={{ duration:5.5, repeat:Infinity, ease:'easeInOut' }}
        />
      </motion.div>

      {/* Hint */}
      <motion.p
        className="absolute pointer-events-none"
        style={{
          bottom:'-62px', left:'50%', translateX:'-50%', whiteSpace:'nowrap',
          fontFamily:'var(--font-cormorant)', fontStyle:'italic',
          fontSize:'clamp(12px,2vw,14px)',
          color:'rgba(122,158,138,0.65)', letterSpacing:'0.1em',
        }}
        animate={{ opacity:[0.3,0.85,0.3] }}
        transition={{ duration:2.8, repeat:Infinity }}
      >
        click to open
        <motion.span className="inline-block ml-1.5" animate={{ y:[0,4,0] }} transition={{ duration:1.5, repeat:Infinity }}>↓</motion.span>
      </motion.p>
    </div>
  );
}
