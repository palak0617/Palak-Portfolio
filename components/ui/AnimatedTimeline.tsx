'use client';

import { useEffect, useRef, useState } from 'react';

interface TimelineItem { year: string; title: string; description: string; }

export default function AnimatedTimeline({ items }: { items: TimelineItem[] }) {
  const [vis, setVis] = useState<boolean[]>(Array(items.length).fill(false));
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    refs.current.forEach((el, i) => {
      if (!el) return;
      const o = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVis(p => { const n=[...p]; n[i]=true; return n; }), i * 90);
          o.disconnect();
        }
      }, { threshold: 0.2 });
      o.observe(el); obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  }, []);

  return (
    <div style={{ position:'relative', paddingLeft:'30px', marginTop:'14px' }}>
      {/* Vertical line */}
      <div style={{
        position:'absolute', left:'7px', top:'8px', bottom:'8px', width:'1px',
        background:'linear-gradient(to bottom, var(--border-blue), rgba(107,159,196,0.08))',
      }}/>
      {items.map((item, i) => (
        <div key={i} ref={el => { refs.current[i] = el; }} style={{
          position:'relative', marginBottom:'24px',
          opacity: vis[i] ? 1 : 0,
          transform: vis[i] ? 'none' : 'translateX(-12px)',
          transition: `opacity 0.55s ease ${i*0.08}s, transform 0.55s ease ${i*0.08}s`,
        }}>
          <div style={{
            position:'absolute', left:'-26px', top:'5px',
            width:'13px', height:'13px', borderRadius:'50%',
            background:'var(--bg-page)', border:'2px solid var(--blue)',
            boxShadow:'0 0 0 3px rgba(107,159,196,0.14)',
          }}/>
          <p className="tl-year">{item.year}</p>
          <h3 className="tl-title">{item.title}</h3>
          <p className="tl-desc">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
