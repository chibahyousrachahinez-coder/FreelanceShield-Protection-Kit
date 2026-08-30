import React, { useState } from "react";
import {
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  DollarSign,
  Layers,
  MessageSquare,
  ClipboardList,
  CheckCircle2,
  Copy,
  Check,
  Send,
  Plus,
  Clock,
  UserCheck,
  Lock,
  ExternalLink,
  ChevronRight,
  Sparkle,
} from "lucide-react";
import { ProjectItem, ProjectSubTab, ProjectChangeRequest } from "../types";
import { ProtectionScoreModal } from "./ProtectionScoreModal";

interface ProjectHubViewProps {
  project: ProjectItem;
  onBack: () => void;
  onUpdateProject: (updated: ProjectItem) => void;
}

export const ProjectHubView: React.FC<ProjectHubViewProps> = ({
  project,
  onBack,
  onUpdateProject,
}) => {
  const [subTab, setSubTab] = useState<ProjectSubTab>("overview");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);

  // Scope Management Engine State
  const [incomingRequestText, setIncomingRequestText] = useState(
    "Hey! Can you also add a customer booking calendar and Stripe deposit payment? Shouldn't take long to plug in."
  );
  const [analyzedScope, setAnalyzedScope] = useState<{
    isOutsideScope: boolean;
    analysis: string;
    impactHours: string;
    timelineDays: number;
    recommendedFee: number;
    breakdown: string[];
  } | null>({
    isOutsideScope: true,
    analysis: "The request introduces user authentication, booking database tables, third-party Stripe Webhook listeners, and SMS confirmations not included in the original 5-page static SOW.",
    impactHours: "8–12 hours",
    timelineDays: 4,
    recommendedFee: 450,
    breakdown: [
      "Stripe Checkout & Webhook API integration",
      "Interactive calendar UI with reservation slots",
      "Transactional email confirmation system",
      "Staging testing and payment flow verification",
    ],
  });

  // Client Communication Tone Selector State
  const [selectedCommunicationScenario, setSelectedCommunicationScenario] = useState<string>("scope_change");
  const [selectedTone, setSelectedTone] = useState<"friendly" | "professional" | "firm">("professional");

  // Client Approval Link Simulation
  const [showApprovalPagePreview, setShowApprovalPagePreview] = useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAnalyzeScope = () => {
    if (!incomingRequestText.trim()) return;
    const lower = incomingRequestText.toLowerCase();
    const isOut =
      lower.includes("stripe") ||
      lower.includes("payment") ||
      lower.includes("booking") ||
      lower.includes("login") ||
      lower.includes("auth") ||
      lower.includes("dashboard") ||
      lower.includes("seo") ||
      lower.includes("app") ||
      lower.includes("extra") ||
      lower.includes("database");

    setAnalyzedScope({
      isOutsideScope: isOut,
      analysis: isOut
        ? "The request introduces functionality and architecture not included in the original signed Statement of Work."
        : "The request appears to be a minor adjustment within agreed revision parameters.",
      impactHours: isOut ? "6–12 hours" : "1–2 hours",
      timelineDays: isOut ? 4 : 0,
      recommendedFee: isOut ? 450 : 0,
      breakdown: isOut
        ? [
            "Architecture & database schema modifications",
            "Third-party API / webhook integration",
            "Staging UI components and user verification",
            "Cross-browser testing and QA",
          ]
        : ["Minor CSS / layout polish within agreed revision rounds"],
    });
  };

  const handleCreateChangeRequest = () => {
    if (!analyzedScope) return;
    const crCount = project.changeRequests.length + 1;
    const newCr: ProjectChangeRequest = {
      id: `cr-${Date.now()}`,
      crNumber: `CR-00${crCount}`,
      requestedBy: project.clientResponsibilities.singleDecisionMaker || project.clientName,
      requestDescription: incomingRequestText,
      analysis: analyzedScope.analysis,
      isOutsideScope: analyzedScope.isOutsideScope,
      additionalCost: analyzedScope.recommendedFee,
      additionalDays: analyzedScope.timelineDays,
      status: "awaiting_approval",
      date: new Date().toISOString().split("T")[0],
      breakdown: analyzedScope.breakdown,
    };

    const updatedTimeline = [
      ...project.timeline,
      {
        id: `tl-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        title: `Change Request ${newCr.crNumber} Created (+$${newCr.additionalCost})`,
        description: `Client requested: "${newCr.requestDescription}". Sent for written approval.`,
        type: "change_request" as const,
      },
    ];

    onUpdateProject({
      ...project,
      status: "requires_attention",
      unprotectedScopeAmount: project.unprotectedScopeAmount + newCr.additionalCost,
      actionRequired: {
        title: `Client approval pending on ${newCr.crNumber}`,
        description: `Awaiting written sign-off for $${newCr.additionalCost} addition before starting work.`,
        estimatedWork: `+${newCr.additionalDays} days schedule adjustment`,
        recommendedAction: "Do not write code for this feature until client signs off in writing.",
        type: "scope_change",
        changeRequestId: newCr.id,
      },
      changeRequests: [...project.changeRequests, newCr],
      timeline: updatedTimeline,
    });

    setSubTab("changes");
  };

  const handleApproveChangeRequest = (crId: string) => {
    const updatedCrs = project.changeRequests.map((cr) =>
      cr.id === crId ? { ...cr, status: "approved" as const } : cr
    );

    const targetCr = project.changeRequests.find((c) => c.id === crId);
    const addedCost = targetCr ? targetCr.additionalCost : 0;

    const updatedTimeline = [
      ...project.timeline,
      {
        id: `tl-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        title: `Change Request ${targetCr?.crNumber || "CR"} Approved by Client`,
        description: `Client approved $${addedCost} adjustment in writing. Work authorized.`,
        type: "approval" as const,
      },
    ];

    onUpdateProject({
      ...project,
      status: "on_track",
      value: project.value + addedCost,
      unprotectedScopeAmount: Math.max(0, project.unprotectedScopeAmount - addedCost),
      actionRequired: undefined,
      changeRequests: updatedCrs,
      timeline: updatedTimeline,
    });
  };

  // Dynamic Contextual Scripts Generator
  const getContextualScript = () => {
    if (selectedCommunicationScenario === "scope_change") {
      if (selectedTone === "friendly") {
        return {
          subject: `Update on ${project.name} — New feature request`,
          body: `Hi ${project.clientName.split(" ")[0]},\n\nThanks for sending over the idea for the extra features! That sounds like a wonderful enhancement for the platform.\n\nI checked it against our agreed Statement of Work, and because it's a new capability outside our original 5-page setup, I've put together Change Request #CR-001 ($450 / +4 business days). We can either add it to this sprint upon your sign-off or queue it up for Phase 2 right after launch.\n\nLet me know which you prefer!`,
          strategy: "Affirms the client's excitement while instantly framing the new feature as a paid Change Request without confrontation.",
        };
      }
      if (selectedTone === "firm") {
        return {
          subject: `Scope notice: Change Request required for ${project.name}`,
          body: `Hi ${project.clientName.split(" ")[0]},\n\nI reviewed your request for the additional features. As specified in Section 3 of our signed SOW, payment integrations and booking databases are explicitly excluded from the base scope.\n\nTo add this without delaying our current launch date, please review and approve Change Request #CR-001 (+$450 / +4 days). Work on this feature will begin once written authorization is received.`,
          strategy: "Cites the contract clauses directly and establishes an immovable boundary against unbilled labor.",
        };
      }
      return {
        subject: `Scope & Change Request review — ${project.name}`,
        body: `Hi ${project.clientName.split(" ")[0]},\n\nThank you for the additional request! I checked it against our agreed Statement of Work.\n\nBecause this feature introduces new database and payment logic, it sits outside our current deliverables. I've prepared Change Request #CR-001 for $450 with a 4-day timeline adjustment.\n\nWould you like me to incorporate this into our current milestone, or shall we save it for an immediate Phase 2 post-launch?`,
        strategy: "The gold-standard diplomatic response: offers 2 clear options and attaches a transparent price tag.",
      };
    }

    if (selectedCommunicationScenario === "overdue_payment") {
      if (selectedTone === "friendly") {
        return {
          subject: `Quick check-in regarding Milestone invoice — ${project.name}`,
          body: `Hi ${project.clientName.split(" ")[0]},\n\nHope your week is going great! Just following up on the Milestone 2 invoice sent on [Date]. Please let me know if accounting needs any additional details from my end to process it.\n\nExcited to move into the final phase!`,
          strategy: "Gently assumes positive intent and reminds the client without hostility.",
        };
      }
      if (selectedTone === "firm") {
        return {
          subject: `Development paused: Milestone invoice overdue — ${project.name}`,
          body: `Hi ${project.clientName.split(" ")[0]},\n\nFollowing up on overdue Invoice #[Number]. Per our project agreement, active development pauses when milestones exceed 3 business days past due.\n\nWe have paused work on Milestone 3 to protect the schedule and will resume immediately once payment clears.`,
          strategy: "Enforces the contractual pause trigger objectively to protect your unpaid hours.",
        };
      }
      return {
        subject: `Invoice follow-up & schedule notice — ${project.name}`,
        body: `Hi ${project.clientName.split(" ")[0]},\n\nFollowing up on the Milestone invoice sent on [Date]. To keep our target launch date on track and begin the next sprint, we need this invoice cleared by [Date].\n\nPlease let me know once processed so we can proceed smoothly!`,
        strategy: "Links the payment directly to preserving the client's own launch deadline.",
      };
    }

    // Default: Delayed Feedback
    return {
      subject: `Launch timeline update & feedback needed — ${project.name}`,
      body: `Hi ${project.clientName.split(" ")[0]},\n\nQuick heads up regarding our delivery schedule: to hit our target launch date of ${project.targetDeadline}, we'll need your consolidated staging feedback by [Day].\n\nIf delayed past then, our delivery date will shift day-for-day to maintain quality. Thanks!`,
      strategy: "Enforces the Timeline Shift clause so you are never blamed for client-side delays.",
    };
  };

  const activeScript = getContextualScript();

  return (
    <div className="space-y-6">
      {/* Top Project Breadcrumb & Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-xl bg-[#0a0f1d] border border-emerald-500/20 text-slate-300 hover:text-white hover:border-yellow-400/50 hover:bg-[#121c35] transition-all shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{project.name}</h1>
              <span
                className={`px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                  project.status === "requires_attention"
                    ? "bg-yellow-500/15 border border-yellow-400/40 text-yellow-300 shadow-[0_0_10px_rgba(250,204,21,0.2)]"
                    : project.status === "completed"
                    ? "bg-slate-800 text-slate-400"
                    : "bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                }`}
              >
                {project.status === "requires_attention" ? "⚡ Requires Scope Action" : project.status === "completed" ? "✓ Project Completed" : "● Gated & Protected"}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Client: <strong className="text-slate-200 font-sans">{project.clientName}</strong> • Budget: <strong className="text-emerald-400 font-mono">${project.value.toLocaleString()}</strong> • Target Launch: <strong className="text-slate-300 font-mono">{project.targetDeadline}</strong>
            </p>
          </div>
        </div>

        {/* Protection Health Pill & Action Link */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsScoreModalOpen(true)}
            className="flex items-center space-x-2.5 bg-gradient-to-r from-emerald-500/10 to-yellow-500/10 hover:from-emerald-500/20 hover:to-yellow-500/20 border border-emerald-400/30 hover:border-yellow-400/60 transition-all px-4 py-2 rounded-xl text-left cursor-pointer group shadow-[0_0_15px_rgba(16,185,129,0.1)]"
            title="Click to view full Protection Score breakdown"
          >
            <ShieldCheck className="h-4 w-4 text-emerald-400 group-hover:scale-110 group-hover:text-yellow-400 transition-transform" />
            <span className="text-xs text-slate-300 font-medium">Protection:</span>
            <span className="text-xs font-extrabold text-emerald-300 font-mono">{project.protectionScore}/100</span>
          </button>

          <button
            onClick={() => setShowApprovalPagePreview(!showApprovalPagePreview)}
            className="flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-yellow-500/20 hover:from-emerald-500/30 hover:to-yellow-500/30 border border-emerald-500/40 text-emerald-200 hover:text-white px-3.5 py-2 text-xs font-semibold transition-all shadow-sm"
          >
            <ExternalLink className="h-3.5 w-3.5 text-yellow-400" />
            <span>Client Approval Link</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Bar - Glowing Neon Pills */}
      <div className="flex items-center space-x-1.5 overflow-x-auto border-b border-emerald-500/20 pb-2 text-xs">
        {[
          { id: "overview" as ProjectSubTab, label: "Overview", icon: ShieldCheck },
          { id: "scope" as ProjectSubTab, label: "Scope & Exclusions", icon: FileCheck2 },
          { id: "payments" as ProjectSubTab, label: "Payments", icon: DollarSign },
          { id: "changes" as ProjectSubTab, label: "Changes & CRs", icon: Layers, badge: project.changeRequests.filter(c => c.status === "awaiting_approval").length || undefined },
          { id: "communication" as ProjectSubTab, label: "Communication", icon: MessageSquare },
          { id: "records" as ProjectSubTab, label: "Evidence Records", icon: ClipboardList },
          { id: "handover" as ProjectSubTab, label: "Handover", icon: Lock },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-gradient-to-r from-emerald-500/20 via-lime-500/10 to-yellow-500/10 border border-emerald-400/50 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#0c1424] border border-transparent"
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${isActive ? "text-yellow-400" : ""}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="h-4 min-w-[16px] px-1 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-extrabold text-[10px] flex items-center justify-center animate-pulse">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* CLIENT APPROVAL PAGE SIMULATOR MODAL */}
      {showApprovalPagePreview && (
        <div className="rounded-2xl border border-emerald-500/40 bg-slate-950 p-6 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Shareable Client Approval Page (Live Preview)</span>
            </div>
            <button
              onClick={() => setShowApprovalPagePreview(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              ✕ Close Preview
            </button>
          </div>

          <div className="max-w-2xl mx-auto rounded-xl border border-slate-800 bg-slate-900/90 p-6 space-y-5">
            <div className="border-b border-slate-800 pb-4">
              <div className="text-xs text-slate-400">Project Change Request Approval</div>
              <h3 className="text-lg font-bold text-white">{project.name}</h3>
              <p className="text-xs text-slate-400 mt-1">Prepared for {project.clientName}</p>
            </div>

            {project.changeRequests.length > 0 ? (
              <div className="space-y-4">
                <div className="rounded-lg bg-slate-950 p-4 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">{project.changeRequests[0].crNumber}: {project.changeRequests[0].requestDescription}</span>
                    <span className="font-bold text-emerald-400">+${project.changeRequests[0].additionalCost}</span>
                  </div>
                  <p className="text-xs text-slate-400">{project.changeRequests[0].analysis}</p>
                  <div className="text-[11px] text-slate-500">Timeline Impact: +{project.changeRequests[0].additionalDays} business days</div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    onClick={() => {
                      alert("Clarification request sent to freelancer.");
                    }}
                    className="px-4 py-2 rounded-lg border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800"
                  >
                    Request Clarification
                  </button>
                  <button
                    onClick={() => {
                      handleApproveChangeRequest(project.changeRequests[0].id);
                      setShowApprovalPagePreview(false);
                    }}
                    className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold"
                  >
                    Approve Change Request ($450)
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">No pending change requests for this project right now.</p>
            )}
          </div>
        </div>
      )}

      {/* ===================== SUBTAB 1: OVERVIEW ===================== */}
      {subTab === "overview" && (
        <div className="space-y-6">
          {/* Action Required Banner */}
          {project.actionRequired ? (
            <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 p-6 space-y-4 shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-400">Action Required Before Proceeding</div>
                    <h2 className="text-base font-bold text-white">{project.actionRequired.title}</h2>
                    <p className="text-xs text-slate-300 leading-relaxed">{project.actionRequired.description}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800/80 text-xs">
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Estimated Additional Effort:</span>
                  <span className="font-bold text-white">{project.actionRequired.estimatedWork}</span>
                </div>
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Recommended Protection Action:</span>
                  <span className="font-bold text-amber-300">{project.actionRequired.recommendedAction}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  onClick={() => setSubTab("changes")}
                  className="rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2 text-xs font-bold transition-all shadow-md flex items-center space-x-1.5"
                >
                  <span>Review Change Request</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setSubTab("communication")}
                  className="rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 text-xs font-semibold transition-colors"
                >
                  <span>Draft Client Response</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 flex items-center justify-between shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">Project Status Normal</div>
                  <h2 className="text-sm font-bold text-white">All milestones and boundaries are on track</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Deposit is cleared and work matches agreed SOW.</p>
                </div>
              </div>
              <button
                onClick={() => setSubTab("scope")}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
              >
                Inspect Scope
              </button>
            </div>
          )}

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-1">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Payment Status</div>
              <div className="text-lg font-bold text-white">${project.value.toLocaleString()}</div>
              <div className="text-[11px] text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="h-3 w-3" />
                <span>Deposit received ($750)</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-1">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Unprotected Scope</div>
              <div className="text-lg font-bold text-white">${project.unprotectedScopeAmount}</div>
              <div className="text-[11px] text-slate-400">
                {project.unprotectedScopeAmount > 0 ? "Pending CR sign-off" : "100% contracted"}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-1">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Client Decision SLA</div>
              <div className="text-lg font-bold text-white">{project.clientResponsibilities.feedbackSlaDays} Business Days</div>
              <div className="text-[11px] text-slate-400">{project.clientResponsibilities.singleDecisionMaker}</div>
            </div>
          </div>

          {/* Deliverables Progress Snippet */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white uppercase tracking-wider">Deliverables Progress</span>
              <button onClick={() => setSubTab("scope")} className="text-emerald-400 hover:underline">View Full SOW</button>
            </div>

            <div className="space-y-2">
              {project.scope.deliverables.map((d) => (
                <div key={d.id} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className={`h-2 w-2 rounded-full ${d.done ? "bg-emerald-400" : "bg-slate-600"}`}></span>
                    <span className="text-slate-200 font-medium">{d.name}</span>
                  </div>
                  <span className="text-[11px] text-slate-500">{d.done ? "Completed" : "In Progress"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================== SUBTAB 2: SCOPE & EXCLUSIONS ===================== */}
      {subTab === "scope" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400">Statement of Work (SOW)</h3>
              <p className="text-xs text-slate-400 mt-0.5">Agreed deliverables, exclusions, and revision limitations.</p>
            </div>
          </div>

          {/* Deliverables vs Exclusions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Included */}
            <div className="rounded-2xl border border-emerald-500/30 bg-slate-950 p-5 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>What is Included ({project.scope.deliverables.length})</span>
              </div>

              <div className="space-y-2.5">
                {project.scope.deliverables.map((d) => (
                  <div key={d.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                    <div className="font-bold text-white">{d.name}</div>
                    <p className="text-slate-400 text-[11px]">{d.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Explicitly Excluded */}
            <div className="rounded-2xl border border-rose-950/50 bg-slate-950 p-5 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-rose-400">
                <span className="h-4 w-4 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-[10px]">✕</span>
                <span>What is NOT Included (Exclusions: {project.scope.exclusions.length})</span>
              </div>

              <div className="space-y-2.5">
                {project.scope.exclusions.map((ex, i) => (
                  <div key={i} className="p-3 rounded-xl bg-rose-950/10 border border-rose-900/30 text-xs flex items-center space-x-2 text-rose-200">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>{ex}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Assumptions & Definition of Done */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Contractual Assumptions</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                {project.scope.assumptions.map((asm, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{asm}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Definition of Done (DoD)</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                {project.scope.definitionOfDone.map((dod, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{dod}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ===================== SUBTAB 3: PAYMENTS ===================== */}
      {subTab === "payments" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400">Payment Milestones & Protection</h3>
              <p className="text-xs text-slate-400 mt-0.5">Total Contract Value: ${project.payment.totalValue.toLocaleString()}</p>
            </div>
          </div>

          {/* Deposit Safety Banner */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 flex items-center justify-between text-xs text-emerald-300">
            <div className="flex items-center space-x-2.5">
              <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
              <span><strong>Kickoff Deposit Protected:</strong> Initial 50% invoice cleared prior to sprint start.</span>
            </div>
            <span className="font-bold text-white">$750 Received</span>
          </div>

          {/* Milestones List */}
          <div className="space-y-3">
            {project.payment.milestones.map((m, i) => (
              <div
                key={m.id}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs ${
                  m.status === "deposit_received" || m.status === "paid"
                    ? "bg-slate-950 border-emerald-500/30"
                    : m.status === "pending"
                    ? "bg-slate-900 border-amber-500/40"
                    : "bg-slate-950 border-slate-800"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-sm">{m.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        m.status === "deposit_received" || m.status === "paid"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : m.status === "pending"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {m.status === "deposit_received" ? "Paid / Cleared" : m.status === "pending" ? "Awaiting Staging Sign-off" : "Not Yet Due"}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Trigger: {m.dueCondition}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-bold text-white text-base">${m.amount.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-500">Due: {m.dueDate || "Upon Milestone"}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Golden Rule Callout */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-xs text-slate-400 flex items-start space-x-2.5">
            <Lock className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Golden Rule #5 Enforced:</strong> Live DNS and master credentials are locked until Milestone 3 ($300) is cleared in your bank.
            </span>
          </div>
        </div>
      )}

      {/* ===================== SUBTAB 4: CHANGES & CRS ===================== */}
      {subTab === "changes" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400">Scope Management & Change Requests</h3>
            <p className="text-xs text-slate-400 mt-0.5">Compare client messages against the SOW and generate instant Change Requests.</p>
          </div>

          {/* Scope Comparator Interactive Tool */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 shadow-xl">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-200">
              <Layers className="h-4 w-4 text-emerald-400" />
              <span>Incoming Client Request Scope Comparator</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-300">Paste Client Message / Request:</label>
              <textarea
                value={incomingRequestText}
                onChange={(e) => setIncomingRequestText(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
              <button
                onClick={handleAnalyzeScope}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center space-x-1.5"
              >
                <span>Re-Analyze Request</span>
              </button>
            </div>

            {analyzedScope && (
              <div className={`p-4 rounded-xl border space-y-3 text-xs ${
                analyzedScope.isOutsideScope
                  ? "bg-rose-950/20 border-rose-500/40 text-rose-200"
                  : "bg-emerald-950/20 border-emerald-500/40 text-emerald-200"
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-bold">
                    <span className="text-sm">{analyzedScope.isOutsideScope ? "🔴 OUTSIDE AGREED SCOPE" : "🟢 WITHIN REVISION SCOPE"}</span>
                  </div>
                  <span className="text-xs font-bold text-white">Estimated Value: +${analyzedScope.recommendedFee}</span>
                </div>

                <p className="text-xs text-slate-300">{analyzedScope.analysis}</p>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block">Estimated Work:</span>
                    <strong className="text-white">{analyzedScope.impactHours}</strong>
                  </div>
                  <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block">Timeline Impact:</span>
                    <strong className="text-white">+{analyzedScope.timelineDays} business days</strong>
                  </div>
                </div>

                {analyzedScope.isOutsideScope && (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleCreateChangeRequest}
                      className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-md"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Create Change Request #{`CR-00${project.changeRequests.length + 1}`} (+$450)</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Existing Change Requests */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Project Change Requests Log ({project.changeRequests.length})</h4>

            {project.changeRequests.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No Change Requests issued yet. Scope remains 100% contracted.</p>
            ) : (
              project.changeRequests.map((cr) => (
                <div key={cr.id} className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white text-sm">{cr.crNumber}: {cr.requestDescription}</span>
                      <div className="text-[11px] text-slate-400">Requested by {cr.requestedBy} on {cr.date}</div>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        cr.status === "approved"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : cr.status === "awaiting_approval"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-rose-500/20 text-rose-400"
                      }`}
                    >
                      {cr.status === "approved" ? "Approved by Client" : "Awaiting Client Sign-off"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                    <div>Additional Cost: <strong className="text-emerald-400">+${cr.additionalCost}</strong> • Timeline: <strong className="text-white">+{cr.additionalDays} days</strong></div>

                    {cr.status === "awaiting_approval" && (
                      <button
                        onClick={() => handleApproveChangeRequest(cr.id)}
                        className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs"
                      >
                        Record Client Approval
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ===================== SUBTAB 5: COMMUNICATION ===================== */}
      {subTab === "communication" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400">Contextual Client Communication</h3>
            <p className="text-xs text-slate-400 mt-0.5">Generate calibrated, non-confrontational scripts for every sensitive project situation.</p>
          </div>

          {/* Scenario & Tone Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">What's happening right now?</label>
              <select
                value={selectedCommunicationScenario}
                onChange={(e) => setSelectedCommunicationScenario(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="scope_change">Client requested out-of-scope work</option>
                <option value="overdue_payment">Milestone payment is overdue</option>
                <option value="delayed_feedback">Client feedback is stalling delivery</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Choose Communication Tone:</label>
              <div className="grid grid-cols-3 gap-2">
                {(["friendly", "professional", "firm"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTone(t)}
                    className={`py-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                      selectedTone === t
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generated Message Display Box */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-white">Subject: {activeScript.subject}</span>
              <button
                onClick={() => handleCopy(`${activeScript.subject}\n\n${activeScript.body}`, "active-script")}
                className="flex items-center space-x-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 px-3 py-1 text-xs font-bold transition-colors"
              >
                {copiedId === "active-script" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedId === "active-script" ? "Copied to Clipboard!" : "Copy Message"}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 font-mono text-xs text-slate-200 whitespace-pre-line leading-relaxed">
              {activeScript.body}
            </div>

            {/* Why This Works Box */}
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300/90 space-y-1">
              <span className="font-bold text-emerald-400 block text-[11px] uppercase tracking-wider">💡 Why This Strategy Works:</span>
              <p className="text-[11px] leading-relaxed text-slate-300">{activeScript.strategy}</p>
            </div>
          </div>
        </div>
      )}

      {/* ===================== SUBTAB 6: RECORDS ===================== */}
      {subTab === "records" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400">Project Evidence Timeline</h3>
            <p className="text-xs text-slate-400 mt-0.5">Chronological audit trail of scope agreements, approvals, and deposit receipts.</p>
          </div>

          {/* Vertical Evidence Timeline */}
          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
            {project.timeline.map((event) => (
              <div key={event.id} className="relative group">
                <div
                  className={`absolute -left-[27px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-slate-950 ${
                    event.type === "payment"
                      ? "bg-emerald-400"
                      : event.type === "approval"
                      ? "bg-cyan-400"
                      : event.type === "warning"
                      ? "bg-amber-400"
                      : event.type === "change_request"
                      ? "bg-purple-400"
                      : "bg-slate-500"
                  }`}
                ></div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-1 text-xs hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{event.title}</span>
                    <span className="text-[10px] font-mono text-slate-500">{event.date}</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================== SUBTAB 7: HANDOVER ===================== */}
      {subTab === "handover" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400">Final Handover & Project Closure</h3>
            <p className="text-xs text-slate-400 mt-0.5">Pre-flight delivery checklist to ensure zero unpaid work and safe credential transfer.</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4">
            <div className="space-y-3">
              {[
                { label: "All agreed SOW deliverables completed & verified on staging", checked: true },
                { label: "Client provided formal written milestone acceptance", checked: false },
                { label: "FINAL INVOICE PAID IN FULL ($300 balance cleared in bank)", checked: false, critical: true },
                { label: "All project source files and database backups archived locally", checked: true },
                { label: "Master domain DNS & hosting server credentials transferred", checked: false },
                { label: "14-Day bug-fix warranty support period activated", checked: false },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-xl border flex items-center space-x-3 text-xs ${
                    item.critical
                      ? "border-amber-500/40 bg-amber-500/5 text-amber-200"
                      : "border-slate-800 bg-slate-900/60 text-slate-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    readOnly
                    className="rounded border-slate-700 text-emerald-500 focus:ring-0"
                  />
                  <div>
                    <span className="font-semibold text-white">{item.label}</span>
                    {item.critical && <p className="text-[10px] text-amber-400 mt-0.5">⚠️ Never transfer master DNS until this box is checked.</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Protection Score Breakdown Modal */}
      <ProtectionScoreModal
        isOpen={isScoreModalOpen}
        onClose={() => setIsScoreModalOpen(false)}
        project={project}
        onFixIssues={(targetTab) => {
          if (targetTab) {
            setSubTab(targetTab as ProjectSubTab);
          }
        }}
      />
    </div>
  );
};
