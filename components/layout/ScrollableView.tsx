'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CHAPTERS, type ChapterId } from '@/lib/data';

import ChapterIntro        from '@/components/chapters/ChapterIntro';
import ChapterAbout        from '@/components/chapters/ChapterAbout';
import ChapterSkills       from '@/components/chapters/ChapterSkills';
import ChapterProjects     from '@/components/chapters/ChapterProjects';
import ChapterJourney      from '@/components/chapters/ChapterJourney';
import ChapterAchievements from '@/components/chapters/ChapterAchievements';
import ChapterContact      from '@/components/chapters/ChapterContact';

import ViewToggle       from '@/components/ui/ViewToggle';
import BulbToggle       from '@/components/ui/BulbToggle';
import MusicToggle      from '@/components/ui/MusicToggle';
import FeedbackModal    from '@/components/ui/FeedbackModal';
import LEDLights        from '@/components/effects/LEDLights';
import FireflySystem    from '@/components/effects/FireflySystem';
import MagicalSparkles  from '@/components/effects/MagicalSparkles';
import CursorTrail      from '@/components/effects/CursorTrail';

/* ── No bookmark import in scroll mode ── */

const SECTIONS: { id: ChapterId; Component: React.ComponentType }[] = [
  { id:'intro',        Component:ChapterIntro },
  { id:'about',        Component:ChapterAbout },
  { id:'skills',       Component:ChapterSkills },
  { id:'projects',     Component:ChapterProjects },
  { id:'journey',      Component:ChapterJourney },
  { id:'achievements', Component:ChapterAchievements },
  { id:'contact',      Component:ChapterContact },
];

interface Props { onSwitchToBook: () => void; }

export default function ScrollableView({ onSwitchToBook }: Props) {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  function scrollTo(id: ChapterId) {
    document.getElementById(`scroll-${id}`)?.scrollIntoView({ behavior:'smooth', block:'start' });
  }

  return (
    <div className="storybook-root relative" style={{ minHeight:'100vh' }}>
      <FireflySystem />
      <MagicalSparkles />
      <CursorTrail />
      <LEDLights />

      {/* Sticky nav — no bookmark button in scroll mode */}
      <header className="nav-header sticky top-0 z-30 flex items-center justify-between px-4 py-3 gap-2">

  <span className="nav-wordmark hidden sm:block flex-shrink-0">
    Palak's Portfolio
  </span>

  {/* Scrollable tabs on mobile */}
  <nav className="flex gap-0.5 overflow-x-auto no-scrollbar" style={{ flex: 1 }}>
    {CHAPTERS.map(ch => (
      <button
        key={ch.id}
        onClick={() => scrollTo(ch.id)}
        className="nav-tab flex-shrink-0"
      >
        {ch.label}
      </button>
    ))}
  </nav>

  <div className="flex items-center gap-1.5 flex-shrink-0">
    <motion.button
      className="nav-icon-btn hidden sm:flex"
      onClick={() => setFeedbackOpen(true)}
      whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}
      style={{ color: 'var(--blue)', borderColor: 'var(--border-blue)' }}
    >✉</motion.button>

    <div className="hidden sm:block">
      <MusicToggle />
    </div>

    <BulbToggle />
    <ViewToggle mode="scroll" onToggle={onSwitchToBook} />
  </div>
</header>

      <main>
        {SECTIONS.map(({ id, Component }, i) => (
          <motion.section key={id} id={`scroll-${id}`}
            className="chapter-page-bg relative"
            style={{ minHeight:'100vh', borderBottom:'0.5px solid var(--border-soft)' }}
            initial={{ opacity:0, y:20 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, margin:'-60px' }}
            transition={{ duration:0.55, delay:0.05 }}
          >
            {/* ── No BookmarkButton in scroll mode ── */}
            <Component />

            {i < SECTIONS.length - 1 && (
              <div style={{ display:'flex',alignItems:'center',justifyContent:'center',padding:'20px 0 24px',gap:'14px' }}>
                <div style={{ width:'60px',height:'0.5px',background:'linear-gradient(to right,transparent,var(--lavender))' }}/>
                <span style={{ color:'var(--lavender)',fontSize:'14px',opacity:0.5 }}>✦</span>
                <div style={{ width:'60px',height:'0.5px',background:'linear-gradient(to left,transparent,var(--lavender))' }}/>
              </div>
            )}
          </motion.section>
        ))}
      </main>

      {/* Back to top */}
      <motion.button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
        whileHover={{ y:-3, scale:1.08 }} whileTap={{ scale:0.94 }}
        style={{ position:'fixed',bottom:'28px',right:'80px',zIndex:50,width:'40px',height:'40px',borderRadius:'50%',background:'var(--bg-card)',border:'0.5px solid var(--border-blue)',color:'var(--lavender)',fontSize:'18px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 14px rgba(160,140,220,0.2)',backdropFilter:'blur(8px)' }}
        aria-label="Back to top">↑</motion.button>

      <FeedbackModal isOpen={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  );
}
