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
    <footer className="border-t border-black/[0.06] dark:border-white/[0.07] bg-[#f7f8fa] dark:bg-[#0c0d12] pt-12 pb-10 px-4 sm:px-6 transition-colors duration-150">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Mission */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">DeliverNow</span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              Studio
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm">
            {t('footer.text')}
          </p>
        </div>

        {/* Clean Footer Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="px-2.5 py-1 text-xs text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-md transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {/* Direct Contact Bar */}
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-black/[0.04] dark:border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://wa.me/917414912464"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            WhatsApp: +91 7414912464
          </a>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <a
            href="tel:+917414912464"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Call: +91 7414912464
          </a>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <a
            href="mailto:vrajpatil9891@gmail.com"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            vrajpatil9891@gmail.com
          </a>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <span>Maharashtra, India</span>
        </div>

        <div className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
          © 2026 DeliverNow
        </div>
      </div>
    </footer>
  );
};

export default Footer;
