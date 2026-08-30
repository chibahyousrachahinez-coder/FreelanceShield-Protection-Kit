import React, { useState } from "react";
import {
  FileText,
  ShieldCheck,
  AlertTriangle,
  Copy,
  Check,
  Download,
  BookOpen,
  Layers,
  MessageSquare,
  Lock,
  ChevronRight,
} from "lucide-react";
import { ISSUE_PLAYBOOKS } from "../data/projectData";
import { SCRIPT_TEMPLATES } from "../data/kitData";
import { ScriptItem } from "../types";

interface TemplatesPlaybooksViewProps {
  onOpenZipModal: () => void;
}

export const TemplatesPlaybooksView: React.FC<TemplatesPlaybooksViewProps> = ({
  onOpenZipModal,
}) => {
  const [activeTab, setActiveTab] = useState<"playbooks" | "templates" | "scripts">("playbooks");
  const [selectedPlaybookId, setSelectedPlaybookId] = useState<string>(ISSUE_PLAYBOOKS[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [scriptCategoryFilter, setScriptCategoryFilter] = useState<string>("all");

  const selectedPlaybook = ISSUE_PLAYBOOKS.find((p) => p.id === selectedPlaybookId) || ISSUE_PLAYBOOKS[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredScripts = SCRIPT_TEMPLATES.filter((s) => {
    if (scriptCategoryFilter === "all") return true;
    return s.category === scriptCategoryFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-emerald-500/20 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/10 to-yellow-500/10 border border-emerald-400/30 text-emerald-300 text-[11px] font-semibold mb-2">
            <BookOpen className="h-3 w-3 text-yellow-400" />
            <span className="font-mono uppercase tracking-wider text-[10px]">PRACTICAL DEFENSE ASSETS</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Templates, Playbooks & <span className="bg-gradient-to-r from-emerald-400 via-lime-300 to-yellow-300 bg-clip-text text-transparent">Scripts</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Practical project templates, issue-resolution playbooks, and client communication scripts.
          </p>
        </div>

        <button
          onClick={onOpenZipModal}
          className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-yellow-500/20 hover:from-emerald-500/30 hover:to-yellow-500/30 border border-emerald-500/40 text-emerald-200 hover:text-white px-4 py-2.5 text-xs font-bold transition-all shadow-sm"
        >
          <Download className="h-4 w-4 text-yellow-400" />
          <span>Download All Files (.ZIP)</span>
        </button>
      </div>

      {/* Navigation Subtabs */}
      <div className="flex items-center space-x-2 border-b border-emerald-500/20 pb-3 text-xs">
        {[
          { id: "playbooks" as const, label: "Issue Resolution Playbooks (4)", icon: AlertTriangle },
          { id: "scripts" as const, label: "30 Contextual Scripts", icon: MessageSquare },
          { id: "templates" as const, label: "Contractual SOW & CR Templates", icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                isActive
                  ? "bg-gradient-to-r from-emerald-500/20 via-lime-500/10 to-yellow-500/10 border border-emerald-400/50 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#0c1424] border border-transparent"
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${isActive ? "text-yellow-400" : ""}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ===================== TAB 1: PLAYBOOKS ===================== */}
      {activeTab === "playbooks" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Playbook List */}
          <div className="space-y-3 lg:col-span-1">
            {ISSUE_PLAYBOOKS.map((pb) => {
              const isSelected = selectedPlaybook.id === pb.id;
              return (
                <div
                  key={pb.id}
                  onClick={() => setSelectedPlaybookId(pb.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                    isSelected
                      ? "bg-slate-900 border-emerald-500/40 shadow-lg"
                      : "bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
                  }`}
                >
                  <div className="font-bold text-white text-xs">{pb.title}</div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{pb.problem}</p>
                </div>
              );
            })}
          </div>

          {/* Active Playbook Detail */}
          <div className="lg:col-span-2 space-y-5">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">Step-by-Step Resolution Playbook</div>
                <h2 className="text-lg font-bold text-white mt-1">{selectedPlaybook.title}</h2>
                <p className="text-xs text-slate-300 mt-1 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <strong className="text-slate-400 block text-[10px] uppercase">The Situation:</strong>
                  {selectedPlaybook.problem}
                </p>
              </div>

              {/* Numbered Steps */}
              <div className="space-y-4">
                {selectedPlaybook.steps.map((step) => (
                  <div key={step.stepNumber} className="rounded-xl bg-slate-900/70 border border-slate-800 p-4 space-y-2 text-xs">
                    <div className="flex items-center space-x-2.5">
                      <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center">
                        {step.stepNumber}
                      </span>
                      <h4 className="font-bold text-white">{step.actionTitle}</h4>
                    </div>

                    <p className="text-slate-300 text-[11px] leading-relaxed pl-7">{step.details}</p>

                    {step.whatToSend && (
                      <div className="ml-7 mt-2 p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-2">
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                          <span>Recommended Message to Send:</span>
                          <button
                            onClick={() => handleCopy(step.whatToSend!, `pb-step-${step.stepNumber}`)}
                            className="text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
                          >
                            {copiedId === `pb-step-${step.stepNumber}` ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            <span>{copiedId === `pb-step-${step.stepNumber}` ? "Copied" : "Copy"}</span>
                          </button>
                        </div>
                        <p className="font-mono text-[11px] text-slate-200 whitespace-pre-line leading-relaxed">
                          {step.whatToSend}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Critical Rule Callout */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 space-y-1">
                <span className="font-bold text-amber-400 block text-[11px] uppercase tracking-wider">⚠️ Non-Negotiable Protection Rule:</span>
                <p className="text-slate-200 text-[11px]">{selectedPlaybook.criticalRule}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== TAB 2: SCRIPTS ===================== */}
      {activeTab === "scripts" && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 text-xs">
            {[
              { id: "all", label: "All Scripts (30)" },
              { id: "scope", label: "Scope & Boundary" },
              { id: "payment", label: "Payments & Late Invoices" },
              { id: "delays", label: "Client Delays & Ghosting" },
              { id: "revisions", label: "Revisions Cap" },
              { id: "handover", label: "Handover & Final Sign-off" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setScriptCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap ${
                  scriptCategoryFilter === cat.id
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    : "bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Scripts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredScripts.map((script) => (
              <div key={script.id} className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{script.title}</span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-mono">
                      {script.category}
                    </span>
                  </div>

                  {script.scenario && <p className="text-[11px] text-slate-400 italic">{script.scenario}</p>}

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-[11px] text-slate-200 whitespace-pre-line leading-relaxed">
                    {script.template || script.professionalVersion || script.friendlyVersion}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">{script.whyItWorks ? "With strategic rationale" : ""}</span>
                  <button
                    onClick={() =>
                      handleCopy(
                        script.template || script.professionalVersion || script.friendlyVersion || "",
                        script.id
                      )
                    }
                    className="flex items-center space-x-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 px-3 py-1 text-xs font-bold transition-colors"
                  >
                    {copiedId === script.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    <span>{copiedId === script.id ? "Copied" : "Copy Script"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================== TAB 3: SOW & CR TEMPLATES ===================== */}
      {activeTab === "templates" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <FileText className="h-4 w-4" />
                <span>Standard Statement of Work (SOW)</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                The standard 5-section project agreement with deliverable matrix, explicit exclusions list, 50/30/20 milestone schedule, and 3-day client feedback SLA.
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1">
                <div>Section 1: Project Objective & Authorized Sign-off</div>
                <div>Section 2: Agreed Deliverables & Definition of Done</div>
                <div>Section 3: Explicit Exclusions (What is NOT Included)</div>
                <div>Section 4: Milestones & Payment Trigger Gates</div>
                <div>Section 5: Revision Rounds & Timeline Shift Protocol</div>
              </div>
              <button
                onClick={onOpenZipModal}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-bold transition-colors"
              >
                Export SOW Template (.DOCX / .PDF)
              </button>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Layers className="h-4 w-4" />
                <span>Change Request (CR) Form Template</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                The 1-page Change Request form that turns scope creep into signed, paid additional revenue with adjusted delivery timelines.
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1">
                <div>Field: Change Request # (CR-001)</div>
                <div>Field: Original Scope Reference</div>
                <div>Field: Description of Requested Enhancement</div>
                <div>Field: Additional Budget Adjustment (+$)</div>
                <div>Field: Schedule Timeline Impact (+ Days)</div>
              </div>
              <button
                onClick={onOpenZipModal}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              >
                Export Change Request Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
