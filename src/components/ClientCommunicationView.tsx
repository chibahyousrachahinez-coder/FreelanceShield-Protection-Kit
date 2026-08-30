import React, { useState } from "react";
import { SCRIPT_TEMPLATES } from "../data/kitData";
import {
  MessageSquare,
  Search,
  Copy,
  Check,
  Sliders,
  DollarSign,
  Layers,
  Clock,
  CheckCircle2,
  AlertOctagon,
  Lightbulb,
  Shield,
} from "lucide-react";

export const ClientCommunicationView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Dynamic Variable Replacement State
  const [clientName, setClientName] = useState("Sarah");
  const [projectName, setProjectName] = useState("Acme Dashboard");
  const [featureName, setFeatureName] = useState("Automated Weekly PDF Digest");
  const [amount, setAmount] = useState("1,500");
  const [dueDate, setDueDate] = useState("September 15th");

  const categories = [
    { id: "all", label: "All 30 Scripts" },
    { id: "payment", label: "💰 Payment & Deposits (6)" },
    { id: "scope_creep", label: "🚨 Scope Creep & CRs (5)" },
    { id: "delays", label: "⏳ Delays & Materials (5)" },
    { id: "approvals", label: "📝 Approvals & Feedback (5)" },
    { id: "difficult_situations", label: "🛡️ Boundary Setting (5)" },
    { id: "closing", label: "🏁 Closing & Retainers (4)" },
  ];

  // Helper to replace template variables
  const formatTemplate = (template: string) => {
    return template
      .replace(/\[Client Name\]/g, clientName || "[Client Name]")
      .replace(/\[Project Name\]/g, projectName || "[Project Name]")
      .replace(/\[Feature Name\]/g, featureName || "[Feature Name]")
      .replace(/\[Amount\]/g, amount || "[Amount]")
      .replace(/\[Due Date\]/g, dueDate || "[Due Date]");
  };

  const handleCopy = (formattedText: string, id: string) => {
    navigator.clipboard.writeText(formattedText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredScripts = SCRIPT_TEMPLATES.filter((script) => {
    const matchesCategory =
      selectedCategory === "all" || script.category === selectedCategory;
    const matchesSearch =
      script.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.scenario.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.proTip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.template.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 mb-2">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Step 05 — Professional Communication</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            30 Copy-Paste Client Communication Scripts
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Never struggle to write difficult emails again. Word-for-word scripts designed to maintain warmth while protecting your professional boundaries.
          </p>
        </div>
      </div>

      {/* Global Variable Customizer Bar */}
      <div className="rounded-xl border border-emerald-800/50 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/20 p-5 space-y-3 shadow-lg">
        <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
          <Sliders className="h-4 w-4" />
          <span>Live Template Variable Injector</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400 font-normal normal-case">
            Values entered below will automatically populate into all 30 scripts in real-time.
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div>
            <label className="block text-slate-400 font-medium mb-1">[Client Name]</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full rounded bg-slate-900 border border-slate-800 px-2.5 py-1.5 text-slate-200 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-400 font-medium mb-1">[Project Name]</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full rounded bg-slate-900 border border-slate-800 px-2.5 py-1.5 text-slate-200 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-400 font-medium mb-1">[Feature Name]</label>
            <input
              type="text"
              value={featureName}
              onChange={(e) => setFeatureName(e.target.value)}
              className="w-full rounded bg-slate-900 border border-slate-800 px-2.5 py-1.5 text-slate-200 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-400 font-medium mb-1">[Amount]</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded bg-slate-900 border border-slate-800 px-2.5 py-1.5 text-slate-200 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-400 font-medium mb-1">[Due Date]</label>
            <input
              type="text"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded bg-slate-900 border border-slate-800 px-2.5 py-1.5 text-slate-200 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                selectedCategory === cat.id
                  ? "bg-emerald-500 text-slate-950 shadow"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search scripts or situations..."
            className="w-full rounded-lg bg-slate-900 border border-slate-800 pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Script Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredScripts.map((script, index) => {
          const formatted = formatTemplate(script.template);
          return (
            <div
              key={script.id}
              className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                      #{index + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-300">
                      {script.categoryLabel}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(formatted, script.id)}
                    className="flex items-center space-x-1 rounded bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-xs font-semibold text-emerald-400 transition-colors shadow-sm"
                  >
                    {copiedId === script.id ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Script</span>
                      </>
                    )}
                  </button>
                </div>

                <h3 className="text-base font-bold text-white mt-3 leading-snug">
                  {script.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  <strong>Scenario:</strong> {script.scenario}
                </p>

                {/* Formatted Script Body */}
                <div className="mt-4 rounded-lg bg-slate-950 p-4 border border-slate-800 text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed select-all">
                  {formatted}
                </div>
              </div>

              {/* Pro Tip Callout */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-start space-x-2 text-[11px] text-amber-300/90">
                <Lightbulb className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  <strong>Pro Strategy:</strong> {script.proTip}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
