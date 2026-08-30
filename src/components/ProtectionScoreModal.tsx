import React from "react";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  X,
  ArrowRight,
  HelpCircle,
  Clock,
  UserCheck,
  Lock,
  FileCheck2,
  DollarSign,
} from "lucide-react";
import { ProjectItem } from "../types";

interface ProtectionScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: ProjectItem | null;
  onFixIssues?: (targetSubTab?: string) => void;
}

export const ProtectionScoreModal: React.FC<ProtectionScoreModalProps> = ({
  isOpen,
  onClose,
  project,
  onFixIssues,
}) => {
  if (!isOpen) return null;

  const score = project?.protectionScore ?? 82;
  const projectName = project?.name ?? "Project Protection Audit";

  // Score Breakdown Areas
  const breakdownAreas = [
    {
      name: "Scope clarity",
      score: 19,
      max: 20,
      status: "Protected",
      description: "Agreed deliverables, exclusions list, and capped revision rounds.",
    },
    {
      name: "Payment structure",
      score: 18,
      max: 20,
      status: "Protected",
      description: "Kickoff deposit received and milestone gates tied to deliverables.",
    },
    {
      name: "Client responsibilities",
      score: 14,
      max: 20,
      status: "Attention",
      description: "Assets provided, but feedback SLA and delay shift rules need tightening.",
    },
    {
      name: "Approval process",
      score: 12,
      max: 15,
      status: "Attention",
      description: "Designated approval authority assigned, awaiting written sign-off protocol.",
    },
    {
      name: "Timeline & revisions",
      score: 10,
      max: 10,
      status: "Protected",
      description: "Explicit schedule with 2-round consolidated feedback limit.",
    },
    {
      name: "Handover & documentation",
      score: 9,
      max: 15,
      status: "Attention",
      description: "Final invoice lock before live credentials transfer.",
    },
  ];

  // Specific Actionable Items to Improve
  const actionItems = [
    {
      severity: "high" as const,
      title: "Client response deadline missing",
      detail: "Add an explicit 48–72h feedback turnaround clause to prevent indefinite client review delays from stalling your schedule.",
      targetSubTab: "scope",
    },
    {
      severity: "medium" as const,
      title: "Final approval process unclear",
      detail: "Formally designate the single sign-off authority so third-party colleagues cannot overturn approved designs later.",
      targetSubTab: "communication",
    },
    {
      severity: "medium" as const,
      title: "Handover requirements incomplete",
      detail: "Ensure the contract explicitly states master database passwords and live DNS pointing are withheld until 100% of the final invoice is paid.",
      targetSubTab: "handover",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030611]/85 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-emerald-500/30 bg-[#080d1a] p-6 sm:p-7 shadow-[0_0_50px_rgba(16,185,129,0.15)] space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-emerald-500/20 pb-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-yellow-500/20 border border-emerald-400/40 text-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-extrabold text-white tracking-tight">Protection Score Audit</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                  {score}/100
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">{projectName} • Objective workflow protection audit</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Explanation banner */}
        <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 via-[#0e1628] to-[#080d1a] p-4 text-xs text-slate-300 space-y-1.5 backdrop-blur-xl">
          <span className="font-bold text-yellow-300 flex items-center space-x-1.5 font-mono uppercase tracking-wider">
            <span>⚡ Audit Calculation Logic</span>
          </span>
          <p className="text-slate-300 leading-relaxed">
            The FreelanceShield Protection Score evaluates whether your active agreement and workflow have safeguards against the 6 most common causes of unpaid work, scope creep, and stalled projects.
          </p>
        </div>

        {/* Area Scores Breakdown Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
            <span>Protection Area</span>
            <span>Score Weight</span>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-[#050811]/70 divide-y divide-slate-800/80 overflow-hidden text-xs">
            {breakdownAreas.map((area) => (
              <div key={area.name} className="p-3.5 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white">{area.name}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md font-mono font-bold ${
                        area.status === "Protected"
                          ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                          : "bg-yellow-500/15 text-yellow-300 border border-yellow-500/30"
                      }`}
                    >
                      {area.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{area.description}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono font-extrabold text-sm text-emerald-400">{area.score}</span>
                  <span className="text-slate-500 font-mono text-xs">/{area.max}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Items to Improve Score */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-yellow-400 font-mono">
            <AlertTriangle className="h-4 w-4" />
            <span>Improve these items to reach 100/100</span>
          </div>

          <div className="space-y-2.5">
            {actionItems.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl border border-yellow-500/30 bg-[#0d1424]/80 space-y-1 text-xs shadow-sm"
              >
                <div className="flex items-center space-x-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      item.severity === "high" ? "bg-yellow-400" : "bg-lime-400"
                    } animate-pulse`}
                  ></span>
                  <span className="font-bold text-white">{item.title}</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed pl-4">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end space-x-3 pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              if (onFixIssues) {
                onFixIssues("scope");
              }
            }}
            className="flex items-center space-x-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 via-lime-400 to-yellow-400 text-slate-950 text-xs font-extrabold transition-all shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:scale-[1.02]"
          >
            <span>Fix Issues Now</span>
            <ArrowRight className="h-3.5 w-3.5 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};
