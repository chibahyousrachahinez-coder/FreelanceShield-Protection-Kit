import React from "react";
import { ActiveTab } from "../types";
import {
  Shield,
  Download,
  Cpu,
  Award,
  BookOpen,
  UserCheck,
  FileCheck2,
  DollarSign,
  Layers,
  MessageSquare,
  ClipboardList,
  Gift,
  ShoppingBag,
  GitBranch,
  Scale,
  Compass,
} from "lucide-react";

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenZipModal: () => void;
  protectionScore?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenZipModal,
}) => {
  // Organized, scannable main navigation without horizontal overflow
  const primaryNav = [
    { id: "workflow" as ActiveTab, label: "7-Step Workflow", icon: GitBranch },
    { id: "case_study" as ActiveTab, label: "Real Example ($1.5k Web)", icon: Compass, badge: "Full Journey" },
    { id: "start_here" as ActiveTab, label: "Start Here", icon: BookOpen },
    { id: "project_protection" as ActiveTab, label: "Scope & SOW", icon: FileCheck2 },
    { id: "client_communication" as ActiveTab, label: "30 Client Scripts", icon: MessageSquare },
    { id: "project_records" as ActiveTab, label: "Records & Delays", icon: ClipboardList },
    { id: "ai_tools" as ActiveTab, label: "AI Risk Tools", icon: Cpu, badge: "Beta" },
    { id: "scorecard" as ActiveTab, label: "100-Pt Audit", icon: Award },
    { id: "bonus_resources" as ActiveTab, label: "Bonuses & Gates", icon: Gift },
    { id: "disclaimer" as ActiveTab, label: "Disclaimer", icon: Scale },
    { id: "payhip_showcase" as ActiveTab, label: "Download Edition", icon: ShoppingBag },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
      {/* Top Banner Bar */}
      <div className="border-b border-slate-800/80 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 px-4 py-2 text-xs text-slate-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-emerald-300">FreelanceShield Protection Kit</span>
            <span className="text-slate-500 font-normal text-[11px]">• Edition 2026.1 (Updated August 2026)</span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-slate-400 text-[11px]">
              Built for freelance developers, designers & digital specialists
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Reduce avoidable project risk & clarify scope before work begins
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <div
          onClick={() => setActiveTab("workflow")}
          className="flex cursor-pointer items-center space-x-3 group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 shadow-lg shadow-emerald-950/40 text-slate-950 font-black ring-1 ring-emerald-400/30 group-hover:scale-105 transition-transform">
            <Shield className="h-6 w-6 text-slate-950 fill-emerald-200" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                FreelanceShield
              </span>
              <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-300 border border-emerald-500/30">
                Protection System
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              A complete project-protection toolkit: Interactive Tools Online + Downloadable Kit (.ZIP)
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={() => setActiveTab("case_study")}
            className="hidden lg:flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors"
          >
            <Compass className="h-3.5 w-3.5 text-emerald-400" />
            <span>View $1,500 Example</span>
          </button>

          <button
            onClick={onOpenZipModal}
            className="flex items-center space-x-2 rounded-lg bg-emerald-500 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer"
          >
            <Download className="h-4 w-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Download Offline Toolkit (.ZIP)</span>
            <span className="sm:hidden">Get Offline Kit</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <nav className="border-t border-slate-800/80 bg-slate-950/95 px-4 overflow-x-auto">
        <div className="mx-auto flex max-w-7xl space-x-1 py-1.5 min-w-max">
          {primaryNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm"
                    : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`ml-1 rounded px-1.5 py-0.2 text-[9px] font-semibold ${
                      item.badge === "Beta"
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                        : "bg-emerald-950 text-emerald-300 border border-emerald-800"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
