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
  const COLORS = ['#F59E0B', '#10B981', '#6366F1', '#EC4899'];
  const accentColor = COLORS[index % COLORS.length];

  return (
    <motion.div
      variants={shouldReduce ? revealVariantsReduced : revealVariants}
      className="relative h-72 cursor-pointer"
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
          className="absolute inset-0 rounded-2xl bg-bg-card border border-white/6 p-7 flex flex-col justify-between overflow-hidden"
          style={{ backfaceVisibility: 'hidden', opacity: hover ? 0 : 1, transition: 'opacity 0.28s' }}
        >
          {/* Dynamic spotlight */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(200px circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.04) 0%, transparent 70%)`,
              opacity: hover ? 0 : 1,
            }}
          />

          {/* Top section: index + icon */}
          <div className="flex items-start justify-between">
            <span className="font-display font-bold text-[52px] leading-none" style={{ color: accentColor, opacity: 0.12 }}>
              0{index + 1}
            </span>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: `${accentColor}12`, color: accentColor, border: `1px solid ${accentColor}22` }}
            >
              {icon}
            </div>
          </div>

          {/* Title */}
          <div>
            <div className="w-8 h-0.5 mb-3" style={{ background: accentColor }} />
            <h3 className="font-display font-bold text-xl text-white leading-tight">{title}</h3>
            <p className="text-text-muted text-xs mt-2">Survol pour détails →</p>
          </div>

          {/* Bottom glow line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)` }}
          />
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-2xl p-7 flex flex-col justify-between overflow-hidden"
          style={{
            opacity: hover ? 1 : 0,
            transition: 'opacity 0.28s',
            background: `linear-gradient(145deg, ${accentColor}10 0%, #13151a 60%)`,
            border: `1px solid ${accentColor}30`,
          }}
        >
          <div>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
              style={{ background: `${accentColor}18`, color: accentColor }}
            >
              {icon}
            </div>
            <h3 className="font-display font-bold text-base mb-4" style={{ color: accentColor }}>{title}</h3>
          </div>

          <ul className="space-y-2.5">
            {itemList.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-text-muted text-sm">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accentColor }} />
                {item.trim()}
              </li>
            ))}
          </ul>

          <div className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ background: `linear-gradient(90deg, transparent, ${accentColor}50, transparent)` }} />
        </div>
      </div>
    </motion.div>
  );
}
