'use client';

import { useEffect, useRef } from 'react';
import { rand, randInt } from '@/utils/helpers';

interface Props { ambient?: boolean; }

/* ─── 3-D looking butterfly SVG ─────────────────────────────
   Uses radial gradients for wing depth, vein highlights,
   a cylinder-gradient body, and a drop-shadow filter.
───────────────────────────────────────────────────────────── */
function makeBt(base: string, mid: string, dark: string, sz: number) {
  const W = sz, H = Math.round(sz * 0.68);
  const id = `bt${Math.random().toString(36).slice(2,7)}`;
  return `
<svg width="${W}" height="${H}" viewBox="0 0 52 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Upper left wing gradient -->
    <radialGradient id="${id}ul" cx="55%" cy="38%" r="58%">
      <stop offset="0%"   stop-color="rgba(255,255,255,0.55)"/>
      <stop offset="35%"  stop-color="${base}"/>
      <stop offset="100%" stop-color="${dark}"/>
    </radialGradient>
    <!-- Lower left wing gradient -->
    <radialGradient id="${id}ll" cx="45%" cy="30%" r="60%">
      <stop offset="0%"   stop-color="${mid}"/>
      <stop offset="70%"  stop-color="${dark}"/>
      <stop offset="100%" stop-color="${dark}" stop-opacity="0.7"/>
    </radialGradient>
    <!-- Upper right wing gradient -->
    <radialGradient id="${id}ur" cx="45%" cy="38%" r="58%">
      <stop offset="0%"   stop-color="rgba(255,255,255,0.55)"/>
      <stop offset="35%"  stop-color="${base}"/>
      <stop offset="100%" stop-color="${dark}"/>
    </radialGradient>
    <!-- Lower right wing gradient -->
    <radialGradient id="${id}lr" cx="55%" cy="30%" r="60%">
      <stop offset="0%"   stop-color="${mid}"/>
      <stop offset="70%"  stop-color="${dark}"/>
      <stop offset="100%" stop-color="${dark}" stop-opacity="0.7"/>
    </radialGradient>
    <!-- Body gradient -->
    <linearGradient id="${id}body" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="rgba(20,30,50,0.85)"/>
      <stop offset="30%"  stop-color="rgba(50,65,90,0.9)"/>
      <stop offset="55%"  stop-color="rgba(80,95,120,0.95)"/>
      <stop offset="100%" stop-color="rgba(20,30,50,0.85)"/>
    </linearGradient>
    <!-- Drop shadow -->
    <filter id="${id}sh" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0.8" dy="1.5" stdDeviation="1.2" flood-color="rgba(30,40,80,0.28)"/>
    </filter>
  </defs>

  <!-- ══ WINGS ══ -->
  <!-- Upper-left -->
  <path d="M26,18 C22,5 4,3 7,16 C10,26 20,22 26,18Z"
        fill="url(#${id}ul)" filter="url(#${id}sh)"/>
  <!-- Wing veins upper-left -->
  <path d="M26,18 C20,13 13,9 9,13" stroke="rgba(255,255,255,0.28)" stroke-width="0.55" fill="none"/>
  <path d="M26,18 C18,14 12,11 11,15" stroke="rgba(255,255,255,0.16)" stroke-width="0.4"  fill="none"/>
  <!-- Wing edge highlight upper-left -->
  <path d="M7,16 C6,12 8,8 12,6" stroke="rgba(255,255,255,0.22)" stroke-width="0.6" fill="none"/>

  <!-- Lower-left -->
  <path d="M26,18 C18,21 4,28 7,34 C11,39 22,30 26,18Z"
        fill="url(#${id}ll)" filter="url(#${id}sh)"/>
  <path d="M26,18 C19,22 13,26 10,30" stroke="rgba(255,255,255,0.18)" stroke-width="0.45" fill="none"/>

  <!-- Upper-right -->
  <path d="M26,18 C30,5 48,3 45,16 C42,26 32,22 26,18Z"
        fill="url(#${id}ur)" filter="url(#${id}sh)"/>
  <path d="M26,18 C32,13 39,9 43,13" stroke="rgba(255,255,255,0.28)" stroke-width="0.55" fill="none"/>
  <path d="M26,18 C34,14 40,11 41,15" stroke="rgba(255,255,255,0.16)" stroke-width="0.4"  fill="none"/>
  <path d="M45,16 C46,12 44,8 40,6"   stroke="rgba(255,255,255,0.22)" stroke-width="0.6"  fill="none"/>

  <!-- Lower-right -->
  <path d="M26,18 C34,21 48,28 45,34 C41,39 30,30 26,18Z"
        fill="url(#${id}lr)" filter="url(#${id}sh)"/>
  <path d="M26,18 C33,22 39,26 42,30" stroke="rgba(255,255,255,0.18)" stroke-width="0.45" fill="none"/>

  <!-- ══ BODY ══ -->
  <ellipse cx="26" cy="18" rx="2.2" ry="9.5" fill="url(#${id}body)"/>
  <!-- Body highlight -->
  <ellipse cx="25.2" cy="18" rx="0.7" ry="7" fill="rgba(255,255,255,0.2)"/>

  <!-- ══ ANTENNAE ══ -->
  <path d="M25,9 C22,4 19,1 17,0.5" stroke="rgba(40,50,70,0.7)" stroke-width="0.7" fill="none" stroke-linecap="round"/>
  <path d="M27,9 C30,4 33,1 35,0.5" stroke="rgba(40,50,70,0.7)" stroke-width="0.7" fill="none" stroke-linecap="round"/>
  <!-- Antenna tips -->
  <circle cx="17" cy="0.5" r="1.2" fill="rgba(40,50,70,0.65)"/>
  <circle cx="35" cy="0.5" r="1.2" fill="rgba(40,50,70,0.65)"/>
</svg>`.trim();
}

const SCHEMES = [
  { base:'#7db4cc', mid:'#5a90aa', dark:'#3a6880' },
  { base:'#9ab8dc', mid:'#7898c0', dark:'#4a6898' },
  { base:'#b4a8d8', mid:'#9088bc', dark:'#6060a0' },
  { base:'#88b8d0', mid:'#60909c', dark:'#406878' },
  { base:'#a0c0e0', mid:'#7898c0', dark:'#4878a0' },
];

const AMBIENT = [
  { l:'8%',  t:'20%', dur:9,  del:0,  x1:18,  y1:-12, x2:28,  y2:-22, sz:38 },
  { l:'78%', t:'24%', dur:11, del:-3, x1:-15, y1:-16, x2:-25, y2:-28, sz:32 },
  { l:'14%', t:'64%', dur:8,  del:-5, x1:20,  y1:-10, x2:30,  y2:-18, sz:28 },
  { l:'82%', t:'60%', dur:10, del:-2, x1:-12, y1:-13, x2:-20, y2:-24, sz:34 },
  { l:'50%', t:'10%', dur:12, del:-4, x1:10,  y1:-8,  x2:18,  y2:-14, sz:26 },
  { l:'5%',  t:'42%', dur:7,  del:-1, x1:14,  y1:-11, x2:22,  y2:-20, sz:30 },
];

interface BfState {
  el: HTMLDivElement; x:number; y:number; vx:number; vy:number;
  flapPhase:number; flapSpeed:number; age:number; lifespan:number;
}

export default function ButterflySystem({ ambient=false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Inject global butterfly CSS (once)
    if (!document.getElementById('bt-css')) {
      const s = document.createElement('style');
      s.id = 'bt-css';
      s.textContent = `
        @keyframes btFloat{0%{transform:translate(var(--tx0),var(--ty0)) rotate(var(--rot))}
          25%{transform:translate(var(--tx1),var(--ty1)) rotate(calc(var(--rot) + 5deg))}
          50%{transform:translate(var(--tx2),var(--ty2)) rotate(var(--rot))}
          75%{transform:translate(var(--tx3),var(--ty3)) rotate(calc(var(--rot) - 4deg))}
          100%{transform:translate(var(--tx0),var(--ty0)) rotate(var(--rot))}}
        @keyframes btWing{from{transform:scaleX(1)}to{transform:scaleX(0.22) scaleY(0.88)}}
      `;
      document.head.appendChild(s);
    }

    if (ambient) {
      AMBIENT.forEach((c,i) => {
        const sc = SCHEMES[i % SCHEMES.length];
        const el = document.createElement('div');
        el.style.cssText = `
          position:absolute;left:${c.l};top:${c.t};pointer-events:none;z-index:5;
          animation:btFloat ${c.dur}s ease-in-out ${c.del}s infinite;
          --tx0:0;--ty0:0;
          --tx1:${c.x1}px;--ty1:${c.y1}px;
          --tx2:${c.x2}px;--ty2:${c.y2}px;
          --tx3:${Math.round(c.x1*0.6)}px;--ty3:${Math.round(c.y1*0.6)}px;
          --rot:${(Math.random()-0.5)*8}deg;
        `;
        const wb = (0.42 + Math.random()*0.22).toFixed(2);
        el.innerHTML = `
          <div style="animation:btWing ${wb}s ease-in-out infinite alternate;transform-origin:right center;">
            ${makeBt(sc.base,sc.mid,sc.dark,c.sz)}
          </div>`;
        container.appendChild(el);
      });
      return;
    }

    // Dynamic JS butterflies for storybook
    const bfs: BfState[] = [];
    const COUNT = 8;
    let raf: number;
    let last = performance.now();

    function spawn(): BfState {
      const sc  = SCHEMES[randInt(0,SCHEMES.length-1)];
      const sz  = randInt(22,34);
      const el  = document.createElement('div');
      el.style.cssText = 'position:fixed;pointer-events:none;z-index:5;will-change:transform;';
      const wb  = (0.4+Math.random()*0.2).toFixed(2);
      el.innerHTML = `
        <div style="animation:btWing ${wb}s ease-in-out infinite alternate;transform-origin:right center;">
          ${makeBt(sc.base,sc.mid,sc.dark,sz)}
        </div>`;
      container!.appendChild(el);
      return {
        el, sz,
        x: rand(50, window.innerWidth-50),
        y: rand(50, window.innerHeight-80),
        vx: rand(0.3,0.9)*(Math.random()>0.5?1:-1),
        vy: rand(0.1,0.4)*(Math.random()>0.5?1:-1),
        flapPhase: rand(0,Math.PI*2), flapSpeed: rand(0.06,0.13),
        age: 0, lifespan: rand(9,20)*1000,
      } as any;
    }

    for(let i=0;i<COUNT;i++) setTimeout(()=>bfs.push(spawn()),i*350);

    function tick(now:number){
      const dt=Math.min(now-last,50); last=now;
      const W=window.innerWidth, H=window.innerHeight;
      for(let i=bfs.length-1;i>=0;i--){
        const b=bfs[i];
        b.age+=dt;
        b.vx+=rand(-0.015,0.015); b.vy+=rand(-0.012,0.012);
        b.vx=Math.max(-1.1,Math.min(1.1,b.vx)); b.vy=Math.max(-0.6,Math.min(0.6,b.vy));
        b.x+=b.vx; b.y+=b.vy;
        if(b.x<10){b.vx=Math.abs(b.vx);} if(b.x>W-10){b.vx=-Math.abs(b.vx);}
        if(b.y<10){b.vy=Math.abs(b.vy);} if(b.y>H-20){b.vy=-Math.abs(b.vy);}
        b.flapPhase+=b.flapSpeed;
        const flap=0.22+0.78*Math.abs(Math.sin(b.flapPhase));
        const dir=b.vx>=0?1:-1;
        const lr=b.age/b.lifespan;
        const alpha=lr<0.1?lr/0.1:lr>0.85?(1-lr)/0.15:1;
        b.el.style.transform=`translate(${b.x.toFixed(1)}px,${b.y.toFixed(1)}px) scaleX(${(dir*flap).toFixed(2)})`;
        b.el.style.opacity=Math.max(0,Math.min(1,alpha)).toFixed(2);
        if(b.age>=b.lifespan){
          b.el.remove(); bfs.splice(i,1);
          setTimeout(()=>{if(container)bfs.push(spawn());},rand(400,2200));
        }
      }
      raf=requestAnimationFrame(tick);
    }
    raf=requestAnimationFrame(tick);
    return ()=>{ cancelAnimationFrame(raf); bfs.forEach(b=>b.el.remove()); };
  },[ambient]);

  return (
    <div ref={containerRef} aria-hidden="true"
      style={ambient?{}:{position:'fixed',inset:0,pointerEvents:'none',overflow:'hidden',zIndex:5}}
    />
  );
}
