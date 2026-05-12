'use client';

import { useRef, useState, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { revealVariants, revealVariantsReduced } from '@/lib/motion';
import { useReducedMotion } from 'framer-motion';

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
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const shouldReduce = useReducedMotion();

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (shouldReduce) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -24;
    const ry = ((x / rect.width) - 0.5) * 24;
    setTilt({ x: rx, y: ry });
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
    setHover(false);
  }

  const itemList = items.split(' · ');

  return (
    <motion.div
      variants={shouldReduce ? revealVariantsReduced : revealVariants}
      className="relative h-64 perspective-[800px] cursor-pointer"
      style={{ perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
    >
      <div
        style={{
          transform: shouldReduce
            ? 'none'
            : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: hover ? 'none' : 'transform 0.5s cubic-bezier(0.2,0.8,0.2,1)',
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 rounded-2xl border border-white/8 bg-bg-elev p-6 flex flex-col justify-between overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            opacity: hover ? 0 : 1,
            transition: 'opacity 0.3s',
          }}
        >
          {/* Inner highlight */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(245,158,11,0.08) 0%, transparent 60%)`,
              transition: hover ? 'none' : 'all 0.3s',
            }}
          />
          <div className="text-amber w-12 h-12 flex items-center justify-center rounded-xl bg-amber/10">
            {icon}
          </div>
          <div>
            <span className="text-amber/50 text-xs font-display tracking-widest uppercase mb-1 block">
              0{index + 1}
            </span>
            <h3 className="font-display font-semibold text-xl text-white">{title}</h3>
          </div>
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 rounded-2xl border border-amber/20 bg-bg-elev p-6 flex flex-col justify-center gap-3"
          style={{
            opacity: hover ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        >
          <h3 className="font-display font-semibold text-base text-amber mb-2">{title}</h3>
          <ul className="space-y-1.5">
            {itemList.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-text-muted text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0" />
                {item.trim()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
