// src/components/Hero.tsx
import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { PhoneIcon } from '@heroicons/react/24/outline';

const ThreeDScene = React.lazy(() => import('./ThreeDScene'));

const Hero: React.FC = () => {
  const { t, i18n } = useTranslation();
  const waNumber = '917414912464';
  const defaultText =
    i18n.language === 'mr'
      ? 'नमस्कार DeliverNow, मला माझ्या व्यवसायासाठी वेबसाईट/ॲप हवी आहे. अधिक माहिती हवी होती.'
      : 'Hi DeliverNow, I want a website/app for my business. I would like to discuss details.';
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(defaultText)}`;
  const telLink = 'tel:+917414912464';

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden pt-6 pb-16 px-4">
      {/* Background Ambience: subtle cyber grid & glow */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30 dark:opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-500/10 dark:bg-purple-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Value Proposition & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          {/* Top Pill Badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 backdrop-blur-md text-xs sm:text-sm font-bold text-cyan-700 dark:text-cyan-300 shadow-md shadow-cyan-500/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>{t('hero.badge')}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              <span>{t('hero.ratingBadge')}</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.18] animate-fade-in-up delay-75 text-slate-900 dark:text-white">
            <span className="gradient-text">{t('hero.title')}</span>
          </h1>

          {/* Subtext: High contrast and legible in bright sunlight */}
          <p className="text-base sm:text-lg text-slate-700 dark:text-gray-200 max-w-2xl font-medium leading-relaxed animate-fade-in-up delay-150">
            {t('hero.subtitle')}
          </p>

          {/* Action Buttons: 2 Clear CTAs to eliminate choice overload */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2 animate-fade-in-up delay-200">
            {/* Primary WhatsApp Action */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-base shadow-xl shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>{t('hero.ctaWhatsApp')}</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-medium">
                {i18n.language === 'mr' ? 'थेट उत्तर' : 'Fast Reply'}
              </span>
            </a>

            {/* Secondary: View Packages & Pricing */}
            <button
              onClick={scrollToPricing}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 dark:bg-white/10 dark:hover:bg-white/15 dark:border-white/10 dark:text-gray-100 font-bold text-sm sm:text-base shadow-sm hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>{t('hero.ctaEstimate')}</span>
              <span>↓</span>
            </button>

            {/* Direct Phone Call shortcut */}
            <a
              href={telLink}
              className="inline-flex items-center gap-1.5 px-3 py-3 rounded-full text-slate-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-cyan-400 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
            >
              <PhoneIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>{t('hero.ctaCall')}</span>
            </a>
          </div>

          {/* Honest Stats Grid: No overclaims, 100% credible & bilingual */}
          <div className="w-full pt-6 border-t border-slate-200 dark:border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-in-up delay-300">
            <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 shadow-sm">
              <div className="text-xl sm:text-2xl font-extrabold text-cyan-600 dark:text-cyan-400">
                {i18n.language === 'mr' ? '३+ वर्षे' : '3+ Years'}
              </div>
              <div className="text-xs text-slate-700 dark:text-gray-200 font-medium">{t('hero.stats.expSub')}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 shadow-sm">
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {i18n.language === 'mr' ? '< २ तासांत' : '< 2 Hours'}
              </div>
              <div className="text-xs text-slate-700 dark:text-gray-200 font-medium">
                {i18n.language === 'mr' ? 'सकाळी ९ ते रात्री ९ उत्तर' : 'Reply 9 AM to 9 PM'}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 shadow-sm">
              <div className="text-xl sm:text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                {i18n.language === 'mr' ? 'किफायतशीर' : 'Affordable'}
              </div>
              <div className="text-xs text-slate-700 dark:text-gray-200 font-medium">{t('hero.stats.pricingSub')}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 shadow-sm">
              <div className="text-xl sm:text-2xl font-extrabold text-purple-600 dark:text-purple-400">
                {i18n.language === 'mr' ? 'थेट संवाद' : 'Direct Contact'}
              </div>
              <div className="text-xs text-slate-700 dark:text-gray-200 font-medium">
                {i18n.language === 'mr' ? 'कोणताही मध्यस्थ नाही' : 'Zero Middlemen'}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Spatial Product Showcase */}
        <div className="lg:col-span-5 w-full flex justify-center items-center animate-fade-in-up delay-200">
          <div className="relative w-full max-w-[440px]">
            {/* Ambient background glow */}
            <div className="absolute -top-10 -right-10 w-60 h-60 bg-cyan-500/20 dark:bg-cyan-500/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-indigo-500/15 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Interactive 3D Spatial Device */}
            <Suspense
              fallback={
                <div className="w-full h-80 flex flex-col items-center justify-center gap-3 rounded-3xl bg-slate-900/60 border border-white/10">
                  <div className="w-10 h-10 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
                  <span className="text-xs text-slate-400 font-mono">Loading Preview...</span>
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
