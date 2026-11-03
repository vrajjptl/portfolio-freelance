// src/components/SampleWork.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArrowTopRightOnSquareIcon,
  ShoppingCartIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  XMarkIcon,
  EyeIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  desc: string;
  demoType: string;
  tags: string[];
}

const SampleWork: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const projects: ProjectItem[] = [
    {
      id: 'agro',
      title: i18n.language === 'mr' ? 'कृषिबाजार (KrishiBazaar)' : 'KrishiBazaar Agro Store',
      category: i18n.language === 'mr' ? 'संकल्पना / डेमो प्रकल्प' : 'Concept / Demo Project',
      demoType: i18n.language === 'mr' ? 'कृषी केंद्र ऑनलाइन कॅटलॉग' : 'Agro Center Online Catalog',
      desc:
        i18n.language === 'mr'
          ? 'खत, बी-बियाणे आणि कीटकनाशकांची चालू दर सूची. शेतकरी घरबसल्या WhatsApp वरून ऑर्डर देऊ शकतात.'
          : 'Live rates for fertilizers, seeds and pesticides with instant 1-click WhatsApp order placement for farmers.',
      tags: ['React', 'WhatsApp Order API', 'Mobile-First UI'],
    },
    {
      id: 'clinic',
      title: i18n.language === 'mr' ? 'आरोग्य क्लिनिक (Arogya Clinic)' : 'Arogya Clinic & Diagnostic',
      category: i18n.language === 'mr' ? 'संकल्पना / डेमो प्रकल्प' : 'Concept / Demo Project',
      demoType: i18n.language === 'mr' ? 'दवाखाना अपॉइंटमेंट सिस्टीम' : 'Clinic Appointment System',
      desc:
        i18n.language === 'mr'
          ? 'रुग्णांसाठी सोपी OPD टोकन आणि अपॉइंटमेंट बुकिंग प्रणाली. Google Maps पत्ता व फोन थेट उपलब्ध.'
          : 'Clean OPD token booking system for patients with doctor availability and Google Maps navigation.',
      tags: ['Token System', 'Google Maps', 'SMS / WA Alert'],
    },
    {
      id: 'pos',
      title: i18n.language === 'mr' ? 'दुकान व्यापार POS (DukanVyapar)' : 'DukanVyapar Billing & POS',
      category: i18n.language === 'mr' ? 'संकल्पना / डेमो प्रकल्प' : 'Concept / Demo Project',
      demoType: i18n.language === 'mr' ? 'दुकान बिलिंग व स्टॉक सिस्टीम' : 'Shop Billing & Stock System',
      desc:
        i18n.language === 'mr'
          ? 'किराणा व जनरल स्टोअर्ससाठी वेगवान थर्मल पावती बिलिंग, दैनिक विक्री हिशोब आणि उधारी खाते.'
          : 'Fast offline thermal invoice printing, daily ledger accounting and inventory tracking for retail stores.',
      tags: ['Windows Desktop / Web', 'Thermal Print', 'Offline Sync'],
    },
  ];

  const getDiscussLink = (projectName: string) => {
    const text =
      i18n.language === 'mr'
        ? `नमस्कार विराज, मी तुमच्या पोर्टफोलिओवर "${projectName}" हा डेमो प्रकल्प पाहिला. मला माझ्या व्यवसायासाठी असाच प्रोजेक्ट बनवून हवा आहे.`
        : `Hi Viraj, I reviewed your "${projectName}" demo project on your portfolio. Can you build something similar for my business?`;
    return `https://wa.me/917414912464?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="projects" className="py-24 px-4 bg-slate-100/50 dark:bg-gray-900/30 border-y border-slate-200/80 dark:border-white/5 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-xs font-bold text-cyan-700 dark:text-cyan-300">
            <span>💻</span>
            <span>{t('sampleWork.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-gray-100 tracking-tight">
            {t('sampleWork.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-gray-300">
            {t('sampleWork.subtitle')}
          </p>
          <div className="inline-block mt-2 px-3 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 text-xs font-semibold text-amber-800 dark:text-amber-300">
            ℹ️ {t('sampleWork.disclaimer')}
          </div>
        </div>

        {/* 3 Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              className="rounded-3xl bg-white dark:bg-gray-900/70 border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-xl hover:border-cyan-500/40 transition-all flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Header Mockup */}
                <div className="p-5 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-800 dark:to-gray-950 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white dark:bg-white/10 text-cyan-700 dark:text-cyan-300 border border-slate-200 dark:border-white/10 shadow-sm">
                    {proj.category}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-200 dark:border-cyan-500/20">
                      {idx === 0 && <ShoppingCartIcon className="w-6 h-6" />}
                      {idx === 1 && <CalendarDaysIcon className="w-6 h-6" />}
                      {idx === 2 && <DocumentTextIcon className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-gray-100">
                        {proj.title}
                      </h3>
                      <div className="text-xs text-slate-500 dark:text-gray-400 font-medium">
                        {proj.demoType}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed">
                    {proj.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Live Demo & Discuss */}
              <div className="p-6 pt-0 space-y-2.5">
                <button
                  type="button"
                  onClick={() => setActiveModal(proj.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-600/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <EyeIcon className="w-4 h-4" />
                  <span>{t('sampleWork.viewDemo')}</span>
                </button>

                <a
                  href={getDiscussLink(proj.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 dark:bg-white/5 dark:hover:bg-emerald-950/40 dark:border-white/10 dark:text-gray-300 dark:hover:text-emerald-300 font-semibold text-xs text-center flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>{t('sampleWork.requestSimilar')}</span>
                  <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Live Interactive Demo Modal */}
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in-up">
            <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              {/* Modal Topbar */}
              <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-gray-950/60">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-bold text-slate-900 dark:text-gray-100">
                    {activeModal === 'agro' && '🌾 KrishiBazaar - Interactive Preview'}
                    {activeModal === 'clinic' && '🩺 Arogya Clinic - Interactive Preview'}
                    {activeModal === 'pos' && '🧾 DukanVyapar POS - Interactive Preview'}
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
                    Live Demo
                  </span>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 rounded-full text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content - Simulated Interface */}
              <div className="p-6 overflow-y-auto space-y-4">
                {activeModal === 'agro' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 text-xs text-emerald-800 dark:text-emerald-300">
                      💡 <strong>{i18n.language === 'mr' ? 'कस्टमरचा अनुभव:' : 'Customer Experience:'}</strong>{' '}
                      {i18n.language === 'mr'
                        ? 'शेतकरी मोबाईलवर चालू खत-बियाणे दर पाहतात आणि एका क्लिकवर WhatsApp वर बुकिंग करतात.'
                        : 'Farmers view live seed and fertilizer rates on their phone and place WhatsApp orders with one tap.'}
                    </div>
                    <div className="space-y-2 border border-slate-200 dark:border-white/10 rounded-2xl p-4">
                      <div className="font-bold text-sm text-slate-900 dark:text-gray-100 mb-2">
                        {i18n.language === 'mr' ? 'आजचे उपलब्ध साठा व दर:' : "Today's Available Stock & Rates:"}
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5 text-xs text-slate-700 dark:text-gray-300">
                        <span>{i18n.language === 'mr' ? 'युरिया (Urea 45kg)' : 'Urea (45kg bag)'}</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {i18n.language === 'mr' ? 'उपलब्ध साठा' : 'In Stock'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5 text-xs text-slate-700 dark:text-gray-300">
                        <span>{i18n.language === 'mr' ? '१०:२६:२६ (NPK खत 50kg)' : '10:26:26 (NPK Fertilizer 50kg)'}</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {i18n.language === 'mr' ? 'उपलब्ध साठा' : 'In Stock'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 text-xs text-slate-700 dark:text-gray-300">
                        <span>{i18n.language === 'mr' ? 'सोयाबीन बियाणे (३० किलो बॅग)' : 'Soybean Seeds (30kg bag)'}</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {i18n.language === 'mr' ? 'उपलब्ध साठा' : 'In Stock'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeModal === 'clinic' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-500/30 text-xs text-cyan-800 dark:text-cyan-300">
                      💡 <strong>{i18n.language === 'mr' ? 'क्लिनिकचा अनुभव:' : 'Clinic Experience:'}</strong>{' '}
                      {i18n.language === 'mr'
                        ? 'रुग्णांना फोन करायची गरज नाही. थेट तारीख व वेळ निवडून घरूनच टोकन नंबर मिळतो.'
                        : 'Patients select date and time online and receive an instant OPD token without waiting on phone calls.'}
                    </div>
                    <div className="border border-slate-200 dark:border-white/10 rounded-2xl p-4 space-y-3">
                      <div className="text-xs text-slate-500 dark:text-gray-400 font-mono">
                        {i18n.language === 'mr' ? 'डॉ. पाटील क्लिनिक, कोल्हापूर रोड' : 'Dr. Patil Clinic, Station Road'}
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-gray-100">
                            {i18n.language === 'mr' ? 'आजचे चालू टोकन: #१४' : 'Current Serving Token: #14'}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-gray-400">
                            {i18n.language === 'mr' ? 'अंदाजे तपासणी वेळ: १० मिनिटे' : 'Approx Wait: 10 mins'}
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-bold">
                          {i18n.language === 'mr' ? 'OPD सुरू' : 'OPD Active'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-gray-300 flex items-center gap-1.5">
                        <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                        <span>
                          {i18n.language === 'mr'
                            ? 'Google Maps व थेट क्लिनिक फोन नंबर जोडलेला'
                            : 'Connected to Google Maps & Direct Clinic Calling'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeModal === 'pos' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-500/30 text-xs text-purple-800 dark:text-purple-300">
                      💡 <strong>{i18n.language === 'mr' ? 'दुकानदाराचा अनुभव:' : 'Shopkeeper Experience:'}</strong>{' '}
                      {i18n.language === 'mr'
                        ? 'बारकोड स्कॅन करा किंवा वस्तूचे नाव टाका. ३ सेकंदात २-इंच थर्मल प्रिंटरवरून छापील बिल तयार.'
                        : 'Scan barcode or enter item name. A clean 2-inch thermal receipt prints out in 3 seconds.'}
                    </div>
                    <div className="border border-slate-200 dark:border-white/10 rounded-2xl p-4 bg-slate-50 dark:bg-white/[0.02] font-mono text-xs space-y-2">
                      <div className="text-center font-bold pb-2 border-b border-dashed border-slate-300 dark:border-white/10">
                        {i18n.language === 'mr' ? '*** श्री समर्थ सुपरमार्केट ***' : '*** Shree Samarth Supermarket ***'}
                      </div>
                      <div className="flex justify-between">
                        <span>{i18n.language === 'mr' ? '१. बासमती तांदूळ (५ किलो)' : '1. Basmati Rice (5kg)'}</span>
                        <span>Qty: 1</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{i18n.language === 'mr' ? '२. सूर्यफूल तेल (१ लिटर)' : '2. Sunflower Oil (1L)'}</span>
                        <span>Qty: 1</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{i18n.language === 'mr' ? '३. साखर (२ किलो)' : '3. Sugar (2kg)'}</span>
                        <span>Qty: 2</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-dashed border-slate-300 dark:border-white/10 font-bold text-sm">
                        <span>{i18n.language === 'mr' ? 'थर्मल पावती प्रिंट' : 'Thermal Bill Print'}</span>
                        <span className="text-emerald-600 dark:text-emerald-400">
                          {i18n.language === 'mr' ? 'यशस्वी' : 'Completed'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-gray-950/60 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-gray-400 font-medium">
                  {i18n.language === 'mr' ? 'अशीच सिस्टीम तुमच्यासाठी हवी आहे?' : 'Want a similar system?'}
                </span>
                <a
                  href={`https://wa.me/917414912464?text=${encodeURIComponent(
                    i18n.language === 'mr'
                      ? 'नमस्कार विराज, मला तुमच्या डेमो सिस्टीमसारखीच सिस्टीम माझ्या व्यवसायासाठी बनवून हवी आहे.'
                      : 'Hi Viraj, I would like to build a system like your demo project for my business.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 hover:scale-105 transition-all"
                >
                  {i18n.language === 'mr' ? 'WhatsApp वर कोटेशन मागा →' : 'Request Quote on WhatsApp →'}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SampleWork;
