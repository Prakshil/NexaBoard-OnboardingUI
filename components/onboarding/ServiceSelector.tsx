
import React from 'react';
import { SERVICES, BRAND_NAME } from '../../constants';
import { ServiceType } from '../../types';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

interface Props {
  selected?: ServiceType;
  onSelect: (type: ServiceType) => void;
  onNext: () => void;
}

const ServiceSelector: React.FC<Props> = ({ selected, onSelect, onNext }) => {
  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-[#3191C4] mb-5"
        >
          <Sparkles className="w-4 h-4" />
          Welcome to {BRAND_NAME}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="text-5xl font-extrabold mb-3 leading-tight"
        >
          What would you like
          <br />
          <span className="shimmer-text">us to build for you?</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="text-gray-400 text-lg max-w-xl mx-auto"
        >
          Select a service below to kick off your personalised onboarding journey. Takes less than 5 minutes.
        </motion.p>
      </div>

      {/* Service Cards */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.22 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {SERVICES.map((service, idx) => (
          <motion.button
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + idx * 0.07 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(service.id)}
            className={`
              glass-card p-7 rounded-3xl text-left transition-all duration-300 relative overflow-hidden group
              ${selected === service.id
                ? 'border-[#3191C4] blue-glow bg-gradient-to-br from-[#3191C4]/15 to-[#6C47FF]/10'
                : 'hover:border-white/20'}
            `}
          >
            {/* Badge */}
            {service.badge && (
              <span className={`absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full ${service.badge === 'New'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-[#6C47FF]/20 text-purple-400'
                }`}>
                {service.badge}
              </span>
            )}

            {/* Subtle background gradient on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br from-[#3191C4]/0 to-[#6C47FF]/0 group-hover:from-[#3191C4]/5 group-hover:to-[#6C47FF]/5 transition-all duration-500 rounded-3xl`} />

            <div className={`
              w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300
              ${selected === service.id
                ? 'bg-gradient-to-br from-[#3191C4] to-[#6C47FF] text-white shadow-lg'
                : 'bg-white/6 text-[#3191C4] group-hover:bg-[#3191C4]/15'}
            `}>
              {service.icon}
            </div>

            <h3 className="text-lg font-bold mb-1.5">{service.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>

            {selected === service.id && (
              <motion.div
                layoutId="selected-check"
                className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-[#3191C4] flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
          </motion.button>
        ))}
      </motion.div>

      <div className="flex justify-end mt-6">
        <motion.button
          disabled={!selected}
          onClick={onNext}
          whileHover={selected ? { scale: 1.04 } : {}}
          whileTap={selected ? { scale: 0.96 } : {}}
          className={`
            inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-base transition-all duration-300
            ${selected
              ? 'bg-gradient-to-r from-[#3191C4] to-[#6C47FF] text-white blue-glow hover:brightness-110'
              : 'bg-gray-800/60 text-gray-500 cursor-not-allowed'}
          `}
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default ServiceSelector;
