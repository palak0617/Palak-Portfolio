'use client';

import { motion } from 'framer-motion';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { PORTFOLIO_DATA } from '@/lib/data';

export default function ChapterProjects() {
  return (
    <ChapterLayout id="ch-projects">
      <div className="page-reveal max-w-2xl mx-auto">
        <p style={{ fontFamily:'var(--font-cormorant)',fontStyle:'italic',fontSize:'13px',color:'var(--blue)',letterSpacing:'0.18em',textTransform:'uppercase',marginBottom:'6px',opacity:0.85 }}>Chapter Four</p>
        <h2 className="chapter-heading">Things I've <em>Built</em></h2>
        <div className="chapter-rule"/>
        <p className="chapter-intro-para" style={{ marginBottom:'18px' }}>
          Pages from my project journal — each one a world built from nothing.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PORTFOLIO_DATA.projects.map((p, i) => (
            <motion.div key={p.title} className="project-card"
              initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }}
              transition={{ delay:0.1+i*0.1, duration:0.5 }}
            >
              <div style={{ fontSize:'26px',marginBottom:'8px' }}>{p.icon}</div>
              <h3 className="project-name">{p.title}</h3>
              <p className="project-desc" style={{ marginBottom:'12px' }}>{p.description}</p>
              <div style={{ display:'flex',flexWrap:'wrap',gap:'5px' }}>
                {p.tags.map(t=>(
                  <span key={t} className="project-tag">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </ChapterLayout>
  );
}
