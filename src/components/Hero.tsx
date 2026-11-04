// src/components/Hero.tsx
import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDownIcon, PhoneIcon } from '@heroicons/react/24/outline';

const ThreeDScene = React.lazy(() => import('./ThreeDScene'));

const Hero: React.FC = () => {
  const { t, i18n } = useTranslation();
  const waNumber = '917414912464';
  const defaultText =
    i18n.language === 'mr'
      ? 'नमस्कार DeliverNow, मला माझ्या व्यवसायासाठी वेबसाईट किंवा ॲप हवी आहे. सविस्तर माहिती हवी होती.'
      : 'Hi DeliverNow, I want a website or app for my business. I would like to discuss details.';
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(defaultText)}`;

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-12 pb-20 px-4 sm:px-6 max-w-6xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Value Proposition & Actions */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          {/* Quiet Status Badge */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-white/[0.06] text-xs font-normal text-zinc-700 dark:text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>{t('hero.badge')}</span>
          </div>

          {/* Headline: Solid primary text, no gradient text, weight 500 */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.18] text-zinc-950 dark:text-zinc-50">
            {t('hero.title')}
          </h1>

          {/* Subtitle: Calm, clear spacing */}
          <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-xl font-normal leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* Actions: One primary, one secondary, one quiet call link */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 text-xs font-medium transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>{t('hero.ctaWhatsApp')}</span>
            </a>

            <button
              onClick={scrollToPricing}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-colors"
            >
              <span>{t('hero.ctaEstimate')}</span>
              <ArrowDownIcon className="w-3.5 h-3.5" />
            </button>

            <a
              href="tel:+917414912464"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 text-xs transition-colors"
            >
              <PhoneIcon className="w-3.5 h-3.5" />
              <span>{t('hero.ctaCall')}</span>
            </a>
          </div>

          {/* Honest Stats Grid: Single neutral ramp, tabular figures */}
          <div className="w-full pt-8 border-t border-black/[0.06] dark:border-white/[0.07] grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <div className="text-xl font-medium text-zinc-950 dark:text-zinc-100 tabular-nums">
                {i18n.language === 'mr' ? '३+ वर्षे' : '3+ Years'}
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {t('hero.stats.expSub')}
              </div>
            </div>

            <div>
              <div className="text-xl font-medium text-zinc-950 dark:text-zinc-100 tabular-nums">
                {i18n.language === 'mr' ? '< २ तास' : '< 2 Hours'}
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {i18n.language === 'mr' ? 'प्रतिसाद वेळ' : 'Response time'}
              </div>
            </div>

            <div>
              <div className="text-xl font-medium text-zinc-950 dark:text-zinc-100 tabular-nums">
                {i18n.language === 'mr' ? '३ ते १० दिवस' : '3-10 Days'}
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {t('hero.stats.speedSub')}
              </div>
            </div>

            <div>
              <div className="text-xl font-medium text-zinc-950 dark:text-zinc-100 tabular-nums">
                {i18n.language === 'mr' ? 'थेट टीम' : 'Direct Team'}
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {i18n.language === 'mr' ? 'शून्य मध्यस्थ' : 'Zero middleman'}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Grounded Product Preview */}
        <div className="lg:col-span-5 w-full flex justify-center items-center">
          <div className="w-full max-w-[440px]">
            <Suspense
              fallback={
                <div className="w-full h-80 flex flex-col items-center justify-center gap-2 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.08]">
                  <span className="text-xs text-zinc-400 font-mono">Loading preview</span>
                </div>
              }
            >
              <ThreeDScene />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
