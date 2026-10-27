// src/components/Contact.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';

const Contact: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim();
    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          setSent(true);
        } else {
          console.error('Contact submission failed', await res.text());
          setSent(true);
        }
      } catch (err) {
        console.error('Contact error', err);
        setSent(true);
      } finally {
        setLoading(false);
      }
    } else {
      setTimeout(() => {
        console.log('Contact form submitted:', form);
        setSent(true);
        setLoading(false);
      }, 500);
    }
  };

  const sendDirectWhatsApp = () => {
    const text =
      i18n.language === 'mr'
        ? `नमस्कार विराज,\nनाव: ${form.name || 'माहिती नाही'}\nमोबाईल: ${form.phone || 'माहिती नाही'}\nसेवा: ${form.service || 'वेबसाईट/ॲप/POS'}\nमाहिती: ${form.message || 'मला संपर्क करावा.'}`
        : `Hi Viraj,\nName: ${form.name || 'Not provided'}\nPhone: ${form.phone || 'Not provided'}\nNeed: ${form.service || 'Website/App/POS'}\nDetails: ${form.message || 'Please contact me.'}`;
    window.open(`https://wa.me/917414912464?text=${encodeURIComponent(text)}`, '_blank');
  };

  const defaultWALinkText =
    i18n.language === 'mr'
      ? 'नमस्कार विराज, मला माझ्या व्यवसायासाठी वेबसाईट/ॲप हवी आहे. मोफत सल्ला हवा होता.'
      : 'Hi Viraj, I would like to consult with you regarding a digital project for my business.';
  const waLink = `https://wa.me/917414912464?text=${encodeURIComponent(defaultWALinkText)}`;
  const telLink = 'tel:+917414912464';
  const mailtoLink = 'mailto:vrajpatil9891@gmail.com';

  const socialProfiles = [
    {
      name: 'LinkedIn',
      handle: 'in/vrajptl',
      url: 'https://www.linkedin.com/in/vrajptl/',
      color: 'hover:text-blue-500 hover:border-blue-500/40',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      handle: '@vrajjptl',
      url: 'https://github.com/vrajjptl',
      color: 'hover:text-slate-900 dark:hover:text-white hover:border-slate-400',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      handle: '@v___rajj',
      url: 'https://www.instagram.com/v___rajj/',
      color: 'hover:text-pink-500 hover:border-pink-500/40',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'Portfolio',
      handle: 'virajpatil.vercel.app',
      url: 'https://virajpatil.vercel.app/',
      color: 'hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40',
      icon: <ArrowTopRightOnSquareIcon className="w-4 h-4" />,
    },
  ];

  return (
    <section id="contact" className="relative py-24 px-4 overflow-hidden scroll-mt-20">
      {/* Background glow */}
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-xs font-semibold text-cyan-700 dark:text-cyan-300 shadow-sm">
            <span>💬</span>
            <span>GET IN TOUCH</span>
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
                Direct Communication
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
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">Fastest Reply</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-gray-100">+91 7414912464</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Open Chat →</span>
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
                    <div className="text-xs text-slate-500 dark:text-gray-400">Phone Call</div>
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
                    <div className="text-xs text-slate-500 dark:text-gray-400">Email Address</div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-gray-200">vrajpatil9891@gmail.com</div>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl">
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-500/20">
                    <MapPinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-gray-400">Location</div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-gray-200">Maharashtra, India (Remote Available)</div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-500/20">
                    <ClockIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-gray-400">Response Time</div>
                    <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-300">Typically within 2 hours</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social & Profiles Connect Box */}
            <div className="p-6 rounded-3xl bg-white/80 dark:bg-gray-900/40 border border-slate-200/80 dark:border-white/10 shadow-lg space-y-4 transition-colors duration-300">
              <div className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                Connect Across Platforms
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {socialProfiles.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-gray-300 shadow-sm transition-all duration-300 hover:scale-[1.02] ${item.color}`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-900 dark:text-gray-100">{item.name}</div>
                      <div className="text-[10px] text-slate-400 dark:text-gray-500 truncate">{item.handle}</div>
                    </div>
                  </a>
                ))}
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
                      <span>💬 WhatsApp वरही पाठवा</span>
                      <span>→</span>
                    </button>
                    <button
                      onClick={() => setSent(false)}
                      className="px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-gray-200 transition-all"
                    >
                      {i18n.language === 'mr' ? 'दुसरा मेसेज पाठवा' : 'Send Another'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wider">
                        {t('contact.form.name')} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Ramesh Patil"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-gray-950/70 border border-slate-200 dark:border-white/10 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-slate-900 dark:text-gray-100 placeholder-slate-400 dark:placeholder-gray-500 outline-none transition-all"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wider">
                        {t('contact.form.phone')} *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 9876543210"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-gray-950/70 border border-slate-200 dark:border-white/10 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-slate-900 dark:text-gray-100 placeholder-slate-400 dark:placeholder-gray-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Service Needed Dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wider">
                      {t('contact.form.service')}
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-gray-950/70 border border-slate-200 dark:border-white/10 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-slate-800 dark:text-gray-200 outline-none transition-all"
                    >
                      <option value="">Select a service (or general inquiry)</option>
                      <option value="Website Design & Development">Website Design & Development</option>
                      <option value="Web Applications">Web Application</option>
                      <option value="Mobile App (Android)">Mobile App (Android)</option>
                      <option value="Desktop Shop Billing App">Desktop Shop Billing / POS</option>
                      <option value="Business Automation">Business Automation</option>
                      <option value="AI Chatbot Integration">AI Chatbot Integration</option>
                      <option value="Other / Not Sure">Other / Just need advice</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wider">
                      Message / Project Details *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder={t('contact.form.message')}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-gray-950/70 border border-slate-200 dark:border-white/10 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-slate-900 dark:text-gray-100 placeholder-slate-400 dark:placeholder-gray-500 outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="space-y-3 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 active:scale-[0.99] transition-all disabled:opacity-50"
                    >
                      {loading ? 'Sending...' : t('contact.form.submit')}
                    </button>

                    <button
                      type="button"
                      onClick={sendDirectWhatsApp}
                      className="w-full py-3 px-6 rounded-2xl bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 border border-slate-200 dark:bg-white/5 dark:hover:bg-emerald-500/15 dark:border-white/10 dark:hover:border-emerald-500/40 dark:text-emerald-400 dark:hover:text-emerald-300 font-semibold text-xs transition-all flex items-center justify-center gap-2"
                    >
                      <span>💬</span>
                      <span>{t('contact.form.quickWhatsApp')}</span>
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
