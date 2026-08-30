import React, { useState } from "react";
import { ActivityLogEntry, DelayTrackerItem } from "../types";
import {
  ClipboardList,
  Plus,
  Trash2,
  Download,
  AlertTriangle,
  FileCheck2,
  Clock,
  Send,
  Copy,
  Check,
  ShieldCheck,
  CheckSquare,
} from "lucide-react";
import { exportCsvFile, exportTextFile } from "../utils/exportUtils";

export const ProjectRecordsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"activity_log" | "decision_log" | "delay_tracker" | "handover" | "evidence">("activity_log");
  const [copiedDelayNotice, setCopiedDelayNotice] = useState(false);

  // Decision Log State
  const [decisionLogs, setDecisionLogs] = useState([
    {
      id: "dec-1",
      date: "2026-09-05",
      decision: "Selected Tailwind CSS over CSS Modules for UI styling",
      madeBy: "Freelancer (Proposed) & Client Tech Lead (Approved)",
      rationale: "Ensures faster build velocity and unified theme tokens",
      evidence: "Meeting Notes / Slack Thread 2026-09-05",
    },
    {
      id: "dec-2",
      date: "2026-09-11",
      decision: "Set date filter default to 30 days rather than lifetime",
      madeBy: "Client Product Manager (Sarah Jenkins)",
      rationale: "Lifetime query caused slow queries on heavy accounts",
      evidence: "Email sign-off on Figma mockups",
    },
    {
      id: "dec-3",
      date: "2026-09-17",
      decision: "Defer automated PDF reports to formal Change Request #004",
      madeBy: "Joint Agreement",
      rationale: "Avoided delaying Core MVP sprint release",
      evidence: "Signed Change Request #004 DocuSign",
    },
  ]);

  // Handover Checklist State
  const [handoverItems, setHandoverItems] = useState([
    { id: "h1", label: "All agreed deliverables from Scope of Work completed & verified", done: true },
    { id: "h2", label: "Tested across target browsers (Chrome, Safari, Firefox, Edge) & mobile devices", done: true },
    { id: "h3", label: "Client walked through staging environment with recorded Loom/demo", done: true },
    { id: "h4", label: "Client confirmed formal written milestone acceptance", done: true },
    { id: "h5", label: "Final milestone balance invoice issued", done: true },
    { id: "h6", label: "Final invoice payment cleared and confirmed in bank account", done: false },
    { id: "h7", label: "Source code repo permissions / production credentials safely transferred", done: false },
    { id: "h8", label: "14-day post-launch warranty support period documented & testimonial requested", done: false },
  ]);

  const toggleHandoverItem = (id: string) => {
    setHandoverItems(handoverItems.map((h) => (h.id === id ? { ...h, done: !h.done } : h)));
  };

  const addDecision = () => {
    setDecisionLogs([
      ...decisionLogs,
      {
        id: `dec-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        decision: "New technical or project decision",
        madeBy: "Client & Freelancer",
        rationale: "Context & reasons",
        evidence: "Email / Meeting notes",
      },
    ]);
  };

  const removeDecision = (id: string) => {
    setDecisionLogs(decisionLogs.filter((d) => d.id !== id));
  };

  const updateDecision = (id: string, field: string, value: string) => {
    setDecisionLogs(decisionLogs.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  };

  const handleExportDecisionCsv = () => {
    const headers = ["Date", "Key Decision", "Decision Makers", "Rationale & Business Context", "Evidence Source"];
    const rows = decisionLogs.map((d) => [d.date, d.decision, d.madeBy, d.rationale, d.evidence]);
    exportCsvFile("FreelanceShield-Decision-Log.csv", [headers, ...rows]);
  };

  // Activity Log State
  const [activityLogs, setActivityLogs] = useState<ActivityLogEntry[]>([
    {
      id: "log-1",
      date: "2026-09-01",
      event: "Scope of Work & Agreement Signed",
      person: "Sarah Jenkins (Client CEO)",
      decision: "Approved v1.2 ($4,000 Total)",
      evidence: "Signed PDF / Email confirmation",
      notes: "Deposit invoice #104 issued",
    },
    {
      id: "log-2",
      date: "2026-09-02",
      event: "50% Upfront Kickoff Deposit Cleared",
      person: "Stripe / Banking Gateway",
      decision: "$2,000 Received",
      evidence: "Stripe Transaction #tx_9812",
      notes: "Development sprint scheduled",
    },
    {
      id: "log-3",
      date: "2026-09-10",
      event: "Figma UI & Wireframes Sign-off",
      person: "Sarah Jenkins",
      decision: "Design Phase Approved",
      evidence: "Email with timestamped approval",
      notes: "React frontend development initiated",
    },
    {
      id: "log-4",
      date: "2026-09-18",
      event: "Change Request #004 Approved",
      person: "Sarah Jenkins",
      decision: "+$650 USD / +4 Days",
      evidence: "CR Form Signed via DocuSign",
      notes: "Weekly PDF digest feature added",
    },
  ]);

  // Client Delay Tracker State
  const [delays, setDelays] = useState<DelayTrackerItem[]>([
    {
      id: "del-1",
      item: "Final High-Res Product Photography & Brand Copy",
      requestedDate: "2026-09-04",
      dueDate: "2026-09-07",
      daysWaiting: 6,
      impact: "High",
      status: "Waiting",
    },
    {
      id: "del-2",
      item: "Stripe Live Production API Keys & Webhook Secret",
      requestedDate: "2026-09-12",
      dueDate: "2026-09-15",
      daysWaiting: 2,
      impact: "Medium",
      status: "Waiting",
    },
  ]);

  const addLog = () => {
    setActivityLogs([
      ...activityLogs,
      {
        id: `log-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        event: "Milestone Review / Client Meeting",
        person: "Client Contact",
        decision: "Decision recorded",
        evidence: "Email / Meeting notes",
        notes: "Additional context",
      },
    ]);
  };

  const removeLog = (id: string) => {
    setActivityLogs(activityLogs.filter((l) => l.id !== id));
  };

  const updateLog = (id: string, field: keyof ActivityLogEntry, value: string) => {
    setActivityLogs(activityLogs.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const addDelay = () => {
    setDelays([
      ...delays,
      {
        id: `del-${Date.now()}`,
        item: "Requested Client Asset / Decision",
        requestedDate: new Date().toISOString().split("T")[0],
        dueDate: new Date().toISOString().split("T")[0],
        daysWaiting: 1,
        impact: "Medium",
        status: "Waiting",
      },
    ]);
  };

  const removeDelay = (id: string) => {
    setDelays(delays.filter((d) => d.id !== id));
  };

  const updateDelay = (id: string, field: keyof DelayTrackerItem, value: any) => {
    setDelays(delays.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  };

  const handleExportActivityCsv = () => {
    const headers = ["Date", "Event / Milestone", "Person / Contact", "Decision / Amount", "Evidence Type", "Notes"];
    const rows = activityLogs.map((l) => [l.date, l.event, l.person, l.decision, l.evidence, l.notes || ""]);
    exportCsvFile("FreelanceShield-Activity-Log.csv", [headers, ...rows]);
  };

  const handleExportDelaysCsv = () => {
    const headers = ["Item Needed", "Requested Date", "Due Date", "Days Waiting", "Severity Impact", "Status"];
    const rows = delays.map((d) => [d.item, d.requestedDate, d.dueDate, d.daysWaiting, d.impact.toUpperCase(), d.status]);
    exportCsvFile("FreelanceShield-Client-Delay-Tracker.csv", [headers, ...rows]);
  };

  const generateDelayNoticeText = () => {
    const activeDelays = delays.filter((d) => d.status === "Waiting" || d.status === "Escalated");
    return `Hi [Client Name],

I hope you’re having a productive week!

I’m currently waiting on the following items from your team to proceed with our active development milestone:

${activeDelays.map((d) => `• ${d.item} (Originally requested: ${d.requestedDate} — currently ${d.daysWaiting} days past target date)`).join("\n")}

To ensure we maintain our target completion date without compromising code quality, could you send these over by [Target Date, e.g. Friday]?

*Please note: As outlined in our Scope of Work, our delivery timeline will adjust in tandem with when these client assets are received.*

Thanks so much for helping keep our project momentum strong!

Best regards,`;
  };

  const copyDelayNotice = () => {
    navigator.clipboard.writeText(generateDelayNoticeText());
    setCopiedDelayNotice(true);
    setTimeout(() => setCopiedDelayNotice(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 mb-2">
            <ClipboardList className="h-3.5 w-3.5" />
            <span>Step 06 — Documentation & Records</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Project Records, Evidence & Client Delay Tracker
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Maintain an objective, factual paper trail. When a dispute arises, whoever holds the timestamped log controls the narrative.
          </p>
        </div>

        {/* Sub-tabs */}
        <div className="flex flex-wrap items-center bg-slate-900 border border-slate-800 rounded-lg p-1 gap-1">
          <button
            onClick={() => setActiveTab("activity_log")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === "activity_log"
                ? "bg-emerald-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            📋 Activity Log ({activityLogs.length})
          </button>
          <button
            onClick={() => setActiveTab("decision_log")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === "decision_log"
                ? "bg-emerald-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            ⚖️ Decision Log ({decisionLogs.length})
          </button>
          <button
            onClick={() => setActiveTab("delay_tracker")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === "delay_tracker"
                ? "bg-emerald-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            ⏳ Delay Tracker ({delays.length})
          </button>
          <button
            onClick={() => setActiveTab("handover")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === "handover"
                ? "bg-emerald-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🏁 Handover Checklist
          </button>
          <button
            onClick={() => setActiveTab("evidence")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === "evidence"
                ? "bg-emerald-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🛡️ Evidence (8 Pts)
          </button>
        </div>
      </div>

      {/* Sub-tab 1: Activity Log */}
      {activeTab === "activity_log" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-300">
              💡 <strong>Why Log Every Major Event?</strong> If a client claims "I never agreed to this milestone" or "You took 2 months longer than promised", your timestamped activity log resolves the dispute instantly.
            </div>
            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={addLog}
                className="flex items-center space-x-1 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 px-3 py-1.5 text-xs font-semibold transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Log Entry</span>
              </button>
              <button
                onClick={handleExportActivityCsv}
                className="flex items-center space-x-1 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {activityLogs.map((log, idx) => (
              <div
                key={log.id}
                className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 space-y-3 shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                      ENTRY #{idx + 1}
                    </span>
                    <input
                      type="date"
                      value={log.date}
                      onChange={(e) => updateLog(log.id, "date", e.target.value)}
                      className="rounded bg-slate-950 border border-slate-800 px-2 py-0.5 text-xs text-slate-200 focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={() => removeLog(log.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 self-end sm:self-auto transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Event / Milestone</label>
                    <input
                      type="text"
                      value={log.event}
                      onChange={(e) => updateLog(log.id, "event", e.target.value)}
                      className="w-full rounded bg-slate-950 border border-slate-800 px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Person Involved</label>
                    <input
                      type="text"
                      value={log.person}
                      onChange={(e) => updateLog(log.id, "person", e.target.value)}
                      className="w-full rounded bg-slate-950 border border-slate-800 px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Decision / Amount</label>
                    <input
                      type="text"
                      value={log.decision}
                      onChange={(e) => updateLog(log.id, "decision", e.target.value)}
                      className="w-full rounded bg-slate-950 border border-slate-800 px-2.5 py-1.5 text-emerald-400 font-bold focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Evidence Reference</label>
                    <input
                      type="text"
                      value={log.evidence}
                      onChange={(e) => updateLog(log.id, "evidence", e.target.value)}
                      placeholder="e.g. Email / Stripe / GitHub commit"
                      className="w-full rounded bg-slate-950 border border-slate-800 px-2.5 py-1.5 text-slate-300 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-tab 2: Client Delay Tracker */}
      {activeTab === "delay_tracker" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-300">
              🚨 <strong>Client Delay Protection:</strong> When a client takes 2 weeks to send logos or feedback, they often forget their delay and blame you for missing the launch date. Track missing items in this log and send polite Delay Notices.
            </div>
            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={addDelay}
                className="flex items-center space-x-1 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/30 px-3 py-1.5 text-xs font-semibold transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Track Missing Item</span>
              </button>
              <button
                onClick={handleExportDelaysCsv}
                className="flex items-center space-x-1 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {delays.map((d) => (
              <div
                key={d.id}
                className={`rounded-xl border p-4 space-y-3 shadow-md ${
                  d.impact === "High"
                    ? "bg-rose-950/20 border-rose-800/40"
                    : "bg-slate-900/80 border-slate-800"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                  <div className="flex items-center space-x-2 flex-1">
                    <span className="text-xs font-bold text-amber-400">WAITING ON:</span>
                    <input
                      type="text"
                      value={d.item}
                      onChange={(e) => updateDelay(d.id, "item", e.target.value)}
                      className="w-full rounded bg-slate-950 border border-slate-800 px-2.5 py-1 text-xs font-bold text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <select
                      value={d.impact}
                      onChange={(e) => updateDelay(d.id, "impact", e.target.value)}
                      className={`rounded border px-2 py-1 text-xs font-bold focus:outline-none ${
                        d.impact === "High"
                          ? "bg-rose-950 text-rose-300 border-rose-800"
                          : d.impact === "Medium"
                          ? "bg-amber-950 text-amber-300 border-amber-800"
                          : "bg-slate-900 text-slate-400 border-slate-800"
                      }`}
                    >
                      <option value="Low">Low Impact</option>
                      <option value="Medium">Medium Impact</option>
                      <option value="High">🔴 High (Blocking)</option>
                    </select>

                    <button
                      onClick={() => removeDelay(d.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Requested Date</label>
                    <input
                      type="date"
                      value={d.requestedDate}
                      onChange={(e) => updateDelay(d.id, "requestedDate", e.target.value)}
                      className="w-full rounded bg-slate-950 border border-slate-800 px-2.5 py-1 text-slate-200 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Original Due Date</label>
                    <input
                      type="date"
                      value={d.dueDate}
                      onChange={(e) => updateDelay(d.id, "dueDate", e.target.value)}
                      className="w-full rounded bg-slate-950 border border-slate-800 px-2.5 py-1 text-slate-200 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Days Waiting</label>
                    <input
                      type="number"
                      value={d.daysWaiting}
                      onChange={(e) => updateDelay(d.id, "daysWaiting", Number(e.target.value))}
                      className="w-full rounded bg-slate-950 border border-slate-800 px-2.5 py-1 text-amber-400 font-bold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Delay Notice Status</label>
                    <input
                      type="text"
                      value={d.status}
                      onChange={(e) => updateDelay(d.id, "status", e.target.value)}
                      className="w-full rounded bg-slate-950 border border-slate-800 px-2.5 py-1 text-slate-200 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Auto-Generated Delay Notice Email */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <Clock className="h-4 w-4 text-amber-400" />
                <span>Auto-Generated Client Delay Notice Email</span>
              </h4>
              <button
                onClick={copyDelayNotice}
                className="flex items-center space-x-1 rounded bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-xs font-semibold text-emerald-400 transition-colors shadow-sm"
              >
                {copiedDelayNotice ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedDelayNotice ? "Copied Notice!" : "Copy Delay Email"}</span>
              </button>
            </div>

            <div className="rounded-lg bg-slate-950 p-4 border border-slate-800 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
              {generateDelayNoticeText()}
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 2: Decision Log */}
      {activeTab === "decision_log" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-300">
              💡 <strong>Why Keep a Decision Log?</strong> Clients frequently forget why a design, feature tradeoff, or architecture decision was made 3 weeks ago. This log prevents "amnesia disputes."
            </div>
            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={addDecision}
                className="flex items-center space-x-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 px-3 py-1.5 text-xs font-bold text-slate-950 transition-colors shadow-sm"
              >
                <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                <span>Add Decision</span>
              </button>
              <button
                onClick={handleExportDecisionCsv}
                className="flex items-center space-x-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {decisionLogs.map((d) => (
              <div
                key={d.id}
                className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 space-y-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-400">
                      DECISION
                    </span>
                    <input
                      type="date"
                      value={d.date}
                      onChange={(e) => updateDecision(d.id, "date", e.target.value)}
                      className="rounded bg-slate-950 border border-slate-800 px-2 py-0.5 text-xs font-mono text-slate-300 focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={() => removeDecision(d.id)}
                    className="text-slate-500 hover:text-rose-400 text-xs p-1"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] font-semibold text-slate-400 uppercase">Key Decision Agreed</label>
                    <input
                      type="text"
                      value={d.decision}
                      onChange={(e) => updateDecision(d.id, "decision", e.target.value)}
                      className="w-full rounded bg-slate-950 border border-slate-800 px-2.5 py-1.5 text-slate-200 focus:outline-none mt-1 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-slate-400 uppercase">Decided By (Approver)</label>
                    <input
                      type="text"
                      value={d.madeBy}
                      onChange={(e) => updateDecision(d.id, "madeBy", e.target.value)}
                      className="w-full rounded bg-slate-950 border border-slate-800 px-2.5 py-1.5 text-slate-200 focus:outline-none mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-slate-400 uppercase">Rationale & Business Reason</label>
                    <input
                      type="text"
                      value={d.rationale}
                      onChange={(e) => updateDecision(d.id, "rationale", e.target.value)}
                      className="w-full rounded bg-slate-950 border border-slate-800 px-2.5 py-1.5 text-slate-200 focus:outline-none mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-slate-400 uppercase">Evidence Link / Meeting Note</label>
                    <input
                      type="text"
                      value={d.evidence}
                      onChange={(e) => updateDecision(d.id, "evidence", e.target.value)}
                      className="w-full rounded bg-slate-950 border border-slate-800 px-2.5 py-1.5 text-slate-200 focus:outline-none mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-tab: Handover Checklist */}
      {activeTab === "handover" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <CheckSquare className="h-5 w-5 text-emerald-400" />
                  <span>Step 07: Final Handover & Sign-Off Checklist</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Complete these 8 steps before transferring full repository admin rights or domain ownership.
                </p>
              </div>
              <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 text-xs font-bold text-emerald-400">
                {handoverItems.filter((h) => h.done).length} / {handoverItems.length} Steps Complete
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              {handoverItems.map((item, idx) => (
                <label
                  key={item.id}
                  onClick={() => toggleHandoverItem(item.id)}
                  className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer text-xs transition-colors ${
                    item.done
                      ? "bg-slate-950/90 border-emerald-800/50 text-slate-200"
                      : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <span className={`flex h-5 w-5 items-center justify-center rounded text-[11px] font-bold ${
                    item.done ? "bg-emerald-500 text-slate-950" : "border border-slate-700 text-slate-500"
                  }`}>
                    {item.done ? "✓" : idx + 1}
                  </span>
                  <span className={item.done ? "font-medium text-slate-200" : "text-slate-400"}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>

            <div className="rounded-lg bg-amber-950/30 border border-amber-800/40 p-3.5 text-xs text-amber-200/90 mt-4 leading-relaxed">
              ⚠️ <strong>Rule of Safe Handover:</strong> Never transfer production domain DNS or full GitHub owner rights until the final milestone balance is confirmed cleared in your bank account.
            </div>
          </div>
        </div>
      )}
      {activeTab === "evidence" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <span>The 8 Non-Negotiable Project Evidence Records</span>
            </h3>
            <p className="text-xs text-slate-300">
              Store copies of each item in your project archive folder for at least 12 months after project completion:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="rounded-lg bg-slate-950 p-3 border border-slate-800 text-xs text-slate-200">
                <strong className="text-emerald-400">1. Signed Scope of Work:</strong> PDF version with date and client signature.
              </div>
              <div className="rounded-lg bg-slate-950 p-3 border border-slate-800 text-xs text-slate-200">
                <strong className="text-emerald-400">2. Bank Deposit Confirmation:</strong> Transaction receipt showing cleared initial deposit.
              </div>
              <div className="rounded-lg bg-slate-950 p-3 border border-slate-800 text-xs text-slate-200">
                <strong className="text-emerald-400">3. Written Milestone Sign-offs:</strong> Email or DocuSign records confirming design/staging approvals.
              </div>
              <div className="rounded-lg bg-slate-950 p-3 border border-slate-800 text-xs text-slate-200">
                <strong className="text-emerald-400">4. Executed Change Requests (CRs):</strong> Any signed scope adjustments with price/date changes.
              </div>
              <div className="rounded-lg bg-slate-950 p-3 border border-slate-800 text-xs text-slate-200">
                <strong className="text-emerald-400">5. Client-Supplied Assets:</strong> Raw files, copy docs, and credentials shared by client.
              </div>
              <div className="rounded-lg bg-slate-950 p-3 border border-slate-800 text-xs text-slate-200">
                <strong className="text-emerald-400">6. Delay Notices Sent:</strong> Email trail informing client of timeline shifts.
              </div>
              <div className="rounded-lg bg-slate-950 p-3 border border-slate-800 text-xs text-slate-200">
                <strong className="text-emerald-400">7. Final Staging Demo Recording / Sign-off:</strong> Video walkthrough or written staging approval.
              </div>
              <div className="rounded-lg bg-slate-950 p-3 border border-slate-800 text-xs text-slate-200">
                <strong className="text-emerald-400">8. Final Balance Receipt:</strong> Cleared final payment receipt prior to live DNS transfer.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
