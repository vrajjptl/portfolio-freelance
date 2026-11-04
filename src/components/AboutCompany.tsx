// src/components/AboutCompany.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  MapPinIcon,
  CheckCircleIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
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
    <section id="about" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto w-full scroll-mt-14">
      <div className="p-8 sm:p-10 rounded-xl bg-white dark:bg-[#11141c] border border-black/[0.08] dark:border-white/[0.08] shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left: Brand Mark & Context */}
          <div className="md:col-span-4 flex flex-col space-y-4">
            <div className="w-14 h-14 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 flex items-center justify-center font-semibold text-xl tracking-tight">
              D
            </div>

            <div>
              <h3 className="text-lg font-medium text-zinc-950 dark:text-zinc-100 tracking-tight">
                DeliverNow
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {i18n.language === 'mr'
                  ? 'डिजिटल सोल्युशन्स व सॉफ्टवेअर स्टुडिओ'
                  : 'Software & Digital Solutions Studio'}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                <MapPinIcon className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>
                  {i18n.language === 'mr'
                    ? 'महाराष्ट्र (पुणे, सांगली, कोल्हापूर)'
                    : 'Maharashtra, India (Remote & On-site)'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-colors"
              >
                <ChatBubbleLeftRightIcon className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href="tel:+917414912464"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black/[0.08] dark:border-white/[0.08] text-zinc-700 dark:text-zinc-300 text-xs font-medium hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-colors"
              >
                <PhoneIcon className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>
            </div>
          </div>

          {/* Right: Mission & Guarantees */}
          <div className="md:col-span-8 space-y-4">
            <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              {t('about.badge')}
            </div>

            <h2 className="text-xl sm:text-2xl font-medium text-zinc-950 dark:text-zinc-50 tracking-tight leading-snug">
              {t('about.title')}
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              <p>{t('about.para1')}</p>
              <p>{t('about.para2')}</p>
              <p className="text-zinc-800 dark:text-zinc-200 font-medium">
                {t('about.para3')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
              <div className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-400">
                <CheckCircleIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-zinc-900 dark:text-zinc-100">
                    {i18n.language === 'mr' ? 'थेट पारदर्शक सहकार्य' : 'Direct Collaboration'}
                  </div>
                  <div>
                    {i18n.language === 'mr'
                      ? 'कोणतेही एजन्सी कमिशन किंवा लपलेले शुल्क नाही.'
                      : 'No middleman sales commission or hidden agency overheads.'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-400">
                <CheckCircleIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-zinc-900 dark:text-zinc-100">
                    {i18n.language === 'mr' ? 'संपूर्ण मार्गदर्शन व ट्रेनिंग' : 'Hands-on Onboarding'}
                  </div>
                  <div>
                    {i18n.language === 'mr'
                      ? 'सॉफ्टवेअर सुरू झाल्यावरही संपूर्ण फोन व व्हिडिओ ट्रेनिंग.'
                      : '1-on-1 staff training and personal operational support.'}
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
