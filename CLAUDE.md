# nahidbuilds.dev

Developer portfolio site for Nahid Hasan.

The most important part of this project is, I don't want to feel any magic because of claude code. Even I am using claude code to write code, still I should be able to know each line of code, full structure of the entire codebase. This is the project that I'm building from scratch.

## Research Strategy

Before installing any third-party packages, we always research through the internet and find the standard practice and most demanding technology for 2026 and later. Always target the **latest stable versions**, not previous versions.

## Tech Stack (Researched March 2026)

| Category             | Choice                           | Why                                               |
| -------------------- | -------------------------------- | ------------------------------------------------- |
| **Framework**        | Next.js 16 (App Router)          | Latest stable, Turbopack default, React 19.2      |
| **Language**         | TypeScript                       | Industry standard, excellent DX                   |
| **Package Manager**  | pnpm                             | 70% less disk, 2-3x faster than npm               |
| **Linter/Formatter** | Biome                            | 10-25x faster than ESLint+Prettier, single config |
| **Styling**          | Tailwind CSS v4                  | CSS-first config, auto content detection          |
| **Components**       | shadcn/ui                        | Copy-paste ownership, not a dependency            |
| **Blog**             | MDX (add later)                  | Install when needed                               |
| **Hosting**          | Vercel                           | Native Next.js support                            |
| **Domain**           | nahidbuilds.dev (Cloudflare DNS) |                                                   |
| **CI/CD**            | GitHub Actions                   |                                                   |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   └── projects/
│       └── page.tsx
├── components/
│   ├── ui/
│   ├── blocks/
│   ├── nav.tsx
│   └── footer.tsx
├── content/
│   └── blog/
├── data/
│   └── projects.ts
└── lib/
    └── utils.ts
```

## Commands

```bash
pnpm dev
pnpm build
pnpm lint
pnpm format
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

## Design Philosophy (Researched March 2026)

### Color System

| Token          | Light Mode            | Dark Mode                     |
| -------------- | --------------------- | ----------------------------- |
| `--primary`    | `oklch(0.65 0.17 55)` | `oklch(0.72 0.17 55)`         |
| `--background` | Warm off-white        | `oklch(0.1 0 0)` — soft black |
| `--foreground` | Near black            | `oklch(0.95 0 0)`             |

**Accent = Amber** — represents "building/creating" energy, stands out from typical blue portfolios.

### Typography

- **Body**: Geist Sans (variable font)
- **Code**: Geist Mono
- No additional display fonts

### Layout

- **Bento grid** for projects section
- **1rem (16px) border-radius** on cards
- Mobile-first responsive

### Animation

- Hover: `150-200ms` transitions, subtle scale (max 1.02x)
- Respect `prefers-reduced-motion` always
- No parallax, no heavy 3D transforms

### Accessibility

- WCAG AA minimum (4.5:1 contrast ratio)
- Visible focus states on all interactive elements
- Fully keyboard navigable

## Feature Roadmap (Researched March 2026)

Unique portfolio elements prioritized by impact and effort.

### Phase 1: MVP (Current)

- [x] Design philosophy established
- [ ] Hero section (name, title, socials, resume)
- [ ] Navigation
- [ ] Projects section (bento grid)
- [ ] Footer

### Phase 2: Differentiation

- [ ] **Command palette (Cmd+K)** — spotlight navigation, use shadcn/ui Command
- [ ] **"Currently building" status** — dynamic line in hero showing active project
- [ ] **/now page** — what you're working on, learning, reading
- [ ] **/uses page** — your tools, hardware, software setup

### Phase 3: Polish

- [ ] **Scroll-triggered reveals** — fade-in sections with Framer Motion
- [ ] **Magnetic buttons** — subtle cursor attraction on hover
- [ ] **Multi-phrase type animation** — "I build [smooth UIs | scalable APIs]"

### Phase 4: Advanced (Post-Launch)

- [ ] **Live project previews** — embedded demos in project cards
- [ ] **/changelog page** — document portfolio evolution
- [ ] **Achievement system** — gamified engagement (easter eggs)
- [ ] **Blog with MDX** — full writing support

### Implementation Notes

- Each feature should demonstrate technical skill through the site itself
- Performance is a feature — maintain 90+ Lighthouse scores
- Accessibility is visible — beautiful focus states, skip links

## Rules

- Do not add comments while writing code.
- Prefer clear names, small reusable functions, and simple module boundaries over explanatory comments.
- If code is hard enough to need a comment, refactor it first.
- Do not commit AI tool folders, prompt scratch files, or generated agent artifacts.
