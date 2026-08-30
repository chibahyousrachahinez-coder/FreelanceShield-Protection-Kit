export type ActiveTab =
  | "workflow"
  | "start_here"
  | "case_study"
  | "client_screening"
  | "project_protection"
  | "payment_protection"
  | "scope_creep"
  | "client_communication"
  | "project_records"
  | "ai_tools"
  | "scorecard"
  | "bonus_resources"
  | "payhip_showcase"
  | "disclaimer";

export interface ScriptItem {
  id: string;
  category: string;
  categoryLabel?: string;
  title: string;
  scenario?: string;
  template?: string;
  proTip?: string;
  whenToUse?: string;
  whyItWorks?: string;
  friendlyVersion?: string;
  professionalVersion?: string;
  firmVersion?: string;
  tags: string[];
}

export interface RedFlagItem {
  id: string;
  quote: string;
  category: string;
  potentialRisk: string;
  whyItMatters: string;
  recommendedResponse: string;
  riskSeverity: "high" | "critical" | "medium";
}

export interface DiscoveryQuestionCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  questions: string[];
}

export interface SOWDeliverable {
  id: string;
  itemNumber: number;
  name: string;
  description: string;
  definitionOfDone: string;
  estimatedDays: string;
}

export interface PaymentMilestone {
  id: string;
  name: string;
  amount: number;
  dueCondition: string;
  status: "pending" | "invoiced" | "paid";
  dueDate?: string;
  notes?: string;
}

export interface ActivityLogEntry {
  id: string;
  date: string;
  event: string;
  person: string;
  decision: string;
  evidence: string;
  notes?: string;
}

export interface DecisionLogEntry {
  id: string;
  date: string;
  decision: string;
  approvedBy: string;
  evidence: string;
  impact: string;
}

export interface DelayTrackerItem {
  id: string;
  item: string;
  requestedDate: string;
  dueDate: string;
  daysWaiting: number;
  impact: "High" | "Medium" | "Low";
  status: "Waiting" | "Received" | "Escalated";
}

export interface ChangeRequestData {
  crNumber: string;
  projectName: string;
  clientName: string;
  freelancerName: string;
  date: string;
  originalScopeSummary: string;
  requestedChange: string;
  businessReason: string;
  additionalWorkBreakdown: string;
  additionalCost: number;
  additionalTimelineDays: number;
  status: "Draft" | "Pending Client Approval" | "Approved" | "Rejected";
}

export interface AiPrompt {
  id: string;
  title: string;
  category: string;
  description: string;
  promptText: string;
  exampleInput: string;
}

export interface ScorecardCategory {
  id: string;
  name: string;
  maxPoints: number;
  currentPoints: number;
  items: {
    id: string;
    label: string;
    points: number;
    checked: boolean;
    urgentFixMessage?: string;
  }[];
}
