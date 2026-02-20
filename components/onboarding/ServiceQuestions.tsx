
import React from 'react';
import { ServiceType } from '../../types';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface Props {
  serviceType: ServiceType;
  responses: any;
  industry: string;
  updateResponses: (responses: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3191C4] transition-colors placeholder-gray-600";
const selectCls = "w-full bg-[#0e1220] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3191C4] transition-colors appearance-none";
const textareaCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3191C4] transition-colors placeholder-gray-600 resize-none";

const FieldLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label className="block text-sm font-medium text-gray-300 mb-2">{children}</label>
);

const CheckGroup: React.FC<{
  items: string[];
  selected: string[];
  onChange: (val: string[]) => void;
}> = ({ items, selected, onChange }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    {items.map(item => {
      const checked = selected.includes(item);
      return (
        <label key={item} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition-all ${checked ? 'border-[#3191C4] bg-[#3191C4]/10' : 'glass-card border-white/8 hover:border-white/20'}`}>
          <input
            type="checkbox"
            className="w-4 h-4 accent-[#3191C4]"
            checked={checked}
            onChange={(e) => {
              if (e.target.checked) onChange([...selected, item]);
              else onChange(selected.filter(f => f !== item));
            }}
          />
          <span className="text-sm">{item}</span>
        </label>
      );
    })}
  </div>
);

const RadioGroup: React.FC<{
  name: string;
  options: string[];
  selected: string;
  onChange: (val: string) => void;
}> = ({ name, options, selected, onChange }) => (
  <div className="flex gap-3 flex-wrap">
    {options.map(opt => (
      <label key={opt}>
        <input type="radio" name={name} className="hidden peer" checked={selected === opt} onChange={() => onChange(opt)} />
        <div className="glass-card py-2.5 px-5 rounded-xl text-sm cursor-pointer border border-white/10 peer-checked:border-[#3191C4] peer-checked:bg-[#3191C4]/10 transition-all hover:border-white/25">
          {opt}
        </div>
      </label>
    ))}
  </div>
);

const ServiceQuestions: React.FC<Props> = ({ serviceType, responses, industry, updateResponses, onNext, onBack }) => {
  const handleChange = (key: string, value: any) => {
    updateResponses({ ...responses, [key]: value });
  };

  const renderWebsiteQuestions = () => (
    <div className="space-y-7">
      <div>
        <FieldLabel>Do you have an existing website? *</FieldLabel>
        <RadioGroup name="has_site" options={['Yes', 'No']} selected={responses.has_site || ''} onChange={v => handleChange('has_site', v)} />
      </div>

      {responses.has_site === 'Yes' && (
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
          <FieldLabel>Current Website URL</FieldLabel>
          <input type="url" placeholder="https://yoursite.com" className={inputCls} value={responses.current_url || ''} onChange={e => handleChange('current_url', e.target.value)} />
        </motion.div>
      )}

      <div>
        <FieldLabel>Required Features *</FieldLabel>
        <CheckGroup
          items={['Online Booking', 'Live Chat', 'Contact Forms', 'E-commerce', 'Blog', 'Client Portal', 'Payment Processing', 'SEO Optimization', 'Multilingual Support']}
          selected={responses.features || []}
          onChange={v => handleChange('features', v)}
        />
      </div>

      <div>
        <FieldLabel>Design Style Preference *</FieldLabel>
        <select className={selectCls} value={responses.style || ''} onChange={e => handleChange('style', e.target.value)}>
          <option value="">Select Style</option>
          {['Modern/Minimal', 'Bold/Creative', 'Corporate', 'Playful', 'Luxury', 'No Preference'].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <FieldLabel>Any websites you love the look of?</FieldLabel>
        <input type="text" placeholder="e.g. stripe.com, linear.app" className={inputCls} value={responses.inspiration || ''} onChange={e => handleChange('inspiration', e.target.value)} />
      </div>
    </div>
  );

  const renderReceptionistQuestions = () => (
    <div className="space-y-7">
      <div>
        <FieldLabel>Approx. daily call volume? *</FieldLabel>
        <select className={selectCls} value={responses.daily_calls || ''} onChange={e => handleChange('daily_calls', e.target.value)}>
          <option value="">Select volume</option>
          {['1-10', '10-25', '25-50', '50-100', '100+'].map(v => <option key={v} value={v}>{v} calls</option>)}
        </select>
      </div>

      <div>
        <FieldLabel>What's your biggest phone-handling frustration? *</FieldLabel>
        <textarea rows={3} className={textareaCls} placeholder="e.g. missed calls after hours, long hold times..." value={responses.frustration || ''} onChange={e => handleChange('frustration', e.target.value)} />
      </div>

      <div>
        <FieldLabel>What information should the AI collect? *</FieldLabel>
        <CheckGroup
          items={['Contact Info', 'Service Interest', 'Appointment Booking', 'Support Request', 'Billing Enquiry', 'Lead Qualification']}
          selected={responses.data_points || []}
          onChange={v => handleChange('data_points', v)}
        />
      </div>

      <div>
        <FieldLabel>CRM / Scheduling Tool to Integrate With</FieldLabel>
        <input type="text" placeholder="HubSpot, Calendly, Salesforce..." className={inputCls} value={responses.crm_tool || ''} onChange={e => handleChange('crm_tool', e.target.value)} />
      </div>

      <div>
        <FieldLabel>Call Forwarding Number *</FieldLabel>
        <input type="tel" placeholder="+1 (555) 000-0000" className={inputCls} value={responses.forward_phone || ''} onChange={e => handleChange('forward_phone', e.target.value)} />
      </div>
    </div>
  );

  const renderAutomationQuestions = () => {
    const volumeLabel = industry === 'E-commerce' ? 'Orders per month' : 'Client inquiries per month';
    return (
      <div className="space-y-7">
        <div>
          <FieldLabel>Top 3 repetitive tasks you want automated? *</FieldLabel>
          <textarea rows={4} className={textareaCls} placeholder="e.g. sending invoices, follow-up emails, report generation..." value={responses.tasks || ''} onChange={e => handleChange('tasks', e.target.value)} />
        </div>

        <div>
          <FieldLabel>Current tools / software stack *</FieldLabel>
          <input type="text" placeholder="HubSpot, Slack, Google Sheets, Zapier..." className={inputCls} value={responses.tools || ''} onChange={e => handleChange('tools', e.target.value)} />
        </div>

        <div>
          <FieldLabel>{volumeLabel} *</FieldLabel>
          <select className={selectCls} value={responses.volume || ''} onChange={e => handleChange('volume', e.target.value)}>
            <option value="">Select volume</option>
            {['<100', '100-500', '500-1000', '1000+'].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>

        <div>
          <FieldLabel>Describe your ideal automated workflow *</FieldLabel>
          <textarea rows={4} className={textareaCls} placeholder="Step-by-step description of the process..." value={responses.workflow || ''} onChange={e => handleChange('workflow', e.target.value)} />
        </div>

        <div>
          <FieldLabel>Estimated hours saved per week if automated?</FieldLabel>
          <RadioGroup name="hours_saved" options={['1-5 hrs', '5-15 hrs', '15-30 hrs', '30+ hrs']} selected={responses.hours_saved || ''} onChange={v => handleChange('hours_saved', v)} />
        </div>
      </div>
    );
  };

  const renderSoftwareQuestions = () => (
    <div className="space-y-7">
      <div>
        <FieldLabel>What type of software do you need? *</FieldLabel>
        <select className={selectCls} value={responses.sw_type || ''} onChange={e => handleChange('sw_type', e.target.value)}>
          <option value="">Select type</option>
          {['Web App', 'Mobile App (iOS/Android)', 'Desktop App', 'API / Backend', 'Internal Tool / Dashboard', 'Browser Extension'].map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>

      <div>
        <FieldLabel>Core problem this software solves *</FieldLabel>
        <textarea rows={3} className={textareaCls} placeholder="Describe the main user problem or gap..." value={responses.problem || ''} onChange={e => handleChange('problem', e.target.value)} />
      </div>

      <div>
        <FieldLabel>Key features needed *</FieldLabel>
        <textarea rows={4} className={textareaCls} placeholder="List the must-have features..." value={responses.sw_features || ''} onChange={e => handleChange('sw_features', e.target.value)} />
      </div>

      <div>
        <FieldLabel>Target users / audience</FieldLabel>
        <input type="text" placeholder="e.g. internal HR team, B2B clients, end consumers" className={inputCls} value={responses.target_users || ''} onChange={e => handleChange('target_users', e.target.value)} />
      </div>

      <div>
        <FieldLabel>Do you need user authentication?</FieldLabel>
        <RadioGroup name="needs_auth" options={['Yes', 'No', 'Not Sure']} selected={responses.needs_auth || ''} onChange={v => handleChange('needs_auth', v)} />
      </div>
    </div>
  );

  const renderAnalyticsQuestions = () => (
    <div className="space-y-7">
      <div>
        <FieldLabel>What data sources do you have? *</FieldLabel>
        <CheckGroup
          items={['CRM / Sales Data', 'Website Analytics', 'Social Media', 'E-commerce / POS', 'Database / SQL', 'Spreadsheets', 'Third-Party APIs']}
          selected={responses.data_sources || []}
          onChange={v => handleChange('data_sources', v)}
        />
      </div>

      <div>
        <FieldLabel>Key metrics you want to track *</FieldLabel>
        <textarea rows={3} className={textareaCls} placeholder="e.g. CAC, LTV, churn rate, revenue by channel..." value={responses.metrics || ''} onChange={e => handleChange('metrics', e.target.value)} />
      </div>

      <div>
        <FieldLabel>Who will use the dashboard?</FieldLabel>
        <RadioGroup name="dash_users" options={['Executives', 'Marketing', 'Sales', 'Operations', 'All Teams']} selected={responses.dash_users || ''} onChange={v => handleChange('dash_users', v)} />
      </div>

      <div>
        <FieldLabel>Reporting frequency needed?</FieldLabel>
        <RadioGroup name="report_freq" options={['Real-time', 'Daily', 'Weekly', 'Monthly']} selected={responses.report_freq || ''} onChange={v => handleChange('report_freq', v)} />
      </div>
    </div>
  );

  const renderChatbotQuestions = () => (
    <div className="space-y-7">
      <div>
        <FieldLabel>Where will the chatbot be deployed? *</FieldLabel>
        <CheckGroup
          items={['Website', 'WhatsApp', 'Facebook Messenger', 'Instagram DMs', 'Slack', 'SMS']}
          selected={responses.channels || []}
          onChange={v => handleChange('channels', v)}
        />
      </div>

      <div>
        <FieldLabel>Primary chatbot goal *</FieldLabel>
        <RadioGroup name="bot_goal" options={['Lead Generation', 'Customer Support', 'Appointment Booking', 'Order Tracking', 'FAQs']} selected={responses.bot_goal || ''} onChange={v => handleChange('bot_goal', v)} />
      </div>

      <div>
        <FieldLabel>Approximate monthly website / platform visitors</FieldLabel>
        <select className={selectCls} value={responses.monthly_visitors || ''} onChange={e => handleChange('monthly_visitors', e.target.value)}>
          <option value="">Select range</option>
          {['<1,000', '1,000–10,000', '10,000–50,000', '50,000+'].map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>

      <div>
        <FieldLabel>Top 5 questions your customers always ask</FieldLabel>
        <textarea rows={4} className={textareaCls} placeholder="List the most common customer questions..." value={responses.faq_questions || ''} onChange={e => handleChange('faq_questions', e.target.value)} />
      </div>

      <div>
        <FieldLabel>Existing knowledge base / documentation?</FieldLabel>
        <RadioGroup name="has_kb" options={['Yes', 'No', 'Partially']} selected={responses.has_kb || ''} onChange={v => handleChange('has_kb', v)} />
      </div>
    </div>
  );

  const serviceLabels: Record<string, string> = {
    website_build: 'Website Build',
    ai_receptionist: 'AI Receptionist',
    ai_automation: 'AI Automation',
    software_build: 'Software Build',
    ai_analytics: 'AI Analytics',
    ai_chatbot: 'AI Chatbot'
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <span className="inline-block bg-[#3191C4]/15 text-[#3191C4] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
          {serviceLabels[serviceType]}
        </span>
        <h2 className="text-3xl font-extrabold mb-2">Service Requirements</h2>
        <p className="text-gray-400">Help us understand your specific needs in detail</p>
      </div>

      <div className="glass-card p-8 rounded-3xl border-white/5">
        {serviceType === 'website_build' && renderWebsiteQuestions()}
        {serviceType === 'ai_receptionist' && renderReceptionistQuestions()}
        {serviceType === 'ai_automation' && renderAutomationQuestions()}
        {serviceType === 'software_build' && renderSoftwareQuestions()}
        {serviceType === 'ai_analytics' && renderAnalyticsQuestions()}
        {serviceType === 'ai_chatbot' && renderChatbotQuestions()}
      </div>

      <div className="flex justify-between mt-10">
        <button onClick={onBack} className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3191C4] to-[#6C47FF] text-white px-10 py-3.5 rounded-2xl font-bold hover:brightness-110 transition-all blue-glow"
        >
          Next Step <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default ServiceQuestions;
