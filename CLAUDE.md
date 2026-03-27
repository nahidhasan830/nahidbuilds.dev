# nahidbuilds.dev

Developer portfolio site for Nahid Hasan.

The most important part of this project is, I don't want to feel any magic because of claude code. Even I am using claude code to write code, still I should be able to know each line of code, full structure of the entire codebase. This is the project that I'm building from scratch.

## Research Strategy

Before installing any third-party packages, we always research through the internet and find the standard practice and most demanding technology for 2026 and later. Always target the **latest stable versions**, not previous versions.

## Tech Stack (Researched March 2026)

| Category | Choice | Why |
|----------|--------|-----|
| **Framework** | Next.js 16 (App Router) | Latest stable, Turbopack default, React 19.2 |
| **Language** | TypeScript | Industry standard, excellent DX |
| **Package Manager** | pnpm | 70% less disk, 2-3x faster than npm |
| **Linter/Formatter** | Biome | 10-25x faster than ESLint+Prettier, single config |
| **Styling** | Tailwind CSS v4 | CSS-first config, auto content detection |
| **Components** | shadcn/ui | Copy-paste ownership, not a dependency |
| **Blog** | MDX (add later) | Install when needed |
| **Hosting** | Vercel | Native Next.js support |
| **Domain** | nahidbuilds.dev (Cloudflare DNS) | |
| **CI/CD** | GitHub Actions | |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── blog/
│   │   ├── page.tsx        # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx    # Individual blog post
│   └── projects/
│       └── page.tsx        # Projects listing
├── components/
│   ├── ui/                 # Raw shadcn primitives (untouched)
│   ├── blocks/             # Product-level compositions
│   ├── nav.tsx
│   └── footer.tsx
├── content/
│   └── blog/               # MDX blog posts (add later)
├── data/
│   └── projects.ts         # Project data
└── lib/
    └── utils.ts            # cn() helper and utilities
```

## Commands

```bash
pnpm dev         # Start development server (Turbopack)
pnpm build       # Production build
pnpm lint        # Run Biome linter
pnpm format      # Format with Biome
```

## Git Workflow

- `main` - Production branch (deployed to Vercel)
- `dev` - Integration branch
- Feature branches: `feat/`, `fix/`, `docs/` prefixes
- All changes go through PRs with CI checks

## Site Sections

1. **Hero/About** - Name, one-liner, social links, resume download
2. **Projects** - Card grid with title, description, tech stack badges
3. **Blog** - MDX-powered posts with frontmatter
4. **Contact** - GitHub, LinkedIn, email links
5. **Resume** - Downloadable PDF at `/resume.pdf`

## Conventions

- Mobile-first responsive design
- Use shadcn/ui components where applicable
- Keep components small and focused
- Blog frontmatter: title, date, description, tags
- Prefer `next/image` for images, `next/font` for fonts
