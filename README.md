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

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Development server |
| `pnpm build` | Production build |
| `pnpm lint` | Run Biome linter |
| `pnpm format` | Format with Biome |
| `pnpm commit` | Interactive commit (czg) |
| `pnpm commit:ai` | AI-assisted commit |

## AI Commit

```bash
pnpm commit:ai                      # Generate from diff
pnpm commit:ai "fixed nav bug"      # Polish rough message
pnpm commit:ai --force              # Skip lint
```

Interactive options:
- `Enter` - Commit with current message
- `e` - Edit message
- `w` - Write message manually
- `r` - Retry AI generation
- `p` - Switch provider (Ollama/Gemini)
- `d` - View diff
- `s` - Show staged files
- `q` - Quit

## Project Structure

```
src/
├── app/                 # Pages and API routes
├── components/
│   ├── ui/              # shadcn/ui primitives
│   ├── blocks/          # Page sections (hero, projects)
│   └── icons/           # SVG icon components
├── data/                # Static data (projects, experience)
└── lib/
    ├── ai/              # AI providers and prompts
    │   ├── providers/   # Ollama, Gemini
    │   └── prompts/     # Commit message templates
    └── utils.ts         # Shared utilities
```

## License

MIT
