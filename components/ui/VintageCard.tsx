'use client';

import { motion } from 'framer-motion';

interface VintageCardProps {
  icon: string;
  title: string;
  description: string;
  tags: readonly string[];
  rotate?: string;
  index?: number;
}

export default function VintageCard({
  icon, title, description, tags, rotate = '0deg', index = 0,
}: VintageCardProps) {
  return (
    <motion.div
      className="relative rounded-sm"
      style={{
        background: 'linear-gradient(145deg, #fdf6e3, #f5ead6)',
        border: '1px solid rgba(201,168,76,0.28)',
        rotate,
        boxShadow: '2px 4px 14px rgba(92,61,46,0.13)',
      }}
      initial={{ opacity: 0, y: 20, rotate }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ delay: index * 0.12 + 0.3, duration: 0.5 }}
      whileHover={{
        y: -5,
        rotate: '0deg',
        boxShadow: '4px 8px 20px rgba(92,61,46,0.22)',
        transition: { duration: 0.25 },
      }}
    >
      {/* Top page crease shadow */}
      <div
        className="absolute top-0 left-4 right-4 pointer-events-none"
        style={{
          height: '4px',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)',
          boxShadow: '0 -2px 6px rgba(0,0,0,0.07)',
        }}
      />

      {/* Tape strip top right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-7px', right: '24px',
          width: '44px', height: '18px',
          background: 'rgba(255,240,180,0.72)',
          border: '1px solid rgba(201,168,76,0.28)',
          transform: 'rotate(2.5deg)',
          boxShadow: '1px 1px 4px rgba(0,0,0,0.09)',
          borderRadius: '1px',
        }}
      />

      {/* Card content */}
      <div className="p-6">
        {/* Icon */}
        <div
          className="text-3xl mb-3"
          role="img"
          aria-hidden="true"
        >
          {icon}
        </div>

        {/* Title */}
        <h3
          className="mb-2"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: '18px',
            fontWeight: 700,
            color: 'var(--sepia)',
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="mb-4"
          style={{
            fontFamily: 'var(--font-crimson)',
            fontSize: '15px',
            lineHeight: 1.75,
            color: 'var(--brown)',
          }}
        >
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map(tag => (
            <span
              key={tag}
              className="inline-block px-2.5 py-1 rounded-full"
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                background: 'rgba(201,168,76,0.12)',
                border: '1px solid rgba(201,168,76,0.35)',
                color: 'var(--brown)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
