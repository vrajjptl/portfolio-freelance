// src/components/AboutCompany.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  ShieldCheckIcon,
  MapPinIcon,
  SparklesIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const AboutCompany: React.FC = () => {
  const { t, i18n } = useTranslation();

  const waNumber = '917414912464';
  const waMessage = encodeURIComponent(
    i18n.language === 'mr'
      ? 'नमस्कार DeliverNow, मला तुमच्या सॉफ्टवेअर आणि वेबसाइट सेवांविषयी अधिक माहिती हवी आहे.'
      : 'Hi DeliverNow, I would like to know more about your software and web development services.'
  );
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <section id="about" className="py-20 px-4 bg-slate-50 dark:bg-gray-950 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-gray-900/60 border border-slate-200 dark:border-white/10 shadow-xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: DeliverNow Brand Emblem & Highlights */}
            <div className="md:col-span-5 flex flex-col items-center text-center space-y-4">
              <div className="relative">
                {/* Brand Emblem Frame */}
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-1.5 shadow-2xl shadow-cyan-500/20 rotate-1 hover:rotate-0 transition-transform">
                  <div className="w-full h-full rounded-[22px] bg-slate-900 flex flex-col items-center justify-center text-white overflow-hidden relative">
                    <span className="text-6xl font-black tracking-tight bg-gradient-to-br from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
                      D
                    </span>
                    <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 mt-1 uppercase">
                      DeliverNow
                    </span>
                  </div>
                </div>
                {/* Verified badge */}
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-full shadow-lg border-2 border-white dark:border-gray-900">
                  <ShieldCheckIcon className="w-5 h-5" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-gray-100 tracking-tight">
                  DeliverNow
                </h3>
                <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-400 mt-0.5">
                  {i18n.language === 'mr'
                    ? 'डिजिटल सोल्युशन्स व सॉफ्टवेअर स्टुडिओ'
                    : 'Digital Solutions & Software Studio'}
                </p>
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-gray-400 mt-1">
                  <MapPinIcon className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>
                    {i18n.language === 'mr'
                      ? 'महाराष्ट्र (पुणे / सांगली / कोल्हापूर व संपूर्ण भारत ऑनलाईन)'
                      : 'Maharashtra, India (Online & Remote Across India)'}
                  </span>
                </div>
              </div>

              {/* Direct Quick Action Badges */}
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-bold transition-all"
                >
                  <ChatBubbleLeftRightIcon className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="tel:+917414912464"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 dark:bg-white/5 dark:text-gray-300 text-xs font-bold transition-all"
                >
                  <PhoneIcon className="w-4 h-4" />
                  <span>{i18n.language === 'mr' ? 'थेट फोन करा' : 'Call DeliverNow'}</span>
                </a>
              </div>
            </div>

            {/* Right: Company Mission & Values */}
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-xs font-bold text-cyan-700 dark:text-cyan-300">
                <SparklesIcon className="w-4 h-4" />
                <span>{t('about.badge')}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-gray-100 tracking-tight leading-snug">
                {t('about.title')}
              </h2>

              <div className="space-y-3 text-slate-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>{t('about.para1')}</p>
                <p>{t('about.para2')}</p>
                <p className="font-semibold text-slate-900 dark:text-gray-100">
                  {t('about.para3')}
                </p>
              </div>

              {/* Company Guarantees Card Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-gray-300 flex items-start gap-2.5">
                  <CheckCircleIcon className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-gray-100 mb-0.5">
                      {i18n.language === 'mr' ? 'थेट पारदर्शक काम' : 'Direct Collaboration'}
                    </div>
                    <div>
                      {i18n.language === 'mr'
                        ? 'कोणतेही एजन्सी कमिशन किंवा लपलेले शुल्क नाही.'
                        : 'Zero agency overheads or hidden middleman markups.'}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-gray-300 flex items-start gap-2.5">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-gray-100 mb-0.5">
                      {i18n.language === 'mr' ? 'संपूर्ण मार्गदर्शन व ट्रेनिंग' : 'Hands-on Support'}
                    </div>
                    <div>
                      {i18n.language === 'mr'
                        ? 'सॉफ्टवेअर सुरू झाल्यावरही संपूर्ण फोन व व्हिडिओ ट्रेनिंग.'
                        : 'Complete onboarding, 1-on-1 staff training & ongoing updates.'}
                    </div>
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

export default AboutCompany;
