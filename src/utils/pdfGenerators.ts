import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { SCRIPT_TEMPLATES, RED_FLAGS, AI_PROMPTS, FIVE_RULES } from "../data/kitData";

const EMERALD_DARK = [15, 118, 110]; // #0f766e
const SLATE_DARK = [15, 23, 42]; // #0f172a
const SLATE_MUTED = [100, 116, 139]; // #64748b

function initPdf(title: string, subtitle: string): { doc: jsPDF; startY: number } {
  const doc = new jsPDF({ unit: "pt", format: "letter" });

  // Top header banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, 612, 60, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("FREELANCESHIELD", 40, 32);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(52, 211, 153); // emerald-400
  doc.text("PROJECT PROTECTION KIT", 40, 48);

  // Document Title
  doc.setTextColor(15, 118, 110); // emerald-700
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(title, 40, 95);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(100, 116, 139);
  doc.text(subtitle, 40, 112);

  doc.setDrawColor(226, 232, 240);
  doc.line(40, 122, 572, 122);

  return { doc, startY: 140 };
}

function checkAddPage(doc: jsPDF, currentY: number, neededSpace = 60): number {
  if (currentY + neededSpace > 740) {
    doc.addPage();
    // Simple top brand watermark on subsequent pages
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text("FreelanceShield — Project Protection Framework", 40, 30);
    doc.setDrawColor(226, 232, 240);
    doc.line(40, 38, 572, 38);
    return 60;
  }
  return currentY;
}

// 1. Start Here PDF
export function generateStartHerePdf(): Uint8Array {
  const { doc, startY } = initPdf(
    "Start Here: Your Project Protection System",
    "Operational Guidelines & The 7-Step Protection Workflow"
  );

  let y = startY;

  // Section 1
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text("1. WHAT IS FREELANCESHIELD?", 40, y);
  y += 18;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(51, 65, 85);
  const text1 = doc.splitTextToSize(
    "FreelanceShield is a practical project-protection toolkit designed for freelance developers, designers, and digital professionals. It provides structured workflows, boundary templates, and communication scripts to eliminate scope creep, payment delays, and unrecorded verbal agreements.",
    532
  );
  doc.text(text1, 40, y);
  y += text1.length * 15 + 16;

  // Section 2
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text("2. THE 7-STEP FREELANCE PROTECTION WORKFLOW", 40, y);
  y += 18;

  const steps = [
    "Step 1 — Screen the Project: Detect red flags and verify the single decision maker.",
    "Step 2 — Define the Scope: Document deliverables, screen counts, and explicit exclusions.",
    "Step 3 — Structure Payment: Require upfront cleared deposits and milestone-based sign-offs.",
    "Step 4 — Kickoff Correctly: Verify all 11 pre-start gatekeeper items before writing code.",
    "Step 5 — Control Changes: Convert out-of-scope requests into formal Change Requests.",
    "Step 6 — Document Everything: Maintain active Decision Logs and Delay Trackers.",
    "Step 7 — Complete Handover: Ensure full balance is cleared prior to live DNS transfer.",
  ];

  steps.forEach((step) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(15, 118, 110);
    doc.text("•", 45, y);
    doc.setTextColor(51, 65, 85);
    doc.text(step, 58, y);
    y += 16;
  });

  y += 16;
  y = checkAddPage(doc, y, 140);

  // Section 3: The 5 Golden Rules
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text("3. THE 5 GOLDEN RULES OF PROJECT DEFENSE", 40, y);
  y += 18;

  FIVE_RULES.forEach((rule) => {
    y = checkAddPage(doc, y, 45);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(15, 118, 110);
    doc.text(`${rule.number}. ${rule.title.toUpperCase()}`, 40, y);
    y += 14;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(71, 85, 105);
    const desc = doc.splitTextToSize(rule.description, 532);
    doc.text(desc, 40, y);
    y += desc.length * 13 + 10;
  });

  y = checkAddPage(doc, y, 60);
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(40, y, 532, 45, 6, 6, "F");
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(
    "Educational Notice: FreelanceShield provides operational templates and workflow systems. It does not provide legal advice or guarantee financial outcomes.",
    50,
    y + 26
  );

  return new Uint8Array(doc.output("arraybuffer"));
}

// 2. Client Screening Checklist PDF
export function generateClientScreeningChecklistPdf(): Uint8Array {
  const { doc, startY } = initPdf(
    "Client & Project Screening Checklist",
    "Pre-Contract Discovery, Red Flag Detection & Risk Assessment"
  );

  let y = startY;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text("A. DISCOVERY & SCOPE CLARITY QUESTIONS", 40, y);
  y += 16;

  const discoveryQuestions = [
    "[ ] What exact business outcome or conversion goal does this project achieve?",
    "[ ] Who is the single designated decision-maker authorized to approve milestones?",
    "[ ] What is the exact target launch date and is there an external hard deadline?",
    "[ ] What is the approved budget range for this scope of work?",
    "[ ] Are all required brand assets, copywriting, and third-party APIs ready today?",
    "[ ] What primary communication channel will be used (Email, Slack, Portal)?",
  ];

  discoveryQuestions.forEach((q) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    doc.text(q, 45, y);
    y += 16;
  });

  y += 14;
  y = checkAddPage(doc, y, 100);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text("B. RED FLAG EVALUATION CRITERIA", 40, y);
  y += 16;

  const redFlagRows = RED_FLAGS.map((rf) => [
    rf.riskSeverity.toUpperCase(),
    rf.quote,
    rf.potentialRisk,
    rf.recommendedResponse,
  ]);

  autoTable(doc, {
    startY: y,
    head: [["Risk Level", "Client Quote / Signal", "Underlying Risk", "Recommended Action"]],
    body: redFlagRows,
    theme: "striped",
    headStyles: { fillColor: [15, 118, 110], fontSize: 9 },
    bodyStyles: { fontSize: 8.5, textColor: [51, 65, 85] },
    columnStyles: {
      0: { cellWidth: 65, fontStyle: "bold" },
      1: { cellWidth: 130 },
      2: { cellWidth: 140 },
      3: { cellWidth: 190 },
    },
    margin: { left: 40, right: 40 },
  });

  return new Uint8Array(doc.output("arraybuffer"));
}

// 3. Payment Protection Checklist PDF
export function generatePaymentChecklistPdf(): Uint8Array {
  const { doc, startY } = initPdf(
    "Payment Protection Checklist",
    "Milestone Structuring, Deposit Clearance & Stalled Payment Protocol"
  );

  let y = startY;

  const checks = [
    "[ ] 1. Payment schedule clearly structured in written SOW (Deposit -> Milestone Demo -> Final Handover).",
    "[ ] 2. Upfront deposit (40-50%) invoiced and fully CLEARED in bank account before kicking off work.",
    "[ ] 3. Payment method confirmed (Bank wire, Stripe invoice, Escrow) with zero ambiguous terms.",
    "[ ] 4. Formal written milestone demo approval received before requesting subsequent milestone payment.",
    "[ ] 5. Work pause protocol enforced: active development automatically halts if an invoice is overdue by >3 business days.",
    "[ ] 6. Final invoice balance confirmed and paid in full BEFORE transferring master server credentials or production DNS.",
  ];

  checks.forEach((item) => {
    y = checkAddPage(doc, y, 30);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    const split = doc.splitTextToSize(item, 532);
    doc.text(split, 40, y);
    y += split.length * 15 + 6;
  });

  y += 20;
  y = checkAddPage(doc, y, 120);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 118, 110);
  doc.text("RECOMMENDED MILESTONE RATIOS BY PROJECT SIZE", 40, y);
  y += 15;

  autoTable(doc, {
    startY: y,
    head: [["Project Size", "Deposit", "Midpoint Milestone", "Final Handover"]],
    body: [
      ["Small (< $1,500)", "50% upfront", "—", "50% on staging sign-off"],
      ["Medium ($1,500 – $5,000)", "40% upfront", "30% staging demo", "30% live release"],
      ["Large ($5,000+)", "30% upfront", "40% phased milestones", "30% live release"],
    ],
    theme: "grid",
    headStyles: { fillColor: [15, 23, 42], fontSize: 9 },
    bodyStyles: { fontSize: 9 },
    margin: { left: 40, right: 40 },
  });

  return new Uint8Array(doc.output("arraybuffer"));
}

// 4. Kickoff Checklist PDF
export function generateKickoffChecklistPdf(): Uint8Array {
  const { doc, startY } = initPdf(
    "Project Kickoff Gatekeeper Checklist",
    "11 Pre-Start Criteria Required Before Writing Code or Designing"
  );

  let y = startY;

  const items = [
    "[ ] 1. Client Legal Entity verified with billing contact address.",
    "[ ] 2. Scope of Work (SOW) approved with itemized deliverables & screen count.",
    "[ ] 3. Explicit 'NOT INCLUDED' Scope Exclusions list acknowledged by client.",
    "[ ] 4. 2-Round consolidated revision policy defined in writing.",
    "[ ] 5. Upfront deposit (40-50%) received and CLEARED in bank account.",
    "[ ] 6. Final milestone payment agreed prior to production DNS / code transfer.",
    "[ ] 7. Change Request protocol established for out-of-scope requests.",
    "[ ] 8. Client provided all brand logos, approved copywriting, and typography.",
    "[ ] 9. Third-party API keys, domain registrar, and server logins shared securely.",
    "[ ] 10. Single primary decision-maker designated for milestone approvals.",
    "[ ] 11. Communication channel (Slack/Email) and business hours SLA agreed.",
  ];

  items.forEach((item) => {
    y = checkAddPage(doc, y, 25);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(30, 41, 59);
    doc.text(item, 40, y);
    y += 20;
  });

  y += 15;
  y = checkAddPage(doc, y, 50);
  doc.setFillColor(236, 253, 245); // emerald-50
  doc.roundedRect(40, y, 532, 40, 6, 6, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 118, 110);
  doc.text("ALL 11 ITEMS CHECKED? YOUR PROJECT IS FULLY GATED AND SAFE TO START!", 50, y + 25);

  return new Uint8Array(doc.output("arraybuffer"));
}

// 5. Scope Change Checklist PDF
export function generateScopeChangeChecklistPdf(): Uint8Array {
  const { doc, startY } = initPdf(
    "Scope Creep Control & Change Request Checklist",
    "7-Step Protocol for Converting Extra Feature Requests into Paid Scope"
  );

  let y = startY;

  const steps = [
    "Step 1: Check Original SOW — Verify if the requested feature is in the agreed deliverables.",
    "Step 2: If NOT in Scope — Immediately pause implementation of that feature.",
    "Step 3: Calculate Impact — Estimate additional hours, budget adjustment, and timeline shift.",
    "Step 4: Draft Change Request (CR) — Document the scope expansion and revised totals.",
    "Step 5: Client Authorization — Send CR to client for formal written sign-off.",
    "Step 6: Update Logs — Record approval in Decision Log and update project schedule.",
    "Step 7: Execute Work — Build the feature with guaranteed payment protection.",
  ];

  steps.forEach((step, idx) => {
    y = checkAddPage(doc, y, 35);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(15, 118, 110);
    doc.text(`[${idx + 1}]`, 40, y);
    doc.setTextColor(51, 65, 85);
    doc.setFont("helvetica", "normal");
    const split = doc.splitTextToSize(step, 500);
    doc.text(split, 65, y);
    y += split.length * 15 + 10;
  });

  return new Uint8Array(doc.output("arraybuffer"));
}

// 6. 30 Client Communication Scripts PDF
export function generate30ClientScriptsPdf(): Uint8Array {
  const { doc, startY } = initPdf(
    "30 Professional Client Communication Scripts",
    "Ready-to-Use Email & Slack Scripts for Scope, Payment & Boundary Discussions"
  );

  let y = startY;

  SCRIPT_TEMPLATES.forEach((s, idx) => {
    y = checkAddPage(doc, y, 130);

    // Title pill
    doc.setFillColor(15, 23, 42);
    doc.roundedRect(40, y, 532, 22, 4, 4, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(255, 255, 255);
    doc.text(`SCRIPT #${idx + 1}: [${s.category.toUpperCase()}] ${s.title}`, 48, y + 15);
    y += 30;

    // Situation
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(15, 118, 110);
    doc.text("WHEN TO USE:", 40, y);
    y += 12;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    const sit = doc.splitTextToSize(s.whenToUse || s.scenario || "", 532);
    doc.text(sit, 40, y);
    y += sit.length * 12 + 8;

    // Ready to send copy
    y = checkAddPage(doc, y, 60);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text("MESSAGE TEMPLATE (READY TO SEND):", 40, y);
    y += 12;

    doc.setFillColor(248, 250, 252);
    const copyText = s.friendlyVersion || s.template || "";
    const splitCopy = doc.splitTextToSize(copyText, 510);
    const boxHeight = splitCopy.length * 12 + 16;
    doc.roundedRect(40, y, 532, boxHeight, 4, 4, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text(splitCopy, 50, y + 14);
    y += boxHeight + 15;
  });

  return new Uint8Array(doc.output("arraybuffer"));
}

// 7. Final Handover Checklist PDF
export function generateFinalHandoverChecklistPdf(): Uint8Array {
  const { doc, startY } = initPdf(
    "Final Delivery & Handover Checklist",
    "Secure Project Closeout, Final Invoice Clearance & Asset Transfer"
  );

  let y = startY;

  const checks = [
    "[ ] 1. All agreed deliverables and screen flows completed according to SOW.",
    "[ ] 2. Formal written staging demonstration approval received from client lead.",
    "[ ] 3. FINAL INVOICE CONFIRMED AND PAID IN FULL before live DNS transfer.",
    "[ ] 4. Full source code repository, assets, and database backup archived locally.",
    "[ ] 5. Project documentation, system dependencies, and deployment guide delivered.",
    "[ ] 6. Production server logins, domain DNS, and admin accounts transferred securely.",
    "[ ] 7. 14-day post-launch warranty support terms clearly communicated.",
    "[ ] 8. Formal testimonial and referral request sent to client.",
  ];

  checks.forEach((item) => {
    y = checkAddPage(doc, y, 25);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(30, 41, 59);
    doc.text(item, 40, y);
    y += 22;
  });

  y += 20;
  y = checkAddPage(doc, y, 60);
  doc.setFillColor(254, 242, 242); // rose-50
  doc.roundedRect(40, y, 532, 45, 6, 6, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(185, 28, 28); // rose-700
  doc.text("GOLDEN RULE OF HANDOVER:", 50, y + 18);
  doc.setFont("helvetica", "normal");
  doc.text("Never release live DNS switch or master repo credentials until final invoice payment is cleared.", 50, y + 32);

  return new Uint8Array(doc.output("arraybuffer"));
}

// 8. AI Prompt Pack PDF
export function generateAiPromptPackPdf(): Uint8Array {
  const { doc, startY } = initPdf(
    "FreelanceShield AI Prompt Pack",
    "Structured AI Prompts for Client Screening, Scope Audits & Communication"
  );

  let y = startY;

  AI_PROMPTS.forEach((p, idx) => {
    y = checkAddPage(doc, y, 140);

    doc.setFillColor(15, 118, 110);
    doc.roundedRect(40, y, 532, 22, 4, 4, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(255, 255, 255);
    doc.text(`PROMPT #${idx + 1}: ${p.title.toUpperCase()} (${p.category})`, 48, y + 15);
    y += 30;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text("SYSTEM PROMPT:", 40, y);
    y += 12;

    doc.setFillColor(241, 245, 249);
    const splitPrompt = doc.splitTextToSize(p.promptText, 510);
    const pHeight = splitPrompt.length * 11.5 + 16;
    doc.roundedRect(40, y, 532, pHeight, 4, 4, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    doc.text(splitPrompt, 50, y + 14);
    y += pHeight + 16;
  });

  return new Uint8Array(doc.output("arraybuffer"));
}

// 9. Complete Project Example PDF (10_CASE_STUDY_AND_BONUSES)
export function generateCompleteProjectExamplePdf(): Uint8Array {
  const { doc, startY } = initPdf(
    "Complete Real-World Project Case Study ($1,500)",
    "Apex Digital Solutions — End-to-End Workflow Application"
  );

  let y = startY;

  const sections = [
    {
      title: "PROJECT OVERVIEW & INTAKE",
      content:
        "Client: Apex Digital Solutions\nProject: B2B Marketing Site + Lead Intake System\nAgreed Budget: $1,500 USD\nTarget Launch: 21 business days\nStack: React 19, TypeScript, Tailwind CSS, Stripe Elements",
    },
    {
      title: "STEP 1: PRE-PROJECT SCREENING",
      content:
        "• Client asked for a 2-week turnaround on initial inquiry call.\n• Freelancer evaluated schedule dependencies and established a realistic 21-day timeline.\n• Verified single decision maker (CEO Marcus Vance) and primary email channel.",
    },
    {
      title: "STEP 2: SCOPE OF WORK & BOUNDARIES",
      content:
        "• Included: 4 responsive pages (Home, Features, Pricing, Contact), contact form, staging deployment.\n• Explicitly Excluded: Custom copywriting, logo design, ongoing hosting fees, custom user dashboard.\n• Payment Plan: 50% deposit ($750) upfront; 50% final balance ($750) upon staging sign-off.",
    },
    {
      title: "STEP 3: MID-PROJECT SCOPE CREEP RESOLUTION",
      content:
        "• On Day 9, client requested adding a user auth portal and client invoice download system.\n• Freelancer checked SOW: Functionality was NOT in original scope.\n• Issued Change Request CR-001: +$450 fee and +3 business days to launch date.\n• Client CEO approved CR-001 in writing via email.",
    },
    {
      title: "STEP 4: LOGGING & DOCUMENTATION",
      content:
        "• Recorded CR-001 approval in Decision Log.\n• Logged 2-day client asset delay in Delay Tracker with adjusted milestone dates.",
    },
    {
      title: "STEP 5: STAGING APPROVAL & FINAL HANDOVER",
      content:
        "• Staging demo presented and approved in writing by client CEO.\n• Final invoice for $1,200 ($750 remaining balance + $450 CR-001) paid and verified in bank.\n• Transferred domain DNS and master repo access.\n• Activated 14-day post-launch warranty window.",
    },
    {
      title: "FINAL FINANCIAL & OPERATIONAL RESULT",
      content:
        "• Total Revenue Earned: $1,950 ($1,500 base + $450 Change Request)\n• Scope Creep Disputes: 0\n• Payment Delays: 0 days\n• Client Outcome: Highly satisfied, project delivered safely on schedule.",
    },
  ];

  sections.forEach((sec) => {
    y = checkAddPage(doc, y, 70);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 118, 110);
    doc.text(sec.title, 40, y);
    y += 14;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(51, 65, 85);
    const split = doc.splitTextToSize(sec.content, 532);
    doc.text(split, 40, y);
    y += split.length * 13 + 14;
  });

  return new Uint8Array(doc.output("arraybuffer"));
}
