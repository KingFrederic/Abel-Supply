'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function DevisForm() {
  const t = useT();
  const f = t.contact.form;
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/devis', { method: 'POST', body: data });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) e.currentTarget.reset();
    } catch {
      setStatus('error');
    }
  }

  const inputCls =
    'w-full bg-[#0A0B0E] border border-white/[0.08] rounded-xl px-5 py-4 text-white text-[15px] focus:outline-none focus:border-[#C9A96E]/30 focus:bg-[#0D0E12] transition-all placeholder:text-white/20';

  const labelCls =
    'text-[#7A7880] text-[11px] font-display uppercase tracking-[0.15em] mb-2 block';

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="min-h-[300px] flex flex-col items-center justify-center text-center gap-5 py-10"
        >
          <div className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.3)',
              color: '#10B981',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div>
            <p className="text-white font-display font-bold text-xl mb-2">{f.success}</p>
            <p className="text-[#7A7880] text-sm">Parfait. Abel vous contacte sous 24 heures.</p>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-5"
          noValidate
        >
          {/* Honeypot */}
          <input type="text" name="company" className="hidden" aria-hidden tabIndex={-1} autoComplete="off" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>{f.name} *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Abel Idowu"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>{f.phone} *</label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="+225 07 00 00 00 00"
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label className={labelCls}>{f.message} *</label>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Villa R+2, fondations + charpente + plomberie..."
              className={`${inputCls} resize-none`}
            />
          </div>

          <div>
            <label className={labelCls}>{f.file}</label>
            <div className="relative">
              <input
                type="file"
                name="file"
                accept="application/pdf,image/*"
                className="w-full bg-[#0A0B0E] border border-white/[0.08] rounded-xl px-5 py-4 text-[#7A7880] text-[15px]
                  focus:outline-none focus:border-[#C9A96E]/30 transition-all cursor-pointer
                  hover:border-white/[0.12]
                  file:mr-3 file:bg-[#111318] file:border file:border-white/[0.08] file:text-[#7A7880] file:text-xs
                  file:rounded-lg file:px-3 file:py-1.5 file:cursor-pointer"
              />
            </div>
          </div>

          {status === 'error' && (
            <p className="text-red-400 text-sm rounded-xl px-5 py-4"
              style={{
                background: 'rgba(248,113,113,0.06)',
                border: '1px solid rgba(248,113,113,0.2)',
              }}
            >
              {f.error}
            </p>
          )}

          <motion.button
            type="submit"
            disabled={status === 'loading'}
            className="w-full font-display font-bold text-[15px] py-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            style={{ background: '#C9A96E', color: '#070708' }}
            whileHover={{ scale: status === 'loading' ? 1 : 1.01, backgroundColor: '#E8D5A3' }}
            whileTap={{ scale: 0.99 }}
          >
            {status === 'loading'
              ? (
                <span className="flex items-center justify-center gap-2.5">
                  <span className="w-4 h-4 rounded-full border-2 border-[#070708] border-t-transparent animate-spin" />
                  Envoi en cours...
                </span>
              )
              : f.submit}
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
