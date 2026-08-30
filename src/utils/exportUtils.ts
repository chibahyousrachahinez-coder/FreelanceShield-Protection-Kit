import JSZip from "jszip";
import { saveAs } from "file-saver";
import { SCRIPT_TEMPLATES, RED_FLAGS, DISCOVERY_CATEGORIES, AI_PROMPTS, FIVE_RULES } from "../data/kitData";

export function downloadZipPackage() {
  const zip = new JSZip();

  // Root folder
  const root = zip.folder("FreelanceShield-Protection-Kit") || zip;

  // 00_START_HERE
  const folder00 = root.folder("00_START_HERE");
  folder00?.file(
    "Start-Here.pdf",
    `# 🛡️ FreelanceShield — Start Here: Your Project Protection System
===================================================================

1. WHAT IS FREELANCESHIELD?
---------------------------
A practical project-protection toolkit for freelance developers, designers, and digital freelancers.

2. WHAT PROBLEM DOES IT SOLVE?
------------------------------
Freelancing without operational boundaries leads to costly project failures:
• Unclear scope & vague requirements
• Scope creep (unpaid feature requests)
• Payment confusion & missed invoices
• Delayed feedback & missing materials
• Missing approvals & verbal promises
• Difficult client communication & confrontation anxiety
• Poor project documentation & dispute vulnerability

3. THE 7-STEP FREELANCESHIELD WORKFLOW
--------------------------------------
1. Screen the project
        ↓
2. Define the scope
        ↓
3. Structure payment
        ↓
4. Start correctly
        ↓
5. Control changes
        ↓
6. Document everything
        ↓
7. Complete the handover

4. THE 5 GOLDEN RULES OF PROJECT PROTECTION
-------------------------------------------
${FIVE_RULES.map((r) => `${r.number}. ${r.title.toUpperCase()}\n${r.description}\n`).join("\n")}

5. 🚨 IMPORTANT EDUCATIONAL NOTICE
----------------------------------
FreelanceShield is an organizational and educational toolkit. It does not provide legal or financial advice and does not guarantee payment or prevent disputes.

© FreelanceShield Protection Kit. All rights reserved.
`
  );

  // 01_CLIENT_SCREENING
  const folder01 = root.folder("01_CLIENT_SCREENING");
  folder01?.file(
    "Client-Screening-Checklist.pdf",
    `# 🔎 Client & Project Screening Checklist
=========================================

A. PRE-PROJECT QUESTIONNAIRE
----------------------------
CLIENT:
• What is the business?
• What are they trying to achieve?
• Who makes the final decisions? (Identify single decision-maker)
• How will communication happen? (Slack, Email, Weekly calls)

PROJECT:
• What exactly needs to be built?
• What are the deliverables?
• What is the deadline?
• What is the budget?
• What are the dependencies? (Third-party APIs, assets, copy)

PAYMENT:
• What is the payment structure? (50/50, 40/30/30, Sprint)
• When is the first payment due? (Deposit cleared before start)
• What happens if payment is delayed? (Work pauses after 3 days)

B. RED FLAG CHECKLIST
---------------------
🔴 Client refuses to discuss payment structure upfront.
🟠 Requirements constantly change during discovery calls.
🔴 Client wants substantial work before agreement or payment.
🟠 Extremely unrealistic deadline with no budget flexibility.
🟠 "We'll figure out the details later."
🔴 Client refuses to put important decisions in writing.

NOTE: A red flag does not automatically mean a client is dishonest. It indicates something that deserves clarification.

${RED_FLAGS.map(
  (rf, idx) => `FLAG #${idx + 1}: "${rf.quote}"
Category: ${rf.category} | Severity: ${rf.riskSeverity.toUpperCase()}
Potential Risk: ${rf.potentialRisk}
Why It Matters: ${rf.whyItMatters}
Recommended Response: ${rf.recommendedResponse}
--------------------------------------------------`
).join("\n\n")}
`
  );

  folder01?.file(
    "Client-Screening-Template.docx",
    `# CLIENT & PROJECT SCREENING INTAKE TEMPLATE
============================================

CLIENT DETAILS
• Client Legal Entity: _______________________
• Primary Contact Person: ____________________
• Billing Address / Tax ID: __________________
• Authorized Decision Maker: _________________

PROJECT SCOPE INTAKE
• Primary Objective: _________________________
• Required Deliverables: _____________________
• Target Launch Date: ________________________
• Allocated Budget Range: ____________________
• Key Technical Dependencies: ________________

COMMUNICATION & GOVERNANCE
• Primary Channel: [ ] Email  [ ] Slack  [ ] Project Board
• Review Turnaround Expectation: 48 business hours
• Revision Limit: 2 consolidated rounds per milestone
`
  );

  // 02_SCOPE_PROTECTION
  const folder02 = root.folder("02_SCOPE_PROTECTION");
  folder02?.file(
    "Scope-of-Work.docx",
    `# STATEMENT OF WORK (SOW)
=========================

PROJECT: [Project Title]
CLIENT: [Client Name & Company]
FREELANCER: [Your Name / Studio]
DATE: [Agreement Date]

1. PROJECT OBJECTIVE
The core objective is to design, develop, and deploy [clear business outcome].

2. DELIVERABLES
• Deliverable 1: [Interactive UI Wireframes & Layout Prototypes]
• Deliverable 2: [Frontend React & Tailwind CSS Architecture]
• Deliverable 3: [Backend Database & API Integration]
• Deliverable 4: [Production Deployment & Staging QA]

3. FEATURES & FUNCTIONALITY
• User authentication & session management
• Responsive mobile & desktop interface
• Form validation & email notification system
• Data storage & automated schema migration

4. NUMBER OF PAGES / SCREENS
• Included Screens: Home, Features, Dashboard, Settings (Total: 4 screens)

5. TECHNOLOGIES
• Frontend: React 18, TypeScript, Tailwind CSS, Lucide Icons
• Backend: Node.js, Express, PostgreSQL / Firestore
• Deployment: Cloud Run / Vercel with SSL

6. INTEGRATIONS
• Payment Processing: Stripe Checkout / Webhooks
• Transactional Email: Resend / SendGrid

7. REVISIONS
• 2 consolidated rounds of revisions per milestone.
• Revisions apply to agreed deliverables; new features require a Change Request.

8. TIMELINE & MILESTONES
• Milestone 1: Discovery & Architecture (Days 1–5) — 40% Deposit
• Milestone 2: Core Development & Staging (Days 6–18) — 30% Payment
• Milestone 3: Final QA & Live Handover (Days 19–21) — 30% Final Payment

9. CLIENT RESPONSIBILITIES
• Provide high-res logos, brand assets, and finalized copywriting within 3 days.
• Provide staging/server credentials and third-party API keys.
• Provide written milestone sign-off within 48 business hours.
`
  );

  folder02?.file(
    "Scope-Exclusions.docx",
    `# 🚫 SCOPE EXCLUSIONS ("WHAT IS NOT INCLUDED")
==============================================

To avoid any ambiguity, the following items are EXPLICITLY NOT INCLUDED in the project scope and require a formal Change Request if requested:

❌ Copywriting & content creation
❌ Logo design & brand identity creation
❌ Search Engine Optimization (SEO) backlink / marketing campaigns
❌ Monthly hosting, domain renewals, and cloud infrastructure fees
❌ Third-party paid API subscription charges (Stripe, Twilio, OpenAI)
❌ Additional pages or screens beyond the agreed list
❌ Custom animations beyond the agreed UI design
❌ Mobile native applications (iOS / Android)
❌ Ongoing maintenance beyond the 14-day post-launch warranty

RULE OF THUMB: Don't only define what you are doing. Define what you are NOT doing.
`
  );

  folder02?.file(
    "Assumptions.docx",
    `# 📋 KEY PROJECT ASSUMPTIONS & DEPENDENCIES
==========================================

This project agreement is based on the following operational assumptions:

1. ASSET READINESS: Client will supply all final vector logos, typography assets, and approved copywriting prior to Milestone 2 kickoff.
2. TIMELINE SHIFT CLAUSE: Delays in client feedback or asset delivery will shift the final delivery date by the corresponding number of business days.
3. THIRD-PARTY INFRASTRUCTURE: Client maintains active ownership and billing for domain registrar, hosting servers, and external API subscriptions.
4. SINGLE DECISION-MAKER: Client designates a single project lead empowered to grant written approvals.
5. WARRANTY PERIOD: A 14-day bug fix window is included post-launch for issues directly related to the agreed SOW.
`
  );

  folder02?.file(
    "Definition-of-Done.docx",
    `# ✅ DEFINITION OF DONE (DoD)
=============================

A deliverable or project milestone is officially considered COMPLETE when:

[ ] 1. All agreed functional requirements are fully implemented.
[ ] 2. Responsive behavior is tested and verified across mobile (375px+), tablet (768px+), and desktop (1280px+).
[ ] 3. Agreed features and user flows pass end-to-end testing without console errors.
[ ] 4. Staging environment demo is reviewed by client.
[ ] 5. Agreed 2-round revisions are completed and incorporated.
[ ] 6. Formal written milestone approval / sign-off is received from the client.
[ ] 7. Code is documented and committed to repository.
`
  );

  // 03_PAYMENT
  const folder03 = root.folder("03_PAYMENT");
  folder03?.file(
    "Payment-Planner.xlsx",
    `Milestone Name,Amount ($),Trigger / Condition,Status,Due Date,Notes
1. Kickoff Deposit,500,Project Kickoff (Cleared Before Work),Paid,2026-08-01,Locks development calendar
2. Development Milestone,500,Staging Demo Sign-off,Pending,2026-08-15,Core features functional
3. Final Delivery,500,Prior to Live Domain / DNS Handover,Pending,2026-08-25,Master credentials release
TOTAL,1500,3-Part Structured Milestone Schedule,,
`
  );

  folder03?.file(
    "Payment-Checklist.pdf",
    `# 💰 PAYMENT PROTECTION CHECKLIST
=================================

Before and during project execution:

[ ] 1. Payment schedule agreed and documented in SOW (Deposit -> Midpoint -> Final).
[ ] 2. Payment method confirmed (Bank wire, Stripe invoice, Escrow).
[ ] 3. Upfront deposit invoice sent and CLEARED in bank before work begins.
[ ] 4. Payment status recorded in activity ledger for each milestone.
[ ] 5. Milestone approval recorded in writing before requesting the next payment.
[ ] 6. Work paused if an invoice is overdue by more than 3 business days.
[ ] 7. Final balance received and verified BEFORE transferring live credentials or Git repos.

IMPORTANT: This checklist helps you establish clear payment expectations and documentation to minimize non-payment risk.
`
  );

  // 04_PROJECT_MANAGEMENT
  const folder04 = root.folder("04_PROJECT_MANAGEMENT");
  folder04?.file(
    "Kickoff-Checklist.pdf",
    `# 🚀 PROJECT KICKOFF CHECKLIST (PRE-START GATEKEEPER)
=====================================================

Never write code or build designs until all 11 criteria are met:

[ ] 1. Client legal entity name and billing contact verified.
[ ] 2. Scope of Work (SOW) approved with itemized deliverables.
[ ] 3. Explicit 'NOT INCLUDED' exclusions list signed off.
[ ] 4. 2-Round revision limit defined in writing.
[ ] 5. Upfront deposit (e.g. 50%) received and CLEARED in bank.
[ ] 6. Final payment milestone agreed BEFORE live handover.
[ ] 7. Change Request protocol established for extra features.
[ ] 8. Client provided all logos, brand guidelines, and approved copy.
[ ] 9. Hosting, domain, and API credentials shared securely.
[ ] 10. Primary single decision-maker established.
[ ] 11. Communication channel and business hours agreed upon.

🟢 ALL 11 CHECKED? YOU ARE READY TO START SAFELY!
`
  );

  folder04?.file(
    "Decision-Log.xlsx",
    `Date,Decision,Approved By,Source,Impact / Notes
2026-08-20,React 18 & Tailwind CSS stack selected,Client CTO,Email,Confirmed technical stack
2026-08-22,Removed secondary search filter from v1 scope,Client CEO,Slack #project,Deferred to post-launch v2
2026-08-25,Approved wireframe layouts for all 4 screens,Client CEO,Meeting Notes,Proceed to frontend development
2026-08-28,Stripe Elements chosen over Hosted Checkout,Client CTO,Email,Custom styling authorized
`
  );

  folder04?.file(
    "Delay-Tracker.xlsx",
    `Date,Delay Caused By,What Happened,Timeline Impact,New Expected Date,Client Notified?
2026-08-10,Client,Missing final copywriting for checkout page,+3 business days,2026-08-18,Yes - Email Sent
2026-08-14,Third Party,Stripe account verification pending with bank,+2 business days,2026-08-20,Yes - Slack Update
2026-08-19,Technical Dependency,API endpoint payload schema changed,+1 business day,2026-08-21,Yes - Meeting
`
  );

  // 05_SCOPE_CREEP
  const folder05 = root.folder("05_SCOPE_CREEP");
  folder05?.file(
    "Change-Request.docx",
    `# OFFICIAL CHANGE REQUEST (CR)
==============================

CHANGE REQUEST #: CR-001
PROJECT NAME: [Project Title]
CLIENT: [Client Name]
DATE: [Date]

1. ORIGINAL SCOPE REFERENCE
Original SOW Section 2: "Included Deliverables: Responsive landing page with contact form."

2. REQUESTED CHANGE DESCRIPTION
Client requested adding user authentication, subscription dashboard, and recurring Stripe billing.

3. SCOPE EVALUATION
This functionality was not included in the original signed SOW and represents new architecture.

4. ESTIMATED IMPACT
• Additional Effort: 16 development hours
• Cost Adjustment: +$650 USD
• Timeline Adjustment: +5 business days added to launch schedule

5. AUTHORIZATION
[ ] APPROVED — Proceed with additional work and invoice
[ ] REJECTED — Maintain original scope and timeline

Client Signature: _______________________ Date: _________
Freelancer Signature: ___________________ Date: _________
`
  );

  folder05?.file(
    "Scope-Change-Checklist.pdf",
    `# 🔄 THE 7-STEP SCOPE CREEP CONTROL SYSTEM
===========================================

When the client says: "Can you also add this extra feature?"

Step 1: Is it in the original scope?
        ↓
Step 2: If NO → Create Change Request
        ↓
Step 3: Estimate additional work, cost, and timeline impact
        ↓
Step 4: Send Change Request to client
        ↓
Step 5: Client reviews and approves in writing
        ↓
Step 6: Record approval in Decision Log
        ↓
Step 7: Do the work
`
  );

  // 06_CLIENT_COMMUNICATION
  const folder06 = root.folder("06_CLIENT_COMMUNICATION");
  folder06?.file(
    "30-Client-Scripts.pdf",
    `# 💬 30 COPY-PASTE CLIENT COMMUNICATION SCRIPTS
===============================================

ORGANIZED BY CATEGORY:
1. 💰 Payment (5 scripts)
2. 🔄 Scope Creep (6 scripts)
3. ⏰ Delays & Materials (5 scripts)
4. 👍 Approvals & Confirmations (4 scripts)
5. 🧱 Boundaries & Difficult Situations (5 scripts)
6. 🏁 Closing & Handover (5 scripts)

===================================================================

${SCRIPT_TEMPLATES.map(
  (s, i) => `SCRIPT #${i + 1}: [${s.category.toUpperCase()}] ${s.title}
-------------------------------------------------------------------
SITUATION:
${s.whenToUse || s.scenario}

COPY (READY TO SEND):
${s.friendlyVersion || s.template}

WHY IT WORKS:
${s.whyItWorks || s.proTip}

FIRMER VERSION:
${s.firmVersion || s.professionalVersion || s.template}

===================================================================
`
).join("\n")}
`
  );

  // 07_HANDOVER
  const folder07 = root.folder("07_HANDOVER");
  folder07?.file(
    "Final-Handover-Checklist.pdf",
    `# 🏁 FINAL HANDOVER & DELIVERY CHECKLIST
=======================================

BEFORE FINAL DELIVERY & CREDENTIAL TRANSFER:

[ ] 1. All agreed deliverables completed according to SOW.
[ ] 2. Final approval and staging sign-off requested and received.
[ ] 3. Payment status checked according to agreement (FINAL INVOICE PAID IN FULL).
[ ] 4. All project files, source code, and assets backed up securely.
[ ] 5. Project documentation and user guide prepared.
[ ] 6. Credentials and domain DNS transferred securely.
[ ] 7. Maintenance terms and 14-day warranty support period communicated.
[ ] 8. Project archived and testimonial requested.

GOLDEN RULE: Never transfer live DNS or master credentials until the final payment is cleared in your account.
`
  );

  // 08_AI_TOOLS
  const folder08 = root.folder("08_AI_TOOLS");
  folder08?.file(
    "FreelanceShield-AI-Prompt-Pack.pdf",
    `# 🤖 FREELANCESHIELD AI PROMPT PACK
===================================

Use these engineered system prompts in Gemini, Claude, or ChatGPT to analyze client inquiries and protect your boundaries.

🔒 PRIVACY WARNING: Never paste confidential credentials, API keys, passwords, or client proprietary trade secrets into AI tools.

${AI_PROMPTS.map(
  (p, idx) => `PROMPT #${idx + 1}: ${p.title.toUpperCase()} (${p.category})
${p.description}

SYSTEM PROMPT:
${p.promptText}

EXAMPLE INPUT:
${p.exampleInput}

-------------------------------------------------------------------
`
).join("\n")}
`
  );

  // 09_SCORECARD
  const folder09 = root.folder("09_SCORECARD");
  folder09?.file(
    "100-Point-Protection-Audit.xlsx",
    `Area,Max Points,Status / Criteria,Earned Points,Notes
Client Clarity,15,Business goal identified & single decision maker established,15,Discovery questionnaire completed
Scope Definition,20,Written SOW with itemized deliverables & EXCLUSIONS list,20,Clear boundaries
Payment Structure,20,Deposit cleared upfront & final balance due before handover,20,Milestone-based
Responsibilities,10,Client asset deadlines & feedback speed defined,10,48-hour SLA
Timeline & Milestones,10,Clear milestone schedule with timeline shift clause,10,Protected dates
Approvals & Sign-offs,10,Written approval required at every stage,10,Paper trail enforced
Documentation,10,Decision log & delay tracker maintained,10,Audit trail active
Final Handover,5,Checklist followed & files backed up,5,Secure handover
TOTAL,100,80-100: Strongly Structured | 60-79: Attention Needed | 0-59: Gaps Exist,100,Checklist-based indicator
`
  );

  // 10_BONUSES
  const folder10 = root.folder("10_BONUSES");
  folder10?.file(
    "Complete-Project-Example.pdf",
    `# 🧪 COMPLETE REAL-WORLD CASE STUDY: $1,500 WEBSITE PROJECT
===========================================================

CLIENT: Apex Digital Solutions
PROJECT: B2B Marketing Site + Lead Generation Portal ($1,500)

STEP 1 — CLIENT MESSAGE & INITIAL INQUIRY:
"Hey! We need a clean 4-page site built fast. Can you do it in 2 weeks for $1,500? We want a homepage, services, about, and contact form."

STEP 2 — RISK ANALYSIS & SCREENING:
• Clarity: Good
• Risk Signal: Fast 2-week deadline
• Action: Clarified asset delivery speed and established a 50/50 payment split ($750 upfront / $750 final).

STEP 3 — SCOPE OF WORK & EXCLUSIONS:
• Included: 4 responsive pages, contact form, Tailwind styling, staging deployment.
• Excluded: Custom copywriting, brand logo design, hosting fees, Stripe payments.

STEP 4 — PAYMENT PLAN:
• $750 Deposit paid and cleared before kickoff.
• $750 Final payment due upon staging approval before live DNS switch.

STEP 5 — KICKOFF & MID-PROJECT SCOPE CREEP:
On Day 8, client messaged: "Hey, can you also add a client login portal with PDF downloading?"
• Freelancer checked SOW: NOT in original scope.
• Issued Change Request CR-001: +$450 and +3 days.
• Client approved CR-001 in writing.

STEP 6 — DOCUMENTATION:
• Logged CR approval in Decision Log.
• Recorded 2-day client copy delay in Delay Tracker.

STEP 7 — STAGING & FINAL HANDOVER:
• Staging demo approved by client in writing.
• Final invoice of $1,200 ($750 balance + $450 CR) paid and confirmed in bank.
• Transferred domain DNS and master credentials.
• 14-day warranty activated.

RESULT: Zero disputes, zero unpaid work, $1,950 total revenue earned safely!
`
  );

  // Generate ZIP
  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, "FreelanceShield-Protection-Kit.zip");
  });
}

export function exportTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  saveAs(blob, filename);
}

export function exportCsvFile(filename: string, rows: (string | number)[][]) {
  const csvContent = rows
    .map((row) =>
      row
        .map((cell) => {
          const str = String(cell).replace(/"/g, '""');
          return `"${str}"`;
        })
        .join(",")
    )
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  saveAs(blob, filename);
}

export function triggerPrint() {
  window.print();
}
