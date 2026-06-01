'use client';

import { motion } from 'framer-motion';
import VintageBook from './VintageBook';
import AmbientParticles from '@/components/effects/AmbientParticles';
import ButterflySystem from '@/components/effects/ButterflySystem';
import LEDLights from '@/components/effects/LEDLights';

interface LandingSceneProps { onOpen: () => void; }

export default function LandingScene({ onOpen }: LandingSceneProps) {
  return (
    <div
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background:'linear-gradient(155deg,#e8e0ff 0%,#f5f0ff 28%,#fff0f8 52%,#e8f0ff 75%,#eefff4 100%)' }}
    >
      {/* Deep bokeh layers */}
      {[
        { w:320,h:320, l:'4%',  t:'8%',  c:'rgba(160,140,220,0.12)',  blur:55 },
        { w:240,h:240, l:'72%', t:'5%',  c:'rgba(220,180,220,0.1)',  blur:48 },
        { w:360,h:360, l:'58%', t:'50%', c:'rgba(140,200,180,0.08)', blur:60 },
        { w:200,h:200, l:'10%', t:'65%', c:'rgba(255,180,220,0.09)', blur:45 },
        { w:280,h:280, l:'36%', t:'22%', c:'rgba(160,140,220,0.07)', blur:52 },
        { w:160,h:160, l:'82%', t:'70%', c:'rgba(180,160,255,0.08)', blur:40 },
      ].map((b,i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{ width:b.w,height:b.h,left:b.l,top:b.t,background:b.c,filter:`blur(${b.blur}px)` }}
          animate={{ x:[0,14,0],y:[0,-9,0] }}
          transition={{ duration:10+i*2,repeat:Infinity,ease:'easeInOut',delay:i*0.8 }}
        />
      ))}

      {/* LEDs on landing too */}
      <LEDLights />

      <AmbientParticles count={35} color="rgba(122,158,138," className="fixed inset-0 w-full h-full" />
      <ButterflySystem ambient />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background:'radial-gradient(ellipse at center, transparent 48%, rgba(200,180,240,0.45) 100%)',
      }}/>

      {/* Top subtitle */}
      <motion.p
        className="absolute pointer-events-none"
        style={{
          top:'8%', left:'50%', translateX:'-50%', whiteSpace:'nowrap',
          fontFamily:'var(--font-cormorant)', fontStyle:'italic',
          fontSize:'clamp(12px,2.2vw,16px)',
          letterSpacing:'0.26em', textTransform:'uppercase',
          color:'rgba(160,140,220,0.75)',
        }}
        initial={{ opacity:0,y:-10 }} animate={{ opacity:1,y:0 }}
        transition={{ delay:0.4,duration:1.1 }}
      >A storybook portfolio</motion.p>

      {/* The book */}
      <motion.div className="relative z-10 flex flex-col items-center"
        initial={{ opacity:0,y:36,scale:0.88 }}
        animate={{ opacity:1,y:0,scale:1 }}
        transition={{ delay:0.5,duration:1.2,ease:[0.34,1.56,0.64,1] }}
      >
        <VintageBook onOpen={onOpen} />
      </motion.div>

      {/* Side scripts */}
      {[
        { side:'left',  text:'Engineering · Creativity · Story' },
        { side:'right', text:'Open · Read · Discover' },
      ].map(({ side, text }) => (
        <motion.p key={side}
          className={`absolute ${side}-[3%] top-1/2 pointer-events-none z-10 hidden lg:block`}
          style={{
            fontFamily:'var(--font-dancing)', fontSize:'12px',
            color:'rgba(160,140,220,0.3)', writingMode:'vertical-rl',
            letterSpacing:'0.15em',
            transform:`translateY(-50%)${side==='left'?' rotate(180deg)':''}`,
          }}
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.6,duration:1 }}
        >{text}</motion.p>
      ))}
    </div>
  );
}
