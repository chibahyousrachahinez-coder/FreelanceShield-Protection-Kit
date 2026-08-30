import React, { useState } from "react";
import {
  Gift,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Download,
  Printer,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { exportTextFile } from "../utils/exportUtils";

export const BonusResourcesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"kickoff" | "delivery" | "emergency">("kickoff");

  // Kickoff Gatekeeper (11 items)
  const [kickoffItems, setKickoffItems] = useState([
    { id: "k1", label: "Client legal company name & billing address verified", checked: true },
    { id: "k2", label: "Scope of Work (SOW) approved with itemized deliverables", checked: true },
    { id: "k3", label: "Explicit 'NOT INCLUDED' exclusions list signed off", checked: true },
    { id: "k4", label: "2-Round revision limit defined in writing", checked: true },
    { id: "k5", label: "Upfront deposit (e.g. 50%) received and cleared in bank account", checked: true },
    { id: "k6", label: "Final payment milestone agreed BEFORE live handover", checked: true },
    { id: "k7", label: "Change Request protocol established", checked: true },
    { id: "k8", label: "Client provided all logos, brand guidelines, and copy", checked: false },
    { id: "k9", label: "Hosting, domain, and API credentials shared securely", checked: false },
    { id: "k10", label: "Primary single decision-maker established", checked: true },
    { id: "k11", label: "Communication channel and business hours agreed upon", checked: true },
  ]);

  // Delivery Gatekeeper (11 items)
  const [deliveryItems, setDeliveryItems] = useState([
    { id: "d1", label: "All agreed SOW deliverables built and tested", checked: true },
    { id: "d2", label: "Cross-browser and responsive mobile QA passed", checked: true },
    { id: "d3", label: "Staging build demonstrated to client via video walkthrough", checked: true },
    { id: "d4", label: "Formal written staging sign-off received from client", checked: true },
    { id: "d5", label: "Final milestone invoice issued", checked: true },
    { id: "d6", label: "Final balance paid in full and confirmed received in bank", checked: false },
    { id: "d7", label: "Full source code repository / assets backed up locally", checked: true },
    { id: "d8", label: "Master admin credentials transferred securely (only after payment clears)", checked: false },
    { id: "d9", label: "14-day warranty support period activated", checked: false },
    { id: "d10", label: "Review & testimonial requested", checked: false },
    { id: "d11", label: "Ongoing maintenance / monthly retainer proposal sent", checked: false },
  ]);

  const toggleKickoff = (id: string) => {
    setKickoffItems(
      kickoffItems.map((k) => (k.id === id ? { ...k, checked: !k.checked } : k))
    );
  };

  const toggleDelivery = (id: string) => {
    setDeliveryItems(
      deliveryItems.map((d) => (d.id === id ? { ...d, checked: !d.checked } : d))
    );
  };

  const kickoffPassed = kickoffItems.filter((k) => k.checked).length;
  const deliveryPassed = deliveryItems.filter((d) => d.checked).length;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 mb-2">
            <Gift className="h-3.5 w-3.5" />
            <span>Bonus Toolkit & Crisis Protocols</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Bonus Resources & Emergency Crisis Protocols
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Pre-start gatekeepers, final handover security checklists, and emergency resolution protocols for difficult client scenarios.
          </p>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 space-x-1">
          <button
            onClick={() => setActiveTab("kickoff")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === "kickoff"
                ? "bg-emerald-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🚀 Kickoff Gatekeeper ({kickoffPassed}/11)
          </button>
          <button
            onClick={() => setActiveTab("delivery")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === "delivery"
                ? "bg-emerald-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🏁 Handover Checklist ({deliveryPassed}/11)
          </button>
          <button
            onClick={() => setActiveTab("emergency")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === "emergency"
                ? "bg-emerald-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🚨 Emergency Guide
          </button>
        </div>
      </div>

      {/* Tab 1: Kickoff Gatekeeper */}
      {activeTab === "kickoff" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  <span>Project Kickoff Pre-Start Gatekeeper</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Never write a single line of code or start design wireframes until all 11 criteria are met.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    kickoffPassed === 11
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  }`}
                >
                  {kickoffPassed === 11 ? "🟢 READY TO START SAFELY" : "🟡 GATES REMAINING"}
                </span>
                <span className="text-sm font-bold text-white">{kickoffPassed} / 11</span>
              </div>
            </div>

            <div className="space-y-2.5">
              {kickoffItems.map((item, idx) => (
                <label
                  key={item.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors text-xs ${
                    item.checked
                      ? "bg-slate-950/90 border-emerald-800/40 text-slate-200"
                      : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:bg-slate-950"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleKickoff(item.id)}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                  />
                  <span className="font-bold text-slate-400">#{idx + 1}</span>
                  <span className={`flex-1 ${item.checked ? "font-medium text-white" : ""}`}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Final Delivery Gatekeeper */}
      {activeTab === "delivery" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Lock className="h-5 w-5 text-emerald-400" />
                  <span>Final Delivery & Handover Security Gatekeeper</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Ensure final payment is in your bank BEFORE releasing live credentials or master repository push access.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    deliveryPassed === 11
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  }`}
                >
                  {deliveryPassed === 11 ? "🟢 HANDOVER COMPLETE" : "🟡 GATES ACTIVE"}
                </span>
                <span className="text-sm font-bold text-white">{deliveryPassed} / 11</span>
              </div>
            </div>

            <div className="space-y-2.5">
              {deliveryItems.map((item, idx) => (
                <label
                  key={item.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors text-xs ${
                    item.checked
                      ? "bg-slate-950/90 border-emerald-800/40 text-slate-200"
                      : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:bg-slate-950"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleDelivery(item.id)}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                  />
                  <span className="font-bold text-slate-400">#{idx + 1}</span>
                  <span className={`flex-1 ${item.checked ? "font-medium text-white" : ""}`}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Emergency Crisis Protocols */}
      {activeTab === "emergency" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Crisis 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-3 shadow-lg">
              <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="h-4 w-4" />
                <span>Situation 01</span>
              </div>
              <h3 className="text-base font-bold text-white">Client Stopped Responding (Ghosting)</h3>
              <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <p><strong>1. Stop Active Work:</strong> Do not continue building future milestones for free.</p>
                <p><strong>2. Send 7-Day Notice:</strong> Notify client that their calendar slot is being released.</p>
                <p><strong>3. Send 21-Day Dormant Notice:</strong> State that project is paused and reactivation fee will apply.</p>
              </div>
            </div>

            {/* Crisis 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-3 shadow-lg">
              <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="h-4 w-4" />
                <span>Situation 02</span>
              </div>
              <h3 className="text-base font-bold text-white">Client Refuses to Pay Final Invoice</h3>
              <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <p><strong>1. Never Release Root Keys:</strong> Keep live domain and git repositories locked.</p>
                <p><strong>2. Pull Paper Trail:</strong> Show timestamped milestone sign-offs and signed SOW.</p>
                <p><strong>3. Assert IP Ownership:</strong> Remind client that intellectual property remains yours until paid in full.</p>
              </div>
            </div>

            {/* Crisis 3 */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-3 shadow-lg">
              <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="h-4 w-4" />
                <span>Situation 03</span>
              </div>
              <h3 className="text-base font-bold text-white">Client Demands Full Refund Mid-Project</h3>
              <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <p><strong>1. Enforce Deposit Clause:</strong> Upfront deposit is non-refundable and covers reserved labor.</p>
                <p><strong>2. Itemize Completed Labor:</strong> Send Project Activity Log showing hours and assets produced.</p>
                <p><strong>3. Clean Mutual Separation:</strong> Offer to hand over raw drafts in exchange for clean closure.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
