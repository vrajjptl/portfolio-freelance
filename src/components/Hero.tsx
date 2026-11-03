// src/components/Hero.tsx
import React, { Suspense, useEffect, useState } from 'react';
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
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebglSupported(!!gl);
    } catch {
      setWebglSupported(false);
    }
  }, []);

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

          {/* Social Profiles & Developer Verification Pills */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 animate-fade-in-up delay-250">
            <span className="text-[11px] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mr-1">
              {i18n.language === 'mr' ? 'सोशल प्रोफाईल्स:' : 'Social / Profiles:'}
            </span>
            <a
              href="https://www.linkedin.com/in/vrajptl/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 hover:border-blue-300 dark:bg-white/5 dark:hover:bg-blue-950/40 dark:border-white/10 dark:hover:border-blue-500/40 dark:text-gray-300 dark:hover:text-blue-400 text-xs font-semibold transition-all duration-300 hover:scale-105"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/vrajjptl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:text-gray-300 dark:hover:text-white text-xs font-semibold transition-all duration-300 hover:scale-105"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
            </a>
            <a
              href="https://www.instagram.com/v___rajj/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-pink-50 text-slate-700 hover:text-pink-600 border border-slate-200 hover:border-pink-300 dark:bg-white/5 dark:hover:bg-pink-950/40 dark:border-white/10 dark:hover:border-pink-500/40 dark:text-gray-300 dark:hover:text-pink-400 text-xs font-semibold transition-all duration-300 hover:scale-105"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>Instagram</span>
            </a>
            <a
              href="https://virajpatil.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-200 hover:border-cyan-400 dark:bg-cyan-950/40 dark:hover:bg-cyan-900/50 dark:border-cyan-500/30 dark:hover:border-cyan-400 dark:text-cyan-300 text-xs font-semibold transition-all duration-300 hover:scale-105"
            >
              <span>🌐 Portfolio ↗</span>
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

        {/* Right Column: 3D Holographic Showcase */}
        <div className="lg:col-span-5 w-full flex justify-center animate-fade-in-up delay-200">
          <div className="relative w-full max-w-[460px] h-[360px] sm:h-[420px] rounded-3xl bg-white/80 dark:bg-gradient-to-b dark:from-white/[0.06] dark:to-transparent p-1 border border-slate-200/90 dark:border-white/10 shadow-2xl shadow-cyan-500/10 backdrop-blur-md overflow-hidden transition-colors duration-300">
            {/* Ambient inner glow */}
            <div className="absolute -top-20 -right-20 w-44 h-44 bg-cyan-500/15 dark:bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-purple-500/15 dark:bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* 3D Scene container */}
            <div className="w-full h-full rounded-[22px] overflow-hidden bg-slate-900/5 dark:bg-gray-950/60">
              {webglSupported ? (
                <Suspense
                  fallback={
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
                      <span className="text-xs text-slate-400 dark:text-gray-400 font-mono">Loading 3D Core...</span>
                    </div>
                  }
                >
                  <ThreeDScene />
                </Suspense>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 animate-glow-pulse flex items-center justify-center mb-4">
                    <span className="text-4xl">⚡</span>
                  </div>
                  <h4 className="text-base font-semibold text-slate-800 dark:text-gray-200">Interactive Digital Hub</h4>
                  <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 max-w-xs">Clean, fast digital solutions for modern businesses.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
