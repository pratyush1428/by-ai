
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

export const analyzeSalesCall = async (audioBase64: string, mimeType: string): Promise<AnalysisResult> => {
  // Create a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-3-pro-preview"; // Using Pro for complex reasoning and diarization

  const prompt = `
    You are a world-class sales coach. Analyze this sales call audio.
    1. Transcribe the call accurately.
    2. Diarize the conversation between 'Salesperson' and 'Prospect'.
    3. For each segment of dialogue, provide a sentiment score from 0-100 (0 being frustrated/negative, 100 being highly engaged/positive).
    4. Identify exactly 3 things the salesperson did well (Strengths).
    5. Identify exactly 3 missed opportunities (Opportunities).
    6. Provide a brief overall summary of the call.
    7. Calculate an overall sentiment score for the entire call.

    Format the response as a JSON object matching this schema:
    {
      "transcript": [
        { "speaker": "Salesperson" | "Prospect", "text": "string", "timestamp": "MM:SS", "sentiment": number }
      ],
      "strengths": ["string", "string", "string"],
      "opportunities": ["string", "string", "string"],
      "summary": "string",
      "overallSentiment": number
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          { inlineData: { data: audioBase64, mimeType } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            transcript: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  speaker: { type: Type.STRING },
                  text: { type: Type.STRING },
                  timestamp: { type: Type.STRING },
                  sentiment: { type: Type.NUMBER }
                },
                required: ["speaker", "text", "timestamp", "sentiment"]
              }
            },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 strengths of the salesperson"
            },
            opportunities: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 missed opportunities"
            },
            summary: { type: Type.STRING },
            overallSentiment: { type: Type.NUMBER }
          },
          required: ["transcript", "strengths", "opportunities", "summary", "overallSentiment"]
        }
      }
    });

    // Access the text property directly as per Google GenAI SDK rules
    const resultText = response.text;
    if (!resultText) throw new Error("Empty response from AI");
    
    return JSON.parse(resultText) as AnalysisResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};
