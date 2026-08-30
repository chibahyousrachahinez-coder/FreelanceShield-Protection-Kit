import React, { useState } from "react";
import { RED_FLAGS, DISCOVERY_CATEGORIES } from "../data/kitData";
import {
  UserCheck,
  AlertTriangle,
  HelpCircle,
  Copy,
  Check,
  FileText,
  Download,
  ShieldAlert,
  ShieldCheck,
  Search,
  ExternalLink,
} from "lucide-react";
import { exportTextFile, exportCsvFile } from "../utils/exportUtils";

export const ClientScreeningView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<"assessment" | "red_flags" | "discovery" | "matrix">("assessment");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Client Risk Assessment State
  const [clientName, setClientName] = useState("Acme Digital Ltd");
  const [company, setCompany] = useState("Acme Inc");
  const [email, setEmail] = useState("contact@acmedigital.example");
  const [website, setWebsite] = useState("https://acmedigital.example");
  const [contactSource, setContactSource] = useState("Inbound Referral");

  // Section B: Project Clarity Questions (7)
  const [clarityQuestions, setClarityQuestions] = useState([
    { id: "cq1", label: "Can the client clearly explain what business problem they need solved?", checked: true },
    { id: "cq2", label: "Are the deliverables explicitly itemized and defined?", checked: true },
    { id: "cq3", label: "Is the project deadline realistic for the requested workload?", checked: true },
    { id: "cq4", label: "Is the budget realistic for the technical scope requested?", checked: false },
    { id: "cq5", label: "Are client responsibilities (content, credentials, assets) clearly assigned?", checked: true },
    { id: "cq6", label: "Are revision limits (e.g. 2 rounds) understood and accepted?", checked: true },
    { id: "cq7", label: "Are technical constraints and hosting infrastructure clear?", checked: false },
  ]);

  // Section C: Payment Warning Signs (6)
  const [paymentFlags, setPaymentFlags] = useState([
    { id: "pf1", label: "Client refuses to discuss payment terms before starting.", checked: false },
    { id: "pf2", label: "Client insists on paying 100% only after complete launch.", checked: false },
    { id: "pf3", label: "Client demands substantial unpaid spec work / custom demo before committing.", checked: false },
    { id: "pf4", label: "Client repeatedly alters agreed payment conditions or delays invoices.", checked: false },
    { id: "pf5", label: "Client avoids providing formal company billing address or VAT/Tax ID.", checked: false },
    { id: "pf6", label: "Client applies heavy pressure to start immediately without a written agreement.", checked: true },
  ]);

  const toggleClarity = (id: string) => {
    setClarityQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, checked: !q.checked } : q))
    );
  };

  const togglePaymentFlag = (id: string) => {
    setPaymentFlags((prev) =>
      prev.map((f) => (f.id === id ? { ...f, checked: !f.checked } : f))
    );
  };

  const clarityScore = clarityQuestions.filter((q) => q.checked).length;
  const warningCount = paymentFlags.filter((f) => f.checked).length;

  // Calculate Overall Risk Level
  const calculateRisk = () => {
    if (warningCount >= 3 || clarityScore <= 3) return { level: "High Risk", color: "text-rose-400", bg: "bg-rose-950/40 border-rose-500/50" };
    if (warningCount >= 1 || clarityScore <= 5) return { level: "Moderate Risk", color: "text-amber-400", bg: "bg-amber-950/40 border-amber-500/50" };
    return { level: "Low Risk (Favorable)", color: "text-emerald-400", bg: "bg-emerald-950/40 border-emerald-500/50" };
  };

  const currentRisk = calculateRisk();

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportAssessment = () => {
    const text = `=========================================
FREELANCESHIELD — CLIENT RISK ASSESSMENT
=========================================
Client: ${clientName}
Company: ${company}
Email: ${email}
Website: ${website}
Lead Source: ${contactSource}
Date: ${new Date().toISOString().split("T")[0]}

OVERALL RISK EVALUATION: ${currentRisk.level}
Clarity Score: ${clarityScore} / 7
Payment Warning Signals: ${warningCount} / 6

--- SECTION B: PROJECT CLARITY ---
${clarityQuestions.map((q) => `[${q.checked ? "YES" : "NO"}] ${q.label}`).join("\n")}

--- SECTION C: PAYMENT WARNING SIGNS ---
${paymentFlags.map((f) => `[${f.checked ? "FLAGGED" : "CLEAN"}] ${f.label}`).join("\n")}

RECOMMENDED ACTION:
${
  warningCount > 0
    ? "Pause before starting. Clarify all payment terms in writing and secure a 50% cleared deposit and signed Scope of Work before scheduling production."
    : "Proceed to Step 2: Define Scope of Work and structure milestone payments."
}
`;
    exportTextFile(`Client-Risk-Assessment-${clientName.replace(/\s+/g, "-")}.txt`, text);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 mb-2">
            <UserCheck className="h-3.5 w-3.5" />
            <span>Step 01 — Screening & Due Diligence</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Client Screening & Risk Assessment
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Identify potential project risks before committing your time.
          </p>
        </div>

        {/* Sub-tab pills */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 space-x-1">
          <button
            onClick={() => setActiveSubTab("assessment")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeSubTab === "assessment"
                ? "bg-emerald-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🔎 Risk Assessment
          </button>
          <button
            onClick={() => setActiveSubTab("red_flags")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeSubTab === "red_flags"
                ? "bg-emerald-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🚩 Red Flags Guide ({RED_FLAGS.length})
          </button>
          <button
            onClick={() => setActiveSubTab("discovery")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeSubTab === "discovery"
                ? "bg-emerald-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            📋 35 Discovery Questions
          </button>
        </div>
      </div>

      {/* Sub-tab 1: Interactive Client Risk Assessment */}
      {activeSubTab === "assessment" && (
        <div className="space-y-6">
          {/* Risk Level Output Banner */}
          <div className={`rounded-2xl border p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg ${currentRisk.bg}`}>
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900/80 border border-slate-700 text-2xl">
                {warningCount >= 2 ? "⚠️" : warningCount === 1 ? "🟡" : "🟢"}
              </div>
              <div>
                <div className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  Calculated Risk Evaluation
                </div>
                <div className={`text-2xl font-extrabold ${currentRisk.color}`}>
                  {currentRisk.level}
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Project Clarity: <strong className="text-white">{clarityScore}/7</strong> • Payment Warning Flags: <strong className="text-white">{warningCount}/6</strong>
                </p>
              </div>
            </div>

            <button
              onClick={handleExportAssessment}
              className="flex items-center space-x-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-slate-200 border border-slate-700 hover:bg-slate-800 transition-colors shadow"
            >
              <Download className="h-4 w-4" />
              <span>Export Assessment (.TXT)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Section A: Client Information */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-400 font-bold text-xs">
                  A
                </span>
                <h3 className="text-sm font-bold text-white">Client Information</h3>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Client Name</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Company Name</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Email / Contact</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Website / LinkedIn</label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">How did they contact you?</label>
                  <input
                    type="text"
                    value={contactSource}
                    onChange={(e) => setContactSource(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section B: Project Clarity */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-400 font-bold text-xs">
                    B
                  </span>
                  <h3 className="text-sm font-bold text-white">Project Clarity (7 Checkpoints)</h3>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                  {clarityScore}/7
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                {clarityQuestions.map((q) => (
                  <label
                    key={q.id}
                    className="flex items-start space-x-2.5 p-2 rounded-lg bg-slate-950/50 hover:bg-slate-950 border border-slate-800/80 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={q.checked}
                      onChange={() => toggleClarity(q.id)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                    />
                    <span className={`leading-relaxed ${q.checked ? "text-slate-200 font-medium" : "text-slate-400"}`}>
                      {q.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Section C: Payment Warning Signs */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-rose-500/20 text-rose-400 font-bold text-xs">
                    C
                  </span>
                  <h3 className="text-sm font-bold text-white">Payment Warning Signs (Flags)</h3>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                  warningCount > 0 ? "bg-rose-950/60 text-rose-400 border-rose-800/60" : "bg-emerald-950/60 text-emerald-400 border-emerald-800/60"
                }`}>
                  {warningCount} Flags
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                {paymentFlags.map((f) => (
                  <label
                    key={f.id}
                    className={`flex items-start space-x-2.5 p-2 rounded-lg border cursor-pointer transition-colors ${
                      f.checked
                        ? "bg-rose-950/20 border-rose-800/50 text-rose-200"
                        : "bg-slate-950/50 border-slate-800/80 text-slate-400 hover:bg-slate-950"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={f.checked}
                      onChange={() => togglePaymentFlag(f.id)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-900 text-rose-500 focus:ring-rose-500 accent-rose-500"
                    />
                    <span className={`leading-relaxed ${f.checked ? "font-medium text-rose-200" : ""}`}>
                      {f.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Protective Response */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-5">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center space-x-2">
              <ShieldAlert className="h-4 w-4 text-emerald-400" />
              <span>Recommended Operational Response</span>
            </h4>
            <div className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-lg border border-slate-800">
              <p className="font-medium text-slate-200 mb-1">
                {warningCount > 0
                  ? "⚠️ Risk Signals Detected: Do not accuse the client of wrongdoing. You are identifying operational risk signals, not making accusations."
                  : "🟢 Favorable Signals: Client shows solid clarity and willingness to follow standard business procedures."}
              </p>
              <p>
                <strong>Protective Action:</strong> Pause before starting. Clarify all payment terms in writing, define the itemized deliverables and exclusions in the Scope of Work, and require a 50% upfront deposit before scheduling calendar time.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 2: Client Red Flags Guide */}
      {activeSubTab === "red_flags" && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-300">
            💡 <strong>The Red Flags Philosophy:</strong> Clients rarely announce "I am going to delay your payment."
            They use specific phrases that signal scope ambiguity, payment risk, or timeline distortion. Use these verbatim suggested responses to redirect the client professionally without losing the deal.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RED_FLAGS.map((rf, idx) => (
              <div
                key={rf.id}
                className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 flex flex-col justify-between shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
                      FLAG #{idx + 1} • {rf.category}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      rf.riskSeverity === "critical"
                        ? "bg-rose-950/80 text-rose-300 border border-rose-800"
                        : "bg-amber-950/80 text-amber-300 border border-amber-800"
                    }`}>
                      {rf.riskSeverity} Risk
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mt-3 leading-snug">
                    {rf.quote}
                  </h3>

                  <div className="mt-3 space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 font-semibold">Potential Risk: </span>
                      <span className="text-slate-300">{rf.potentialRisk}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold">Why it matters: </span>
                      <span className="text-slate-300">{rf.whyItMatters}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1.5">
                    <span>Suggested Response:</span>
                    <button
                      onClick={() => handleCopy(rf.recommendedResponse, rf.id)}
                      className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 text-[11px]"
                    >
                      {copiedId === rf.id ? (
                        <>
                          <Check className="h-3 w-3" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy Response</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="rounded-lg bg-slate-950 p-3 text-xs text-emerald-300 italic border border-slate-800">
                    {rf.recommendedResponse}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-tab 3: 35 Client Discovery Questions */}
      {activeSubTab === "discovery" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 rounded-xl p-4">
            <div>
              <h3 className="text-sm font-bold text-white">35 Essential Discovery Questions</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Never start with "Sure, I can build it" before understanding the full context. Copy these questions into your onboarding questionnaire or discovery call agenda.
              </p>
            </div>

            <button
              onClick={() => {
                const fullText = DISCOVERY_CATEGORIES.map(
                  (c) => `=== ${c.name.toUpperCase()} ===\n${c.questions.map((q, i) => `${i + 1}. ${q}`).join("\n")}`
                ).join("\n\n");
                handleCopy(fullText, "all-discovery");
              }}
              className="flex items-center space-x-1.5 rounded-lg bg-emerald-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shrink-0 shadow"
            >
              {copiedId === "all-discovery" ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>All 35 Questions Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy All 35 Questions</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DISCOVERY_CATEGORIES.map((category) => (
              <div
                key={category.id}
                className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                      <span>{category.name}</span>
                    </h4>
                    <button
                      onClick={() => {
                        const catText = `=== ${category.name} ===\n` + category.questions.map((q, i) => `${i + 1}. ${q}`).join("\n");
                        handleCopy(catText, category.id);
                      }}
                      className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
                    >
                      {copiedId === category.id ? (
                        <>
                          <Check className="h-3 w-3" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy Section</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-slate-400 mt-2 mb-3 italic">
                    {category.description}
                  </p>

                  <ul className="space-y-2 text-xs text-slate-300">
                    {category.questions.map((q, i) => (
                      <li key={i} className="flex items-start space-x-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                        <span className="font-bold text-emerald-400">{i + 1}.</span>
                        <span className="leading-relaxed">{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
