// src/components/StrobiGuide.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  XMarkIcon,
  SparklesIcon,
  ArrowRightIcon,
  BookmarkIcon,
  CursorArrowRaysIcon,
} from '@heroicons/react/24/outline';

export type StrobiMood = 'idle' | 'listening' | 'happy' | 'confused' | 'celebrate';

interface StrobiGuideProps {
  externalMood?: StrobiMood;
  externalSpeech?: string;
}

interface HoverHint {
  text: string;
  mood: StrobiMood;
}

const StrobiGuide: React.FC<StrobiGuideProps> = ({ externalMood, externalSpeech }) => {
  const { i18n } = useTranslation();
  const isMr = i18n.language === 'mr';

  const [isOpen, setIsOpen] = useState(false);
  const [mood, setMood] = useState<StrobiMood>('idle');
  const [blink, setBlink] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>('hero');

  // Active hover hint shown in live speech bubble as Strobi moves
  const [liveHint, setLiveHint] = useState<string | null>(null);

  // Follow Cursor Mode toggle (enabled by default on desktop)
  const [followCursor, setFollowCursor] = useState(true);

  const getInitialPos = () => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 640;
      return {
        x: Math.max(16, window.innerWidth - (isMobile ? 76 : 85)),
        y: Math.max(16, window.innerHeight - (isMobile ? 148 : 85)),
      };
    }
    return { x: 800, y: 600 };
  };

  const initCoord = getInitialPos();

  // Position & physics refs
  const pos = useRef({
    x: initCoord.x,
    y: initCoord.y,
    targetX: initCoord.x,
    targetY: initCoord.y,
    mouseX: initCoord.x,
    mouseY: initCoord.y,
    isHoveringInteractive: false,
    hasMovedMouse: false,
  });

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const strobiRef = useRef<HTMLDivElement | null>(null);
  const eyesRef = useRef<SVGGElement | null>(null);
  const lastHintRef = useRef<string | null>(null);
  const lastMoodRef = useRef<BotMood>('idle');
  const lastTargetRef = useRef<HTMLElement | null>(null);

  // Check touch device
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch && window.innerWidth < 1024) {
      setIsTouchDevice(true);
      setFollowCursor(false);
    }
  }, []);

  // Sync external mood
  useEffect(() => {
    if (externalMood) {
      setMood(externalMood);
    }
  }, [externalMood]);

  // Natural blinking interval
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 160);
    }, 3600);
    return () => clearInterval(blinkInterval);
  }, []);

  // 1. COMPREHENSIVE SMART FEATURE DETECTOR: Guides user on EVERY element
  const detectFeatureHint = (el: HTMLElement | null): HoverHint | null => {
    if (!el) return null;

    try {
      const isDarkMode = document.documentElement.classList.contains('dark');
      const currentLang = i18n.language;

      // A. Contact Form Inputs & Submission
      if (el.closest('#contact-name')) {
        return {
          text: isMr ? '✍️ तुमचे किंवा व्यवसायाचे नाव टाका (किमान २ अक्षरे)' : '✍️ Enter your or business name (min 2 chars)',
          mood: 'listening',
        };
      }
      if (el.closest('#contact-phone')) {
        return {
          text: isMr ? '📱 १० अंकी मोबाईल नंबर टाका — आम्ही लगेच कॉल करू' : '📱 Enter 10-digit WhatsApp number — we will call you',
          mood: 'listening',
        };
      }
      if (el.closest('#contact-service')) {
        return {
          text: isMr ? '📋 हवी असलेली सेवा निवडा (वेबसाईट, मोबाईल ॲप किंवा POS)' : '📋 Select needed service (Website, Mobile App, or POS)',
          mood: 'listening',
        };
      }
      if (el.closest('#contact-message')) {
        return {
          text: isMr ? '📝 प्रकल्पाबद्दल किंवा गरजेबद्दल थोडक्यात सांगा' : '📝 Briefly tell us about your project requirements',
          mood: 'listening',
        };
      }
      if (el.closest('#contact form button[type="submit"]')) {
        return {
          text: isMr ? '🚀 चौकशी पाठवा — २ तासांत कोटेशन व कॉल येईल!' : '🚀 Send inquiry — guaranteed reply within 2 hours!',
          mood: 'celebrate',
        };
      }

      // B. Direct Email Links
      const mailLink = el.closest('a[href^="mailto:"]');
      if (mailLink || el.textContent?.includes('vrajpatil9891@gmail.com')) {
        return {
          text: isMr
            ? '📧 थेट ईमेल पाठवा: vrajpatil9891@gmail.com'
            : '📧 Send direct email: vrajpatil9891@gmail.com',
          mood: 'happy',
        };
      }

      // C. Direct Phone / Call Links
      const telLink = el.closest('a[href^="tel:"]');
      if (telLink || el.textContent?.includes('7414912464') || el.textContent?.includes('७४१४९१२४६४')) {
        return {
          text: isMr
            ? '📞 थेट कॉल करा: +91 7414912464 (थेट टीमशी बोला)'
            : '📞 Call directly: +91 7414912464 (Talk to team)',
          mood: 'happy',
        };
      }

      // D. WhatsApp Links & Buttons
      const waLink = el.closest('a[href*="wa.me"], a[href*="whatsapp"]');
      if (waLink || (el.closest('button, a') && el.closest('button, a')?.textContent?.toLowerCase().includes('whatsapp'))) {
        return {
          text: isMr
            ? '💬 थेट WhatsApp चॅट — त्वरित कोटेशन व चर्चा करा!'
            : '💬 Chat on WhatsApp — direct message & instant quote!',
          mood: 'happy',
        };
      }

      // E. Language Switcher Buttons
      const langBtn = el.closest('button[aria-label*="मराठी"], button[aria-label*="English"], header .flex button');
      if (langBtn) {
        const text = langBtn.textContent || '';
        if (text.includes('मराठी') || text.includes('MR')) {
          return {
            text: currentLang === 'mr'
              ? '🌐 सध्या मराठी भाषा सक्रिय आहे'
              : '🌐 वेबसाईट मराठी भाषेत बदलण्यासाठी क्लिक करा (Switch to Marathi)',
            mood: 'happy',
          };
        }
        if (text.includes('English') || text.includes('EN')) {
          return {
            text: currentLang === 'en'
              ? '🌐 English language is currently active'
              : '🌐 इंग्रजी भाषेत वाचण्यासाठी क्लिक करा (Switch to English)',
            mood: 'happy',
          };
        }
      }

      // F. Theme Toggle Button (Sun / Moon)
      const themeBtn = el.closest('button[aria-label*="mode"], button[title*="mode"]');
      if (themeBtn) {
        return {
          text: isDarkMode
            ? (isMr ? '☀️ लाईट मोड सुरू करण्यासाठी क्लिक करा (Switch to Light mode)' : '☀️ Click to switch to Light mode')
            : (isMr ? '🌙 डार्क मोड सुरू करण्यासाठी क्लिक करा (Switch to Dark mode)' : '🌙 Click to switch to Dark mode'),
          mood: 'happy',
        };
      }

      // G. Pricing Packages
      const pricingCard = el.closest('#pricing .rounded-xl');
      if (pricingCard) {
        const text = pricingCard.textContent || '';
        if (text.includes('स्टार्टर') || text.includes('Starter')) {
          return {
            text: isMr
              ? '💰 स्टार्टर पॅकेज: ₹**** — १ पान जलद वेबसाईट, ३-५ दिवसांत रेडी!'
              : '💰 Starter Package: ₹**** — 1-page fast website ready in 3-5 days!',
            mood: 'happy',
          };
        }
        if (text.includes('बिझनेस') || text.includes('Business')) {
          return {
            text: isMr
              ? '🚀 बिझनेस पॅकेज: ₹**** — ५ पाने, SEO आणि WhatsApp कॅटलॉग!'
              : '🚀 Business Package: ₹**** — 5 pages, SEO & WhatsApp ordering catalog!',
            mood: 'happy',
          };
        }
        if (text.includes('सानुकूल') || text.includes('Custom')) {
          return {
            text: isMr
              ? '⚙️ सानुकूल पॅकेज: ₹**** — दुकान POS बिलिंग किंवा अँड्रॉइड ॲप!'
              : '⚙️ Custom Package: ₹**** — Shop counter POS billing & custom apps!',
            mood: 'happy',
          };
        }
        return {
          text: isMr ? '💰 पारदर्शक पॅकेजेस — शून्य लपलेले शुल्क!' : '💰 Transparent packages — zero hidden fees!',
          mood: 'happy',
        };
      }

      // H. Mobile Bottom Dock
      const mobileDock = el.closest('aside[aria-label="Mobile quick actions"]');
      if (mobileDock) {
        const btn = el.closest('a, button');
        const text = btn?.textContent || '';
        if (text.includes('WhatsApp')) {
          return { text: isMr ? '💬 मोबाईल WhatsApp चॅट सुरू करा' : '💬 Start mobile WhatsApp chat', mood: 'happy' };
        }
        if (text.includes('कॉल') || text.includes('Call')) {
          return { text: isMr ? '📞 थेट मोबाईलवरून फोन कॉल करा' : '📞 Call directly from mobile', mood: 'happy' };
        }
        if (text.includes('किंमत') || text.includes('Pricing')) {
          return { text: isMr ? '💰 थेट किंमत पॅकेजेसकडे जा' : '💰 Jump straight to pricing packages', mood: 'happy' };
        }
      }

      // I. Core Services Cards
      const serviceCard = el.closest('#services .rounded-xl');
      if (serviceCard) {
        const text = serviceCard.textContent || '';
        if (text.includes('मोबाईल') || text.includes('Mobile') || text.includes('ॲप') || text.includes('App')) {
          return {
            text: isMr
              ? '📱 कस्टम अँड्रॉइड ॲप: थेट ग्राहक ऑर्डरिंग व पुश नोटिफिकेशन्स'
              : '📱 Android mobile apps: direct ordering & push notifications',
            mood: 'happy',
          };
        }
        if (text.includes('वेबसाईट') || text.includes('Website')) {
          return {
            text: isMr
              ? '🌐 बिझनेस वेबसाईट: जलद गती, मोबाईल फ्रेंडली व Google SEO'
              : '🌐 Business websites: fast loading, mobile responsive & SEO',
            mood: 'happy',
          };
        }
        if (text.includes('POS') || text.includes('बिलिंग') || text.includes('Billing')) {
          return {
            text: isMr
              ? '💻 काउंटर बिलिंग व POS: बारकोड स्कॅनर, थर्मल प्रिंटर व इन्व्हेंटरी'
              : '💻 Counter POS: barcode scanner, thermal receipt & inventory',
            mood: 'happy',
          };
        }
        return {
          text: isMr ? '🛠️ आमची व्यवसाय डिजिटल सेवा' : '🛠️ DeliverNow digital service',
          mood: 'happy',
        };
      }

      // J. Sample Work Demo Cards & Buttons
      const demoCard = el.closest('#projects .rounded-xl');
      if (demoCard) {
        const btn = el.closest('button, a');
        if (btn) {
          const btnText = btn.textContent || '';
          if (btnText.includes('डेमो') || btnText.includes('Demo')) {
            return { text: isMr ? '👁️ हा डेमो थेट ब्राऊझरमध्ये चालवून पाहा!' : '👁️ Open and test this interactive demo!', mood: 'happy' };
          }
          if (btnText.includes('असाच') || btnText.includes('Similar')) {
            return { text: isMr ? '💬 असाच सानुकूल प्रकल्प बनवून घेण्यासाठी चॅट करा' : '💬 Inquire to build a similar custom app', mood: 'happy' };
          }
        }

        const text = demoCard.textContent || '';
        if (text.includes('कृषिबाजार') || text.includes('KrishiBazaar')) {
          return { text: isMr ? '🌾 कृषी केंद्र कॅटलॉग — १-क्लिक WhatsApp बुकिंग' : '🌾 Agro store catalog with 1-click WhatsApp orders', mood: 'happy' };
        }
        if (text.includes('आरोग्य') || text.includes('Arogya')) {
          return { text: isMr ? '🏥 दवाखाना टोकन सिस्टीम — सोपी OPD अपॉइंटमेंट' : '🏥 Clinic queue system — easy OPD appointments', mood: 'happy' };
        }
        if (text.includes('दुकान') || text.includes('DukanVyapar')) {
          return { text: isMr ? '🧾 रिटेल दुकान POS — बारकोड व प्रिंटर सपोर्ट' : '🧾 Retail POS — barcode & thermal print support', mood: 'happy' };
        }
        return {
          text: isMr ? '📱 प्रत्यक्ष लाईव्ह डेमो प्रकल्प' : '📱 Live interactive demo project',
          mood: 'happy',
        };
      }

      // K. 3D Preview Card Tabs
      const previewTab = el.closest('[style*="preserve-3d"] button, [style*="perspective"] button');
      if (previewTab) {
        const text = previewTab.textContent || '';
        if (text.includes('दुकान') || text.includes('Store')) {
          return { text: isMr ? '🏪 दुकान वेबसाईट: WhatsApp ऑर्डर कॅटलॉग प्रिव्ह्यू' : '🏪 Store website: WhatsApp catalog preview', mood: 'happy' };
        }
        if (text.includes('POS') || text.includes('बिलिंग')) {
          return { text: isMr ? '🧾 काउंटर POS: स्थानिक दुकान बिलिंग व प्रिंटर प्रिव्ह्यू' : '🧾 Counter POS: rapid retail billing preview', mood: 'happy' };
        }
        if (text.includes('क्लिनिक') || text.includes('Clinic')) {
          return { text: isMr ? '🏥 क्लिनिक टोकन: रुग्ण अपॉइंटमेंट व OPD टोकन प्रिव्ह्यू' : '🏥 Clinic token: patient queue & OPD preview', mood: 'happy' };
        }
        return { text: isMr ? '✨ ३D प्रिव्ह्यू: टॅप करून मोड्स तपासा!' : '✨ 3D preview: switch modes to preview systems!', mood: 'happy' };
      }

      // L. Hero Section Buttons and Stats
      const heroSection = el.closest('#hero');
      if (heroSection) {
        const btn = el.closest('button, a');
        if (btn) {
          const text = btn.textContent || '';
          if (text.includes('पॅकेजेस') || text.includes('खर्च') || text.includes('Estimate') || text.includes('pricing')) {
            return {
              text: isMr ? '💰 पॅकेजेस आणि अंदाजित खर्च पाहण्यासाठी खाली जा' : '💰 Scroll down to view pricing and estimates',
              mood: 'happy',
            };
          }
        }

        const statItem = el.closest('.tabular-nums')?.parentElement || el.closest('#hero .tabular-nums');
        if (statItem) {
          const text = statItem.textContent || '';
          if (text.includes('३+') || text.includes('3+')) {
            return { text: isMr ? '🏆 ३+ वर्षांचा सॉफ्टवेअर डेव्हलपमेंट अनुभव' : '🏆 3+ years production engineering experience', mood: 'happy' };
          }
          if (text.includes('२ तास') || text.includes('2 Hours')) {
            return { text: isMr ? '⚡ २ तासांच्या आत गॅरंटीड प्रतिसाद' : '⚡ Response within 2 hours guaranteed', mood: 'happy' };
          }
          if (text.includes('३ ते १०') || text.includes('3-10')) {
            return { text: isMr ? '⏱️ ३ ते १० दिवसांत संपूर्ण डिलिव्हरी' : '⏱️ Complete delivery in 3 to 10 days', mood: 'happy' };
          }
          if (text.includes('थेट') || text.includes('Direct')) {
            return { text: isMr ? '🤝 शून्य मध्यस्थ — थेट इंजिनिअरशी सहकार्य' : '🤝 Zero middleman — direct collaboration', mood: 'happy' };
          }
        }
      }

      // M. How It Works 4-Step Cards
      const stepCard = el.closest('#how-it-works .rounded-xl');
      if (stepCard) {
        const text = stepCard.textContent || '';
        if (text.includes('01')) {
          return { text: isMr ? '१. मोफत चर्चा — तुमची गरज समजून घेऊन प्लॅन ठरवणे' : '1. Free requirement discussion & tailored plan', mood: 'listening' };
        }
        if (text.includes('02')) {
          return { text: isMr ? '२. डिझाइन — ३ दिवसांत पहिला प्रिव्ह्यू मसुदा दाखवणे' : '2. Interactive prototype preview within 3 days', mood: 'happy' };
        }
        if (text.includes('03')) {
          return { text: isMr ? '३. डेव्हलपमेंट — जलद आणि सुरक्षित कोडिंग' : '3. Rapid engineering & quality assurance', mood: 'happy' };
        }
        if (text.includes('04')) {
          return { text: isMr ? '४. डिलिव्हरी — ट्रेनिंग आणि ३ महिने मोफत सपोर्ट' : '4. Live deployment & 3 months free support', mood: 'celebrate' };
        }
      }

      // N. About Company Card
      const aboutCard = el.closest('#about .rounded-xl');
      if (aboutCard) {
        return {
          text: isMr
            ? '🏢 DeliverNow — महाराष्ट्रातील स्थानिक व्यवसायांसाठी डिजिटल सॉफ्टवेअर स्टुडिओ'
            : '🏢 DeliverNow — Dedicated technology partner for local businesses',
          mood: 'happy',
        };
      }

      // O. FAQ Items
      const faqItem = el.closest('#faq button, #faq .rounded-xl');
      if (faqItem) {
        return {
          text: isMr ? '❓ हा प्रश्न उघडून सविस्तर उत्तर वाचा' : '❓ Click to expand and read this clear answer',
          mood: 'listening',
        };
      }

      // P. Brand Logo / Home link
      const headerLink = el.closest('header a');
      if (headerLink) {
        return {
          text: isMr ? '🏠 DeliverNow मुख्य पृष्ठ — सुरुवातीला जा' : '🏠 DeliverNow Home — Back to top',
          mood: 'happy',
        };
      }

      // Q. Header Navigation Links
      const navBtn = el.closest('header nav button, header .lg\\:hidden button');
      if (navBtn) {
        const text = navBtn.textContent || '';
        if (text.includes('सेवा') || text.includes('Services')) {
          return { text: isMr ? '🛠️ आमच्या सर्व डिजिटल सेवांवर जा' : '🛠️ Explore our digital services', mood: 'listening' };
        }
        if (text.includes('प्रकल्प') || text.includes('Projects')) {
          return { text: isMr ? '📱 प्रत्यक्ष लाईव्ह डेमो प्रकल्पांवर जा' : '📱 View live interactive demos', mood: 'listening' };
        }
        if (text.includes('पद्धती') || text.includes('Process') || text.includes('Works')) {
          return { text: isMr ? '📋 ४-टप्प्यांची सोपी कार्यपद्धती पाहा' : '📋 Check our 4-step workflow', mood: 'listening' };
        }
        if (text.includes('किंमत') || text.includes('Pricing')) {
          return { text: isMr ? '💰 पारदर्शक पॅकेजेस व किंमत पाहा' : '💰 View packages & pricing', mood: 'happy' };
        }
        if (text.includes('आमच्याबद्दल') || text.includes('About')) {
          return { text: isMr ? '🏢 DeliverNow स्टुडिओबद्दल सविस्तर वाचा' : '🏢 About DeliverNow studio', mood: 'listening' };
        }
        if (text.includes('FAQ') || text.includes('प्रश्न')) {
          return { text: isMr ? '❓ नेहमी विचारले जाणारे प्रश्न व उत्तरे' : '❓ Frequently Asked Questions', mood: 'listening' };
        }
        if (text.includes('संपर्क') || text.includes('Contact') || text.includes('बोला') || text.includes('Talk')) {
          return { text: isMr ? '✉️ थेट कोटेशन फॉर्म व संपर्क माहिती' : '✉️ Instant quote form & contact', mood: 'happy' };
        }
      }

      // R. Footer Links
      const footerBtn = el.closest('footer button, footer a');
      if (footerBtn) {
        return {
          text: isMr ? '🔗 या पानावर जा किंवा संपर्क साधा' : '🔗 Quick link to navigate or contact us',
          mood: 'listening',
        };
      }
    } catch {
      return null;
    }

    return null;
  };

  // 2. CURSOR FOLLOWING & REAL-TIME FEATURE GUIDANCE
  useEffect(() => {
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      const p = pos.current;
      p.hasMovedMouse = true;
      p.mouseX = e.clientX;
      p.mouseY = e.clientY;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // High-performance deduplication: skip redundant DOM lookups if pointer is moving within same node
      if (target === lastTargetRef.current) return;
      lastTargetRef.current = target;

      // Detect feature hint under cursor
      const hint = detectFeatureHint(target);

      if (hint) {
        p.isHoveringInteractive = true;
        if (hint.text !== lastHintRef.current) {
          lastHintRef.current = hint.text;
          setLiveHint(hint.text);
        }
        if (hint.mood !== lastMoodRef.current) {
          lastMoodRef.current = hint.mood;
          setMood(hint.mood);
        }
      } else {
        const isInteractive = Boolean(
          target.closest('a, button, input, select, textarea, [role="button"]')
        );
        p.isHoveringInteractive = isInteractive;

        // Clear hint only when transitioning off interactive target
        if (lastHintRef.current !== null) {
          lastHintRef.current = null;
          setLiveHint(null);
        }

        const nextMood: BotMood = isInteractive ? 'listening' : 'idle';
        if (!externalMood && lastMoodRef.current !== nextMood && lastMoodRef.current !== 'celebrate') {
          lastMoodRef.current = nextMood;
          setMood(nextMood);
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const loop = () => {
      const p = pos.current;

      if (!isTouchDevice) {
        if (followCursor && p.hasMovedMouse) {
          // Offset so Strobi flies gracefully beside the cursor
          // When hovering over interactive elements, back away (+48px) so clicks are totally unobstructed
          const offset = p.isHoveringInteractive ? 46 : 30;

          const targetX = Math.max(35, Math.min(window.innerWidth - 65, p.mouseX + offset));
          const targetY = Math.max(35, Math.min(window.innerHeight - 65, p.mouseY + offset));

          // Smooth physics lerp
          const dx = targetX - p.x;
          const dy = targetY - p.y;
          p.x += dx * 0.088;
          p.y += dy * 0.088;

          // Dynamic 3D flight bank & tilt
          const bankY = Math.max(-20, Math.min(20, dx * 0.45));
          const tiltX = Math.max(-18, Math.min(18, -dy * 0.45));

          if (containerRef.current) {
            containerRef.current.style.transform = `translate3d(${p.x - 28}px, ${p.y - 28}px, 0)`;
          }
          if (strobiRef.current) {
            strobiRef.current.style.transform = `perspective(500px) rotateX(${tiltX}deg) rotateY(${bankY}deg)`;
          }

          // Eyes track the exact pointer tip
          const eyeDx = p.mouseX - p.x;
          const eyeDy = p.mouseY - p.y;
          const eyeX = Math.max(-5.5, Math.min(5.5, eyeDx / 20));
          const eyeY = Math.max(-4.5, Math.min(4.5, eyeDy / 20));

          if (eyesRef.current) {
            eyesRef.current.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
          }
        } else {
          // Resting at corner before first cursor move, or when pinned, or on touch screens
          const isMobile = window.innerWidth < 640;
          const cornerX = Math.max(16, window.innerWidth - (isMobile ? 76 : 85));
          const cornerY = Math.max(16, window.innerHeight - (isMobile ? 148 : 85));
          p.x = cornerX;
          p.y = cornerY;
          if (containerRef.current) {
            containerRef.current.style.transform = `translate3d(${cornerX}px, ${cornerY}px, 0)`;
          }
        }
      }

      animId = requestAnimationFrame(loop);
    };

    const onResize = () => {
      const isMobile = window.innerWidth < 640;
      if (!pos.current.hasMovedMouse || isTouchDevice || !followCursor) {
        const cornerX = Math.max(16, window.innerWidth - (isMobile ? 76 : 85));
        const cornerY = Math.max(16, window.innerHeight - (isMobile ? 148 : 85));
        pos.current.x = cornerX;
        pos.current.y = cornerY;
        if (containerRef.current) {
          containerRef.current.style.transform = `translate3d(${cornerX}px, ${cornerY}px, 0)`;
        }
      }
    };

    window.addEventListener('resize', onResize);
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, [followCursor, isTouchDevice, externalMood, mood, isMr]);

  // 3. Section Observer
  useEffect(() => {
    const sectionIds = ['hero', 'services', 'projects', 'how-it-works', 'pricing', 'about', 'faq', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCurrentSection(id);
          }
        },
        { threshold: 0.35 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMood('happy');
      setTimeout(() => {
        if (!externalMood) setMood('idle');
      }, 1500);
    }
    setIsOpen(false);
  };

  const toggleFollowMode = () => {
    setFollowCursor((prev) => !prev);
    setMood('happy');
    setTimeout(() => {
      if (!externalMood) setMood('idle');
    }, 1200);
  };

  const getGreeting = () => {
    if (externalSpeech) return externalSpeech;

    if (mood === 'celebrate') {
      return isMr
        ? 'अभिनंदन! तुमची माहिती सुरक्षित मिळाली 🎉'
        : 'Congratulations! Your message is safely received 🎉';
    }
    if (mood === 'confused') {
      return isMr
        ? 'कृपया लाल रंगातील माहिती तपासा!'
        : 'Please double-check the highlighted field!';
    }
    if (mood === 'listening') {
      return isMr
        ? 'मी पाहत आहे... माहिती भरा!'
        : 'Listening... go ahead and type!';
    }

    switch (currentSection) {
      case 'services':
        return isMr
          ? 'आमच्या डिजिटल सेवा: वेबसाईट, अँड्रॉइड ॲप आणि POS बिलिंग सॉफ्टवेअर!'
          : 'Core services: fast websites, mobile apps, and counter POS billing!';
      case 'projects':
        return isMr
          ? 'आमचे लाईव्ह डेमो प्रकल्प! थेट WhatsApp ऑर्डर व अपॉइंटमेंट सिस्टीम तपासा.'
          : 'Interactive demos! Test our live WhatsApp catalog and clinic queue systems.';
      case 'pricing':
        return isMr
          ? '१००% पारदर्शक किंमत! ₹**** पासून सुरू, शून्य लपलेले शुल्क.'
          : 'Transparent packages starting at ₹**** with zero hidden commissions.';
      case 'contact':
        return isMr
          ? 'थेट कोटेशन फॉर्म! नाव व फोन टाका, आम्ही २ तासांत कोटेशन पाठवू.'
          : 'Instant quotation! Fill your details and we will reply within 2 hours.';
      case 'about':
        return isMr
          ? 'महाराष्ट्रातील स्थानिक व्यवसायांसाठी थेट, समर्पित तंत्रज्ञान टीम!'
          : 'Dedicated technology partner for businesses across Maharashtra.';
      case 'hero':
      default:
        return isMr
          ? 'नमस्कार! मी Strobi. मी तुमच्या कर्सरसोबत फिरत आहे. एखाद्या फिचरवर कर्सर नेऊन पाहा!'
          : "Hi! I'm Strobi. Point at any package or button to get instant guidance!";
    }
  };

  return (
    <>
      {/* Floating Follower Container (Transforms in 60fps, z-[70] floats safely over sticky header) */}
      <div
        ref={containerRef}
        className="fixed top-0 left-0 z-[70] select-none pointer-events-none"
        style={{
          transform: `translate3d(${initCoord.x}px, ${initCoord.y}px, 0)`,
          willChange: 'transform',
          transition: isTouchDevice ? 'none' : 'opacity 0.2s ease-out',
        }}
      >
        <div className="relative pointer-events-auto">
          {/* Dynamic Live Feature Speech Bubble (Appears above Strobi, or flips below if near top header) */}
          {liveHint && (
            <div
              className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-xl bg-white/95 dark:bg-[#11141c]/95 backdrop-blur-md border border-cyan-500/40 dark:border-cyan-400/40 shadow-xl shadow-cyan-500/15 text-[11px] font-medium text-zinc-900 dark:text-zinc-100 pointer-events-none transition-all duration-200 animate-in fade-in zoom-in-95 flex items-center gap-1.5 z-[80] ${
                pos.current.y < 85 ? 'top-16' : '-top-12'
              }`}
            >
              <SparklesIcon className="w-3.5 h-3.5 text-cyan-500 shrink-0 animate-spin-slow" />
              <span>{liveHint}</span>
            </div>
          )}

          {/* Strobi Avatar Graphic */}
          <div
            ref={strobiRef}
            onClick={() => setIsOpen((prev) => !prev)}
            role="button"
            tabIndex={0}
            aria-label="Cursor-following Strobi Avatar Guide"
            title={
              liveHint
                ? liveHint
                : isMr
                ? 'Strobi गाईड (क्लिक करून मेन्यू उघडा)'
                : 'Strobi Guide (click to open menu)'
            }
            className="cursor-pointer transition-transform duration-100 hover:scale-110 active:scale-95"
            style={{ willChange: 'transform' }}
          >
            {/* Canonical 3D Procedural Strobi Sphere SVG (Bible Strong Avatar Lab) */}
            <svg
              viewBox="0 0 100 100"
              className="drop-shadow-2xl select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '56px', height: '56px' }}
            >
              <defs>
                {/* Strobi's 3D Spherical Blue Gradient (Body: #5b7fe5) */}
                <radialGradient
                  id="strobiBody3DGuide"
                  cx="38%"
                  cy="32%"
                  r="65%"
                  fx="35%"
                  fy="28%"
                >
                  <stop offset="0%" stopColor="#9cb5ff" />
                  <stop offset="30%" stopColor="#5b7fe5" />
                  <stop offset="75%" stopColor="#3d5ec4" />
                  <stop offset="100%" stopColor="#253e92" />
                </radialGradient>

                {/* Strobi Drop Shadow */}
                <radialGradient id="strobiShadowGuide" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(0,0,0,0.35)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>

                {/* Eye Gloss Gradient */}
                <linearGradient id="eyeGlossGuide" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a1d24" />
                  <stop offset="100%" stopColor="#0b0d10" />
                </linearGradient>
              </defs>

              {/* Bottom Contact Shadow */}
              <ellipse cx="50" cy="92" rx="30" ry="6" fill="url(#strobiShadowGuide)" />

              {/* 1. Strobi 3D Sphere Body */}
              <circle
                cx="50"
                cy="48"
                r="40"
                fill="url(#strobiBody3DGuide)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.2"
              />

              {/* Top-Left Specular Light Highlight */}
              <ellipse
                cx="38"
                cy="26"
                rx="14"
                ry="8"
                transform="rotate(-25 38 26)"
                fill="rgba(255,255,255,0.38)"
              />
              <ellipse
                cx="36"
                cy="24"
                rx="6"
                ry="3"
                transform="rotate(-25 36 24)"
                fill="rgba(255,255,255,0.7)"
              />

              {/* 2. Cursor-Tracking Eyes (Pill Capsules) */}
              <g ref={eyesRef} style={{ willChange: 'transform', transition: 'transform 0.05s linear' }}>
                {mood === 'celebrate' || mood === 'happy' ? (
                  /* Joyful Arches: ^  ^ */
                  <g>
                    <path
                      d="M 33 49 Q 41 40 49 49"
                      stroke="#111316"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M 57 49 Q 65 40 73 49"
                      stroke="#111316"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                    />
                    {/* Blushing Cheeks */}
                    <ellipse cx="28" cy="56" rx="4" ry="2.5" fill="#f43f5e" opacity="0.6" />
                    <ellipse cx="76" cy="56" rx="4" ry="2.5" fill="#f43f5e" opacity="0.6" />
                  </g>
                ) : mood === 'confused' ? (
                  /* Confused / Alert Eyes: Left squint, Right wide */
                  <g>
                    <line x1="33" y1="46" x2="45" y2="50" stroke="#111316" strokeWidth="4" strokeLinecap="round" />
                    <rect x="58" y="38" width="10" height="20" rx="5" fill="url(#eyeGlossGuide)" />
                    <circle cx="61" cy="42" r="2.2" fill="#ffffff" />
                  </g>
                ) : blink ? (
                  /* Blinking Slits */
                  <g>
                    <line x1="36" y1="48" x2="46" y2="48" stroke="#111316" strokeWidth="3.5" strokeLinecap="round" />
                    <line x1="60" y1="48" x2="70" y2="48" stroke="#111316" strokeWidth="3.5" strokeLinecap="round" />
                  </g>
                ) : (
                  /* Default Strobi Vertical Pill Eyes with Specular Sparkle */
                  <g>
                    {/* Left Eye */}
                    <rect x="37" y="38" width="9" height="21" rx="4.5" fill="url(#eyeGlossGuide)" />
                    <circle cx="39.5" cy="42" r="2" fill="#ffffff" />
                    <circle cx="42" cy="52" r="1.2" fill="#ffffff" opacity="0.6" />

                    {/* Right Eye */}
                    <rect x="61" y="38" width="9" height="21" rx="4.5" fill="url(#eyeGlossGuide)" />
                    <circle cx="63.5" cy="42" r="2" fill="#ffffff" />
                    <circle cx="66" cy="52" r="1.2" fill="#ffffff" opacity="0.6" />
                  </g>
                )}
              </g>
            </svg>

            {/* Glowing Active Status Beacon */}
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white dark:border-[#0c0d12]" />
            </span>
          </div>

          {/* Quick Follow / Pin Mode Toggle Pill */}
          {!isTouchDevice && (
            <div className="absolute top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFollowMode();
                }}
                className="px-2 py-0.5 rounded-full bg-zinc-900/90 text-white text-[10px] whitespace-nowrap shadow-md flex items-center gap-1 hover:bg-zinc-800"
              >
                {followCursor ? (
                  <>
                    <BookmarkIcon className="w-2.5 h-2.5" />
                    <span>{isMr ? 'कोपऱ्यात ठेवा' : 'Pin to corner'}</span>
                  </>
                ) : (
                  <>
                    <CursorArrowRaysIcon className="w-2.5 h-2.5 text-cyan-400" />
                    <span>{isMr ? 'कर्सर फॉलो करा' : 'Follow cursor'}</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Expanded Interactive Navigation Guide Modal (Anchored above dock on mobile, bottom-right on desktop) */}
      {isOpen && (
        <div className="fixed bottom-24 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 sm:w-80 w-auto z-[80] rounded-2xl bg-white/95 dark:bg-[#11141c]/95 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-2xl p-4 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2">
          {/* Card Topbar */}
          <div className="flex items-center justify-between pb-2.5 border-b border-black/[0.06] dark:border-white/[0.06] mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1">
                <span>Strobi</span>
                <span className="text-[10px] font-normal text-zinc-500">
                  {followCursor ? (isMr ? 'कर्सर गाईड' : 'Cursor Guide') : (isMr ? 'स्थिर गाईड' : 'Corner Guide')}
                </span>
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
              aria-label="Close guide"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Contextual Dialog Bubble */}
          <p className="text-xs text-zinc-700 dark:text-zinc-300 mb-3.5 leading-relaxed bg-zinc-50 dark:bg-zinc-900/60 p-2.5 rounded-xl border border-black/[0.04] dark:border-white/[0.04]">
            {getGreeting()}
          </p>

          {/* Quick Guide Navigation Options */}
          <div className="space-y-1.5 text-xs">
            <button
              onClick={() => scrollToSection('services')}
              className={`w-full py-2 px-2.5 rounded-lg text-left flex items-center justify-between transition-colors ${
                currentSection === 'services'
                  ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-medium'
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-800 dark:text-zinc-200'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>🛠️</span>
                <span>{isMr ? 'आमच्या डिजिटल सेवा' : 'Our Digital Services'}</span>
              </span>
              <ArrowRightIcon className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            <button
              onClick={() => scrollToSection('pricing')}
              className={`w-full py-2 px-2.5 rounded-lg text-left flex items-center justify-between transition-colors ${
                currentSection === 'pricing'
                  ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-medium'
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-800 dark:text-zinc-200'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>💰</span>
                <span>{isMr ? 'किंमत व पॅकेजेस' : 'Pricing & Packages'}</span>
              </span>
              <ArrowRightIcon className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            <button
              onClick={() => scrollToSection('projects')}
              className={`w-full py-2 px-2.5 rounded-lg text-left flex items-center justify-between transition-colors ${
                currentSection === 'projects'
                  ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-medium'
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-800 dark:text-zinc-200'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>📱</span>
                <span>{isMr ? 'लाईव्ह डेमो प्रकल्प' : 'Interactive Demos'}</span>
              </span>
              <ArrowRightIcon className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="w-full py-2 px-2.5 rounded-lg text-left flex items-center justify-between bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-lg font-medium transition-colors"
            >
              <span className="flex items-center gap-2">
                <span>✉️</span>
                <span>{isMr ? 'थेट कोटेशन फॉर्म' : 'Instant Quote Form'}</span>
              </span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mode Switcher footer */}
          {!isTouchDevice && (
            <div className="mt-3 pt-2.5 border-t border-black/[0.04] dark:border-white/[0.04] flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
              <span>{isMr ? 'कर्सर मोशन:' : 'Cursor Motion:'}</span>
              <button
                onClick={toggleFollowMode}
                className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-medium transition-colors"
              >
                {followCursor
                  ? isMr
                    ? '✓ कर्सर फॉलो (सक्रिय)'
                    : '✓ Following cursor'
                  : isMr
                  ? 'कोपऱ्यात पिन'
                  : 'Pinned to corner'}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default StrobiGuide;
