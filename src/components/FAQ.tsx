// src/components/FAQ.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface FAQItem {
  q: string;
  a: string;
}

const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const items = t('faq.items', { returnObjects: true }) as FAQItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="relative py-24 px-4 overflow-hidden scroll-mt-20">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-xs font-semibold text-cyan-700 dark:text-cyan-300 shadow-sm">
            <span>❓</span>
            <span>GOT QUESTIONS?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="gradient-text">{t('faq.title')}</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-gray-400 font-normal">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-3xl bg-white/80 dark:bg-gray-900/40 border border-slate-200/80 dark:border-white/10 hover:border-cyan-500/30 shadow-sm dark:shadow-none transition-all duration-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-gray-100 flex items-center gap-3">
                    <span className="text-cyan-600 dark:text-cyan-400 font-mono text-sm">Q{idx + 1}.</span>
                    <span>{item.q}</span>
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-cyan-500/20 border-cyan-500/40 text-cyan-600 dark:text-cyan-400' : 'text-slate-500 dark:text-gray-400'
                    }`}
                  >
                    <ChevronDownIcon className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-slate-600 dark:text-gray-300 leading-relaxed border-t border-slate-100 dark:border-white/5 animate-fade-in-up">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional help box */}
        <div className="mt-12 p-6 rounded-3xl bg-white dark:bg-gradient-to-r dark:from-gray-900/80 dark:to-gray-950 border border-slate-200 dark:border-white/10 shadow-md dark:shadow-none text-center flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors duration-300">
          <div className="text-xs text-slate-600 dark:text-gray-300 font-medium">
            Have a different question not listed here? Ask directly:
          </div>
          <a
            href="https://wa.me/917414912464?text=Hi%20Viraj%2C%20I%20have%20a%20question%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/20 dark:hover:bg-emerald-500/30 dark:border-emerald-500/40 dark:text-emerald-300 font-semibold text-xs transition-all"
          >
            <span>Ask Viraj on WhatsApp</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
