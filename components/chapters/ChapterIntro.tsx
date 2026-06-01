'use client';

import { motion } from 'framer-motion';
import ChapterLayout from '@/components/layout/ChapterLayout';
import DiaryWritingAnimation from '@/components/effects/DiaryWritingAnimation';
import { PORTFOLIO_DATA } from '@/lib/data';

export default function ChapterIntro() {
  return (
    <ChapterLayout id="ch-intro">
      <div className="min-h-full flex flex-col items-center justify-center text-center py-12 page-reveal">

        {/* Avatar */}
        <motion.div className="relative mb-7"
          initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.34,1.56,0.64,1] }}
        >
          <motion.div className="absolute rounded-full pointer-events-none"
            style={{ inset: '-10px', border: '1px solid rgba(107,159,196,0.22)' }}
            animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div className="absolute rounded-full pointer-events-none"
            style={{ inset: '-18px', border: '0.5px dashed rgba(122,158,138,0.18)' }}
            animate={{ rotate: -360 }} transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          />
          <div className="intro-avatar w-24 h-24 rounded-full flex items-center justify-center relative z-10"
            style={{ fontSize: '40px', color: 'white' }}
          >P</div>
        </motion.div>

        {/* Chapter label */}
        <motion.p className="mb-4" style={{
          fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
          fontSize: '13px', color: 'var(--sage)', letterSpacing: '0.22em', textTransform: 'uppercase',
        }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          — Preface —
        </motion.p>

        {/* Typewriter heading */}
        <div className="mb-3">
          <DiaryWritingAnimation
            text={`Hello, I'm Palak`}
            speed={65} delay={600} as="h1"
            style={{
              fontFamily: 'var(--font-cormorant)', fontWeight: 300,
              fontSize: 'clamp(34px, 6vw, 54px)',
              color: 'var(--ink)', letterSpacing: '0.02em',
            }}
          />
        </div>

        {/* Tagline */}
        <motion.p style={{ fontFamily: 'var(--font-dancing)', fontSize: '18px', color: 'var(--sage)' }}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.7 }}
        >{PORTFOLIO_DATA.tagline}</motion.p>

        {/* Divider */}
        <motion.div style={{
          width: '110px', height: '1px', margin: '20px auto',
          background: 'linear-gradient(to right, transparent, var(--blue), transparent)',
        }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 2.5, duration: 0.8 }} />

        {/* Intro */}
        <motion.p className="chapter-intro-para" style={{ maxWidth: '400px' }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.7 }}
        >{PORTFOLIO_DATA.intro}</motion.p>

        <motion.p style={{
          marginTop: '30px', fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
          fontSize: '12px', letterSpacing: '0.2em', color: 'var(--muted)',
          textTransform: 'uppercase', opacity: 0.7,
        }} animate={{ opacity: [0.35, 0.8, 0.35] }} transition={{ duration: 2.5, repeat: Infinity, delay: 3.5 }}
          initial={{ opacity: 0 }}>
          Use tabs or arrows to turn pages
        </motion.p>
      </div>
    </ChapterLayout>
  );
}
