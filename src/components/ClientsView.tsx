import React, { useState } from "react";
import {
  Users,
  ShieldCheck,
  AlertTriangle,
  Plus,
  Mail,
  MessageSquare,
  DollarSign,
  ChevronRight,
  UserCheck,
  Building,
} from "lucide-react";
import { ClientItem } from "../types";

interface ClientsViewProps {
  clients: ClientItem[];
  onSelectClient?: (clientId: string) => void;
  onNewClient?: () => void;
}

export const ClientsView: React.FC<ClientsViewProps> = ({
  clients,
  onSelectClient,
}) => {
  const [selectedClient, setSelectedClient] = useState<ClientItem | null>(clients[0] || null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-emerald-500/20 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/10 to-yellow-500/10 border border-emerald-400/30 text-emerald-300 text-[11px] font-semibold mb-2">
            <ShieldCheck className="h-3 w-3 text-emerald-400" />
            <span className="font-mono uppercase tracking-wider text-[10px]">COUNTERPARTY INTELLIGENCE</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Clients & <span className="bg-gradient-to-r from-emerald-400 via-lime-300 to-yellow-300 bg-clip-text text-transparent">Decision Authorities</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track communication channels, payment reliability, and designated sign-off authorities.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Clients List */}
        <div className="space-y-3 lg:col-span-1">
          {clients.map((client) => {
            const isSelected = selectedClient?.id === client.id;
            return (
              <div
                key={client.id}
                onClick={() => setSelectedClient(client)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 backdrop-blur-xl ${
                  isSelected
                    ? "bg-gradient-to-r from-emerald-500/15 via-[#0e1628] to-[#080d18] border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                    : "bg-[#070b16]/80 border-slate-800/80 hover:border-emerald-500/30 hover:bg-[#0c1424]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm tracking-tight">{client.name}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      client.riskRating === "Low"
                        ? "bg-emerald-500/15 text-emerald-300 border border-emerald-400/30"
                        : client.riskRating === "Moderate"
                        ? "bg-yellow-500/15 text-yellow-300 border border-yellow-400/40"
                        : "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                    }`}
                  >
                    Risk: {client.riskRating}
                  </span>
                </div>

                <div className="text-xs text-slate-400 flex items-center space-x-1.5 font-mono">
                  <Building className="h-3 w-3 text-emerald-400/80" />
                  <span>{client.company}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/80 font-mono">
                  <span>{client.activeProjectsCount} Active Project{client.activeProjectsCount === 1 ? "" : "s"}</span>
                  <span className="text-emerald-400 font-bold">${client.totalRevenue.toLocaleString()} billed</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Client Deep-Dive Profile */}
        <div className="lg:col-span-2">
          {selectedClient ? (
            <div className="rounded-3xl border border-emerald-500/20 bg-[#080d1a] p-6 sm:p-7 space-y-6 shadow-[0_0_30px_rgba(16,185,129,0.05)] backdrop-blur-xl">
              <div className="flex items-start justify-between border-b border-emerald-500/20 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-extrabold text-white tracking-tight">{selectedClient.name}</h2>
                    <span className="text-xs text-slate-400 font-mono">({selectedClient.company})</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 flex items-center space-x-1.5 font-mono">
                    <Mail className="h-3 w-3 text-emerald-400" />
                    <span className="text-slate-300">{selectedClient.email}</span>
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Total Billed</div>
                  <div className="text-xl font-extrabold text-emerald-400 font-mono">${selectedClient.totalRevenue.toLocaleString()}</div>
                </div>
              </div>

              {/* Designated Authority & Channel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-[#050811]/90 p-4 border border-emerald-500/20 space-y-1">
                  <div className="text-[11px] font-bold text-yellow-400 uppercase tracking-wider font-mono">Designated approval authority</div>
                  <div className="text-sm font-bold text-white">{selectedClient.decisionMaker}</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">Use written approval from this person as the project's documented sign-off.</p>
                </div>

                <div className="rounded-2xl bg-[#050811]/90 p-4 border border-emerald-500/20 space-y-1">
                  <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider font-mono">Agreed Communication Channel</div>
                  <div className="text-sm font-bold text-white">{selectedClient.preferredChannel}</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">All formal milestone submissions and scope updates sent here.</p>
                </div>
              </div>

              {/* Client Protection Notes */}
              <div className="rounded-2xl bg-[#050811]/90 p-4 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px] block font-mono">Engagement Risk Factors & Working History:</span>
                  <span className="text-[10px] text-slate-400 font-mono">Based on recorded workflow factors</span>
                </div>
                <p className="text-slate-300 leading-relaxed bg-[#0a0f1d] p-3.5 rounded-xl border border-slate-800/80 font-sans">
                  {selectedClient.notes}
                </p>
              </div>

              {/* Action Rules */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-yellow-500/5 to-transparent border border-emerald-500/30 text-xs text-emerald-300 space-y-1 shadow-sm">
                <span className="font-bold text-yellow-300 block text-[11px] uppercase tracking-wider font-mono">🛡️ FreelanceShield Defense Protocol:</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Never accept scope additions over informal voice calls or instant messages without issuing a written Change Request confirmation to <strong className="text-emerald-300">{selectedClient.email}</strong>.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 text-xs font-mono">Select a client to view their protection dossier.</div>
          )}
        </div>
      </div>
    </div>
  );
};
