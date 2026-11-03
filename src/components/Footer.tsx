// src/components/Footer.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const navLinks = [
    { href: '#services', label: t('nav.services') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#how-it-works', label: t('nav.howItWorks') },
    { href: '#pricing', label: t('nav.pricing') },
    { href: '#about', label: t('nav.about') },
    { href: '#faq', label: t('nav.faq') },
    { href: '#contact', label: t('nav.contact') },
  ];

  const handleNavClick = (href: string) => {
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-slate-200 dark:border-white/10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md pt-12 pb-10 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Mission */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-lg font-bold text-slate-900 dark:text-gray-100">DeliverNow</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950 border border-cyan-200 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400 font-mono">
              Digital Solutions
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-gray-400 max-w-md">
            {t('footer.text')}
          </p>
        </div>

        {/* Clean Footer Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {/* Direct Contact Bar */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500 dark:text-gray-400">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://wa.me/917414912464"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            WhatsApp: +91 7414912464
          </a>
          <span className="text-slate-300 dark:text-gray-700">•</span>
          <a
            href="tel:+917414912464"
            className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            Call: +91 7414912464
          </a>
          <span className="text-slate-300 dark:text-gray-700">•</span>
          <a
            href="mailto:vrajpatil9891@gmail.com"
            className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            vrajpatil9891@gmail.com
          </a>
          <span className="text-slate-300 dark:text-gray-700">•</span>
          <span>📍 {t('footer.location')}</span>
        </div>

        <div className="text-[11px] font-mono text-slate-400 dark:text-gray-500">
          © 2026 DeliverNow. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
