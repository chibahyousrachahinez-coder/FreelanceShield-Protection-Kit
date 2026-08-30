import React, { useState } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
  DollarSign,
  Layers,
  ChevronRight,
  Sparkle,
} from "lucide-react";
import { ProjectItem } from "../types";
import { ProtectionScoreModal } from "./ProtectionScoreModal";

interface ProjectsHomeViewProps {
  projects: ProjectItem[];
  onSelectProject: (projectId: string) => void;
  onOpenNewProjectWizard: () => void;
}

export const ProjectsHomeView: React.FC<ProjectsHomeViewProps> = ({
  projects,
  onSelectProject,
  onOpenNewProjectWizard,
}) => {
  const [selectedScoreProject, setSelectedScoreProject] = useState<ProjectItem | null>(null);

  const activeProjects = projects.filter((p) => p.status !== "completed" && p.status !== "archived");
  const attentionProjects = projects.filter((p) => p.status === "requires_attention");
  const onTrackProjects = projects.filter((p) => p.status === "on_track");
  const completedProjects = projects.filter((p) => p.status === "completed" || p.status === "archived");

  const totalContractedValue = projects.reduce((acc, p) => acc + p.value, 0);
  const totalUnprotectedScope = projects.reduce((acc, p) => acc + p.unprotectedScopeAmount, 0);

  return (
    <div className="space-y-8">
      {/* Top Action-Oriented Header with AI SaaS Vibe */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-emerald-500/20 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/10 to-yellow-500/10 border border-emerald-400/30 text-emerald-300 text-[11px] font-semibold mb-2 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <Sparkle className="h-3 w-3 text-yellow-400 animate-spin" />
            <span className="font-mono uppercase tracking-wider text-[10px]">INTELLIGENT WORKFLOW DEFENSE</span>
          </div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Project <span className="bg-gradient-to-r from-emerald-400 via-lime-300 to-yellow-300 bg-clip-text text-transparent">Protection Hub</span>
            </h1>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {attentionProjects.length > 0
              ? `${activeProjects.length} active projects • ${attentionProjects.length} requires immediate scope defense`
              : "All active projects are fully gated with cleared deposits and verified SOWs."}
          </p>
        </div>

        <button
          onClick={onOpenNewProjectWizard}
          className="group relative flex items-center space-x-2 rounded-xl bg-gradient-to-r from-emerald-400 via-lime-400 to-yellow-400 text-slate-950 px-5 py-3 text-xs font-extrabold transition-all shadow-[0_0_25px_rgba(52,211,153,0.35)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="h-4 w-4 stroke-[3]" />
          <span>New Protected Project</span>
        </button>
      </div>

      {/* High-Level Overview Metrics - Glowing Cyber Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-[#0e1628]/90 to-[#070c18]/90 p-5 space-y-1.5 backdrop-blur-xl shadow-lg hover:border-emerald-400/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">Active Projects</span>
            <div className="h-7 w-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Layers className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white group-hover:text-emerald-300 transition-colors font-mono">{activeProjects.length}</div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center space-x-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            <span>Under signed contract</span>
          </div>
        </div>

        <div className="relative rounded-2xl border border-yellow-500/30 bg-gradient-to-b from-yellow-500/10 via-[#0e1628]/90 to-[#070c18]/90 p-5 space-y-1.5 backdrop-blur-xl shadow-lg hover:border-yellow-400/50 transition-all group shadow-[0_0_20px_rgba(234,179,8,0.1)]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-yellow-400 uppercase tracking-wider font-mono">Requires Action</span>
            <div className="h-7 w-7 rounded-lg bg-yellow-500/15 border border-yellow-400/40 flex items-center justify-center text-yellow-400">
              <AlertTriangle className="h-3.5 w-3.5 animate-pulse" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-yellow-300 font-mono">{attentionProjects.length}</div>
          <div className="text-[11px] text-yellow-400 font-semibold">Scope change / action pending</div>
        </div>

        <div className="relative rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-[#0e1628]/90 to-[#070c18]/90 p-5 space-y-1.5 backdrop-blur-xl shadow-lg hover:border-emerald-400/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">Contracted Value</span>
            <div className="h-7 w-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <DollarSign className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">${totalContractedValue.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-400/90 font-medium">Deposits received & verified</div>
        </div>

        <div className="relative rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-[#0e1628]/90 to-[#070c18]/90 p-5 space-y-1.5 backdrop-blur-xl shadow-lg hover:border-emerald-400/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">Unprotected Scope</span>
            <div className="h-7 w-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">${totalUnprotectedScope}</div>
          <div className="text-[11px] text-slate-400 font-mono">0 unbilled hours worked</div>
        </div>
      </div>

      {/* SECTION 1: REQUIRES ATTENTION */}
      {attentionProjects.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-yellow-400 font-mono">
            <AlertTriangle className="h-4 w-4" />
            <span>Active Attention Items ({attentionProjects.length})</span>
          </div>

          <div className="space-y-4">
            {attentionProjects.map((project) => (
              <div
                key={project.id}
                className="relative rounded-2xl border border-yellow-500/40 bg-gradient-to-r from-yellow-500/10 via-[#0d1424] to-[#080d18] p-6 space-y-4 shadow-[0_0_30px_rgba(234,179,8,0.1)] backdrop-blur-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800/80 pb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-bold text-white tracking-tight">{project.name}</h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-yellow-400/15 text-yellow-300 border border-yellow-400/40 shadow-[0_0_8px_rgba(250,204,21,0.2)]">
                        ⚡ Scope Change Alert
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 font-mono">
                      Client: <span className="text-slate-200">{project.clientName}</span> • Value: <span className="text-emerald-400 font-semibold">${project.value.toLocaleString()}</span> • Target: <span className="text-slate-300">{project.targetDeadline}</span>
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedScoreProject(project);
                    }}
                    className="flex items-center space-x-2 text-xs text-slate-300 bg-[#0a0f1d] hover:bg-[#111a30] border border-emerald-500/30 hover:border-yellow-400/60 transition-all px-3.5 py-2 rounded-xl cursor-pointer shadow-sm group"
                    title="Click to view full score breakdown and improvement steps"
                  >
                    <ShieldCheck className="h-4 w-4 text-emerald-400 group-hover:text-yellow-400 transition-colors" />
                    <span>Protection: <strong className="text-emerald-400 font-mono">{project.protectionScore}/100</strong></span>
                  </button>
                </div>

                {project.actionRequired && (
                  <div className="space-y-3">
                    <div className="text-xs text-slate-200">
                      <strong className="text-yellow-400 font-mono text-[11px] uppercase tracking-wider block mb-1">What happened:</strong>
                      <p className="text-slate-300 leading-relaxed bg-[#050811]/80 p-3.5 rounded-xl border border-yellow-500/20 font-sans">
                        {project.actionRequired.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="bg-[#050811]/60 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block text-[11px] font-mono">Estimated Impact:</span>
                        <strong className="text-emerald-300 font-mono">{project.actionRequired.estimatedWork}</strong>
                      </div>
                      <div className="bg-[#050811]/60 p-3 rounded-xl border border-yellow-500/20">
                        <span className="text-yellow-400/80 block text-[11px] font-mono">Recommended Action:</span>
                        <strong className="text-yellow-300">{project.actionRequired.recommendedAction}</strong>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    onClick={() => onSelectProject(project.id)}
                    className="flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:brightness-110 text-slate-950 px-5 py-2.5 text-xs font-extrabold transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)]"
                  >
                    <span>Open Project & Resolve</span>
                    <ChevronRight className="h-4 w-4 stroke-[3]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: ON TRACK PROJECTS */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>Active & On Track ({onTrackProjects.length})</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {onTrackProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className="relative rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-[#0c1424]/90 to-[#070b16]/90 hover:border-emerald-400/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all p-5 space-y-4 cursor-pointer group backdrop-blur-xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">{project.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{project.clientName}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedScoreProject(project);
                  }}
                  className="flex items-center space-x-1.5 bg-[#050811] hover:bg-slate-900 border border-emerald-500/30 hover:border-yellow-400/50 transition-colors px-2.5 py-1 rounded-lg text-xs"
                  title="Click to view score breakdown"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="font-bold text-emerald-400 font-mono">{project.protectionScore}/100</span>
                </button>
              </div>

              {project.actionRequired ? (
                <div className="rounded-xl bg-[#050811]/90 p-3 border border-slate-800 text-xs space-y-1">
                  <div className="text-slate-400 text-[11px] font-mono">Current Status:</div>
                  <div className="text-slate-200">{project.actionRequired.title}</div>
                </div>
              ) : (
                <div className="rounded-xl bg-[#050811]/90 p-3 border border-emerald-500/15 text-xs text-slate-300 flex items-center justify-between font-mono">
                  <span>Phase: <strong className="text-emerald-300">{project.currentPhase}</strong></span>
                  <span className="text-yellow-400 text-[11px]">Deposit OK</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
                <span>Value: <strong className="text-white font-mono">${project.value.toLocaleString()}</strong></span>
                <span className="flex items-center space-x-1 text-emerald-400 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all font-semibold">
                  <span>View Project Hub</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: COMPLETED & ARCHIVED */}
      {completedProjects.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <span>Completed & Closed ({completedProjects.length})</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {completedProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project.id)}
                className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 space-y-2 cursor-pointer hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300">{project.name}</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Archived</span>
                </div>
                <div className="text-xs text-slate-500">{project.clientName}</div>
                <div className="text-xs text-emerald-400/90 font-mono">${project.value.toLocaleString()} Paid in Full</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Protection Score Modal */}
      <ProtectionScoreModal
        isOpen={!!selectedScoreProject}
        onClose={() => setSelectedScoreProject(null)}
        project={selectedScoreProject}
        onFixIssues={() => {
          if (selectedScoreProject) {
            onSelectProject(selectedScoreProject.id);
          }
        }}
      />
    </div>
  );
};
