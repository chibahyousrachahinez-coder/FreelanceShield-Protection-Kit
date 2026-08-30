import React, { useState } from "react";
import { ChangeRequestData } from "../types";
import {
  Layers,
  FileCheck,
  AlertTriangle,
  Copy,
  Check,
  Download,
  Plus,
  ArrowRight,
  ShieldCheck,
  DollarSign,
  Calendar,
} from "lucide-react";
import { exportTextFile } from "../utils/exportUtils";

export const ScopeCreepView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [copiedScriptId, setCopiedScriptId] = useState<string | null>(null);

  // Change Request Form State
  const [crData, setCrData] = useState<ChangeRequestData>({
    id: "cr-004",
    crNumber: "CR-004",
    projectName: "Custom Web Application & Dashboard",
    clientName: "Acme Digital Ltd",
    date: new Date().toISOString().split("T")[0],
    originalScopeReference: "Section 3, Deliverable #2: Client Analytics Dashboard (Standard filters: 7d, 30d, 90d with CSV export)",
    requestedChangeDescription: "Client requested an automated scheduled weekly PDF email digest generator with customized executive branding and webhook alerts.",
    reasonJustification: "Client's executive team wants automated reports without having to manually log in to the dashboard.",
    additionalCost: 650,
    additionalTimelineDays: 4,
    status: "pending",
  });

  const generateCrDocument = () => {
    return `===============================================================
FORMAL CHANGE REQUEST (CR) — PROJECT SCOPE ADJUSTMENT
===============================================================
Document Ref: ${crData.crNumber}
Project: ${crData.projectName}
Client: ${crData.clientName}
Date: ${crData.date}
Status: ${crData.status.toUpperCase()}

1. ORIGINAL SCOPE REFERENCE
${crData.originalScopeReference}

2. REQUESTED NEW FEATURE / MODIFICATION
${crData.requestedChangeDescription}

3. BUSINESS REASON / JUSTIFICATION
${crData.reasonJustification}

4. IMPACT EVALUATION & ADJUSTMENTS
• Additional Cost: $${crData.additionalCost} USD
• Additional Timeline Impact: +${crData.additionalTimelineDays} Business Days
• New Estimated Delivery Date: Adjusts current milestone deadline by +${crData.additionalTimelineDays} business days

5. AUTHORIZATION & SIGN-OFF
To authorize this additional scope and initiate work, please sign and return or reply via email confirming approval:

[ ] APPROVED — Proceed with additional scope and issue milestone invoice
[ ] DECLINED — Maintain original scope and timeline as signed

Client Representative: _______________________ Date: _________
`;
  };

  const handleExportCr = () => {
    exportTextFile(`Change-Request-${crData.crNumber}.txt`, generateCrDocument());
  };

  const handleCopyCr = () => {
    navigator.clipboard.writeText(generateCrDocument());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyScript = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScriptId(id);
    setTimeout(() => setCopiedScriptId(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 mb-2">
            <Layers className="h-3.5 w-3.5" />
            <span>Step 04 / 05 — Control & Changes</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Scope Creep & Change Request (CR) Protocol
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Never say "no" defensively. Say "Yes, we can build that! Here is the Change Request covering the extra cost and time."
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopyCr}
            className="flex items-center space-x-1.5 rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-colors shadow"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copied!" : "Copy CR Form"}</span>
          </button>
          <button
            onClick={handleExportCr}
            className="flex items-center space-x-1.5 rounded-lg bg-emerald-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CR Document (.TXT)</span>
          </button>
        </div>
      </div>

      {/* Scope Creep Philosophy Banner */}
      <div className="rounded-xl border border-amber-900/50 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/20 p-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-slate-300">
            <h3 className="text-sm font-bold text-white">The Golden Rule of Scope Creep</h3>
            <p className="leading-relaxed">
              When a client asks for extra features mid-project, do not argue or get frustrated. A Change Request is not a confrontation—it is a standard commercial vehicle that protects both parties.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Change Request Form */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <FileCheck className="h-5 w-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Change Request Generator ({crData.crNumber})
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400">Status:</span>
            <select
              value={crData.status}
              onChange={(e) => setCrData({ ...crData, status: e.target.value as any })}
              className={`rounded border px-2.5 py-1 text-xs font-bold focus:outline-none ${
                crData.status === "approved"
                  ? "bg-emerald-950 text-emerald-300 border-emerald-800"
                  : crData.status === "rejected"
                  ? "bg-rose-950 text-rose-300 border-rose-800"
                  : "bg-amber-950 text-amber-300 border-amber-800"
              }`}
            >
              <option value="pending">⏳ Pending Client Approval</option>
              <option value="approved">✅ Approved by Client</option>
              <option value="rejected">❌ Declined (Maintain Scope)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 font-medium mb-1">CR Number</label>
            <input
              type="text"
              value={crData.crNumber}
              onChange={(e) => setCrData({ ...crData, crNumber: e.target.value })}
              className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-400 font-medium mb-1">Project Name</label>
            <input
              type="text"
              value={crData.projectName}
              onChange={(e) => setCrData({ ...crData, projectName: e.target.value })}
              className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-400 font-medium mb-1">Client Name</label>
            <input
              type="text"
              value={crData.clientName}
              onChange={(e) => setCrData({ ...crData, clientName: e.target.value })}
              className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Original Scope Reference */}
        <div className="text-xs space-y-1">
          <label className="block text-slate-400 font-medium">1. Original Scope Reference (From signed SOW)</label>
          <input
            type="text"
            value={crData.originalScopeReference}
            onChange={(e) => setCrData({ ...crData, originalScopeReference: e.target.value })}
            className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        {/* Requested New Change */}
        <div className="text-xs space-y-1">
          <label className="block text-slate-400 font-medium">2. Description of Requested Modification / New Feature</label>
          <textarea
            rows={3}
            value={crData.requestedChangeDescription}
            onChange={(e) => setCrData({ ...crData, requestedChangeDescription: e.target.value })}
            className="w-full rounded-lg bg-slate-950 border border-slate-800 p-3 text-slate-200 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        {/* Impact Matrix: Extra Cost & Extra Days */}
        <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 font-medium mb-1 flex items-center space-x-1">
              <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
              <span>Additional Cost ($ USD)</span>
            </label>
            <input
              type="number"
              value={crData.additionalCost}
              onChange={(e) => setCrData({ ...crData, additionalCost: Number(e.target.value) })}
              className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-emerald-400 font-bold text-sm focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1 flex items-center space-x-1">
              <Calendar className="h-3.5 w-3.5 text-amber-400" />
              <span>Timeline Impact (+ Business Days)</span>
            </label>
            <input
              type="number"
              value={crData.additionalTimelineDays}
              onChange={(e) => setCrData({ ...crData, additionalTimelineDays: Number(e.target.value) })}
              className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-amber-400 font-bold text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Suggested Email Reply Script */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white">How to Email This CR to the Client:</h4>
          <button
            onClick={() => {
              const emailText = `Hi ${crData.clientName.split(" ")[0]},

Thanks for the update! Regarding the requested addition (${crData.requestedChangeDescription.slice(0, 50)}...):

I’d be happy to build this into the project! Because this falls outside our original signed Scope of Work, I’ve prepared a quick Change Request (${crData.crNumber}):

• Additional Cost: $${crData.additionalCost}
• Timeline Adjustment: +${crData.additionalTimelineDays} business days

Please reply confirming approval and I will integrate it into our development queue!

Best regards,`;
              copyScript(emailText, "cr-email");
            }}
            className="flex items-center space-x-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            {copiedScriptId === "cr-email" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copiedScriptId === "cr-email" ? "Copied Email!" : "Copy Email Template"}</span>
          </button>
        </div>

        <div className="rounded-lg bg-slate-950 p-4 border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed">
          Hi {crData.clientName.split(" ")[0]},<br /><br />
          Thanks for the update! Regarding the requested addition:<br />
          I’d be happy to build this into the project! Because this falls outside our original signed Scope of Work, I’ve prepared a quick Change Request ({crData.crNumber}):<br /><br />
          • Additional Cost: <strong className="text-emerald-400">${crData.additionalCost}</strong><br />
          • Timeline Adjustment: <strong className="text-amber-400">+{crData.additionalTimelineDays} business days</strong><br /><br />
          Please reply confirming approval and I will integrate it into our active queue!
        </div>
      </div>
    </div>
  );
};
