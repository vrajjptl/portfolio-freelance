// src/components/ProblemSection.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  MagnifyingGlassIcon,
  DocumentTextIcon,
  BanknotesIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const ProblemSection: React.FC = () => {
  const { t } = useTranslation();

  const problems = [
    {
      icon: <MagnifyingGlassIcon className="w-8 h-8 text-rose-500" />,
      bg: 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400',
      title: t('problems.item1.title'),
      desc: t('problems.item1.desc'),
      impact: t('problems.item1.impact'),
    },
    {
      icon: <DocumentTextIcon className="w-8 h-8 text-amber-500" />,
      bg: 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400',
      title: t('problems.item2.title'),
      desc: t('problems.item2.desc'),
      impact: t('problems.item2.impact'),
    },
    {
      icon: <BanknotesIcon className="w-8 h-8 text-cyan-500" />,
      bg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-600 dark:text-cyan-400',
      title: t('problems.item3.title'),
      desc: t('problems.item3.desc'),
      impact: t('problems.item3.impact'),
    },
  ];

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="problems" className="relative py-20 px-4 bg-slate-100/60 dark:bg-gray-900/30 border-y border-slate-200/80 dark:border-white/5 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/30 text-xs font-bold text-rose-700 dark:text-rose-400">
            <span>⚠️</span>
            <span>{t('problems.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-gray-100 tracking-tight">
            {t('problems.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-gray-300 font-medium leading-relaxed">
            {t('problems.subtitle')}
          </p>
        </div>

        {/* 3 Relatable Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {problems.map((prob, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-white dark:bg-gray-900/70 border border-slate-200 dark:border-white/10 shadow-lg shadow-slate-200/40 dark:shadow-none hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border ${prob.bg}`}>
                  {prob.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-gray-100 mb-3 leading-snug">
                  {prob.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed mb-4">
                  {prob.desc}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-white/5 text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                <span>नुकसान:</span>
                <span>{prob.impact}</span>
              </div>
            </div>
          ))}
        </div>

        {/* The Solution Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-emerald-500/10 border border-cyan-500/30 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left space-y-1">
            <div className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider">
              {t('problems.solutionBadge')}
            </div>
            <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-gray-100">
              {t('problems.solutionTitle')}
            </div>
          </div>
          <button
            onClick={scrollToServices}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md shadow-cyan-600/30 hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
          >
            <span>{t('problems.solutionCTA')}</span>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
