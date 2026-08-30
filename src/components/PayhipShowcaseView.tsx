import React from "react";
import {
  ShoppingBag,
  ShieldCheck,
  CheckCircle,
  Download,
  Star,
  Zap,
  FolderArchive,
  ArrowRight,
} from "lucide-react";

interface PayhipShowcaseViewProps {
  onOpenZipModal: () => void;
}

export const PayhipShowcaseView: React.FC<PayhipShowcaseViewProps> = ({
  onOpenZipModal,
}) => {
  const folders = [
    { name: "00_START_HERE", desc: "Start-Here.pdf — 5 golden rules & 7-step protection workflow" },
    { name: "01_CLIENT_SCREENING", desc: "Client-Screening-Checklist.pdf & Client-Screening-Template.docx" },
    { name: "02_SCOPE_PROTECTION", desc: "Scope-of-Work.docx, Scope-Exclusions.docx, Assumptions.docx, DoD.docx" },
    { name: "03_PAYMENT", desc: "Payment-Planner.xlsx & Payment-Checklist.pdf (milestone structures)" },
    { name: "04_PROJECT_MANAGEMENT", desc: "Kickoff-Checklist.pdf, Decision-Log.xlsx, Delay-Tracker.xlsx" },
    { name: "05_SCOPE_CREEP", desc: "Change-Request.docx & Scope-Change-Checklist.pdf (7-step control system)" },
    { name: "06_CLIENT_COMMUNICATION", desc: "30-Client-Scripts.pdf (6 categories with copy, pro tips & firmer versions)" },
    { name: "07_HANDOVER", desc: "Final-Handover-Checklist.pdf (secure credentials & DNS delivery protocol)" },
    { name: "08_AI_TOOLS", desc: "FreelanceShield-AI-Prompt-Pack.pdf (screening, scope creep & response prompts)" },
    { name: "09_SCORECARD", desc: "100-Point-Protection-Audit.xlsx (project readiness & risk scoring)" },
    { name: "10_BONUSES", desc: "Complete-Project-Example.pdf ($1,500 real-world project walkthrough)" },
  ];

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-12">
      {/* Product Hero Banner */}
      <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-8 sm:p-12 shadow-2xl text-center relative overflow-hidden">
        <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-400 mb-6">
          <ShieldCheck className="h-4 w-4" />
          <span>Payhip & Gumroad Digital Product Package</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight max-w-3xl mx-auto leading-tight">
          🛡️ FreelanceShield Protection Kit
        </h1>
        <p className="text-lg sm:text-xl text-emerald-400 font-semibold mt-3">
          The complete project-protection toolkit for freelancers
        </p>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mt-4 leading-relaxed">
          Before you start the work, protect the project. Stop losing thousands of dollars to scope creep, endless revisions, and unpaid final invoices.
        </p>

        {/* Pricing Card Box */}
        <div className="mt-8 inline-block rounded-2xl border border-emerald-800/60 bg-slate-900/90 p-6 sm:p-8 max-w-md w-full shadow-xl">
          <div className="flex items-center justify-center space-x-2 text-emerald-400 mb-2">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-xs font-bold text-slate-300">Complete Offline Protection Toolkit</span>
          </div>

          <div className="flex items-baseline justify-center space-x-3 my-3">
            <span className="text-4xl sm:text-5xl font-extrabold text-white">$19</span>
            <span className="text-sm text-slate-400 font-medium">Launch Price (Regular $29)</span>
          </div>

          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            One-time purchase • Instant offline package (.ZIP) with editable DOCX, CSV, Markdown templates + PDF field guides + 30 copy-paste scripts.
          </p>

          <button
            onClick={onOpenZipModal}
            className="w-full flex items-center justify-center space-x-2 rounded-xl bg-emerald-500 py-3.5 px-6 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 active:scale-98 cursor-pointer"
          >
            <Download className="h-4 w-4 stroke-[2.5]" />
            <span>Download Offline Toolkit (.ZIP)</span>
          </button>

          <p className="text-[11px] text-slate-500 mt-3">
            Includes 30-day money-back guarantee • Free lifetime updates to kit templates
          </p>
        </div>
      </div>

      {/* What You Actually Get (8-Folder Breakdown) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 space-y-6 shadow-xl">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Package Contents
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">
            What's Inside The FreelanceShield Package
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Carefully organized into 8 numbered directories so you always know exactly where to begin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {folders.map((f, i) => (
            <div
              key={f.name}
              className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400">
                <FolderArchive className="h-4 w-4" />
                <span>{f.name}/</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Target Customers */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
        <h3 className="text-lg font-bold text-white mb-4">Built Specifically For:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="rounded-lg bg-slate-950 p-3 border border-slate-800 text-slate-300 font-medium">
            💻 Freelance Developers
          </div>
          <div className="rounded-lg bg-slate-950 p-3 border border-slate-800 text-slate-300 font-medium">
            🎨 UI/UX & Web Designers
          </div>
          <div className="rounded-lg bg-slate-950 p-3 border border-slate-800 text-slate-300 font-medium">
            🎬 Video Editors & Animators
          </div>
          <div className="rounded-lg bg-slate-950 p-3 border border-slate-800 text-slate-300 font-medium">
            🏢 Small Freelance Agencies
          </div>
        </div>
      </div>
    </div>
  );
};
