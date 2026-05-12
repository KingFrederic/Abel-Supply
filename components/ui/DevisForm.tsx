'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useT } from '@/lib/i18n/provider';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function DevisForm() {
  const t = useT();
  const f = t.contact.form;
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('/api/devis', {
        method: 'POST',
        body: data,
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl border border-green/20 bg-green/5 flex flex-col items-center justify-center text-center gap-4 min-h-[320px]"
        >
          <div className="w-12 h-12 rounded-full bg-green/20 flex items-center justify-center text-green">
            <CheckIcon />
          </div>
          <p className="text-white font-display font-semibold text-lg">{f.success}</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
          noValidate
        >
          {/* Honeypot */}
          <input type="text" name="company" className="hidden" aria-hidden="true" tabIndex={-1} autoComplete="off" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-muted text-sm mb-1.5">{f.name} *</label>
              <input
                type="text"
                name="name"
                required
                className="w-full bg-bg border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber/50 transition-colors placeholder:text-white/20"
                placeholder="Abel Idowu"
              />
            </div>
            <div>
              <label className="block text-text-muted text-sm mb-1.5">{f.phone} *</label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full bg-bg border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber/50 transition-colors placeholder:text-white/20"
                placeholder="+225 07 00 00 00 00"
              />
            </div>
          </div>

          <div>
            <label className="block text-text-muted text-sm mb-1.5">{f.message} *</label>
            <textarea
              name="message"
              required
              rows={4}
              className="w-full bg-bg border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber/50 transition-colors placeholder:text-white/20 resize-none"
              placeholder="Villa R+2, fondations + charpente..."
            />
          </div>

          <div>
            <label className="block text-text-muted text-sm mb-1.5">{f.file}</label>
            <input
              type="file"
              name="file"
              accept="application/pdf,image/*"
              className="w-full bg-bg border border-white/10 rounded-xl px-4 py-3 text-text-muted text-sm focus:outline-none focus:border-amber/50 transition-colors file:mr-3 file:bg-bg-elev file:border-0 file:text-text-muted file:text-xs file:rounded-lg file:px-3 file:py-1.5 file:cursor-pointer cursor-pointer"
            />
          </div>

          {status === 'error' && (
            <p className="text-red-400 text-sm">{f.error}</p>
          )}

          <motion.button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-amber text-bg font-display font-bold text-base py-4 rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {status === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-bg border-t-transparent animate-spin" />
                Envoi...
              </span>
            ) : f.submit}
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
