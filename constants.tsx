
import React from 'react';
import { Globe, PhoneCall, Settings, Code, BarChart2, MessageSquare, Shield, Layers } from 'lucide-react';
import { ServiceType } from './types';

export const BRAND_NAME = 'NexaBoard';

export const COLORS = {
  black: '#050810',
  blue: '#3191C4',
  purple: '#6C47FF',
  white: '#F0F4FF',
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B'
};

export const SERVICES: { id: ServiceType; title: string; description: string; icon: React.ReactNode; badge?: string }[] = [
  {
    id: 'website_build',
    title: 'Website Build',
    description: 'Custom, high-converting websites that turn visitors into loyal customers',
    icon: <Globe className="w-8 h-8" />
  },
  {
    id: 'ai_receptionist',
    title: 'AI Receptionist',
    description: '24/7 intelligent call handling, lead capture & appointment booking',
    icon: <PhoneCall className="w-8 h-8" />
  },
  {
    id: 'ai_automation',
    title: 'AI Automation',
    description: 'Automate repetitive workflows and supercharge your operations',
    icon: <Settings className="w-8 h-8" />
  },
  {
    id: 'software_build',
    title: 'Software Build',
    description: 'Bespoke software solutions engineered precisely for your business',
    icon: <Code className="w-8 h-8" />
  },
  {
    id: 'ai_analytics',
    title: 'AI Analytics',
    description: 'Turn raw data into strategic insights with real-time AI dashboards',
    icon: <BarChart2 className="w-8 h-8" />,
    badge: 'New'
  },
  {
    id: 'ai_chatbot',
    title: 'AI Chatbot',
    description: 'Engage visitors 24/7 with a conversational AI agent trained on your brand',
    icon: <MessageSquare className="w-8 h-8" />,
    badge: 'Popular'
  }
];

export const INDUSTRIES = [
  'Healthcare', 'Legal Services', 'E-commerce', 'SaaS', 'Consulting',
  'Real Estate', 'Dental/Aesthetics', 'Financial Services', 'Hospitality',
  'Education', 'Manufacturing', 'Non-Profit', 'Retail', 'Other'
];

export const COMPANY_SIZES = [
  'Solo / Freelancer',
  '2–10 employees',
  '11–50 employees',
  '51–200 employees',
  '200+ employees'
];

export const BUDGET_RANGES = [
  'Under $2,000',
  '$2,000 – $5,000',
  '$5,000 – $15,000',
  '$15,000 – $50,000',
  '$50,000+'
];

export const TIMELINE_OPTIONS = [
  'ASAP (< 2 weeks)',
  '1 month',
  '1–3 months',
  '3–6 months',
  'Flexible'
];

export const HOW_HEARD_OPTIONS = [
  'Google Search',
  'Social Media',
  'Referral / Word of Mouth',
  'LinkedIn',
  'Event / Conference',
  'Other'
];

export const STEP_TITLES = [
  'Service',
  'Your Business',
  'Budget & Timeline',
  'Requirements',
  'Assets & Booking'
];
