import React from "react";
import {
  ClipboardList,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Layers,
  DollarSign,
  FileCheck2,
} from "lucide-react";
import { ProjectItem } from "../types";

interface ActivityTimelineViewProps {
  projects: ProjectItem[];
  onSelectProject: (projectId: string) => void;
}

export const ActivityTimelineView: React.FC<ActivityTimelineViewProps> = ({
  projects,
  onSelectProject,
}) => {
  // Aggregate all timeline entries across projects
  const allEvents = projects
    .flatMap((p) =>
      p.timeline.map((ev) => ({
        ...ev,
        projectName: p.name,
        projectId: p.id,
        clientName: p.clientName,
      }))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-emerald-500/20 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/10 to-yellow-500/10 border border-emerald-400/30 text-emerald-300 text-[11px] font-semibold mb-2">
            <ClipboardList className="h-3 w-3 text-emerald-400" />
            <span className="font-mono uppercase tracking-wider text-[10px]">EVIDENCE AUDIT RECORD</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Global Evidence & <span className="bg-gradient-to-r from-emerald-400 via-lime-300 to-yellow-300 bg-clip-text text-transparent">Activity Trail</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Chronological log of signed agreements, cleared deposits, client sign-offs, and Change Requests across all projects.
          </p>
        </div>
      </div>

      {/* Global Activity Timeline */}
      <div className="rounded-3xl border border-emerald-500/20 bg-[#080d1a] p-6 sm:p-7 space-y-6 shadow-[0_0_30px_rgba(16,185,129,0.06)] backdrop-blur-xl">
        <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500/50 before:via-yellow-500/40 before:to-emerald-500/20">
          {allEvents.map((event, idx) => (
            <div key={`${event.id}-${idx}`} className="relative group">
              <div
                className={`absolute -left-[27px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[#080d1a] shadow-[0_0_10px_rgba(16,185,129,0.5)] ${
                  event.type === "payment"
                    ? "bg-emerald-400"
                    : event.type === "approval"
                    ? "bg-lime-400"
                    : event.type === "warning"
                    ? "bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.6)]"
                    : event.type === "change_request"
                    ? "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]"
                    : "bg-slate-500"
                }`}
              ></div>

              <div className="rounded-2xl border border-emerald-500/15 bg-[#050811]/90 p-4 space-y-1.5 text-xs hover:border-emerald-400/40 hover:bg-[#0c1424] transition-all group-hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-sm tracking-tight">{event.title}</span>
                    <button
                      onClick={() => onSelectProject(event.projectId)}
                      className="text-[11px] text-emerald-400 hover:text-yellow-300 hover:underline font-mono font-bold transition-colors"
                    >
                      ({event.projectName})
                    </button>
                  </div>
                  <span className="text-[10px] font-mono text-yellow-400/80">{event.date}</span>
                </div>

                <p className="text-slate-300 text-xs leading-relaxed font-sans">{event.description}</p>
                <div className="text-[10px] text-slate-400 font-mono">Client: <span className="text-slate-200">{event.clientName}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
