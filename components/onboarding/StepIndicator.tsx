
import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { BRAND_NAME } from '../../constants';

interface Props {
  currentStep: number;
  titles: string[];
}

const StepIndicator: React.FC<Props> = ({ currentStep, titles }) => {
  const progress = ((currentStep - 1) / (titles.length - 1)) * 100;

  return (
    <div className="w-full">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          {/* Logo mark */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3191C4] to-[#6C47FF] flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-extrabold text-base tracking-tight">{BRAND_NAME}</span>
        </div>

        <div className="text-right">
          <span className="text-xs text-gray-500 block">Step {currentStep} of {titles.length}</span>
          <span className="text-sm font-semibold text-[#3191C4]">{Math.round(progress)}% Complete</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden mb-8">
        <motion.div
          className="absolute h-full rounded-full bg-gradient-to-r from-[#3191C4] to-[#6C47FF]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Step nodes */}
      <div className="flex justify-between relative">
        {/* Connector line behind nodes */}
        <div className="absolute top-5 left-0 right-0 h-px bg-white/8 z-0" />

        {titles.map((title, idx) => {
          const stepNum = idx + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <div key={title} className="flex flex-col items-center flex-1 text-center relative z-10">
              <motion.div
                animate={isActive ? { scale: [1, 1.12, 1] } : {}}
                transition={{ duration: 0.4 }}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 transition-all duration-300 text-sm font-bold
                  ${isActive
                    ? 'bg-gradient-to-br from-[#3191C4] to-[#6C47FF] border-transparent text-white blue-glow'
                    : isCompleted
                      ? 'bg-gradient-to-br from-[#3191C4] to-[#6C47FF] border-transparent text-white'
                      : 'bg-[#050810] border-white/15 text-gray-600'}
                `}
              >
                {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : stepNum}
              </motion.div>
              <span className={`text-xs font-semibold hidden sm:block transition-colors ${isActive ? 'text-[#3191C4]' : isCompleted ? 'text-gray-400' : 'text-gray-600'}`}>
                {title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
