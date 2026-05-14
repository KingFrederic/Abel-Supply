'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { revealVariants, revealVariantsReduced } from '@/lib/motion';

interface TiltCardProps {
  title: string;
  items: string;
  icon: React.ReactNode;
  index: number;
}

export default function TiltCard({ title, items, icon, index }: TiltCardProps) {
  const [hover, setHover] = useState(false);
  const shouldReduce = useReducedMotion();

  const itemList = items.split(' · ');
  const COLORS = ['#C9A96E', '#10B981', '#6366F1', '#EC4899'];
  const accentColor = COLORS[index % COLORS.length];

  return (
    <motion.div
      variants={shouldReduce ? revealVariantsReduced : revealVariants}
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: hover ? `linear-gradient(145deg, ${accentColor}10 0%, #0E0F13 60%)` : '#0E0F13',
        border: hover ? `1px solid ${accentColor}30` : '1px solid rgba(255,255,255,0.06)',
        transition: shouldReduce ? 'none' : 'background 0.35s ease, border-color 0.35s ease',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="p-8 flex flex-col gap-6">
        {/* Icon + title row */}
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300"
            style={{
              background: hover ? `${accentColor}20` : `${accentColor}10`,
              color: accentColor,
              border: `1px solid ${accentColor}${hover ? '35' : '18'}`,
            }}
          >
            {icon}
          </div>
          <h3 className="font-display font-bold text-xl text-white leading-tight">{title}</h3>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full transition-all duration-300"
          style={{
            background: hover
              ? `linear-gradient(90deg, ${accentColor}40, transparent)`
              : 'rgba(255,255,255,0.05)',
          }}
        />

        {/* Item list */}
        <div className="flex flex-col">
          {itemList.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 py-2.5 border-b last:border-0 transition-colors duration-200"
              style={{ borderColor: 'rgba(255,255,255,0.04)' }}
            >
              <span
                className="w-1 h-1 rounded-full flex-shrink-0 transition-colors duration-300"
                style={{ background: hover ? accentColor : 'rgba(255,255,255,0.2)' }}
              />
              <span className="text-[14px] text-text-muted">{item.trim()}</span>
            </div>
          ))}
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}50, transparent)`,
            opacity: hover ? 1 : 0.3,
          }}
        />
      </div>
    </motion.div>
  );
}
