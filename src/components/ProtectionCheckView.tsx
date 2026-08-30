import React, { useState } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  DollarSign,
  UserCheck,
  Clock,
  ClipboardList,
  RotateCcw,
  Award,
} from "lucide-react";
import { ScorecardCategory } from "../types";

const INITIAL_AUDIT_CATEGORIES: ScorecardCategory[] = [
  {
    id: "cat-1",
    name: "Scope Clarity & Exclusions",
    maxPoints: 20,
    currentPoints: 20,
    items: [
      { id: "c1-1", label: "Every deliverable has a concrete Definition of Done", points: 5, checked: true },
      { id: "c1-2", label: "Explicit 'NOT INCLUDED' Exclusions list is written into contract", points: 5, checked: true },
      { id: "c1-3", label: "Revision rounds are capped (1–2 consolidated rounds)", points: 5, checked: true },
      { id: "c1-4", label: "Technical assumptions & browser/device support stated", points: 5, checked: true },
    ],
  },
  {
    id: "cat-2",
    name: "Payment Gates & Deposit Protection",
    maxPoints: 20,
    currentPoints: 20,
    items: [
      { id: "c2-1", label: "Minimum 40–50% upfront deposit received before writing code", points: 6, checked: true },
      { id: "c2-2", label: "Milestone payments tied to specific deliverables, not arbitrary dates", points: 5, checked: true },
      { id: "c2-3", label: "Late payment fee / work pause clause after 3 business days", points: 4, checked: true },
      { id: "c2-4", label: "Final handover & master credentials held until 100% balance cleared", points: 5, checked: true },
    ],
  },
  {
    id: "cat-3",
    name: "Client Responsibilities & Asset SLA",
    maxPoints: 15,
    currentPoints: 10,
    items: [
      { id: "c3-1", label: "Client required assets (logos, copy, photography) listed", points: 5, checked: true },
      { id: "c3-2", label: "Strict feedback turnaround SLA established (e.g. 48–72 hours)", points: 5, checked: true },
      { id: "c3-3", label: "Late assets shift the project launch date day-for-day", points: 5, checked: false, urgentFixMessage: "Add the 'Timeline Shift' clause: late client copy must automatically push the delivery deadline back." },
    ],
  },
  {
    id: "cat-4",
    name: "Approval Process & Authority",
    maxPoints: 15,
    currentPoints: 15,
    items: [
      { id: "c4-1", label: "Single designated decision-maker named in the contract", points: 6, checked: true },
      { id: "c4-2", label: "All milestone approvals must be in writing (email or portal)", points: 5, checked: true },
      { id: "c4-3", label: "Verbal scope requests require written Change Request confirmation", points: 4, checked: true },
    ],
  },
  {
    id: "cat-5",
    name: "Change Management Protocol",
    maxPoints: 15,
    currentPoints: 10,
    items: [
      { id: "c5-1", label: "Formal Change Request procedure defined in agreement", points: 5, checked: true },
      { id: "c5-2", label: "Rate for additional out-of-scope work pre-agreed", points: 5, checked: true },
      { id: "c5-3", label: "Client informed that changes impact both price and delivery timeline", points: 5, checked: false, urgentFixMessage: "Specify that any approved Change Request extends the launch date accordingly." },
    ],
  },
  {
    id: "cat-6",
    name: "Delivery & Post-Launch Warranty",
    maxPoints: 15,
    currentPoints: 10,
    items: [
      { id: "c6-1", label: "14-Day bug-fix warranty window specified post-handover", points: 5, checked: true },
      { id: "c6-2", label: "Post-launch maintenance & retainer options clearly separated", points: 5, checked: true },
      { id: "c6-3", label: "Written final project sign-off and sign-away confirmation template ready", points: 5, checked: false, urgentFixMessage: "Prepare a final sign-off form to prevent unexpected refund demands weeks after launch." },
    ],
  },
];

export const ProtectionCheckView: React.FC = () => {
  const [categories, setCategories] = useState<ScorecardCategory[]>(INITIAL_AUDIT_CATEGORIES);

  const toggleItem = (catId: string, itemId: string) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id !== catId) return cat;
        const updatedItems = cat.items.map((item) =>
          item.id === itemId ? { ...item, checked: !item.checked } : item
        );
        const newPoints = updatedItems.reduce((acc, it) => acc + (it.checked ? it.points : 0), 0);
        return { ...cat, items: updatedItems, currentPoints: newPoints };
      })
    );
  };

  const totalScore = categories.reduce((acc, cat) => acc + cat.currentPoints, 0);

  const missingFixes = categories
    .flatMap((c) => c.items)
    .filter((it) => !it.checked);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-emerald-500/20 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/10 to-yellow-500/10 border border-emerald-400/30 text-emerald-300 text-[11px] font-semibold mb-2">
            <ShieldCheck className="h-3 w-3 text-emerald-400" />
            <span className="font-mono uppercase tracking-wider text-[10px]">PRE-FLIGHT CONTRACT DEFENSE</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            100-Point <span className="bg-gradient-to-r from-emerald-400 via-lime-300 to-yellow-300 bg-clip-text text-transparent">Protection Audit</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Audit any project or contract proposal before signing. Detect hidden liabilities and lock down your scope.
          </p>
        </div>
      </div>

      {/* Score Hero Summary */}
      <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-[#0c1424] via-[#070d18] to-[#040810] p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(16,185,129,0.12)] backdrop-blur-xl">
        <div className="flex items-center space-x-5">
          <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-yellow-500/20 border border-emerald-400/40 flex flex-col items-center justify-center text-emerald-400 font-extrabold shadow-[0_0_20px_rgba(16,185,129,0.25)]">
            <span className="text-4xl font-mono text-emerald-300 font-extrabold">{totalScore}</span>
            <span className="text-[10px] text-yellow-400 font-mono font-bold tracking-wider">/100 PTS</span>
          </div>

          <div>
            <div className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs font-bold text-emerald-300 shadow-sm">
              <Award className="h-3.5 w-3.5 text-yellow-400" />
              <span>
                {totalScore >= 90
                  ? "Fortress Grade (Safe to Start)"
                  : totalScore >= 75
                  ? "Standard Protection (Minor Fixes Needed)"
                  : "High Liability Risk (Do Not Sign Yet)"}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1.5 tracking-tight">Project Pre-Flight Protection Status</h3>
            <p className="text-xs text-slate-400">
              {missingFixes.length === 0
                ? "All contractual defenses are active and locked."
                : `${missingFixes.length} protection checks remain unchecked.`}
            </p>
          </div>
        </div>

        {/* Category Pill Progress */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full md:w-auto text-xs">
          {categories.map((c) => (
            <div key={c.id} className="bg-[#050811]/90 p-3 rounded-xl border border-emerald-500/20 text-center font-mono">
              <div className="text-[10px] text-slate-400 truncate">{c.name.split(" ")[0]}</div>
              <div className="font-bold text-emerald-300 mt-0.5">{c.currentPoints} / {c.maxPoints}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Identified Urgent Fixes Callout */}
      {missingFixes.length > 0 && (
        <div className="rounded-2xl border border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 via-[#0e1628] to-[#070b14] p-5 space-y-3 shadow-[0_0_20px_rgba(234,179,8,0.1)]">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-yellow-400 font-mono">
            <AlertTriangle className="h-4 w-4" />
            <span>Recommended Contract Adjustments Before Kickoff ({missingFixes.length})</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {missingFixes.map((item) => (
              <div key={item.id} className="p-3.5 rounded-xl bg-[#050811]/90 border border-yellow-500/20 text-xs space-y-1">
                <span className="font-bold text-yellow-300 block font-mono">{item.label}</span>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">{item.urgentFixMessage || "Check this off to ensure contractual protection."}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Audit Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="rounded-2xl border border-emerald-500/20 bg-[#080d1a] p-5 space-y-4 shadow-md backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
              <div className="font-bold text-white text-sm tracking-tight">{cat.name}</div>
              <span className="text-xs font-mono font-extrabold text-emerald-400">{cat.currentPoints} / {cat.maxPoints} pts</span>
            </div>

            <div className="space-y-2.5">
              {cat.items.map((item) => (
                <label
                  key={item.id}
                  onClick={() => toggleItem(cat.id, item.id)}
                  className={`p-3.5 rounded-xl border flex items-start space-x-3 cursor-pointer text-xs transition-all ${
                    item.checked
                      ? "bg-gradient-to-r from-emerald-500/10 via-[#0e1628] to-[#080d18] border-emerald-500/30 text-slate-200"
                      : "bg-[#050811]/80 border-slate-800 text-slate-400 hover:border-yellow-400/40"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => {}}
                    className="mt-0.5 rounded border-slate-700 text-emerald-400 focus:ring-0 accent-emerald-500"
                  />
                  <div className="space-y-0.5">
                    <span className={`font-medium ${item.checked ? "text-slate-100" : "text-slate-400"}`}>{item.label}</span>
                    <span className="text-[10px] text-emerald-400/80 block font-mono">+{item.points} pts</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
