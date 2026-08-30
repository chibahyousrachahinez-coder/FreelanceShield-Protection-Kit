import React from "react";
import { ActiveTab } from "../types";
import { WORKFLOW_STEPS, FIVE_RULES } from "../data/kitData";
import {
  ShieldCheck,
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileText,
  DollarSign,
  Layers,
  Award,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface WorkflowVisualizerProps {
  setActiveTab: (tab: ActiveTab) => void;
  protectionScore: number;
}

export const WorkflowVisualizer: React.FC<WorkflowVisualizerProps> = ({
  setActiveTab,
  protectionScore,
}) => {
  return (
    <div className="space-y-10 pb-12">
      {/* Hero Overview */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-slate-950 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 mb-4">
            <ShieldCheck className="h-4 w-4" />
            <span>The Complete Freelance Project Protection System</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Before you start the work,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              protect the project.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            FreelanceShield is an operational framework designed for freelance developers, designers, and agencies to{" "}
            <span className="text-white font-medium">reduce scope creep, structure payment milestones, and maintain clear client agreements</span>.
            Reduce avoidable project risk, clarify scope, structure payments, and document important client decisions before and during active work.
          </p>

          {/* Quick Metrics / Targets */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <div className="text-xl font-bold text-emerald-400">30 Scripts</div>
              <div className="text-xs text-slate-400">Copy-paste client messages</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <div className="text-xl font-bold text-emerald-400">100-Point Audit</div>
              <div className="text-xs text-slate-400">Checklist-based risk score</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <div className="text-xl font-bold text-emerald-400">AI Risk Tools</div>
              <div className="text-xs text-slate-400">Risk indicators (Beta)</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <div className="text-xl font-bold text-emerald-400">20+ Templates</div>
              <div className="text-xs text-slate-400">Editable DOCX, CSV & MD</div>
            </div>
          </div>
        </div>
      </div>

      {/* The 7-Step FreelanceShield System Diagram (Visual Flowchart) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Operational Blueprint
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              The FreelanceShield 7-Step Protection Workflow
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Click any phase below to jump into the dedicated interactive tool or template.
            </p>
          </div>

          <button
            onClick={() => setActiveTab("start_here")}
            className="inline-flex items-center space-x-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
          >
            <span>Read "Start Here" Guide</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Linear Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {WORKFLOW_STEPS.slice(0, 4).map((step) => (
            <div
              key={step.id}
              onClick={() => setActiveTab(step.targetTab)}
              className="group relative cursor-pointer rounded-xl border border-slate-800 bg-slate-950/80 p-5 hover:border-emerald-500/60 hover:bg-slate-900 transition-all shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                  STEP {step.stepNumber}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  {step.phase}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mt-3 group-hover:text-emerald-300 transition-colors">
                {step.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                {step.tagline}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 font-medium">
                <span>Open Tool</span>
                <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Middle Logic: The Scope Creep Decision Tree */}
        <div className="my-8 rounded-xl border border-emerald-900/40 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="inline-flex items-center space-x-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-500/30">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>Crucial In-Flight Logic: The Scope-Creep Test</span>
            </span>
            <h4 className="text-lg font-bold text-white mt-2">
              What happens when the client requests a new item?
            </h4>
          </div>

          {/* ASCII / Visual Decision Diagram */}
          <div className="flex flex-col items-center">
            <div className="rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-xs font-bold text-slate-200 text-center shadow">
              📩 New Client Request Received
            </div>
            <ArrowDown className="h-5 w-5 text-slate-500 my-1.5" />
            <div className="rounded-lg bg-emerald-950/80 border border-emerald-600/60 px-5 py-2.5 text-xs font-extrabold text-emerald-300 text-center shadow">
              ⚖️ Was this explicitly itemized in the signed Scope of Work (SOW)?
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mt-4">
              {/* Branch YES */}
              <div className="flex flex-col items-center rounded-xl border border-emerald-900/60 bg-emerald-950/20 p-4">
                <div className="flex items-center space-x-1 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>YES — IN SCOPE</span>
                </div>
                <p className="text-xs text-slate-300 text-center mt-2">
                  Execute task within the current active sprint under original contract.
                </p>
                <div className="mt-3 rounded bg-emerald-900/40 px-3 py-1 text-[11px] font-semibold text-emerald-300 border border-emerald-700/50">
                  ✅ Continue Development
                </div>
              </div>

              {/* Branch NO */}
              <div className="flex flex-col items-center rounded-xl border border-amber-900/60 bg-amber-950/20 p-4">
                <div className="flex items-center space-x-1 text-xs font-bold text-amber-400">
                  <AlertTriangle className="h-4 w-4" />
                  <span>NO — SCOPE CREEP</span>
                </div>
                <p className="text-xs text-slate-300 text-center mt-2">
                  Issue formal Change Request (CR) with additional Price ($) + Timeline (+Days).
                </p>
                <button
                  onClick={() => setActiveTab("scope_creep")}
                  className="mt-3 rounded bg-amber-500 px-3 py-1 text-[11px] font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow"
                >
                  Generate Change Request (CR) →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Steps 5, 6, 7 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {WORKFLOW_STEPS.slice(4).map((step) => (
            <div
              key={step.id}
              onClick={() => setActiveTab(step.targetTab)}
              className="group relative cursor-pointer rounded-xl border border-slate-800 bg-slate-950/80 p-5 hover:border-emerald-500/60 hover:bg-slate-900 transition-all shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                  STEP {step.stepNumber}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  {step.phase}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mt-3 group-hover:text-emerald-300 transition-colors">
                {step.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                {step.tagline}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 font-medium">
                <span>Open Tool</span>
                <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pre-Start Kickoff Gatekeeper (Ready vs Don't Start) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Step 04 Verification
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              🟢 Ready to Start vs 🚨 Don't Start Yet
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Never write code or open Figma until all 8 green lights are verified.
            </p>
          </div>
          <button
            onClick={() => setActiveTab("bonus_resources")}
            className="inline-flex items-center space-x-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
          >
            <span>Open Gatekeeper Tool</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Green Lights */}
          <div className="rounded-xl border border-emerald-900/60 bg-emerald-950/20 p-5 space-y-3">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="h-4 w-4" />
              <span>🟢 READY TO START (Proceed with Confidence)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Scope clearly defined & approved in writing</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Exclusions (what is NOT included) explicitly listed</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Payment terms & milestone dates agreed</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Agreement completed & signed by client</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Client responsibilities (copy, assets, logins) confirmed</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Deposit received in your account according to agreement</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Primary communication channel & feedback protocol established</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Target completion deadline confirmed in calendar</span>
              </li>
            </ul>
          </div>

          {/* Red Lights */}
          <div className="rounded-xl border border-rose-900/60 bg-rose-950/20 p-5 space-y-3">
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
              <AlertTriangle className="h-4 w-4" />
              <span>🚨 DON'T START YET (Pause & Secure First)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center space-x-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span>"Just start and we'll figure out budget/scope later"</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span>Deposit invoice sent but payment has NOT cleared</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span>Verbal agreement with no written SOW document</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span>Unclear revision limits ("we'll revise until it's perfect")</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span>Missing essential credentials, copy, or brand assets</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span>Client refuses to sign standard freelance agreement</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 5 Real-World Scenarios Walkthrough */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
        <div className="max-w-2xl mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Field Guide
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">
            5 Common Real-World Scenarios & Exact Fixes
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            When difficult client situations arise mid-project, here is exactly what to do and which script to send.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Scenario 1 */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
                SCENARIO 1
              </span>
              <h3 className="text-sm font-bold text-white mt-2">Client asks for extra features mid-project</h3>
              <p className="text-xs text-slate-300 mt-1">
                "Can you also add an interactive map and user bookmarking system to this landing page?"
              </p>
              <div className="mt-3 text-xs text-slate-400 space-y-1">
                <div><strong className="text-slate-200">Action:</strong> Don't say no; frame it as a positive addition.</div>
                <div><strong className="text-emerald-400">Tool:</strong> Step 04 Scope Creep / Change Request (CR-004)</div>
              </div>
            </div>
            <button
              onClick={() => setActiveTab("scope_creep")}
              className="mt-3 flex items-center justify-between text-xs font-semibold text-emerald-400 hover:text-emerald-300 pt-2 border-t border-slate-800"
            >
              <span>View Change Request Tool</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Scenario 2 */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/60">
                SCENARIO 2
              </span>
              <h3 className="text-sm font-bold text-white mt-2">Client hasn't paid milestone invoice</h3>
              <p className="text-xs text-slate-300 mt-1">
                Milestone 2 was delivered 5 days ago, payment was due on delivery, but no payment has arrived.
              </p>
              <div className="mt-3 text-xs text-slate-400 space-y-1">
                <div><strong className="text-slate-200">Action:</strong> Pause work gracefully; send polite reminder sequence.</div>
                <div><strong className="text-emerald-400">Tool:</strong> Script #09 Polite Milestone Reminder</div>
              </div>
            </div>
            <button
              onClick={() => setActiveTab("client_communication")}
              className="mt-3 flex items-center justify-between text-xs font-semibold text-emerald-400 hover:text-emerald-300 pt-2 border-t border-slate-800"
            >
              <span>View Payment Script</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Scenario 3 */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">
                SCENARIO 3
              </span>
              <h3 className="text-sm font-bold text-white mt-2">Client goes silent for 5+ days</h3>
              <p className="text-xs text-slate-300 mt-1">
                You sent wireframes for feedback. Total silence for nearly a week while project deadline approaches.
              </p>
              <div className="mt-3 text-xs text-slate-400 space-y-1">
                <div><strong className="text-slate-200">Action:</strong> Log delay in Delay Tracker; send polite timeline shift notice.</div>
                <div><strong className="text-emerald-400">Tool:</strong> Step 06 Delay Tracker & Script #15</div>
              </div>
            </div>
            <button
              onClick={() => setActiveTab("project_records")}
              className="mt-3 flex items-center justify-between text-xs font-semibold text-emerald-400 hover:text-emerald-300 pt-2 border-t border-slate-800"
            >
              <span>Open Delay Tracker</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Scenario 4 */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/60">
                SCENARIO 4
              </span>
              <h3 className="text-sm font-bold text-white mt-2">Client redesigns after approval</h3>
              <p className="text-xs text-slate-300 mt-1">
                "We changed our mind on the branding structure after you started coding the pages."
              </p>
              <div className="mt-3 text-xs text-slate-400 space-y-1">
                <div><strong className="text-slate-200">Action:</strong> Point to written milestone approval; quote redesign hourly or fixed.</div>
                <div><strong className="text-emerald-400">Tool:</strong> Script #07 Scope Clarification</div>
              </div>
            </div>
            <button
              onClick={() => setActiveTab("client_communication")}
              className="mt-3 flex items-center justify-between text-xs font-semibold text-emerald-400 hover:text-emerald-300 pt-2 border-t border-slate-800"
            >
              <span>View Clarification Script</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Scenario 5 */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
                SCENARIO 5
              </span>
              <h3 className="text-sm font-bold text-white mt-2">Client requests urgent weekend work</h3>
              <p className="text-xs text-slate-300 mt-1">
                "Our investor meeting is Monday morning, can you finish everything this Saturday?"
              </p>
              <div className="mt-3 text-xs text-slate-400 space-y-1">
                <div><strong className="text-slate-200">Action:</strong> State rush fee policy or maintain scheduled milestone pacing.</div>
                <div><strong className="text-emerald-400">Tool:</strong> Script #18 Rush Fee / Out-of-Hours Policy</div>
              </div>
            </div>
            <button
              onClick={() => setActiveTab("client_communication")}
              className="mt-3 flex items-center justify-between text-xs font-semibold text-emerald-400 hover:text-emerald-300 pt-2 border-t border-slate-800"
            >
              <span>View Rush Script</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Case Study Call to Action Card */}
          <div
            onClick={() => setActiveTab("case_study")}
            className="cursor-pointer rounded-xl border border-emerald-800/50 bg-gradient-to-br from-emerald-950/40 to-slate-950 p-5 flex flex-col justify-between group hover:border-emerald-500 transition-all"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                FULL WALKTHROUGH
              </span>
              <h3 className="text-sm font-bold text-white mt-2 group-hover:text-emerald-300 transition-colors">
                See How a Real $1,500 Web Project Was Protected
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Follow "Apex Digital Dashboard" step-by-step from inquiry to final handover.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs font-bold text-emerald-400 pt-2 border-t border-slate-800">
              <span>Read Full Case Study</span>
              <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* The 5 Golden Rules Section */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
        <div className="max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Core Philosophy
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">
            The 5 Golden Rules of Project Protection
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            These five immutable principles govern every template, script, and checklist in the kit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {FIVE_RULES.map((rule) => (
            <div
              key={rule.number}
              className="rounded-xl border border-slate-800 bg-slate-950/70 p-5 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-xs border border-emerald-500/30">
                  #{rule.number}
                </span>
                <h3 className="text-sm font-bold text-white">{rule.title}</h3>
              </div>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                {rule.description}
              </p>
            </div>
          ))}

          {/* Card 6: Scorecard Call to action */}
          <div
            onClick={() => setActiveTab("scorecard")}
            className="cursor-pointer rounded-xl border border-emerald-800/50 bg-gradient-to-br from-emerald-950/40 to-slate-950 p-5 hover:border-emerald-500 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-emerald-400">Interactive Audit</span>
                <Award className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-white mt-2 group-hover:text-emerald-300 transition-colors">
                Freelancer Protection Scorecard
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Audit your active project across 6 risk dimensions and get an instant score (0-100) with prioritized action fixes.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs font-bold text-emerald-400">
              <span>Run Project Audit ({protectionScore}/100)</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
