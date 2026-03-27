/**
 * Ollama Provider
 *
 * Connects to locally running Ollama instance.
 * Default URL: http://localhost:11434
 *
 * To use:
 * 1. Install Ollama: https://ollama.com
 * 2. Run: ollama pull qwen2.5-coder:7b
 * 3. Ollama runs automatically in background
 */

import type { AIProvider, AIResponse, GenerateOptions } from "../types";

const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const DEFAULT_MODEL = "qwen2.5-coder:7b";

export const ollama: AIProvider = {
  name: "ollama",

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${OLLAMA_URL}/api/tags`, {
        method: "GET",
        signal: AbortSignal.timeout(2000), // 2 second timeout
      });
      return response.ok;
    } catch {
      return false;
    }
  },

  async generate(
    prompt: string,
    options?: GenerateOptions,
  ): Promise<AIResponse> {
    const model = options?.model || DEFAULT_MODEL;

    const response = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
        options: {
          temperature: options?.temperature ?? 0.7,
          num_predict: options?.maxTokens ?? 500,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Ollama error: ${error}`);
    }

    const data = await response.json();

    return {
      content: data.response.trim(),
      provider: "ollama",
      model,
    };
  },
};
