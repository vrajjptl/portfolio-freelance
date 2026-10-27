// src/components/PricingCalculator.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SparklesIcon } from '@heroicons/react/24/solid';

interface BasePackage {
  id: string;
  name: string;
  price: number;
  timeline: string;
  desc: string;
  icon: string;
}

interface AddonOption {
  id: string;
  name: string;
  price: number;
  desc: string;
}

const basePackages: BasePackage[] = [
  {
    id: 'website',
    name: 'Starter Business Website',
    price: 4999,
    timeline: '5 - 7 Days',
    desc: 'Mobile-first 3-5 page website with WhatsApp chat, Google Maps & fast 4G loading.',
    icon: '🌐',
  },
  {
    id: 'store',
    name: 'Online Catalog & WhatsApp Store',
    price: 8999,
    timeline: '7 - 10 Days',
    desc: 'Product catalog with one-click WhatsApp checkout for shops & local traders.',
    icon: '🛒',
  },
  {
    id: 'pos',
    name: 'Shop Billing & Desktop POS',
    price: 7499,
    timeline: '7 - 10 Days',
    desc: 'Fast offline computer billing, thermal invoice printing & daily stock ledger.',
    icon: '💻',
  },
  {
    id: 'mobile',
    name: 'Custom Android Mobile App',
    price: 13999,
    timeline: '12 - 16 Days',
    desc: 'Dedicated Android app ready for Play Store, built for low-end mobile phones.',
    icon: '📱',
  },
  {
    id: 'ai-automation',
    name: 'AI Chatbot & WhatsApp Automation',
    price: 5999,
    timeline: '5 - 7 Days',
    desc: '24/7 automated replies in Marathi & English plus automated invoice alerts.',
    icon: '🤖',
  },
];

const addonsList: AddonOption[] = [
  {
    id: 'bilingual',
    name: 'Marathi + English Bilingual Setup',
    price: 1200,
    desc: 'Full Marathi translation toggle so local customers feel at home.',
  },
  {
    id: 'maps-seo',
    name: 'Google Maps & Local Search Setup',
    price: 999,
    desc: 'Appear on Google Maps when locals search for your shop or service.',
  },
  {
    id: 'payments',
    name: 'UPI / QR Code & Payment Gateway',
    price: 1499,
    desc: 'Instant UPI scanning and secure credit card/net banking payments.',
  },
  {
    id: 'express',
    name: 'Express 5-Day Priority Delivery',
    price: 1999,
    desc: 'Priority development queue to launch your project in 5 business days.',
  },
];

const PricingCalculator: React.FC = () => {
  const { t } = useTranslation();
  const [selectedBase, setSelectedBase] = useState<BasePackage>(basePackages[0]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['bilingual']);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = addonsList.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const grandTotal = selectedBase.price + addonsTotal;

  const getWhatsAppBookingLink = () => {
    const addonNames = selectedAddons
      .map((id) => addonsList.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const text = `Hi Viraj, I used your Cost Estimator on your website:\n\n• Core Solution: ${selectedBase.name} (₹${selectedBase.price.toLocaleString('en-IN')})\n• Add-ons: ${addonNames || 'None'}\n• Estimated Total: ₹${grandTotal.toLocaleString('en-IN')}\n• Timeline: ${selectedBase.timeline}\n\nCan we discuss starting this project?`;

    return `https://wa.me/917414912464?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="pricing" className="relative py-24 px-4 overflow-hidden scroll-mt-20">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-xs font-semibold text-cyan-700 dark:text-cyan-300 shadow-sm">
            <SparklesIcon className="w-3.5 h-3.5 text-cyan-500" />
            <span>TRANSPARENT PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="gradient-text">{t('pricing.title')}</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-gray-400 font-normal">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Calculator Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Options Selection: 7 cols */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Base Solution */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs flex items-center justify-center font-mono font-bold">1</span>
                <span>{t('pricing.baseLabel')}</span>
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {basePackages.map((pkg) => {
                  const isSelected = selectedBase.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedBase(pkg)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                        isSelected
                          ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-400 dark:border-cyan-500/60 shadow-md shadow-cyan-500/10'
                          : 'bg-white dark:bg-gray-900/40 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-gray-900/60'
                      }`}
                    >
                      <div className="text-2xl p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex-shrink-0">
                        {pkg.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-base font-bold text-slate-900 dark:text-gray-100">{pkg.name}</h4>
                          <span className="text-sm font-extrabold text-cyan-600 dark:text-cyan-400 font-mono whitespace-nowrap">
                            ₹{pkg.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 line-clamp-2">{pkg.desc}</p>
                        <span className="inline-block mt-2 text-[11px] font-mono font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/20">
                          ⏱ {pkg.timeline}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Add-ons */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs flex items-center justify-center font-mono font-bold">2</span>
                <span>{t('pricing.addonsLabel')}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addonsList.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-4 rounded-2xl border text-left transition-all duration-200 ${
                        isChecked
                          ? 'bg-cyan-50 dark:bg-cyan-950/30 border-cyan-400 dark:border-cyan-500/50 shadow-sm'
                          : 'bg-white dark:bg-gray-900/30 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-gray-200">{addon.name}</span>
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border text-xs ${
                            isChecked
                              ? 'bg-cyan-500 border-cyan-500 text-white'
                              : 'border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-white/5'
                          }`}
                        >
                          {isChecked && '✓'}
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-gray-400 mb-2 leading-relaxed">{addon.desc}</p>
                      <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-300">
                        +₹{addon.price.toLocaleString('en-IN')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sticky Estimate Summary Card: 5 cols */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="p-8 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-gray-900/90 dark:to-gray-950 border border-slate-200 dark:border-cyan-500/30 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl space-y-6 transition-colors duration-300">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4">
                <span className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Estimate Summary</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30">
                  Fixed Price
                </span>
              </div>

              {/* Selected package name */}
              <div className="space-y-2">
                <div className="text-xs text-slate-500 dark:text-gray-400">Chosen Solution:</div>
                <div className="text-lg font-bold text-slate-900 dark:text-gray-100 flex items-center gap-2">
                  <span>{selectedBase.icon}</span>
                  <span>{selectedBase.name}</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-gray-400 flex items-center justify-between pt-1">
                  <span>Base Price:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-gray-200">₹{selectedBase.price.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Addons breakdown */}
              {selectedAddons.length > 0 && (
                <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-white/5">
                  <div className="text-xs text-slate-500 dark:text-gray-400">Selected Add-ons ({selectedAddons.length}):</div>
                  {selectedAddons.map((id) => {
                    const a = addonsList.find((item) => item.id === id);
                    if (!a) return null;
                    return (
                      <div key={id} className="flex justify-between text-xs text-slate-700 dark:text-gray-300">
                        <span className="truncate pr-2">• {a.name}</span>
                        <span className="font-mono text-cyan-600 dark:text-cyan-400 whitespace-nowrap">+₹{a.price.toLocaleString('en-IN')}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Total Investment Display */}
              <div className="pt-4 border-t border-slate-100 dark:border-white/10 space-y-1 bg-slate-50 dark:bg-white/[0.02] -mx-4 px-4 py-4 rounded-2xl">
                <div className="text-xs text-slate-500 dark:text-gray-400">{t('pricing.estimatedCost')}</div>
                <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 dark:from-emerald-400 dark:via-cyan-400 dark:to-blue-400 font-mono">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5 pt-1">
                  <span>⏱ Launch in:</span>
                  <span className="font-bold">{selectedBase.timeline}</span>
                </div>
              </div>

              {/* Action Button */}
              <a
                href={getWhatsAppBookingLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-sm shadow-xl shadow-green-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>💬</span>
                <span>{t('pricing.bookCta')}</span>
              </a>

              {/* Guarantee text */}
              <p className="text-[11px] text-slate-500 dark:text-gray-400 text-center leading-relaxed">
                {t('pricing.guarantee')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;
