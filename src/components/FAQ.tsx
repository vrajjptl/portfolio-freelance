// src/components/FAQ.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface FAQItem {
  q: string;
  a: string;
}

const FAQ: React.FC = () => {
  const { t, i18n } = useTranslation();
  const items = t('faq.items', { returnObjects: true }) as FAQItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto w-full scroll-mt-14">
      {/* Section Header */}
      <div className="mb-10 space-y-2">
        <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          FAQ
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-950 dark:text-zinc-50">
          {t('faq.title')}
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
          {t('faq.subtitle')}
        </p>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-2.5">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          const panelId = `faq-panel-${idx}`;
          const buttonId = `faq-btn-${idx}`;
          return (
            <div
              key={idx}
              className="rounded-xl bg-white dark:bg-[#11141c] border border-black/[0.08] dark:border-white/[0.08] overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
                  <span className="text-zinc-400 dark:text-zinc-500 font-mono text-xs">{`0${idx + 1}`}</span>
                  <span>{item.q}</span>
                </span>
                <ChevronDownIcon
                  className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-cyan-600 dark:text-cyan-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-black/[0.04] dark:border-white/[0.04] animate-in fade-in duration-200"
                >
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Additional help note */}
      <div className="mt-8 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-black/[0.06] dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span className="text-zinc-600 dark:text-zinc-400">
          {i18n.language === 'mr'
            ? 'इथे नसलेला वेगळा प्रश्न आहे? थेट विचारा:'
            : 'Have a question not listed here? Ask directly:'}
        </span>
        <a
          href={`https://wa.me/917414912464?text=${encodeURIComponent(
            i18n.language === 'mr'
              ? 'नमस्कार DeliverNow, मला एक प्रश्न विचारायचा होता.'
              : 'Hi DeliverNow, I have a question about your digital services.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-medium transition-colors"
        >
          <span>{i18n.language === 'mr' ? 'WhatsApp वर विचारा' : 'Ask DeliverNow'}</span>
          <ArrowRightIcon className="w-3 h-3" />
        </a>
      </div>
    </section>
  );
};

export default FAQ;
