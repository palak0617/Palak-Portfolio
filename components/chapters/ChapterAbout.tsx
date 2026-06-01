'use client';

import { motion } from 'framer-motion';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { PORTFOLIO_DATA } from '@/lib/data';

export default function ChapterAbout() {
  return (
    <ChapterLayout id="ch-about">
      <div className="page-reveal max-w-2xl mx-auto">
        <p style={{ fontFamily:'var(--font-cormorant)',fontStyle:'italic',fontSize:'13px',color:'var(--blue)',letterSpacing:'0.18em',textTransform:'uppercase',marginBottom:'6px',opacity:0.85 }}>Chapter Two</p>
        <h2 className="chapter-heading">About <em>Me</em></h2>
        <div className="chapter-rule"/>
        <div>
          {PORTFOLIO_DATA.about.map((entry, i) => (
            <motion.div key={i} className="diary-card"
              initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }}
              transition={{ delay:0.1+i*0.12, duration:0.5 }}
            >
              <p className="diary-date">{entry.date}</p>
              <p className="diary-body">{entry.text}</p>
            </motion.div>
          ))}
        </div>
        <motion.div style={{ display:'flex',alignItems:'center',gap:'14px',marginTop:'24px' }}
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}>
          <div style={{ flex:1,height:'1px',background:'linear-gradient(to right,transparent,var(--border-blue))' }}/>
          <span style={{ fontFamily:'var(--font-dancing)',color:'var(--blue)',fontSize:'16px',opacity:0.6 }}>✦</span>
          <div style={{ flex:1,height:'1px',background:'linear-gradient(to left,transparent,var(--border-blue))' }}/>
        </motion.div>
      </div>
    </ChapterLayout>
  );
}
