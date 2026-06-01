'use client';

import { motion } from 'framer-motion';
import ChapterLayout from '@/components/layout/ChapterLayout';
import AnimatedTimeline from '@/components/ui/AnimatedTimeline';
import { PORTFOLIO_DATA } from '@/lib/data';

export default function ChapterJourney() {
  return (
    <ChapterLayout id="ch-journey">
      <div className="page-reveal max-w-2xl mx-auto">
        <p style={{ fontFamily:'var(--font-cormorant)',fontStyle:'italic',fontSize:'13px',color:'var(--blue)',letterSpacing:'0.18em',textTransform:'uppercase',marginBottom:'6px',opacity:0.85 }}>Chapter Five</p>
        <h2 className="chapter-heading">The <em>Journey</em></h2>
        <div className="chapter-rule"/>
        <p className="chapter-intro-para" style={{ marginBottom:'4px' }}>
          Milestones along the path — each one a story worth remembering.
        </p>
        <AnimatedTimeline items={[...PORTFOLIO_DATA.timeline]} />
        <motion.blockquote style={{
          marginTop:'20px',padding:'14px 20px',
          borderLeft:'2px solid var(--border-blue)',
          background:'rgba(107,159,196,0.05)',borderRadius:'0 10px 10px 0',
        }} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9 }}>
          <p style={{ fontFamily:'var(--font-cormorant)',fontStyle:'italic',fontSize:'16px',color:'var(--muted)' }}>
            "Every expert was once a beginner. Every chapter began with a blank page."
          </p>
        </motion.blockquote>
      </div>
    </ChapterLayout>
  );
}
