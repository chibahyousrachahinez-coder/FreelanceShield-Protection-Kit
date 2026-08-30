import React, { useState } from "react";
import {
  Compass,
  FileCheck2,
  DollarSign,
  Layers,
  MessageSquare,
  ClipboardList,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Copy,
  Check,
  UserCheck,
  Building,
  Calendar,
} from "lucide-react";
import { ActiveTab } from "../types";

interface CaseStudyViewProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const CaseStudyView: React.FC<CaseStudyViewProps> = ({ onNavigate }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const steps = [
    {
      step: 1,
      title: "Discovery & Qualification",
      stage: "Step 1 & 2: Screening",
      summary: "Screening Apex Dental's inquiry and defining non-negotiables.",
      icon: UserCheck,
    },
    {
      step: 2,
      title: "Scope Definition & SOW",
      stage: "Step 3: Protection (SOW)",
      summary: "Drafting the 5-page SOW with clear Definition of Done.",
      icon: FileCheck2,
    },
    {
      step: 3,
      title: "Payment Milestones & Deposit",
      stage: "Step 4: Payment Structuring",
      summary: "Securing 50% upfront deposit before starting design.",
      icon: DollarSign,
    },
    {
      step: 4,
      title: "Handling Scope Creep (Patient Portal)",
      stage: "Step 5: Scope Management",
      summary: "Addressing mid-project requests with a $450 Change Request.",
      icon: Layers,
    },
    {
      step: 5,
      title: "Project Logs & Handoff Gate",
      stage: "Step 6 & 7: Records & Handoff",
      summary: "Log sign-off, receiving final payment, releasing credentials.",
      icon: ClipboardList,
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/40 p-6 md:p-8">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            <Compass className="h-3.5 w-3.5" />
            <span>End-to-End Walkthrough Example</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Real Project Example: $1,500 5-Page Website Redesign
              </h1>
              <p className="mt-1 text-sm md:text-base text-slate-300 max-w-2xl">
                See how the entire FreelanceShield system protects a real-world client project from the first email to final code handover.
              </p>
            </div>

            <div className="flex items-center space-x-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 shrink-0">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-bold text-lg">
                $1.5k
              </div>
              <div className="text-xs">
                <div className="text-slate-400">Client Case:</div>
                <div className="font-semibold text-white">Apex Dental Clinic Redesign</div>
                <div className="text-emerald-400 font-medium">+ $450 Change Request Managed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step Navigation Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {steps.map((s) => {
          const Icon = s.icon;
          const isActive = activeStep === s.step;
          return (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`p-3 rounded-xl border text-left transition-all relative ${
                isActive
                  ? "bg-emerald-950/40 border-emerald-500/50 ring-1 ring-emerald-500/30 text-white"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  isActive ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-800 text-slate-400"
                }`}>
                  Phase {s.step}
                </span>
                <Icon className={`h-4 w-4 ${isActive ? "text-emerald-400" : "text-slate-500"}`} />
              </div>
              <div className="text-xs font-semibold text-slate-200 line-clamp-1">{s.title}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{s.stage}</div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage Details */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        {/* Step 1 */}
        {activeStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <UserCheck className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Step 1 & 2 of FreelanceShield</span>
                <h2 className="text-xl font-bold text-white">Client Inquiry & Initial Screening</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                  <span>The Client's Initial Email</span>
                </h3>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono space-y-2">
                  <p className="text-slate-400">From: dr.smith@apexdental.com</p>
                  <p className="text-slate-400">Subject: Quick website update</p>
                  <p className="pt-2">"Hi! We need a modern 5-page website for our dental clinic ASAP. It should be super simple. Also maybe a patient booking integration and blog later. Can you do this in 2 weeks for $1,500? When can you start coding?"</p>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs space-y-2">
                  <div className="font-bold text-amber-300 flex items-center space-x-1.5">
                    <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
                    <span>Red Flags Detected by FreelanceShield:</span>
                  </div>
                  <ul className="list-disc list-inside text-amber-200/80 space-y-1">
                    <li><strong>"Super simple" + "maybe booking later"</strong>: Unbounded scope creep trap.</li>
                    <li><strong>"When can you start coding?"</strong>: Expectation of work before deposit or SOW.</li>
                    <li><strong>"2 weeks deadline"</strong>: No mention of client content delivery timeline.</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wide flex items-center space-x-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>The FreelanceShield Script Used</span>
                </h3>

                <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-emerald-300">Script: Initial Intake & Scope Boundary</span>
                    <button
                      onClick={() => handleCopy(
                        "Hi Dr. Smith, thank you for reaching out! A modern 5-page website is definitely achievable. To ensure we hit your 2-week target without costly delays, my standard process begins with a formal Scope of Work confirming the exact 5 pages, content deliverables, and a 50% deposit before design kickoff. Booking integrations and additional features can easily be scoped as Phase 2. I have attached our brief discovery checklist to finalize the details today.",
                        "copy-intake"
                      )}
                      className="inline-flex items-center space-x-1 text-slate-400 hover:text-emerald-300 text-[11px]"
                    >
                      {copiedId === "copy-intake" ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedId === "copy-intake" ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <p className="text-slate-300 leading-relaxed italic bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    "Hi Dr. Smith, thank you for reaching out! A modern 5-page website is definitely achievable. To ensure we hit your 2-week target without costly delays, my standard process begins with a formal Scope of Work confirming the exact 5 pages, content deliverables, and a 50% deposit before design kickoff. Booking integrations and additional features can easily be scoped as Phase 2. I have attached our brief discovery checklist to finalize the details today."
                  </p>
                  <div className="text-[11px] text-slate-400">
                    <strong>Result:</strong> Client agreed to the structured intake and filled out the 10 discovery questions.
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate("client_screening")}
                    className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                  >
                    <span>Explore 30 Red Flags & Screening Tool</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {activeStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <FileCheck2 className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Step 3 of FreelanceShield</span>
                <h2 className="text-xl font-bold text-white">Scope of Work (SOW) & Clear Exclusions</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wide">
                  What Went Into The SOW ($1,500 Total)
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="font-semibold text-white">Included Deliverables (Strict 5 Pages):</div>
                    <ul className="list-disc list-inside text-slate-300 mt-1 space-y-0.5">
                      <li>1. Home Page (Hero, intro, service highlights, reviews, map)</li>
                      <li>2. About & Staff Page (Doctor bios, clinic photos)</li>
                      <li>3. Services Overview Page (Categorized dental services)</li>
                      <li>4. Patient Information / FAQ Page</li>
                      <li>5. Contact & Booking Inquiry Form (Standard email dispatch)</li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="font-semibold text-white">Definition of Done (Per Page):</div>
                    <p className="text-slate-300 mt-1">
                      Desktop + Mobile responsive, passes Lighthouse Accessibility 90+, tested in Chrome/Safari, reviewed in up to 2 revision cycles.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wide">
                  Crucial "Explicit Exclusions" Section
                </h3>
                <div className="p-4 rounded-xl bg-slate-950 border border-rose-500/30 text-xs space-y-3">
                  <p className="text-slate-300">
                    The freelancer explicitly included this clause from the FreelanceShield SOW generator:
                  </p>
                  <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 text-rose-200/90 italic font-mono">
                    "EXCLUSIONS: The following items are specifically excluded from this agreement: Live database patient management systems, HIPAA compliance backend auditing, custom copywriting (client must provide copy by Day 3), paid plugin subscriptions, and ongoing monthly maintenance. These items can be contracted under a separate Change Order."
                  </div>
                  <div className="text-[11px] text-slate-400">
                    <strong>Why this saved the freelancer:</strong> When the client later asked for online patient medical records upload, this clause prevented a dispute.
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate("project_protection")}
                    className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                  >
                    <span>Use the Interactive SOW Builder</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {activeStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Step 4 of FreelanceShield</span>
                <h2 className="text-xl font-bold text-white">Payment Milestones & Handover Gate</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-400">Milestone 1: Kickoff</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">$750 (50%)</span>
                </div>
                <div className="text-xs text-slate-300 font-medium">Non-refundable upfront deposit</div>
                <p className="text-[11px] text-slate-400">Due before reserving dates on calendar or writing a single line of code.</p>
                <div className="text-[10px] text-emerald-400 font-semibold">✓ Paid via Stripe invoice on Day 1</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">Milestone 2: Design Approval</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono font-bold">$375 (25%)</span>
                </div>
                <div className="text-xs text-slate-300 font-medium">Upon Figma wireframe sign-off</div>
                <p className="text-[11px] text-slate-400">Client approves page structure and responsive mockup in writing.</p>
                <div className="text-[10px] text-slate-400">Paid on Day 7</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">Milestone 3: Final Launch</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono font-bold">$375 (25%)</span>
                </div>
                <div className="text-xs text-slate-300 font-medium">Staging acceptance & before DNS launch</div>
                <p className="text-[11px] text-slate-400">Gate: Live credentials and domain switch held until payment cleared.</p>
                <div className="text-[10px] text-slate-400">Paid before server transfer</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div className="font-bold text-white flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>The Golden Handover Gate Rule Enforced</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                During development, the site was hosted on the freelancer's private staging server (<code>preview.agencydemo.com/apexdental</code>). The WordPress admin credentials, domain DNS A-records, and GitHub repository access were <strong>strictly withheld until Milestone 3 payment cleared</strong>.
              </p>
            </div>
          </div>
        )}

        {/* Step 4 */}
        {activeStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Step 5 of FreelanceShield</span>
                <h2 className="text-xl font-bold text-white">Handling Mid-Project Scope Creep (+ $450 Added)</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wide">
                  The Surprise Request on Day 8
                </h3>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                  <p className="text-slate-400 italic">Dr. Smith via WhatsApp voice memo:</p>
                  <p className="text-slate-200 font-mono">
                    "Hey! Can we also add a new 'Emergency Dental Services' page with an instant SMS notification system to alert my on-call nurse when a patient fills it out? That should just be part of the website right?"
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs space-y-2">
                  <div className="font-bold text-rose-300">How an unprotected freelancer fails:</div>
                  <p className="text-rose-200/80">
                    Spends 12 unpaid hours setting up Twilio SMS webhooks, delays the launch, client complains about the deadline, freelancer earns $0 extra.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wide">
                  How FreelanceShield Handled It (Change Request #01)
                </h3>
                <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs space-y-3">
                  <div className="font-semibold text-emerald-300">Sent Change Request Form #CR-01:</div>
                  <ul className="space-y-1.5 text-slate-300">
                    <li>• Additional Deliverable: Page 6 ("Emergency Services")</li>
                    <li>• Twilio API SMS webhook integration setup</li>
                    <li>• Additional Cost: <strong>+$450.00</strong></li>
                    <li>• Timeline Adjustment: <strong>+3 business days</strong></li>
                  </ul>
                  <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 font-medium">
                    Dr. Smith signed the Change Order within 4 hours. Project budget increased from $1,500 to $1,950 cleanly!
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate("scope_creep")}
                    className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                  >
                    <span>Open Change Request Form Generator</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5 */}
        {activeStep === 5 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ClipboardList className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Step 6 & 7 of FreelanceShield</span>
                <h2 className="text-xl font-bold text-white">Project Logs, Sign-Off & Safe Handover</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
                  Project Record Log Summary
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-500">Day 1:</span> SOW & 50% deposit received. Kickoff confirmed.
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-500">Day 4:</span> Client copy delay of 2 days logged in Delay Tracker.
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-500">Day 8:</span> Change Request #01 ($450) approved by Dr. Smith.
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-500">Day 14:</span> Staging approval recorded via email confirmation.
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-500">Day 15:</span> Final payment ($825 remaining) cleared. DNS switched.
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wide">
                  Final Project Outcome
                </h3>
                <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/40 text-xs space-y-3">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Zero Disputes • 100% Payment Collected</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-slate-400">Total Billed:</div>
                      <div className="text-lg font-bold text-emerald-400">$1,950.00</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-slate-400">Disputes / Unpaid:</div>
                      <div className="text-lg font-bold text-white">$0.00</div>
                    </div>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    By using FreelanceShield, the freelancer never felt awkward asking for extra money or demanding deposits. The clear documentation gave the client high confidence and earned a 5-star review and referral.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA to Action System */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30">
        <div>
          <h3 className="font-bold text-white text-base">Ready to protect your next client project?</h3>
          <p className="text-xs text-slate-300">Start with the 7-Step Workflow or generate an SOW right now.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate("workflow")}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
          >
            Review 7-Step Workflow
          </button>
          <button
            onClick={() => onNavigate("project_protection")}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-xs font-bold text-slate-950 shadow-md shadow-emerald-500/20 transition-all"
          >
            Generate SOW Contract
          </button>
        </div>
      </div>
    </div>
  );
};
