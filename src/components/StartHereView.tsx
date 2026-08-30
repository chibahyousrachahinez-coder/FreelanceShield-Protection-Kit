import React from "react";
import { ActiveTab } from "../types";
import { FIVE_RULES } from "../data/kitData";
import {
  BookOpen,
  CheckCircle,
  Shield,
  ArrowRight,
  Download,
  FileText,
  Clock,
  Layers,
  AlertCircle,
} from "lucide-react";

interface StartHereViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenZipModal: () => void;
}

export const StartHereView: React.FC<StartHereViewProps> = ({
  setActiveTab,
  onOpenZipModal,
}) => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 mb-3">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Core Manual & Operating System</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          📘 Start Here: Your Freelance Protection System
        </h1>
        <p className="text-base text-slate-300 mt-2">
          Welcome to FreelanceShield. Before you download 20+ templates and ask "where do I begin?",
          read this 5-minute foundational guide.
        </p>
      </div>

      {/* Page 1 Welcome & Philosophy Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-xl">
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-lg">
            🛡️
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Welcome to FreelanceShield</h2>
            <p className="text-xs text-slate-400">The Practical System for Safer Freelance Projects</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4">
          <p>
            This kit helps you reduce avoidable freelance-project risks by clarifying the client, scope,
            payment expectations, changes, approvals, and project records <strong className="text-emerald-400">before problems happen</strong>.
          </p>
          <p>
            Most freelance disputes are not caused by malicious intent—they are caused by <span className="text-amber-300 font-medium">ambiguity</span>.
            When deliverables are vague, when payment terms are informal, or when "quick favors" pile up without documentation, projects derail.
          </p>
          <p className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-slate-200 font-medium">
            💡 <strong className="text-white">The FreelanceShield Promise:</strong> You don't need a 50-page legal retainer to stay safe.
            You need a clear 7-step process, itemized scopes with explicit exclusions, milestone deposit rules, and polite, assertive communication scripts.
          </p>
        </div>
      </div>

      {/* The 5 Rules */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-white mb-2">The 5 Golden Rules of Project Protection</h2>
        <p className="text-xs text-slate-400 mb-6">
          Commit these to memory. Every contract dispute in freelancing traces back to violating one of these five rules.
        </p>

        <div className="space-y-4">
          {FIVE_RULES.map((rule) => (
            <div
              key={rule.number}
              className="flex items-start space-x-4 rounded-xl border border-slate-800 bg-slate-950/80 p-4"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-extrabold text-sm border border-emerald-500/30">
                0{rule.number}
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-white">{rule.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {rule.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 10-Minute Quick-Start Action Checklist */}
      <div className="rounded-2xl border border-emerald-800/50 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/30 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <Clock className="h-4 w-4" />
              <span>Immediate Implementation</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              Your 10-Minute Project Protection Action Plan
            </h2>
          </div>
          <button
            onClick={onOpenZipModal}
            className="flex items-center space-x-1.5 rounded-lg bg-emerald-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download All Templates (.ZIP)</span>
          </button>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-start space-x-3 rounded-lg bg-slate-900/60 p-3.5 border border-slate-800">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">1</span>
            <div className="flex-1">
              <span className="text-sm font-semibold text-white">Screen the Client (5 mins)</span>
              <p className="text-xs text-slate-300 mt-0.5">
                Run the <strong className="text-emerald-400">Client Risk Assessment</strong> and review the <strong className="text-emerald-400">Red Flags Guide</strong>. Check if payment terms or requirements are vague.
              </p>
              <button
                onClick={() => setActiveTab("client_screening")}
                className="mt-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
              >
                <span>Open Client Screening Tool →</span>
              </button>
            </div>
          </div>

          <div className="flex items-start space-x-3 rounded-lg bg-slate-900/60 p-3.5 border border-slate-800">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">2</span>
            <div className="flex-1">
              <span className="text-sm font-semibold text-white">Generate a Bulletproof Scope of Work (SOW) (3 mins)</span>
              <p className="text-xs text-slate-300 mt-0.5">
                Use the <strong className="text-emerald-400">SOW Builder</strong>. Ensure you include the dedicated <strong className="text-amber-300">EXCLUSIONS / NOT INCLUDED</strong> matrix and 2-round revision cap.
              </p>
              <button
                onClick={() => setActiveTab("project_protection")}
                className="mt-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
              >
                <span>Open SOW Builder →</span>
              </button>
            </div>
          </div>

          <div className="flex items-start space-x-3 rounded-lg bg-slate-900/60 p-3.5 border border-slate-800">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">3</span>
            <div className="flex-1">
              <span className="text-sm font-semibold text-white">Set Milestone Deposits (2 mins)</span>
              <p className="text-xs text-slate-300 mt-0.5">
                Set a 50% upfront deposit or 40/30/30 structure. Never start active production until the initial deposit has cleared in your bank account!
              </p>
              <button
                onClick={() => setActiveTab("payment_protection")}
                className="mt-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
              >
                <span>Open Payment Milestone Planner →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
