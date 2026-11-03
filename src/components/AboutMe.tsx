// src/components/AboutMe.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  ShieldCheckIcon,
  MapPinIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

const AboutMe: React.FC = () => {
  const { t, i18n } = useTranslation();

  const waNumber = '917414912464';
  const waMessage = encodeURIComponent(
    i18n.language === 'mr'
      ? 'नमस्कार विराज, मला तुमच्या कामाविषयी अधिक माहिती हवी आहे.'
      : 'Hi Viraj, I would like to know more about your work and services.'
  );
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <section id="about" className="py-20 px-4 bg-slate-50 dark:bg-gray-950 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-gray-900/60 border border-slate-200 dark:border-white/10 shadow-xl relative overflow-hidden">
          {/* Subtle background accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Avatar & Identity Badge */}
            <div className="md:col-span-5 flex flex-col items-center text-center space-y-4">
              <div className="relative">
                {/* Developer Profile Portrait / Avatar Frame */}
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-1.5 shadow-2xl shadow-cyan-500/20">
                  <div className="w-full h-full rounded-full bg-slate-900 flex flex-col items-center justify-center text-white overflow-hidden relative">
                    <span className="text-6xl font-extrabold tracking-tight bg-gradient-to-br from-white to-cyan-200 bg-clip-text text-transparent">
                      VP
                    </span>
                    <span className="text-[11px] font-mono text-cyan-400 mt-1">Full-Stack Dev</span>
                  </div>
                </div>
                {/* Verified badge */}
                <div className="absolute bottom-2 right-2 bg-emerald-500 text-white p-2 rounded-full shadow-lg border-2 border-white dark:border-gray-900">
                  <ShieldCheckIcon className="w-5 h-5" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100">
                  {i18n.language === 'mr' ? 'विराज पाटील (Viraj Patil)' : 'Viraj Patil'}
                </h3>
                <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-400">
                  Full-Stack Developer • {i18n.language === 'mr' ? '३+ वर्षांचा अनुभव' : '3+ Years Experience'}
                </p>
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-gray-400 mt-1">
                  <MapPinIcon className="w-4 h-4 text-rose-500" />
                  <span>
                    {i18n.language === 'mr'
                      ? 'महाराष्ट्र (सांगली / कोल्हापूर / पुणे)'
                      : 'Maharashtra, India (Sangli / Kolhapur / Pune)'}
                  </span>
                </div>
              </div>

              {/* Direct Connect Badges */}
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-bold transition-all"
                >
                  <ChatBubbleLeftRightIcon className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="tel:+917414912464"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 dark:bg-white/5 dark:text-gray-300 text-xs font-bold transition-all"
                >
                  <PhoneIcon className="w-4 h-4" />
                  <span>{i18n.language === 'mr' ? 'थेट फोन' : 'Call Me'}</span>
                </a>
              </div>
            </div>

            {/* Right: Personal Story & Mission */}
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-xs font-bold text-cyan-700 dark:text-cyan-300">
                <AcademicCapIcon className="w-4 h-4" />
                <span>{t('about.badge')}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-gray-100 tracking-tight leading-snug">
                {t('about.title')}
              </h2>

              <div className="space-y-3 text-slate-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  {t('about.para1')}
                </p>
                <p>
                  {t('about.para2')}
                </p>
                <p className="font-semibold text-slate-900 dark:text-gray-100">
                  {t('about.para3')}
                </p>
              </div>

              {/* Guarantees row */}
              <div className="grid grid-cols-2 gap-3 pt-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-gray-300">
                  <div className="font-bold text-slate-900 dark:text-gray-100 mb-0.5">
                    {i18n.language === 'mr' ? '🤝 थेट स्वतः काम करतो' : '🤝 Direct Developer'}
                  </div>
                  <div>
                    {i18n.language === 'mr'
                      ? 'कोणताही तिसरा मध्यस्थ किंवा एजन्सी नाही.'
                      : 'No middleman, salespeople, or agency markups.'}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-gray-300">
                  <div className="font-bold text-slate-900 dark:text-gray-100 mb-0.5">
                    {i18n.language === 'mr' ? '🗣️ सोपा थेट संवाद' : '🗣️ Simple Communication'}
                  </div>
                  <div>
                    {i18n.language === 'mr'
                      ? 'कोणतेही कठीण जार्गन नाही, थेट पारदर्शक काम.'
                      : 'No confusing tech jargon, clear honest updates.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
