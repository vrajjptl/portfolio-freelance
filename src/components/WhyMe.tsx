// src/components/WhyMe.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  CodeBracketSquareIcon,
  BanknotesIcon,
  ChatBubbleLeftRightIcon,
  LifebuoyIcon,
} from '@heroicons/react/24/outline';

interface WhyMePoint {
  title: string;
  desc: string;
}

const icons = [
  <CodeBracketSquareIcon className="w-8 h-8 text-cyan-500" />,
  <BanknotesIcon className="w-8 h-8 text-emerald-500" />,
  <ChatBubbleLeftRightIcon className="w-8 h-8 text-blue-500" />,
  <LifebuoyIcon className="w-8 h-8 text-purple-500" />,
];

const WhyMe: React.FC = () => {
  const { t } = useTranslation();
  const points = t('whyMe.points', { returnObjects: true }) as WhyMePoint[];

  return (
    <section id="why-me" className="relative py-24 px-4 overflow-hidden scroll-mt-20">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-xs font-semibold text-cyan-700 dark:text-cyan-300 shadow-sm">
            <span>🤝</span>
            <span>WHY CHOOSE ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="gradient-text">{t('whyMe.title')}</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-gray-400 font-normal">
            {t('whyMe.subtitle')}
          </p>
        </div>

        {/* 2x2 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {points.map((p, i) => (
            <div
              key={i}
              className="group p-8 rounded-3xl bg-white/80 dark:bg-gray-900/40 hover:bg-white dark:hover:bg-gray-900/70 border border-slate-200/80 dark:border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col sm:flex-row items-start gap-6 shadow-md dark:shadow-none hover:shadow-xl hover:shadow-cyan-500/10 hover-lift"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-300">
                {icons[i % icons.length]}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-gray-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyMe;
