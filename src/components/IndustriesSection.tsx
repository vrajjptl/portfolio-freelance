// src/components/IndustriesSection.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const IndustriesSection: React.FC = () => {
  const { t } = useTranslation();

  const industries = [
    {
      icon: '🛒',
      title: t('industries.kirana.title'),
      solution: t('industries.kirana.solution'),
      example: t('industries.kirana.example'),
    },
    {
      icon: '🌾',
      title: t('industries.agro.title'),
      solution: t('industries.agro.solution'),
      example: t('industries.agro.example'),
    },
    {
      icon: '🩺',
      title: t('industries.clinic.title'),
      solution: t('industries.clinic.solution'),
      example: t('industries.clinic.example'),
    },
    {
      icon: '🥛',
      title: t('industries.dairy.title'),
      solution: t('industries.dairy.solution'),
      example: t('industries.dairy.example'),
    },
    {
      icon: '✂️',
      title: t('industries.tailor.title'),
      solution: t('industries.tailor.solution'),
      example: t('industries.tailor.example'),
    },
    {
      icon: '📚',
      title: t('industries.school.title'),
      solution: t('industries.school.solution'),
      example: t('industries.school.example'),
    },
  ];

  return (
    <section className="py-16 px-4 bg-white/50 dark:bg-gray-950/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-xs font-bold text-cyan-700 dark:text-cyan-300">
            <span>🎯</span>
            <span>{t('industries.badge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-gray-100 tracking-tight">
            {t('industries.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-gray-300">
            {t('industries.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {industries.map((ind, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-white dark:bg-gray-900/60 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md hover:border-cyan-500/40 transition-all text-center flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl sm:text-4xl mb-2">{ind.icon}</div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-gray-100 mb-1">
                  {ind.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-gray-300 mb-2 font-medium">
                  {ind.solution}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-white/5 text-[11px] font-mono text-cyan-700 dark:text-cyan-400 font-semibold">
                {ind.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
