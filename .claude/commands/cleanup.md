# Cleanup Command

Perform intelligent cleanup of the codebase. Remove unnecessary code, files, and artifacts while preserving intentional patterns.

## Tasks

### 1. Code Quality

- Remove unused imports across all TypeScript/TSX files
- Remove unused variables and functions (verify they're truly unused via grep)
- Remove `console.log` statements (except in development utilities)
- Remove commented-out code blocks (3+ consecutive commented lines)
- Do NOT remove comments that explain why something exists

### 2. File Cleanup

- Remove empty files (0 bytes or only whitespace)
- Remove orphaned files not imported anywhere (verify before deleting)
- Clean build artifacts: `.next/`, `node_modules/.cache/`

### 3. Dependency Audit

- Check for unused dependencies in package.json (grep for import/require)
- List any found but DO NOT auto-remove — report to user for confirmation

### 4. Formatting & Linting

- Run `pnpm format` to fix formatting issues
- Run `pnpm lint` to verify no errors remain

### 5. Git Cleanup (optional, ask first)

- Remove merged local branches
- Prune remote tracking branches

### 6. Comments cleanup

- Remove unnecessary extra comments.
- Only keep comments where the code is very hard to understand and the comment is really needed

## Rules

- Never delete files in `src/components/ui/` (shadcn primitives)
- Never delete `CLAUDE.md`, `DESIGN-DEVIATIONS.md`, or config files
- Never delete test files even if they appear unused
- Always show what will be deleted BEFORE deleting
- Respect `.gitignore` patterns

## Output

Provide a summary:

- Files deleted (with reasons)
- Code removed (line counts per file)
- Dependencies flagged as potentially unused
- Any issues that couldn't be auto-fixed
