// src/components/AssistantBot.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SparklesIcon } from '@heroicons/react/24/outline';

export type BotMood = 'idle' | 'focus' | 'error' | 'celebrate';

interface AssistantBotProps {
  mood: BotMood;
  customMessage?: string;
}

const AssistantBot: React.FC<AssistantBotProps> = ({ mood, customMessage }) => {
  const { i18n } = useTranslation();
  const isMr = i18n.language === 'mr';

  const [blink, setBlink] = useState(false);
  const [wiggle, setWiggle] = useState(false);

  // Periodic natural blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 180);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  // Wiggle on mood change
  useEffect(() => {
    setWiggle(true);
    const timer = setTimeout(() => setWiggle(false), 500);
    return () => clearTimeout(timer);
  }, [mood]);

  // Click interaction: gentle bounce & wink
  const handleBotClick = () => {
    setWiggle(true);
    setBlink(true);
    setTimeout(() => setBlink(false), 250);
    setTimeout(() => setWiggle(false), 500);
  };

  // Determine dialog text based on mood
  const getSpeechText = () => {
    if (customMessage) return customMessage;

    switch (mood) {
      case 'focus':
        return isMr
          ? 'मी पाहत आहे... तुमची माहिती सुरक्षित राहील.'
          : 'Listening... your details are safe with us.';
      case 'error':
        return isMr
          ? 'अरेरे! कृपया लाल रंगात दाखवलेली माहिती तपासा.'
          : 'Oops! Please check the highlighted field above.';
      case 'celebrate':
        return isMr
          ? 'मस्त! संदेश मिळाला! आम्ही तातडीने संपर्क करू 🎉'
          : 'Awesome! Your inquiry is received! Talk soon 🎉';
      case 'idle':
      default:
        return isMr
          ? 'नमस्कार! मी Strobi. फॉर्म भरा आणि २ तासांत कोटेशन मिळवा!'
          : 'Hi! I am Strobi. Fill this form for a quick quote within 2 hours!';
    }
  };

  return (
    <div className="flex items-center gap-3.5 p-3 rounded-xl bg-zinc-50 dark:bg-[#161a24] border border-black/[0.06] dark:border-white/[0.06] mb-5 transition-all duration-300">
      {/* Canonical Strobi Character (Bible Strong Avatar Lab) */}
      <button
        type="button"
        onClick={handleBotClick}
        aria-label="Strobi Avatar Form Assistant"
        title={isMr ? 'मला टॅप करा!' : 'Tap me!'}
        className={`relative shrink-0 focus:outline-none cursor-pointer transition-transform duration-300 ${
          wiggle ? 'scale-110 -translate-y-1' : 'hover:scale-105'
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Strobi 3D Spherical Blue Gradient */}
            <radialGradient
              id="strobiFormBody"
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

            {/* Strobi Shadow */}
            <radialGradient id="strobiFormShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>

            {/* Strobi Eye Ink */}
            <linearGradient id="strobiFormEye" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1d24" />
              <stop offset="100%" stopColor="#0b0d10" />
            </linearGradient>
          </defs>

          {/* Contact Shadow */}
          <ellipse cx="50" cy="92" rx="30" ry="6" fill="url(#strobiFormShadow)" />

          {/* Strobi 3D Spherical Body */}
          <circle
            cx="50"
            cy="48"
            r="40"
            fill="url(#strobiFormBody)"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1.2"
          />

          {/* Specular Highlights */}
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

          {/* Expressive Pill Eyes */}
          {mood === 'celebrate' ? (
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
              <ellipse cx="28" cy="56" rx="4" ry="2.5" fill="#f43f5e" opacity="0.6" />
              <ellipse cx="76" cy="56" rx="4" ry="2.5" fill="#f43f5e" opacity="0.6" />
            </g>
          ) : mood === 'error' ? (
            <g>
              <line x1="33" y1="46" x2="45" y2="50" stroke="#111316" strokeWidth="4" strokeLinecap="round" />
              <rect x="58" y="38" width="10" height="20" rx="5" fill="url(#strobiFormEye)" />
              <circle cx="61" cy="42" r="2.2" fill="#ffffff" />
            </g>
          ) : blink ? (
            <g>
              <line x1="36" y1="48" x2="46" y2="48" stroke="#111316" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="60" y1="48" x2="70" y2="48" stroke="#111316" strokeWidth="3.5" strokeLinecap="round" />
            </g>
          ) : mood === 'focus' ? (
            <g>
              <rect x="36" y="42" width="10" height="20" rx="5" fill="url(#strobiFormEye)" />
              <circle cx="39" cy="46" r="2.5" fill="#ffffff" />
              <rect x="60" y="42" width="10" height="20" rx="5" fill="url(#strobiFormEye)" />
              <circle cx="63" cy="46" r="2.5" fill="#ffffff" />
            </g>
          ) : (
            <g>
              <rect x="37" y="38" width="9" height="21" rx="4.5" fill="url(#strobiFormEye)" />
              <circle cx="39.5" cy="42" r="2" fill="#ffffff" />
              <circle cx="42" cy="52" r="1.2" fill="#ffffff" opacity="0.6" />

              <rect x="61" y="38" width="9" height="21" rx="4.5" fill="url(#strobiFormEye)" />
              <circle cx="63.5" cy="42" r="2" fill="#ffffff" />
              <circle cx="66" cy="52" r="1.2" fill="#ffffff" opacity="0.6" />
            </g>
          )}
        </svg>

        {/* Status Dot */}
        <span className="absolute bottom-1 right-1 flex h-3 w-3">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              mood === 'error'
                ? 'bg-red-400'
                : mood === 'celebrate'
                ? 'bg-emerald-400'
                : 'bg-indigo-400'
            }`}
          />
          <span
            className={`relative inline-flex rounded-full h-3 w-3 border-2 border-white dark:border-[#161a24] ${
              mood === 'error'
                ? 'bg-red-500'
                : mood === 'celebrate'
                ? 'bg-emerald-500'
                : 'bg-indigo-600'
            }`}
          />
        </span>
      </button>

      {/* Dynamic Interactive Speech Bubble */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-[11px] font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1">
            <span>Strobi</span>
            <SparklesIcon className="w-3 h-3 text-indigo-500" />
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/[0.04] dark:bg-white/[0.06] text-zinc-500 dark:text-zinc-400">
            {mood === 'error'
              ? isMr ? 'दुरुस्ती' : 'Alert'
              : mood === 'celebrate'
              ? isMr ? 'यशस्वी' : 'Success'
              : mood === 'focus'
              ? isMr ? 'सक्रिय' : 'Typing'
              : isMr ? 'गाईड' : 'Guide'}
          </span>
        </div>

        <p
          className={`text-xs leading-relaxed transition-colors duration-200 ${
            mood === 'error'
              ? 'text-red-600 dark:text-red-400 font-medium'
              : mood === 'celebrate'
              ? 'text-emerald-700 dark:text-emerald-300 font-medium'
              : 'text-zinc-600 dark:text-zinc-400'
          }`}
        >
          {getSpeechText()}
        </p>
      </div>
    </div>
  );
};

export default AssistantBot;
