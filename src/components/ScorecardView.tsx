import React, { useState } from "react";
import { INITIAL_SCORECARD_CATEGORIES } from "../data/kitData";
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  Download,
  Printer,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import { exportTextFile } from "../utils/exportUtils";

interface ScorecardViewProps {
  onScoreUpdate?: (score: number) => void;
}

export const ScorecardView: React.FC<ScorecardViewProps> = ({ onScoreUpdate }) => {
  // State for all scorecard items
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    ci_1: true,
    ci_2: true,
    ci_3: true,
    sc_1: true,
    sc_2: true,
    sc_3: true,
    pm_1: true,
    pm_2: true,
    pm_3: true,
    wa_1: true,
    wa_2: true,
    wa_3: true,
    as_1: false,
    as_2: true,
    as_3: true,
    pr_1: true,
    pr_2: false,
    pr_3: false,
  });

  const toggleItem = (id: string) => {
    const updated = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(updated);

    let newTotal = 0;
    INITIAL_SCORECARD_CATEGORIES.forEach((cat) => {
      cat.items.forEach((item) => {
        if (updated[item.id]) {
          newTotal += item.points;
        }
      });
    });
    if (onScoreUpdate) {
      onScoreUpdate(newTotal);
    }
  };

  // Calculate current score
  let totalScore = 0;
  INITIAL_SCORECARD_CATEGORIES.forEach((cat) => {
    cat.items.forEach((item) => {
      if (checkedItems[item.id]) {
        totalScore += item.points;
      }
    });
  });

  // Risk Classification
  const getRating = (score: number) => {
    if (score >= 85) return { grade: "🛡️ FORTIFIED (Low Risk)", color: "text-emerald-400", bg: "bg-emerald-950/40 border-emerald-500/50" };
    if (score >= 65) return { grade: "🟡 MODERATE PROTECTION", color: "text-amber-400", bg: "bg-amber-950/40 border-amber-500/50" };
    return { grade: "🚨 HIGH RISK EXPOSURE", color: "text-rose-400", bg: "bg-rose-950/40 border-rose-500/50" };
  };

  const currentRating = getRating(totalScore);

  // Missing items
  const missingItems: { label: string; action?: string; category: string }[] = [];
  INITIAL_SCORECARD_CATEGORIES.forEach((cat) => {
    cat.items.forEach((item) => {
      if (!checkedItems[item.id]) {
        missingItems.push({
          label: item.label,
          action: item.urgentFixMessage,
          category: cat.name,
        });
      }
    });
  });

  const handleExportScorecard = () => {
    const text = `===================================================
FREELANCESHIELD — PROJECT PROTECTION AUDIT SCORECARD
===================================================
Overall Protection Score: ${totalScore} / 100
Evaluation: ${currentRating.grade}
Date Audited: ${new Date().toISOString().split("T")[0]}

--- SCORE BREAKDOWN BY CATEGORY ---
${INITIAL_SCORECARD_CATEGORIES.map((cat) => {
  const catScore = cat.items.reduce((sum, item) => sum + (checkedItems[item.id] ? item.points : 0), 0);
  return `• ${cat.name}: ${catScore} / ${cat.maxPoints} pts\n` +
    cat.items.map((item) => `   [${checkedItems[item.id] ? "PASSED" : "FAILED"}] (${item.points} pts) ${item.label}`).join("\n");
}).join("\n\n")}

--- PRIORITY FIXES REQUIRED (${missingItems.length} Gaps Identified) ---
${missingItems.map((m, i) => `${i + 1}. ${m.label}\n   Fix Action: ${m.action || "Address this risk immediately"}`).join("\n\n")}
`;
    exportTextFile("FreelanceShield-Protection-Audit-Scorecard.txt", text);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 mb-2">
            <Award className="h-3.5 w-3.5" />
            <span>Interactive Risk Audit Tool</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            🛡️ Freelancer Protection Scorecard (100 Pts)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Audit your active client project against 20 critical protection criteria. Identify vulnerabilities before they cost you money.
          </p>
        </div>

        <button
          onClick={handleExportScorecard}
          className="flex items-center space-x-1.5 rounded-lg bg-emerald-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Export Scorecard Audit (.TXT)</span>
        </button>
      </div>

      {/* Score Overview Dial Card */}
      <div className={`rounded-2xl border p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl ${currentRating.bg}`}>
        <div className="flex items-center space-x-6">
          <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-slate-950 border-4 border-emerald-500/50 shadow-inner">
            <div className="text-center">
              <span className="text-3xl font-black text-white">{totalScore}</span>
              <span className="block text-[10px] font-bold text-slate-400 uppercase">/ 100 PTS</span>
            </div>
          </div>

          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-slate-400">
              Audit Rating
            </div>
            <div className={`text-2xl sm:text-3xl font-extrabold ${currentRating.color} mt-0.5`}>
              {currentRating.grade}
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-md">
              {totalScore >= 85
                ? "Excellent protection! Your scope, exclusions, and payment gates are tightly secured."
                : totalScore >= 65
                ? "Moderate exposure. You have some key protections in place, but a few critical vulnerabilities remain."
                : "High risk of unpaid work or scope creep. Please address the critical action items below immediately!"}
            </p>
          </div>
        </div>

        <div className="text-center sm:text-right">
          <span className="text-xs text-slate-400">Gaps Identified:</span>
          <div className="text-xl font-bold text-amber-400">{missingItems.length} Vulnerabilities</div>
        </div>
      </div>

      {/* Priority Action Fixes Banner */}
      {missingItems.length > 0 && (
        <div className="rounded-xl border border-amber-900/50 bg-slate-900/80 p-6 space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span>Priority Fixes to Fortify Your Project</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {missingItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-lg bg-slate-950 p-3.5 border border-slate-800 space-y-1 text-xs"
              >
                <span className="font-bold text-slate-200 block">{item.label}</span>
                <p className="text-emerald-400/90 text-[11px] font-medium">
                  <strong>Fix:</strong> {item.action || "Address this requirement before starting"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audit Checklist Categories */}
      <div className="space-y-6">
        {INITIAL_SCORECARD_CATEGORIES.map((category) => {
          const categoryScore = category.items.reduce(
            (sum, item) => sum + (checkedItems[item.id] ? item.points : 0),
            0
          );
          return (
            <div
              key={category.id}
              className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 space-y-4 shadow-md"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    {category.name}
                  </h3>
                </div>
                <div className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/60">
                  {categoryScore} / {category.maxPoints} PTS
                </div>
              </div>

              <div className="space-y-2.5">
                {category.items.map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-start justify-between p-3 rounded-lg border cursor-pointer transition-colors text-xs ${
                      checkedItems[item.id]
                        ? "bg-slate-950/80 border-emerald-800/40 text-slate-200"
                        : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:bg-slate-950"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={checkedItems[item.id]}
                        onChange={() => toggleItem(item.id)}
                        className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                      />
                      <div>
                        <span className={`font-semibold ${checkedItems[item.id] ? "text-white" : "text-slate-300"}`}>
                          {item.label}
                        </span>
                        {!checkedItems[item.id] && item.urgentFixMessage && (
                          <p className="text-amber-300/80 text-[11px] mt-0.5">
                            ⚠️ Action: {item.urgentFixMessage}
                          </p>
                        )}
                      </div>
                    </div>

                    <span className="text-xs font-bold text-slate-400 shrink-0 ml-2">
                      +{item.points} pts
                    </span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
