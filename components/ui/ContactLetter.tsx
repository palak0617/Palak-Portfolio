'use client';

import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/lib/data';

export default function ContactLetter() {
  return (
    <motion.div
      className="relative max-w-lg mx-auto rounded-sm"
      style={{
        background: 'linear-gradient(160deg, #fdf6e3 0%, #f5ead6 60%, #ede0c4 100%)',
        border: '1px solid rgba(201,168,76,0.38)',
        padding: '48px 44px',
        boxShadow: '4px 8px 24px rgba(92,61,46,0.14), 0 2px 4px rgba(0,0,0,0.05)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7 }}
    >
      {/* Top gold rule */}
      <div
        className="absolute top-0 inset-x-0 pointer-events-none"
        style={{ height: '3px', background: 'linear-gradient(to right, transparent, #c9a84c, transparent)' }}
      />

      {/* Ruled lines */}
      <div className="absolute pointer-events-none" style={{ inset: '80px 44px 44px' }} aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{ height: '1px', marginBottom: '30px', background: 'rgba(201,168,76,0.12)' }}
          />
        ))}
      </div>

      {/* Letter header */}
      <p
        className="relative z-10 mb-6"
        style={{
          fontFamily: 'var(--font-dancing)',
          fontSize: '20px',
          color: 'var(--brown)',
        }}
      >
        Dear Reader,
      </p>

      {/* Letter body */}
      <p
        className="relative z-10 mb-8"
        style={{
          fontFamily: 'var(--font-dancing)',
          fontSize: '16px',
          lineHeight: 2.05,
          color: 'var(--sepia)',
        }}
      >
        Thank you for taking the time to walk through<br />
        the chapters of my life.<br /><br />
        If something here moved you — if you see in my<br />
        work what I see in yours — I would love nothing<br />
        more than to begin a conversation.<br /><br />
        Whether it is a project, a collaboration, or simply<br />
        a hello, my door is always open.<br /><br />
        With warm regards,<br />
        Palak
      </p>

      {/* Wax seal + send */}
      <div className="relative z-10 flex items-center gap-5">
        <motion.a
          href={`mailto:${PORTFOLIO_DATA.email}`}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center justify-center rounded-full text-parchment-100 font-bold select-none cursor-pointer"
          style={{
            width: '58px', height: '58px',
            background: 'radial-gradient(circle, #c0392b, #962d22)',
            fontFamily: 'var(--font-dancing)',
            fontSize: '20px',
            color: '#fdf6e3',
            boxShadow: '0 4px 12px rgba(192,57,43,0.38), inset 0 -2px 4px rgba(0,0,0,0.18)',
            textDecoration: 'none',
          }}
          aria-label="Send Palak an email"
          title="Send an email"
        >
          P
        </motion.a>
        <p
          style={{
            fontFamily: 'var(--font-fell)',
            fontStyle: 'italic',
            fontSize: '13px',
            color: 'rgba(92,61,46,0.6)',
          }}
        >
          Click the seal to write
        </p>
      </div>

      {/* Social links */}
      <div className="relative z-10 flex flex-wrap gap-3 mt-7">
        {[
          { label: 'GitHub',   href: PORTFOLIO_DATA.github   },
          { label: 'LinkedIn', href: PORTFOLIO_DATA.linkedin  },
          { label: 'Email',    href: `mailto:${PORTFOLIO_DATA.email}` },
        ].map(link => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            className="rounded-sm"
            style={{
              padding: '7px 18px',
              border: '1px solid rgba(201,168,76,0.45)',
              fontFamily: 'var(--font-playfair)',
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--brown)',
              background: 'rgba(201,168,76,0.07)',
              letterSpacing: '0.08em',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'background 0.2s ease',
            }}
          >
            {link.label}
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
