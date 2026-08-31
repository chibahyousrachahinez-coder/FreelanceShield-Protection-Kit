import React, { useState } from "react";
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
  Loader2,
  Sparkles,
} from "lucide-react";

interface ZipDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ZipDownloadModal: React.FC<ZipDownloadModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressStatus, setProgressStatus] = useState<string>("");

  if (!isOpen) return null;

  const folderStructure = [
    {
      name: "00_START_HERE",
      files: [{ name: "Start-Here.pdf", type: "pdf" }],
    },
    {
      name: "01_CLIENT_SCREENING",
      files: [
        { name: "Client-Screening-Checklist.pdf", type: "pdf" },
        { name: "Client-Screening-Template.docx", type: "docx" },
      ],
    },
    {
      name: "02_SCOPE_PROTECTION",
      files: [
        { name: "Scope-of-Work.docx", type: "docx" },
        { name: "Scope-Exclusions.docx", type: "docx" },
        { name: "Assumptions.docx", type: "docx" },
        { name: "Definition-of-Done.docx", type: "docx" },
      ],
    },
    {
      name: "03_PAYMENT",
      files: [
        { name: "Payment-Planner.xlsx", type: "xlsx" },
        { name: "Payment-Checklist.pdf", type: "pdf" },
      ],
    },
    {
      name: "04_PROJECT_MANAGEMENT",
      files: [
        { name: "Kickoff-Checklist.pdf", type: "pdf" },
        { name: "Decision-Log.xlsx", type: "xlsx" },
        { name: "Delay-Tracker.xlsx", type: "xlsx" },
      ],
    },
    {
      name: "05_SCOPE_CREEP",
      files: [
        { name: "Change-Request.docx", type: "docx" },
        { name: "Scope-Change-Checklist.pdf", type: "pdf" },
      ],
    },
    {
      name: "06_CLIENT_COMMUNICATION",
      files: [{ name: "30-Client-Scripts.pdf", type: "pdf" }],
    },
    {
      name: "07_HANDOVER",
      files: [{ name: "Final-Handover-Checklist.pdf", type: "pdf" }],
    },
    {
      name: "08_AI_TOOLS",
      files: [{ name: "FreelanceShield-AI-Prompt-Pack.pdf", type: "pdf" }],
    },
    {
      name: "09_SCORECARD",
      files: [{ name: "100-Point-Protection-Audit.xlsx", type: "xlsx" }],
    },
    {
      name: "10_CASE_STUDY_AND_BONUSES",
      files: [{ name: "Complete-Project-Example.pdf", type: "pdf" }],
    },
  ];

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      await downloadZipPackage((status) => {
        setProgressStatus(status);
      });
      setTimeout(() => {
        setIsGenerating(false);
        setProgressStatus("");
        onClose();
      }, 800);
    } catch (err) {
      console.error(err);
      setIsGenerating(false);
      setProgressStatus("Download error. Please try again.");
    }
  };

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
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-[10px] font-mono mb-1">
                <ShieldCheck className="h-3 w-3 text-yellow-400" />
                <span>OFFICIAL PRODUCT PACKAGE (V1.0)</span>
              </div>
              <h3 className="text-base font-extrabold text-white tracking-tight">
                FreelanceShield Protection Kit (.ZIP)
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                11 Organized Workflow Folders • Real DOCX, XLSX & PDF Formats
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isGenerating}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-800/80 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Real File Format Badges */}
        <div className="grid grid-cols-3 gap-2 px-6 py-3 bg-[#050811]/90 border-b border-emerald-500/15 text-center text-[11px] font-mono">
          <div className="flex items-center justify-center space-x-1.5 text-blue-400 bg-blue-500/10 py-1.5 px-2 rounded-lg border border-blue-500/20">
            <FileText className="h-3.5 w-3.5 text-blue-400" />
            <span className="font-bold">Real Word (.docx)</span>
          </div>
          <div className="flex items-center justify-center space-x-1.5 text-emerald-400 bg-emerald-500/10 py-1.5 px-2 rounded-lg border border-emerald-500/20">
            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-400" />
            <span className="font-bold">Real Excel (.xlsx)</span>
          </div>
          <div className="flex items-center justify-center space-x-1.5 text-rose-400 bg-rose-500/10 py-1.5 px-2 rounded-lg border border-rose-500/20">
            <FileText className="h-3.5 w-3.5 text-rose-400" />
            <span className="font-bold">Real Adobe (.pdf)</span>
          </div>
        </div>

        {/* Directory Explorer View */}
        <div className="p-5 max-h-[50vh] overflow-y-auto space-y-4 text-xs">
          <div className="rounded-xl bg-[#050811] border border-emerald-500/20 p-4 space-y-3 font-mono">
            <div className="text-emerald-400 font-bold flex items-center space-x-2">
              <Folder className="h-4 w-4 text-yellow-400" />
              <span>FreelanceShield-Protection-Kit-v1.0/</span>
            </div>

            <div className="space-y-3 pl-4 border-l border-emerald-500/20">
              {folderStructure.map((folder) => (
                <div key={folder.name} className="space-y-1.5">
                  <div className="text-slate-200 font-semibold flex items-center space-x-1.5">
                    <Folder className="h-3.5 w-3.5 text-emerald-400/80" />
                    <span>{folder.name}/</span>
                  </div>

                  <div className="pl-4 space-y-1 text-slate-400">
                    {folder.files.map((file) => (
                      <div key={file.name} className="flex items-center justify-between py-0.5">
                        <div className="flex items-center space-x-2">
                          {file.type === "xlsx" ? (
                            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-400" />
                          ) : file.type === "docx" ? (
                            <FileText className="h-3.5 w-3.5 text-blue-400" />
                          ) : (
                            <FileText className="h-3.5 w-3.5 text-rose-400" />
                          )}
                          <span className="text-slate-300 font-sans">{file.name}</span>
                        </div>
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase font-bold ${
                            file.type === "xlsx"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                              : file.type === "docx"
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                              : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                          }`}
                        >
                          {file.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-emerald-500/20 p-4 sm:p-5 bg-[#050811]/90 gap-3">
          <div className="text-xs text-slate-400 font-mono">
            {isGenerating ? (
              <span className="text-yellow-400 flex items-center space-x-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>{progressStatus || "Compiling genuine binaries..."}</span>
              </span>
            ) : (
              <span className="text-slate-400">100% Genuine File Formats (No raw markdown/csv)</span>
            )}
          </div>

          <div className="flex items-center space-x-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              disabled={isGenerating}
              className="w-1/2 sm:w-auto rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="w-1/2 sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-emerald-500 via-lime-400 to-yellow-400 px-5 py-2.5 text-xs font-extrabold text-slate-950 hover:brightness-110 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-slate-950" />
                  <span>Building Real Files...</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 stroke-[2.5] text-slate-950" />
                  <span>Download .ZIP (v1.0)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
