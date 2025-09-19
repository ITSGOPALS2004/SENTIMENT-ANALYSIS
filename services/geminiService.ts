
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';
import { Sentiment } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        sentiment: {
            type: Type.STRING,
            enum: [Sentiment.Positive, Sentiment.Negative, Sentiment.Neutral],
            description: 'The overall sentiment of the text.'
        },
        sentimentScore: {
            type: Type.NUMBER,
            description: 'A numerical score from -1.0 (most negative) to 1.0 (most positive).'
        },
        summary: {
            type: Type.STRING,
            description: 'A concise, one-sentence summary of the feedback.'
        },
        keyThemes: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING
            },
            description: 'An array of key topics or themes mentioned. Maximum of 5.'
        },
    },
    required: ['sentiment', 'sentimentScore', 'summary', 'keyThemes']
};

export async function analyzeSentiment(text: string): Promise<AnalysisResult> {
    try {
        const prompt = `
            You are an expert customer sentiment analyst. Analyze the following customer feedback text.
            Provide your analysis in a structured JSON format.

            The JSON object should include:
            1.  "sentiment": Classify the sentiment as one of three options: "Positive", "Negative", or "Neutral".
            2.  "sentimentScore": A numerical score from -1.0 (most negative) to 1.0 (most positive).
            3.  "summary": A concise, one-sentence summary of the feedback.
            4.  "keyThemes": An array of strings representing the key topics or themes mentioned in the feedback. Limit this to a maximum of 5 themes.

            Analyze the following text:
            "${text}"
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.2,
            },
        });

        const jsonString = response.text.trim();
        const parsedResult = JSON.parse(jsonString) as AnalysisResult;

        // Basic validation
        if (!parsedResult.sentiment || !parsedResult.keyThemes) {
            throw new Error("Invalid response format from API.");
        }
        
        return parsedResult;
    } catch (error) {
        console.error("Error analyzing sentiment:", error);
        throw new Error("Failed to analyze sentiment. Please check the console for more details.");
    }
}
