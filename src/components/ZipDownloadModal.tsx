import React from "react";
import { downloadZipPackage } from "../utils/exportUtils";
import {
  X,
  Download,
  Folder,
  FileText,
  FileSpreadsheet,
  CheckCircle2,
  ShieldCheck,
  Package,
} from "lucide-react";

interface ZipDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ZipDownloadModal: React.FC<ZipDownloadModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const folderStructure = [
    {
      name: "00_START_HERE",
      files: ["Start-Here.pdf"],
    },
    {
      name: "01_CLIENT_SCREENING",
      files: [
        "Client-Screening-Checklist.pdf",
        "Client-Screening-Template.docx",
      ],
    },
    {
      name: "02_SCOPE_PROTECTION",
      files: [
        "Scope-of-Work.docx",
        "Scope-Exclusions.docx",
        "Assumptions.docx",
        "Definition-of-Done.docx",
      ],
    },
    {
      name: "03_PAYMENT",
      files: ["Payment-Planner.xlsx", "Payment-Checklist.pdf"],
    },
    {
      name: "04_PROJECT_MANAGEMENT",
      files: [
        "Kickoff-Checklist.pdf",
        "Decision-Log.xlsx",
        "Delay-Tracker.xlsx",
      ],
    },
    {
      name: "05_SCOPE_CREEP",
      files: ["Change-Request.docx", "Scope-Change-Checklist.pdf"],
    },
    {
      name: "06_CLIENT_COMMUNICATION",
      files: ["30-Client-Scripts.pdf"],
    },
    {
      name: "07_HANDOVER",
      files: ["Final-Handover-Checklist.pdf"],
    },
    {
      name: "08_AI_TOOLS",
      files: ["FreelanceShield-AI-Prompt-Pack.pdf"],
    },
    {
      name: "09_SCORECARD",
      files: ["100-Point-Protection-Audit.xlsx"],
    },
    {
      name: "10_BONUSES",
      files: ["Complete-Project-Example.pdf"],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030611]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl border border-emerald-500/30 bg-[#080d1a] shadow-[0_0_50px_rgba(16,185,129,0.15)] overflow-hidden backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-emerald-500/20 p-5 sm:p-6 bg-gradient-to-r from-emerald-500/10 via-[#0a1020] to-[#080d1a]">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-yellow-500/20 text-emerald-400 border border-emerald-400/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Package className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white tracking-tight">
                Download FreelanceShield Protection Package (.ZIP)
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Complete structured kit with 8 organized folders & templates
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-800/80 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Directory Explorer View */}
        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-4 text-xs">
          <div className="rounded-lg bg-slate-950 border border-slate-800 p-4 space-y-3 font-mono">
            <div className="text-emerald-400 font-bold flex items-center space-x-2">
              <Folder className="h-4 w-4" />
              <span>FreelanceShield-Protection-Kit/</span>
            </div>

            <div className="space-y-2.5 pl-4 border-l border-slate-800">
              {folderStructure.map((folder) => (
                <div key={folder.name} className="space-y-1">
                  <div className="text-slate-300 font-semibold flex items-center space-x-1.5">
                    <Folder className="h-3.5 w-3.5 text-emerald-500/70" />
                    <span>{folder.name}/</span>
                  </div>

                  <div className="pl-4 space-y-1 text-slate-400">
                    {folder.files.map((file) => (
                      <div key={file} className="flex items-center space-x-1.5">
                        {file.endsWith(".csv") ? (
                          <FileSpreadsheet className="h-3 w-3 text-emerald-400/80" />
                        ) : (
                          <FileText className="h-3 w-3 text-slate-500" />
                        )}
                        <span>{file}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-800 p-4 bg-slate-950/80">
          <span className="text-xs text-slate-400">
            Instant client-side ZIP generation
          </span>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                downloadZipPackage();
                onClose();
              }}
              className="flex items-center space-x-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-md shadow-emerald-500/20"
            >
              <Download className="h-4 w-4 stroke-[2.5]" />
              <span>Download .ZIP Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
