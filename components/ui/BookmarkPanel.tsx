'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBookmarks } from './BookmarkContext';
import type { ChapterId } from '@/lib/data';

interface BookmarkPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (id: ChapterId) => void;
}

const CHAPTER_ICONS: Record<string,string> = {
  intro:'✦', about:'📖', skills:'🎯', projects:'🌿', journey:'🗺', achievements:'🎞', contact:'✉',
};

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-US',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});
}

export default function BookmarkPanel({ isOpen, onClose, onNavigate }: BookmarkPanelProps) {
  const { bookmarks, removeBookmark, clearAll } = useBookmarks();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const panel = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="fixed inset-0" style={{ zIndex:9998 }}
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={onClose}
            style={{ background:'rgba(20,16,10,0.45)', backdropFilter:'blur(4px)', zIndex:9998 }}
          />
          <motion.aside
            className="bookmark-drawer fixed top-0 right-0 bottom-0 flex flex-col"
            style={{ width:'300px', zIndex:9999, boxShadow:'-8px 0 32px rgba(0,0,0,0.14)' }}
            initial={{ x:'100%' }} animate={{ x:0 }} exit={{ x:'100%' }}
            transition={{ type:'spring', stiffness:280, damping:30 }}
          >
            <div style={{ padding:'22px 22px 16px', borderBottom:'0.5px solid var(--border-soft)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div>
                <p style={{ fontFamily:'var(--font-cormorant)',fontStyle:'italic',fontSize:'21px',color:'var(--ink)' }}>My Bookmarks</p>
                <p style={{ fontFamily:'var(--font-dm)',fontSize:'12px',color:'var(--muted)',marginTop:'2px' }}>
                  {bookmarks.length===0?'None saved yet':`${bookmarks.length} chapter${bookmarks.length>1?'s':''} saved`}
                </p>
              </div>
              <button onClick={onClose}
                style={{ width:'30px',height:'30px',borderRadius:'50%',background:'var(--border-soft)',border:'none',color:'var(--sage)',fontSize:'17px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' }}>×</button>
            </div>

            <div style={{ flex:1, overflowY:'auto', padding:'14px' }}>
              {bookmarks.length===0 ? (
                <motion.div initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} style={{ textAlign:'center',padding:'44px 20px' }}>
                  <div style={{ fontSize:'36px',marginBottom:'14px',opacity:0.35 }}>🔖</div>
                  <p style={{ fontFamily:'var(--font-cormorant)',fontStyle:'italic',fontSize:'17px',color:'var(--muted)',marginBottom:'8px' }}>No bookmarks yet</p>
                  <p style={{ fontFamily:'var(--font-dm)',fontSize:'13px',color:'var(--muted)',lineHeight:1.7,opacity:0.7 }}>Click the 🔖 icon on any chapter to save it here.</p>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {bookmarks.map((bm,i) => (
                    <motion.div key={bm.id}
                      initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:20,height:0,marginBottom:0 }}
                      transition={{ delay:i*0.05 }}
                      className="bookmark-item"
                      style={{ padding:'14px 14px 12px',marginBottom:'10px',cursor:'pointer',position:'relative',overflow:'hidden' }}
                      whileHover={{ y:-2, boxShadow:'0 4px 14px rgba(107,159,196,0.1)' }}
                      onClick={()=>{ onNavigate(bm.id); onClose(); }}
                    >
                      <div style={{ position:'absolute',left:0,top:0,bottom:0,width:'3px',background:'linear-gradient(to bottom,var(--blue),var(--lavender,#b4a8d0))',borderRadius:'12px 0 0 12px' }}/>
                      <div style={{ paddingLeft:'8px' }}>
                        <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'5px' }}>
                          <div style={{ display:'flex',alignItems:'center',gap:'8px' }}>
                            <span style={{ fontSize:'15px' }}>{CHAPTER_ICONS[bm.id]??'✦'}</span>
                            <span style={{ fontFamily:'var(--font-cormorant)',fontSize:'16px',color:'var(--ink)' }}>{bm.label}</span>
                          </div>
                          <button onClick={e=>{e.stopPropagation();removeBookmark(bm.id);}}
                            style={{ width:'20px',height:'20px',borderRadius:'50%',background:'rgba(196,136,128,0.15)',border:'none',color:'var(--blush,#e8b4b0)',fontSize:'12px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' }}>×</button>
                        </div>
                        <p style={{ fontFamily:'var(--font-dm)',fontSize:'12px',color:'var(--muted)',lineHeight:1.55,marginBottom:'6px' }}>{bm.note}</p>
                        <p style={{ fontFamily:'var(--font-dm)',fontSize:'10px',color:'var(--blue)',letterSpacing:'0.04em',opacity:0.8 }}>{fmt(bm.savedAt)}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {bookmarks.length>0 && (
              <div style={{ padding:'12px 16px',borderTop:'0.5px solid var(--border-soft)' }}>
                <button onClick={clearAll}
                  style={{ width:'100%',padding:'9px',fontFamily:'var(--font-dm)',fontSize:'12px',letterSpacing:'0.07em',color:'var(--muted)',background:'none',border:'0.5px solid var(--border-soft)',borderRadius:'8px',cursor:'pointer' }}>
                  Clear all bookmarks
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(panel, document.body);
}
