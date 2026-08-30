import React, { useState } from "react";
import { MainNavTab, ProjectItem, ClientItem } from "./types";
import { INITIAL_PROJECTS, INITIAL_CLIENTS } from "./data/projectData";
import { Navbar } from "./components/Navbar";
import { ProjectsHomeView } from "./components/ProjectsHomeView";
import { ProjectHubView } from "./components/ProjectHubView";
import { ClientsView } from "./components/ClientsView";
import { ProtectionCheckView } from "./components/ProtectionCheckView";
import { TemplatesPlaybooksView } from "./components/TemplatesPlaybooksView";
import { ActivityTimelineView } from "./components/ActivityTimelineView";
import { LegalDisclaimerView } from "./components/LegalDisclaimerView";
import { NewProjectWizardModal } from "./components/NewProjectWizardModal";
import { ZipDownloadModal } from "./components/ZipDownloadModal";

export default function App() {
  const [activeTab, setActiveTab] = useState<MainNavTab>("projects");
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [clients, setClients] = useState<ClientItem[]>(INITIAL_CLIENTS);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isZipModalOpen, setIsZipModalOpen] = useState(false);

  // Selected project resolver
  const selectedProject = projects.find((p) => p.id === selectedProjectId) || null;

  const handleSelectProject = (id: string) => {
    setSelectedProjectId(id);
    setActiveTab("projects");
  };

  const handleUpdateProject = (updated: ProjectItem) => {
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleSaveNewProject = (newProj: ProjectItem) => {
    setProjects([newProj, ...projects]);
    setSelectedProjectId(newProj.id);
    setActiveTab("projects");
  };

  const attentionCount = projects.filter((p) => p.status === "requires_attention").length;

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans selection:bg-emerald-400 selection:text-slate-950 flex flex-col justify-between relative overflow-hidden">
      {/* Ambient background glow effects (Green & Yellow) */}
      <div className="pointer-events-none fixed -top-40 left-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px] -z-10" />
      <div className="pointer-events-none fixed top-1/3 -right-20 h-96 w-96 rounded-full bg-yellow-500/10 blur-[140px] -z-10" />
      <div className="pointer-events-none fixed bottom-10 left-10 h-80 w-80 rounded-full bg-lime-500/10 blur-[130px] -z-10" />

      {/* Top Application Header */}
      <div>
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (tab !== "projects") {
              setSelectedProjectId(null);
            }
          }}
          onOpenZipModal={() => setIsZipModalOpen(true)}
          onOpenNewProjectWizard={() => setIsWizardOpen(true)}
          attentionCount={attentionCount}
        />

        {/* Main Workspace Container */}
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 relative z-10">
          {/* TAB 1: PROJECTS (Home or Single Project Detail Hub) */}
          {activeTab === "projects" && (
            <>
              {selectedProject ? (
                <ProjectHubView
                  project={selectedProject}
                  onBack={() => setSelectedProjectId(null)}
                  onUpdateProject={handleUpdateProject}
                />
              ) : (
                <ProjectsHomeView
                  projects={projects}
                  onSelectProject={handleSelectProject}
                  onOpenNewProjectWizard={() => setIsWizardOpen(true)}
                />
              )}
            </>
          )}

          {/* TAB 2: CLIENTS */}
          {activeTab === "clients" && (
            <ClientsView clients={clients} />
          )}

          {/* TAB 3: PROTECTION CHECK (100-PT AUDIT) */}
          {activeTab === "protection_check" && (
            <ProtectionCheckView />
          )}

          {/* TAB 4: TEMPLATES & PLAYBOOKS */}
          {activeTab === "templates" && (
            <TemplatesPlaybooksView onOpenZipModal={() => setIsZipModalOpen(true)} />
          )}

          {/* TAB 5: GLOBAL ACTIVITY TIMELINE */}
          {activeTab === "activity" && (
            <ActivityTimelineView
              projects={projects}
              onSelectProject={handleSelectProject}
            />
          )}

          {/* TAB 6: LEGAL DISCLAIMER */}
          {activeTab === "disclaimer" && (
            <LegalDisclaimerView onNavigate={() => setActiveTab("projects")} />
          )}
        </main>
      </div>

      {/* Clean, Non-distracting Footer */}
      <footer className="border-t border-slate-800/80 bg-[#050811]/90 backdrop-blur-md py-6 px-4 text-xs text-slate-500 relative z-10">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-200 flex items-center space-x-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Freelance</span>
              <span className="text-yellow-400">Shield</span>
            </span>
            <span>•</span>
            <span className="text-slate-400">Project Protection System</span>
            <span>•</span>
            <button
              onClick={() => {
                setSelectedProjectId(null);
                setActiveTab("disclaimer");
              }}
              className="text-slate-400 hover:text-emerald-400 underline transition-colors"
            >
              Legal Terms & Scope of Use
            </button>
          </div>

          <div className="text-slate-400 font-mono text-[11px] flex items-center space-x-2">
            <span className="text-emerald-400 font-semibold">● SOW Protected</span>
            <span>•</span>
            <span className="text-yellow-400 font-semibold">● 50/30/20 Gated</span>
          </div>
        </div>
      </footer>

      {/* 5-Step New Project Protection Wizard */}
      <NewProjectWizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onSaveProject={handleSaveNewProject}
      />

      {/* Protection Kit Zip Export Modal */}
      <ZipDownloadModal
        isOpen={isZipModalOpen}
        onClose={() => setIsZipModalOpen(false)}
      />
    </div>
  );
}
