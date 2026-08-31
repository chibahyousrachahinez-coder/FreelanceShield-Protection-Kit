import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  generateClientScreeningDocx,
  generateScopeOfWorkDocx,
  generateScopeExclusionsDocx,
  generateAssumptionsDocx,
  generateDefinitionOfDoneDocx,
  generateChangeRequestDocx,
} from "./docxGenerators";
import {
  generatePaymentPlannerXlsx,
  generateDecisionLogXlsx,
  generateDelayTrackerXlsx,
  generate100PointAuditXlsx,
} from "./xlsxGenerators";
import {
  generateStartHerePdf,
  generateClientScreeningChecklistPdf,
  generatePaymentChecklistPdf,
  generateKickoffChecklistPdf,
  generateScopeChangeChecklistPdf,
  generate30ClientScriptsPdf,
  generateFinalHandoverChecklistPdf,
  generateAiPromptPackPdf,
  generateCompleteProjectExamplePdf,
} from "./pdfGenerators";

export async function downloadZipPackage(onProgress?: (status: string) => void) {
  try {
    if (onProgress) onProgress("Initializing packaging engine...");
    const zip = new JSZip();

    // Customer product root folder
    const root = zip.folder("FreelanceShield-Protection-Kit-v1.0") || zip;

    // 00_START_HERE
    if (onProgress) onProgress("Generating Start-Here PDF...");
    const folder00 = root.folder("00_START_HERE");
    const startHerePdf = generateStartHerePdf();
    folder00?.file("Start-Here.pdf", startHerePdf, { binary: true });

    // 01_CLIENT_SCREENING
    if (onProgress) onProgress("Generating Client Screening assets (PDF & DOCX)...");
    const folder01 = root.folder("01_CLIENT_SCREENING");
    const screeningPdf = generateClientScreeningChecklistPdf();
    folder01?.file("Client-Screening-Checklist.pdf", screeningPdf, { binary: true });

    const screeningDocx = await generateClientScreeningDocx();
    folder01?.file("Client-Screening-Template.docx", screeningDocx, { binary: true });

    // 02_SCOPE_PROTECTION
    if (onProgress) onProgress("Generating Scope Protection Word documents (DOCX)...");
    const folder02 = root.folder("02_SCOPE_PROTECTION");
    const [sowDocx, exclusionsDocx, assumptionsDocx, dodDocx] = await Promise.all([
      generateScopeOfWorkDocx(),
      generateScopeExclusionsDocx(),
      generateAssumptionsDocx(),
      generateDefinitionOfDoneDocx(),
    ]);
    folder02?.file("Scope-of-Work.docx", sowDocx, { binary: true });
    folder02?.file("Scope-Exclusions.docx", exclusionsDocx, { binary: true });
    folder02?.file("Assumptions.docx", assumptionsDocx, { binary: true });
    folder02?.file("Definition-of-Done.docx", dodDocx, { binary: true });

    // 03_PAYMENT
    if (onProgress) onProgress("Generating Payment spreadsheets & checklists (XLSX & PDF)...");
    const folder03 = root.folder("03_PAYMENT");
    const paymentXlsx = generatePaymentPlannerXlsx();
    const paymentPdf = generatePaymentChecklistPdf();
    folder03?.file("Payment-Planner.xlsx", paymentXlsx, { binary: true });
    folder03?.file("Payment-Checklist.pdf", paymentPdf, { binary: true });

    // 04_PROJECT_MANAGEMENT
    if (onProgress) onProgress("Generating Project Management logs (XLSX & PDF)...");
    const folder04 = root.folder("04_PROJECT_MANAGEMENT");
    const kickoffPdf = generateKickoffChecklistPdf();
    const decisionXlsx = generateDecisionLogXlsx();
    const delayXlsx = generateDelayTrackerXlsx();
    folder04?.file("Kickoff-Checklist.pdf", kickoffPdf, { binary: true });
    folder04?.file("Decision-Log.xlsx", decisionXlsx, { binary: true });
    folder04?.file("Delay-Tracker.xlsx", delayXlsx, { binary: true });

    // 05_SCOPE_CREEP
    if (onProgress) onProgress("Generating Scope Creep Change Request (DOCX & PDF)...");
    const folder05 = root.folder("05_SCOPE_CREEP");
    const crDocx = await generateChangeRequestDocx();
    const scopeChangePdf = generateScopeChangeChecklistPdf();
    folder05?.file("Change-Request.docx", crDocx, { binary: true });
    folder05?.file("Scope-Change-Checklist.pdf", scopeChangePdf, { binary: true });

    // 06_CLIENT_COMMUNICATION
    if (onProgress) onProgress("Generating 30 Client Communication Scripts (PDF)...");
    const folder06 = root.folder("06_CLIENT_COMMUNICATION");
    const scriptsPdf = generate30ClientScriptsPdf();
    folder06?.file("30-Client-Scripts.pdf", scriptsPdf, { binary: true });

    // 07_HANDOVER
    if (onProgress) onProgress("Generating Final Handover Checklist (PDF)...");
    const folder07 = root.folder("07_HANDOVER");
    const handoverPdf = generateFinalHandoverChecklistPdf();
    folder07?.file("Final-Handover-Checklist.pdf", handoverPdf, { binary: true });

    // 08_AI_TOOLS
    if (onProgress) onProgress("Generating AI Prompt Pack (PDF)...");
    const folder08 = root.folder("08_AI_TOOLS");
    const aiPromptsPdf = generateAiPromptPackPdf();
    folder08?.file("FreelanceShield-AI-Prompt-Pack.pdf", aiPromptsPdf, { binary: true });

    // 09_SCORECARD
    if (onProgress) onProgress("Generating 100-Point Audit Scorecard (XLSX)...");
    const folder09 = root.folder("09_SCORECARD");
    const auditXlsx = generate100PointAuditXlsx();
    folder09?.file("100-Point-Protection-Audit.xlsx", auditXlsx, { binary: true });

    // 10_CASE_STUDY_AND_BONUSES
    if (onProgress) onProgress("Generating Complete Project Case Study (PDF)...");
    const folder10 = root.folder("10_CASE_STUDY_AND_BONUSES");
    const caseStudyPdf = generateCompleteProjectExamplePdf();
    folder10?.file("Complete-Project-Example.pdf", caseStudyPdf, { binary: true });

    // Generate real ZIP
    if (onProgress) onProgress("Assembling compressed ZIP package...");
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "FreelanceShield-Protection-Kit-v1.0.zip");
    if (onProgress) onProgress("Download ready!");
  } catch (err) {
    console.error("Failed to generate ZIP package:", err);
    throw err;
  }
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
