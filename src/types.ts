export type MainNavTab =
  | "projects"
  | "clients"
  | "protection_check"
  | "templates"
  | "activity"
  | "settings"
  | "disclaimer";

export type ProjectSubTab =
  | "overview"
  | "scope"
  | "payments"
  | "changes"
  | "communication"
  | "records"
  | "handover";

export type ActiveTab = MainNavTab;

export interface ProjectActionRequired {
  title: string;
  description: string;
  estimatedWork: string;
  recommendedAction: string;
  type: "scope_change" | "payment_overdue" | "approval_pending" | "feedback_delay";
  changeRequestId?: string;
}

export interface ProjectScopeItem {
  id: string;
  name: string;
  description: string;
  done: boolean;
}

export interface ProjectMilestone {
  id: string;
  name: string;
  amount: number;
  dueCondition: string;
  status: "deposit_received" | "pending" | "not_due" | "paid" | "overdue";
  dueDate?: string;
  notes?: string;
}

export interface ProjectChangeRequest {
  id: string;
  crNumber: string;
  requestedBy: string;
  requestDescription: string;
  analysis: string;
  isOutsideScope: boolean;
  additionalCost: number;
  additionalDays: number;
  status: "draft" | "awaiting_approval" | "approved" | "rejected";
  date: string;
  breakdown?: string[];
}

export interface ProjectTimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: "scope" | "payment" | "approval" | "warning" | "change_request" | "pending";
}

export interface ProjectItem {
  id: string;
  name: string;
  clientName: string;
  clientEmail?: string;
  value: number;
  targetDeadline: string;
  status: "active" | "requires_attention" | "on_track" | "completed" | "archived";
  currentPhase: string;
  unprotectedScopeAmount: number;
  protectionScore: number;
  actionRequired?: ProjectActionRequired;
  scope: {
    deliverables: ProjectScopeItem[];
    exclusions: string[];
    revisionLimit: number;
    assumptions: string[];
    definitionOfDone: string[];
  };
  payment: {
    totalValue: number;
    milestones: ProjectMilestone[];
    depositCleared: boolean;
    finalHandoverLocked: boolean;
  };
  clientResponsibilities: {
    items: { id: string; label: string; provided: boolean }[];
    feedbackSlaDays: number;
    singleDecisionMaker: string;
  };
  changeRequests: ProjectChangeRequest[];
  timeline: ProjectTimelineEvent[];
  handover: {
    deliverablesApproved: boolean;
    finalInvoicePaid: boolean;
    filesBackedUp: boolean;
    credentialsTransferred: boolean;
    warrantyActive: boolean;
  };
}

export interface ClientItem {
  id: string;
  name: string;
  company: string;
  email: string;
  decisionMaker: string;
  riskRating: "Low" | "Moderate" | "High";
  preferredChannel: string;
  activeProjectsCount: number;
  totalRevenue: number;
  notes: string;
}

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

export interface IssuePlaybook {
  id: string;
  title: string;
  problem: string;
  steps: {
    stepNumber: number;
    actionTitle: string;
    details: string;
    whatToSend?: string;
  }[];
  criticalRule: string;
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
  status: "pending" | "invoiced" | "paid" | "deposit_received" | "not_due" | "overdue";
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


