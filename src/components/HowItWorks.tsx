// src/components/HowItWorks.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

interface HowItWorksStep {
  step: string;
  title: string;
  timeline: string;
  desc: string;
}

const stepEmojis = ['💬', '📋', '💻', '🚀'];

const HowItWorks: React.FC = () => {
  const { t } = useTranslation();
  const steps = t('howItWorks.steps', { returnObjects: true }) as HowItWorksStep[];

  return (
    <section id="how-it-works" className="relative py-24 px-4 overflow-hidden scroll-mt-20">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-xs font-semibold text-cyan-700 dark:text-cyan-300 shadow-sm">
            <span>⚡</span>
            <span>TRANSPARENT PROCESS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="gradient-text">{t('howItWorks.title')}</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-gray-400 font-normal">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* 4-Step Process Timeline Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="group relative p-7 rounded-3xl bg-white/80 dark:bg-gray-900/40 hover:bg-white dark:hover:bg-gray-900/70 border border-slate-200/80 dark:border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between shadow-md dark:shadow-none hover:shadow-xl hover:shadow-cyan-500/10 hover-lift"
            >
              <div>
                {/* Step Top Bar: Step Number & Timeline Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 font-mono">
                    {st.step}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-cyan-700 dark:text-cyan-300">
                    {st.timeline}
                  </span>
                </div>

                {/* Step Icon */}
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {stepEmojis[idx % stepEmojis.length]}
                </div>

                {/* Step Title */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-gray-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors mb-2">
                  {st.title}
                </h3>

                {/* Step Description */}
                <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                  {st.desc}
                </p>
              </div>

              {/* Bottom indicator line */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-[11px] text-slate-500 dark:text-gray-400 font-medium">Clear & Simple</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
