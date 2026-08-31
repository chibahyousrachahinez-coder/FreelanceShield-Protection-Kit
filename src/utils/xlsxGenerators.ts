import * as XLSX from "xlsx";

function autoFitColumns(data: any[][]): { wch: number }[] {
  const colWidths: number[] = [];
  data.forEach((row) => {
    row.forEach((val, colIdx) => {
      const len = val ? String(val).length : 10;
      colWidths[colIdx] = Math.max(colWidths[colIdx] || 10, len + 3);
    });
  });
  return colWidths.map((w) => ({ wch: Math.min(w, 50) }));
}

// 1. Payment Planner XLSX
export function generatePaymentPlannerXlsx(): Uint8Array {
  const wb = XLSX.utils.book_new();

  const data = [
    ["FREELANCESHIELD — MILESTONE PAYMENT PLANNER"],
    ["Project Title:", "Apex Web Application", "Total Budget:", "$1,500"],
    ["Client Name:", "Apex Innovations", "Effective Date:", "2026-08-30"],
    [""],
    [
      "Milestone #",
      "Milestone Name",
      "Trigger / Condition",
      "Percentage",
      "Amount ($)",
      "Payment Status",
      "Target Date",
      "Release Trigger / Verification",
    ],
    [
      "1",
      "Kickoff Deposit",
      "Agreement Signed & Calendar Locked",
      "40%",
      500,
      "Paid & Cleared",
      "2026-08-01",
      "Must clear before work begins",
    ],
    [
      "2",
      "Core UI & Staging Demo",
      "Staging Link Sign-off",
      "30%",
      500,
      "Pending Review",
      "2026-08-15",
      "Written milestone demo approval",
    ],
    [
      "3",
      "Final Handover",
      "Prior to Live DNS Switch",
      "30%",
      500,
      "Scheduled",
      "2026-08-25",
      "Cleared prior to credentials release",
    ],
    [""],
    ["TOTAL", "", "", "100%", 1500, "Protection Grade:", "Fortress"],
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  ws["!cols"] = autoFitColumns(data);
  XLSX.utils.book_append_sheet(wb, ws, "Payment Schedule");

  const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  return new Uint8Array(buffer);
}

// 2. Decision Log XLSX
export function generateDecisionLogXlsx(): Uint8Array {
  const wb = XLSX.utils.book_new();

  const data = [
    ["FREELANCESHIELD — MUTUAL DECISION & APPROVAL LOG"],
    ["Project:", "Apex Web Platform", "Client:", "Apex Innovations"],
    [""],
    [
      "Log #",
      "Date",
      "Decision / Specification Approved",
      "Approved By (Name & Title)",
      "Communication Channel",
      "Impact on Scope / Timeline",
      "Verification Status",
    ],
    [
      "DEC-01",
      "2026-08-05",
      "Selected React 19 & Tailwind CSS technical stack",
      "Sarah Jenkins (CTO)",
      "Email Sign-off",
      "Architecture confirmed",
      "Verified",
    ],
    [
      "DEC-02",
      "2026-08-10",
      "Deferred secondary export filter to post-launch v2",
      "Marcus Vance (CEO)",
      "Slack #project-apex",
      "Zero impact on launch date",
      "Verified",
    ],
    [
      "DEC-03",
      "2026-08-15",
      "Approved high-fidelity layouts for all 4 screens",
      "Marcus Vance (CEO)",
      "Meeting Transcript & Email",
      "Authorized frontend build",
      "Verified",
    ],
    [
      "DEC-04",
      "2026-08-20",
      "Integrated Stripe Elements instead of Hosted Checkout",
      "Sarah Jenkins (CTO)",
      "Written Approval",
      "Custom styling authorized",
      "Verified",
    ],
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  ws["!cols"] = autoFitColumns(data);
  XLSX.utils.book_append_sheet(wb, ws, "Decision Log");

  const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  return new Uint8Array(buffer);
}

// 3. Delay Tracker XLSX
export function generateDelayTrackerXlsx(): Uint8Array {
  const wb = XLSX.utils.book_new();

  const data = [
    ["FREELANCESHIELD — TIMELINE SHIFT & DELAY TRACKER"],
    ["Project:", "Apex Web Platform", "Standard:", "1:1 Timeline Shift Clause"],
    [""],
    [
      "Delay #",
      "Date Logged",
      "Caused By",
      "Root Cause Description",
      "Schedule Impact",
      "Revised Delivery Date",
      "Client Formally Notified?",
    ],
    [
      "DLY-01",
      "2026-08-08",
      "Client",
      "Pending final high-resolution brand typography and logos",
      "+3 business days",
      "2026-08-18",
      "Yes (Email Sent)",
    ],
    [
      "DLY-02",
      "2026-08-14",
      "Third Party",
      "Stripe bank merchant account verification under manual review",
      "+2 business days",
      "2026-08-20",
      "Yes (Slack Summary)",
    ],
    [
      "DLY-03",
      "2026-08-19",
      "Client Dependency",
      "Delayed staging sign-off feedback due to executive offsite",
      "+2 business days",
      "2026-08-22",
      "Yes (Meeting Note)",
    ],
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  ws["!cols"] = autoFitColumns(data);
  XLSX.utils.book_append_sheet(wb, ws, "Delay Tracker");

  const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  return new Uint8Array(buffer);
}

// 4. 100-Point Protection Audit XLSX
export function generate100PointAuditXlsx(): Uint8Array {
  const wb = XLSX.utils.book_new();

  const data = [
    ["FREELANCESHIELD — 100-POINT PROJECT PROTECTION AUDIT SCORECARD"],
    ["Audit Standard:", "Objective Contract & Workflow Verification", "Version:", "1.0"],
    [""],
    [
      "Category",
      "Max Points",
      "Protection Standard & Verification Criteria",
      "Earned Points",
      "Status",
      "Operational Guidance",
    ],
    [
      "Client Clarity",
      15,
      "Core business goal verified; single designated sign-off authority identified",
      15,
      "Fortress Grade",
      "Never accept verbal multi-stakeholder feedback",
    ],
    [
      "Scope Definition",
      20,
      "Itemized deliverables, screen counts, and explicit 'What is NOT Included' exclusions list",
      20,
      "Fortress Grade",
      "State what is excluded upfront",
    ],
    [
      "Payment Protection",
      20,
      "Deposit received & cleared before start; final payment due before live domain release",
      20,
      "Fortress Grade",
      "Never write code on 0% deposit",
    ],
    [
      "Client Responsibilities",
      10,
      "Asset submission deadline and 48-hour feedback review SLA defined",
      10,
      "Protected",
      "Protects against stalled projects",
    ],
    [
      "Timeline & Milestones",
      10,
      "Structured milestone calendar with mutual 1:1 timeline shift clause",
      10,
      "Protected",
      "Client delays shift launch date automatically",
    ],
    [
      "Approvals & Sign-offs",
      10,
      "Written milestone approval required prior to subsequent phase kickoff",
      10,
      "Protected",
      "Establishes a solid record",
    ],
    [
      "Documentation",
      10,
      "Decision log, Change Request protocol, and Delay Tracker actively maintained",
      10,
      "Protected",
      "No unrecorded verbal changes",
    ],
    [
      "Final Handover",
      5,
      "Full backup completed; 14-day warranty communicated; credentials securely transferred",
      5,
      "Protected",
      "Secure and professional wrap-up",
    ],
    [""],
    ["TOTAL PROTECTION SCORE", 100, "All Core Protections Active", 100, "100 / 100", "Safe to Kick Off"],
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  ws["!cols"] = autoFitColumns(data);
  XLSX.utils.book_append_sheet(wb, ws, "Protection Audit");

  const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  return new Uint8Array(buffer);
}
