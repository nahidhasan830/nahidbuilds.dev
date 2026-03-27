# nahidbuilds.dev

Personal portfolio website for Nahid Hasan, Software Engineer.

## Quick Start

```bash
pnpm install
pnpm dev
```

## Tech Stack

| Category | Choice |
|----------|--------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui |
| Linting | Biome |
| Hosting | Vercel |

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Development server |
| `pnpm build` | Production build |
| `pnpm lint` | Run Biome linter |
| `pnpm format` | Format with Biome |
| `pnpm commit` | Interactive conventional commit |

## Project Structure

```
src/
├── app/           # Pages and API routes
├── components/
│   ├── ui/        # shadcn/ui primitives
│   ├── blocks/    # Page sections
│   └── icons/     # SVG icons
├── data/          # Static data
└── lib/           # Utilities
```

## Workflow

**Local:** Pre-commit hooks run lint + typecheck via Lefthook.

**CI:** GitHub Actions runs lint, typecheck, build on push/PR to main.

**Deploy:** Vercel auto-deploys on push to main.

## License

MIT
