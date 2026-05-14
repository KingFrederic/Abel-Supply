'use client';

import { useRef, useState, MouseEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { revealVariants, revealVariantsReduced } from '@/lib/motion';

interface TiltCardProps {
  title: string;
  items: string;
  icon: React.ReactNode;
  index: number;
}

export default function TiltCard({ title, items, icon, index }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const shouldReduce = useReducedMotion();

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (shouldReduce) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTilt({ x: ((y / rect.height) - 0.5) * -18, y: ((x / rect.width) - 0.5) * 18 });
    setGlow({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  }

  function onLeave() {
    setTilt({ x: 0, y: 0 });
    setHover(false);
  }

  const itemList = items.split(' · ');
  const COLORS = ['#C9A96E', '#10B981', '#6366F1', '#EC4899'];
  const accentColor = COLORS[index % COLORS.length];

  return (
    <motion.div
      variants={shouldReduce ? revealVariantsReduced : revealVariants}
      className="relative h-80 cursor-pointer"
      style={{ perspective: 900 }}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={onLeave}
      ref={cardRef}
    >
      <div
        style={{
          transform: shouldReduce ? 'none' : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: hover ? 'none' : 'transform 0.6s cubic-bezier(0.2,0.8,0.2,1)',
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-2xl p-7 flex flex-col justify-between overflow-hidden"
          style={{
            background: '#0E0F13',
            border: '1px solid rgba(255,255,255,0.06)',
            backfaceVisibility: 'hidden',
            opacity: hover ? 0 : 1,
            transition: 'opacity 0.28s',
          }}
        >
          {/* Dynamic spotlight */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(200px circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.03) 0%, transparent 70%)`,
              opacity: hover ? 0 : 1,
              transition: 'opacity 0.3s',
            }}
          />

          {/* Top section: icon in circle */}
          <div className="flex items-start justify-between">
            <span
              className="font-display font-bold text-[52px] leading-none select-none"
              style={{ color: accentColor, opacity: 0.1 }}
            >
              0{index + 1}
            </span>
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: `${accentColor}12`,
                color: accentColor,
                border: `1px solid ${accentColor}22`,
              }}
            >
              {icon}
            </div>
          </div>

          {/* Bottom: title + tag */}
          <div>
            <h3 className="font-display font-bold text-2xl text-white leading-tight mb-3">{title}</h3>
            <span
              className="text-[13px] font-display font-medium"
              style={{ color: '#C9A96E' }}
            >
              Voir le catalogue →
            </span>
          </div>

          {/* Always-visible thin bottom accent line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${accentColor}30, transparent)` }}
          />
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-2xl p-7 flex flex-col justify-between overflow-hidden"
          style={{
            opacity: hover ? 1 : 0,
            transition: 'opacity 0.28s',
            background: `linear-gradient(145deg, ${accentColor}10 0%, #0E0F13 60%)`,
            border: `1px solid ${accentColor}20`,
          }}
        >
          {/* Icon + title */}
          <div>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mb-5"
              style={{ background: `${accentColor}18`, color: accentColor }}
            >
              {icon}
            </div>
            <h3
              className="font-display font-bold text-base mb-5"
              style={{ color: accentColor }}
            >
              {title}
            </h3>
          </div>

          {/* Item list — clean, no bullets */}
          <div>
            {itemList.map((item, i) => (
              <div
                key={i}
                className="py-2 text-[15px] border-b last:border-0"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  borderColor: 'rgba(255,255,255,0.04)',
                }}
              >
                {item.trim()}
              </div>
            ))}
          </div>

          {/* Bottom accent */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${accentColor}50, transparent)` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
