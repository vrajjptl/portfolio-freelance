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
  const [clinicToken, setClinicToken] = useState<number>(14);
  const [tokenConfirmed, setTokenConfirmed] = useState<boolean>(false);
  const [posItems, setPosItems] = useState([
    { name: 'Wheat Flour (10kg)', price: 450, qty: 1 },
    { name: 'Sunflower Oil (1L)', price: 160, qty: 2 },
    { name: 'Sugar (5kg)', price: 210, qty: 1 },
  ]);
  const [posReceiptPrinted, setPosReceiptPrinted] = useState<boolean>(false);

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
            className="group rounded-xl bg-white dark:bg-[#11141c] border border-black/[0.08] dark:border-white/[0.08] shadow-sm hover:border-cyan-500/35 dark:hover:border-cyan-500/35 hover:shadow-lg hover:shadow-cyan-500/[0.06] transition-all duration-300 flex flex-col justify-between overflow-hidden"
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
            <div className="p-4 sm:p-5 pt-0 space-y-2 border-t border-black/[0.06] dark:border-white/[0.06] mt-4">
              <button
                type="button"
                onClick={() => setActiveModal(proj.id)}
                className="w-full py-2.5 px-3 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-medium flex items-center justify-center gap-1.5 active:bg-zinc-800 dark:active:bg-zinc-200 transition-colors"
              >
                <EyeIcon className="w-3.5 h-3.5" />
                <span>{t('sampleWork.viewDemo')}</span>
              </button>

              <a
                href={getDiscussLink(proj.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] text-xs font-normal flex items-center justify-center gap-1.5 transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-xl rounded-xl bg-white dark:bg-[#11141c] border border-black/[0.08] dark:border-white/[0.08] shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
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
                      <div>
                        <div className="text-zinc-900 dark:text-zinc-100 font-medium">Urea (45kg bag)</div>
                        <div className="text-[11px] text-zinc-500">₹266 / bag</div>
                      </div>
                      <span className="text-emerald-600 font-medium self-center">{i18n.language === 'mr' ? 'उपलब्ध' : 'In stock'}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-black/[0.04] dark:border-white/[0.04]">
                      <div>
                        <div className="text-zinc-900 dark:text-zinc-100 font-medium">10:26:26 NPK Fertilizer (50kg)</div>
                        <div className="text-[11px] text-zinc-500">₹1,470 / bag</div>
                      </div>
                      <span className="text-emerald-600 font-medium self-center">{i18n.language === 'mr' ? 'उपलब्ध' : 'In stock'}</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <div>
                        <div className="text-zinc-900 dark:text-zinc-100 font-medium">Soybean Certified Seeds (30kg)</div>
                        <div className="text-[11px] text-zinc-500">₹2,850 / bag</div>
                      </div>
                      <span className="text-emerald-600 font-medium self-center">{i18n.language === 'mr' ? 'उपलब्ध' : 'In stock'}</span>
                    </div>
                  </div>

                  {/* Interactive Test Action */}
                  <div className="pt-2">
                    <a
                      href={`https://wa.me/917414912464?text=${encodeURIComponent(
                        i18n.language === 'mr'
                          ? 'नमस्कार KrishiBazaar (डेमो), मला 1x Urea आणि 1x NPK खताची चालू दराने ऑर्डर करायची आहे.'
                          : 'Hi KrishiBazaar (Live Demo), I would like to order 1x Urea and 1x NPK Fertilizer at live rates.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      <span>💬 {i18n.language === 'mr' ? 'WhatsApp वर १-क्लिक टेस्ट ऑर्डर पाठवा' : 'Test 1-Click WhatsApp Order Placement'}</span>
                    </a>
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
                  <div className="border border-black/[0.06] dark:border-white/[0.06] rounded-lg p-4 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/30">
                    <div>
                      <div className="text-zinc-500 text-[10px] tracking-wider uppercase">{i18n.language === 'mr' ? 'सध्याचा टोकन क्र.' : 'CURRENT TOKEN'}</div>
                      <div className="text-3xl font-mono font-medium text-cyan-600 dark:text-cyan-400">#{clinicToken}</div>
                      <div className="text-[11px] text-zinc-500 mt-1">{i18n.language === 'mr' ? 'अंदाजित वेळ: १० मिनिटांत' : 'Est. wait: ~10 mins'}</div>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="px-2.5 py-1 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-medium inline-block">
                        Dr. S. Patil (MD)
                      </span>
                      <div className="text-[11px] text-emerald-600 font-medium">OPD Active (10:00 - 14:00)</div>
                    </div>
                  </div>

                  {tokenConfirmed && (
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between">
                      <span>✓ {i18n.language === 'mr' ? `टोकन #${clinicToken} यशस्वीपणे बुक झाले!` : `Token #${clinicToken} successfully reserved!`}</span>
                      <span className="font-mono text-[11px]">SMS/WA sent</span>
                    </div>
                  )}

                  {/* Interactive Button */}
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setClinicToken(prev => prev + 1);
                        setTokenConfirmed(true);
                      }}
                      className="flex-1 py-2.5 px-3 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium text-xs hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                    >
                      🎟️ {i18n.language === 'mr' ? 'नवीन टोकन बुक करा (Book Next)' : 'Book Next Patient Token'}
                    </button>
                    <a
                      href={`https://wa.me/917414912464?text=${encodeURIComponent(
                        i18n.language === 'mr'
                          ? `नमस्कार Arogya Clinic (डेमो), मी टोकन #${clinicToken} साठी नोंदणी केली आहे.`
                          : `Hi Arogya Clinic (Live Demo), I registered for OPD token #${clinicToken}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-zinc-800 dark:text-zinc-200 font-medium text-xs transition-colors"
                    >
                      WhatsApp Alert
                    </a>
                  </div>
                </div>
              )}

              {activeModal === 'pos' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400">
                    {i18n.language === 'mr'
                      ? 'स्थानिक दुकानांसाठी काउंटर बिलिंग व थर्मल पावती प्रिंटिंग. बारकोड स्कॅन आणि इन्व्हेंटरी सपोर्ट.'
                      : 'Counter billing software for local shops with barcode scanning, stock tracking, and thermal receipt generation.'}
                  </div>

                  <div className="border border-black/[0.06] dark:border-white/[0.06] rounded-lg p-3 font-mono space-y-2 bg-white dark:bg-[#0c0d12]">
                    <div className="flex justify-between text-zinc-500 border-b border-black/[0.06] dark:border-white/[0.06] pb-1.5 text-[11px]">
                      <span>Invoice #4892 (Dukan POS)</span>
                      <span>11:42 AM</span>
                    </div>

                    <div className="space-y-1 py-1">
                      {posItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-zinc-800 dark:text-zinc-200 text-xs">
                          <span>{item.qty}x {item.name}</span>
                          <span>₹{item.price * item.qty}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-black/[0.06] dark:border-white/[0.06] pt-1.5 flex justify-between text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                      <span>Total (3 items)</span>
                      <span>₹{posItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0)}</span>
                    </div>
                  </div>

                  {posReceiptPrinted && (
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs text-center font-mono animate-in fade-in">
                      🖨️ Thermal 80mm Bill Printed • Cash Drawer Triggered
                    </div>
                  )}

                  {/* Interactive Button */}
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setPosReceiptPrinted(true)}
                      className="flex-1 py-2.5 px-3 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium text-xs hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                    >
                      🧾 {i18n.language === 'mr' ? 'थर्मल पावती प्रिंट चाचणी करा' : 'Simulate 80mm Thermal Receipt Print'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPosItems(prev => [...prev, { name: 'Tea Powder (500g)', price: 180, qty: 1 }]);
                        setPosReceiptPrinted(false);
                      }}
                      className="py-2.5 px-3 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-zinc-800 dark:text-zinc-200 font-medium text-xs transition-colors"
                    >
                      + Barcode Item
                    </button>
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
