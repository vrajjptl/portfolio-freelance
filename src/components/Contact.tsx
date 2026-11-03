// src/components/Contact.tsx
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

// ── Security Helpers ──────────────────────────────
/** Strip HTML tags and trim whitespace to prevent XSS in stored/forwarded data */
const sanitize = (str: string): string =>
  str.replace(/<[^>]*>/g, '').replace(/[<>"'&]/g, '').trim();

/** Basic phone validation: digits, spaces, +, - only, 10-15 chars */
const isValidPhone = (phone: string): boolean =>
  /^[\d\s+\-()]{10,15}$/.test(phone.trim());

/** Basic name validation: letters, spaces, dots, 2-60 chars */
const isValidName = (name: string): boolean =>
  /^[\p{L}\p{M}\s.'-]{2,60}$/u.test(name.trim());

/** Rate limiter: max N submissions within a time window */
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3;
const submissionTimestamps: number[] = [];

const isRateLimited = (): boolean => {
  const now = Date.now();
  // Remove timestamps outside the window
  while (submissionTimestamps.length > 0 && submissionTimestamps[0] < now - RATE_LIMIT_WINDOW_MS) {
    submissionTimestamps.shift();
  }
  return submissionTimestamps.length >= RATE_LIMIT_MAX;
};

const recordSubmission = () => {
  submissionTimestamps.push(Date.now());
};

// ── Component ─────────────────────────────────────
const Contact: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  // Honeypot field for bot detection
  const [honeypot, setHoneypot] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    const cleanName = sanitize(form.name);
    const cleanPhone = sanitize(form.phone);
    const cleanMessage = sanitize(form.message);

    if (!cleanName || !isValidName(cleanName)) {
      newErrors.name = i18n.language === 'mr' ? 'कृपया वैध नाव टाका (किमान २ अक्षरे)' : 'Please enter a valid name (at least 2 characters)';
    }
    if (!cleanPhone || !isValidPhone(cleanPhone)) {
      newErrors.phone = i18n.language === 'mr' ? 'कृपया वैध मोबाईल नंबर टाका' : 'Please enter a valid phone number';
    }
    if (!cleanMessage || cleanMessage.length < 5) {
      newErrors.message = i18n.language === 'mr' ? 'कृपया किमान ५ अक्षरांचा संदेश लिहा' : 'Please write at least 5 characters';
    }
    if (cleanMessage.length > 2000) {
      newErrors.message = i18n.language === 'mr' ? 'संदेश जास्तीत जास्त २,००० अक्षरांचा असावा' : 'Message must be under 2,000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Bot detection: if honeypot is filled, silently discard
    if (honeypot) {
      setSent(true);
      return;
    }

    // Client-side rate limiting
    if (isRateLimited()) {
      setErrors({
        _form: i18n.language === 'mr'
          ? 'कृपया थोडा वेळ थांबा आणि पुन्हा प्रयत्न करा.'
          : 'Too many submissions. Please wait a moment and try again.',
      });
      return;
    }

    if (!validate()) return;

    setLoading(true);

    // Sanitize all inputs before sending
    const sanitizedData = {
      name: sanitize(form.name),
      phone: sanitize(form.phone),
      service: sanitize(form.service),
      message: sanitize(form.message),
      _submitted_at: new Date().toISOString(),
    };

    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim();
    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sanitizedData),
        });
        if (res.ok) {
          recordSubmission();
          setSent(true);
        } else {
          console.error('Contact submission failed', res.status);
          setErrors({
            _form: i18n.language === 'mr'
              ? 'काहीतरी चूक झाली. कृपया WhatsApp वर संपर्क करा.'
              : 'Something went wrong. Please contact via WhatsApp.',
          });
        }
      } catch {
        console.error('Contact network error');
        setErrors({
          _form: i18n.language === 'mr'
            ? 'नेटवर्क एरर. कृपया WhatsApp वर संपर्क करा.'
            : 'Network error. Please contact via WhatsApp.',
        });
      } finally {
        setLoading(false);
      }
    } else {
      // No endpoint configured — process locally and display confirmation
      setTimeout(() => {
        recordSubmission();
        setSent(true);
        setLoading(false);
      }, 500);
    }
  };

  const sendDirectWhatsApp = () => {
    const cleanName = sanitize(form.name);
    const cleanPhone = sanitize(form.phone);
    const cleanService = sanitize(form.service);
    const cleanMessage = sanitize(form.message);

    const text =
      i18n.language === 'mr'
        ? `नमस्कार DeliverNow,\nनाव: ${cleanName || 'माहिती नाही'}\nमोबाईल: ${cleanPhone || 'माहिती नाही'}\nसेवा: ${cleanService || 'वेबसाईट/ॲप/POS'}\nमाहिती: ${cleanMessage || 'मला संपर्क करावा.'}`
        : `Hi DeliverNow,\nName: ${cleanName || 'Not provided'}\nPhone: ${cleanPhone || 'Not provided'}\nNeed: ${cleanService || 'Website/App/POS'}\nDetails: ${cleanMessage || 'Please contact me.'}`;
    window.open(`https://wa.me/917414912464?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const defaultWALinkText =
    i18n.language === 'mr'
      ? 'नमस्कार DeliverNow, मला माझ्या व्यवसायासाठी वेबसाईट/ॲप हवी आहे. मोफत सल्ला हवा होता.'
      : 'Hi DeliverNow, I would like to consult with you regarding a digital project for my business.';
  const waLink = `https://wa.me/917414912464?text=${encodeURIComponent(defaultWALinkText)}`;
  const telLink = 'tel:+917414912464';
  const mailtoLink = 'mailto:vrajpatil9891@gmail.com';

  return (
    <section id="contact" className="relative py-24 px-4 overflow-hidden scroll-mt-20">
      {/* Background glow */}
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-xs font-semibold text-cyan-700 dark:text-cyan-300 shadow-sm">
            <span>💬</span>
            <span>{i18n.language === 'mr' ? 'संपर्क साधा' : 'GET IN TOUCH'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="gradient-text">{t('contact.title')}</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-gray-400 font-normal">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* 2-Column Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column: Direct Contact Info & Fast Reach */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white/80 dark:bg-gray-900/40 border border-slate-200/80 dark:border-white/10 space-y-6 shadow-xl transition-colors duration-300">
              <h3 className="text-xl font-bold text-slate-900 dark:text-gray-100">
                {i18n.language === 'mr' ? 'थेट संपर्क' : 'Direct Communication'}
              </h3>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                {t('contact.directText')}
              </p>

              {/* Big WhatsApp Card */}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-green-600/10 border border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-300 hover-lift"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">
                      {i18n.language === 'mr' ? 'सर्वात जलद उत्तर' : 'Fastest Reply'}
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-gray-100">+91 7414912464</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {i18n.language === 'mr' ? 'चॅट सुरू करा →' : 'Open Chat →'}
                </span>
              </a>

              {/* Contact Information List */}
              <div className="space-y-4 pt-2">
                <a
                  href={telLink}
                  className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-200 dark:border-cyan-500/20">
                    <PhoneIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-gray-400">
                      {i18n.language === 'mr' ? 'फोन कॉल' : 'Phone Call'}
                    </div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-gray-200">+91 7414912464</div>
                  </div>
                </a>

                <a
                  href={mailtoLink}
                  className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-200 dark:border-purple-500/20">
                    <EnvelopeIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-gray-400">
                      {i18n.language === 'mr' ? 'ईमेल पत्ता' : 'Email Address'}
                    </div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-gray-200">vrajpatil9891@gmail.com</div>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl">
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-500/20">
                    <MapPinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-gray-400">
                      {i18n.language === 'mr' ? 'पत्ता' : 'Location'}
                    </div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-gray-200">
                      {i18n.language === 'mr'
                        ? 'महाराष्ट्र (रिमोट / ऑनलाइन सेवा)'
                        : 'Maharashtra, India (Remote Available)'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-500/20">
                    <ClockIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-gray-400">
                      {i18n.language === 'mr' ? 'उत्तर देण्याची वेळ' : 'Response Time'}
                    </div>
                    <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-300">
                      {i18n.language === 'mr' ? 'साधारण २ तासांत उत्तर' : 'Typically within 2 hours'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white/80 dark:bg-gray-900/40 border border-slate-200/80 dark:border-white/10 shadow-xl transition-colors duration-300">
              {sent ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto text-3xl">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-gray-100">
                    {i18n.language === 'mr' ? 'माहिती मिळाली!' : 'Inquiry Received!'}
                  </h3>
                  <p className="text-slate-700 dark:text-gray-300 text-sm max-w-md mx-auto">
                    {t('contact.form.success')}
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={sendDirectWhatsApp}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 hover:scale-105 transition-all flex items-center gap-2"
                    >
                      <span>{i18n.language === 'mr' ? '💬 WhatsApp वरही पाठवा' : '💬 Also send via WhatsApp'}</span>
                      <span>→</span>
                    </button>
                    <button
                      onClick={() => { setSent(false); setForm({ name: '', phone: '', service: '', message: '' }); }}
                      className="px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-gray-200 transition-all"
                    >
                      {i18n.language === 'mr' ? 'दुसरा मेसेज पाठवा' : 'Send Another'}
                    </button>
                  </div>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Global form error */}
                  {errors._form && (
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-500/30 text-xs font-semibold text-red-700 dark:text-red-300">
                      ⚠️ {errors._form}
                    </div>
                  )}

                  {/* Honeypot - invisible to humans, traps bots */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <label htmlFor="website_url">Website</label>
                    <input
                      type="text"
                      id="website_url"
                      name="website_url"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wider">
                        {t('contact.form.name')} *
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        required
                        maxLength={60}
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Ramesh Patil"
                        className={`w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-gray-950/70 border ${errors.name ? 'border-red-400 dark:border-red-500' : 'border-slate-200 dark:border-white/10'} focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-slate-900 dark:text-gray-100 placeholder-slate-400 dark:placeholder-gray-500 outline-none transition-all`}
                      />
                      {errors.name && <p className="text-[11px] text-red-500 font-medium">{errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-phone" className="text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wider">
                        {t('contact.form.phone')} *
                      </label>
                      <input
                        type="tel"
                        id="contact-phone"
                        name="phone"
                        required
                        maxLength={15}
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 9876543210"
                        className={`w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-gray-950/70 border ${errors.phone ? 'border-red-400 dark:border-red-500' : 'border-slate-200 dark:border-white/10'} focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-slate-900 dark:text-gray-100 placeholder-slate-400 dark:placeholder-gray-500 outline-none transition-all`}
                      />
                      {errors.phone && <p className="text-[11px] text-red-500 font-medium">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Service Needed Dropdown */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-service" className="text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wider">
                      {t('contact.form.service')}
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-gray-950/70 border border-slate-200 dark:border-white/10 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-slate-800 dark:text-gray-200 outline-none transition-all"
                    >
                      <option value="">
                        {i18n.language === 'mr' ? 'सेवा निवडा (किंवा सामान्य माहिती)' : 'Select a service (or general inquiry)'}
                      </option>
                      <option value="Website Design & Development">
                        {i18n.language === 'mr' ? 'वेबसाईट डिझाइन व डेव्हलपमेंट' : 'Website Design & Development'}
                      </option>
                      <option value="Web Applications">
                        {i18n.language === 'mr' ? 'वेब ॲप्लिकेशन' : 'Web Applications'}
                      </option>
                      <option value="Mobile App (Android)">
                        {i18n.language === 'mr' ? 'मोबाईल ॲप (अँड्रॉइड)' : 'Mobile App (Android)'}
                      </option>
                      <option value="Desktop Shop Billing App">
                        {i18n.language === 'mr' ? 'दुकान बिलिंग व POS सॉफ्टवेअर' : 'Desktop Shop Billing / POS'}
                      </option>
                      <option value="Business Automation">
                        {i18n.language === 'mr' ? 'बिझनेस ऑटोमेशन' : 'Business Automation'}
                      </option>
                      <option value="AI Chatbot Integration">
                        {i18n.language === 'mr' ? 'AI चॅटबॉट एकत्रीकरण' : 'AI Chatbot Integration'}
                      </option>
                      <option value="Other / Not Sure">
                        {i18n.language === 'mr' ? 'इतर / सल्ला हवा आहे' : 'Other / Just need advice'}
                      </option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wider">
                      {i18n.language === 'mr' ? 'संदेश / कामाची माहिती *' : 'Message / Project Details *'}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      maxLength={2000}
                      value={form.message}
                      onChange={handleChange}
                      placeholder={t('contact.form.message')}
                      className={`w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-gray-950/70 border ${errors.message ? 'border-red-400 dark:border-red-500' : 'border-slate-200 dark:border-white/10'} focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-slate-900 dark:text-gray-100 placeholder-slate-400 dark:placeholder-gray-500 outline-none transition-all resize-none`}
                    />
                    {errors.message && <p className="text-[11px] text-red-500 font-medium">{errors.message}</p>}
                    <p className="text-[10px] text-slate-400 dark:text-gray-500 text-right">{form.message.length}/2000</p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 active:scale-[0.99] transition-all disabled:opacity-50"
                    >
                      {loading ? 'Sending...' : t('contact.form.submit')}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
