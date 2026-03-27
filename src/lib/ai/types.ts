/**
 * AI Module Types
 *
 * These interfaces define the contract for AI providers.
 * Any provider (Ollama, Gemini, OpenAI) must implement AIProvider.
 */

export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AIResponse {
  content: string;
  provider: string;
  model: string;
}

export interface AIProvider {
  name: string;
  generate(prompt: string, options?: GenerateOptions): Promise<AIResponse>;
  isAvailable(): Promise<boolean>;
}

export interface GenerateOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIConfig {
  providers: AIProvider[];
  defaultModel?: string;
}
