import {
  ScriptItem,
  RedFlagItem,
  DiscoveryQuestionCategory,
  AiPrompt,
  ScorecardCategory,
} from "../types";

export const FIVE_RULES = [
  {
    number: 1,
    title: "Don't start unclear projects.",
    description:
      "Vagueness is a liability that costs you hours of unpaid revisions. If the client cannot define what success looks like, pause until the project objective is documented.",
    icon: "AlertCircle",
  },
  {
    number: 2,
    title: "Define the deliverables & what is NOT included.",
    description:
      "Explicitly list what you will build, and just as importantly, create an explicit exclusions list to protect against assumptions.",
    icon: "FileCheck",
  },
  {
    number: 3,
    title: "Agree on payment terms before work begins.",
    description:
      "Never write code or create designs without an upfront deposit (e.g. 50% or 40/30/30). A clear agreement and appropriate upfront payment can discourage low-commitment projects and reduce ambiguity before work begins.",
    icon: "ShieldAlert",
  },
  {
    number: 4,
    title: "Treat additional work as a change.",
    description:
      "Whenever a client asks for something outside the agreed scope, don't say no and don't work for free—say 'Yes, here is the Change Request with the updated price and timeline.'",
    icon: "Layers",
  },
  {
    number: 5,
    title: "Keep important approvals and decisions documented.",
    description:
      "Confirm verbal agreements, milestone sign-offs, and design approvals in writing (email or portal). Your written paper trail is your ultimate insurance.",
    icon: "FileText",
  },
];

export const WORKFLOW_STEPS = [
  {
    id: "step-1",
    stepNumber: "01",
    phase: "CHECK",
    title: "Screen the Client & Project",
    tagline: "Is this client and project worth your time?",
    description:
      "Run the Client Risk Checklist, check for warning signs, and run discovery questions before submitting a proposal.",
    targetTab: "client_screening" as const,
    keyDeliverables: ["Client Risk Assessment", "Red Flags Guide", "Discovery Questions"],
  },
  {
    id: "step-2",
    stepNumber: "02",
    phase: "DEFINE",
    title: "Lock Down the Scope & Exclusions",
    tagline: "What exactly are you agreeing to build?",
    description:
      "Draft a bulletproof Scope of Work with clear deliverables, explicit NOT INCLUDED items, and a 2-round revision cap.",
    targetTab: "project_protection" as const,
    keyDeliverables: ["Scope of Work (SOW)", "Exclusions Matrix", "Revisions Clause"],
  },
  {
    id: "step-3",
    stepNumber: "03",
    phase: "PROTECT",
    title: "Structure Payments & Milestones",
    tagline: "How do you protect your cashflow and time?",
    description:
      "Set milestone-based payment schedules (Deposit -> Milestone 1 -> Final Handover) with clear due dates and invoicing rules.",
    targetTab: "payment_protection" as const,
    keyDeliverables: ["Milestone Planner", "Deposit Policy", "Payment Reminder Sequence"],
  },
  {
    id: "step-4",
    stepNumber: "04",
    phase: "START",
    title: "Execute the Project Kickoff",
    tagline: "Are you truly ready to begin production?",
    description:
      "Verify that the deposit has cleared, agreements are signed, and all client assets/credentials are received before starting work.",
    targetTab: "bonus_resources" as const,
    keyDeliverables: ["Kickoff Checklist", "Asset Onboarding", "Communication Channels"],
  },
  {
    id: "step-5",
    stepNumber: "05",
    phase: "CONTROL",
    title: "Manage Scope Creep & Changes",
    tagline: "What happens when the client requests more?",
    description:
      "Apply the Scope-Creep Test. If outside scope, issue a professional Change Request (CR) with price + timeline adjustment.",
    targetTab: "scope_creep" as const,
    keyDeliverables: ["Change Request Form (CR)", "Scope Creep Scripts", "Pricing Matrix"],
  },
  {
    id: "step-6",
    stepNumber: "06",
    phase: "DOCUMENT",
    title: "Track Approvals & Delays",
    tagline: "What records should you keep on file?",
    description:
      "Log client sign-offs, track waiting days for missing materials, and send proactive delay notices to protect your deadline.",
    targetTab: "project_records" as const,
    keyDeliverables: ["Project Activity Log", "Client Delay Tracker", "Evidence Checklist"],
  },
  {
    id: "step-7",
    stepNumber: "07",
    phase: "FINISH",
    title: "Final Delivery & Safe Handover",
    tagline: "How do you close the project cleanly?",
    description:
      "Receive final payment BEFORE releasing master credentials/production code, obtain written completion sign-off, and offer maintenance.",
    targetTab: "bonus_resources" as const,
    keyDeliverables: ["Final Delivery Checklist", "Handover Protocol", "Testimonial Request"],
  },
];

export const RED_FLAGS: RedFlagItem[] = [
  {
    id: "rf-1",
    quote: "“We'll figure out the details as we go along.”",
    category: "Scope Risk",
    riskSeverity: "high",
    potentialRisk: "Unclear scope, unbounded revisions, and perpetual goalpost moving.",
    whyItMatters:
      "Undefined requirements make it impossible to determine whether a future client request was part of the original project or is an unpaid extra.",
    recommendedResponse:
      "“I'd love to help you bring this to life! Before we begin, let's document the exact deliverables, revision limits, timeline, and explicit exclusions so we are both 100% aligned on expectations.”",
  },
  {
    id: "rf-2",
    quote: "“Just build it first, and we'll discuss payment afterward.”",
    category: "Payment Risk",
    riskSeverity: "critical",
    potentialRisk: "High likelihood of delayed payment, renegotiation under pressure, or non-payment.",
    whyItMatters:
      "Once you hand over your time and code without a deposit or contract, you lose all leverage. Legitimate clients expect standard commercial terms.",
    recommendedResponse:
      "“My standard project process requires a 50% deposit and a signed project scope prior to scheduling development. This reserves dedicated time on my calendar and protects our mutual timeline.”",
  },
  {
    id: "rf-3",
    quote: "“This should only take you like 10 minutes / 2 hours max.”",
    category: "Communication Risk",
    riskSeverity: "high",
    potentialRisk: "Devaluation of technical labor and micromanagement.",
    whyItMatters:
      "Clients who minimize technical complexity usually overlook architecture, responsive testing, edge cases, deployment, and QA, leading to friction when unforeseen complexities arise.",
    recommendedResponse:
      "“While the visual change looks simple, implementing it reliably requires updating the underlying codebase, testing cross-browser responsiveness, and QA. I estimate it requires [X] hours to deliver safely.”",
  },
  {
    id: "rf-4",
    quote: "“Our previous 3 freelancers were terrible and couldn't deliver.”",
    category: "Client Risk",
    riskSeverity: "high",
    potentialRisk: "Chronic communication breakdown, shifting expectations, or micromanagement.",
    whyItMatters:
      "When multiple previous freelancers 'failed', the common denominator is often an unstructured client who provides vague instructions, withholds feedback, or refuses to pay.",
    recommendedResponse:
      "“I'm sorry to hear about that experience. To ensure our collaboration runs smoothly, I use a structured milestone process where every deliverable is approved in writing before moving to the next stage.”",
  },
  {
    id: "rf-5",
    quote: "“We don't have budget right now, but there will be huge exposure and future work.”",
    category: "Payment Risk",
    riskSeverity: "critical",
    potentialRisk: "Uncompensated speculative labor disguised as opportunity.",
    whyItMatters:
      "Exposure does not pay your bills. Clients who promise 'future work' for free current work rarely follow through once the deliverable is handed over.",
    recommendedResponse:
      "“I appreciate you thinking of me for this vision. I don't work on speculative or discounted terms, but I would be happy to tailor a phased Phase 1 scope that fits within your immediate available budget.”",
  },
  {
    id: "rf-6",
    quote: "“Can you do a quick free custom demo/sample so we can see your style?”",
    category: "Scope Risk",
    riskSeverity: "medium",
    potentialRisk: "Free spec work without commitment.",
    whyItMatters:
      "Your portfolio, case studies, and code samples demonstrate your ability. Doing custom unpaid design or coding devalues your expertise.",
    recommendedResponse:
      "“I don't produce custom spec work before a contract is in place, but you can explore my verified portfolio and case studies here: [Portfolio Link]. If you'd like a paid initial discovery sprint, we can set that up!”",
  },
  {
    id: "rf-7",
    quote: "“We need this launched by Monday! (Contacting on Friday afternoon)”",
    category: "Timeline Risk",
    riskSeverity: "high",
    potentialRisk: "Chaotic rush job with rushed testing, high stress, and blame for existing client delays.",
    whyItMatters:
      "Urgent deadlines without proper discovery lead to compromised code quality and missed expectations. Emergency schedules require a rush fee and strict boundaries.",
    recommendedResponse:
      "“I can accommodate an expedited timeline for this project. To meet a Monday launch, an expedited rush fee of [X%] applies, and we will need all assets, credentials, and written scope sign-off by [Time] today.”",
  },
  {
    id: "rf-8",
    quote: "“Let's just chat on WhatsApp/Telegram at all hours instead of email.”",
    category: "Communication Risk",
    riskSeverity: "medium",
    potentialRisk: "Boundary degradation, lost decision trails, and constant interruptions.",
    whyItMatters:
      "Scattered chat messages across personal apps make it difficult to retrieve formal approvals when disputes occur.",
    recommendedResponse:
      "“To keep all project decisions organized and documented in one place, I centralize all project communication via email / [Project Portal]. My standard response window is within 24 hours during business hours.”",
  },
];

export const DISCOVERY_CATEGORIES: DiscoveryQuestionCategory[] = [
  {
    id: "project_core",
    name: "Project Core & Objectives",
    icon: "Target",
    description: "Clarify the true business goal, target audience, and primary success metrics.",
    questions: [
      "What is the primary business problem this project is designed to solve?",
      "Who is the exact end-user or customer who will interact with this deliverable?",
      "What are the top 3 must-have features required for the Version 1.0 release?",
      "What does success look like 30 days after launch (e.g. conversions, speed, leads)?",
      "Are there reference websites, competitors, or products whose functionality or aesthetic you admire?",
      "Is there an existing system or legacy code we are replacing or upgrading?",
    ],
  },
  {
    id: "content_assets",
    name: "Content, Brand & Assets",
    icon: "Image",
    description: "Prevent timeline bottlenecks by defining exactly who provides copy, images, and brand assets.",
    questions: [
      "Who will be responsible for providing the written copywriting for all pages/screens?",
      "Do you have high-resolution brand assets (vector logo, color palette, typography guidelines)?",
      "Who is supplying the photography, product images, illustrations, or video assets?",
      "Are all required text and visual assets ready today, or are they currently being produced?",
      "Do you require custom iconography or licensed stock photography included in the quote?",
    ],
  },
  {
    id: "technical_infra",
    name: "Technical & Infrastructure",
    icon: "Cpu",
    description: "Uncover third-party integrations, hosting accounts, and technical constraints early.",
    questions: [
      "Do you already have hosting, a registered domain name, and DNS access?",
      "What third-party APIs, payment gateways (Stripe, PayPal), or CRMs need to be integrated?",
      "Are there specific tech stack requirements (e.g. React, Node, WordPress, Shopify, Next.js)?",
      "What level of mobile responsiveness and browser support (modern evergreen vs legacy) is required?",
      "Do you need a Content Management System (CMS) so your internal team can edit content later?",
    ],
  },
  {
    id: "approvals_governance",
    name: "Approvals & Stakeholders",
    icon: "Users",
    description: "Identify the final decision-maker and establish expected feedback turnaround windows.",
    questions: [
      "Who is the single designated point of contact with final approval authority for this project?",
      "Are there other stakeholders, legal reviewers, or committee members who must review deliverables?",
      "Can your team commit to reviewing submitted milestones within a 48-hour feedback turnaround?",
      "How do you prefer to conduct milestone sign-offs (written email confirmation vs portal)?",
    ],
  },
  {
    id: "timeline_milestones",
    name: "Timeline & Key Dates",
    icon: "Calendar",
    description: "Distinguish between flexible targets and hard marketing or event launch deadlines.",
    questions: [
      "Is there a fixed, immovable launch deadline driven by an event, marketing campaign, or funding date?",
      "What is your preferred project start date?",
      "Are there any planned team holidays or blackout periods during the scheduled project duration?",
      "If unforeseen client asset delays occur, what is the priority: maintaining launch date (with reduced scope) or maintaining full scope (with shifted date)?",
    ],
  },
  {
    id: "budget_billing",
    name: "Budget & Commercial Terms",
    icon: "CreditCard",
    description: "Ensure economic alignment and billing expectations before drafting a proposal.",
    questions: [
      "What is the approved budget range allocated for this initiative ($X,000 – $Y,000)?",
      "Are you comfortable with our standard commercial structure (50% upfront deposit, 50% upon milestone completion)?",
      "Do you have standard vendor invoicing requirements (e.g. Purchase Orders, tax forms W-9/VAT)?",
      "Will this project require an ongoing monthly maintenance retainer following final delivery?",
    ],
  },
];

export const SCRIPT_TEMPLATES: ScriptItem[] = [
  // 1. Payment Scripts (5)
  {
    id: "pay-1",
    category: "payment",
    categoryLabel: "Payment",
    title: "Requesting Upfront Deposit",
    scenario: "Sent immediately upon contract signing to initiate the project schedule.",
    template: `Hi [Client Name],

Thank you for confirming the project agreement for [Project Name]!

To lock in our start date on the production calendar and begin development, please find the invoice for the [Deposit Amount / 50%] upfront deposit attached below:

• Project: [Project Name]
• Deposit Due: [Deposit Amount]
• Payment Link / Invoice: [Invoice Link / Bank Details]

As outlined in our Scope of Work, work will begin immediately upon receipt of the deposit. Please let me know once processed, and I'll send over the project kickoff onboarding link!

Best regards,
[Your Name]`,
    proTip: "Never schedule working hours or begin technical discovery until the deposit funds clear.",
    tags: ["deposit", "invoice", "kickoff"],
  },
  {
    id: "pay-2",
    category: "payment",
    categoryLabel: "Payment",
    title: "Gentle Milestone Payment Reminder (Due in 3 Days)",
    scenario: "Proactive, polite reminder before a scheduled milestone payment date.",
    template: `Hi [Client Name],

I hope you're having a productive week!

We've completed the agreed [Milestone Name, e.g., Phase 1 UI Design / API Integration], and everything is currently on track for our next phase.

As a quick heads-up, Milestone Invoice #[Invoice Number] for [Amount] is scheduled for [Due Date]. You can review and settle the invoice here: [Invoice Link].

Once confirmed, we will seamlessly transition into [Next Milestone Phase]. Please let me know if you need any additional billing documentation from my side!

Best regards,
[Your Name]`,
    proTip: "Friendly reminders 3 days ahead of time prevent accounting delays and maintain positive rapport.",
    tags: ["reminder", "milestone", "polite"],
  },
  {
    id: "pay-3",
    category: "payment",
    categoryLabel: "Payment",
    title: "Firm Overdue Payment Notice",
    scenario: "Sent when an invoice is 3–5+ days past due.",
    template: `Hi [Client Name],

I'm following up on Invoice #[Invoice Number] for [Amount] regarding [Project Name], which was due on [Due Date] and is currently past due.

To ensure our project timeline remains on schedule without interruption, please arrange for payment today using the link below:

• Settle Invoice: [Payment Link]

Per our agreement terms, active work on [Next Phase / Production Deployment] is temporarily paused until outstanding invoices are up to date. Once payment is confirmed, we'll immediately resume.

Thank you for your prompt attention to this matter!

Best regards,
[Your Name]`,
    proTip: "Be firm, calm, and objective. Pausing active labor when unpaid prevents cumulative uncollectible debt.",
    tags: ["overdue", "paused", "firm"],
  },
  {
    id: "pay-4",
    category: "payment",
    categoryLabel: "Payment",
    title: "Final Handover Payment Before Asset Release",
    scenario: "Informing the client that final balance is required before transferring live credentials/code.",
    template: `Hi [Client Name],

Great news! All deliverables for [Project Name] have passed final QA testing and are ready for official handover.

You can preview the completed staging version here: [Staging URL].

As specified in our project contract, final credentials, source code repository access, and live domain deployment will be transferred upon settlement of the final balance:

• Final Balance Due: [Final Amount]
• Invoice Link: [Payment Link]

As soon as the invoice is settled, I will immediately execute the live DNS transfer and send over your complete documentation package.

Thank you for a fantastic collaboration on this project!

Best regards,
[Your Name]`,
    proTip: "Never hand over root server credentials, master Git repository push rights, or un-watermarked assets before final payment.",
    tags: ["handover", "final balance", "staging"],
  },
  {
    id: "pay-5",
    category: "payment",
    categoryLabel: "Payment",
    title: "Declining Request to Defer Payment to Post-Launch",
    scenario: "Client requests to delay milestone payment until after marketing launch.",
    template: `Hi [Client Name],

I understand you'd like to align the final milestone with your marketing launch date.

However, our signed agreement establishes milestone payments based on the completion of technical deliverables rather than external business events. Since all agreed Phase [X] features have been delivered and verified, the milestone invoice of [Amount] remains due on [Due Date].

I'm fully committed to supporting your upcoming launch! Sticking to our agreed payment schedule allows me to keep dedicated calendar capacity reserved for your launch week.

Thank you for understanding, and I look forward to wrapping up this milestone!

Best regards,
[Your Name]`,
    proTip: "Link your pay to the completion of your deliverables, not the client's internal marketing calendar.",
    tags: ["boundary", "milestone", "launch"],
  },

  // 2. Scope Creep Scripts (5)
  {
    id: "scope-1",
    category: "scope",
    categoryLabel: "Scope Creep",
    title: "Client Requests an Unplanned Extra Feature",
    scenario: "Client casually asks for a new feature not included in the original Scope of Work.",
    template: `Hi [Client Name],

Happy to add this! I reviewed this request against our agreed Scope of Work, and [Requested Feature, e.g., Multi-currency Stripe checkout] was not part of the original project deliverables.

I would love to build this for you. I've prepared a brief Change Request (CR) covering the additional specifications:

• Additional Feature: [Requested Feature]
• Investment: [Price, e.g., $450]
• Timeline Adjustment: +[X] business days

You can review and approve the Change Request here: [CR Link / Attached]. Once approved, I'll incorporate it directly into our current sprint!

Best regards,
[Your Name]`,
    proTip: "Never start with 'No'—start with 'Happy to add this, here is the Change Request!' It frames you as helpful while protecting your time.",
    tags: ["change request", "extra feature", "upsell"],
  },
  {
    id: "scope-2",
    category: "scope",
    categoryLabel: "Scope Creep",
    title: "Responding to “It's Just a Small / Quick Change”",
    scenario: "Client downplays the technical effort of an out-of-scope addition.",
    template: `Hi [Client Name],

I completely understand why this seems like a quick adjustment on the surface!

Behind the scenes, implementing [Requested Change] requires modifying the database schema, updating the API endpoints, and running regression tests to ensure existing features don't break.

Because this falls outside our agreed Phase 1 scope, we have two great options:

1. Option A: Include it now via a quick Change Request for [Price] (+[X] days to timeline).
2. Option B: Log it on our Phase 2 enhancement backlog and launch Phase 1 on our original schedule and budget.

Let me know which option you prefer!

Best regards,
[Your Name]`,
    proTip: "Offering two structured options gives the client control while defending your financial boundaries.",
    tags: ["small change", "options", "phase 2"],
  },
  {
    id: "scope-3",
    category: "scope",
    categoryLabel: "Scope Creep",
    title: "Included Revision Limit Reached (2 Rounds Complete)",
    scenario: "Client asks for a third or fourth round of design/code tweaks after 2 agreed rounds.",
    template: `Hi [Client Name],

Thank you for your feedback!

With the updates delivered yesterday, we have successfully completed the 2 complimentary revision rounds included in our Scope of Work.

I'm happy to continue refining [Feature / Page Name] based on your new notes! Additional revisions are billed at my standard rate of [$Rate/hr] (or a flat package of [$Amount] for this batch).

Please confirm if you'd like me to proceed with these additional tweaks under that rate, and I'll get them scheduled right away.

Best regards,
[Your Name]`,
    proTip: "Enforcing revision limits early prevents endless minor design iterations that erode your hourly rate.",
    tags: ["revisions", "hourly rate", "cap"],
  },
  {
    id: "scope-4",
    category: "scope",
    categoryLabel: "Scope Creep",
    title: "Client Fundamental Requirements Pivot Mid-Project",
    scenario: "Client changes core architecture or design direction after previous approval.",
    template: `Hi [Client Name],

Thank you for sharing this updated direction for [Project Name].

Because this represents a significant shift from the previously approved wireframes and architectural brief, continuing in this direction will require restructuring previously completed work.

To handle this cleanly without confusion:
1. I will pause development on the affected modules.
2. I will draft an updated Scope of Work and Timeline reflecting the rework required.
3. We will credit unused hours from the original scope toward the new plan.

I'll send over the updated Change Proposal by [Date/Time] so we can review together.

Best regards,
[Your Name]`,
    proTip: "Always pause work immediately when a client pivots to prevent writing throwaway code.",
    tags: ["pivot", "restructure", "pause"],
  },
  {
    id: "scope-5",
    category: "scope",
    categoryLabel: "Scope Creep",
    title: "Client Asks for Extra Pages / Screens",
    scenario: "Client assumes adding 3 more pages is covered under the flat project fee.",
    template: `Hi [Client Name],

I noticed you'd like to add [Page Names, e.g. FAQ, Case Studies, and Careers pages] to the site.

Our original agreement included [Number] core pages ([List Pages]). Adding these [X] extra pages is very straightforward—each additional page is [$Amount] including responsive design and CMS hookup (+[X] days to timeline).

Would you like me to send a Change Request for all [X] pages, or should we prioritize one specific page for our initial launch?

Best regards,
[Your Name]`,
    proTip: "Be specific about what was originally contracted vs what is new.",
    tags: ["extra pages", "flat fee", "addon"],
  },

  // 3. Delays & Missing Materials (5)
  {
    id: "delay-1",
    category: "delays",
    categoryLabel: "Delays & Materials",
    title: "Waiting for Missing Client Content / Assets",
    scenario: "Project is stalled because client hasn't provided copy, logos, or imagery.",
    template: `Hi [Client Name],

I hope you're having a great week!

I'm currently at a stage where I need the following items to proceed with [Next Milestone / Page Build]:

• [Item 1, e.g., Final Copywriting for Services page]
• [Item 2, e.g., High-resolution SVG logo]
• [Item 3, e.g., Stripe API production keys]

To maintain our targeted completion date of [Target Date], please send these materials over by [Due Date].

If you need extra time to gather these, no problem at all! We will simply adjust the final launch date accordingly once the assets are received.

Best regards,
[Your Name]`,
    proTip: "Explicitly connecting missing assets to a shifted launch date protects you from being blamed for delays.",
    tags: ["assets", "copy", "timeline"],
  },
  {
    id: "delay-2",
    category: "delays",
    categoryLabel: "Delays & Materials",
    title: "Milestone Approval Delay Notice (Impact on Deadline)",
    scenario: "Client takes over 5 days to approve a submitted milestone review.",
    template: `Hi [Client Name],

I'm checking in on the [Milestone Name, e.g., Homepage Interactive Prototype] submitted for your review on [Submission Date].

Because our project timeline relies on a 48-hour feedback turnaround to maintain dedicated calendar availability, our target delivery date has moved from [Old Date] to [New Date] to account for the review window.

Once you have a chance to review and provide sign-off here: [Review Link], I will lock in the updated production schedule for our next phase.

Looking forward to your thoughts!

Best regards,
[Your Name]`,
    proTip: "Document every feedback delay in writing to prevent end-of-project delivery disputes.",
    tags: ["approval delay", "shifted date", "calendar"],
  },
  {
    id: "delay-3",
    category: "delays",
    categoryLabel: "Delays & Materials",
    title: "Unresponsive Client (Ghosting) — Day 7 Follow-Up",
    scenario: "Client has not responded to emails or messages for a full week during active project.",
    template: `Hi [Client Name],

I haven't heard back from you since my message on [Date] regarding [Project Name / Pending Approval].

I want to make sure everything is okay on your end! 

Because I haven't received the required feedback/assets to proceed, I have temporarily paused active work on [Project Name] and released our daily sprint slot to avoid billing idle time.

Whenever you are ready to resume, please let me know and we will look at available schedule openings to restart.

Best regards,
[Your Name]`,
    proTip: "Releasing their calendar slot communicates that your time has value without being hostile.",
    tags: ["ghosting", "pause project", "unresponsive"],
  },
  {
    id: "delay-4",
    category: "delays",
    categoryLabel: "Delays & Materials",
    title: "Client Unresponsive (Day 21 Dormant Project Notice)",
    scenario: "Client has been silent for 3+ weeks; formal dormant status notice.",
    template: `Hi [Client Name],

I'm writing to provide a formal update regarding [Project Name]. We have been on pause since [Date] awaiting [Pending Items].

Per our project agreement, projects that remain inactive for more than 14 days without communication are moved to Dormant Status.

To reactivate the project when you're ready:
1. Settle any outstanding milestone invoices for work completed to date.
2. Provide the pending materials.
3. We will establish a new delivery timeline based on current calendar availability (a standard reactivation fee of [$Amount] may apply).

I hope all is well, and I look forward to reconnecting when your schedule allows.

Best regards,
[Your Name]`,
    proTip: "A dormant clause prevents clients from showing up 6 months later demanding immediate overnight delivery.",
    tags: ["dormant", "reactivation", "formal"],
  },
  {
    id: "delay-5",
    category: "delays",
    categoryLabel: "Delays & Materials",
    title: "Missing Third-Party Credentials / Server Access",
    scenario: "Client promised AWS/Shopify/domain access but hasn't delivered login details.",
    template: `Hi [Client Name],

I'm ready to begin the deployment setup for [Project Name]!

To proceed, I will need access to:
• [Hosting / Server Provider, e.g. Vercel / AWS / cPanel]
• [Domain Registrar DNS credentials]

For maximum security, please share these credentials via an encrypted password manager link (such as 1Password / Bitwarden) or invite my email ([Your Email]) as a collaborator.

Work on this phase will begin as soon as access is verified. Thank you!

Best regards,
[Your Name]`,
    proTip: "Always recommend secure collaborator invites over plain text passwords.",
    tags: ["credentials", "security", "access"],
  },

  // 4. Approvals & Confirmations (5)
  {
    id: "appr-1",
    category: "approvals",
    categoryLabel: "Approvals",
    title: "Requesting Design Milestone Sign-Off",
    scenario: "Design is finished and requires formal written client approval before coding begins.",
    template: `Hi [Client Name],

The design phase for [Project Name] is complete! You can review the interactive prototypes here:

• Figma / Prototype Link: [URL]
• Summary of Included Screens: [List Screens]

Please review and reply with your written approval:
“I approve the design as presented, and authorize development to begin.”

Once this approval is received, the visual layout is locked and we will start coding. Any subsequent layout changes requested after this point will be handled via a Change Request.

Looking forward to your sign-off!

Best regards,
[Your Name]`,
    proTip: "Getting explicit written approval before coding saves dozens of hours of redesign rework.",
    tags: ["design sign-off", "milestone", "lock"],
  },
  {
    id: "appr-2",
    category: "approvals",
    categoryLabel: "Approvals",
    title: "Confirming Verbal Phone / Zoom Call Decisions in Writing",
    scenario: "Sent immediately after a phone call to establish a clear paper trail.",
    template: `Hi [Client Name],

Thank you for taking the time to speak today! 

To make sure we're 100% aligned, here is a quick written summary of the key decisions we agreed on during our call:

1. [Decision 1, e.g. We will proceed with the 2-step checkout flow instead of 1-step]
2. [Decision 2, e.g. You will provide final product CSV data by Thursday]
3. [Decision 3, e.g. The additional filtering feature is deferred to Phase 2]

If everything looks accurate, please reply with a quick “Confirmed” or let me know if anything needs adjustment.

Best regards,
[Your Name]`,
    proTip: "Always recap verbal calls. If a decision isn't in writing, it doesn't exist in a dispute.",
    tags: ["paper trail", "call recap", "written record"],
  },
  {
    id: "appr-3",
    category: "approvals",
    categoryLabel: "Approvals",
    title: "Requesting Final Staging Acceptance Sign-Off",
    scenario: "Code is built on staging server; client must verify before production launch.",
    template: `Hi [Client Name],

Development and internal QA for [Project Name] are complete! 

Please test the staging build here:
• Staging Environment: [Staging URL]
• Test Credentials: [If applicable]

Please run through your acceptance checklist and confirm that all items listed in our Scope of Work meet your satisfaction.

Once you reply with your formal sign-off, we will process the final milestone invoice and execute the live production deployment!

Best regards,
[Your Name]`,
    proTip: "Require acceptance on staging before deploying to live domains.",
    tags: ["staging", "acceptance", "final QA"],
  },
  {
    id: "appr-4",
    category: "approvals",
    categoryLabel: "Approvals",
    title: "Confirming Change Request Approval in Writing",
    scenario: "Client verbally agreed to a paid Change Request; documenting approval.",
    template: `Hi [Client Name],

Thank you for approving Change Request #[CR Number] ([Feature Name]) for [Price] and +[X] timeline days.

I have updated our master project tracking records:
• Master Scope: Updated to include [Feature Name]
• New Completion Target: [Updated Date]
• CR Invoice: Settle via [Payment Link]

Development on this new item has been queued into our active sprint. Thank you for your swift decision!

Best regards,
[Your Name]`,
    proTip: "Send a confirmation receipt for every approved change order.",
    tags: ["change order", "receipt", "tracking"],
  },
  {
    id: "appr-5",
    category: "approvals",
    categoryLabel: "Approvals",
    title: "Confirming Project Requirements Baseline",
    scenario: "Sent at the end of discovery before writing the contract.",
    template: `Hi [Client Name],

Based on our discovery workshops, I have compiled the official Project Requirements Baseline document attached below.

This document defines the functional requirements, user stories, technical architecture, and explicit project boundaries.

Please review and confirm if this accurately captures your vision so I can issue our final Scope of Work agreement!

Best regards,
[Your Name]`,
    proTip: "Baseline documents eliminate misunderstandings before legal agreements are signed.",
    tags: ["baseline", "discovery", "requirements"],
  },

  // 5. Difficult Clients & Boundaries (5)
  {
    id: "diff-1",
    category: "difficult",
    categoryLabel: "Difficult Situations",
    title: "Client Demands Unrealistic Instant Turnaround",
    scenario: "Client demands major work done in 24 hours without prior notice.",
    template: `Hi [Client Name],

I understand this deliverable is a high priority for your team.

Delivering [Requested Work] with proper quality and testing typically takes [X] business days. Delivering this in 24 hours would require pausing scheduled work for other committed clients and working overtime.

We can accommodate this emergency request with an expedited rush fee of [$Amount], delivering by [Time Tomorrow]. Otherwise, I can deliver it with our standard quality assurance by [Normal Date] at no extra cost.

Please let me know which path you'd like to take!

Best regards,
[Your Name]`,
    proTip: "Make rush turnaround an expensive option rather than a free obligation.",
    tags: ["rush", "deadline", "urgent"],
  },
  {
    id: "diff-2",
    category: "difficult",
    categoryLabel: "Difficult Situations",
    title: "Addressing Aggressive or Disrespectful Communication",
    scenario: "Client sends an emotional, aggressive, or rude email.",
    template: `Hi [Client Name],

I received your email regarding [Topic]. I want to ensure we resolve any concerns thoroughly and get the project to the finish line successfully.

To collaborate effectively, it's important that our communication remains professional and focused on actionable technical solutions. 

Regarding your specific feedback on [Feature/Issue]:
• Issue 1: [Objective explanation / solution]
• Issue 2: [Next step]

Let's align on these concrete steps so we can continue making great progress.

Best regards,
[Your Name]`,
    proTip: "Never mirror emotional aggression. Strip the emotion, address the factual technical issue, and enforce basic respect.",
    tags: ["professionalism", "boundaries", "de-escalation"],
  },
  {
    id: "diff-3",
    category: "difficult",
    categoryLabel: "Difficult Situations",
    title: "Setting Boundaries on Late Night / Weekend Messages",
    scenario: "Client messages your personal phone or WhatsApp on Saturday evening expecting instant replies.",
    template: `Hi [Client Name],

Thanks for your message! 

My active working hours are Monday through Friday, 9:00 AM to 5:00 PM [Timezone]. I have received your notes regarding [Topic] and have added them to my priority list for Monday morning.

To keep all project requests documented and tracked, please submit all future updates via [Email / Trello / Jira].

Have a great weekend, and I'll update you on Monday!

Best regards,
[Your Name]`,
    proTip: "Teach clients how to treat your off-hours by not fulfilling requests outside agreed business windows.",
    tags: ["off-hours", "weekends", "channels"],
  },
  {
    id: "diff-4",
    category: "difficult",
    categoryLabel: "Difficult Situations",
    title: "Client Refuses to Sign Change Request But Expects Work",
    scenario: "Client insists you do extra work under the existing contract without signing the CR.",
    template: `Hi [Client Name],

I understand you'd prefer to proceed without an additional Change Request.

However, my project management policy requires an approved Change Request and settled deposit for any features beyond our signed Scope of Work. This ensures all work is properly budgeted, tested, and scheduled.

To keep our project moving forward without delay, I will continue building the remaining agreed items in our current scope. If you decide you'd like to add [Feature Name] later, we can execute that Change Request at any time.

Best regards,
[Your Name]`,
    proTip: "Proceed with original scope while leaving the door open for paid changes.",
    tags: ["refusal", "policy", "firm"],
  },
  {
    id: "diff-5",
    category: "difficult",
    categoryLabel: "Difficult Situations",
    title: "Managing Multiple Stakeholders Giving Contradictory Feedback",
    scenario: "Two people from the client's team give conflicting instructions.",
    template: `Hi [Client Name],

I've received feedback from both [Person A] (requesting [X]) and [Person B] (requesting [Y]).

Because these two directions conflict with one another, I want to pause implementation on this section to prevent rework.

Please have your team consolidate feedback through our designated primary point of contact and provide a single unified direction by [Date]. Once received, I'll implement the approved approach!

Best regards,
[Your Name]`,
    proTip: "Never take sides in internal client politics. Require one unified voice.",
    tags: ["stakeholders", "conflicting feedback", "consolidation"],
  },

  // 6. Closing & Handover (5)
  {
    id: "close-1",
    category: "closing",
    categoryLabel: "Closing & Handover",
    title: "Project Completion & Final Handover Protocol",
    scenario: "All deliverables done, final balance paid, transferring master assets.",
    template: `Hi [Client Name],

Congratulations! [Project Name] is officially live and complete! 🚀

Here is your complete Master Handover Package:
• Production URL: [Live Website / App Link]
• Master Credentials & Access: [Secure Link / Vault]
• Documentation & User Guide: [Docs Link]
• Source Code Repository: [GitHub / GitLab Link]

As agreed, your 14-day post-launch warranty window is now active through [Warranty End Date] for any bug fixes covered under our original scope.

It has been an absolute pleasure working together on this!

Best regards,
[Your Name]`,
    proTip: "A 14-day warranty period gives clients peace of mind while setting a clear cutoff date.",
    tags: ["completion", "handover", "warranty"],
  },
  {
    id: "close-2",
    category: "closing",
    categoryLabel: "Closing & Handover",
    title: "Requesting a Testimonial / Video Review",
    scenario: "Sent right after a successful launch when client satisfaction is at its peak.",
    template: `Hi [Client Name],

I'm thrilled with how [Project Name] turned out, and I hope you are already seeing great results from the launch!

If you enjoyed our collaboration, would you be willing to share a short 2-3 sentence testimonial? It helps other clients feel confident when hiring me.

If it helps, here are 3 quick prompts:
1. What was your biggest challenge before we started?
2. How was your experience with our communication and delivery process?
3. What results or feedback have you received since launch?

You can drop your reply right here, or submit it on [LinkedIn / Google Reviews Link]. Thank you so much!

Best regards,
[Your Name]`,
    proTip: "Giving clients 3 guiding prompts makes writing a testimonial effortless for them.",
    tags: ["testimonial", "review", "social proof"],
  },
  {
    id: "close-3",
    category: "closing",
    categoryLabel: "Closing & Handover",
    title: "Pitching an Ongoing Monthly Retainer / Maintenance Plan",
    scenario: "Transitioning a one-off project into predictable recurring monthly revenue.",
    template: `Hi [Client Name],

Now that [Project Name] is live in production, regular updates, security monitoring, and server maintenance are essential to keep everything running fast and securely.

To ensure you don't have to worry about technical upkeep, I offer an ongoing Care & Retainer Package:

🛡️ The Monthly Retainer Package includes:
• Core software, CMS, and dependency security updates
• Daily automated off-site cloud backups
• Uptime & performance monitoring (24/7)
• [X] hours of reserved monthly dev time for new features/tweaks
• Priority 24-hour turnaround on support tickets

The investment is [$Amount/month], billed on the 1st of each month. 

I only offer this to [X] select clients each quarter. Let me know if you'd like me to reserve your maintenance slot for next month!

Best regards,
[Your Name]`,
    proTip: "Sell peace of mind and priority access to convert one-off clients into steady recurring retainers.",
    tags: ["retainer", "maintenance", "recurring"],
  },
  {
    id: "close-4",
    category: "closing",
    categoryLabel: "Closing & Handover",
    title: "Requesting Referrals from a Happy Client",
    scenario: "Asking for introductions to other founders or business owners.",
    template: `Hi [Client Name],

I hope the new [Project Name] is performing wonderfully for your business!

Most of my new client projects come through word-of-mouth recommendations from great clients like you. Do you know of 1 or 2 other founders, marketing directors, or business owners who might be looking for [Your Skill, e.g. a reliable developer/designer]?

If someone comes to mind, feel free to introduce us over email or pass along my portfolio: [Portfolio Link].

I always prioritize referrals from existing clients!

Best regards,
[Your Name]`,
    proTip: "Asking for exactly 1 or 2 specific contacts triggers mental recall far better than a vague request.",
    tags: ["referrals", "networking", "growth"],
  },
  {
    id: "close-5",
    category: "closing",
    categoryLabel: "Closing & Handover",
    title: "Formal Project Closure & Offboarding Sign-Off",
    scenario: "Official sign-off stating all contractual obligations have been fulfilled.",
    template: `Hi [Client Name],

This email serves as our official Project Closure Notice for [Project Name].

As of today, [Date]:
• All contractual deliverables in SOW #[Number] have been completed and verified.
• All milestone invoices have been settled in full.
• Root ownership and administrative credentials have been transferred to your team.

Thank you again for the wonderful partnership throughout this project! I look forward to supporting your future ventures.

Best regards,
[Your Name]`,
    proTip: "A formal closure notice legally concludes your contractual duties and prevents unbillable post-project creep.",
    tags: ["offboarding", "formal notice", "closure"],
  },
];

export const AI_PROMPTS: AiPrompt[] = [
  {
    id: "ai-p1",
    title: "Prompt #1 — Client Risk Analysis",
    category: "Screening & Risk",
    description: "Evaluates inbound client emails or messages for subtle payment risks, scope ambiguity, and timeline traps without making verify claims.",
    promptText: `You are an expert freelance project risk assistant.

Analyze the client message below for potential:
1. Payment risks (unpaid work, post-payment demands, evasive billing)
2. Scope risks (vague requirements, missing boundaries, assumption traps)
3. Timeline risks (unrealistic deadlines, emergency rush pressure)
4. Requirement gaps (missing assets, unknown third-party APIs)
5. Communication concerns (boundary degradation, aggressive tone)

Do not accuse the client of fraud or make claims you cannot verify.

For each concern identified:
- Explain the signal (what was said or omitted)
- Explain why it matters (impact on freelancer's time and money)
- Suggest a professional, protective next action

Client message to analyze:
[PASTE CLIENT MESSAGE HERE]`,
    exampleInput: `Hey, we need a web platform built like Airbnb but for pet boarding. It should be pretty simple. We need it launched in 2 weeks for our investor demo. We don't have budget right now to pay up front, but once the demo closes we can pay you a great bonus and give you equity. Can you start tonight?`,
  },
  {
    id: "ai-p2",
    title: "Prompt #2 — AI Scope Creep & Change Analyzer",
    category: "Scope Protection",
    description: "Compares the original agreed project scope against a client's new request to determine whether it is in-scope or requires a Change Request.",
    promptText: `You are a freelance scope protection specialist.

Compare the original agreed project scope with the client's new request.

Original agreed scope:
[PASTE ORIGINAL SCOPE / DELIVERABLES HERE]

Client's new request:
[PASTE CLIENT NEW MESSAGE / REQUEST HERE]

Determine and structure your answer into:
1. Clearly Included Items (covered under original contract)
2. Clearly Outside Scope Items (requires Change Request with additional budget + time)
3. Ambiguous Items (requires specific clarifying questions before deciding)
4. Recommended Change Request breakdown (suggested task title, estimated work effort in hours, and suggested pricing approach)
5. Copy-paste ready professional client reply script.

Do not assume a request is outside scope if the original agreement was genuinely unclear.`,
    exampleInput: `Original Scope: 5-page static marketing website (Home, About, Services, Blog list, Contact form with Formspree).
New Request: 'Can we also add a member login portal where customers can view their uploaded invoices and pay via credit card?'`,
  },
  {
    id: "ai-p3",
    title: "Prompt #3 — Diplomatic Client Response Generator",
    category: "Communication",
    description: "Writes a professional, non-accusatory, yet firmly protective response to difficult client situations.",
    promptText: `Write a professional, diplomatic response to this freelance client.

Situation:
[DESCRIBE SITUATION, e.g. Client asking for free extra revisions, delayed invoice, boundary push]

Goals:
- Remain polite, calm, and collaborative
- Protect the freelancer's interests (time, boundaries, compensation)
- Avoid accusatory or defensive language
- Clearly state what needs to happen next in concrete steps
- Avoid unnecessary confrontation while holding firm boundaries

Original Agreement Context:
[PASTE RELEVANT CONTRACT / SCOPE CLAUSE IF APPLICABLE]

Client Message:
[PASTE CLIENT MESSAGE HERE]`,
    exampleInput: `Situation: Client says 'I thought the mobile app was included in the $2,000 website package. I won't pay the final milestone unless you give me the mobile app APK.'`,
  },
  {
    id: "ai-p4",
    title: "Prompt #4 — Project Exclusions Matrix Generator",
    category: "Project Protection",
    description: "Generates an exhaustive, domain-specific 'NOT INCLUDED' exclusions list tailored to a specific client brief.",
    promptText: `You are a contract protection advisor for freelance developers and designers.

Based on the project description below, generate an exhaustive 'EXPLICITLY NOT INCLUDED / EXCLUSIONS' list to insert into the Scope of Work.

Project type: [e.g. E-commerce redesign / Custom React SaaS / Mobile App UI]
Agreed Deliverables: [BRIEF SUMMARY OF DELIVERABLES]

Generate:
1. Technical Exclusions (e.g. backend integrations, data migration, custom algorithms)
2. Content & Asset Exclusions (e.g. copywriting, licensed stock photography, video editing)
3. Infrastructure Exclusions (e.g. hosting fees, third-party API subscription costs, domain DNS management)
4. Maintenance & Support Exclusions (e.g. ongoing bug fixes post-warranty, OS updates)
5. Revision & Scope Limits (e.g. number of concepts, turnaround windows).`,
    exampleInput: `Project: Redesigning a Shopify theme for a luxury fashion brand with custom hero animations.`,
  },
  {
    id: "ai-p5",
    title: "Prompt #5 — Client Emergency & Dispute Escalator",
    category: "Emergency & Disputes",
    description: "Provides a safe, structured, step-by-step de-escalation plan when a client threatens legal action or cancels mid-project.",
    promptText: `You are a dispute resolution advisor for independent consultants and freelancers.

A client dispute has occurred.

Dispute Details:
[PASTE SITUATION: e.g. Client demanding full refund after approving designs, client ghosting on final $3,000 payment, client disputing quality after scope change]

Provide:
1. Risk Assessment: Legal & financial exposure summary
2. Fact-Checking Checklist: What exact written evidence/logs the freelancer needs to gather immediately
3. De-escalation Strategy: Recommended compromise or firm stance
4. Step-by-Step Action Plan: Next 3 actions in chronological order
5. Formal Written Response Draft: Clean, objective, non-emotional legal-friendly response.`,
    exampleInput: `Client approved wireframes and UI designs 3 weeks ago, paid 50% deposit. Now that development is 80% complete, they hired a new marketing director who says 'we don't like this direction at all, cancel the project and refund our deposit.'`,
  },
];

export const INITIAL_SCORECARD_CATEGORIES: ScorecardCategory[] = [
  {
    id: "cat_client_info",
    name: "Client Verification & Information",
    maxPoints: 15,
    currentPoints: 15,
    items: [
      {
        id: "ci_1",
        label: "Verified business identity (website, LinkedIn, physical location/country)",
        points: 5,
        checked: true,
        urgentFixMessage: "Verify client company website and LinkedIn profile before starting work",
      },
      {
        id: "ci_2",
        label: "Direct decision-maker identified with contact details (email, phone)",
        points: 5,
        checked: true,
        urgentFixMessage: "Identify the single person who has final sign-off authority",
      },
      {
        id: "ci_3",
        label: "Billing information collected (legal company name, VAT/Tax ID, invoicing address)",
        points: 5,
        checked: true,
        urgentFixMessage: "Request official billing address and tax/VAT details",
      },
    ],
  },
  {
    id: "cat_scope_clarity",
    name: "Scope Clarity & Deliverables",
    maxPoints: 20,
    currentPoints: 20,
    items: [
      {
        id: "sc_1",
        label: "Deliverables are itemized with specific descriptions (no vague phrases)",
        points: 6,
        checked: true,
        urgentFixMessage: "Itemize every deliverable with concrete technical specifications",
      },
      {
        id: "sc_2",
        label: "Dedicated 'NOT INCLUDED / EXCLUSIONS' section explicitly defined",
        points: 5,
        checked: true,
        urgentFixMessage: "Add an explicit 'NOT INCLUDED' list to the Scope of Work",
      },
      {
        id: "sc_3",
        label: "Revision limits explicitly capped (e.g. 2 rounds included, additional @ $rate)",
        points: 5,
        checked: true,
        urgentFixMessage: "Specify that 2 revision rounds are included and define change pricing",
      },
      {
        id: "sc_4",
        label: "Client asset responsibilities and 48-hour feedback windows documented",
        points: 4,
        checked: true,
        urgentFixMessage: "Document what content/assets the client must provide",
      },
    ],
  },
  {
    id: "cat_payment_structure",
    name: "Payment Structure & Deposits",
    maxPoints: 20,
    currentPoints: 15,
    items: [
      {
        id: "ps_1",
        label: "Upfront deposit required and CLEARED before scheduling active development",
        points: 8,
        checked: true,
        urgentFixMessage: "Collect upfront deposit (e.g. 50%) before writing code",
      },
      {
        id: "ps_2",
        label: "Milestone amounts linked to objective technical deliveries (not client launch)",
        points: 6,
        checked: true,
        urgentFixMessage: "Tie payments to milestone completion rather than external launch dates",
      },
      {
        id: "ps_3",
        label: "Final payment required BEFORE transferring root credentials or live production code",
        points: 6,
        checked: false,
        urgentFixMessage: "Confirm final payment milestone is required prior to live handover",
      },
    ],
  },
  {
    id: "cat_written_agreement",
    name: "Written Agreement & Terms",
    maxPoints: 20,
    currentPoints: 20,
    items: [
      {
        id: "wa_1",
        label: "Formal written agreement or signed Scope of Work executed by both parties",
        points: 8,
        checked: true,
        urgentFixMessage: "Have the client sign the Scope of Work or contract agreement",
      },
      {
        id: "wa_2",
        label: "Change Request process explicitly defined (written CR required for new tasks)",
        points: 6,
        checked: true,
        urgentFixMessage: "Include the formal Change Request clause in your agreement",
      },
      {
        id: "wa_3",
        label: "Cancellation / kill-fee clause and intellectual property transfer upon full payment",
        points: 6,
        checked: true,
        urgentFixMessage: "Include IP transfer condition (IP transfers only upon 100% payment)",
      },
    ],
  },
  {
    id: "cat_approvals_system",
    name: "Milestone Approvals & Sign-Offs",
    maxPoints: 15,
    currentPoints: 10,
    items: [
      {
        id: "as_1",
        label: "Written design sign-off obtained before backend/frontend coding commenced",
        points: 5,
        checked: false,
        urgentFixMessage: "Get formal written sign-off on design prototypes before coding",
      },
      {
        id: "as_2",
        label: "All verbal calls and meetings recapped in written follow-up emails",
        points: 5,
        checked: true,
        urgentFixMessage: "Send written summary emails after every verbal Zoom/phone call",
      },
      {
        id: "as_3",
        label: "Staging acceptance sign-off conducted prior to live deployment",
        points: 5,
        checked: true,
        urgentFixMessage: "Obtain written acceptance sign-off on the staging server",
      },
    ],
  },
  {
    id: "cat_project_records",
    name: "Project Records & Evidence Trail",
    maxPoints: 10,
    currentPoints: 6,
    items: [
      {
        id: "pr_1",
        label: "Centralized Activity Log tracking all major milestone decisions and dates",
        points: 4,
        checked: true,
        urgentFixMessage: "Maintain a simple Project Activity Log with dates and decisions",
      },
      {
        id: "pr_2",
        label: "Client Delay Tracker actively recording waiting days for missing materials",
        points: 3,
        checked: false,
        urgentFixMessage: "Log missing asset dates in the Client Delay Tracker",
      },
      {
        id: "pr_3",
        label: "All signed PDFs, invoices, and email approvals archived in dedicated project folder",
        points: 3,
        checked: false,
        urgentFixMessage: "Archive signed agreements and payment receipts in project backup",
      },
    ],
  },
];
