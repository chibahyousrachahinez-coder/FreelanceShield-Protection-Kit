import React from "react";
import {
  ShieldCheck,
  FolderKanban,
  Users,
  CheckSquare,
  FileText,
  Activity,
  Download,
  Plus,
} from "lucide-react";
import { MainNavTab } from "../types";

interface NavbarProps {
  activeTab: MainNavTab;
  setActiveTab: (tab: MainNavTab) => void;
  onOpenZipModal: () => void;
  onOpenNewProjectWizard?: () => void;
  attentionCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenZipModal,
  onOpenNewProjectWizard,
  attentionCount = 0,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-emerald-500/15 bg-[#070b16]/90 backdrop-blur-xl shadow-lg shadow-black/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Product Identity */}
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setActiveTab("projects")}
              className="flex items-center space-x-3 text-left group"
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-yellow-500/20 border border-emerald-400/40 text-emerald-400 group-hover:border-yellow-400/60 group-hover:scale-105 transition-all shadow-[0_0_15px_rgba(16,185,129,0.25)]">
                <ShieldCheck className="h-5 w-5 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-yellow-400 ring-2 ring-[#070b16] animate-pulse" />
              </div>
              <div>
                <span className="text-base font-extrabold tracking-tight text-white flex items-center space-x-1">
                  <span>Freelance</span>
                  <span className="bg-gradient-to-r from-emerald-400 via-lime-300 to-yellow-400 bg-clip-text text-transparent">
                    Shield
                  </span>
                </span>
                <span className="text-[10px] text-emerald-400/80 font-mono block -mt-0.5 tracking-wider uppercase">
                  ● System Active
                </span>
              </div>
            </button>

            {/* Main Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              {[
                { id: "projects" as MainNavTab, label: "Projects", icon: FolderKanban, badge: attentionCount || undefined },
                { id: "clients" as MainNavTab, label: "Clients", icon: Users },
                { id: "protection_check" as MainNavTab, label: "Protection Check", icon: CheckSquare },
                { id: "templates" as MainNavTab, label: "Templates & Playbooks", icon: FileText },
                { id: "activity" as MainNavTab, label: "Activity", icon: Activity },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`relative flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-emerald-500/15 to-yellow-500/10 border border-emerald-500/40 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent hover:border-slate-800"
                    }`}
                  >
                    <Icon className={`h-3.5 w-3.5 ${isActive ? "text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]" : ""}`} />
                    <span>{item.label}</span>
                    {item.badge && item.badge > 0 ? (
                      <span className="h-4 min-w-[16px] px-1 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-extrabold text-[10px] flex items-center justify-center shadow-md shadow-yellow-500/40 animate-pulse">
                        {item.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-3">
            {onOpenNewProjectWizard && (
              <button
                onClick={onOpenNewProjectWizard}
                className="group relative flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-emerald-400 via-lime-400 to-yellow-400 text-slate-950 px-4 py-2 text-xs font-extrabold transition-all shadow-[0_0_20px_rgba(52,211,153,0.35)] hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] hover:scale-[1.03] active:scale-[0.98]"
              >
                <Plus className="h-4 w-4 stroke-[3]" />
                <span className="hidden sm:inline">New Protected Project</span>
              </button>
            )}

            <button
              onClick={onOpenZipModal}
              className="flex items-center space-x-1.5 rounded-xl bg-[#0e1526] hover:bg-[#152038] border border-emerald-500/20 hover:border-yellow-400/40 text-slate-200 px-3 py-1.5 text-xs font-medium transition-all shadow-sm"
              title="Download full kit files (.ZIP)"
            >
              <Download className="h-3.5 w-3.5 text-yellow-400" />
              <span className="hidden sm:inline font-mono">Kit (.ZIP)</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center space-x-1 overflow-x-auto py-2 border-t border-slate-800/80 text-xs">
          {[
            { id: "projects" as MainNavTab, label: "Projects", icon: FolderKanban },
            { id: "clients" as MainNavTab, label: "Clients", icon: Users },
            { id: "protection_check" as MainNavTab, label: "Protection Check", icon: CheckSquare },
            { id: "templates" as MainNavTab, label: "Templates", icon: FileText },
            { id: "activity" as MainNavTab, label: "Activity", icon: Activity },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                  isActive
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
