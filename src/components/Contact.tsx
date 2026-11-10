// src/components/Contact.tsx
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import AssistantBot, { BotMood } from './AssistantBot';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const sanitize = (str: string): string =>
  str.replace(/<[^>]*>/g, '').replace(/[<>"'&]/g, '').trim();

const isValidPhone = (phone: string): boolean =>
  /^[\d\s+\-()]{10,15}$/.test(phone.trim());

const isValidName = (name: string): boolean =>
  /^[\p{L}\p{M}\s.'\-(),&]{2,60}$/u.test(name.trim());

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const submissionTimestamps: number[] = [];

const isRateLimited = (): boolean => {
  const now = Date.now();
  while (submissionTimestamps.length > 0 && submissionTimestamps[0] < now - RATE_LIMIT_WINDOW_MS) {
    submissionTimestamps.shift();
  }
  return submissionTimestamps.length >= RATE_LIMIT_MAX;
};

const recordSubmission = () => {
  submissionTimestamps.push(Date.now());
};

const Contact: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFocused, setIsFocused] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [honeypot, setHoneypot] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      setSent(true);
      return;
    }
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
    const cleanName = sanitize(form.name);
    const cleanPhone = sanitize(form.phone);
    const cleanMessage = sanitize(form.message);
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'b35f26f6-f921-4bbe-a57b-125c546a5607';

    const formData = new FormData();
    formData.append('access_key', accessKey);
    formData.append('name', cleanName);
    formData.append('phone', cleanPhone);
    formData.append('service', form.service || 'General Inquiry');
    formData.append('message', cleanMessage);
    formData.append('subject', 'New DeliverNow Lead from ' + cleanName + ' (' + cleanPhone + ')');
    formData.append('from_name', 'DeliverNow Website');
    if (honeypot) formData.append('botcheck', honeypot);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        recordSubmission();
        setSent(true);
      } else {
        setErrors({
          _form: data.message || (i18n.language === 'mr' ? 'मेसेज पाठवण्यात त्रुटी आली. कृपया खालील WhatsApp वापरा.' : 'Error sending message. Please use WhatsApp.'),
        });
      }
    } catch (err) {
      // Fallback: If network/adblocker blocks API, open WhatsApp with details so inquiry is never lost
      const inquiryText = i18n.language === 'mr'
        ? 'नमस्कार DeliverNow,\n\nनाव: ' + cleanName + '\nमोबाईल: ' + cleanPhone + '\nसेवा: ' + (form.service || 'माहिती हवी') + '\nसंदेश: ' + cleanMessage
        : 'Hi DeliverNow,\n\nName: ' + cleanName + '\nPhone: ' + cleanPhone + '\nService: ' + (form.service || 'Not specified') + '\nMessage: ' + cleanMessage;
      window.open('https://wa.me/917414912464?text=' + encodeURIComponent(inquiryText), '_blank');
      recordSubmission();
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  const defaultWALinkText =
    i18n.language === 'mr'
      ? 'नमस्कार DeliverNow, मला माझ्या व्यवसायासाठी वेबसाईट किंवा ॲप हवी आहे. सविस्तर माहिती हवी होती.'
      : 'Hi DeliverNow, I would like to consult with you regarding a digital project for my business.';
  const waLink = `https://wa.me/917414912464?text=${encodeURIComponent(defaultWALinkText)}`;
  const telLink = 'tel:+917414912464';
  const mailtoLink = 'mailto:vrajpatil9891@gmail.com';

  // Compute animated Assistant Bot state based on real-time form activity
  let botMood: BotMood = 'idle';
  let botSpeech: string | undefined = undefined;

  if (sent) {
    botMood = 'celebrate';
  } else if (errors._form) {
    botMood = 'error';
    botSpeech = errors._form;
  } else if (errors.name) {
    botMood = 'error';
    botSpeech = errors.name;
  } else if (errors.phone) {
    botMood = 'error';
    botSpeech = errors.phone;
  } else if (errors.message) {
    botMood = 'error';
    botSpeech = errors.message;
  } else if (isFocused || form.name || form.phone || form.message) {
    botMood = 'focus';
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto w-full scroll-mt-14">
      {/* Section Header */}
      <div className="max-w-2xl mb-12 space-y-2">
        <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          {i18n.language === 'mr' ? 'थेट संपर्क' : 'Contact'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-950 dark:text-zinc-50">
          {t('contact.title')}
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
          {t('contact.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Info */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 sm:p-6 rounded-xl bg-white dark:bg-[#11141c] border border-black/[0.08] dark:border-white/[0.08] shadow-sm space-y-5">
            <h3 className="text-sm font-medium text-zinc-950 dark:text-zinc-100">
              {i18n.language === 'mr' ? 'थेट संपर्क' : 'Direct communication'}
            </h3>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  WA
                </div>
                <div>
                  <div className="text-[11px] text-emerald-800 dark:text-emerald-300 font-medium">WhatsApp</div>
                  <div className="text-xs font-mono text-zinc-900 dark:text-zinc-100">+91 7414912464</div>
                </div>
              </div>
              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                {i18n.language === 'mr' ? 'चॅट करा →' : 'Chat →'}
              </span>
            </a>

            <div className="space-y-3 pt-2 text-xs">
              <a
                href={telLink}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
              >
                <PhoneIcon className="w-4 h-4 text-zinc-500" />
                <div>
                  <div className="text-zinc-500 dark:text-zinc-400 text-[11px]">{i18n.language === 'mr' ? 'फोन कॉल' : 'Phone'}</div>
                  <div className="text-zinc-900 dark:text-zinc-100 font-mono">+91 7414912464</div>
                </div>
              </a>

              <a
                href={mailtoLink}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
              >
                <EnvelopeIcon className="w-4 h-4 text-zinc-500" />
                <div>
                  <div className="text-zinc-500 dark:text-zinc-400 text-[11px]">{i18n.language === 'mr' ? 'ईमेल' : 'Email'}</div>
                  <div className="text-zinc-900 dark:text-zinc-100 font-mono">vrajpatil9891@gmail.com</div>
                </div>
              </a>

              <div className="flex items-center gap-3 p-2.5 rounded-lg">
                <MapPinIcon className="w-4 h-4 text-zinc-500" />
                <div>
                  <div className="text-zinc-500 dark:text-zinc-400 text-[11px]">{i18n.language === 'mr' ? 'पत्ता' : 'Location'}</div>
                  <div className="text-zinc-900 dark:text-zinc-100">Maharashtra, India (Remote & Online)</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-lg border-t border-black/[0.04] dark:border-white/[0.04]">
                <ClockIcon className="w-4 h-4 text-zinc-500" />
                <div>
                  <div className="text-zinc-500 dark:text-zinc-400 text-[11px]">{i18n.language === 'mr' ? 'प्रतिसाद वेळ' : 'Response time'}</div>
                  <div className="text-zinc-900 dark:text-zinc-100">{i18n.language === 'mr' ? '२ तासांच्या आत' : 'Typically within 2 hours'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Clean Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="p-5 sm:p-8 rounded-xl bg-white dark:bg-[#11141c] border border-black/[0.08] dark:border-white/[0.08] shadow-sm">
            {/* Interactive Procedural Assistant Avatar */}
            <AssistantBot mood={botMood} customMessage={botSpeech} />

            {sent ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-lg">
                  ✓
                </div>
                <h3 className="text-sm font-medium text-zinc-950 dark:text-zinc-100">
                  {i18n.language === 'mr' ? 'माहिती मिळाली' : 'Inquiry received'}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto">
                  {t('contact.form.success')}
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                  <a
                    href={`https://wa.me/917414912464?text=${encodeURIComponent(
                      i18n.language === 'mr'
                        ? `नमस्कार DeliverNow, मी वेबसाईटवरून नुकतीच चौकशी पाठवली आहे. (नाव: ${sanitize(form.name)}, फोन: ${sanitize(form.phone)})`
                        : `Hi DeliverNow, I just submitted an inquiry on your website. (Name: ${sanitize(form.name)}, Phone: ${sanitize(form.phone)})`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>{i18n.language === 'mr' ? 'WhatsApp वर तातडीने चर्चा करा' : 'Chat instantly on WhatsApp'}</span>
                  </a>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', phone: '', service: '', message: '' }); }}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg border border-black/[0.08] dark:border-white/[0.08] text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors"
                  >
                    {i18n.language === 'mr' ? 'दुसरा मेसेज पाठवा' : 'Send another'}
                  </button>
                </div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
                {errors._form && (
                  <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-700 dark:text-red-400">
                    {errors._form}
                  </div>
                )}

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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="contact-name" className="text-xs font-normal text-zinc-700 dark:text-zinc-300">
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
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      placeholder={i18n.language === 'mr' ? 'उदा. रमेश पाटील' : 'e.g. Ramesh Patil'}
                      className={`w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border ${
                        errors.name ? 'border-red-500' : 'border-black/[0.08] dark:border-white/[0.08]'
                      } text-base sm:text-xs text-zinc-950 dark:text-zinc-100 placeholder-zinc-400 outline-none`}
                    />
                    {errors.name && <p className="text-[11px] text-red-500">{errors.name}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-phone" className="text-xs font-normal text-zinc-700 dark:text-zinc-300">
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
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      placeholder={i18n.language === 'mr' ? 'उदा. +९१ ९८७६५४३२१०' : 'e.g. +91 9876543210'}
                      className={`w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border ${
                        errors.phone ? 'border-red-500' : 'border-black/[0.08] dark:border-white/[0.08]'
                      } text-base sm:text-xs text-zinc-950 dark:text-zinc-100 placeholder-zinc-400 outline-none`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-500">{errors.phone}</p>}
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-service" className="text-xs font-normal text-zinc-700 dark:text-zinc-300">
                    {t('contact.form.service')}
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-black/[0.08] dark:border-white/[0.08] text-base sm:text-xs text-zinc-950 dark:text-zinc-100 outline-none"
                  >
                    <option value="">{i18n.language === 'mr' ? 'सेवा निवडा...' : 'Select a service...'}</option>
                    <option value="Website">{i18n.language === 'mr' ? 'वेबसाईट डिझाइन व डेव्हलपमेंट' : 'Website design & development'}</option>
                    <option value="Mobile App">{i18n.language === 'mr' ? 'मोबाईल ॲप (अँड्रॉइड)' : 'Mobile app'}</option>
                    <option value="Counter POS">{i18n.language === 'mr' ? 'दुकान बिलिंग व POS' : 'Counter POS & billing'}</option>
                    <option value="Advice">{i18n.language === 'mr' ? 'इतर / सल्ला हवा आहे' : 'Other / Just need advice'}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-message" className="text-xs font-normal text-zinc-700 dark:text-zinc-300">
                    {i18n.language === 'mr' ? 'संदेश *' : 'Message *'}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    maxLength={2000}
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={t('contact.form.message')}
                    className={`w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border ${
                      errors.message ? 'border-red-500' : 'border-black/[0.08] dark:border-white/[0.08]'
                    } text-base sm:text-xs text-zinc-950 dark:text-zinc-100 placeholder-zinc-400 outline-none resize-none`}
                  />
                  {errors.message && <p className="text-[11px] text-red-500">{errors.message}</p>}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-4 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-medium transition-colors disabled:opacity-50"
                  >
                    {loading ? (i18n.language === 'mr' ? 'पाठवत आहे...' : 'Sending...') : t('contact.form.submit')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
