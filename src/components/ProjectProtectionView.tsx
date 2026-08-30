import React, { useState } from "react";
import { SOWDeliverable } from "../types";
import {
  FileCheck2,
  Plus,
  Trash2,
  Download,
  Printer,
  Copy,
  Check,
  AlertCircle,
  ShieldAlert,
  FileText,
  CheckSquare,
} from "lucide-react";
import { exportTextFile } from "../utils/exportUtils";

export const ProjectProtectionView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"sow" | "brief" | "requirements">("sow");
  const [copied, setCopied] = useState(false);

  // SOW State
  const [projectName, setProjectName] = useState("Custom Web Application & Dashboard");
  const [clientName, setClientName] = useState("Acme Digital Ltd (Attn: Sarah Jenkins)");
  const [freelancerName, setFreelancerName] = useState("Alex Morgan (Full-Stack Developer)");
  const [startDate, setStartDate] = useState("2026-09-01");
  const [targetCompletion, setTargetCompletion] = useState("2026-09-30");
  const [projectObjective, setProjectObjective] = useState(
    "To design and engineer a modern, high-performance web dashboard that allows Acme Digital clients to track their analytics in real-time."
  );

  const [deliverables, setDeliverables] = useState<SOWDeliverable[]>([
    {
      id: "del-1",
      itemNumber: 1,
      name: "Homepage & Marketing Landing",
      description: "Fully responsive landing page with hero animation, features showcase, and contact form validation.",
      estimatedDays: "5 business days",
    },
    {
      id: "del-2",
      itemNumber: 2,
      name: "Client Analytics Dashboard",
      description: "Interactive analytics view with chart visualizers, date-range filters, and CSV export functionality.",
      estimatedDays: "8 business days",
    },
    {
      id: "del-3",
      itemNumber: 3,
      name: "API & Authentication Layer",
      description: "Secure session authentication, user profile management, and REST API integration with backend.",
      estimatedDays: "5 business days",
    },
    {
      id: "del-4",
      itemNumber: 4,
      name: "Production Deployment & QA",
      description: "Live staging deployment, mobile responsive QA, cross-browser testing, and SSL domain configuration.",
      estimatedDays: "3 business days",
    },
  ]);

  // Exclusions Matrix (The Critical NOT INCLUDED section)
  const [exclusions, setExclusions] = useState([
    { id: "ex1", label: "Native Mobile Applications (iOS / Android)", active: true },
    { id: "ex2", label: "Custom E-Commerce checkout & Stripe merchant gateway setup", active: true },
    { id: "ex3", label: "Custom Brand Logo design and typography creation", active: true },
    { id: "ex4", label: "Copywriting, blog content drafting, or video editing", active: true },
    { id: "ex5", label: "Search Engine Optimization (SEO) backlink / marketing campaigns", active: true },
    { id: "ex6", label: "Ongoing monthly hosting fees, domain renewals, or third-party API subscription costs", active: true },
    { id: "ex7", label: "Post-launch maintenance beyond the included 14-day warranty period", active: true },
  ]);

  const [customExclusion, setCustomExclusion] = useState("");

  // Assumptions State
  const [assumptions, setAssumptions] = useState([
    { id: "as-1", text: "The client will provide final written copy within 3 business days of kickoff.", active: true },
    { id: "as-2", text: "The client will provide logo vector files (SVG/PNG) and brand assets.", active: true },
    { id: "as-3", text: "Production hosting and domain DNS credentials will be provided 5 days prior to launch.", active: true },
    { id: "as-4", text: "Third-party services & APIs (Stripe, hosting, email provider) are paid directly by client.", active: true },
  ]);

  // Definition of Done (Acceptance Criteria) State
  const [definitionOfDone, setDefinitionOfDone] = useState([
    { id: "dod-1", text: "Responsive layout tested across Desktop (1440px), Tablet (768px), and Mobile (375px).", active: true },
    { id: "dod-2", text: "Cross-browser compatibility verified on latest Chrome, Safari, Firefox, and Edge.", active: true },
    { id: "dod-3", text: "All interactive navigation links and form submissions validated with error handling.", active: true },
    { id: "dod-4", text: "Client-supplied copy and brand assets properly formatted and rendered.", active: true },
    { id: "dod-5", text: "Staging deployment delivered for client milestone review and written sign-off.", active: true },
  ]);

  // Revisions & Client Responsibilities
  const [revisionsClause, setRevisionsClause] = useState(
    "This agreement includes up to 2 rounds of consolidated revisions per deliverable. A revision round consists of reasonable adjustments to agreed deliverables. New features or layout redesigns will be handled via the formal Change Request process."
  );

  const toggleAssumption = (id: string) => {
    setAssumptions(assumptions.map((a) => (a.id === id ? { ...a, active: !a.active } : a)));
  };

  const toggleDod = (id: string) => {
    setDefinitionOfDone(definitionOfDone.map((d) => (d.id === id ? { ...d, active: !d.active } : d)));
  };

  const addDeliverable = () => {
    const nextNum = deliverables.length + 1;
    setDeliverables([
      ...deliverables,
      {
        id: `del-${Date.now()}`,
        itemNumber: nextNum,
        name: `Deliverable #${nextNum}`,
        description: "Description of specifications, technical stack, and acceptance criteria.",
        estimatedDays: "3-5 days",
      },
    ]);
  };

  const removeDeliverable = (id: string) => {
    setDeliverables(deliverables.filter((d) => d.id !== id));
  };

  const updateDeliverable = (id: string, field: keyof SOWDeliverable, value: any) => {
    setDeliverables(
      deliverables.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );
  };

  const toggleExclusion = (id: string) => {
    setExclusions(
      exclusions.map((e) => (e.id === id ? { ...e, active: !e.active } : e))
    );
  };

  const addCustomExclusion = () => {
    if (!customExclusion.trim()) return;
    setExclusions([
      ...exclusions,
      { id: `ex-${Date.now()}`, label: customExclusion.trim(), active: true },
    ]);
    setCustomExclusion("");
  };

  const generateSowText = () => {
    return `===============================================================
FREELANCE SCOPE OF WORK (SOW) & PROJECT PROTECTION AGREEMENT
===============================================================

1. PROJECT INFORMATION
• Project Name: ${projectName}
• Client: ${clientName}
• Freelancer: ${freelancerName}
• Project Start Date: ${startDate}
• Target Completion Date: ${targetCompletion}

2. PROJECT OBJECTIVE
${projectObjective}

3. INCLUDED DELIVERABLES
${deliverables
  .map(
    (d, i) =>
      `#${i + 1} - ${d.name} (${d.estimatedDays})\n   Details: ${d.description}`
  )
  .join("\n\n")}

4. ❌ EXPLICITLY NOT INCLUDED (OUT OF SCOPE)
To eliminate ambiguity, the following items are strictly excluded from this agreement. Any request for these items will require a separate Change Request with additional budget and timeline:
${exclusions
  .filter((e) => e.active)
  .map((e) => `• [NOT INCLUDED] ${e.label}`)
  .join("\n")}

5. 📌 KEY ASSUMPTIONS & DEPENDENCIES
This agreement and delivery estimate rely on the following explicit assumptions:
${assumptions
  .filter((a) => a.active)
  .map((a) => `• ${a.text}`)
  .join("\n")}

6. ✅ DEFINITION OF DONE (ACCEPTANCE CRITERIA)
A deliverable or milestone is formally considered completed and ready for invoice sign-off when:
${definitionOfDone
  .filter((d) => d.active)
  .map((d) => `• [DONE] ${d.text}`)
  .join("\n")}

7. INCLUDED REVISIONS POLICY
${revisionsClause}

8. CLIENT RESPONSIBILITIES & TIMELINE DEPENDENCIES
The client agrees to provide:
• High-resolution brand assets, logo files, and style guides
• Final approved text copywriting and media assets for all screens
• Necessary hosting, domain registrar, and third-party API credentials
• Consolidated written feedback/sign-offs within 48 business hours of milestone delivery

*Note: Delays in client materials or feedback will shift the target completion date accordingly.*

9. SIGNATURES & AUTHORIZATION
By signing below, both parties confirm and authorize the Scope of Work as detailed above:

Client Representative: _______________________ Date: _________
Freelancer: _______________________________ Date: _________
`;
  };

  const handleExportSow = () => {
    exportTextFile(
      `Scope-of-Work-${projectName.replace(/\s+/g, "-")}.txt`,
      generateSowText()
    );
  };

  const handleCopySow = () => {
    navigator.clipboard.writeText(generateSowText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 mb-2">
            <FileCheck2 className="h-3.5 w-3.5" />
            <span>Step 02 — Lock Down the Scope</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Scope of Work (SOW) & Exclusions Matrix
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Build a specialized, non-generic Scope of Work with clear deliverables, explicit exclusions, and revision caps.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopySow}
            className="flex items-center space-x-1.5 rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-colors shadow"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copied!" : "Copy Full SOW"}</span>
          </button>
          <button
            onClick={handleExportSow}
            className="flex items-center space-x-1.5 rounded-lg bg-emerald-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export SOW (.TXT / DOCX)</span>
          </button>
        </div>
      </div>

      {/* SOW Builder Form */}
      <div className="space-y-6">
        {/* Section 1: Project Information */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 shadow-lg">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-400 font-bold text-xs">
              1
            </span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Project Information & Parties
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Project Name</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-medium mb-1">Client Name & Company</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-medium mb-1">Freelancer / Agency</label>
              <input
                type="text"
                value={freelancerName}
                onChange={(e) => setFreelancerName(e.target.value)}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-medium mb-1">Target Completion</label>
                <input
                  type="date"
                  value={targetCompletion}
                  onChange={(e) => setTargetCompletion(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1 text-xs">
              Project Objective & Success Metric
            </label>
            <textarea
              rows={2}
              value={projectObjective}
              onChange={(e) => setProjectObjective(e.target.value)}
              className="w-full rounded-lg bg-slate-950 border border-slate-800 p-3 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Section 2: Included Deliverables */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-400 font-bold text-xs">
                2
              </span>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Included Deliverables Table ({deliverables.length})
              </h3>
            </div>
            <button
              onClick={addDeliverable}
              className="flex items-center space-x-1 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 px-2.5 py-1 text-xs font-semibold transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Deliverable</span>
            </button>
          </div>

          <div className="space-y-3">
            {deliverables.map((d, index) => (
              <div
                key={d.id}
                className="rounded-lg border border-slate-800 bg-slate-950 p-4 space-y-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center space-x-2 flex-1">
                    <span className="text-xs font-bold text-emerald-400">#{index + 1}</span>
                    <input
                      type="text"
                      value={d.name}
                      onChange={(e) => updateDeliverable(d.id, "name", e.target.value)}
                      placeholder="Deliverable Title (e.g. Responsive Landing Page)"
                      className="w-full rounded bg-slate-900 border border-slate-800 px-2.5 py-1.5 text-xs font-semibold text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <input
                    type="text"
                    value={d.estimatedDays}
                    onChange={(e) => updateDeliverable(d.id, "estimatedDays", e.target.value)}
                    placeholder="Est. Time"
                    className="w-32 rounded bg-slate-900 border border-slate-800 px-2.5 py-1.5 text-xs text-slate-300 focus:border-emerald-500 focus:outline-none text-right"
                  />

                  <button
                    onClick={() => removeDeliverable(d.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                    title="Remove Deliverable"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <textarea
                  rows={2}
                  value={d.description}
                  onChange={(e) => updateDeliverable(d.id, "description", e.target.value)}
                  placeholder="Detailed specifications, technical stack, responsive requirements, and acceptance criteria..."
                  className="w-full rounded bg-slate-900 border border-slate-800 p-2.5 text-xs text-slate-300 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: The Critical EXCLUSIONS Matrix (NOT INCLUDED) */}
        <div className="rounded-xl border border-amber-900/50 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-500/20 text-amber-400 font-bold text-xs">
                3
              </span>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                  <span>❌ Explicitly Not Included (Exclusions Matrix)</span>
                  <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] text-amber-300 font-bold">
                    CRITICAL PROTECTION
                  </span>
                </h3>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            This is the single most valuable section in your SOW. Stating what is <strong>NOT</strong> included
            eliminates 90% of client assumptions regarding free mobile apps, copywriting, or endless revisions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {exclusions.map((item) => (
              <label
                key={item.id}
                className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors text-xs ${
                  item.active
                    ? "bg-slate-950 border-amber-500/40 text-amber-200 font-medium"
                    : "bg-slate-950/40 border-slate-800 text-slate-500 line-through"
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.active}
                  onChange={() => toggleExclusion(item.id)}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-500 accent-amber-500"
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>

          {/* Add custom exclusion */}
          <div className="flex items-center space-x-2 pt-2">
            <input
              type="text"
              value={customExclusion}
              onChange={(e) => setCustomExclusion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCustomExclusion()}
              placeholder="Add custom exclusion (e.g. Multi-language translation, Data migration)..."
              className="flex-1 rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
            />
            <button
              onClick={addCustomExclusion}
              className="rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors"
            >
              + Add Exclusion
            </button>
          </div>
        </div>

        {/* Section 4: Assumptions & Definition of Done */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Assumptions */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-3 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-400 font-bold text-xs">
                  4
                </span>
                <h3 className="text-sm font-bold text-white">Key Assumptions & Dependencies</h3>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              State what you are assuming will happen so changes in conditions justify scope/timeline changes.
            </p>
            <div className="space-y-2">
              {assumptions.map((a) => (
                <label
                  key={a.id}
                  className={`flex items-start space-x-2.5 p-2.5 rounded-lg border cursor-pointer text-xs transition-colors ${
                    a.active
                      ? "bg-slate-950 border-emerald-800/40 text-slate-200"
                      : "bg-slate-950/40 border-slate-800 text-slate-500 line-through"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={a.active}
                    onChange={() => toggleAssumption(a.id)}
                    className="mt-0.5 h-3.5 w-3.5 rounded border-slate-700 bg-slate-900 text-emerald-500 accent-emerald-500"
                  />
                  <span>{a.text}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Definition of Done */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-3 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-400 font-bold text-xs">
                  5
                </span>
                <h3 className="text-sm font-bold text-white">✅ Definition of Done (DoD)</h3>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              Precise acceptance criteria so both parties know when a milestone is objectively complete.
            </p>
            <div className="space-y-2">
              {definitionOfDone.map((d) => (
                <label
                  key={d.id}
                  className={`flex items-start space-x-2.5 p-2.5 rounded-lg border cursor-pointer text-xs transition-colors ${
                    d.active
                      ? "bg-slate-950 border-emerald-800/40 text-slate-200"
                      : "bg-slate-950/40 border-slate-800 text-slate-500 line-through"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={d.active}
                    onChange={() => toggleDod(d.id)}
                    className="mt-0.5 h-3.5 w-3.5 rounded border-slate-700 bg-slate-900 text-emerald-500 accent-emerald-500"
                  />
                  <span>{d.text}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Section 6 & 7: Revisions & Client Responsibilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-3">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-400 font-bold text-xs">
                6
              </span>
              <h3 className="text-sm font-bold text-white">Included Revisions Clause (2 Rounds)</h3>
            </div>
            <textarea
              rows={4}
              value={revisionsClause}
              onChange={(e) => setRevisionsClause(e.target.value)}
              className="w-full rounded-lg bg-slate-950 border border-slate-800 p-3 text-xs text-slate-300 leading-relaxed focus:border-emerald-500 focus:outline-none"
            />
            <p className="text-[11px] text-slate-400">
              💡 Clearly distinguishing between an "included revision round" and a "new change request" prevents unpaid feature creep.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-3">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-400 font-bold text-xs">
                7
              </span>
              <h3 className="text-sm font-bold text-white">Client Responsibilities</h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center space-x-2 bg-slate-950 p-2 rounded border border-slate-800">
                <CheckSquare className="h-3.5 w-3.5 text-emerald-400" />
                <span>Client provides brand logos, style guide, and imagery</span>
              </li>
              <li className="flex items-center space-x-2 bg-slate-950 p-2 rounded border border-slate-800">
                <CheckSquare className="h-3.5 w-3.5 text-emerald-400" />
                <span>Client provides final written copywriting for all pages</span>
              </li>
              <li className="flex items-center space-x-2 bg-slate-950 p-2 rounded border border-slate-800">
                <CheckSquare className="h-3.5 w-3.5 text-emerald-400" />
                <span>Client provides server/API credentials securely</span>
              </li>
              <li className="flex items-center space-x-2 bg-slate-950 p-2 rounded border border-slate-800">
                <CheckSquare className="h-3.5 w-3.5 text-emerald-400" />
                <span>Client guarantees written milestone sign-off within 48 hours</span>
              </li>
            </ul>
            <p className="text-[11px] text-amber-300/90 italic">
              *Delays caused by missing client materials will adjust the project deadline accordingly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
