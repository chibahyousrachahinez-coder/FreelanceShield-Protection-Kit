import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "5mb" }));

// Lazy Google Gen AI initialization
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// 1. Live AI Client Risk Analyzer
app.post("/api/gemini/analyze-client-risk", async (req: Request, res: Response) => {
  try {
    const { clientMessage, projectContext } = req.body;
    if (!clientMessage || typeof clientMessage !== "string") {
      return res.status(400).json({ error: "clientMessage is required" });
    }

    const ai = getGenAI();
    const prompt = `You are an expert freelance project risk analysis assistant.
Analyze the following client message / inquiry for potential freelance project risks.
Context: ${projectContext || "General freelance developer/designer client interaction"}.

Client message:
"""
${clientMessage}
"""

Evaluate and return a structured JSON with:
1. "riskScore": integer from 0 to 100 (0 = extremely safe, 100 = extreme risk)
2. "riskLevel": string ("Low Risk", "Moderate Risk", "High Risk", "Critical Risk")
3. "summary": 2-3 sentences concise executive summary
4. "concerns": array of objects with:
   - "category": ("Payment Risk" | "Scope Risk" | "Timeline Risk" | "Requirement Gap" | "Communication Style")
   - "signal": what in the message triggered this (exact quote or symptom)
   - "whyItMatters": practical impact on the freelancer
   - "recommendedAction": exact phrase or action the freelancer should take
5. "suggestedResponse": a ready-to-send polite, assertive, professional reply that addresses the flags without accusing the client.

Important: Do not accuse the client of fraud or make claims you cannot verify. Focus on risk signals and protective boundaries.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error: any) {
    console.error("Error in analyze-client-risk:", error);
    return res.status(500).json({
      error: error.message || "Failed to analyze client risk",
    });
  }
});

// 2. Live AI Scope Analyzer (Original Scope vs New Client Request)
app.post("/api/gemini/analyze-scope", async (req: Request, res: Response) => {
  try {
    const { originalScope, newRequest } = req.body;
    if (!originalScope || !newRequest) {
      return res.status(400).json({ error: "originalScope and newRequest are required" });
    }

    const ai = getGenAI();
    const prompt = `You are a freelance scope protection specialist.
Compare the original agreed project scope with the client's new request.

Original agreed scope:
"""
${originalScope}
"""

Client's new request:
"""
${newRequest}
"""

Analyze whether the request is inside or outside scope and return a JSON object with:
1. "verdict": ("Clearly Included" | "Clearly Outside Scope" | "Partially Included / Ambiguous")
2. "confidence": integer 0-100
3. "analysis": detailed explanation of why it is inside/outside/ambiguous based on the scope text
4. "scopeComparisonItems": array of objects with:
   - "item": specific sub-feature or request item
   - "status": ("Included" | "Scope Creep / Out of Scope" | "Requires Clarification")
   - "reason": short explanation
5. "recommendedChangeRequest": object with:
   - "suggestedTitle": title for change request (e.g. "CR#004 - Additional Stripe Webhook Integration")
   - "estimatedWorkHours": reasonable estimate string (e.g. "4-6 hours")
   - "suggestedCostRange": rough formula or guideline note
6. "clientReplyScript": copy-paste ready professional message informing the client whether it is included or drafting a change request.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error: any) {
    console.error("Error in analyze-scope:", error);
    return res.status(500).json({
      error: error.message || "Failed to analyze scope",
    });
  }
});

// 3. Live AI Client Response Generator
app.post("/api/gemini/generate-client-response", async (req: Request, res: Response) => {
  try {
    const { situation, clientName, originalAgreement, clientMessage, tone } = req.body;

    const ai = getGenAI();
    const prompt = `You are a freelance communication coach.
Write a professional, diplomatic, yet firmly protective client response.

Situation: ${situation || "Handling scope creep or payment or delay"}
Client Name: ${clientName || "[Client Name]"}
Desired Tone: ${tone || "Polite, firm and collaborative"}
Original Agreement Context: ${originalAgreement || "Standard milestone agreement with 2 revision rounds"}
Client Message Received:
"""
${clientMessage || "N/A"}
"""

Goals:
- Remain polite and positive
- Protect the freelancer's interests (time, boundaries, compensation)
- Avoid accusatory or aggressive language
- State clearly and concisely what needs to happen next
- Provide ready-to-copy text with bracketed placeholders if needed

Return JSON with:
1. "subjectLine": suitable email or message subject
2. "messageBody": complete, polished message ready to send
3. "keyPointsCovered": array of strings summarizing why this response protects the project
4. "nextStepAction": clear advice for the freelancer after sending.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error: any) {
    console.error("Error in generate-client-response:", error);
    return res.status(500).json({
      error: error.message || "Failed to generate response",
    });
  }
});

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "FreelanceShield Protection Kit" });
});

// Vite middleware & Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🛡️ FreelanceShield server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
