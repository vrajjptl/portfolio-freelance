// src/components/ThreeDScene.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  PrinterIcon,
  CheckBadgeIcon,
  SparklesIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';

const ThreeDScene: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const [activeTab, setActiveTab] = useState<'store' | 'pos' | 'clinic'>('store');
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth mouse tilt parallax for 3D spatial depth
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Max 10 deg tilt
    const rotateY = (x / (rect.width / 2)) * 10;
    const rotateX = -(y / (rect.height / 2)) * 10;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Auto-switch preview tab every 6 seconds if user is not actively hovering
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => {
        if (prev === 'store') return 'pos';
        if (prev === 'pos') return 'clinic';
        return 'store';
      });
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full flex items-center justify-center p-3 select-none perspective-[1200px]"
    >
      {/* 3D Spatially-Tilted Device Glass Frame */}
      <div
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
        className="relative w-full max-w-[420px] rounded-[24px] bg-slate-900/90 dark:bg-gray-950/90 backdrop-blur-2xl border border-cyan-500/30 dark:border-cyan-400/20 shadow-2xl shadow-cyan-500/15 overflow-hidden flex flex-col will-change-transform"
      >
        {/* Device Top Bar: Window Controls & Live System Status */}
        <div className="px-4 py-3 bg-slate-800/80 dark:bg-gray-900/80 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-[10px] font-mono text-slate-400 dark:text-gray-400 font-semibold tracking-wide">
              delivernow.preview
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-semibold text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>{isEn ? 'Live System' : 'सिस्टीम सक्रिय'}</span>
          </div>
        </div>

        {/* Interactive Mode Switcher Tabs */}
        <div className="p-2 bg-slate-950/60 border-b border-white/5 flex gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('store')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'store'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <DevicePhoneMobileIcon className="w-3.5 h-3.5" />
            <span>{isEn ? 'Store Web' : 'दुकान वेबसाईट'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pos')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'pos'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <ComputerDesktopIcon className="w-3.5 h-3.5" />
            <span>{isEn ? 'Counter POS' : 'POS बिलिंग'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('clinic')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'clinic'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <SparklesIcon className="w-3.5 h-3.5" />
            <span>{isEn ? 'Clinic App' : 'क्लिनिक टोकन'}</span>
          </button>
        </div>

        {/* Live Dynamic Preview Screen */}
        <div className="p-4 flex-1 flex flex-col justify-between min-h-[220px] bg-gradient-to-b from-transparent to-cyan-950/20">
          {/* TAB 1: STORE WEBSITE PREVIEW */}
          {activeTab === 'store' && (
            <div className="space-y-3 animate-fade-in-up">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <div>
                  <div className="text-xs font-bold text-slate-100 flex items-center gap-1">
                    <span>🌾 कृषी व किराणा मार्ट</span>
                    <CheckBadgeIcon className="w-3.5 h-3.5 text-cyan-400 inline" />
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {isEn ? 'Direct WhatsApp Ordering Online' : 'थेट WhatsApp ऑर्डर सिस्टीम'}
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold">
                  0% Commission
                </span>
              </div>

              {/* Sample Product Items */}
              <div className="space-y-1.5">
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🌱</span>
                    <div>
                      <div className="font-semibold text-slate-200">10:26:26 खत (५० किलो)</div>
                      <div className="text-[10px] text-emerald-400">उपलब्ध स्टॉक • मूळ दर</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white font-bold text-[10px] shadow-sm">
                    {isEn ? 'WhatsApp Order' : 'मागवा'}
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🌾</span>
                    <div>
                      <div className="font-semibold text-slate-200">बासमती तांदूळ (२५ किलो)</div>
                      <div className="text-[10px] text-slate-400">दुकान काउंटर डिलिव्हरी</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white font-bold text-[10px] shadow-sm">
                    {isEn ? 'WhatsApp Order' : 'मागवा'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COUNTER POS PREVIEW */}
          {activeTab === 'pos' && (
            <div className="space-y-3 animate-fade-in-up">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <div>
                  <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                    <PrinterIcon className="w-4 h-4 text-cyan-400" />
                    <span>{isEn ? 'Counter Thermal Billing' : 'दुकान बिलिंग व स्टॉक'}</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono">
                    ✓ {isEn ? 'Offline-first • Thermal Ready' : 'विना-इंटरनेट चालणारे • थर्मल प्रिंट'}
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                  2.0 Sec Bill
                </span>
              </div>

              {/* Receipt Visual Mockup */}
              <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 font-mono text-[11px] space-y-1">
                <div className="flex justify-between text-slate-300 border-b border-white/10 pb-1">
                  <span>बिल क्र. #४८९२</span>
                  <span className="text-cyan-400">११:४२ AM</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[10px] pt-0.5">
                  <span>३ नग (बारकोड स्कॅन)</span>
                  <span className="text-slate-100 font-bold">एकूण: ₹१,४२०</span>
                </div>
                <div className="pt-1.5 flex items-center justify-between">
                  <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    {isEn ? 'Thermal Slip Printed' : 'थर्मल पावती तयार'}
                  </span>
                  <span className="text-[10px] text-cyan-400 font-bold">GST पावती ✓</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CLINIC TOKEN PREVIEW */}
          {activeTab === 'clinic' && (
            <div className="space-y-3 animate-fade-in-up">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <div>
                  <div className="text-xs font-bold text-slate-100 flex items-center gap-1">
                    <span>🩺 आरोग्य क्लिनिक OPD</span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {isEn ? 'Live Patient Queue & Token' : 'थेट टोकन व रांग व्यवस्थापन'}
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold">
                  OPD Live
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">
                    {isEn ? 'Current Token' : 'सध्याचा टोकन क्र.'}
                  </div>
                  <div className="text-2xl font-black text-cyan-400 font-mono tracking-tight">
                    #१४
                  </div>
                  <div className="text-[10px] text-emerald-400">
                    {isEn ? 'Doctor Available' : 'डॉक्टर उपलब्ध • वेळेवर'}
                  </div>
                </div>

                <div className="text-right">
                  <div className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-md shadow-cyan-500/20">
                    {isEn ? 'Book Token' : 'टोकन बुक करा'}
                  </div>
                  <div className="text-[9px] text-slate-400 mt-1">
                    WhatsApp अलर्टसह
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Metrics Indicator */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-medium text-slate-400">
            <div className="flex items-center gap-1 text-cyan-400 font-semibold">
              <BoltIcon className="w-3.5 h-3.5" />
              <span>{isEn ? 'Fast 0.8s Load' : '०.८ सेकंदात लोड'}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>DeliverNow Engine</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating 3D Accent Badge 1: Top Right */}
      <div
        style={{
          transform: `translate3d(${rotate.y * -0.8}px, ${rotate.x * 0.8}px, 20px)`,
        }}
        className="hidden sm:flex absolute -top-1 -right-2 px-3 py-1.5 rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-cyan-400/30 shadow-xl shadow-cyan-500/15 items-center gap-2 text-xs font-bold text-slate-800 dark:text-cyan-300 animate-fade-in-up transition-transform duration-200"
      >
        <span className="text-sm">⚡</span>
        <span>{isEn ? '100% Mobile Ready' : '१००% मोबाईल फ्रेंडली'}</span>
      </div>

      {/* Floating 3D Accent Badge 2: Bottom Left */}
      <div
        style={{
          transform: `translate3d(${rotate.y * 0.8}px, ${rotate.x * -0.8}px, 20px)`,
        }}
        className="hidden sm:flex absolute -bottom-1 -left-2 px-3 py-1.5 rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-emerald-400/30 shadow-xl shadow-emerald-500/15 items-center gap-2 text-xs font-bold text-slate-800 dark:text-emerald-300 animate-fade-in-up transition-transform duration-200"
      >
        <span className="text-sm">💬</span>
        <span>{isEn ? 'WhatsApp Integrated' : 'थेट WhatsApp जोडणी'}</span>
      </div>
    </div>
  );
};

export default ThreeDScene;
