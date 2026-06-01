'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CHAPTERS, type ChapterId } from '@/lib/data';
import { useSound } from '@/components/ui/SoundProvider';
import { EASING } from '@/utils/helpers';

import ButterflySystem    from '@/components/effects/ButterflySystem';
import FireflySystem      from '@/components/effects/FireflySystem';
import FloatingDust       from '@/components/effects/FloatingDust';
import CursorTrail        from '@/components/effects/CursorTrail';
import LEDLights          from '@/components/effects/LEDLights';
import MagicalSparkles    from '@/components/effects/MagicalSparkles';

import FeedbackModal      from '@/components/ui/FeedbackModal';
import BookmarkPanel      from '@/components/ui/BookmarkPanel';
import BookmarkButton     from '@/components/ui/BookmarkButton';
import BulbToggle         from '@/components/ui/BulbToggle';
import MusicToggle        from '@/components/ui/MusicToggle';
import ViewToggle         from '@/components/ui/ViewToggle';
import { useBookmarks }   from '@/components/ui/BookmarkContext';

import ChapterIntro        from '@/components/chapters/ChapterIntro';
import ChapterAbout        from '@/components/chapters/ChapterAbout';
import ChapterSkills       from '@/components/chapters/ChapterSkills';
import ChapterProjects     from '@/components/chapters/ChapterProjects';
import ChapterJourney      from '@/components/chapters/ChapterJourney';
import ChapterAchievements from '@/components/chapters/ChapterAchievements';
import ChapterContact      from '@/components/chapters/ChapterContact';

const ORDER: ChapterId[] = ['intro','about','skills','projects','journey','achievements','contact'];
const COMPONENTS: Record<ChapterId, React.ComponentType> = {
  intro:ChapterIntro, about:ChapterAbout, skills:ChapterSkills,
  projects:ChapterProjects, journey:ChapterJourney,
  achievements:ChapterAchievements, contact:ChapterContact,
};
const variants = {
  enter: (d:number) => ({ opacity:0, x:d>0?'3%':'-3%', scale:0.982 }),
  center: { opacity:1, x:0, scale:1 },
  exit:  (d:number) => ({ opacity:0, x:d<0?'3%':'-3%', scale:0.982 }),
};

interface Props { onSwitchToScroll: () => void; }

export default function StorybookLayout({ onSwitchToScroll }: Props) {
  const [cur, setCur]                   = useState<ChapterId>('intro');
  const [dir, setDir]                   = useState(1);
  const [isTurning, setIsTurning]       = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [bmPanelOpen, setBmPanel]       = useState(false);
  const curRef    = useRef(cur);
  const turningRef = useRef(isTurning);
  curRef.current   = cur;
  turningRef.current = isTurning;

  const { playPageTurn } = useSound();
  const { bookmarks, isBookmarked } = useBookmarks();

  const nav = useCallback((id:ChapterId, d?:number) => {
    if (id===curRef.current||turningRef.current) return;
    const ci=ORDER.indexOf(curRef.current), ti=ORDER.indexOf(id);
    const rd=d??(ti>ci?1:-1);
    setDir(rd); setIsTurning(true); turningRef.current=true; playPageTurn();
    setTimeout(()=>{ setCur(id); curRef.current=id; setIsTurning(false); turningRef.current=false; },200);
  },[playPageTurn]);

  const goNext=useCallback(()=>{ const i=ORDER.indexOf(curRef.current); if(i<ORDER.length-1)nav(ORDER[i+1],1); },[nav]);
  const goPrev=useCallback(()=>{ const i=ORDER.indexOf(curRef.current); if(i>0)nav(ORDER[i-1],-1); },[nav]);

  useEffect(()=>{
    function onKey(e:KeyboardEvent){
      const t=(e.target as HTMLElement).tagName.toLowerCase();
      if(t==='input'||t==='textarea')return;
      if(e.key==='ArrowRight'||e.key==='ArrowDown'){e.preventDefault();goNext();}
      if(e.key==='ArrowLeft' ||e.key==='ArrowUp')  {e.preventDefault();goPrev();}
    }
    window.addEventListener('keydown',onKey);
    return()=>window.removeEventListener('keydown',onKey);
  },[goNext,goPrev]);

  const touchX=useRef(0);
  const onTouchStart=(e:React.TouchEvent)=>{touchX.current=e.touches[0].clientX;};
  const onTouchEnd=(e:React.TouchEvent)=>{
    const dx=e.changedTouches[0].clientX-touchX.current;
    if(Math.abs(dx)>55){dx<0?goNext():goPrev();}
  };

  const idx=ORDER.indexOf(cur); const Page=COMPONENTS[cur];

  return (
    <div className="storybook-root relative w-full h-screen overflow-hidden"
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      
      {/* Ambient effects */}
      <MagicalSparkles />
      <ButterflySystem />
      <FireflySystem />
      <FloatingDust count={18} className="fixed inset-0 w-full h-full" style={{ zIndex:2 }} />
      <CursorTrail />
      <LEDLights />

      {/* ── NAV ── */}
      <header className="nav-header relative z-30 flex items-center justify-between px-4 pt-3 pb-2 gap-2">
  
  {/* Wordmark — hidden on very small screens */}
  <span className="nav-wordmark hidden sm:block flex-shrink-0">
    Palak's Portfolio
  </span>

  {/* Chapter tabs — scrollable on mobile */}
  <nav
    className="flex gap-0.5 overflow-x-auto no-scrollbar"
    style={{ flex: 1 }}
    aria-label="Chapter navigation"
  >
    {CHAPTERS.map(ch => {
      const isActive = cur === ch.id;
      return (
        <button
          key={ch.id}
          onClick={() => nav(ch.id)}
          aria-current={isActive ? 'page' : undefined}
          className={`nav-tab flex-shrink-0${isActive ? ' active' : ''}`}
          style={{ position: 'relative' }}
        >
          {ch.label}
          {isBookmarked(ch.id) && (
            <span style={{
              position: 'absolute', top: '3px', right: '5px',
              width: '5px', height: '5px', borderRadius: '50%',
              background: 'var(--lavender)',
            }}/>
          )}
        </button>
      );
    })}
  </nav>

  {/* Controls — only show essential ones on mobile */}
  <div className="flex items-center gap-1.5 flex-shrink-0">
    {/* Bookmarks — hidden on mobile */}
    <motion.button
      className="nav-icon-btn hidden sm:flex"
      onClick={() => setBmPanel(true)}
      whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
      style={{
        background: bookmarks.length > 0 ? 'rgba(176,160,216,0.16)' : 'var(--bg-card)',
        borderColor: bookmarks.length > 0 ? 'rgba(176,160,216,0.45)' : 'var(--border-soft)',
        position: 'relative',
      }}
    >
      🔖
      {bookmarks.length > 0 && (
        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
          style={{ position:'absolute',top:'-5px',right:'-5px',width:'16px',height:'16px',borderRadius:'50%',background:'var(--lavender)',color:'white',fontSize:'9px',fontFamily:'var(--font-dm)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:500 }}>
          {bookmarks.length}
        </motion.span>
      )}
    </motion.button>

    {/* Feedback — hidden on mobile */}
    <motion.button
      className="nav-icon-btn hidden sm:flex"
      onClick={() => setFeedbackOpen(true)}
      whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}
      style={{ color: 'var(--blue)', borderColor: 'var(--border-blue)' }}
    >✉</motion.button>

    {/* Music — hidden on mobile */}
    <div className="hidden sm:block">
      <MusicToggle />
    </div>

    {/* Bulb toggle — always visible */}
    <BulbToggle />

    {/* View toggle — always visible */}
    <ViewToggle mode="book" onToggle={onSwitchToScroll} />
  </div>
</header>
      {/* ── CHAPTER ── */}
      <main className="relative z-20" style={{height:'calc(100vh - 60px - 62px)',overflow:'hidden'}}>
        <AnimatePresence custom={dir} mode="wait">
          <motion.div key={cur} custom={dir}
            variants={variants} initial="enter" animate="center" exit="exit"
            transition={{duration:0.46,ease:EASING.pageTurn}}
            className="chapter-page-bg absolute inset-0 overflow-y-auto">
            {/* Bookmark button — book mode only */}
            <div style={{position:'sticky',top:'12px',display:'flex',justifyContent:'flex-end',paddingRight:'18px',zIndex:40,pointerEvents:'none'}}>
              <div style={{pointerEvents:'auto'}}><BookmarkButton chapterId={cur} /></div>
            </div>
            <Page />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── BOTTOM NAV ── */}
      <footer className="nav-footer absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-3">
        <motion.button onClick={goPrev} disabled={idx===0} whileHover={{x:-3}} whileTap={{scale:0.96}}
          className="nav-page-btn"
          style={{opacity:idx===0?0:1,pointerEvents:idx===0?'none':'auto',transition:'opacity 0.3s'}}>
          ← {idx>0?CHAPTERS[idx-1].label:''}
        </motion.button>
        <div className="flex items-center gap-2">
          {ORDER.map((id,i)=>{
            const bm=isBookmarked(id);
            return(
              <motion.button key={id} onClick={()=>nav(id)} aria-label={`Go to ${CHAPTERS[i].label}`}
                style={{height:'8px',borderRadius:'4px',border:'none',cursor:'pointer',position:'relative'}}
                animate={{width:id===cur?22:8,background:id===cur?'var(--lavender)':bm?'rgba(176,160,216,0.5)':'rgba(176,160,216,0.28)'}}
                whileHover={{scale:1.3}}>
                {bm&&id!==cur&&<span style={{position:'absolute',top:'-4px',left:'50%',transform:'translateX(-50%)',width:'4px',height:'4px',borderRadius:'50%',background:'var(--lavender)',display:'block'}}/>}
              </motion.button>
            );
          })}
        </div>
        <motion.button onClick={goNext} disabled={idx===ORDER.length-1} whileHover={{x:3}} whileTap={{scale:0.96}}
          className="nav-page-btn"
          style={{opacity:idx===ORDER.length-1?0:1,pointerEvents:idx===ORDER.length-1?'none':'auto',transition:'opacity 0.3s'}}>
          {idx<ORDER.length-1?CHAPTERS[idx+1].label:''} →
        </motion.button>
      </footer>

      <BookmarkPanel isOpen={bmPanelOpen} onClose={()=>setBmPanel(false)} onNavigate={id=>nav(id)} />
      <FeedbackModal isOpen={feedbackOpen} onClose={()=>setFeedbackOpen(false)} />
    </div>
  );
}
