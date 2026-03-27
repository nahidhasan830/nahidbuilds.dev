#!/usr/bin/env tsx
/**
 * AI Commit Script
 *
 * Usage:
 *   pnpm commit:ai           # Interactive mode
 *   pnpm commit:ai --force   # Skip lint checks
 *
 * Flow:
 *   1. Pre-checks (staged files, lint)
 *   2. Choose mode: auto / polish / manual
 *   3. Generate & confirm
 *   4. Commit
 */

import { config } from "dotenv";

config({ path: ".env.local" });

import { execSync } from "node:child_process";
import * as readline from "node:readline";
import {
  ai,
  createCommitPartsPrompt,
  createPolishPrompt,
} from "../src/lib/ai/index.js";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

type Provider = "ollama" | "gemini";

interface Providers {
  ollama: boolean;
  gemini: boolean;
}

interface CommitParts {
  type: string;
  scope: string | null;
  description: string;
}

const TYPES = [
  "feat",
  "fix",
  "docs",
  "style",
  "refactor",
  "perf",
  "test",
  "chore",
];

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (q: string): Promise<string> =>
  new Promise((resolve) => rl.question(q, resolve));

const exit = (code = 0): never => {
  rl.close();
  process.exit(code);
};

const cyan = (s: string) => `\x1b[36m${s}\x1b[0m`;
const green = (s: string) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s: string) => `\x1b[33m${s}\x1b[0m`;
const red = (s: string) => `\x1b[31m${s}\x1b[0m`;
const dim = (s: string) => `\x1b[90m${s}\x1b[0m`;

// ─────────────────────────────────────────────────────────────
// Git helpers
// ─────────────────────────────────────────────────────────────

function getStagedFiles(): string[] {
  try {
    const out = execSync("git diff --cached --name-only", {
      encoding: "utf-8",
    });
    return out.trim().split("\n").filter(Boolean);
  } catch {
    return [];
  }
}

function getDiff(): string {
  try {
    return execSync("git diff --cached", { encoding: "utf-8" });
  } catch {
    return "";
  }
}

function commit(message: string): void {
  execSync(`git commit -m "${message.replace(/"/g, '\\"')}"`, {
    stdio: "inherit",
  });
}

// ─────────────────────────────────────────────────────────────
// Checks
// ─────────────────────────────────────────────────────────────

function runLint(): boolean {
  console.log(cyan("\n🔍 Running lint...\n"));
  try {
    execSync("pnpm lint", { stdio: "inherit" });
    console.log(green("\n✓ Lint passed"));
    return true;
  } catch {
    console.log(red("\n✗ Lint failed"));
    return false;
  }
}

async function checkProviders(): Promise<Providers> {
  const status = await ai.status();
  return {
    ollama: status.find((s) => s.provider === "ollama")?.available ?? false,
    gemini: status.find((s) => s.provider === "gemini")?.available ?? false,
  };
}

// ─────────────────────────────────────────────────────────────
// AI helpers
// ─────────────────────────────────────────────────────────────

function parseResponse(content: string): CommitParts | null {
  try {
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) return null;
    const p = JSON.parse(match[0]);
    return {
      type: p.type || "feat",
      scope: p.scope || null,
      description: p.description || "",
    };
  } catch {
    return null;
  }
}

function formatMessage(p: CommitParts): string {
  return p.scope
    ? `${p.type}(${p.scope}): ${p.description}`
    : `${p.type}: ${p.description}`;
}

async function selectProvider(providers: Providers): Promise<Provider> {
  const o = providers.ollama ? green("✓") : red("✗");
  const g = providers.gemini ? green("✓") : red("✗");

  console.log(cyan("\nSelect provider:"));
  console.log(`   ${o} [1] ollama ${dim("(local)")}`);
  console.log(`   ${g} [2] gemini ${dim("(cloud)")}`);

  const choice = await ask(cyan("Choice [1/2]: "));

  if (choice === "2" && providers.gemini) return "gemini";
  if (providers.ollama) return "ollama";
  if (providers.gemini) return "gemini";

  console.log(red("No providers available"));
  return exit(1);
}

async function confirmParts(
  suggested: CommitParts,
): Promise<CommitParts | null> {
  console.log(green("\n📝 Suggested:"));
  console.log(`   type: ${suggested.type}`);
  console.log(`   scope: ${suggested.scope || dim("(none)")}`);
  console.log(`   description: ${suggested.description}\n`);

  const typeIn = await ask(
    cyan(`Type [${TYPES.join("/")}] (${suggested.type}): `),
  );
  const type = TYPES.includes(typeIn.trim()) ? typeIn.trim() : suggested.type;

  const scopeIn = await ask(cyan(`Scope (${suggested.scope || "none"}): `));
  const scope = scopeIn.trim() || suggested.scope;

  const descIn = await ask(cyan(`Description (${suggested.description}): `));
  const description = descIn.trim() || suggested.description;

  if (!description) {
    console.log(yellow("Description required"));
    return null;
  }

  return { type, scope, description };
}

// ─────────────────────────────────────────────────────────────
// Modes
// ─────────────────────────────────────────────────────────────

async function modeAuto(
  diff: string,
  providers: Providers,
): Promise<string | null> {
  const provider = await selectProvider(providers);

  console.log(cyan(`\n✨ Analyzing diff with ${provider}...`));

  const prompt = createCommitPartsPrompt(diff);
  const response = await ai.generateWith(provider, prompt, {
    temperature: 0.3,
  });
  const suggested = parseResponse(response.content);

  if (!suggested) {
    console.log(yellow("Could not parse AI response"));
    return null;
  }

  const parts = await confirmParts(suggested);
  if (!parts) return null;

  return formatMessage(parts);
}

async function modePolish(
  diff: string,
  providers: Providers,
): Promise<string | null> {
  const rough = await ask(cyan("\n📝 Enter rough message: "));
  if (!rough.trim()) return null;

  const provider = await selectProvider(providers);

  console.log(cyan(`\n✨ Polishing with ${provider}...`));

  const prompt = createPolishPrompt(rough.trim(), diff);
  const response = await ai.generateWith(provider, prompt, {
    temperature: 0.3,
  });
  const suggested = parseResponse(response.content);

  if (!suggested) {
    console.log(yellow("Could not parse AI response"));
    return null;
  }

  const parts = await confirmParts(suggested);
  if (!parts) return null;

  return formatMessage(parts);
}

function modeManual(): never {
  console.log(cyan("\n📝 Launching czg...\n"));
  rl.close();
  try {
    execSync("pnpm czg", { stdio: "inherit" });
    process.exit(0);
  } catch {
    process.exit(1);
  }
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────

async function main() {
  const force = process.argv.includes("--force") || process.argv.includes("-f");

  // Step 1: Check staged files
  const files = getStagedFiles();
  if (files.length === 0) {
    console.log(yellow("No staged files. Run: git add <files>"));
    exit(1);
  }

  console.log(cyan("📁 Staged:"));
  for (const f of files) {
    console.log(`   ${f}`);
  }

  // Step 2: Lint
  if (!force) {
    if (!runLint()) {
      const choice = await ask(
        cyan("\n[f]ix / [c]ontinue anyway / [m]anual? "),
      );
      if (choice.toLowerCase() === "m") modeManual();
      if (choice.toLowerCase() !== "c") {
        console.log(yellow("Fix errors and retry"));
        exit(1);
      }
    }
  } else {
    console.log(yellow("\n⚠ Skipping lint (--force)"));
  }

  // Step 3: Get diff & check providers
  const diff = getDiff();
  if (!diff) {
    console.log(yellow("No diff content"));
    exit(1);
  }

  console.log(cyan("\n🤖 Checking AI providers..."));
  const providers = await checkProviders();

  if (!providers.ollama && !providers.gemini) {
    console.log(yellow("No AI providers. Falling back to manual."));
    modeManual();
  }

  // Step 4: Choose mode
  console.log(cyan("\nHow do you want to commit?"));
  console.log(`   [a] Auto ${dim("- AI analyzes diff")}`);
  console.log(`   [p] Polish ${dim("- AI formats your message")}`);
  console.log(`   [m] Manual ${dim("- czg interactive")}`);

  const mode = await ask(cyan("Choice [a/p/m] (default: a): "));

  let message: string | null = null;

  try {
    if (mode.toLowerCase() === "m") {
      modeManual();
    } else if (mode.toLowerCase() === "p") {
      message = await modePolish(diff, providers);
    } else {
      message = await modeAuto(diff, providers);
    }
  } catch (err) {
    console.log(red(`\nError: ${err instanceof Error ? err.message : err}`));
    const fallback = await ask(cyan("Try manual? [Y/n]: "));
    if (fallback.toLowerCase() !== "n") modeManual();
    exit(1);
  }

  if (!message) {
    console.log(yellow("Aborted"));
    return exit(0);
  }

  // Step 5: Confirm & commit
  console.log(`\n${green("→")} ${message}\n`);

  const confirm = await ask(cyan("Commit? [Y/n]: "));
  if (confirm.toLowerCase() === "n") {
    console.log(yellow("Aborted"));
    exit(0);
  }

  console.log(cyan("\n📦 Committing...\n"));
  commit(message);
  console.log(green("✓ Done"));

  exit(0);
}

main();
