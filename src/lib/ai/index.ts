/**
 * AI Module
 *
 * Unified interface for AI providers with automatic fallback.
 *
 * Usage:
 *   import { ai } from "@/lib/ai";
 *   const response = await ai.generate("Hello, world!");
 *
 * Provider priority:
 *   1. Ollama (local) - if running
 *   2. Gemini (cloud) - if API key set
 */

import { gemini } from "./providers/gemini";
import { ollama } from "./providers/ollama";
import type { AIProvider, AIResponse, GenerateOptions } from "./types";

export {
  createCommitPartsPrompt,
  createCommitPrompt,
  createPolishPrompt,
} from "./prompts/commit";
export type { AIProvider, AIResponse, GenerateOptions } from "./types";

const providers: AIProvider[] = [ollama, gemini];

async function getAvailableProvider(): Promise<AIProvider | null> {
  for (const provider of providers) {
    if (await provider.isAvailable()) {
      return provider;
    }
  }
  return null;
}

export const ai = {
  /**
   * Generate text using the first available provider.
   * Tries Ollama first, falls back to Gemini.
   */
  async generate(
    prompt: string,
    options?: GenerateOptions,
  ): Promise<AIResponse> {
    const provider = await getAvailableProvider();

    if (!provider) {
      throw new Error(
        "No AI provider available. Either:\n" +
          "1. Start Ollama: ollama serve\n" +
          "2. Set GEMINI_API_KEY environment variable",
      );
    }

    return provider.generate(prompt, options);
  },

  /**
   * Check which providers are available.
   */
  async status(): Promise<{ provider: string; available: boolean }[]> {
    const results = await Promise.all(
      providers.map(async (p) => ({
        provider: p.name,
        available: await p.isAvailable(),
      })),
    );
    return results;
  },

  /**
   * Generate with a specific provider by name.
   */
  async generateWith(
    name: "ollama" | "gemini",
    prompt: string,
    options?: GenerateOptions,
  ): Promise<AIResponse> {
    const provider = providers.find((p) => p.name === name);

    if (!provider) {
      throw new Error(`Unknown provider: ${name}`);
    }

    if (!(await provider.isAvailable())) {
      throw new Error(`Provider ${name} is not available`);
    }

    return provider.generate(prompt, options);
  },
};
