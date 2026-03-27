# nahidbuilds.dev

Personal portfolio website for Nahid Hasan, Software Engineer.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Linting**: Biome
- **Package Manager**: pnpm

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm lint` | Run Biome linter |
| `pnpm format` | Format code with Biome |
| `pnpm commit` | Interactive conventional commit (czg) |
| `pnpm commit:ai` | AI-assisted commit message |

## AI Commit

Generate commit messages with AI assistance:

```bash
# Auto-generate from diff
pnpm commit:ai

# Polish your rough message
pnpm commit:ai "fixed the nav bug"

# Skip lint checks
pnpm commit:ai --force

# Use manual czg instead
pnpm commit:ai --manual
```

## Project Structure

```
src/
├── app/           # Next.js app router pages
├── components/
│   ├── ui/        # shadcn/ui primitives
│   └── blocks/    # Page sections (hero, projects, etc.)
├── data/          # Static data (projects, experience)
└── lib/           # Utilities and AI helpers
```

## License

MIT
