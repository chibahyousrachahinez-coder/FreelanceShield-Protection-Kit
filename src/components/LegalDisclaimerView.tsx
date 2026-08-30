import React from "react";
import {
  Scale,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  FileText,
  HelpCircle,
  Globe,
  Lock,
} from "lucide-react";
import { ActiveTab } from "../types";

interface LegalDisclaimerViewProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const LegalDisclaimerView: React.FC<LegalDisclaimerViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 space-y-3">
        <div className="inline-flex items-center space-x-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
          <Scale className="h-3.5 w-3.5" />
          <span>Professional Legal Disclaimer & Scope of Templates</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Legal Disclaimer & Best Practices Notice
        </h1>
        <p className="text-slate-300 text-sm">
          Please read this notice carefully regarding the contracts, agreements, scripts, and workflows provided in FreelanceShield.
        </p>
      </div>

      {/* Core Disclaimer Box */}
      <div className="rounded-2xl border border-amber-500/40 bg-amber-950/15 p-6 space-y-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h2 className="text-base font-bold text-amber-200">
              Not Formal Legal or Financial Advice
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              The templates, sample contracts, Statements of Work (SOW), Change Request forms, communication scripts, and operational guidance provided in this kit are for <strong>informational, educational, and business workflow purposes only</strong>. FreelanceShield and its authors are not a law firm, attorney, or certified financial advisor.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Pillars of Protection & Legal Compliance */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <Globe className="h-4 w-4 text-emerald-400" />
            <span>1. Jurisdiction Specificity</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Contract laws, tax regulations (such as VAT, GST, Sales Tax, 1099 classification), and statutory dispute resolution mechanisms vary significantly across different states, countries, and provinces (e.g., US, UK, EU, Canada, Australia). You should adapt these clauses to reflect the governing law of your chosen jurisdiction.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>2. Attorney Review Recommendation</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            For high-value projects (typically exceeding $10,000 USD), complex intellectual property assignments, healthcare/HIPAA compliance, or international cross-border agreements, we strongly advise having a qualified local contract attorney review your master service agreement (MSA).
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <Lock className="h-4 w-4 text-emerald-400" />
            <span>3. Limitation of Liability</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            FreelanceShield, its creators, and contributors disclaim all liability for any loss, dispute, unpaid invoice, direct or indirect damages arising from the use or inability to use the documents, checklists, or scripts contained herein.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>4. Mutual Written Sign-Off</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            A contract is only legally enforceable when both parties have clearly expressed mutual consent. Ensure all SOWs, Change Requests, and Milestones are signed by an authorized representative with date and timestamp before commencing work.
          </p>
        </div>
      </div>

      {/* Practical Tips */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
          <FileText className="h-4 w-4 text-emerald-400" />
          <span>Recommended Best Practices When Using These Templates</span>
        </h3>

        <ul className="space-y-2.5 text-xs text-slate-300">
          <li className="flex items-start space-x-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Always insert your legal entity name:</strong> Replace placeholder bracket tags like <code>[Your Business Name / LLC]</code> with your registered entity or legal name.</span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Keep a signed electronic copy:</strong> Store countersigned PDFs in your secure cloud drive (e.g., Google Drive, DocuSign, HelloSign) alongside the Project Records Log.</span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Never rely solely on verbal agreements:</strong> Whenever a client asks for a modification during a Zoom call or in-person meeting, always follow up with a written Change Request recap.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
