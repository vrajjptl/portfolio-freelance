// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import mr from './locales/mr.json';

const savedLang = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') || 'mr' : 'mr';

i18n.use(initReactI18next).init({
  resources: {
    mr: { translation: mr },
    en: { translation: en },
  },
  lng: savedLang,
  fallbackLng: 'mr',
  interpolation: { escapeValue: false },
});

export default i18n;
