// src/components/MobileBottomDock.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PhoneIcon, BanknotesIcon } from '@heroicons/react/24/outline';

const MobileBottomDock: React.FC = () => {
  const { i18n } = useTranslation();
  const waText =
    i18n.language === 'mr'
      ? 'नमस्कार विराज, मला माझ्या व्यवसायासाठी वेबसाईट/ॲप हवी आहे.'
      : 'Hi Viraj, I want a website/app for my business.';
  const waLink = `https://wa.me/917414912464?text=${encodeURIComponent(waText)}`;
  const telLink = 'tel:+917414912464';

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside aria-label="Mobile quick actions" className="sm:hidden fixed bottom-3 left-3 right-3 z-40">
      <div className="flex items-center justify-between p-2 rounded-2xl bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border border-slate-200 dark:border-white/15 shadow-2xl shadow-slate-500/20 dark:shadow-black/70 transition-colors duration-300">
        {/* WhatsApp Button */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-xs shadow-md shadow-green-500/25 active:scale-95 transition-transform"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span>WhatsApp</span>
        </a>

        {/* Call Button */}
        <a
          href={telLink}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-slate-800 dark:text-gray-100 font-bold text-xs active:scale-95 transition-transform"
        >
          <PhoneIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>{i18n.language === 'mr' ? 'फोन' : 'Call'}</span>
        </a>

        {/* Packages Button */}
        <button
          type="button"
          onClick={scrollToPricing}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-cyan-700 dark:text-cyan-300 font-bold text-xs active:scale-95 transition-transform"
        >
          <BanknotesIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>{i18n.language === 'mr' ? 'पॅकेजेस' : 'Packages'}</span>
        </button>
      </div>
    </aside>
  );
};

export default MobileBottomDock;
