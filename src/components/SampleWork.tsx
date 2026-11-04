// src/components/SampleWork.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ShoppingCartIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  ArrowTopRightOnSquareIcon,
  XMarkIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  demoType: string;
  desc: string;
  tags: string[];
}

const SampleWork: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const projects: ProjectItem[] = [
    {
      id: 'agro',
      title: i18n.language === 'mr' ? 'कृषिबाजार (KrishiBazaar)' : 'KrishiBazaar Agro Store',
      category: i18n.language === 'mr' ? 'डेमो प्रकल्प' : 'Demo Project',
      demoType: i18n.language === 'mr' ? 'कृषी केंद्र ऑनलाइन कॅटलॉग' : 'Agro center catalog',
      desc:
        i18n.language === 'mr'
          ? 'खत, बी-बियाणे आणि कीटकनाशकांची चालू दर सूची. शेतकरी घरबसल्या WhatsApp वरून ऑर्डर देऊ शकतात.'
          : 'Live rates for fertilizers, seeds and pesticides with instant 1-click WhatsApp order placement for farmers.',
      tags: ['Catalog', 'WhatsApp Order', 'Mobile'],
    },
    {
      id: 'clinic',
      title: i18n.language === 'mr' ? 'आरोग्य क्लिनिक (Arogya Clinic)' : 'Arogya Clinic',
      category: i18n.language === 'mr' ? 'डेमो प्रकल्प' : 'Demo Project',
      demoType: i18n.language === 'mr' ? 'दवाखाना अपॉइंटमेंट सिस्टीम' : 'Clinic appointment system',
      desc:
        i18n.language === 'mr'
          ? 'रुग्णांसाठी सोपी OPD टोकन आणि अपॉइंटमेंट बुकिंग प्रणाली. Google Maps पत्ता व फोन थेट उपलब्ध.'
          : 'Clean OPD token booking system for patients with doctor availability and Google Maps navigation.',
      tags: ['Token queue', 'Maps', 'SMS / WA'],
    },
    {
      id: 'pos',
      title: i18n.language === 'mr' ? 'दुकान व्यापार POS (DukanVyapar)' : 'DukanVyapar POS',
      category: i18n.language === 'mr' ? 'डेमो प्रकल्प' : 'Demo Project',
      demoType: i18n.language === 'mr' ? 'स्थानिक दुकान बिलिंग सॉफ्टवेअर' : 'Counter billing software',
      desc:
        i18n.language === 'mr'
          ? 'किराणा, कापड व रिटेल दुकानांसाठी संगणकावर चालणारे जलद बिलिंग. थर्मल प्रिंटर व बारकोड सपोर्ट.'
          : 'Rapid counter billing software for grocery, apparel and retail stores with thermal printer and barcode support.',
      tags: ['Thermal print', 'Barcode', 'Offline'],
    },
  ];

  const getDiscussLink = (projectName: string) => {
    const text =
      i18n.language === 'mr'
        ? `नमस्कार DeliverNow, मी DeliverNow वरील "${projectName}" हा डेमो प्रकल्प पाहिला. मला माझ्या व्यवसायासाठी असाच प्रकल्प बनवून हवा आहे.`
        : `Hi DeliverNow, I reviewed your "${projectName}" demo project. Can DeliverNow build something similar for my business?`;
    return `https://wa.me/917414912464?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto w-full scroll-mt-14">
      {/* Section Header */}
      <div className="max-w-2xl mb-12 space-y-2">
        <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          {t('sampleWork.badge')}
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-950 dark:text-zinc-50">
          {t('sampleWork.title')}
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
          {t('sampleWork.subtitle')}
        </p>
      </div>

      {/* 3 Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {projects.map((proj, idx) => (
          <div
            key={proj.id}
            className="rounded-xl bg-white dark:bg-[#11141c] border border-black/[0.08] dark:border-white/[0.08] shadow-sm flex flex-col justify-between overflow-hidden"
          >
            <div>
              {/* Header bar */}
              <div className="p-4 bg-zinc-50 dark:bg-[#161a24] border-b border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <span className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <span className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-400">
                  {proj.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
                    {idx === 0 && <ShoppingCartIcon className="w-4 h-4" />}
                    {idx === 1 && <CalendarDaysIcon className="w-4 h-4" />}
                    {idx === 2 && <DocumentTextIcon className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-950 dark:text-zinc-100">
                      {proj.title}
                    </h3>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      {proj.demoType}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
                  {proj.desc}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {proj.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-5 pt-0 space-y-2 border-t border-black/[0.06] dark:border-white/[0.06] mt-4">
              <button
                type="button"
                onClick={() => setActiveModal(proj.id)}
                className="w-full py-2 px-3 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <EyeIcon className="w-3.5 h-3.5" />
                <span>{t('sampleWork.viewDemo')}</span>
              </button>

              <a
                href={getDiscussLink(proj.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] text-xs font-normal flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>{t('sampleWork.requestSimilar')}</span>
                <ArrowTopRightOnSquareIcon className="w-3 h-3 text-zinc-400" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Live Interactive Demo Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-xl rounded-xl bg-white dark:bg-[#11141c] border border-black/[0.08] dark:border-white/[0.08] shadow-xl overflow-hidden max-h-[85vh] flex flex-col">
            {/* Modal Topbar */}
            <div className="px-5 py-3.5 border-b border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between bg-zinc-50 dark:bg-[#161a24]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                  {activeModal === 'agro' && 'KrishiBazaar - Interactive preview'}
                  {activeModal === 'clinic' && 'Arogya Clinic - Interactive preview'}
                  {activeModal === 'pos' && 'DukanVyapar POS - Interactive preview'}
                </span>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 rounded text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              {activeModal === 'agro' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400">
                    {i18n.language === 'mr'
                      ? 'शेतकरी मोबाईलवर चालू खत-बियाणे दर पाहतात आणि एका क्लिकवर WhatsApp वर बुकिंग करतात.'
                      : 'Farmers view live seed and fertilizer rates on their phone and place WhatsApp orders with one tap.'}
                  </div>
                  <div className="border border-black/[0.06] dark:border-white/[0.06] rounded-lg p-3 space-y-2">
                    <div className="flex justify-between py-1.5 border-b border-black/[0.04] dark:border-white/[0.04]">
                      <span className="text-zinc-800 dark:text-zinc-200">Urea (45kg bag)</span>
                      <span className="text-emerald-600 font-medium">{i18n.language === 'mr' ? 'उपलब्ध' : 'In stock'}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-black/[0.04] dark:border-white/[0.04]">
                      <span className="text-zinc-800 dark:text-zinc-200">10:26:26 NPK Fertilizer (50kg)</span>
                      <span className="text-emerald-600 font-medium">{i18n.language === 'mr' ? 'उपलब्ध' : 'In stock'}</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-zinc-800 dark:text-zinc-200">Soybean Seeds (30kg)</span>
                      <span className="text-emerald-600 font-medium">{i18n.language === 'mr' ? 'उपलब्ध' : 'In stock'}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'clinic' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400">
                    {i18n.language === 'mr'
                      ? 'रुग्णांना फोन करायची गरज नाही. थेट तारीख निवडून घरूनच टोकन नंबर मिळतो.'
                      : 'Patients select date and time online and receive an instant OPD token without waiting on phone calls.'}
                  </div>
                  <div className="border border-black/[0.06] dark:border-white/[0.06] rounded-lg p-3 flex justify-between items-center">
                    <div>
                      <div className="text-zinc-500 text-[10px]">CURRENT TOKEN</div>
                      <div className="text-2xl font-mono font-medium text-zinc-900 dark:text-zinc-100">#14</div>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs">
                      Dr. Patil
                    </span>
                  </div>
                </div>
              )}

              {activeModal === 'pos' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400">
                    {i18n.language === 'mr'
                      ? 'स्थानिक दुकानांसाठी काउंटर बिलिंग व थर्मल पावती प्रिंटिंग.'
                      : 'Counter billing software for local shops with instant thermal receipt generation.'}
                  </div>
                  <div className="border border-black/[0.06] dark:border-white/[0.06] rounded-lg p-3 font-mono space-y-1">
                    <div className="flex justify-between text-zinc-500">
                      <span>Receipt #4892</span>
                      <span>11:42 AM</span>
                    </div>
                    <div className="flex justify-between text-zinc-800 dark:text-zinc-200 font-medium">
                      <span>3 items</span>
                      <span>₹1,420</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SampleWork;
