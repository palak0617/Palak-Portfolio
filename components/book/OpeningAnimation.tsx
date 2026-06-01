'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OpeningAnimationProps { onComplete: () => void; }

const BT_SVG = (c1:string,c2:string,w=40) => {
  const h=Math.round(w*0.65);
  return `<svg width="${w}" height="${h}" viewBox="0 0 52 34" fill="none"><path d="M26,17 C22,4 4,4 8,16 C11,24 20,20 26,17Z" fill="${c1}" opacity="0.85"/><path d="M26,17 C18,20 4,26 8,32 C12,37 22,27 26,17Z" fill="${c2}" opacity="0.72"/><path d="M26,17 C30,4 48,4 44,16 C41,24 32,20 26,17Z" fill="${c1}" opacity="0.85"/><path d="M26,17 C34,20 48,26 44,32 C40,37 30,27 26,17Z" fill="${c2}" opacity="0.72"/><ellipse cx="26" cy="17" rx="1.8" ry="7" fill="#3a5068" opacity="0.65"/></svg>`;
};

const BURST = [
  {x:-230,y:-148},{x:240,y:-155},{x:-188,y:-58},{x:205,y:-68},
  {x:-100,y:-215},{x:112,y:-220},{x:-262,y:62},{x:270,y:52},
  {x:-145,y:165},{x:158,y:155},{x:20,y:-238},{x:-68,y:198},
  {x:-205,y:-120},{x:215,y:-115},{x:-42,y:225},{x:130,y:-175},
  {x:-180,y:100},{x:210,y:185},{x:-110,y:-190},{x:95,y:215},
];
const COLORS = [
  ['#7ba7c4','#a8cce0'],['#8eb8d4','#b4d0e8'],
  ['#b4a8d0','#ccc0e0'],['#9ac0d8','#c4ddef'],
];
const CONF = ['✦','✧','·','◦','⋆','○','✿','❋'];
const CONF_C = ['#6b9fc4','#b4a8d0','#7a9e8a','#e8b4b0','#c4a86a','#a8cce0'];

type Phase = 'flash' | 'hold' | 'open' | 'burst' | 'settle';

export default function OpeningAnimation({ onComplete }: OpeningAnimationProps) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>('flash');
  const [coverOpen, setCoverOpen]     = useState(false);
  const [interiorVis, setInteriorVis] = useState(false);
  const [lightFade, setLightFade]     = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ts: ReturnType<typeof setTimeout>[] = [];

    // ── Phase 1: instant white flash floods screen ───────────
    // (initial state is 'flash' — the full white overlay is already mounted)

    // ── Phase 2: brief hold at full white (200ms) ─────────────
    ts.push(setTimeout(() => setPhase('hold'), 50));

    // ── Phase 3: book appears as cover starts opening ─────────
    ts.push(setTimeout(() => { setPhase('open'); setCoverOpen(true); }, 260));

    // ── Phase 4: at ~half open — butterfly burst ──────────────
    ts.push(setTimeout(() => {
      setPhase('burst');
      BURST.forEach((dir,i) => {
        const col = COLORS[i%COLORS.length];
        const sz  = 20 + Math.random()*20;
        const div = document.createElement('div');
        div.innerHTML = BT_SVG(col[0],col[1],sz);
        const br = (Math.random()-0.5)*45;
        div.style.cssText = `
          position:absolute;top:50%;left:50%;pointer-events:none;z-index:80;
          animation:burstOut ${(1.3+Math.random()*0.5).toFixed(2)}s
            cubic-bezier(0.16,1,0.3,1) ${(i*0.04).toFixed(2)}s forwards;
          --bx:${dir.x}px;--by:${dir.y}px;--br:${br}deg;transform-origin:center;`;
        el.appendChild(div);
        ts.push(setTimeout(()=>div.remove(), 2800));
      });
      // Confetti
      for(let i=0;i<42;i++){
        const div=document.createElement('div');
        div.textContent=CONF[Math.floor(Math.random()*CONF.length)];
        const cx=(Math.random()-0.5)*340,cy=(Math.random()-0.5)*260;
        const cdx=(Math.random()-0.5)*110;
        const dur=(1.8+Math.random()*0.9).toFixed(2);
        const del=(Math.random()*0.4).toFixed(2);
        div.style.cssText=`position:absolute;top:50%;left:50%;pointer-events:none;z-index:78;
          color:${CONF_C[Math.floor(Math.random()*CONF_C.length)]};
          font-size:${Math.round(9+Math.random()*16)}px;
          animation:confettiFall ${dur}s ease-in ${del}s forwards;
          --cx:${cx}px;--cy:${cy}px;--cdx:${cdx}px;
          --cr:${Math.round(Math.random()*720-360)}deg;`;
        el.appendChild(div);
        ts.push(setTimeout(()=>div.remove(),3200));
      }
    }, 860));

    // ── Phase 5: light starts fading, interior appears ────────
    ts.push(setTimeout(()=>{ setLightFade(true); setInteriorVis(true); }, 1300));

    // ── Phase 6: settle & complete ────────────────────────────
    ts.push(setTimeout(()=>setPhase('settle'), 1800));
    ts.push(setTimeout(onComplete, 2900));

    return ()=>ts.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] overflow-hidden flex items-center justify-center"
      style={{ background:'linear-gradient(160deg,#e8f0ec 0%,#f2ece0 38%,#ede8e0 65%,#dce8f0 100%)' }}
    >
      {/* ══ FULL-SCREEN LIGHT FLOOD ══
           This is the key cinematic effect.
           Starts instantly white, then morphs to warm gold, then fades away
           as the book opens beneath it. ════════════════════════════════ */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[70]"
        initial={{ opacity: 1 }}
        animate={{ opacity: lightFade ? 0 : 1 }}
        transition={{ duration: lightFade ? 1.6 : 0, ease: [0.4, 0, 0.2, 1] }}
        style={{
          background: phase === 'flash' || phase === 'hold'
            ? '#fafaf8'
            : phase === 'open'
              ? 'radial-gradient(ellipse at 50% 50%, #fffef8 0%, #faf5e8 30%, #f0e8d4 60%, rgba(232,224,210,0.85) 100%)'
              : 'radial-gradient(ellipse at 50% 50%, rgba(255,252,240,0.9) 0%, rgba(240,232,210,0.5) 50%, transparent 75%)',
        }}
      />

      {/* ══ RADIAL RAYS from center (visible through the light) ══ */}
      <AnimatePresence>
        {(phase === 'open' || phase === 'burst') && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-[71] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: lightFade ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {Array.from({ length: 16 }).map((_,i) => (
              <motion.div key={i}
                className="absolute pointer-events-none"
                style={{
                  width:'2px', height:'55vmax',
                  background:'linear-gradient(to top, transparent, rgba(200,210,200,0.18), transparent)',
                  transformOrigin:'bottom center',
                  bottom:'50%', left:'calc(50% - 1px)',
                  rotate:`${i*22.5}deg`,
                  filter:'blur(3px)',
                }}
                initial={{ scaleY:0, opacity:0 }}
                animate={{ scaleY:[0,1,0.7], opacity:[0,0.6,0] }}
                transition={{ duration:1.8, delay:i*0.02, ease:[0.16,1,0.3,1] }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ WARM GLOW RINGS ══ */}
      <AnimatePresence>
        {phase === 'burst' && (
          <motion.div className="fixed inset-0 pointer-events-none z-[72] flex items-center justify-center">
            {[
              { delay:0,    size:'50vmax', c:'rgba(255,245,220,0.35)' },
              { delay:0.1,  size:'90vmax', c:'rgba(200,220,210,0.2)' },
              { delay:0.2,  size:'130vmax',c:'rgba(180,195,210,0.15)' },
            ].map((ring,i) => (
              <motion.div key={i}
                className="absolute rounded-full pointer-events-none"
                style={{ background:`radial-gradient(circle, ${ring.c} 0%, transparent 60%)` }}
                initial={{ width:0,height:0,opacity:0 }}
                animate={{ width:ring.size,height:ring.size,opacity:[0,0.85,0] }}
                transition={{ duration:1.8,delay:ring.delay,ease:[0.12,1,0.25,1] }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ THE BOOK (appears through the light) ══ */}
      <motion.div
        className="relative z-[75]"
        style={{ width:'min(360px,90vw)', height:'min(468px,115vw)', perspective:'1000px' }}
        initial={{ opacity:0, scale:0.95 }}
        animate={{
          opacity: phase==='flash' ? 0 : 1,
          scale: phase==='settle' ? 1.02 : 1,
          y: coverOpen ? -16 : 0,
        }}
        transition={{ duration:0.5, ease:[0.34,1.2,0.64,1] }}
      >
        {/* Ground shadow */}
        <motion.div className="absolute pointer-events-none"
          style={{
            bottom:'-24px', left:'8%', right:0,
            height:'24px',
            background:'radial-gradient(ellipse 80% 55% at 45% 50%, rgba(0,0,0,0.2) 0%, transparent 80%)',
            filter:'blur(10px)',
          }}
          animate={{ opacity: coverOpen ? 0.4 : 0.8 }}
          transition={{ duration:1.5 }}
        />

        {/* Interior — visible after light fades */}
        <div className="absolute inset-0 overflow-hidden" style={{
          background:'linear-gradient(to right, #f5f0e8, #faf7f2)',
          borderRadius:'0 6px 6px 0',
          boxShadow:'4px 6px 18px rgba(0,0,0,0.08)',
        }}>
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage:'repeating-linear-gradient(transparent,transparent 28px,rgba(122,158,138,0.1) 29px)',
            backgroundPosition:'0 52px',
          }}/>
          <AnimatePresence>
            {interiorVis && (
              <motion.div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:1.1, ease:'easeOut' }}
              >
                <motion.div initial={{scale:0.5,opacity:0}} animate={{scale:1,opacity:1}}
                  transition={{delay:0.2,duration:0.6,ease:[0.34,1.56,0.64,1]}}
                  style={{ width:48,height:48,borderRadius:'50%',background:'linear-gradient(135deg,#a8cce0,#b4a8d0)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-cormorant)',fontSize:'20px',color:'white',border:'1.5px solid rgba(107,159,196,0.4)' }}
                >P</motion.div>
                <motion.p initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{delay:0.35,duration:0.6}}
                  style={{ fontFamily:'var(--font-cormorant)',fontStyle:'italic',fontSize:'14px',color:'rgba(42,40,32,0.5)',letterSpacing:'0.12em' }}
                >Hello, I'm Palak ✦</motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cover — 3D rotation open */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{
            background:'linear-gradient(145deg,#faf5ec,#f4ebda,#ede0c8)',
            borderRadius:'0 6px 6px 0',
            originX:0, transformStyle:'preserve-3d', backfaceVisibility:'hidden',
            backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 4px,rgba(0,0,0,0.018) 4px,rgba(0,0,0,0.018) 5px)',
          }}
          animate={{ rotateY: coverOpen ? -178 : 0 }}
          transition={{ duration:1.65, delay:0, ease:[0.16,1,0.3,1] }}
        >
          {/* Spine shadow as cover lifts */}
          <motion.div className="absolute left-0 inset-y-0 pointer-events-none"
            style={{ width:'20px', background:'linear-gradient(to right,rgba(0,0,0,0.08),transparent)' }}
            animate={{ opacity: coverOpen ? 0 : 1 }} transition={{ duration:0.6 }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10">
            <div style={{ fontFamily:'var(--font-cormorant)',fontSize:'clamp(24px,6vw,38px)',fontWeight:300,color:'#2c2416',letterSpacing:'0.1em' }}>Palak</div>
            <div style={{ width:'50px',height:'0.5px',background:'rgba(122,158,138,0.5)',margin:'12px auto' }}/>
            <div style={{ fontFamily:'var(--font-cormorant)',fontStyle:'italic',fontSize:'11px',color:'rgba(107,159,196,0.7)',letterSpacing:'0.1em' }}>Portfolio</div>
          </div>
          {/* Cover gloss */}
          <div className="absolute inset-0 pointer-events-none" style={{ background:'linear-gradient(135deg,rgba(255,255,255,0.12) 0%,transparent 50%)' }}/>
        </motion.div>
      </motion.div>

      {/* ══ "opening…" ambient text ══ */}
      <motion.p
        className="absolute pointer-events-none z-[82]"
        style={{
          bottom:'26%',
          fontFamily:'var(--font-cormorant)',fontStyle:'italic',
          fontSize:'clamp(14px,2.5vw,17px)',
          color:'rgba(122,158,138,0.75)',letterSpacing:'0.28em',
        }}
        initial={{ opacity:0 }}
        animate={{ opacity: phase==='open'||phase==='burst' ? [0,0.9,0] : 0 }}
        transition={{ duration:2.0, delay:0.4 }}
      >
        opening…
      </motion.p>
    </div>
  );
}
