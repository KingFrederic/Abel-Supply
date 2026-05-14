'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface CaseStudy {
  label: string;
  title: string;
  before: string;
  after: string;
  savings: string;
}

function extractValue(str: string): string {
  const parts = str.split(':');
  return parts.length > 1 ? parts[1].trim() : str;
}

export default function PinnedCaseStudy({ caseStudy }: { caseStudy: CaseStudy }) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const beforeVal = extractValue(caseStudy.before);
  const afterVal  = extractValue(caseStudy.after);
  const savingsVal = extractValue(caseStudy.savings);

  const barWidth  = useTransform(scrollYProgress, [0.2, 0.7], ['0%', '23%']);
  const opacity   = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const translateY = useTransform(scrollYProgress, [0.1, 0.3], [32, 0]);

  return (
    <div ref={ref} style={{ height: '100vh', position: 'relative' }}>
      <div
        className="sticky top-0 flex items-center overflow-hidden"
        style={{ height: '100vh', background: '#0A0B0F' }}
      >
        {/* Top/bottom gold hairlines */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)' }} />

        {/* Background number */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden
        >
          <span className="font-display font-bold text-[30vw] leading-none" style={{ color: 'rgba(201,169,110,0.03)' }}>
            23%
          </span>
        </div>

        <div className="relative w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            style={shouldReduce ? {} : { opacity, y: translateY }}
            className="max-w-4xl"
          >
            {/* Label */}
            <div className="flex items-center gap-4 mb-10">
              <div className="w-8 h-px bg-[#C9A96E]" />
              <span className="section-label">{caseStudy.label}</span>
            </div>

            {/* Title */}
            <h3 className="display-xl text-white mb-16">{caseStudy.title}</h3>

            {/* Three metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 mb-16">
              {[
                { label: 'Devis original',    value: beforeVal,  muted: true,  green: false },
                { label: 'Prix négocié',      value: afterVal,   muted: false, green: false },
                { label: 'Économie réalisée', value: savingsVal, muted: false, green: true  },
              ].map((item, i) => (
                <div
                  key={i}
                  className="py-10 pr-12 border-b sm:border-b-0 sm:border-r last:border-r-0 last:pl-12 border-white/[0.06]"
                  style={{ paddingLeft: i > 0 ? '3rem' : 0 }}
                >
                  <p className="text-text-dim text-[11px] font-display uppercase tracking-[0.2em] mb-4">
                    {item.label}
                  </p>
                  <p
                    className="font-display font-bold text-2xl leading-tight"
                    style={{
                      color: item.green ? '#10B981' : item.muted ? 'rgba(255,255,255,0.3)' : '#F5F4F0',
                      textDecoration: item.muted ? 'line-through' : 'none',
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Savings bar */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-text-muted text-sm font-display">Économies sur le devis initial</span>
                <span className="font-display font-bold text-green text-sm">23%</span>
              </div>
              <div className="h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={shouldReduce
                    ? { width: '23%', background: 'linear-gradient(90deg, #10B981, #34D399)' }
                    : { width: barWidth, background: 'linear-gradient(90deg, #10B981, #34D399)' }
                  }
                />
              </div>
              <p className="text-text-dim text-xs mt-3">
                2 800 000 FCFA économisés · Villa R+1, Cocody · Abidjan
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
