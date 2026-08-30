import React, { useState } from "react";
import {
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Plus,
  Trash2,
  FileCheck2,
  DollarSign,
  UserCheck,
  Award,
} from "lucide-react";
import { ProjectItem, ProjectScopeItem, ProjectMilestone } from "../types";

interface NewProjectWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProject: (project: ProjectItem) => void;
}

export const NewProjectWizardModal: React.FC<NewProjectWizardModalProps> = ({
  isOpen,
  onClose,
  onSaveProject,
}) => {
  const [step, setStep] = useState<number>(1);

  // Step 1: Basics
  const [projectName, setProjectName] = useState("Brand Redesign & Web Platform");
  const [clientName, setClientName] = useState("Elena Rostova (Lumina Studio)");
  const [clientEmail, setClientEmail] = useState("elena@luminastudio.com");
  const [projectValue, setProjectValue] = useState<number>(2800);
  const [targetDeadline, setTargetDeadline] = useState("2026-10-15");

  // Step 2: Scope
  const [deliverables, setDeliverables] = useState<string[]>([
    "Custom Responsive Web Application (5 core screens)",
    "Component Design System in Figma & Tailwind CSS",
    "Contact & Lead Capture Form with Email Integration",
    "Staging Deployment & Cross-Browser QA",
  ]);
  const [newDeliverableInput, setNewDeliverableInput] = useState("");

  const [exclusions, setExclusions] = useState<string[]>([
    "Custom Copywriting & Marketing Content Creation",
    "Brand Logo Design & Vector Identity",
    "Ongoing Monthly Server Hosting & Domain Renewals",
    "Paid Third-Party API Subscriptions (Stripe, Twilio)",
    "Mobile Native App Stores (iOS / Android)",
  ]);
  const [newExclusionInput, setNewExclusionInput] = useState("");
  const [revisionLimit, setRevisionLimit] = useState<number>(2);

  // Step 3: Payment
  const [depositPercent, setDepositPercent] = useState<number>(50);
  const [milestone2Percent, setMilestone2Percent] = useState<number>(30);
  const [finalPercent, setFinalPercent] = useState<number>(20);

  // Step 4: Client Responsibilities
  const [mustProvideLogo, setMustProvideLogo] = useState(true);
  const [mustProvideCopy, setMustProvideCopy] = useState(true);
  const [mustProvideAssets, setMustProvideAssets] = useState(true);
  const [feedbackSlaDays, setFeedbackSlaDays] = useState<number>(3);
  const [decisionMaker, setDecisionMaker] = useState("Elena Rostova (Founder)");

  // Custom addition helpers
  const handleAddDeliverable = () => {
    if (newDeliverableInput.trim()) {
      setDeliverables([...deliverables, newDeliverableInput.trim()]);
      setNewDeliverableInput("");
    }
  };

  const handleRemoveDeliverable = (index: number) => {
    setDeliverables(deliverables.filter((_, i) => i !== index));
  };

  const handleAddExclusion = () => {
    if (newExclusionInput.trim()) {
      setExclusions([...exclusions, newExclusionInput.trim()]);
      setNewExclusionInput("");
    }
  };

  const handleRemoveExclusion = (index: number) => {
    setExclusions(exclusions.filter((_, i) => i !== index));
  };

  // Step 5: Score Calculation
  const calculateAuditScore = () => {
    let score = 0;
    // Scope (max 20)
    if (deliverables.length >= 3) score += 10;
    else if (deliverables.length > 0) score += 5;
    if (exclusions.length >= 3) score += 10;
    else if (exclusions.length > 0) score += 5;

    // Payment (max 20)
    if (depositPercent >= 40) score += 12;
    else if (depositPercent > 0) score += 6;
    if (finalPercent > 0) score += 8;

    // Client Responsibilities (max 15)
    if (mustProvideLogo && mustProvideCopy) score += 8;
    if (feedbackSlaDays <= 3) score += 7;

    // Approval Process (max 15)
    if (decisionMaker.trim().length > 3) score += 15;
    else score += 5;

    // Timeline & Revisions (max 15)
    if (revisionLimit <= 2) score += 10;
    if (targetDeadline) score += 5;

    // Documentation baseline (max 15)
    score += 15;

    return Math.min(100, score);
  };

  const currentScore = calculateAuditScore();

  const getIdentifiedFixes = () => {
    const issues: { title: string; desc: string }[] = [];
    if (!decisionMaker.trim()) {
      issues.push({
        title: "Approval authority is not defined",
        desc: "Specify exactly who is empowered to grant formal milestone sign-off.",
      });
    }
    if (feedbackSlaDays > 3) {
      issues.push({
        title: "Client review window exceeds 3 business days",
        desc: "Long feedback cycles risk calendar stall. Set SLA to 48-72 hours.",
      });
    }
    if (exclusions.length < 3) {
      issues.push({
        title: "Exclusions list has fewer than 3 items",
        desc: "Add explicit NOT INCLUDED items (e.g. copywriting, hosting, paid APIs) to prevent scope creep.",
      });
    }
    if (depositPercent < 40) {
      issues.push({
        title: "Kickoff deposit is under 40%",
        desc: "Require at least 40–50% cleared upfront to protect cashflow and commitment.",
      });
    }
    return issues;
  };

  const identifiedFixes = getIdentifiedFixes();

  const handleFinish = () => {
    const depositAmount = Math.round((projectValue * depositPercent) / 100);
    const m2Amount = Math.round((projectValue * milestone2Percent) / 100);
    const finalAmount = projectValue - depositAmount - m2Amount;

    const newMilestones: ProjectMilestone[] = [
      {
        id: "m-1",
        name: `Kickoff Deposit (${depositPercent}%)`,
        amount: depositAmount,
        dueCondition: "Cleared in bank before starting work",
        status: "deposit_received",
        dueDate: new Date().toISOString().split("T")[0],
        notes: "Locks development slot.",
      },
      {
        id: "m-2",
        name: `Milestone 2: Staging Demo (${milestone2Percent}%)`,
        amount: m2Amount,
        dueCondition: "Upon staging walkthrough approval",
        status: "pending",
        dueDate: targetDeadline,
        notes: "Core features functional.",
      },
      {
        id: "m-3",
        name: `Final Delivery & Handover (${finalPercent}%)`,
        amount: finalAmount,
        dueCondition: "Prior to live DNS pointing and master credentials transfer",
        status: "not_due",
        dueDate: targetDeadline,
        notes: "Master credentials release.",
      },
    ];

    const newDeliverableItems: ProjectScopeItem[] = deliverables.map((name, i) => ({
      id: `del-${i + 1}`,
      name,
      description: "Agreed deliverable in Statement of Work",
      done: false,
    }));

    const newProject: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: projectName,
      clientName,
      clientEmail,
      value: projectValue,
      targetDeadline,
      status: "on_track",
      currentPhase: "Project Kickoff",
      unprotectedScopeAmount: 0,
      protectionScore: currentScore,
      scope: {
        deliverables: newDeliverableItems,
        exclusions,
        revisionLimit,
        assumptions: [
          `Client feedback turnaround within ${feedbackSlaDays} business days.`,
          `Authorized decision-maker: ${decisionMaker}.`,
          "Delays in client asset delivery shift the launch date day-for-day.",
        ],
        definitionOfDone: [
          "All agreed deliverables tested across mobile, tablet, and desktop.",
          "Staging walkthrough verified with zero console errors.",
          "Formal written milestone sign-off received.",
        ],
      },
      payment: {
        totalValue: projectValue,
        milestones: newMilestones,
        depositCleared: true,
        finalHandoverLocked: true,
      },
      clientResponsibilities: {
        items: [
          { id: "cr-1", label: "Brand logo & vector assets", provided: mustProvideLogo },
          { id: "cr-2", label: "Approved website copy & text", provided: mustProvideCopy },
          { id: "cr-3", label: "Image assets & photography", provided: mustProvideAssets },
          { id: "cr-4", label: `Review turnaround within ${feedbackSlaDays} business days`, provided: true },
        ],
        feedbackSlaDays,
        singleDecisionMaker: decisionMaker,
      },
      changeRequests: [],
      timeline: [
        {
          id: `tl-${Date.now()}-1`,
          date: new Date().toISOString().split("T")[0],
          title: "Project Initialized in Protection System",
          description: `SOW locked with ${deliverables.length} deliverables, ${exclusions.length} exclusions, and ${depositPercent}% deposit.`,
          type: "scope",
        },
      ],
      handover: {
        deliverablesApproved: false,
        finalInvoicePaid: false,
        filesBackedUp: false,
        credentialsTransferred: false,
        warrantyActive: false,
      },
    };

    onSaveProject(newProject);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030611]/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl border border-emerald-500/30 bg-[#080d1a] shadow-[0_0_50px_rgba(16,185,129,0.15)] overflow-hidden my-8 backdrop-blur-xl">
        {/* Modal Header */}
        <div className="border-b border-emerald-500/20 px-6 py-4 flex items-center justify-between bg-gradient-to-r from-emerald-500/10 via-[#0a1020] to-[#080d1a]">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-yellow-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white tracking-tight">Project Protection Setup Wizard</h2>
              <p className="text-xs text-slate-400 font-mono">Step {step} of 5 — {step === 1 ? "Project Basics" : step === 2 ? "Scope & Exclusions" : step === 3 ? "Payment Milestones" : step === 4 ? "Client Responsibilities" : "Protection Check"}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800/80 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step Progress Indicator */}
        <div className="grid grid-cols-5 border-b border-emerald-500/20 bg-[#050811]/90 text-center text-xs font-mono">
          {[
            { num: 1, label: "Basics" },
            { num: 2, label: "Scope" },
            { num: 3, label: "Payment" },
            { num: 4, label: "Client SLA" },
            { num: 5, label: "Audit Check" },
          ].map((s) => (
            <div
              key={s.num}
              onClick={() => s.num < step && setStep(s.num)}
              className={`py-3 px-1 font-semibold transition-all cursor-pointer border-b-2 ${
                step === s.num
                  ? "border-yellow-400 text-yellow-300 bg-yellow-400/10 font-bold shadow-[0_0_10px_rgba(250,204,21,0.15)]"
                  : step > s.num
                  ? "border-emerald-400 text-emerald-300 bg-emerald-500/5"
                  : "border-transparent text-slate-600 cursor-not-allowed"
              }`}
            >
              <span>{s.num}. {s.label}</span>
            </div>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6">
          {/* STEP 1: BASICS */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400">Step 1 — Project Basics</h3>
                <p className="text-xs text-slate-400 mt-0.5">Define core project terms and financial value before committing.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-semibold text-slate-300">Project Name</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g. Restaurant Modern Web"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Client / Company Name</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. John Smith (Bistro 55)"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Client Contact Email</label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="client@company.com"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Total Project Value ($ USD)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-500 text-sm">$</span>
                    <input
                      type="number"
                      value={projectValue}
                      onChange={(e) => setProjectValue(Number(e.target.value))}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 pl-7 pr-3.5 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Target Delivery Deadline</label>
                  <input
                    type="date"
                    value={targetDeadline}
                    onChange={(e) => setTargetDeadline(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SCOPE & EXCLUSIONS */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400">Step 2 — Scope & Exclusions</h3>
                <p className="text-xs text-slate-400 mt-0.5">Don't only define what you are doing. Explicitly define what is NOT included.</p>
              </div>

              {/* What are you delivering? */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-1.5">
                    <FileCheck2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>What are you delivering? ({deliverables.length})</span>
                  </label>
                </div>

                <div className="space-y-2">
                  {deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-200">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveDeliverable(idx)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}

                  <div className="flex space-x-2 pt-1">
                    <input
                      type="text"
                      value={newDeliverableInput}
                      onChange={(e) => setNewDeliverableInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddDeliverable()}
                      placeholder="Add an included deliverable..."
                      className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    />
                    <button
                      onClick={handleAddDeliverable}
                      className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-200 hover:bg-slate-700 transition-colors flex items-center space-x-1"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* What is NOT included? */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                    <span>What is NOT included? (Exclusions: {exclusions.length})</span>
                  </label>
                </div>

                <div className="space-y-2">
                  {exclusions.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-lg border border-rose-950/40 bg-rose-950/10 px-3 py-2 text-xs text-rose-200">
                      <div className="flex items-center space-x-2">
                        <span className="text-rose-400 font-bold">✕</span>
                        <span>{item}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveExclusion(idx)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}

                  <div className="flex space-x-2 pt-1">
                    <input
                      type="text"
                      value={newExclusionInput}
                      onChange={(e) => setNewExclusionInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddExclusion()}
                      placeholder="Add an excluded item (e.g. SEO, hosting, paid APIs)..."
                      className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white focus:border-rose-500 focus:outline-none"
                    />
                    <button
                      onClick={handleAddExclusion}
                      className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-200 hover:bg-slate-700 transition-colors flex items-center space-x-1"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Revision Limit */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-200">Revision Limit per Milestone</div>
                  <div className="text-[11px] text-slate-400">Limits endless scope tweak cycles.</div>
                </div>
                <select
                  value={revisionLimit}
                  onChange={(e) => setRevisionLimit(Number(e.target.value))}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value={1}>1 Consolidated Round</option>
                  <option value={2}>2 Consolidated Rounds (Recommended)</option>
                  <option value={3}>3 Consolidated Rounds</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400">Step 3 — Payment Structure</h3>
                <p className="text-xs text-slate-400 mt-0.5">Tie payments strictly to project gates. Never start without cleared deposit.</p>
              </div>

              {/* Milestone Breakdown Summary */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
                <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Total Project Value</span>
                  <span className="font-bold text-white text-base">${projectValue.toLocaleString()}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <div>
                      <div className="font-bold text-emerald-400">Milestone 1 — Project Kickoff Deposit ({depositPercent}%)</div>
                      <div className="text-[11px] text-slate-400">Cleared in bank before writing code</div>
                    </div>
                    <div className="font-bold text-white">${Math.round((projectValue * depositPercent) / 100).toLocaleString()}</div>
                  </div>

                  <div className="flex justify-between items-center text-xs p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <div>
                      <div className="font-bold text-slate-200">Milestone 2 — Staging Demo ({milestone2Percent}%)</div>
                      <div className="text-[11px] text-slate-400">Upon staging walkthrough sign-off</div>
                    </div>
                    <div className="font-bold text-white">${Math.round((projectValue * milestone2Percent) / 100).toLocaleString()}</div>
                  </div>

                  <div className="flex justify-between items-center text-xs p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <div>
                      <div className="font-bold text-slate-200">Milestone 3 — Final Handover ({finalPercent}%)</div>
                      <div className="text-[11px] text-slate-400">Prior to live DNS and master keys transfer</div>
                    </div>
                    <div className="font-bold text-white">${(projectValue - Math.round((projectValue * depositPercent) / 100) - Math.round((projectValue * milestone2Percent) / 100)).toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Deposit Structure Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Choose Milestone Split Pattern</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setDepositPercent(50);
                      setMilestone2Percent(30);
                      setFinalPercent(20);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      depositPercent === 50
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                        : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="font-bold text-xs">50 / 30 / 20</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Standard Shield</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDepositPercent(50);
                      setMilestone2Percent(0);
                      setFinalPercent(50);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      depositPercent === 50 && milestone2Percent === 0
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                        : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="font-bold text-xs">50 / 50 Split</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Simple 2-Part</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDepositPercent(40);
                      setMilestone2Percent(40);
                      setFinalPercent(20);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      depositPercent === 40
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                        : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="font-bold text-xs">40 / 40 / 20</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Large Projects</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CLIENT RESPONSIBILITIES */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400">Step 4 — Client Responsibilities & SLA</h3>
                <p className="text-xs text-slate-400 mt-0.5">Clearly establish what the client must provide to avoid unbillable waiting time.</p>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-300">Client Must Provide Prior to Sprint Kickoff</label>
                
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 p-3 rounded-lg border border-slate-800 bg-slate-950 cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={mustProvideLogo}
                      onChange={(e) => setMustProvideLogo(e.target.checked)}
                      className="rounded border-slate-700 text-emerald-500 focus:ring-0"
                    />
                    <div className="text-xs">
                      <span className="font-semibold text-slate-200">High-Resolution Vector Logo & Brand Guidelines</span>
                      <p className="text-[11px] text-slate-500">Must be provided in SVG / PNG format.</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 p-3 rounded-lg border border-slate-800 bg-slate-950 cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={mustProvideCopy}
                      onChange={(e) => setMustProvideCopy(e.target.checked)}
                      className="rounded border-slate-700 text-emerald-500 focus:ring-0"
                    />
                    <div className="text-xs">
                      <span className="font-semibold text-slate-200">Final Approved Website Copy & Text</span>
                      <p className="text-[11px] text-slate-500">Delivered before Milestone 2 begins.</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 p-3 rounded-lg border border-slate-800 bg-slate-950 cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={mustProvideAssets}
                      onChange={(e) => setMustProvideAssets(e.target.checked)}
                      className="rounded border-slate-700 text-emerald-500 focus:ring-0"
                    />
                    <div className="text-xs">
                      <span className="font-semibold text-slate-200">Product Photography & Image Assets</span>
                      <p className="text-[11px] text-slate-500">Client holds commercial usage rights.</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Client Feedback SLA Window</label>
                  <select
                    value={feedbackSlaDays}
                    onChange={(e) => setFeedbackSlaDays(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value={2}>2 Business Days (48h - Fast)</option>
                    <option value={3}>3 Business Days (72h - Recommended)</option>
                    <option value={5}>5 Business Days (1 Week)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Authorized Single Decision-Maker</label>
                  <input
                    type="text"
                    value={decisionMaker}
                    onChange={(e) => setDecisionMaker(e.target.value)}
                    placeholder="e.g. John Smith (Owner)"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: PROTECTION CHECK */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400">Step 5 — Protection Pre-Flight Check</h3>
                <p className="text-xs text-slate-400 mt-0.5">Automated assessment of contractual and operational boundaries.</p>
              </div>

              {/* Scorecard Hero Box */}
              <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-950 to-slate-900 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col items-center justify-center text-emerald-400 font-extrabold">
                    <span className="text-2xl">{currentScore}</span>
                    <span className="text-[10px] text-slate-400">/100</span>
                  </div>
                  <div>
                    <div className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400">
                      <Award className="h-3 w-3" />
                      <span>{currentScore >= 85 ? "Fortress-Grade Protected" : currentScore >= 70 ? "Good Protection" : "Attention Needed"}</span>
                    </div>
                    <h4 className="text-base font-bold text-white mt-1">{projectName}</h4>
                    <p className="text-xs text-slate-400">{clientName} • ${projectValue.toLocaleString()}</p>
                  </div>
                </div>

                {/* Micro Breakdown Bars */}
                <div className="w-full sm:w-48 space-y-1.5 text-[11px]">
                  <div className="flex justify-between text-slate-400">
                    <span>Scope & Exclusions</span>
                    <span className="text-emerald-400 font-bold">18/20</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[90%]"></div>
                  </div>

                  <div className="flex justify-between text-slate-400">
                    <span>Payment Gates</span>
                    <span className="text-emerald-400 font-bold">18/20</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[90%]"></div>
                  </div>

                  <div className="flex justify-between text-slate-400">
                    <span>Client SLA</span>
                    <span className="text-emerald-400 font-bold">15/15</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[100%]"></div>
                  </div>
                </div>
              </div>

              {/* Fixes or Readiness Alert */}
              {identifiedFixes.length > 0 ? (
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 space-y-3">
                  <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{identifiedFixes.length} Potential Weakness{identifiedFixes.length > 1 ? "es" : ""} to Review Before Starting</span>
                  </div>

                  <div className="space-y-2">
                    {identifiedFixes.map((fix, i) => (
                      <div key={i} className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                        <span className="font-bold text-amber-300">{i + 1}. {fix.title}: </span>
                        <span className="text-slate-400">{fix.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 flex items-center space-x-3 text-xs text-emerald-300">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                  <span>All 5 core protection boundaries are fully satisfied. You are safe to issue the contract and kickoff deposit!</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="border-t border-slate-800 px-6 py-4 flex items-center justify-between bg-slate-950/80">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex items-center space-x-1.5 text-xs font-semibold text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div></div>
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="flex items-center space-x-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 px-5 py-2 text-xs font-bold transition-all shadow-md shadow-emerald-950/50"
            >
              <span>Continue to Step {step + 1}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="flex items-center space-x-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-2.5 text-xs font-extrabold transition-all shadow-lg shadow-emerald-950"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Save & Launch Protected Project</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
