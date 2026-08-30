import React, { useState } from "react";
import { PaymentMilestone } from "../types";
import {
  DollarSign,
  Plus,
  Trash2,
  Download,
  Printer,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldCheck,
  CreditCard,
  Layers,
} from "lucide-react";
import { exportCsvFile, exportTextFile } from "../utils/exportUtils";

export const PaymentProtectionView: React.FC = () => {
  const [milestones, setMilestones] = useState<PaymentMilestone[]>([
    {
      id: "m-1",
      name: "1. Upfront Production Deposit",
      amount: 1500,
      dueCondition: "Cleared Before Project Start",
      status: "paid",
      dueDate: "2026-09-01",
      notes: "Locks calendar slot; work starts upon clearance",
    },
    {
      id: "m-2",
      name: "2. UI Design & Prototype Approval",
      amount: 1000,
      dueCondition: "Upon Written Wireframe & Figma Sign-off",
      status: "invoiced",
      dueDate: "2026-09-12",
      notes: "Frontend coding begins after invoice is settled",
    },
    {
      id: "m-3",
      name: "3. Beta Features Staging Review",
      amount: 1000,
      dueCondition: "Upon Staging Functional QA",
      status: "pending",
      dueDate: "2026-09-22",
      notes: "Core features complete on staging server",
    },
    {
      id: "m-4",
      name: "4. Final Live Handover Balance",
      amount: 500,
      dueCondition: "Prior to Live Domain DNS Release",
      status: "pending",
      dueDate: "2026-09-30",
      notes: "Credentials & master repository transferred upon full payment",
    },
  ]);

  const addMilestone = () => {
    const num = milestones.length + 1;
    setMilestones([
      ...milestones,
      {
        id: `m-${Date.now()}`,
        name: `${num}. Milestone Phase #${num}`,
        amount: 500,
        dueCondition: "Upon Milestone Delivery",
        status: "pending",
        dueDate: "2026-10-01",
        notes: "Milestone description",
      },
    ]);
  };

  const removeMilestone = (id: string) => {
    setMilestones(milestones.filter((m) => m.id !== id));
  };

  const updateMilestone = (id: string, field: keyof PaymentMilestone, value: any) => {
    setMilestones(
      milestones.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  // Calculations
  const totalValue = milestones.reduce((sum, m) => sum + Number(m.amount || 0), 0);
  const totalReceived = milestones
    .filter((m) => m.status === "paid")
    .reduce((sum, m) => sum + Number(m.amount || 0), 0);
  const totalOutstanding = totalValue - totalReceived;
  const nextMilestone = milestones.find((m) => m.status !== "paid");
  const percentCollected = totalValue > 0 ? Math.round((totalReceived / totalValue) * 100) : 0;

  const handleExportCsv = () => {
    const headers = ["Milestone Name", "Amount ($)", "Due Condition", "Status", "Due Date", "Notes"];
    const rows = milestones.map((m) => [
      m.name,
      m.amount,
      m.dueCondition,
      m.status.toUpperCase(),
      m.dueDate || "",
      m.notes || "",
    ]);
    exportCsvFile("FreelanceShield-Payment-Milestones.csv", [headers, ...rows]);
  };

  const applyPresetModel = (type: "50-50" | "40-30-30" | "sprint") => {
    if (type === "50-50") {
      setMilestones([
        {
          id: "m-1",
          name: "1. 50% Upfront Deposit",
          amount: Math.round(totalValue * 0.5) || 1500,
          dueCondition: "Cleared Before Starting Work",
          status: "paid",
          dueDate: "2026-09-01",
          notes: "Reserves production calendar",
        },
        {
          id: "m-2",
          name: "2. 50% Final Delivery Handover",
          amount: Math.round(totalValue * 0.5) || 1500,
          dueCondition: "Prior to Live Domain / Source Code Release",
          status: "pending",
          dueDate: "2026-09-30",
          notes: "Master credentials transferred upon clearance",
        },
      ]);
    } else if (type === "40-30-30") {
      setMilestones([
        {
          id: "m-1",
          name: "1. 40% Kickoff Deposit",
          amount: Math.round(totalValue * 0.4) || 1600,
          dueCondition: "Cleared Before Starting Work",
          status: "paid",
          dueDate: "2026-09-01",
          notes: "Locks development slot",
        },
        {
          id: "m-2",
          name: "2. 30% Architecture & Design Sign-off",
          amount: Math.round(totalValue * 0.3) || 1200,
          dueCondition: "Upon Design & Wireframe Approval",
          status: "pending",
          dueDate: "2026-09-15",
          notes: "Design locked before coding",
        },
        {
          id: "m-3",
          name: "3. 30% Staging QA & Final Handover",
          amount: Math.round(totalValue * 0.3) || 1200,
          dueCondition: "Prior to Live DNS Switch",
          status: "pending",
          dueDate: "2026-09-30",
          notes: "Final balance before live release",
        },
      ]);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 mb-2">
            <DollarSign className="h-3.5 w-3.5" />
            <span>Step 03 — Payment Protection</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Payment Structure Guide & Milestone Planner
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Teach freelancers how to structure milestones and protect cashflow instead of hoping for post-project payment.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportCsv}
            className="flex items-center space-x-1.5 rounded-lg bg-emerald-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Milestone Spreadsheet (.CSV)</span>
          </button>
        </div>
      </div>

      {/* Metrics Summary Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Total Project Value
          </div>
          <div className="text-2xl font-extrabold text-white mt-1">
            ${totalValue.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {milestones.length} structured milestones
          </div>
        </div>

        <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-4 shadow">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Amount Received
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1">
            ${totalReceived.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-300/80 mt-1">
            {percentCollected}% of project collected
          </div>
        </div>

        <div className="rounded-xl border border-amber-900/40 bg-amber-950/20 p-4 shadow">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Amount Outstanding
          </div>
          <div className="text-2xl font-extrabold text-amber-400 mt-1">
            ${totalOutstanding.toLocaleString()}
          </div>
          <div className="text-[11px] text-amber-300/80 mt-1">
            Protected by milestone gates
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Next Due Milestone
          </div>
          <div className="text-sm font-bold text-white mt-1 truncate">
            {nextMilestone ? nextMilestone.name : "All Milestones Paid! 🎉"}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {nextMilestone ? `$${nextMilestone.amount} • Due ${nextMilestone.dueDate || "on sign-off"}` : "Project 100% Settled"}
          </div>
        </div>
      </div>

      {/* Preset Model Switchers */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <div className="text-xs text-slate-300">
          <strong className="text-white">Quick Structure Templates:</strong> Apply standard commercial milestone schedules:
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => applyPresetModel("50-50")}
            className="rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors"
          >
            50% / 50% Standard
          </button>
          <button
            onClick={() => applyPresetModel("40-30-30")}
            className="rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors"
          >
            40% / 30% / 30% Model
          </button>
        </div>
      </div>

      {/* Interactive Milestone Spreadsheet Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <CreditCard className="h-4 w-4 text-emerald-400" />
            <span>Interactive Milestone Ledger</span>
          </h3>
          <button
            onClick={addMilestone}
            className="flex items-center space-x-1 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 px-3 py-1.5 text-xs font-semibold transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Milestone</span>
          </button>
        </div>

        <div className="space-y-3">
          {milestones.map((m, index) => (
            <div
              key={m.id}
              className={`rounded-lg border p-4 space-y-3 transition-colors ${
                m.status === "paid"
                  ? "bg-slate-950/80 border-emerald-800/40"
                  : m.status === "invoiced"
                  ? "bg-slate-950 border-amber-800/50"
                  : "bg-slate-950/50 border-slate-800"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-2 flex-1">
                  <span className="text-xs font-bold text-slate-400">#{index + 1}</span>
                  <input
                    type="text"
                    value={m.name}
                    onChange={(e) => updateMilestone(m.id, "name", e.target.value)}
                    className="w-full rounded bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs font-bold text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 rounded bg-slate-900 border border-slate-800 px-2 py-1">
                    <span className="text-xs text-slate-400">$</span>
                    <input
                      type="number"
                      value={m.amount}
                      onChange={(e) => updateMilestone(m.id, "amount", Number(e.target.value))}
                      className="w-20 bg-transparent text-xs font-bold text-emerald-400 text-right focus:outline-none"
                    />
                  </div>

                  <select
                    value={m.status}
                    onChange={(e) => updateMilestone(m.id, "status", e.target.value)}
                    className={`rounded border px-2.5 py-1 text-xs font-bold focus:outline-none ${
                      m.status === "paid"
                        ? "bg-emerald-950 text-emerald-300 border-emerald-800"
                        : m.status === "invoiced"
                        ? "bg-amber-950 text-amber-300 border-amber-800"
                        : "bg-slate-900 text-slate-400 border-slate-800"
                    }`}
                  >
                    <option value="pending">⏳ Pending</option>
                    <option value="invoiced">📩 Invoiced</option>
                    <option value="paid">✅ Paid (Cleared)</option>
                  </select>

                  <button
                    onClick={() => removeMilestone(m.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Due Trigger / Condition</label>
                  <input
                    type="text"
                    value={m.dueCondition}
                    onChange={(e) => updateMilestone(m.id, "dueCondition", e.target.value)}
                    placeholder="e.g. Upon Design Sign-off / Prior to DNS Transfer"
                    className="w-full rounded bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs text-slate-300 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Target Due Date</label>
                  <input
                    type="date"
                    value={m.dueDate || ""}
                    onChange={(e) => updateMilestone(m.id, "dueDate", e.target.value)}
                    className="w-full rounded bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs text-slate-300 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Security Golden Rules Card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>The #1 Golden Rule of Freelance Payment</span>
        </h3>
        <div className="rounded-lg bg-slate-950 p-4 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
          <p className="text-amber-300 font-semibold">
            🚨 NEVER transfer root server credentials, master Git repository push permissions, or live DNS switches until the final milestone is paid and verified.
          </p>
          <p>
            Staging servers and video walkthroughs allow clients to verify 100% of functionality without requiring you to surrender your only financial leverage before being paid.
          </p>
        </div>
      </div>
    </div>
  );
};
