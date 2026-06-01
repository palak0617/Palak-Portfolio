'use client';

import { motion } from 'framer-motion';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { PORTFOLIO_DATA } from '@/lib/data';

const pillClass: Record<string,string> = {
  blue:'sp-blue', sage:'sp-sage', lavender:'sp-lav', blush:'sp-blush',
};

export default function ChapterSkills() {
  return (
    <ChapterLayout id="ch-skills">
      <div className="page-reveal max-w-2xl mx-auto">
        <p style={{ fontFamily:'var(--font-cormorant)',fontStyle:'italic',fontSize:'13px',color:'var(--blue)',letterSpacing:'0.18em',textTransform:'uppercase',marginBottom:'6px',opacity:0.85 }}>Chapter Three</p>
        <h2 className="chapter-heading">My <em>Arsenal</em></h2>
        <div className="chapter-rule"/>
        <p className="chapter-intro-para" style={{ marginBottom:'20px' }}>
          Tools and languages earned through late nights and quiet mornings of learning.
        </p>
        <motion.div className="flex flex-wrap gap-2.5"
          initial="hidden" animate="visible"
          variants={{ hidden:{}, visible:{ transition:{ staggerChildren:0.055, delayChildren:0.2 } } }}
        >
          {PORTFOLIO_DATA.skills.map((s) => (
            <motion.span key={s.name}
              variants={{ hidden:{opacity:0,scale:0.7,rotate:-3}, visible:{opacity:1,scale:1,rotate:0} }}
              transition={{ type:'spring',stiffness:220,damping:18 }}
              whileHover={{ y:-3,scale:1.06 }}
              className={`skill-pill ${pillClass[s.color] || 'sp-blue'}`}
            >{s.name}</motion.span>
          ))}
        </motion.div>
        <motion.div style={{
          marginTop:'26px',padding:'18px 22px',
          background:'rgba(107,159,196,0.07)',borderRadius:'12px',
          border:'0.5px solid var(--border-blue)',
        }} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9 }}>
          <p style={{ fontFamily:'var(--font-dancing)',fontSize:'18px',color:'var(--sage)' }}>
            "Always learning. Always building. The journey never really ends.(Always a Curious child.)"
          </p>
          <p style={{ fontFamily:'var(--font-cormorant)',fontStyle:'italic',fontSize:'16px',color:'var(--blue)',marginTop:'7px',textAlign:'right',opacity:0.75 }}>
            — Palak
          </p>
        </motion.div>
      </div>
    </ChapterLayout>
  );
}
