// src/components/Services.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  CommandLineIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

interface ServiceItem {
  name: string;
  tag: string;
  shortDesc: string;
  bullet1: string;
  bullet2: string;
}

const serviceIcons = [
  <GlobeAltIcon className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />,
  <CommandLineIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
  <DevicePhoneMobileIcon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
  <ComputerDesktopIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
  <CpuChipIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
  <ChatBubbleOvalLeftEllipsisIcon className="w-8 h-8 text-amber-600 dark:text-amber-400" />,
];

const Services: React.FC = () => {
  const { t, i18n } = useTranslation();
  const items = t('services.items', { returnObjects: true }) as ServiceItem[];

  const getWhatsAppServiceLink = (serviceName: string) => {
    const text =
      i18n.language === 'mr'
        ? `नमस्कार विराज, मला "${serviceName}" या सेवेविषयी अधिक माहिती आणि किंमत जाणून घ्यायची आहे.`
        : `Hi Viraj, I would like to inquire about "${serviceName}". Can you share details and exact pricing?`;
    return `https://wa.me/917414912464?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="services" className="py-24 px-4 bg-white dark:bg-gray-950 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-xs font-bold text-cyan-700 dark:text-cyan-300">
            <span>🛠️</span>
            <span>{t('services.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-gray-100 tracking-tight">
            {t('services.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-gray-200 font-medium">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Shortened, high-contrast, easy-to-read cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-slate-50 dark:bg-gray-900/60 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-lg hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-sm">
                    {serviceIcons[idx % serviceIcons.length]}
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-100/70 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30">
                    {item.tag}
                  </span>
                </div>

                {/* Service Name */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-gray-100 mb-2">
                  {item.name}
                </h3>

                {/* 1 Summary Line */}
                <p className="text-sm sm:text-base text-slate-700 dark:text-gray-200 font-medium mb-4 leading-relaxed">
                  {item.shortDesc}
                </p>

                {/* Exactly 2 High-Impact Bullets */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-gray-200">
                    <CheckCircleIcon className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{item.bullet1}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-gray-200">
                    <CheckCircleIcon className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{item.bullet2}</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                <a
                  href={getWhatsAppServiceLink(item.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-white/5 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-slate-200 dark:border-white/10 hover:border-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <span>{i18n.language === 'mr' ? 'WhatsApp वर चर्चा करा' : 'Discuss on WhatsApp'}</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
