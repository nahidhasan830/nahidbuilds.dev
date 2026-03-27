/**
 * Commit Message Prompt
 *
 * Generates conventional commit messages from git diffs.
 */

export function createCommitPrompt(diff: string): string {
  return `You are a commit message generator. Analyze the git diff and generate a conventional commit message.

Rules:
1. Use conventional commit format: type(scope): description
2. Types: feat, fix, docs, style, refactor, perf, test, chore
3. Scope is optional, use the main file/folder changed
4. Description must be lowercase, no period at end
5. Keep under 72 characters
6. Be specific about what changed, not how

Examples:
- feat(auth): add google oauth login
- fix(api): handle null response from user endpoint
- refactor(utils): extract date formatting to helper
- chore(deps): update next.js to v16

Git diff:
\`\`\`
${diff}
\`\`\`

Respond with ONLY the commit message, nothing else.`;
}

export function createCommitPartsPrompt(diff: string): string {
  return `Analyze the git diff and suggest a conventional commit.

Return JSON only:
{"type":"feat|fix|docs|style|refactor|perf|test|chore","scope":"optional-scope","description":"lowercase description"}

Rules:
- type: choose the most appropriate
- scope: main area changed (e.g., "ui", "api", "auth") or null if unclear
- description: what changed, lowercase, no period, max 50 chars

Git diff:
\`\`\`
${diff}
\`\`\`

JSON only:`;
}

export function createPolishPrompt(roughMessage: string, diff: string): string {
  return `Polish this rough commit message into conventional commit format.

Rough message: "${roughMessage}"

Return JSON only:
{"type":"feat|fix|docs|style|refactor|perf|test|chore","scope":"optional-scope","description":"polished description"}

Rules:
- Keep the user's intent, just format it properly
- type: infer from message and diff context
- scope: infer from diff or null
- description: clean up the message, lowercase, no period, max 50 chars

Git diff for context:
\`\`\`
${diff}
\`\`\`

JSON only:`;
}
