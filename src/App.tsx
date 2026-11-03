// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HomePage from './components/HomePage';
import NotFound from './components/NotFound';
import ReptileCursor from './components/ReptileCursor';
import WhatsAppFloat from './components/WhatsAppFloat';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';

function App() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Theme State (Dark / Light) with LocalStorage persistence
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark'; // Default to modern dark mode
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLang = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

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
    setMobileMenuOpen(false);
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-gray-100 selection:bg-cyan-500/30 selection:text-cyan-700 dark:selection:text-cyan-200 transition-colors duration-300">
        <ReptileCursor />

        {/* Floating Island Header */}
        <header className="sticky top-3 z-50 px-4 sm:px-6 max-w-7xl mx-auto w-full transition-all">
          <nav className="flex items-center justify-between px-5 py-3 rounded-full bg-white/80 dark:bg-gray-900/85 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-black/40 transition-colors duration-300">
            {/* Brand Logo & Status */}
            <a
              href="#"
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-cyan-500/30 group-hover:scale-105 transition-transform">
                D
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-slate-900 dark:text-gray-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors leading-tight tracking-tight">
                  DeliverNow
                </span>
                <span className="text-[11px] text-slate-500 dark:text-gray-400 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
                  {t('nav.available')}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right Side Controls: Theme Toggle, Language Toggle, and CTA */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Dark / Light Mode Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-gray-800/80 dark:hover:bg-gray-700/80 text-slate-700 dark:text-cyan-400 border border-slate-200 dark:border-white/10 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <SunIcon className="w-4 h-4 transition-transform hover:rotate-90 duration-300" />
                ) : (
                  <MoonIcon className="w-4 h-4 transition-transform hover:-rotate-12 duration-300" />
                )}
              </button>

              {/* Language Switcher Pill: Marathi First */}
              <div className="flex items-center p-0.5 rounded-full bg-slate-100 dark:bg-gray-950/80 border border-slate-200 dark:border-white/10 text-xs font-semibold">
                <button
                  onClick={() => toggleLang('mr')}
                  className={`px-3 py-1 rounded-full transition-all ${
                    i18n.language === 'mr'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm shadow-cyan-500/50 font-bold'
                      : 'text-slate-700 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white'
                  }`}
                >
                  मराठी
                </button>
                <button
                  onClick={() => toggleLang('en')}
                  className={`px-2.5 py-1 rounded-full transition-all ${
                    i18n.language === 'en'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm shadow-cyan-500/50 font-bold'
                      : 'text-slate-700 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white'
                  }`}
                >
                  English
                </button>
              </div>

              {/* Direct Talk Button */}
              <button
                onClick={() => handleNavClick('#contact')}
                className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all"
              >
                {t('nav.talk')}
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </nav>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-2 p-4 rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border border-slate-200 dark:border-white/10 shadow-2xl flex flex-col gap-2 animate-fade-in-up">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 dark:text-gray-200 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex justify-between items-center">
                <span className="text-xs text-slate-500 dark:text-gray-400">{t('nav.available')}</span>
                <button
                  onClick={() => handleNavClick('#contact')}
                  className="px-4 py-1.5 rounded-full bg-cyan-500 text-white text-xs font-semibold"
                >
                  {t('nav.talk')}
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <WhatsAppFloat />
      </div>
    </Router>
  );
}

export default App;
