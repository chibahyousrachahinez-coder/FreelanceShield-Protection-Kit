import React, { useState } from "react";
import { ActiveTab } from "./types";
import { Navbar } from "./components/Navbar";
import { WorkflowVisualizer } from "./components/WorkflowVisualizer";
import { CaseStudyView } from "./components/CaseStudyView";
import { LegalDisclaimerView } from "./components/LegalDisclaimerView";
import { StartHereView } from "./components/StartHereView";
import { ClientScreeningView } from "./components/ClientScreeningView";
import { ProjectProtectionView } from "./components/ProjectProtectionView";
import { PaymentProtectionView } from "./components/PaymentProtectionView";
import { ScopeCreepView } from "./components/ScopeCreepView";
import { ClientCommunicationView } from "./components/ClientCommunicationView";
import { ProjectRecordsView } from "./components/ProjectRecordsView";
import { AiToolsView } from "./components/AiToolsView";
import { ScorecardView } from "./components/ScorecardView";
import { BonusResourcesView } from "./components/BonusResourcesView";
import { PayhipShowcaseView } from "./components/PayhipShowcaseView";
import { ZipDownloadModal } from "./components/ZipDownloadModal";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("workflow");
  const [isZipModalOpen, setIsZipModalOpen] = useState(false);
  const [protectionScore, setProtectionScore] = useState<number>(85);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenZipModal={() => setIsZipModalOpen(true)}
        protectionScore={protectionScore}
      />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {activeTab === "workflow" && (
          <WorkflowVisualizer
            setActiveTab={setActiveTab}
            protectionScore={protectionScore}
          />
        )}

        {activeTab === "case_study" && (
          <CaseStudyView onNavigate={setActiveTab} />
        )}

        {activeTab === "disclaimer" && (
          <LegalDisclaimerView onNavigate={setActiveTab} />
        )}

        {activeTab === "start_here" && (
          <StartHereView
            setActiveTab={setActiveTab}
            onOpenZipModal={() => setIsZipModalOpen(true)}
          />
        )}

        {activeTab === "client_screening" && <ClientScreeningView />}

        {activeTab === "project_protection" && <ProjectProtectionView />}

        {activeTab === "payment_protection" && <PaymentProtectionView />}

        {activeTab === "scope_creep" && <ScopeCreepView />}

        {activeTab === "client_communication" && <ClientCommunicationView />}

        {activeTab === "project_records" && <ProjectRecordsView />}

        {activeTab === "ai_tools" && <AiToolsView />}

        {activeTab === "scorecard" && (
          <ScorecardView onScoreUpdate={(score) => setProtectionScore(score)} />
        )}

        {activeTab === "bonus_resources" && <BonusResourcesView />}

        {activeTab === "payhip_showcase" && (
          <PayhipShowcaseView onOpenZipModal={() => setIsZipModalOpen(true)} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-300">FreelanceShield Protection Kit</span>
            <span>•</span>
            <span>Edition 2026.1</span>
            <span>•</span>
            <button
              onClick={() => setActiveTab("disclaimer")}
              className="text-slate-400 hover:text-emerald-400 underline transition-colors"
            >
              Legal Disclaimer & Scope of Use
            </button>
          </div>

          <div className="text-slate-400">
            Before you start the work, protect the project.
          </div>
        </div>
      </footer>

      {/* Zip Download Modal */}
      <ZipDownloadModal
        isOpen={isZipModalOpen}
        onClose={() => setIsZipModalOpen(false)}
      />
    </div>
  );
}
