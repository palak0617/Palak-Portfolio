'use client';

import { useRef, useCallback, useEffect, useState } from 'react';

// ─── Fairy-tale pentatonic scale in F major (very soothing) ───────────────
// F3  G3   A3   C4   D4   F4   G4   A4   C5   D5   F5
const PENTA = [174.61, 196.00, 220.00, 261.63, 293.66, 349.23, 392.00, 440.00, 523.25, 587.33, 698.46];
const BELLS = [1046.5, 1174.7, 1318.5, 1568.0, 1760.0]; // high sparkle notes
const DRONE_FREQS = [87.31, 130.81]; // F2 + C3 — deep drone pad

interface AmbientMusicEngine {
  start: () => void;
  stop: () => void;
  setVolume: (v: number) => void;
}

function buildReverb(ctx: AudioContext): ConvolverNode {
  const convolver = ctx.createConvolver();
  const len = ctx.sampleRate * 2.5;
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const ch = buf.getChannelData(c);
    for (let i = 0; i < len; i++) {
      ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.2);
    }
  }
  convolver.buffer = buf;
  return convolver;
}

function createEngine(ctx: AudioContext): AmbientMusicEngine {
  const master = ctx.createGain();
  master.gain.value = 0.0;
  master.connect(ctx.destination);

  const reverb = buildReverb(ctx);
  const reverbGain = ctx.createGain();
  reverbGain.gain.value = 0.35;
  reverb.connect(reverbGain);
  reverbGain.connect(master);

  const dryBus = ctx.createGain();
  dryBus.gain.value = 0.65;
  dryBus.connect(master);

  function playTone(
    freq: number, startTime: number, duration: number,
    volume: number, type: OscillatorType = 'sine', wet = true
  ) {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    const lpf  = ctx.createBiquadFilter();
    lpf.type = 'lowpass'; lpf.frequency.value = 3200;

    osc.type = type; osc.frequency.value = freq;
    osc.connect(lpf); lpf.connect(gain);
    gain.connect(dryBus);
    if (wet) gain.connect(reverb);

    const att = Math.min(0.6, duration * 0.25);
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(volume, startTime + att);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  // ── Drone pad — two detuned oscillators for warmth ──
  const droneOscs: OscillatorNode[] = [];
  DRONE_FREQS.forEach((f, i) => {
    const osc   = ctx.createOscillator();
    const gain  = ctx.createGain();
    const filt  = ctx.createBiquadFilter();
    filt.type = 'lowpass'; filt.frequency.value = 600;
    osc.frequency.value = f + (i * 0.3);
    osc.type = 'sine';
    gain.gain.value = 0.028;
    osc.connect(filt); filt.connect(gain);
    gain.connect(reverb); gain.connect(dryBus);
    droneOscs.push(osc);
  });

  // ── Melody scheduler ──
  let melodyTimeout: ReturnType<typeof setTimeout> | null = null;
  let lastNoteIdx = 5; // start in the middle
  let isRunning = false;

  function scheduleMelody() {
    if (!isRunning) return;
    const now = ctx.currentTime;

    // Weighted random walk — mostly step, sometimes leap
    const r = Math.random();
    let step = r < 0.55 ? (Math.random() > 0.5 ? 1 : -1)
             : r < 0.80 ? (Math.random() > 0.5 ? 2 : -2)
             : 0;
    lastNoteIdx = Math.max(0, Math.min(PENTA.length - 1, lastNoteIdx + step));
    const freq = PENTA[lastNoteIdx];
    const dur  = 1.8 + Math.random() * 2.5;
    const vol  = 0.045 + Math.random() * 0.03;

    playTone(freq, now, dur, vol, 'sine', true);
    // Occasional octave harmony
    if (Math.random() < 0.3) {
      playTone(freq * 2, now + 0.05, dur * 0.7, vol * 0.35, 'sine', true);
    }

    const nextIn = (1.4 + Math.random() * 2.8) * 1000;
    melodyTimeout = setTimeout(scheduleMelody, nextIn);
  }

  // ── Bell sparkle scheduler ──
  let bellTimeout: ReturnType<typeof setTimeout> | null = null;

  function scheduleBell() {
    if (!isRunning) return;
    const now  = ctx.currentTime;
    const freq = BELLS[Math.floor(Math.random() * BELLS.length)];
    playTone(freq, now, 2.8 + Math.random() * 1.5, 0.018 + Math.random() * 0.01, 'sine', true);
    bellTimeout = setTimeout(scheduleBell, (3.5 + Math.random() * 5.5) * 1000);
  }

  // ── Soft chord pad (every 8-14s) ──
  let chordTimeout: ReturnType<typeof setTimeout> | null = null;

  function scheduleChord() {
    if (!isRunning) return;
    const now  = ctx.currentTime;
    const root = PENTA[Math.floor(Math.random() * 5)]; // lower 5 notes
    [1, 1.5, 2, 2.5].forEach((mult, i) => {
      setTimeout(() => {
        if (!isRunning) return;
        playTone(root * mult, ctx.currentTime, 4.5 + i * 0.5, 0.022, 'sine', true);
      }, i * 80);
    });
    chordTimeout = setTimeout(scheduleChord, (8 + Math.random() * 6) * 1000);
  }

  return {
    start() {
      if (isRunning) return;
      isRunning = true;
      droneOscs.forEach(o => o.start());

      // Fade master in
      master.gain.setValueAtTime(0, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.72, ctx.currentTime + 3.5);

      setTimeout(scheduleMelody, 800);
      setTimeout(scheduleBell, 2000);
      setTimeout(scheduleChord, 4000);
    },
    stop() {
      isRunning = false;
      [melodyTimeout, bellTimeout, chordTimeout].forEach(t => t && clearTimeout(t));
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.8);
      setTimeout(() => droneOscs.forEach(o => { try { o.stop(); } catch {} }), 2200);
    },
    setVolume(v: number) {
      master.gain.setTargetAtTime(v * 0.72, ctx.currentTime, 0.5);
    },
  };
}

export function useAmbientMusic() {
  const ctxRef    = useRef<AudioContext | null>(null);
  const engineRef = useRef<AmbientMusicEngine | null>(null);
  const [enabled, setEnabled] = useState(false);

  const toggle = useCallback(() => {
    setEnabled(prev => {
      const next = !prev;
      if (next) {
        // Build context lazily (requires user gesture)
        if (!ctxRef.current) {
          ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (!engineRef.current) {
          engineRef.current = buildEngine(ctxRef.current);
        }
        ctxRef.current.resume().then(() => engineRef.current!.start());
      } else {
        engineRef.current?.stop();
      }
      return next;
    });
  }, []);

  function buildEngine(ctx: AudioContext) { return createEngine(ctx); }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      engineRef.current?.stop();
      ctxRef.current?.close();
    };
  }, []);

  return { enabled, toggle };
}
