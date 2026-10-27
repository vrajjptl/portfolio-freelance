// src/components/PricingPackages.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CheckIcon,
  SparklesIcon,
  InformationCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/solid';

const PricingPackages: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [billingPeriod] = useState<'one-time'>('one-time');

  const packages = [
    {
      id: 'basic',
      name: t('pricing.basic.name'),
      tag: t('pricing.basic.tag'),
      price: '₹4,999',
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
          ? 'नमस्कार विराज, मला ₹4,999 चे बेसिक वेबसाईट पॅकेज सुरू करायचे आहे.'
          : 'Hi Viraj, I want to get started with the ₹4,999 Basic Website Package.',
    },
    {
      id: 'business',
      name: t('pricing.business.name'),
      tag: t('pricing.business.tag'),
      price: '₹8,999',
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
          ? 'नमस्कार विराज, मला ₹8,999 चे व्यावसायिक वेबसाईट पॅकेज (Business Plan) घ्यायचे आहे.'
          : 'Hi Viraj, I want to inquire about the ₹8,999 Business Website Package.',
    },
    {
      id: 'custom',
      name: t('pricing.custom.name'),
      tag: t('pricing.custom.tag'),
      price: '₹14,999+',
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
          ? 'नमस्कार विराज, मला दुकान बिलिंग सॉफ्टवेअर किंवा मोबाईल ॲपबद्दल बोलायचे आहे.'
          : 'Hi Viraj, I want to discuss a Custom POS Billing Software or Mobile App project.',
    },
  ];

  return (
    <section id="pricing" className="py-24 px-4 bg-slate-50 dark:bg-gray-950 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-xs font-bold text-cyan-700 dark:text-cyan-300">
            <span>💰</span>
            <span>{t('pricing.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-gray-100 tracking-tight">
            {t('pricing.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-gray-300">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* 3 Packages Grid */}
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
                <p className="text-sm text-slate-600 dark:text-gray-300 mb-6">
                  {pkg.desc}
                </p>

                <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900 dark:text-gray-100">
                      {pkg.price}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-gray-400 font-medium">
                      / एकरकमी खर्च (One-time)
                    </span>
                  </div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                    ⏱️ डिलिव्हरी: {pkg.timeline}
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-3 mb-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300">
                    समाविष्ट सुविधा:
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
                <span>{t('pricing.ctaPackage')}</span>
                <ArrowRightIcon className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Clear Transparent Cost Details Box */}
        <div className="p-8 rounded-3xl bg-white dark:bg-gray-900/70 border border-slate-200 dark:border-white/10 shadow-lg space-y-6">
          <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-gray-100">
            <InformationCircleIcon className="w-6 h-6 text-cyan-500 flex-shrink-0" />
            <span>{t('pricing.terms.header')}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            {/* Domain & Hosting */}
            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5">
              <div className="font-bold text-slate-900 dark:text-gray-100">
                🌐 डोमेन व होस्टिंग खर्च
              </div>
              <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
                {t('pricing.terms.domainHosting')}
              </p>
            </div>

            {/* Payment Terms */}
            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5">
              <div className="font-bold text-slate-900 dark:text-gray-100">
                💳 पेमेंट अटी (Payment Terms)
              </div>
              <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
                {t('pricing.terms.paymentSchedule')}
              </p>
            </div>

            {/* Revisions */}
            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5">
              <div className="font-bold text-slate-900 dark:text-gray-100">
                🔄 रिव्हिजन्स (बदल)
              </div>
              <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
                {t('pricing.terms.revisions')}
              </p>
            </div>

            {/* GST Details */}
            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5">
              <div className="font-bold text-slate-900 dark:text-gray-100">
                📑 GST व बिलिंग माहिती
              </div>
              <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
                {t('pricing.terms.gst')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPackages;
