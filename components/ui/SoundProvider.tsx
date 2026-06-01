'use client';

import React, { createContext, useContext, useRef, useCallback, useEffect, useState } from 'react';

/* ─── Web Audio ambient music engine ──────────────────────────── */
const PENTA = [174.61,196.00,220.00,261.63,293.66,349.23,392.00,440.00,523.25,587.33,698.46];
const BELLS = [1046.5,1174.7,1318.5,1568.0,1760.0];
const DRONES = [87.31,130.81];

function buildReverb(ctx: AudioContext): ConvolverNode {
  const conv = ctx.createConvolver();
  const len  = Math.floor(ctx.sampleRate * 2.5);
  const buf  = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c=0;c<2;c++){const d=buf.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.2);}
  conv.buffer = buf; return conv;
}

function createMusicEngine(ctx: AudioContext) {
  const master = ctx.createGain(); master.gain.value=0; master.connect(ctx.destination);
  const rev    = buildReverb(ctx);
  const revGain= ctx.createGain(); revGain.gain.value=0.32; rev.connect(revGain); revGain.connect(master);
  const dry    = ctx.createGain(); dry.gain.value=0.68; dry.connect(master);

  function playTone(freq:number,t:number,dur:number,vol:number,type:OscillatorType='sine',wet=true){
    const osc=ctx.createOscillator();const g=ctx.createGain();const lpf=ctx.createBiquadFilter();
    lpf.type='lowpass';lpf.frequency.value=3200;osc.type=type;osc.frequency.value=freq;
    osc.connect(lpf);lpf.connect(g);g.connect(dry);if(wet)g.connect(rev);
    const att=Math.min(0.5,dur*0.22);
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+att);
    g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    osc.start(t);osc.stop(t+dur+0.08);
  }

  // Drone oscillators
  const droneOscs:OscillatorNode[]=DRONES.map((f,i)=>{
    const o=ctx.createOscillator();const g=ctx.createGain();const filt=ctx.createBiquadFilter();
    filt.type='lowpass';filt.frequency.value=500;o.frequency.value=f+i*0.25;o.type='sine';
    g.gain.value=0.025;o.connect(filt);filt.connect(g);g.connect(rev);g.connect(dry);return o;
  });

  let isRunning=false;
  let lastIdx=5;
  const timers:ReturnType<typeof setTimeout>[]=[];

  function melody(){
    if(!isRunning)return;
    const r=Math.random();
    const step=r<0.55?(Math.random()>0.5?1:-1):r<0.80?(Math.random()>0.5?2:-2):0;
    lastIdx=Math.max(0,Math.min(PENTA.length-1,lastIdx+step));
    const freq=PENTA[lastIdx];const dur=1.8+Math.random()*2.5;const vol=0.042+Math.random()*0.028;
    playTone(freq,ctx.currentTime,dur,vol,'sine',true);
    if(Math.random()<0.28)playTone(freq*2,ctx.currentTime+0.05,dur*0.65,vol*0.3,'sine',true);
    timers.push(setTimeout(melody,(1.4+Math.random()*2.6)*1000));
  }
  function bells(){
    if(!isRunning)return;
    playTone(BELLS[Math.floor(Math.random()*BELLS.length)],ctx.currentTime,2.8+Math.random()*1.5,0.016,'sine',true);
    timers.push(setTimeout(bells,(3.5+Math.random()*5.5)*1000));
  }
  function chord(){
    if(!isRunning)return;
    const root=PENTA[Math.floor(Math.random()*5)];
    [1,1.5,2,2.5].forEach((m,i)=>setTimeout(()=>{if(!isRunning)return;playTone(root*m,ctx.currentTime,4.5+i*0.5,0.020,'sine',true);},i*75));
    timers.push(setTimeout(chord,(8+Math.random()*6)*1000));
  }

  return {
    start(){
      if(isRunning)return;isRunning=true;
      droneOscs.forEach(o=>o.start());
      master.gain.setValueAtTime(0,ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.75,ctx.currentTime+3.5);
      timers.push(setTimeout(melody,800),setTimeout(bells,2200),setTimeout(chord,4500));
    },
    stop(){
      isRunning=false;
      timers.forEach(clearTimeout);timers.length=0;
      master.gain.setValueAtTime(master.gain.value,ctx.currentTime);
      master.gain.linearRampToValueAtTime(0,ctx.currentTime+1.8);
      setTimeout(()=>droneOscs.forEach(o=>{try{o.stop();}catch{}}),2300);
    },
  };
}

/* ─── Context ─────────────────────────────────────────────────── */
interface MusicCtxValue {
  enabled: boolean;
  toggle: () => void;
  playPageTurn: () => void;
}

const MusicCtx = createContext<MusicCtxValue>({ enabled:false, toggle:()=>{}, playPageTurn:()=>{} });

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const ctxRef    = useRef<AudioContext|null>(null);
  const engineRef = useRef<ReturnType<typeof createMusicEngine>|null>(null);

  const toggle = useCallback(() => {
    setEnabled(prev => {
      const next = !prev;
      if (next) {
        if (!ctxRef.current) {
          ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (!engineRef.current) {
          engineRef.current = createMusicEngine(ctxRef.current);
        }
        ctxRef.current.resume().then(() => engineRef.current!.start()).catch(()=>{});
      } else {
        engineRef.current?.stop();
        engineRef.current = null;
      }
      return next;
    });
  }, []);

  function playPageTurn() {
    if (!ctxRef.current) return;
    const ctx = ctxRef.current;
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate*0.08), ctx.sampleRate);
    const d   = buf.getChannelData(0);
    for(let i=0;i<d.length;i++) d[i] = (Math.random()*2-1) * Math.pow(1-i/d.length,1.5) * 0.12;
    const src  = ctx.createBufferSource();
    const gain = ctx.createGain();
    const filt = ctx.createBiquadFilter();
    filt.type='bandpass'; filt.frequency.value=4000; filt.Q.value=0.5;
    src.buffer=buf; src.connect(filt); filt.connect(gain); gain.connect(ctx.destination);
    gain.gain.value=0.4; src.start(); src.stop(ctx.currentTime+0.12);
  }

  useEffect(() => () => { engineRef.current?.stop(); ctxRef.current?.close(); }, []);

  return (
    <MusicCtx.Provider value={{ enabled, toggle, playPageTurn }}>
      {children}
    </MusicCtx.Provider>
  );
}

export function useSound() { return useContext(MusicCtx); }
export function useAmbientMusicContext() { return useContext(MusicCtx); }
