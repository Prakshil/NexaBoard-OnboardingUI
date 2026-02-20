
import React from 'react';
import { BUDGET_RANGES, TIMELINE_OPTIONS, HOW_HEARD_OPTIONS, COMPANY_SIZES } from '../../constants';
import { ClientSubmission, BudgetAndTimeline as BATType } from '../../types';
import { motion } from 'framer-motion';
import { DollarSign, Clock, Users, Link, Mail, Phone, Linkedin, ArrowRight, ArrowLeft } from 'lucide-react';

interface Props {
    data: Partial<ClientSubmission>;
    updateData: (data: Partial<ClientSubmission>) => void;
    onNext: () => void;
    onBack: () => void;
}

const OptionPill: React.FC<{
    label: string;
    selected: boolean;
    onClick: () => void;
}> = ({ label, selected, onClick }) => (
    <motion.button
        type="button"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
        className={`
      px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 text-left
      ${selected
                ? 'bg-gradient-to-r from-[#3191C4]/20 to-[#6C47FF]/20 border-[#3191C4] text-white'
                : 'glass-card border-white/10 text-gray-400 hover:border-white/25 hover:text-white'}
    `}
    >
        {label}
    </motion.button>
);

const SectionLabel: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
    <div className="flex items-center gap-2 mb-3">
        <span className="text-[#3191C4]">{icon}</span>
        <label className="text-sm font-semibold text-gray-300 uppercase tracking-wide">{text}</label>
    </div>
);

const BudgetTimeline: React.FC<Props> = ({ data, updateData, onNext, onBack }) => {
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const bat: Partial<BATType> = data.budget_and_timeline || {};

    const update = (field: keyof BATType, value: string) => {
        updateData({
            budget_and_timeline: { ...bat, [field]: value } as BATType
        });
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!bat.budget_range) newErrors.budget_range = 'Please select a budget range';
        if (!bat.timeline) newErrors.timeline = 'Please select a timeline';
        if (!bat.company_size) newErrors.company_size = 'Please select team size';
        if (!bat.contact_email) newErrors.contact_email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bat.contact_email))
            newErrors.contact_email = 'Enter a valid email address';
        if (!bat.how_heard) newErrors.how_heard = 'Please let us know how you found us';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) onNext();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-10 max-w-2xl mx-auto">
            <div className="text-center mb-2">
                <h2 className="text-3xl font-extrabold mb-2">Budget & Contact Details</h2>
                <p className="text-gray-400">Help us scope the project and stay in touch</p>
            </div>

            {/* Budget */}
            <div className="glass-card-strong p-6 rounded-3xl space-y-5">
                <div>
                    <SectionLabel icon={<DollarSign className="w-4 h-4" />} text="Estimated Budget" />
                    <div className="flex flex-wrap gap-3">
                        {BUDGET_RANGES.map(b => (
                            <OptionPill key={b} label={b} selected={bat.budget_range === b} onClick={() => update('budget_range', b)} />
                        ))}
                    </div>
                    {errors.budget_range && <p className="text-red-400 text-xs mt-2">{errors.budget_range}</p>}
                </div>

                <div>
                    <SectionLabel icon={<Clock className="w-4 h-4" />} text="Preferred Timeline" />
                    <div className="flex flex-wrap gap-3">
                        {TIMELINE_OPTIONS.map(t => (
                            <OptionPill key={t} label={t} selected={bat.timeline === t} onClick={() => update('timeline', t)} />
                        ))}
                    </div>
                    {errors.timeline && <p className="text-red-400 text-xs mt-2">{errors.timeline}</p>}
                </div>

                <div>
                    <SectionLabel icon={<Users className="w-4 h-4" />} text="Team / Company Size" />
                    <div className="flex flex-wrap gap-3">
                        {COMPANY_SIZES.map(s => (
                            <OptionPill key={s} label={s} selected={bat.company_size === s} onClick={() => update('company_size', s)} />
                        ))}
                    </div>
                    {errors.company_size && <p className="text-red-400 text-xs mt-2">{errors.company_size}</p>}
                </div>
            </div>

            {/* Contact Details */}
            <div className="glass-card-strong p-6 rounded-3xl space-y-5">
                <p className="text-sm font-bold text-gray-300 uppercase tracking-wide mb-1">Contact Info</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-[#3191C4]" /> Email Address *
                        </label>
                        <input
                            type="email"
                            placeholder="you@company.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3191C4] transition-colors"
                            value={bat.contact_email || ''}
                            onChange={e => update('contact_email', e.target.value)}
                        />
                        {errors.contact_email && <p className="text-red-400 text-xs mt-1">{errors.contact_email}</p>}
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-[#3191C4]" /> Phone Number
                        </label>
                        <input
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3191C4] transition-colors"
                            value={bat.contact_phone || ''}
                            onChange={e => update('contact_phone', e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 flex items-center gap-1.5">
                            <Link className="w-3.5 h-3.5 text-[#3191C4]" /> Company Website
                        </label>
                        <input
                            type="url"
                            placeholder="https://yourcompany.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3191C4] transition-colors"
                            value={bat.company_website || ''}
                            onChange={e => update('company_website', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 flex items-center gap-1.5">
                            <Linkedin className="w-3.5 h-3.5 text-[#3191C4]" /> LinkedIn Profile
                        </label>
                        <input
                            type="url"
                            placeholder="https://linkedin.com/in/..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3191C4] transition-colors"
                            value={bat.linkedin_url || ''}
                            onChange={e => update('linkedin_url', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* How did you hear */}
            <div className="glass-card-strong p-6 rounded-3xl">
                <SectionLabel icon={<Users className="w-4 h-4" />} text="How did you find us?" />
                <div className="flex flex-wrap gap-3">
                    {HOW_HEARD_OPTIONS.map(h => (
                        <OptionPill key={h} label={h} selected={bat.how_heard === h} onClick={() => update('how_heard', h)} />
                    ))}
                </div>
                {errors.how_heard && <p className="text-red-400 text-xs mt-2">{errors.how_heard}</p>}
            </div>

            <div className="flex justify-between pt-2">
                <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-gray-400 hover:text-white transition-colors"
                >
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

export default BudgetTimeline;
