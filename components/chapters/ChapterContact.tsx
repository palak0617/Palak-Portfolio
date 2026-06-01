'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ChapterLayout from '@/components/layout/ChapterLayout';
import FeedbackModal from '@/components/ui/FeedbackModal';
import { PORTFOLIO_DATA } from '@/lib/data';

export default function ChapterContact() {
  const [fbOpen, setFbOpen] = useState(false);
  return (
    <ChapterLayout id="ch-contact">
      <div className="page-reveal max-w-xl mx-auto">
        <p style={{ fontFamily:'var(--font-cormorant)',fontStyle:'italic',fontSize:'13px',color:'var(--blue)',letterSpacing:'0.18em',textTransform:'uppercase',marginBottom:'6px',opacity:0.85 }}>Chapter Six</p>
        <h2 className="chapter-heading">A Letter <em>For You</em></h2>
        <div className="chapter-rule"/>
        <motion.div className="letter-paper" style={{ padding:'36px 32px' }}
          initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2 }}
        >
          <div className="absolute pointer-events-none" style={{ inset:'68px 32px 32px' }} aria-hidden="true">
            {Array.from({length:8}).map((_,i)=>(
              <div key={i} style={{ height:'1px',background:'var(--border-soft)',marginBottom:'27px' }}/>
            ))}
          </div>
          <p className="letter-greeting">Dear Reader,</p>
          <p className="letter-body" style={{ marginBottom:'24px' }}>
            Thank you for walking through<br/>the chapters of my life.<br/><br/>
            If something here moved you —<br/>I would love nothing more than<br/>to begin a conversation.<br/><br/>
            With warm regards,<br/>Palak
          </p>
          <div style={{ display:'flex',alignItems:'center',gap:'16px',position:'relative',zIndex:1 }}>
            <motion.button onClick={()=>setFbOpen(true)}
              whileHover={{ scale:1.06 }} whileTap={{ scale:0.97 }}
              style={{
                width:'52px',height:'52px',borderRadius:'50%',
                background:'linear-gradient(135deg,var(--blue-light),var(--blue))',
                border:'none',color:'white',fontSize:'20px',cursor:'pointer',
                boxShadow:'0 4px 12px rgba(107,159,196,0.35)',
              }}
              aria-label="Leave a private note"
            >✉</motion.button>
            <p style={{ fontFamily:'var(--font-cormorant)',fontStyle:'italic',fontSize:'13px',color:'var(--muted)' }}>
              Click to leave a private note
            </p>
          </div>
          <div style={{ display:'flex',gap:'10px',marginTop:'22px',position:'relative',zIndex:1 }}>
            {[
              {l:'GitHub',   h:PORTFOLIO_DATA.github},
              {l:'LinkedIn', h:PORTFOLIO_DATA.linkedin},
              {l:'Email',    h:`mailto:${PORTFOLIO_DATA.email}`},
            ].map(s=>(
              <motion.a key={s.l} href={s.h}
                target={s.h.startsWith('mailto')?undefined:'_blank'}
                rel="noopener noreferrer"
                whileHover={{ y:-2 }}
                style={{
                  padding:'7px 18px',borderRadius:'20px',
                  border:'0.5px solid var(--border-soft)',
                  background:'var(--bg-card)',
                  fontSize:'12px',letterSpacing:'0.07em',
                  color:'var(--btn-c)',textDecoration:'none',
                  fontFamily:'var(--font-dm)',fontWeight:500,
                  transition:'background 0.2s',
                }}
              >{s.l}</motion.a>
            ))}
          </div>
        </motion.div>
        <motion.p style={{
          textAlign:'center',marginTop:'22px',
          fontFamily:'var(--font-cormorant)',fontStyle:'italic',
          fontSize:'13px',color:'var(--muted)',letterSpacing:'0.1em',opacity:0.7,
        }} initial={{ opacity:0 }} animate={{ opacity:0.7 }} transition={{ delay:0.7 }}>
          Made with love & intention · Palak Singla
        </motion.p>
      </div>
      <FeedbackModal isOpen={fbOpen} onClose={()=>setFbOpen(false)} />
    </ChapterLayout>
  );
}
