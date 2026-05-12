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

  const inputCls = 'w-full bg-bg border border-white/8 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-amber/40 focus:bg-bg-elev transition-all placeholder:text-text-dim';

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="min-h-[300px] flex flex-col items-center justify-center text-center gap-5 py-10"
        >
          <div className="w-14 h-14 rounded-full bg-green/15 border border-green/30 flex items-center justify-center text-green">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div>
            <p className="text-white font-display font-bold text-xl mb-2">{f.success}</p>
            <p className="text-text-muted text-sm">Abel vous répondra sous 24 heures.</p>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
          noValidate
        >
          <input type="text" name="company" className="hidden" aria-hidden tabIndex={-1} autoComplete="off" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-text-muted text-xs font-display uppercase tracking-wider">{f.name} *</label>
              <input type="text" name="name" required placeholder="Abel Idowu" className={inputCls} />
            </div>
            <div className="space-y-1.5">
              <label className="text-text-muted text-xs font-display uppercase tracking-wider">{f.phone} *</label>
              <input type="tel" name="phone" required placeholder="+225 07 00 00 00 00" className={inputCls} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-text-muted text-xs font-display uppercase tracking-wider">{f.message} *</label>
            <textarea
              name="message" required rows={4}
              placeholder="Villa R+2, fondations + charpente + plomberie..."
              className={`${inputCls} resize-none`}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-text-muted text-xs font-display uppercase tracking-wider">{f.file}</label>
            <div className="relative">
              <input
                type="file" name="file" accept="application/pdf,image/*"
                className="w-full bg-bg border border-white/8 rounded-xl px-4 py-3 text-text-muted text-sm
                  focus:outline-none focus:border-amber/40 transition-all
                  file:mr-3 file:bg-bg-card file:border file:border-white/10 file:text-text-muted file:text-xs
                  file:rounded-lg file:px-3 file:py-1.5 file:cursor-pointer cursor-pointer
                  hover:border-white/15"
              />
            </div>
          </div>

          {status === 'error' && (
            <p className="text-red-400 text-sm bg-red-400/8 border border-red-400/20 rounded-xl px-4 py-3">
              {f.error}
            </p>
          )}

          <motion.button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-amber hover:bg-amber-400 text-bg font-display font-bold text-base py-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            whileHover={{ scale: status === 'loading' ? 1 : 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {status === 'loading'
              ? <span className="flex items-center justify-center gap-2.5">
                  <span className="w-4 h-4 rounded-full border-2 border-bg border-t-transparent animate-spin" />
                  Envoi en cours...
                </span>
              : f.submit}
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
