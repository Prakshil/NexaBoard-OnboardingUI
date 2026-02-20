
import React from 'react';
import { INDUSTRIES } from '../../constants';
import { ClientSubmission } from '../../types';
import { motion } from 'framer-motion';
import { Building2, User, Briefcase, Globe2, MessageSquare, Target, CalendarDays, ArrowRight, ArrowLeft } from 'lucide-react';

interface Props {
  data: Partial<ClientSubmission>;
  updateData: (data: Partial<ClientSubmission>) => void;
  onNext: () => void;
  onBack: () => void;
}

const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3191C4] transition-colors placeholder-gray-600";
const selectCls = "w-full bg-[#0e1220] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3191C4] transition-colors appearance-none";
const textareaCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3191C4] transition-colors placeholder-gray-600 resize-none";

const FieldWrapper: React.FC<{ icon: React.ReactNode; label: string; required?: boolean; error?: string; children: React.ReactNode }> = ({ icon, label, required, error, children }) => (
  <div>
    <label className="flex items-center gap-1.5 text-sm font-medium text-gray-300 mb-2">
      <span className="text-[#3191C4]">{icon}</span>
      {label}{required && <span className="text-[#3191C4]">*</span>}
    </label>
    {children}
    {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
  </div>
);

const BusinessDetails: React.FC<Props> = ({ data, updateData, onNext, onBack }) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!data.company_name) newErrors.company_name = 'Company Name is required';
    if (!data.contact_name) newErrors.contact_name = 'Your Name is required';
    if (!data.contact_role) newErrors.contact_role = 'Role is required';
    if (!data.industry) newErrors.industry = 'Industry is required';
    if (!data.business_details?.problem_solving || data.business_details.problem_solving.length < 20)
      newErrors.problem_solving = 'Please provide at least 20 characters';
    if (!data.business_details?.success_90_days || data.business_details.success_90_days.length < 20)
      newErrors.success_90_days = 'Please provide at least 20 characters';
    if (!data.business_details?.launch_date) newErrors.launch_date = 'Launch date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onNext();
  };

  const updateDetails = (field: string, value: any) => {
    updateData({
      business_details: { ...data.business_details, [field]: value } as any
    });
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const clearErr = (field: string) => {
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center mb-2">
        <h2 className="text-3xl font-extrabold mb-2">Business & Project Details</h2>
        <p className="text-gray-400">Tell us about your organisation so we can tailor the experience</p>
      </div>

      {/* Company Info */}
      <div className="glass-card-strong p-6 rounded-3xl space-y-5">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Organisation</p>

        <FieldWrapper icon={<Building2 className="w-3.5 h-3.5" />} label="Company Name" required error={errors.company_name}>
          <input
            type="text"
            placeholder="Acme Inc."
            className={inputCls}
            value={data.company_name || ''}
            onChange={e => { updateData({ company_name: e.target.value }); clearErr('company_name'); }}
          />
        </FieldWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FieldWrapper icon={<User className="w-3.5 h-3.5" />} label="Your Name" required error={errors.contact_name}>
            <input
              type="text"
              placeholder="Jane Smith"
              className={inputCls}
              value={data.contact_name || ''}
              onChange={e => { updateData({ contact_name: e.target.value }); clearErr('contact_name'); }}
            />
          </FieldWrapper>
          <FieldWrapper icon={<Briefcase className="w-3.5 h-3.5" />} label="Role / Title" required error={errors.contact_role}>
            <input
              type="text"
              placeholder="CEO / Founder"
              className={inputCls}
              value={data.contact_role || ''}
              onChange={e => { updateData({ contact_role: e.target.value }); clearErr('contact_role'); }}
            />
          </FieldWrapper>
        </div>

        <FieldWrapper icon={<Globe2 className="w-3.5 h-3.5" />} label="Industry" required error={errors.industry}>
          <select
            className={selectCls}
            value={data.industry || ''}
            onChange={e => { updateData({ industry: e.target.value }); clearErr('industry'); }}
          >
            <option value="">Select your industry</option>
            {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </FieldWrapper>
      </div>

      {/* Project Goals */}
      <div className="glass-card-strong p-6 rounded-3xl space-y-5">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Project Goals</p>

        <FieldWrapper icon={<MessageSquare className="w-3.5 h-3.5" />} label="What problem are you solving?" required error={errors.problem_solving}>
          <textarea
            rows={3}
            placeholder="Describe the core challenge your business faces right now..."
            className={textareaCls}
            value={data.business_details?.problem_solving || ''}
            onChange={e => updateDetails('problem_solving', e.target.value)}
          />
          <p className="text-xs text-gray-600 mt-1">{(data.business_details?.problem_solving || '').length} / 20+ chars</p>
        </FieldWrapper>

        <FieldWrapper icon={<Target className="w-3.5 h-3.5" />} label="What does success look like in 90 days?" required error={errors.success_90_days}>
          <textarea
            rows={3}
            placeholder="Define your success metrics & milestones..."
            className={textareaCls}
            value={data.business_details?.success_90_days || ''}
            onChange={e => updateDetails('success_90_days', e.target.value)}
          />
          <p className="text-xs text-gray-600 mt-1">{(data.business_details?.success_90_days || '').length} / 20+ chars</p>
        </FieldWrapper>

        <FieldWrapper icon={<MessageSquare className="w-3.5 h-3.5" />} label="Biggest concern about this project?">
          <textarea
            rows={2}
            placeholder="Any worries or blockers we should know about..."
            className={textareaCls}
            value={data.business_details?.biggest_concern || ''}
            onChange={e => updateDetails('biggest_concern', e.target.value)}
          />
        </FieldWrapper>

        <FieldWrapper icon={<CalendarDays className="w-3.5 h-3.5" />} label="Ideal Launch Date" required error={errors.launch_date}>
          <input
            type="date"
            min={new Date().toISOString().split('T')[0]}
            className={inputCls}
            value={data.business_details?.launch_date || ''}
            onChange={e => updateDetails('launch_date', e.target.value)}
          />
        </FieldWrapper>
      </div>

      <div className="flex justify-between pt-2">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3191C4] to-[#6C47FF] text-white px-10 py-3.5 rounded-2xl font-bold hover:brightness-110 transition-all blue-glow"
        >
          Next Step <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </form>
  );
};

export default BusinessDetails;
