
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { STEP_TITLES } from '../constants';
import ServiceSelector from '../components/onboarding/ServiceSelector';
import BusinessDetails from '../components/onboarding/BusinessDetails';
import BudgetTimeline from '../components/onboarding/BudgetTimeline';
import ServiceQuestions from '../components/onboarding/ServiceQuestions';
import AssetsAndBooking from '../components/onboarding/AssetsAndBooking';
import StepIndicator from '../components/onboarding/StepIndicator';
import { ServiceType, ClientSubmission } from '../types';
import { db, safeStorage } from '../services/db';
import toast from 'react-hot-toast';
import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react';

const TOTAL_STEPS = 5;

const OnboardingPortal: React.FC = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [formData, setFormData] = useState<Partial<ClientSubmission>>({
    service_type: undefined,
    business_details: { problem_solving: '', success_90_days: '', launch_date: '' },
    budget_and_timeline: {
      budget_range: '', timeline: '', how_heard: '', company_size: '',
      contact_email: '', contact_phone: '', company_website: '', linkedin_url: ''
    },
    service_responses: {},
    uploaded_files: []
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resetOnboarding = () => {
    setStep(1);
    setDirection(1);
    setFormData({
      service_type: undefined,
      business_details: { problem_solving: '', success_90_days: '', launch_date: '' },
      budget_and_timeline: {
        budget_range: '', timeline: '', how_heard: '', company_size: '',
        contact_email: '', contact_phone: '', company_website: '', linkedin_url: ''
      },
      service_responses: {},
      uploaded_files: []
    });
    setIsSubmitted(false);
    setIsLoading(false);
    safeStorage.removeItem('onboarding_progress');
  };

  useEffect(() => {
    const saved = safeStorage.getItem('onboarding_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.step < TOTAL_STEPS) {
          setFormData(parsed.data);
          setStep(parsed.step);
        }
      } catch (_) {
        console.warn('Failed to parse onboarding progress');
      }
    }
  }, []);

  useEffect(() => {
    if (step > 1 && !isSubmitted) {
      safeStorage.setItem('onboarding_progress', JSON.stringify({ step, data: formData }));
    }
  }, [step, formData, isSubmitted]);

  const handleNext = () => {
    setDirection(1);
    setStep(prev => Math.min(prev + 1, TOTAL_STEPS));
  };
  const handleBack = () => {
    setDirection(-1);
    setStep(prev => Math.max(prev - 1, 1));
  };

  const updateFormData = (newData: Partial<ClientSubmission>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await db.createSubmission(formData);
      safeStorage.removeItem('onboarding_progress');
      setIsSubmitted(true);
      toast.success('Onboarding complete! 🎉');
    } catch (err) {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 })
  };

  /* ── Success Screen ── */
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-mesh flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          className="glass-card-strong p-12 rounded-3xl text-center max-w-xl blue-glow"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 250 }}
              className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#3191C4] to-[#6C47FF] flex items-center justify-center blue-glow"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>
          </div>
          <h1 className="text-4xl font-extrabold mb-3">
            You're all set{formData.contact_name ? `, ${formData.contact_name.split(' ')[0]}` : ''}! 🎉
          </h1>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            We've received your details for <span className="text-white font-semibold">{formData.company_name || 'your company'}</span>.
            We'll be in touch within 24 hours.
          </p>

          <div className="glass-card rounded-2xl p-6 text-left space-y-4 mb-8">
            <h3 className="text-base font-bold text-gray-300">What happens next:</h3>
            {[
              { step: '1', text: 'Our team reviews your submission (within 24 hours).' },
              { step: '2', text: 'We connect on your scheduled strategy call.' },
              { step: '3', text: 'You receive a tailored project roadmap & proposal.' }
            ].map(item => (
              <div key={item.step} className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#3191C4] to-[#6C47FF] flex items-center justify-center text-xs font-bold text-white">
                  {item.step}
                </span>
                <span className="text-gray-400 text-sm">{item.text}</span>
              </div>
            ))}
          </div>

          <motion.button
            onClick={resetOnboarding}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3191C4] to-[#6C47FF] text-white px-8 py-3.5 rounded-2xl font-bold hover:brightness-110 transition-all blue-glow"
          >
            <Sparkles className="w-4 h-4" /> Start Another Onboarding
          </motion.button>
        </motion.div>
      </div>
    );
  }

  /* ── Main Onboarding ── */
  return (
    <div className="min-h-screen bg-mesh py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <StepIndicator currentStep={step} titles={STEP_TITLES} />

        <div className="mt-12">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: 'easeInOut' }}
            >
              {step === 1 && (
                <ServiceSelector
                  selected={formData.service_type}
                  onSelect={(type) => updateFormData({ service_type: type })}
                  onNext={handleNext}
                />
              )}

              {step === 2 && (
                <BusinessDetails
                  data={formData}
                  updateData={updateFormData}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}

              {step === 3 && (
                <BudgetTimeline
                  data={formData}
                  updateData={updateFormData}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}

              {step === 4 && (
                <ServiceQuestions
                  serviceType={formData.service_type!}
                  responses={formData.service_responses}
                  industry={formData.industry || ''}
                  updateResponses={(res) => updateFormData({ service_responses: res })}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}

              {step === 5 && (
                <AssetsAndBooking
                  files={formData.uploaded_files || []}
                  updateFiles={(files) => updateFormData({ uploaded_files: files })}
                  onBack={handleBack}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPortal;
