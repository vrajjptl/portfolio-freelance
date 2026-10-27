// src/components/Testimonials.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StarIcon } from '@heroicons/react/20/solid';

interface ReviewItem {
  name: string;
  role: string;
  location: string;
  comment: string;
  stars: number;
}

const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const reviews = t('testimonials.reviews', { returnObjects: true }) as ReviewItem[];

  return (
    <section id="testimonials" className="relative py-24 px-4 overflow-hidden scroll-mt-20">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[400px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-xs font-semibold text-cyan-700 dark:text-cyan-300 shadow-sm">
            <span>⭐</span>
            <span>PROVEN TRUST</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="gradient-text">{t('testimonials.title')}</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-gray-400 font-normal">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white/80 dark:bg-gray-900/40 hover:bg-white dark:hover:bg-gray-900/70 border border-slate-200/80 dark:border-white/10 hover:border-cyan-500/30 shadow-md dark:shadow-none hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover-lift"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: rev.stars || 5 }).map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                  <span className="ml-2 text-xs font-mono font-semibold text-slate-500 dark:text-gray-400">5.0 / 5.0</span>
                </div>

                {/* Comment quote */}
                <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/5 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-gray-100">{rev.name}</div>
                  <div className="text-xs text-slate-500 dark:text-gray-400">{rev.role}</div>
                  <div className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400/90 mt-0.5">📍 {rev.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
