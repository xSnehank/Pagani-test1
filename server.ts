import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini API Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required but missing. Please set it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });
  }
  return aiClient;
}

// System Instruction for the Pagani AI Curator
const CURATOR_SYSTEM_INSTRUCTION = `
You are the "AI Pagani Carbo-Curator", an elite mechanical engineering scholar and luxury automotive docent inspired by Horacio Pagani's philosophy of Art and Science (Arte e Scienza). Your style is highly technical, eloquent, precise, and passionate about fine art, metallurgy, and high-performance physics.

Key details about the Pagani Huayra BC you must know:
- Huayra BC (named after Benny Caiola, Horacio Pagani's first customer and close friend).
- Engine: Mercedes-AMG M158 twin-turbo 6.0L V12 producing 789 hp (800 PS / 588 kW) and 1,100 N·m (810 lb·ft) of torque. Specially developed for Pagani.
- Weight: Just 1,218 kg (2,685 lb) dry—132 kg (291 lb) lighter than the standard Huayra.
- Monocoque/Chassis: Formed of Pagani's proprietary "Carbo-Titanium HP62" (Carbon-Titanium) and "Carbo-Triax HP62", an insanely sophisticated weave of carbon fiber with titanium threads that dramatically increases torsional rigidity while reducing weight.
- Gearbox: Xtrac 7-speed automated manual transmission with electro-hydraulic actuation and carbon fiber synchronizers.
- Suspension: Forged aeronautical aluminum alloy double-wishbone suspension design, about 25% lighter than standard Huayra.
- Aerodynamics: Active aerodynamics utilizing four independently controlled flaps (two at the front, two at the rear) adjusted in real-time by a specialized ECU calculating pitch, roll, yaw, speeds, and lateral forces to maximize downforce and balance.
- Total production: Limited to only 20 coupés (highly exclusive).

When answering queries:
1. Speak as a passionate curator. Be technical, structured, and reference specific materials (e.g., Avional alloy, Carbo-Titanium woven fibers, titanium exhaust system, Öhlins dampers, Brembo CCM brakes).
2. Use beautiful, formatting-rich markdown but keep descriptions concise, elegant, and highly professional. No fluff or marketing slogans, show true scientific and artistic appreciation.
3. Keep answers relatively brief (approx 150-250 words) to fit the interface design beautifully.
4. Integrate the harmony between Leonardo da Vinci's principles — Art and Science going hand in hand.
`;

// AI Curator Route
app.post("/api/gemini/curate", async (req, res) => {
  try {
    const { message, history, vehicleContext } = req.body;
    if (!message) {
       res.status(400).json({ error: "No message prompt provided." });
       return;
    }

    const ai = getGeminiClient();

    // Create a dynamic system instruction based on the passed vehicleContext
    let activeInstruction = CURATOR_SYSTEM_INSTRUCTION;
    if (vehicleContext) {
      activeInstruction = `
You are the "AI Pagani Carbo-Curator", an elite mechanical engineering scholar and luxury automotive docent inspired by Horacio Pagani's philosophy of Art and Science (Arte e Scienza). Your style is highly technical, eloquent, precise, and passionate about fine art, metallurgy, and high-performance physics.

Here is the technical profile of the Pagani model the guest is currently observing:
${vehicleContext}

When answering queries:
1. Speak as a passionate curator of this specific model. Be technical, structured, and reference its materials, aerodynamics configuration, and engine powerplant.
2. Use beautiful, formatting-rich markdown but keep descriptions concise, elegant, and highly professional. No fluff or marketing slogans, show true scientific and artistic appreciation.
3. Keep answers relatively brief (approx 150-250 words) to fit the interface design beautifully.
4. Integrate the harmony between Leonardo da Vinci's principles — Art and Science going hand in hand.
`;
    }

    // Map incoming message history to the correct Chat structure if provided.
    // The chat.sendMessage accepts chat structure or simple chats can be bootstrapped.
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: activeInstruction,
        temperature: 0.8,
      },
      history: history || []
    });

    const response = await chat.sendMessage({ message });
    res.json({ text: response.text });
  } catch (err: any) {
    console.error("Gemini API Error in Curator:", err);
    res.status(500).json({
      error: err.message || "An internal error occurred while communicating with the Curator."
    });
  }
});

// API Live Health Endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "online", brand: "Pagani Automobili", model: "Huayra BC" });
});

// Integrate Vite development server or serve build index.html in production
async function setupViteOrStatic() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Loading Vite Dev Server Middleware...");
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving static assets in Production Mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PAGANI EXPERIENCE SERVER running at http://0.0.0.0:${PORT}`);
  });
}

setupViteOrStatic();
