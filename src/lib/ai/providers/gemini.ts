/**
 * Gemini Provider
 *
 * Google's Gemini API - free tier available.
 *
 * To use:
 * 1. Get API key: https://ai.google.dev
 * 2. Set environment variable: GEMINI_API_KEY=your-key
 *
 * Free tier limits (March 2026):
 * - Gemini 2.5 Flash: 10 RPM, 250 requests/day, 1M context
 */

import type { AIProvider, AIResponse, GenerateOptions } from "../types";

const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const DEFAULT_MODEL = "gemini-2.5-flash";

export const gemini: AIProvider = {
  name: "gemini",

  async isAvailable(): Promise<boolean> {
    const apiKey = process.env.GEMINI_API_KEY;
    return !!apiKey;
  },

  async generate(
    prompt: string,
    options?: GenerateOptions,
  ): Promise<AIResponse> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable not set");
    }

    const model = options?.model || DEFAULT_MODEL;
    const url = `${GEMINI_URL}/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: options?.temperature ?? 0.7,
          maxOutputTokens: options?.maxTokens ?? 200,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini error: ${error}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      throw new Error("No content in Gemini response");
    }

    return {
      content: content.trim(),
      provider: "gemini",
      model,
    };
  },
};
