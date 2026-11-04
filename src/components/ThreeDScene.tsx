// src/components/ThreeDScene.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DevicePhoneMobileIcon,
  CalculatorIcon,
  UserGroupIcon,
  CheckCircleIcon,
  PrinterIcon,
} from '@heroicons/react/24/outline';

const ThreeDScene: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const [activeTab, setActiveTab] = useState<'store' | 'pos' | 'clinic'>('store');

  return (
    <div className="relative w-full rounded-2xl bg-white dark:bg-[#11141c] border border-black/[0.08] dark:border-white/[0.08] shadow-md shadow-cyan-500/[0.04] dark:shadow-cyan-500/[0.08] hover:border-cyan-500/30 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Device Header */}
      <div className="px-4 py-3 bg-zinc-50 dark:bg-[#161a24] border-b border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <span className="ml-2 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
            delivernow.preview
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>{isEn ? 'System operational' : 'सिस्टीम सक्रिय'}</span>
        </div>
      </div>

      {/* Segmented Mode Switcher */}
      <div className="p-2 border-b border-black/[0.06] dark:border-white/[0.06] flex gap-1 bg-zinc-100/50 dark:bg-[#0c0d12]/40">
        <button
          type="button"
          onClick={() => setActiveTab('store')}
          className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'store'
              ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-100 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
          }`}
        >
          <DevicePhoneMobileIcon className="w-3.5 h-3.5" />
          <span>{isEn ? 'Store website' : 'दुकान वेबसाईट'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('pos')}
          className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'pos'
              ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-100 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
          }`}
        >
          <CalculatorIcon className="w-3.5 h-3.5" />
          <span>{isEn ? 'Counter POS' : 'POS बिलिंग'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('clinic')}
          className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'clinic'
              ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-100 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
          }`}
        >
          <UserGroupIcon className="w-3.5 h-3.5" />
          <span>{isEn ? 'Clinic token' : 'क्लिनिक टोकन'}</span>
        </button>
      </div>

      {/* Screen Content */}
      <div className="p-4 min-h-[220px] flex flex-col justify-between">
        {activeTab === 'store' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-black/[0.06] dark:border-white/[0.06]">
              <div>
                <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                  {isEn ? 'Krishi & Retail Mart' : 'कृषी व किराणा मार्ट'}
                </div>
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  {isEn ? 'Direct WhatsApp order pipeline' : 'थेट WhatsApp ऑर्डर सिस्टीम'}
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                0% commission
              </span>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-black/[0.04] dark:border-white/[0.04] flex items-center justify-between text-xs">
                <div>
                  <div className="font-medium text-zinc-900 dark:text-zinc-100">
                    {isEn ? '10:26:26 Fertilizer (50 kg)' : '१०:२६:२६ खत (५० किलो)'}
                  </div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 tabular-nums">
                    ₹1,470 • {isEn ? 'In stock' : 'उपलब्ध'}
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-emerald-600 text-white text-[11px] font-medium">
                  {isEn ? 'Order' : 'मागवा'}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-black/[0.04] dark:border-white/[0.04] flex items-center justify-between text-xs">
                <div>
                  <div className="font-medium text-zinc-900 dark:text-zinc-100">
                    {isEn ? 'Basmati Rice (25 kg)' : 'बासमती तांदूळ (२५ किलो)'}
                  </div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 tabular-nums">
                    ₹1,850 • {isEn ? 'In stock' : 'उपलब्ध'}
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-emerald-600 text-white text-[11px] font-medium">
                  {isEn ? 'Order' : 'मागवा'}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pos' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-black/[0.06] dark:border-white/[0.06]">
              <div className="flex items-center gap-1.5">
                <PrinterIcon className="w-4 h-4 text-zinc-500" />
                <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                  {isEn ? 'Counter POS billing' : 'दुकान बिलिंग'}
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                {isEn ? 'Offline-ready' : 'विना-इंटरनेट चालणारे'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-black/[0.04] dark:border-white/[0.04] font-mono text-[11px] space-y-1.5">
              <div className="flex justify-between text-zinc-500 dark:text-zinc-400 pb-1 border-b border-black/[0.06] dark:border-white/[0.06]">
                <span>{isEn ? 'Invoice #4892' : 'बिल क्र. #४८९२'}</span>
                <span className="tabular-nums">11:42 AM</span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-zinc-300 text-[11px]">
                <span>3 items (Barcode scan)</span>
                <span className="text-zinc-900 dark:text-zinc-100 font-medium tabular-nums">₹1,420</span>
              </div>
              <div className="pt-1 flex items-center justify-between text-[10px] text-zinc-500">
                <span className="flex items-center gap-1">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isEn ? 'Thermal receipt ready' : 'थर्मल पावती तयार'}</span>
                </span>
                <span>GST included</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'clinic' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-black/[0.06] dark:border-white/[0.06]">
              <div>
                <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                  {isEn ? 'Arogya Clinic OPD' : 'आरोग्य क्लिनिक'}
                </div>
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  {isEn ? 'Patient queue & token management' : 'थेट टोकन व रांग व्यवस्थापन'}
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                Live queue
              </span>
            </div>

            <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-black/[0.04] dark:border-white/[0.04] flex items-center justify-between">
              <div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wide">
                  {isEn ? 'Current token' : 'सध्याचा टोकन'}
                </div>
                <div className="text-2xl font-mono font-medium text-zinc-900 dark:text-zinc-100 tabular-nums">
                  #14
                </div>
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  {isEn ? 'Dr. available' : 'डॉक्टर उपलब्ध'}
                </div>
              </div>

              <div className="text-right">
                <span className="px-3 py-1.5 rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-medium">
                  {isEn ? 'Book token' : 'टोकन बुक करा'}
                </span>
                <div className="text-[10px] text-zinc-500 mt-1.5">
                  {isEn ? 'With WhatsApp alert' : 'WhatsApp अलर्टसह'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer meta */}
        <div className="pt-3 mt-2 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
          <span>{isEn ? 'Average load time: 0.8s' : 'लोडिंग वेळ: ०.८ सेकंद'}</span>
          <span className="font-mono">DeliverNow</span>
        </div>
      </div>
    </div>
  );
};

export default ThreeDScene;
