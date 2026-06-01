'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface FeedbackModalProps {
  isOpen:   boolean;
  onClose:  () => void;
}

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'palak@example.com';

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [message, setMessage] = useState('');
  const [state,   setState]   = useState<SubmitState>('idle');
  const [mounted, setMounted] = useState(false);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  /* Portal requires a DOM element — only available client-side */
  useEffect(() => { setMounted(true); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) { msgRef.current?.focus(); return; }
    setState('sending');

    /* ── 1. MongoDB API (primary) ──────────────────── */
    try {
      const res  = await fetch('/api/messages', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, email, message }),
      });
      const json = await res.json();
      if (res.ok && json.success) { setState('success'); return; }
    } catch { /* fall through */ }

    /* ── 2. Mailto fallback (always works) ─────────── */
    const subject = encodeURIComponent(`✦ Note on Palak's Portfolio`);
    const body    = encodeURIComponent(
      `From: ${name.trim() || 'Anonymous'}${email.trim() ? ` <${email.trim()}>` : ''}\n\n${message.trim()}`
    );
    window.open(`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`, '_blank');
    setState('success');
  }

  function handleClose() {
    onClose();
    setTimeout(() => { setName(''); setEmail(''); setMessage(''); setState('idle'); }, 380);
  }

  /* Escape key closes */
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') handleClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const field: React.CSSProperties = {
    width: '100%', padding: '11px 14px', marginBottom: '10px',
    border: '0.5px solid var(--border-soft)', borderRadius: '10px',
    fontFamily: 'var(--font-dm)', fontSize: '14px',
    color: 'var(--ink)', background: 'var(--ivory)',
    outline: 'none', display: 'block', transition: 'border-color 0.2s',
  };

  /* 
    CRITICAL FIX: render via createPortal directly into document.body.
    This breaks the modal OUT of any CSS transform / overflow container,
    so position:fixed works correctly even inside Framer Motion wrappers.
  */
  if (!mounted) return null;

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center px-4"
          style={{ zIndex: 9999, background: 'rgba(20,16,10,0.65)', backdropFilter: 'blur(14px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={e => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.32, ease: [0.34,1.56,0.64,1] }}
            className="feedback-modal relative w-full"
            style={{ maxWidth: '400px', borderRadius: '22px', padding: '34px 30px', boxShadow: '0 28px 70px rgba(0,0,0,0.28)' }}
          >
            <button onClick={handleClose} aria-label="Close"
              style={{ position:'absolute',top:'14px',right:'14px',width:'29px',height:'29px',borderRadius:'50%',background:'var(--border-soft)',border:'none',color:'var(--sage)',fontSize:'18px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' }}
            >×</button>

            <AnimatePresence mode="wait">
              {state === 'success' ? (
                <motion.div key="ok"
                  initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
                  className="text-center py-4"
                >
                  <motion.div initial={{ scale:0 }} animate={{ scale:1 }}
                    transition={{ delay:0.1, type:'spring', stiffness:280 }}
                    style={{ fontSize:'44px', marginBottom:'16px', color:'var(--sage)' }}>✦</motion.div>
                  <h2 style={{ fontFamily:'var(--font-cormorant)',fontStyle:'italic',fontSize:'24px',color:'var(--sage)',marginBottom:'10px' }}>
                    Note received
                  </h2>
                  <p style={{ fontSize:'14px', color:'var(--muted)', lineHeight:1.75 }}>
                    Your words have been saved privately<br/>and sent to Palak's inbox.
                  </p>
                  <button onClick={handleClose}
                    style={{ marginTop:'22px',padding:'9px 28px',borderRadius:'20px',border:'0.5px solid var(--border-soft)',background:'none',color:'var(--muted)',cursor:'pointer',fontFamily:'var(--font-dm)',fontSize:'13px' }}>
                    Close
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity:1 }} exit={{ opacity:0 }}>
                  <h2 style={{ fontFamily:'var(--font-cormorant)',fontStyle:'italic',fontSize:'24px',color:'var(--ink)',marginBottom:'5px' }}>
                    Leave a note ✦
                  </h2>
                  <p style={{ fontSize:'13px',color:'var(--muted)',marginBottom:'22px',lineHeight:1.65 }}>
                    Private — stored securely, only Palak sees this.
                  </p>

                  <input type="text"  value={name}    onChange={e=>setName(e.target.value)}    placeholder="Your name (optional)"  style={field} />
                  <input type="email" value={email}   onChange={e=>setEmail(e.target.value)}   placeholder="Your email (optional)" style={field} />
                  <textarea           value={message} onChange={e=>setMessage(e.target.value)} placeholder="Your message…"
                    rows={4} required ref={msgRef}
                    style={{ ...field, resize:'none', marginBottom:'16px' }}
                  />

                  {state === 'error' && (
                    <p style={{ color:'#c0392b',fontSize:'13px',marginBottom:'10px' }}>Something went wrong — please try again.</p>
                  )}

                  <div style={{ display:'flex', gap:'9px' }}>
                    <button type="submit" disabled={state==='sending'}
                      style={{ flex:1,padding:'12px',background:'linear-gradient(135deg,#a8cce0,#6b9fc4)',border:'none',borderRadius:'11px',color:'white',fontSize:'14px',fontFamily:'var(--font-dm)',fontWeight:500,letterSpacing:'0.04em',cursor:state==='sending'?'wait':'pointer',opacity:state==='sending'?0.7:1 }}>
                      {state==='sending' ? 'Sending…' : 'Send privately'}
                    </button>
                    <button type="button" onClick={handleClose}
                      style={{ padding:'12px 18px',borderRadius:'11px',border:'0.5px solid var(--border-soft)',background:'none',fontSize:'14px',color:'var(--muted)',cursor:'pointer',fontFamily:'var(--font-dm)' }}>
                      Cancel
                    </button>
                  </div>

                  <p style={{ marginTop:'14px',fontSize:'11px',color:'var(--muted)',textAlign:'center',lineHeight:1.6,opacity:0.55 }}>
                     Whispered to Palak · Lost to the world ✦
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}
