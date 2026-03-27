/**
 * Commit Message Prompt
 *
 * Generates conventional commit messages from git diffs.
 */

export function createCommitPrompt(diff: string): string {
  return `Generate a conventional commit message for this git diff.

Format: type(scope): description  OR  type: description

STRICT RULES:
- type: one of feat|fix|docs|style|refactor|perf|test|chore
- scope: single lowercase word only (ui, api, auth, nav, deps, etc.)
  - NO file names, NO paths, NO multiple values
  - Omit scope if changes span multiple areas
- description: lowercase, no period, max 50 chars

Valid examples:
- feat(auth): add google oauth login
- fix(api): handle null user response
- chore(deps): update dependencies
- refactor: reorganize project structure

Git diff:
\`\`\`
${diff}
\`\`\`

Respond with ONLY the commit message:`;
}

export function createCommitPartsPrompt(diff: string): string {
  return `Analyze the git diff and generate a conventional commit message.

Return JSON only:
{"type":"...","scope":"...or null","description":"..."}

STRICT RULES:
- type: one of feat|fix|docs|style|refactor|perf|test|chore
- scope: MUST be a single lowercase word (e.g., "ui", "api", "auth", "nav", "deps")
  - NO file names (wrong: "README.md", "package.json")
  - NO multiple values (wrong: "api, ui")
  - NO paths (wrong: "src/components")
  - If changes span multiple areas, set scope to null
- description: lowercase, no period at end, max 50 chars, describe WHAT changed

Examples of VALID output:
{"type":"feat","scope":"auth","description":"add google oauth login"}
{"type":"fix","scope":"api","description":"handle null user response"}
{"type":"chore","scope":"deps","description":"update dependencies"}
{"type":"refactor","scope":null,"description":"reorganize project structure"}

Git diff:
\`\`\`
${diff}
\`\`\`

JSON only:`;
}

export function createPolishPrompt(roughMessage: string, diff: string): string {
  return `Convert the user's rough message into a conventional commit.

USER'S MESSAGE (this is the PRIMARY source - respect their intent):
"${roughMessage}"

The user knows what they changed. Your job is to FORMAT their message, not rewrite it.
Use the diff only to infer type and scope if not clear from the message.

Return JSON only:
{"type":"...","scope":"...or null","description":"..."}

RULES:
- description: MUST reflect the user's message - just clean it up, don't change meaning
- type: infer from user's message (fix, feat, refactor, etc.)
- scope: single lowercase word (ui, api, nav, deps) or null if unclear
  - NO file names, NO paths, NO multiple values

Examples:
User says "fix hamburger menu bug" → {"type":"fix","scope":"nav","description":"fix hamburger menu bug"}
User says "updated deps" → {"type":"chore","scope":"deps","description":"update dependencies"}
User says "refactored the commit flow" → {"type":"refactor","scope":"commit","description":"refactor commit flow"}

Git diff (for context only):
\`\`\`
${diff}
\`\`\`

JSON only:`;
}
