// src/components/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HomeIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

const NotFound: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const title = isEn ? 'Page Not Found' : 'हे पृष्ठ सापडले नाही';
  const subtitle = isEn
    ? "The link you followed might be broken or the page may have been moved."
    : "तुम्ही उघडलेला दुवा चुकीचा असू शकतो किंवा हे पृष्ठ काढले गेले असावे.";
  const homeText = isEn ? 'Back to Home' : 'मुख्य पृष्ठावर जा';
  const waText = isEn ? 'Need Help on WhatsApp' : 'WhatsApp वर मदत हवी आहे';

  return (
    <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden transition-colors duration-300">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* 404 Visual with Glowing Ring */}
      <div className="relative mb-6">
        <div className="text-8xl sm:text-9xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-600 animate-pulse">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-36 h-36 rounded-full border-2 border-cyan-500/30 animate-spin-slow" />
        </div>
      </div>

      {/* Heading & Subtitle */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-gray-100 mb-3">
        {title}
      </h1>
      <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 max-w-md mb-8 leading-relaxed">
        {subtitle}
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all"
        >
          <HomeIcon className="w-4 h-4" />
          <span>{homeText}</span>
        </Link>

        <a
          href="https://wa.me/917414912464"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 dark:text-gray-300 dark:hover:text-emerald-400 text-sm font-semibold transition-all"
        >
          <ChatBubbleBottomCenterTextIcon className="w-4 h-4" />
          <span>{waText}</span>
        </a>
      </div>
    </section>
  );
};

export default NotFound;
