// src/components/TrustPolicies.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ShieldCheckIcon,
  ClockIcon,
  ArrowPathIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';

const TrustPolicies: React.FC = () => {
  const { t } = useTranslation();

  const policies = [
    {
      icon: <ClockIcon className="w-6 h-6 text-cyan-500" />,
      title: t('trust.timelines.title'),
      desc: t('trust.timelines.desc'),
    },
    {
      icon: <ArrowPathIcon className="w-6 h-6 text-emerald-500" />,
      title: t('trust.refund.title'),
      desc: t('trust.refund.desc'),
    },
    {
      icon: <LockClosedIcon className="w-6 h-6 text-indigo-500" />,
      title: t('trust.privacy.title'),
      desc: t('trust.privacy.desc'),
    },
    {
      icon: <ShieldCheckIcon className="w-6 h-6 text-purple-500" />,
      title: t('trust.support.title'),
      desc: t('trust.support.desc'),
    },
  ];

  return (
    <section className="py-16 px-4 bg-slate-100/50 dark:bg-gray-900/20 border-y border-slate-200/80 dark:border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 text-xs font-bold text-emerald-700 dark:text-emerald-300">
            <span>🛡️</span>
            <span>{t('trust.badge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-gray-100 tracking-tight">
            {t('trust.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-gray-300">
            {t('trust.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {policies.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-gray-900/60 border border-slate-200 dark:border-white/10 shadow-sm space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 flex items-center justify-center">
                {p.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-gray-100">
                {p.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustPolicies;
