
export type ServiceType =
  | 'website_build'
  | 'ai_receptionist'
  | 'ai_automation'
  | 'software_build'
  | 'ai_analytics'
  | 'ai_chatbot';

export type SubmissionStatus = 'pending_review' | 'in_progress' | 'completed';

export interface FileUpload {
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface BudgetAndTimeline {
  budget_range: string;
  timeline: string;
  how_heard: string;
  company_size: string;
  company_website?: string;
  contact_email: string;
  contact_phone?: string;
  linkedin_url?: string;
}

export interface ClientSubmission {
  id: string;
  service_type: ServiceType;
  company_name: string;
  contact_name: string;
  contact_role: string;
  industry: string;
  business_details: {
    problem_solving: string;
    success_90_days: string;
    launch_date: string;
    biggest_concern?: string;
  };
  budget_and_timeline: BudgetAndTimeline;
  service_responses: any;
  uploaded_files: FileUpload[];
  calendly_event_id?: string;
  status: SubmissionStatus;
  admin_notes?: string;
  created_at: string;
}

export interface OnboardingState {
  step: number;
  data: Partial<ClientSubmission>;
}
