import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  convertInchesToTwip,
} from "docx";

const PRIMARY_COLOR = "0F766E"; // Dark emerald
const SECONDARY_COLOR = "334155"; // Slate
const BORDER_COLOR = "CBD5E1"; // Light slate

function createHeader(title: string, subtitle: string) {
  return [
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 100, after: 100 },
      children: [
        new TextRun({
          text: title,
          bold: true,
          size: 32, // 16pt
          color: PRIMARY_COLOR,
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 300 },
      children: [
        new TextRun({
          text: subtitle,
          italics: true,
          size: 20,
          color: SECONDARY_COLOR,
        }),
      ],
    }),
  ];
}

function createSectionHeading(text: string) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 },
    children: [
      new TextRun({
        text: text,
        bold: true,
        size: 24,
        color: PRIMARY_COLOR,
      }),
    ],
  });
}

function createBullet(text: string, boldPrefix?: string) {
  const children: TextRun[] = [];
  if (boldPrefix) {
    children.push(new TextRun({ text: boldPrefix + " ", bold: true, size: 22 }));
  }
  children.push(new TextRun({ text, size: 22, color: "1E293B" }));

  return new Paragraph({
    bullet: { level: 0 },
    spacing: { before: 60, after: 60 },
    children,
  });
}

function createParagraph(text: string, bold?: boolean, italics?: boolean) {
  return new Paragraph({
    spacing: { before: 60, after: 100 },
    children: [
      new TextRun({
        text,
        bold: !!bold,
        italics: !!italics,
        size: 22,
        color: "1E293B",
      }),
    ],
  });
}

function createTable(headers: string[], rows: string[][]): Table {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map(
          (h) =>
            new TableCell({
              shading: { fill: "F1F5F9" },
              margins: { top: 120, bottom: 120, left: 150, right: 150 },
              children: [
                new Paragraph({
                  children: [new TextRun({ text: h, bold: true, size: 20, color: "0F172A" })],
                }),
              ],
            })
        ),
      }),
      ...rows.map(
        (r) =>
          new TableRow({
            children: r.map(
              (c) =>
                new TableCell({
                  margins: { top: 100, bottom: 100, left: 150, right: 150 },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: c, size: 20, color: "334155" })],
                    }),
                  ],
                })
            ),
          })
      ),
    ],
  });
}

// 1. Client Screening Template Docx
export async function generateClientScreeningDocx(): Promise<Uint8Array> {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          ...createHeader(
            "Client & Project Screening Intake Template",
            "FreelanceShield Project Protection Framework"
          ),
          createSectionHeading("1. Client Details & Legal Identity"),
          createParagraph("Use this intake section to verify client information prior to issuing a proposal or statement of work:"),
          createTable(
            ["Field", "Client Information", "Notes / Verification"],
            [
              ["Client Legal Entity", "_______________________________", "Full company name or LLC"],
              ["Primary Contact Person", "_______________________________", "Direct contact phone & email"],
              ["Billing / Tax Address", "_______________________________", "For formal invoicing"],
              ["Designated Approval Authority", "_______________________________", "Single person authorized to sign off"],
            ]
          ),

          createSectionHeading("2. Project Scope & Target Deliverables"),
          createParagraph("Define core requirements clearly to prevent scope ambiguity:"),
          createBullet("Primary Business Goal: __________________________________________________"),
          createBullet("Target Launch Date: _____________________________________________________"),
          createBullet("Approved Budget Allocation: _____________________________________________"),
          createBullet("Key Deliverables (e.g. 4 screens, responsive frontend, API integration): ___________________"),

          createSectionHeading("3. Communication & Operational Governance"),
          createBullet("Agreed Primary Channel: [ ] Email   [ ] Slack   [ ] Client Portal"),
          createBullet("Review Turnaround Commitment: Within 48 business hours of submission"),
          createBullet("Revision Policy: Maximum 2 consolidated feedback rounds per milestone"),
          createBullet("Deposit Requirement: Deposit cleared in bank before kickoff"),

          createParagraph(""),
          createParagraph("Educational Notice: This template is an operational framework to organize project criteria and set expectations. It does not constitute legal counsel.", false, true),
        ],
      },
    ],
  });

  return await Packer.toUint8Array(doc);
}

// 2. Scope of Work Docx
export async function generateScopeOfWorkDocx(): Promise<Uint8Array> {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          ...createHeader(
            "Statement of Work (SOW)",
            "Project Deliverables, Features, Schedule & Payment Terms"
          ),
          createTable(
            ["Project Title", "Client Name", "Freelancer / Agency", "Effective Date"],
            [["[Project Name Here]", "[Client Company Name]", "[Your Studio Name]", "2026-08-30"]]
          ),

          createSectionHeading("1. Project Overview & Objective"),
          createParagraph("This Statement of Work specifies the exact deliverables, technical stack, timeline milestones, and acceptance criteria for the project referenced above."),

          createSectionHeading("2. Included Deliverables"),
          createBullet("Milestone 1 — Discovery & Architecture: Wireframes, component plan, database schema, and project roadmap.", "Deliverable 1:"),
          createBullet("Milestone 2 — Core UI & Application Development: Fully responsive web interface with agreed features.", "Deliverable 2:"),
          createBullet("Milestone 3 — Integrations & Staging QA: Database connection, email/payment gateway, and end-to-end tests.", "Deliverable 3:"),
          createBullet("Milestone 4 — Final Deployment & Handover: Production release, documentation, and credential handover.", "Deliverable 4:"),

          createSectionHeading("3. Screen & Page Count Boundary"),
          createParagraph("The agreed project includes the following distinct views (Total: 4 screens):"),
          createBullet("1. Home / Landing Page with responsive layouts"),
          createBullet("2. Features / Product Overview Screen"),
          createBullet("3. User Dashboard / Main Workspace"),
          createBullet("4. Settings & Account Profile"),

          createSectionHeading("4. Technology Stack"),
          createBullet("Frontend: React, TypeScript, Tailwind CSS"),
          createBullet("Backend / Data: Node.js, Express, PostgreSQL / Firestore"),
          createBullet("Hosting / Infrastructure: Cloud Run / Vercel with SSL"),

          createSectionHeading("5. Revisions & Acceptance"),
          createParagraph("• Up to 2 consolidated rounds of feedback per milestone."),
          createParagraph("• Written sign-off is required upon delivery of each milestone before proceeding to subsequent phases."),

          createSectionHeading("6. Milestone Schedule & Payment Terms"),
          createTable(
            ["Milestone", "Trigger / Deliverable", "Percentage", "Status"],
            [
              ["1. Deposit", "Agreement signing & calendar lock", "40%", "Due Prior to Kickoff"],
              ["2. Midpoint", "Staging demo & core functionality", "30%", "Due Upon Demo Approval"],
              ["3. Handover", "Final sign-off prior to live DNS release", "30%", "Due Before Production Handover"],
            ]
          ),
        ],
      },
    ],
  });

  return await Packer.toUint8Array(doc);
}

// 3. Scope Exclusions Docx
export async function generateScopeExclusionsDocx(): Promise<Uint8Array> {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          ...createHeader(
            "Scope Exclusions Schedule",
            "Explicit 'What is NOT Included' Boundary Document"
          ),
          createParagraph("To ensure complete transparency and prevent scope creep, the following services and items are explicitly excluded from the standard project scope:"),

          createSectionHeading("Explicitly Excluded Items"),
          createBullet("❌ Copywriting and custom marketing text generation (Client must supply finalized copy)."),
          createBullet("❌ Brand identity creation, logo redesign, or print asset formatting."),
          createBullet("❌ Ongoing SEO backlink outreach, pay-per-click ad campaigns, or conversion marketing."),
          createBullet("❌ Monthly domain registration, hosting fees, and third-party SaaS API subscriptions."),
          createBullet("❌ Additional pages, modals, or user workflows beyond the agreed SOW screen list."),
          createBullet("❌ Native mobile applications (iOS / Android) unless specifically contracted."),
          createBullet("❌ Multi-language localization and translation services."),
          createBullet("❌ Ongoing maintenance or feature additions past the 14-day post-launch warranty window."),

          createSectionHeading("Scope Change Procedure"),
          createParagraph("Any requested feature or deliverable not listed in the signed SOW will be handled through a formal written Change Request (CR) with an itemized estimate of cost and timeline impact."),
        ],
      },
    ],
  });

  return await Packer.toUint8Array(doc);
}

// 4. Assumptions Docx
export async function generateAssumptionsDocx(): Promise<Uint8Array> {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          ...createHeader(
            "Project Assumptions & Dependencies Schedule",
            "Mutual Operational Commitments"
          ),
          createSectionHeading("1. Key Working Assumptions"),
          createBullet("Client Asset Delivery: All logos, typography, copywriting, and media assets will be provided within 3 business days of kickoff.", "Assumption 1:"),
          createBullet("Timeline Shift Clause: Any delays in client feedback, credential sharing, or asset delivery will shift the target launch date on a 1:1 business day basis.", "Assumption 2:"),
          createBullet("Third-Party Infrastructure: The client will maintain active ownership and billing for domain registrar, hosting, and API accounts.", "Assumption 3:"),
          createBullet("Designated Decision Maker: The client designates one primary individual authorized to approve deliverables and sign off on milestones.", "Assumption 4:"),
          createBullet("Post-Launch Support: A 14-day bug fix warranty is included post-launch for issues directly related to the agreed SOW.", "Assumption 5:"),
        ],
      },
    ],
  });

  return await Packer.toUint8Array(doc);
}

// 5. Definition of Done Docx
export async function generateDefinitionOfDoneDocx(): Promise<Uint8Array> {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          ...createHeader(
            "Definition of Done (DoD) Quality Standard",
            "Objective Acceptance Criteria for Deliverables"
          ),
          createParagraph("A project milestone or feature is considered officially COMPLETE when all of the following quality criteria are satisfied:"),

          createSectionHeading("Verification Checklist"),
          createBullet("[ ] 1. All agreed functional features are coded and running as specified in the SOW."),
          createBullet("[ ] 2. Layouts are fully responsive across mobile (375px+), tablet (768px+), and desktop (1280px+)."),
          createBullet("[ ] 3. No unresolved console errors, broken links, or broken layout assets."),
          createBullet("[ ] 4. Staging environment demonstration is completed and reviewed by the client."),
          createBullet("[ ] 5. Consolidated 2-round revision feedback has been incorporated."),
          createBullet("[ ] 6. Formal written sign-off is provided by the designated client decision maker."),
          createBullet("[ ] 7. Code is formatted, documented, and pushed to version control."),
        ],
      },
    ],
  });

  return await Packer.toUint8Array(doc);
}

// 6. Change Request Docx
export async function generateChangeRequestDocx(): Promise<Uint8Array> {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          ...createHeader(
            "Official Scope Change Request (CR)",
            "Scope Expansion & Schedule Adjustment Authorization"
          ),
          createTable(
            ["Change Request #", "Date Issued", "Original SOW Date", "Project Title"],
            [["CR-001", "2026-08-30", "2026-08-01", "[Project Name Here]"]]
          ),

          createSectionHeading("1. Description of Requested Change"),
          createParagraph("Client has requested the addition of the following out-of-scope capabilities:"),
          createParagraph("[Detailed description of the new features, extra screens, or custom integrations requested by client]."),

          createSectionHeading("2. Impact on Cost & Timeline"),
          createTable(
            ["Impact Category", "Original Scope", "Adjustment", "Revised Total"],
            [
              ["Estimated Effort", "40 hours", "+16 development hours", "56 total hours"],
              ["Financial Adjustment", "$1,500 USD", "+$650 USD", "$2,150 USD"],
              ["Delivery Schedule", "2026-08-25", "+5 business days", "2026-08-30"],
            ]
          ),

          createSectionHeading("3. Client Authorization & Sign-off"),
          createParagraph("By signing below, the client authorizes the scope change, adjusted fee, and revised timeline:"),
          createParagraph(""),
          createParagraph("Client Authorized Signature: ____________________________ Date: ______________"),
          createParagraph("Freelancer / Studio Signature: __________________________ Date: ______________"),
        ],
      },
    ],
  });

  return await Packer.toUint8Array(doc);
}
