// src/components/Services.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ArrowRightIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';

interface ServiceItem {
  name: string;
  tag: string;
  shortDesc: string;
  bullet1: string;
  bullet2: string;
}

const serviceIcons = [
  <GlobeAltIcon className="w-5 h-5 text-zinc-700 dark:text-zinc-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors" />,
  <DevicePhoneMobileIcon className="w-5 h-5 text-zinc-700 dark:text-zinc-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors" />,
  <ComputerDesktopIcon className="w-5 h-5 text-zinc-700 dark:text-zinc-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors" />,
];

const Services: React.FC = () => {
  const { t, i18n } = useTranslation();
  const items = t('services.items', { returnObjects: true }) as ServiceItem[];

  const getWhatsAppServiceLink = (serviceName: string) => {
    const text =
      i18n.language === 'mr'
        ? `नमस्कार DeliverNow, मला "${serviceName}" या सेवेविषयी अधिक माहिती आणि कोटेशन हवे आहे.`
        : `Hi DeliverNow, I would like to inquire about "${serviceName}". Could you share details and a quotation?`;
    return `https://wa.me/917414912464?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto w-full scroll-mt-14 relative">
      {/* Section Header */}
      <div className="max-w-2xl mb-12 space-y-2">
        <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
          {t('services.badge')}
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-950 dark:text-zinc-50">
          {t('services.title')}
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
          {t('services.subtitle')}
        </p>
      </div>

      {/* Services Grid with subtle hover glow */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="group p-6 rounded-xl bg-white dark:bg-[#11141c] border border-black/[0.08] dark:border-white/[0.08] shadow-sm hover:border-cyan-500/35 dark:hover:border-cyan-500/35 hover:shadow-lg hover:shadow-cyan-500/[0.06] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-cyan-500/10 dark:group-hover:bg-cyan-500/15 flex items-center justify-center transition-colors">
                  {serviceIcons[idx % serviceIcons.length]}
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                  {item.tag}
                </span>
              </div>

              {/* Service Name */}
              <h3 className="text-base font-medium text-zinc-950 dark:text-zinc-100 mb-2 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                {item.name}
              </h3>

              {/* Summary */}
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-normal mb-5 leading-relaxed">
                {item.shortDesc}
              </p>

              {/* 2 Clear Bullets */}
              <div className="space-y-2 mb-6 text-xs text-zinc-700 dark:text-zinc-300">
                <div className="flex items-start gap-2">
                  <CheckIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item.bullet1}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item.bullet2}</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action */}
            <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
              <a
                href={getWhatsAppServiceLink(item.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-lg bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800/60 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-black/[0.06] dark:border-white/[0.06] text-xs font-medium flex items-center justify-between transition-colors group-hover:border-cyan-500/30"
              >
                <span>{i18n.language === 'mr' ? 'WhatsApp वर चर्चा करा' : 'Inquire on WhatsApp'}</span>
                <ArrowRightIcon className="w-3.5 h-3.5 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
