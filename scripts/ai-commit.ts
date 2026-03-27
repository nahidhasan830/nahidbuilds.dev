#!/usr/bin/env tsx
/**
 * AI Commit - Smart commits with AI assistance
 *
 * Usage:
 *   pnpm commit:ai              # AI generates message
 *   pnpm commit:ai "rough msg"  # AI polishes your message
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
// Helpers
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

const c = {
  cyan: (s: string) => `\x1b[36m${s}\x1b[0m`,
  green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
  red: (s: string) => `\x1b[31m${s}\x1b[0m`,
  dim: (s: string) => `\x1b[90m${s}\x1b[0m`,
  bold: (s: string) => `\x1b[1m${s}\x1b[0m`,
};

// ─────────────────────────────────────────────────────────────
// Git
// ─────────────────────────────────────────────────────────────

function getStaged(): string[] {
  try {
    return execSync("git diff --cached --name-only", { encoding: "utf-8" })
      .trim()
      .split("\n")
      .filter(Boolean);
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

function commit(msg: string): boolean {
  try {
    // Escape for shell: replace \ " ` $ with escaped versions
    const escaped = msg
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/`/g, "\\`")
      .replace(/\$/g, "\\$");
    execSync(`git commit -m "${escaped}"`, {
      stdio: "inherit",
    });
    return true;
  } catch {
    return false;
  }
}

// ─────────────────────────────────────────────────────────────
// AI
// ─────────────────────────────────────────────────────────────

type Provider = "ollama" | "gemini";

async function getProviders(): Promise<Provider[]> {
  const status = await ai.status();
  const available: Provider[] = [];
  if (status.find((s) => s.provider === "ollama")?.available)
    available.push("ollama");
  if (status.find((s) => s.provider === "gemini")?.available)
    available.push("gemini");
  return available;
}

const VALID_TYPES = [
  "feat",
  "fix",
  "docs",
  "style",
  "refactor",
  "perf",
  "test",
  "chore",
];

function validateScope(scope: string | null | undefined): string | null {
  if (!scope) return null;
  // Must be single lowercase word (letters only)
  return /^[a-z]+$/.test(scope) ? scope : null;
}

function validateDesc(desc: string): string {
  // Clean up description
  let clean = desc.trim();
  // Remove trailing period
  clean = clean.replace(/\.$/, "");
  // Lowercase first letter
  clean = clean.charAt(0).toLowerCase() + clean.slice(1);
  // Truncate to 50 chars
  if (clean.length > 50) {
    clean = clean.slice(0, 50);
  }
  return clean;
}

function parseResponse(
  content: string,
): { type: string; scope: string | null; desc: string } | null {
  // Strip markdown code blocks if present
  let cleaned = content.trim();

  // Remove ```json ... ``` wrapper
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
  }

  // Try JSON
  try {
    const m = cleaned.match(/\{[\s\S]*\}/);
    if (m) {
      const p = JSON.parse(m[0]);
      if (p.type && p.description) {
        const type = VALID_TYPES.includes(p.type) ? p.type : "chore";
        const scope = validateScope(p.scope);
        const desc = validateDesc(p.description);
        if (desc) return { type, scope, desc };
      }
    }
  } catch {
    // fallback
  }

  // Try conventional commit pattern
  const match = content.match(
    /^(feat|fix|docs|style|refactor|perf|test|chore)(?:\(([^)]+)\))?:\s*(.+)$/m,
  );
  if (match) {
    const scope = validateScope(match[2]);
    const desc = validateDesc(match[3]);
    if (desc) return { type: match[1], scope, desc };
  }

  return null;
}

function formatCommitMsg(p: {
  type: string;
  scope: string | null;
  desc: string;
}): string {
  return p.scope ? `${p.type}(${p.scope}): ${p.desc}` : `${p.type}: ${p.desc}`;
}

function isValidCommitMsg(msg: string): boolean {
  // Must match: type(scope): desc OR type: desc
  return /^(feat|fix|docs|style|refactor|perf|test|chore)(\([a-z]+\))?: .+$/.test(
    msg,
  );
}

const MAX_DIFF = 4000;

async function generateMessage(
  provider: Provider,
  diff: string,
  roughMessage?: string,
): Promise<string | null> {
  const truncated =
    diff.length > MAX_DIFF
      ? `${diff.slice(0, MAX_DIFF)}\n... (truncated)`
      : diff;

  const mode = roughMessage ? `Polishing "${roughMessage}"` : "Generating";
  const size = `${(diff.length / 1000).toFixed(1)}k`;
  console.log(c.dim(`\n${mode} with ${provider}... (${size})`));

  const prompt = roughMessage
    ? createPolishPrompt(roughMessage, truncated)
    : createCommitPartsPrompt(truncated);

  try {
    const res = await ai.generateWith(provider, prompt, { temperature: 0.3 });
    const parts = parseResponse(res.content);
    if (parts) return formatCommitMsg(parts);

    console.log(c.yellow("Could not parse AI response"));
    console.log(c.dim(`Length: ${res.content.length} chars`));
    console.log(c.dim(`Raw:\n${res.content}\n`));
    return null;
  } catch (e) {
    console.log(c.red(`AI Error: ${(e as Error).message}`));
    return null;
  }
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force") || args.includes("-f");
  const roughMessage = args.find((a) => !a.startsWith("-"));

  // 1. Check staged files
  const files = getStaged();
  if (!files.length) {
    console.log(c.yellow("No staged files. Run: git add <files>"));
    done(1);
  }

  const fileCount = files.length;
  console.log(
    c.cyan(`\n📁 ${fileCount} file${fileCount > 1 ? "s" : ""} staged`),
  );

  // 2. Lint (unless --force)
  if (!force) {
    try {
      execSync("pnpm lint", { stdio: "inherit" });
      console.log(c.green("✓ Lint passed"));
    } catch {
      const choice = (
        await ask(c.cyan("\nLint failed. [c]ontinue / [q]uit: "))
      ).toLowerCase();
      if (choice !== "c") {
        console.log(c.yellow("Aborted."));
        done(1);
      }
    }
  }

  // 3. Get diff
  const diff = getDiff();
  if (!diff) {
    console.log(c.yellow("No diff found."));
    done(1);
  }

  // 4. Get providers
  const providers = await getProviders();
  if (!providers.length) {
    console.log(c.yellow("No AI provider available."));
    console.log(c.dim("Start Ollama or set GEMINI_API_KEY in .env.local"));
    done(1);
  }

  // 5. Select provider (prompt if multiple)
  let provider: Provider;
  if (providers.length === 1) {
    provider = providers[0];
    console.log(c.dim(`Using ${provider}`));
  } else {
    const choice = (
      await ask(c.cyan(`\nProvider: [o]llama / [g]emini (default: ollama): `))
    ).toLowerCase();
    provider = choice === "g" ? "gemini" : "ollama";
  }

  // 6. Generate initial message
  let message = await generateMessage(provider, diff, roughMessage);

  // 7. Main loop
  while (true) {
    // Display state
    if (message) {
      console.log(`\n${c.green("→")} ${c.bold(message)}`);
    } else {
      console.log(c.yellow("\n✗ No commit message"));
    }

    // Show options (always consistent)
    console.log();
    if (message) {
      console.log(c.dim("  [enter] Commit"));
      console.log(c.dim("  [e]     Edit message"));
    } else {
      console.log(c.dim("  [w]     Write message manually"));
    }
    console.log(c.dim("  [r]     Retry AI generation"));
    if (providers.length > 1) {
      const other = provider === "ollama" ? "gemini" : "ollama";
      console.log(c.dim(`  [p]     Switch to ${other}`));
    }
    console.log(c.dim("  [d]     View diff"));
    console.log(c.dim("  [s]     Show staged files"));
    console.log(c.dim("  [q]     Quit"));

    const input = (await ask(c.cyan("\n> "))).toLowerCase().trim();

    // Commit (Enter or "y" with message)
    if ((input === "" || input === "y") && message) {
      console.log(c.dim("\nCommitting..."));
      if (commit(message)) {
        console.log(c.green("✓ Committed!\n"));
        done(0);
      } else {
        console.log(c.red("Commit failed. Pre-commit hook rejected?"));
        console.log(c.dim("Fix the issue and try again, or [q] to quit.\n"));
        continue;
      }
    }

    // Empty input without message - just re-show
    if (input === "" && !message) {
      continue;
    }

    // Edit
    if (input === "e") {
      if (!message) {
        console.log(c.dim("No message to edit. Use [w] to write one."));
        continue;
      }
      console.log(c.dim(`\nCurrent: ${message}`));
      console.log(
        c.dim("Format: type(scope): description  OR  type: description"),
      );
      const newMsg = await ask(c.cyan("New message (empty to keep): "));
      if (newMsg.trim()) {
        if (isValidCommitMsg(newMsg.trim())) {
          message = newMsg.trim();
          console.log(c.green("✓ Message updated"));
        } else {
          console.log(c.yellow("Invalid format. Use: type(scope): desc"));
        }
      }
      continue;
    }

    // Write manually
    if (input === "w") {
      console.log(
        c.dim("\nFormat: type(scope): description  OR  type: description"),
      );
      console.log(
        c.dim("Types: feat, fix, docs, style, refactor, perf, test, chore"),
      );
      const manual = await ask(c.cyan("Message: "));
      if (manual.trim()) {
        if (isValidCommitMsg(manual.trim())) {
          message = manual.trim();
          console.log(c.green("✓ Message set"));
        } else {
          console.log(
            c.yellow("Invalid format. Try: fix(nav): your description"),
          );
        }
      }
      continue;
    }

    // Retry
    if (input === "r") {
      message = await generateMessage(provider, diff, roughMessage);
      continue;
    }

    // Switch provider
    if (input === "p") {
      if (providers.length < 2) {
        console.log(c.dim("Only one provider available."));
        continue;
      }
      provider = provider === "ollama" ? "gemini" : "ollama";
      console.log(c.dim(`Switched to ${provider}`));
      message = await generateMessage(provider, diff, roughMessage);
      continue;
    }

    // View diff
    if (input === "d") {
      console.log(c.dim("\n─── Diff ───────────────────────────────────────"));
      const preview = diff.slice(0, 3000);
      console.log(preview);
      if (diff.length > 3000) {
        console.log(c.dim(`\n... +${diff.length - 3000} chars truncated`));
      }
      console.log(c.dim("─────────────────────────────────────────────────\n"));
      continue;
    }

    // Show staged files
    if (input === "s") {
      console.log(c.dim("\n─── Staged Files ───────────────────────────────"));
      for (const f of files) {
        console.log(`  ${f}`);
      }
      console.log(c.dim("─────────────────────────────────────────────────\n"));
      continue;
    }

    // Quit
    if (input === "q") {
      console.log(c.yellow("Aborted."));
      done(0);
    }

    // Unknown
    if (input) {
      console.log(c.dim(`Unknown: "${input}". See options above.`));
    }
  }
}

main().catch((e) => {
  console.error(c.red(`Error: ${e.message}`));
  done(1);
});
