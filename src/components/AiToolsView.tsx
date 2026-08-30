import React, { useState } from "react";
import { AI_PROMPTS } from "../data/kitData";
import {
  Cpu,
  Send,
  Copy,
  Check,
  AlertTriangle,
  FileCheck2,
  MessageSquare,
  ShieldAlert,
  Loader2,
  BookOpen,
  ArrowRight,
  Lock,
  ShieldCheck,
} from "lucide-react";

export const AiToolsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"risk_analyzer" | "scope_analyzer" | "response_writer" | "prompt_pack">("risk_analyzer");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // 1. Client Risk Analyzer State
  const [clientMessage, setClientMessage] = useState(
    `Hey, love your portfolio! We need a clean dashboard app built really fast for our launch next Thursday. It's super simple, mostly standard stuff, so let's skip the heavy contract for now and we'll definitely have tons of ongoing work for you if you crush this. What's your best quick price?`
  );
  const [freelancerRole, setFreelancerRole] = useState("Full-Stack Web Developer");
  const [riskLoading, setRiskLoading] = useState(false);
  const [riskResult, setRiskResult] = useState<any>(null);
  const [riskError, setRiskError] = useState<string | null>(null);

  // 2. Scope Creep Analyzer State
  const [originalScope, setOriginalScope] = useState(
    `Deliverable: Responsive React Analytics Dashboard displaying standard weekly data tables, basic date range filter (7d / 30d), and CSV export. Includes 2 rounds of design revisions.`
  );
  const [newRequest, setNewRequest] = useState(
    `Can you also add an automated email scheduler that compiles weekly executive PDF reports with custom chart branding and sends Slack webhook alerts? It shouldn't take more than a minute since you already have the charts!`
  );
  const [scopeLoading, setScopeLoading] = useState(false);
  const [scopeResult, setScopeResult] = useState<any>(null);
  const [scopeError, setScopeError] = useState<string | null>(null);

  // 3. Response Writer State
  const [situation, setSituation] = useState("scope_creep");
  const [clientName, setClientName] = useState("Sarah");
  const [tone, setTone] = useState("polite_and_firm");
  const [contextDetails, setContextDetails] = useState(
    "Client Sarah asked to add Stripe recurring subscription billing to a simple landing page project without extra budget."
  );
  const [writerLoading, setWriterLoading] = useState(false);
  const [writerResult, setWriterResult] = useState<any>(null);
  const [writerError, setWriterError] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Run AI Client Risk Analysis
  const runRiskAnalysis = async () => {
    if (!clientMessage.trim()) return;
    setRiskLoading(true);
    setRiskError(null);
    try {
      const res = await fetch("/api/gemini/analyze-client-risk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientMessage,
          projectContext: `Freelancer Discipline: ${freelancerRole}`,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setRiskResult(data);
    } catch (err: any) {
      setRiskError(err.message || "Failed to connect to AI engine.");
    } finally {
      setRiskLoading(false);
    }
  };

  // Run AI Scope Comparator
  const runScopeAnalysis = async () => {
    if (!originalScope.trim() || !newRequest.trim()) return;
    setScopeLoading(true);
    setScopeError(null);
    try {
      const res = await fetch("/api/gemini/analyze-scope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalScope, newRequest }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Scope analysis failed");
      setScopeResult(data);
    } catch (err: any) {
      setScopeError(err.message || "Failed to connect to AI engine.");
    } finally {
      setScopeLoading(false);
    }
  };

  // Run AI Response Generator
  const runResponseWriter = async () => {
    if (!contextDetails.trim()) return;
    setWriterLoading(true);
    setWriterError(null);
    try {
      const res = await fetch("/api/gemini/generate-client-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          situation,
          clientName,
          tone,
          clientMessage: contextDetails,
          originalAgreement: "Signed Statement of Work with milestone payments",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setWriterResult(data);
    } catch (err: any) {
      setWriterError(err.message || "Failed to generate response.");
    } finally {
      setWriterLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400 mb-2">
            <Cpu className="h-3.5 w-3.5" />
            <span>Step 07 — AI-Powered Intelligence Suite (Beta)</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            FreelanceShield AI Suite & Prompt Pack
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Analyze client messages for risk signals, evaluate scope creep against signed SOWs, and generate professional boundary responses.
          </p>
        </div>

        {/* Sub-tabs */}
        <div className="flex flex-wrap items-center bg-slate-900 border border-slate-800 rounded-lg p-1 gap-1">
          <button
            onClick={() => setActiveTab("risk_analyzer")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === "risk_analyzer"
                ? "bg-purple-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🔎 Risk Analyzer
          </button>
          <button
            onClick={() => setActiveTab("scope_analyzer")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === "scope_analyzer"
                ? "bg-purple-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            ⚖️ Scope Creep Check
          </button>
          <button
            onClick={() => setActiveTab("response_writer")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === "response_writer"
                ? "bg-purple-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            ✍️ Response Writer
          </button>
          <button
            onClick={() => setActiveTab("prompt_pack")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === "prompt_pack"
                ? "bg-purple-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            📖 Prompt Pack ({AI_PROMPTS.length})
          </button>
        </div>
      </div>

      {/* AI Privacy & Confidentiality Notice Banner */}
      <div className="rounded-xl border border-amber-500/40 bg-amber-950/20 p-4 sm:p-5 flex items-start space-x-3">
        <Lock className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <span className="font-bold text-amber-200 block text-sm">
            🔒 Client Privacy & Data Security Notice
          </span>
          <p className="text-slate-300 leading-relaxed">
            When using AI analysis tools, <strong>never input sensitive credentials, API keys, private passwords, personal banking information, or proprietary trade secrets</strong>. Redact or replace real client names and confidential project specifics with generic placeholders (e.g. <em>[Client Name]</em> or <em>[Company XYZ]</em>) prior to submitting queries.
          </p>
        </div>
      </div>

      {/* Tool 1: AI Client Risk Analyzer */}
      {activeTab === "risk_analyzer" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <ShieldAlert className="h-4 w-4 text-purple-400" />
              <span>Analyze Client Pitch or Message for Hidden Red Flags</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Your Discipline / Role</label>
                <input
                  type="text"
                  value={freelancerRole}
                  onChange={(e) => setFreelancerRole(e.target.value)}
                  className="w-full sm:w-80 rounded bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">
                  Paste Client Email, Upwork/Fiverr Message, or Discovery Call Transcript
                </label>
                <textarea
                  rows={4}
                  value={clientMessage}
                  onChange={(e) => setClientMessage(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 p-3 text-slate-200 focus:border-purple-500 focus:outline-none"
                  placeholder="Paste client inquiry here..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={runRiskAnalysis}
                  disabled={riskLoading || !clientMessage.trim()}
                  className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-4 py-2 text-xs font-bold transition-all shadow-md shadow-purple-950/50 disabled:opacity-50"
                >
                  {riskLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  <span>{riskLoading ? "Analyzing with Gemini..." : "Run AI Risk Analysis"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Risk Error */}
          {riskError && (
            <div className="rounded-xl border border-rose-800 bg-rose-950/30 p-4 text-xs text-rose-300">
              ⚠️ {riskError}
            </div>
          )}

          {/* Risk Result Card */}
          {riskResult && (
            <div className="rounded-xl border border-purple-900/50 bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950/20 p-6 space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold text-lg">
                    {riskResult.riskScore >= 70 ? "🔴" : riskResult.riskScore >= 40 ? "🟡" : "🟢"}
                  </div>
                  <div>
                    <div className="text-xs uppercase font-bold text-slate-400">Risk Assessment</div>
                    <div className="text-xl font-extrabold text-white">
                      {riskResult.riskLevel} • Risk Score: {riskResult.riskScore}/100
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-400">
                  Powered by Gemini 3.7 Flash
                </div>
              </div>

              <div className="space-y-4 text-xs">
                {/* Executive Summary */}
                {riskResult.summary && (
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="font-bold text-slate-300 block mb-1">Executive Summary:</span>
                    <p className="text-slate-300 leading-relaxed">{riskResult.summary}</p>
                  </div>
                )}

                {/* Concerns / Warning Signals */}
                {riskResult.concerns && riskResult.concerns.length > 0 && (
                  <div>
                    <h4 className="font-bold text-amber-400 mb-2 uppercase tracking-wider text-[11px]">
                      🚩 Identified Warning Signals:
                    </h4>
                    <div className="space-y-2">
                      {riskResult.concerns.map((c: any, i: number) => (
                        <div key={i} className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-amber-300">{c.category}</span>
                            <span className="text-[10px] text-slate-500">Signal #{i + 1}</span>
                          </div>
                          <p className="text-slate-200 italic">"{c.signal}"</p>
                          <p className="text-slate-400"><strong>Impact:</strong> {c.whyItMatters}</p>
                          <p className="text-emerald-400"><strong>Recommended Step:</strong> {c.recommendedAction}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Legacy or alternative fallback array */}
                {riskResult.detectedRedFlags && (
                  <div>
                    <h4 className="font-bold text-amber-400 mb-2 uppercase tracking-wider text-[11px]">
                      🚩 Identified Warning Signals:
                    </h4>
                    <ul className="space-y-1.5">
                      {riskResult.detectedRedFlags.map((flag: string, i: number) => (
                        <li key={i} className="flex items-start space-x-2 bg-slate-950 p-2.5 rounded border border-slate-800 text-slate-200">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Suggested Verbatim Reply */}
                {riskResult.suggestedResponse && (
                  <div className="bg-slate-950 p-4 rounded-xl border border-purple-800/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-purple-300">Suggested Protective Reply Script:</h5>
                      <button
                        onClick={() => handleCopy(riskResult.suggestedResponse, "ai-risk-reply")}
                        className="flex items-center space-x-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
                      >
                        {copiedId === "ai-risk-reply" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />}
                        <span>{copiedId === "ai-risk-reply" ? "Copied!" : "Copy Reply"}</span>
                      </button>
                    </div>
                    <div className="text-slate-200 font-mono whitespace-pre-wrap leading-relaxed">
                      {riskResult.suggestedResponse}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tool 2: AI Scope Creep Comparator */}
      {activeTab === "scope_analyzer" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <FileCheck2 className="h-4 w-4 text-purple-400" />
              <span>Scope Creep Comparator (Original SOW vs New Request)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">
                  1. Original Agreed Scope of Work (SOW)
                </label>
                <textarea
                  rows={4}
                  value={originalScope}
                  onChange={(e) => setOriginalScope(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 p-3 text-slate-200 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">
                  2. New Client Request / Modification
                </label>
                <textarea
                  rows={4}
                  value={newRequest}
                  onChange={(e) => setNewRequest(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 p-3 text-slate-200 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={runScopeAnalysis}
                disabled={scopeLoading || !originalScope.trim() || !newRequest.trim()}
                className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-4 py-2 text-xs font-bold transition-all shadow-md shadow-purple-950/50 disabled:opacity-50"
              >
                {scopeLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                <span>{scopeLoading ? "Comparing Scope..." : "Compare Scope & Generate CR"}</span>
              </button>
            </div>
          </div>

          {scopeError && (
            <div className="rounded-xl border border-rose-800 bg-rose-950/30 p-4 text-xs text-rose-300">
              ⚠️ {scopeError}
            </div>
          )}

          {scopeResult && (
            <div className="rounded-xl border border-purple-900/50 bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950/20 p-6 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-3">
                  <span
                    className={`rounded-lg px-3 py-1 text-xs font-extrabold uppercase border ${
                      scopeResult.verdict?.includes("Outside") || scopeResult.verdict === "SCOPE_CREEP"
                        ? "bg-amber-950 text-amber-300 border-amber-700"
                        : scopeResult.verdict?.includes("Included")
                        ? "bg-emerald-950 text-emerald-300 border-emerald-700"
                        : "bg-purple-950 text-purple-300 border-purple-700"
                    }`}
                  >
                    VERDICT: {scopeResult.verdict?.replace("_", " ")}
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  Confidence: <strong className="text-white">{scopeResult.confidence || 95}%</strong>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-slate-300 mb-1">Scope Analysis & Breakdown:</h4>
                  <p className="text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800 leading-relaxed">
                    {scopeResult.analysis}
                  </p>
                </div>

                {scopeResult.scopeComparisonItems && (
                  <div className="space-y-1.5">
                    <h5 className="font-bold text-slate-300">Itemized Feature Status:</h5>
                    {scopeResult.scopeComparisonItems.map((item: any, i: number) => (
                      <div key={i} className="flex items-start justify-between bg-slate-950 p-2.5 rounded border border-slate-800">
                        <span className="text-slate-200">{item.item}</span>
                        <span className="font-bold text-amber-400 text-[11px]">{item.status}</span>
                      </div>
                    ))}
                  </div>
                )}

                {(scopeResult.recommendedChangeRequest || scopeResult.changeRequestNeeded) && (
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <h5 className="font-bold text-amber-400">Recommended Change Request:</h5>
                    <p className="text-slate-300">
                      <strong>Title:</strong> {scopeResult.recommendedChangeRequest?.suggestedTitle || scopeResult.changeRequestNeeded?.title}
                    </p>
                    <p className="text-slate-400">
                      <strong>Estimated Effort:</strong> {scopeResult.recommendedChangeRequest?.estimatedWorkHours || scopeResult.changeRequestNeeded?.timelineImpact || "4-8 hours"}
                    </p>
                  </div>
                )}

                {(scopeResult.clientReplyScript || scopeResult.clientResponseScript) && (
                  <div className="bg-slate-950 p-4 rounded-xl border border-purple-800/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-purple-300">Client Response Script:</h5>
                      <button
                        onClick={() => handleCopy(scopeResult.clientReplyScript || scopeResult.clientResponseScript, "ai-scope-reply")}
                        className="flex items-center space-x-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
                      >
                        {copiedId === "ai-scope-reply" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copiedId === "ai-scope-reply" ? "Copied!" : "Copy Response"}</span>
                      </button>
                    </div>
                    <div className="text-slate-200 font-mono whitespace-pre-wrap leading-relaxed">
                      {scopeResult.clientReplyScript || scopeResult.clientResponseScript}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tool 3: AI Response Writer */}
      {activeTab === "response_writer" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-purple-400" />
              <span>Tailored Boundary-Setting Response Generator</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Situation Type</label>
                <select
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200 focus:border-purple-500 focus:outline-none"
                >
                  <option value="scope_creep">🚨 Scope Creep / New Feature Request</option>
                  <option value="late_payment">💰 Overdue Invoice / Late Payment</option>
                  <option value="client_ghosting">👻 Client Ghosting / Missing Materials</option>
                  <option value="unreasonable_deadline">⏰ Unrealistic Rush Deadline</option>
                  <option value="unpaid_spec_work">🛑 Client Asking for Unpaid Spec Work</option>
                  <option value="revision_overrun">🔄 Revisions Exceeding 2-Round Limit</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Client Name</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Tone & Posture</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200 focus:border-purple-500 focus:outline-none"
                >
                  <option value="polite_and_firm">Warm, Professional & Firm (Recommended)</option>
                  <option value="formal_contractual">Formal & Contractual</option>
                  <option value="collaborative_options">Collaborative with Phased Options</option>
                </select>
              </div>
            </div>

            <div className="text-xs">
              <label className="block text-slate-400 font-medium mb-1">
                Specific Client Context & Details
              </label>
              <textarea
                rows={3}
                value={contextDetails}
                onChange={(e) => setContextDetails(e.target.value)}
                placeholder="Explain what happened, what client said, amounts, and dates..."
                className="w-full rounded-lg bg-slate-950 border border-slate-800 p-3 text-slate-200 focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={runResponseWriter}
                disabled={writerLoading || !contextDetails.trim()}
                className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-4 py-2 text-xs font-bold transition-all shadow-md shadow-purple-950/50 disabled:opacity-50"
              >
                {writerLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                <span>{writerLoading ? "Writing Response..." : "Generate Client Response"}</span>
              </button>
            </div>
          </div>

          {writerError && (
            <div className="rounded-xl border border-rose-800 bg-rose-950/30 p-4 text-xs text-rose-300">
              ⚠️ {writerError}
            </div>
          )}

          {writerResult && (
            <div className="rounded-xl border border-purple-900/50 bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950/20 p-6 space-y-6 shadow-2xl">
              <div className="space-y-4 text-xs">
                {writerResult.subjectLine && (
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Email Subject Line:</span>
                    <div className="text-sm font-bold text-white">{writerResult.subjectLine}</div>
                  </div>
                )}

                <div className="bg-slate-950 p-4 rounded-xl border border-purple-800/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-300 font-bold">Word-for-Word Message Body:</span>
                    <button
                      onClick={() => handleCopy(writerResult.messageBody, "ai-writer-body")}
                      className="flex items-center space-x-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
                    >
                      {copiedId === "ai-writer-body" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedId === "ai-writer-body" ? "Copied!" : "Copy Email"}</span>
                    </button>
                  </div>
                  <div className="text-slate-200 font-mono whitespace-pre-wrap leading-relaxed">
                    {writerResult.messageBody}
                  </div>
                </div>

                {writerResult.keyPointsCovered && (
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] text-slate-300 space-y-1">
                    <span className="font-bold text-emerald-400">Protective Strategy Highlights:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-400">
                      {writerResult.keyPointsCovered.map((kp: string, idx: number) => (
                        <li key={idx}>{kp}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tool 4: Prompt Pack */}
      {activeTab === "prompt_pack" && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-300">
            📖 <strong>AI Prompt Pack:</strong> Copy these comprehensive system prompts directly into Gemini, Claude, or ChatGPT to run deep project protection analyses on your existing client threads.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {AI_PROMPTS.map((prompt) => (
              <div
                key={prompt.id}
                className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-bold text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/60">
                      {prompt.category}
                    </span>
                    <button
                      onClick={() => handleCopy(prompt.promptText, prompt.id)}
                      className="flex items-center space-x-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
                    >
                      {copiedId === prompt.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedId === prompt.id ? "Copied Prompt!" : "Copy Prompt"}</span>
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-white mt-3">{prompt.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{prompt.description}</p>

                  <div className="mt-4 rounded-lg bg-slate-950 p-3 border border-slate-800 text-[11px] text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                    {prompt.promptText}
                  </div>
                </div>

                <div className="mt-3 pt-2 text-[10px] text-slate-400">
                  <strong>Example Input:</strong> {prompt.exampleInput.slice(0, 70)}...
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
