// src/components/PricingPackages.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  CheckIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/solid';

const PricingPackages: React.FC = () => {
  const { t, i18n } = useTranslation();

  const packages = [
    {
      id: 'basic',
      name: t('pricing.basic.name'),
      tag: t('pricing.basic.tag'),
      priceLabel: t('pricing.basic.priceLabel'),
      timeline: t('pricing.basic.timeline'),
      desc: t('pricing.basic.desc'),
      isPopular: false,
      features: [
        t('pricing.basic.f1'),
        t('pricing.basic.f2'),
        t('pricing.basic.f3'),
        t('pricing.basic.f4'),
        t('pricing.basic.f5'),
      ],
      waMessage:
        i18n.language === 'mr'
          ? 'नमस्कार विराज, मला "बेसिक स्टार्टर" वेबसाईट पॅकेजविषयी माहिती व कोटेशन हवे आहे.'
          : 'Hi Viraj, I want to inquire about the Basic Starter website package for my business.',
    },
    {
      id: 'business',
      name: t('pricing.business.name'),
      tag: t('pricing.business.tag'),
      priceLabel: t('pricing.business.priceLabel'),
      timeline: t('pricing.business.timeline'),
      desc: t('pricing.business.desc'),
      isPopular: true,
      features: [
        t('pricing.business.f1'),
        t('pricing.business.f2'),
        t('pricing.business.f3'),
        t('pricing.business.f4'),
        t('pricing.business.f5'),
        t('pricing.business.f6'),
      ],
      waMessage:
        i18n.language === 'mr'
          ? 'नमस्कार विराज, मला "बिझनेस स्टँडर्ड" पॅकेजविषयी सविस्तर माहिती व कोटेशन हवे आहे.'
          : 'Hi Viraj, I would like to discuss the Business Standard package for my business.',
    },
    {
      id: 'custom',
      name: t('pricing.custom.name'),
      tag: t('pricing.custom.tag'),
      priceLabel: t('pricing.custom.priceLabel'),
      timeline: t('pricing.custom.timeline'),
      desc: t('pricing.custom.desc'),
      isPopular: false,
      features: [
        t('pricing.custom.f1'),
        t('pricing.custom.f2'),
        t('pricing.custom.f3'),
        t('pricing.custom.f4'),
        t('pricing.custom.f5'),
        t('pricing.custom.f6'),
      ],
      waMessage:
        i18n.language === 'mr'
          ? 'नमस्कार विराज, मला कस्टम दुकान बिलिंग सॉफ्टवेअर किंवा मोबाईल ॲपबद्दल चर्चा करायची आहे.'
          : 'Hi Viraj, I want to discuss a Custom POS Billing Software or Mobile App project.',
    },
  ];

  return (
    <section id="pricing" className="py-24 px-4 bg-slate-50 dark:bg-gray-950 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-xs font-bold text-cyan-700 dark:text-cyan-300">
            <span>✨</span>
            <span>{t('pricing.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-gray-100 tracking-tight">
            {t('pricing.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-gray-300">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* 3 Packages Grid - Clean, Super Simple, No Clutter */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-14">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                pkg.isPopular
                  ? 'bg-white dark:bg-gray-900 border-2 border-cyan-500 shadow-2xl shadow-cyan-500/20 lg:-translate-y-2'
                  : 'bg-white dark:bg-gray-900/60 border border-slate-200 dark:border-white/10 shadow-lg'
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-md flex items-center gap-1">
                  <SparklesIcon className="w-3.5 h-3.5" />
                  <span>{pkg.tag}</span>
                </div>
              )}

              <div>
                {!pkg.isPopular && (
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                    {pkg.tag}
                  </span>
                )}
                <h3 className="text-2xl font-bold text-slate-900 dark:text-gray-100 mt-1 mb-2">
                  {pkg.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {pkg.desc}
                </p>

                {/* Scope & Timeline Header */}
                <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 space-y-1.5">
                  <div className="inline-block px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-xs font-bold text-cyan-700 dark:text-cyan-300">
                    {pkg.priceLabel}
                  </div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5 pt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{pkg.timeline}</span>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-3 mb-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300">
                    {i18n.language === 'mr' ? 'समाविष्ट बाबी:' : 'What is included:'}
                  </div>
                  {pkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-gray-300">
                      <CheckIcon className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <a
                href={`https://wa.me/917414912464?text=${encodeURIComponent(pkg.waMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3.5 px-6 rounded-2xl text-center font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  pkg.isPopular
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 hover:scale-[1.02]'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-white/10 dark:hover:bg-white/15 dark:text-gray-100 hover:scale-[1.02]'
                }`}
              >
                <ChatBubbleLeftRightIcon className="w-4 h-4" />
                <span>{t('pricing.ctaPackage')}</span>
                <ArrowRightIcon className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Super Simple 1-Box Transparency Card */}
        <div className="p-8 rounded-3xl bg-white dark:bg-gray-900/70 border border-slate-200 dark:border-white/10 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-gray-100">
            <ShieldCheckIcon className="w-6 h-6 text-emerald-500 flex-shrink-0" />
            <span>{t('pricing.terms.header')}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600 dark:text-gray-300">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 flex items-start gap-2.5">
              <span className="text-cyan-600 font-bold">✓</span>
              <span>{t('pricing.terms.paymentSchedule')}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 flex items-start gap-2.5">
              <span className="text-cyan-600 font-bold">✓</span>
              <span>{t('pricing.terms.domainHosting')}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 flex items-start gap-2.5">
              <span className="text-cyan-600 font-bold">✓</span>
              <span>{t('pricing.terms.revisions')}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 flex items-start gap-2.5">
              <span className="text-cyan-600 font-bold">✓</span>
              <span>{t('pricing.terms.gst')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPackages;
