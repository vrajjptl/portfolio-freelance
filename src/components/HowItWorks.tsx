// src/components/HowItWorks.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ChatBubbleBottomCenterTextIcon,
  ClipboardDocumentListIcon,
  CodeBracketSquareIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface HowItWorksStep {
  step: string;
  title: string;
  timeline: string;
  desc: string;
}

const stepIcons = [
  <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />,
  <ClipboardDocumentListIcon className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />,
  <CodeBracketSquareIcon className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />,
  <CheckCircleIcon className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />,
];

const HowItWorks: React.FC = () => {
  const { t } = useTranslation();
  const steps = t('howItWorks.steps', { returnObjects: true }) as HowItWorksStep[];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto w-full scroll-mt-14">
      {/* Section Header */}
      <div className="max-w-2xl mb-12 space-y-2">
        <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          Process
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-950 dark:text-zinc-50">
          {t('howItWorks.title')}
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
          {t('howItWorks.subtitle')}
        </p>
      </div>

      {/* 4-Step Process Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((st, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-white dark:bg-[#11141c] border border-black/[0.08] dark:border-white/[0.08] shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-medium text-zinc-400 dark:text-zinc-500">
                  {`0${idx + 1}`}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  {st.timeline}
                </span>
              </div>

              <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-3">
                {stepIcons[idx % stepIcons.length]}
              </div>

              <h3 className="text-sm font-medium text-zinc-950 dark:text-zinc-100 mb-1.5">
                {st.title}
              </h3>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
                {st.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
