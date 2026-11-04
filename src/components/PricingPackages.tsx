// src/components/PricingPackages.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  CheckIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

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
          ? 'नमस्कार DeliverNow, मला "स्टार्टर" पॅकेजविषयी सविस्तर माहिती व कोटेशन हवे आहे.'
          : 'Hi DeliverNow, I want to inquire about the Starter package for my business.',
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
          ? 'नमस्कार DeliverNow, मला "बिझनेस" पॅकेजविषयी सविस्तर माहिती व कोटेशन हवे आहे.'
          : 'Hi DeliverNow, I would like to discuss the Business package for my business.',
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
          ? 'नमस्कार DeliverNow, मला सानुकूल दुकान बिलिंग सॉफ्टवेअर किंवा मोबाईल ॲपबद्दल चर्चा करायची आहे.'
          : 'Hi DeliverNow, I want to discuss a custom POS billing or mobile app project.',
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto w-full scroll-mt-14">
      {/* Section Header */}
      <div className="max-w-2xl mb-12 space-y-2">
        <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          {t('pricing.badge')}
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-950 dark:text-zinc-50">
          {t('pricing.title')}
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
          {t('pricing.subtitle')}
        </p>
      </div>

      {/* 3 Packages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`rounded-xl p-6 flex flex-col justify-between bg-white dark:bg-[#11141c] border ${
              pkg.isPopular
                ? 'border-zinc-900 dark:border-zinc-400 shadow-sm'
                : 'border-black/[0.08] dark:border-white/[0.08]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  {pkg.tag}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {pkg.timeline}
                </span>
              </div>

              <h3 className="text-lg font-medium text-zinc-950 dark:text-zinc-100 mb-1">
                {pkg.name}
              </h3>

              <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
                {pkg.priceLabel}
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-normal mb-6 leading-relaxed">
                {pkg.desc}
              </p>

              <div className="space-y-2.5 mb-6 text-xs text-zinc-700 dark:text-zinc-300">
                {pkg.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
              <a
                href={`https://wa.me/917414912464?text=${encodeURIComponent(pkg.waMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-2.5 px-3 rounded-lg text-xs font-medium text-center flex items-center justify-center gap-1.5 transition-colors ${
                  pkg.isPopular
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100'
                }`}
              >
                <span>{t('pricing.ctaPackage')}</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Transparent terms */}
      <div className="p-5 rounded-xl bg-white dark:bg-[#11141c] border border-black/[0.08] dark:border-white/[0.08]">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-900 dark:text-zinc-100 mb-4">
          <ShieldCheckIcon className="w-4 h-4 text-emerald-600" />
          <span>{t('pricing.terms.header')}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-600 dark:text-zinc-400">
          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-black/[0.04] dark:border-white/[0.04]">
            {t('pricing.terms.domainHosting')}
          </div>
          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-black/[0.04] dark:border-white/[0.04]">
            {t('pricing.terms.paymentSchedule')}
          </div>
          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-black/[0.04] dark:border-white/[0.04]">
            {t('pricing.terms.revisions')}
          </div>
          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-black/[0.04] dark:border-white/[0.04]">
            {t('pricing.terms.gst')}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPackages;
