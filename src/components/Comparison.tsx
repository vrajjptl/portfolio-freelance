// src/components/Comparison.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

interface ComparisonItem {
  metric: string;
  agency: string;
  me: string;
}

const Comparison: React.FC = () => {
  const { t, i18n } = useTranslation();
  const items = t('comparison.items', { returnObjects: true }) as ComparisonItem[];

  return (
    <section id="comparison" className="relative py-24 px-4 overflow-hidden scroll-mt-20">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[700px] h-[400px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-xs font-semibold text-cyan-700 dark:text-cyan-300 shadow-sm">
            <span>⚖️</span>
            <span>HONEST COMPARISON</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="gradient-text">{t('comparison.title')}</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-gray-400 font-normal">
            {t('comparison.subtitle')}
          </p>
        </div>

        {/* Comparison Table / Card Container */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-white dark:bg-gray-900/40 border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden backdrop-blur-sm transition-colors duration-300">
          {/* Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-slate-200 dark:border-white/10 text-center md:text-left bg-slate-50 dark:bg-white/[0.02]">
            <div className="md:col-span-4 p-5 font-bold text-sm text-slate-600 dark:text-gray-400 uppercase tracking-wider hidden md:block">
              Feature / Expectation
            </div>
            <div className="md:col-span-4 p-5 font-bold text-sm text-red-600 dark:text-red-400 uppercase tracking-wider border-t md:border-t-0 md:border-l border-slate-200 dark:border-white/10 flex items-center justify-center md:justify-start gap-2">
              <XCircleIcon className="w-5 h-5 text-red-500" />
              <span>{t('comparison.agencyLabel')}</span>
            </div>
            <div className="md:col-span-4 p-5 font-bold text-sm text-cyan-700 dark:text-cyan-400 uppercase tracking-wider border-t md:border-t-0 md:border-l border-slate-200 dark:border-white/10 bg-cyan-50/70 dark:bg-cyan-950/30 flex items-center justify-center md:justify-start gap-2">
              <CheckCircleIcon className="w-5 h-5 text-cyan-500" />
              <span>{t('comparison.meLabel')}</span>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-100 dark:divide-white/5">
            {items.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 transition-colors hover:bg-slate-50/60 dark:hover:bg-white/[0.02]"
              >
                {/* Metric Title */}
                <div className="md:col-span-4 p-5 font-bold text-slate-900 dark:text-gray-200 text-sm flex items-center">
                  <span>{row.metric}</span>
                </div>

                {/* Big Agency Column */}
                <div className="md:col-span-4 p-5 text-xs sm:text-sm text-slate-600 dark:text-gray-400 border-t md:border-t-0 md:border-l border-slate-100 dark:border-white/5 flex items-start gap-2 bg-red-50/30 dark:bg-red-950/[0.04]">
                  <span className="text-red-500 font-bold md:hidden">Agency:</span>
                  <span>{row.agency}</span>
                </div>

                {/* Viraj Patil Column */}
                <div className="md:col-span-4 p-5 text-xs sm:text-sm text-cyan-900 dark:text-cyan-200 font-medium border-t md:border-t-0 md:border-l border-slate-100 dark:border-white/5 bg-cyan-50/40 dark:bg-cyan-950/20 flex items-start gap-2">
                  <span className="text-cyan-600 font-bold md:hidden">Viraj:</span>
                  <span>{row.me}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Trust Banner */}
          <div className="p-6 bg-slate-50 dark:bg-gradient-to-r dark:from-cyan-950/40 dark:via-blue-950/30 dark:to-gray-950 border-t border-slate-200 dark:border-white/10 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-800 dark:text-gray-200 font-bold">
              {i18n.language === 'mr'
                ? 'पैशांची बचत करून ३ ते १० दिवसांत दर्जेदार डिजिटल सिस्टीम हवी आहे?'
                : 'Ready to save money and launch a high-quality digital system in 3-10 days?'}
            </div>
            <a
              href={`https://wa.me/917414912464?text=${encodeURIComponent(
                i18n.language === 'mr'
                  ? 'नमस्कार विराज, मला एजन्सीपेक्षा तुमच्यासोबत थेट काम करायचे आहे. चर्चा करूया.'
                  : 'Hi Viraj, I would like to consult with you directly instead of dealing with an agency.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-xs shadow-md shadow-emerald-500/25 hover:scale-105 transition-all whitespace-nowrap"
            >
              {i18n.language === 'mr' ? 'WhatsApp वर मोफत चर्चा करा →' : 'Free Consultation on WhatsApp →'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
