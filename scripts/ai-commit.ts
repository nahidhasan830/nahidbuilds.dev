#!/usr/bin/env tsx
/**
 * AI Commit - Simple, fast commits with AI assistance
 *
 * Usage:
 *   pnpm commit:ai              # AI generates message
 *   pnpm commit:ai "rough msg"  # AI polishes your message
 *   pnpm commit:ai --manual     # Use czg interactive
 *   pnpm commit:ai --force      # Skip lint
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
// Setup
// ─────────────────────────────────────────────────────────────

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (q: string): Promise<string> =>
  new Promise((r) => rl.question(q, r));

const done = (code = 0): never => {
  rl.close();
  process.exit(code);
};

// Colors
const c = {
  cyan: (s: string) => `\x1b[36m${s}\x1b[0m`,
  green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
  red: (s: string) => `\x1b[31m${s}\x1b[0m`,
  dim: (s: string) => `\x1b[90m${s}\x1b[0m`,
  bold: (s: string) => `\x1b[1m${s}\x1b[0m`,
};

// ─────────────────────────────────────────────────────────────
// Git & Checks
// ─────────────────────────────────────────────────────────────

const git = {
  staged: (): string[] => {
    try {
      return execSync("git diff --cached --name-only", { encoding: "utf-8" })
        .trim()
        .split("\n")
        .filter(Boolean);
    } catch {
      return [];
    }
  },
  diff: (): string => {
    try {
      return execSync("git diff --cached", { encoding: "utf-8" });
    } catch {
      return "";
    }
  },
  commit: (msg: string) => {
    execSync(`git commit -m "${msg.replace(/"/g, '\\"')}"`, {
      stdio: "inherit",
    });
  },
};

const lint = (): boolean => {
  console.log(c.dim("\nRunning lint..."));
  try {
    execSync("pnpm lint", { stdio: "inherit" });
    return true;
  } catch {
    return false;
  }
};

const czg = (): never => {
  rl.close();
  execSync("pnpm czg", { stdio: "inherit" });
  process.exit(0);
};

// ─────────────────────────────────────────────────────────────
// AI
// ─────────────────────────────────────────────────────────────

type Provider = "ollama" | "gemini";

async function getProvider(): Promise<Provider | null> {
  const status = await ai.status();
  if (status.find((s) => s.provider === "ollama")?.available) return "ollama";
  if (status.find((s) => s.provider === "gemini")?.available) return "gemini";
  return null;
}

interface CommitParts {
  type: string;
  scope: string | null;
  description: string;
}

function parse(content: string): CommitParts | null {
  try {
    const m = content.match(/\{[\s\S]*\}/);
    if (!m) return null;
    const p = JSON.parse(m[0]);
    return {
      type: p.type || "feat",
      scope: p.scope || null,
      description: p.description || "",
    };
  } catch {
    return null;
  }
}

function format(p: CommitParts): string {
  return p.scope
    ? `${p.type}(${p.scope}): ${p.description}`
    : `${p.type}: ${p.description}`;
}

async function generate(
  diff: string,
  roughMessage?: string,
): Promise<string | null> {
  const provider = await getProvider();
  if (!provider) {
    console.log(c.yellow("No AI available. Use --manual or start Ollama."));
    return null;
  }

  console.log(c.dim(`\nGenerating with ${provider}...`));

  const prompt = roughMessage
    ? createPolishPrompt(roughMessage, diff)
    : createCommitPartsPrompt(diff);

  const res = await ai.generateWith(provider, prompt, { temperature: 0.3 });
  const parts = parse(res.content);

  if (!parts) {
    console.log(c.yellow("Could not parse AI response"));
    return null;
  }

  return format(parts);
}

// ─────────────────────────────────────────────────────────────
// Main Flow
// ─────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force") || args.includes("-f");
  const manual = args.includes("--manual") || args.includes("-m");
  const roughMessage = args.find((a) => !a.startsWith("-"));

  // 1. Check staged files
  const files = git.staged();
  if (!files.length) {
    console.log(c.yellow("No staged files. Run: git add <files>"));
    done(1);
  }

  console.log(c.cyan("\n📁 Staged:"));
  console.log(c.dim(`   ${files.slice(0, 5).join("\n   ")}`));
  if (files.length > 5) console.log(c.dim(`   ... +${files.length - 5} more`));

  // 2. Lint
  if (!force && !lint()) {
    const choice = await ask(
      c.cyan("\nLint failed. [f]ix / [c]ontinue / [m]anual: "),
    );
    if (choice === "m") czg();
    if (choice !== "c") {
      console.log(c.yellow("Fix and retry."));
      done(1);
    }
  }

  // 3. Manual mode
  if (manual) czg();

  // 4. Generate
  const diff = git.diff();
  if (!diff) {
    console.log(c.yellow("No diff found."));
    done(1);
  }

  let message = await generate(diff, roughMessage);

  // 5. Review loop
  while (true) {
    if (!message) {
      const fallback = await ask(
        c.cyan("\nNo message. [r]etry / [m]anual / [q]uit: "),
      );
      if (fallback === "m") czg();
      if (fallback === "r") {
        message = await generate(diff, roughMessage);
        continue;
      }
      done(0);
    }

    if (!message) continue;

    console.log(`\n${c.green("→")} ${c.bold(message)}\n`);

    const action = await ask(
      c.cyan("[enter] commit / [e]dit / [r]etry / [m]anual / [q]uit: "),
    );

    if (!action || action === "y") {
      // Commit
      console.log(c.dim("\nCommitting..."));
      try {
        git.commit(message);
        console.log(c.green("✓ Done\n"));
        done(0);
      } catch {
        console.log(c.red("Commit failed."));
        done(1);
      }
    }

    if (action === "e") {
      const edited = await ask(c.cyan("New message: "));
      if (edited.trim()) message = edited.trim();
      continue;
    }

    if (action === "r") {
      message = await generate(diff, roughMessage);
      continue;
    }

    if (action === "m") czg();

    if (action === "q") {
      console.log(c.yellow("Aborted."));
      done(0);
    }
  }
}

main().catch((e) => {
  console.error(c.red(`Error: ${e.message}`));
  done(1);
});
