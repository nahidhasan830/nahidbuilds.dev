# nahidbuilds.dev — The 2-Week Build Plan

### Ship a polished developer portfolio from scratch

_For Nahid Hasan — starting from zero, shipping to live_

---

## What This Plan Is (And Isn't)

**This plan is:** A focused, day-by-day guide to build and ship your portfolio site in ~2 weeks alongside your full-time job.

**This plan is not:** A study guide, a job search strategy, or a system design curriculum. Those come after the site is live. Right now, all 2–3 hours of your daily time go into one thing: building nahidbuilds.dev.

---

## The Stack

| Layer           | Tool                         | Why                                                                                  |
| --------------- | ---------------------------- | ------------------------------------------------------------------------------------ |
| Framework       | Next.js (App Router)         | You know React, just need a refresher. App Router is the modern standard.            |
| Styling         | Tailwind CSS v4 + shadcn/ui  | Fastest way to build something that looks professional without custom CSS wrestling. |
| Blog            | MDX                          | Write posts in Markdown with React components. Simple, powerful, no CMS needed.      |
| Version Control | Git + GitHub                 | Feature branch workflow. Every change goes through a PR.                             |
| CI/CD           | GitHub Actions               | Lint + type-check + build on every PR. Catches problems before deploy.               |
| Hosting         | Vercel                       | Built for Next.js. Auto-deploys on push. Free SSL.                                   |
| Domain          | nahidbuilds.dev (Cloudflare) | Already registered. Will point DNS to Vercel.                                        |

---

## Site Sections

| Section                 | What It Contains                                                                                                                                                        |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hero / About**        | Combined section. Your name, one-liner about what you do, brief professional summary. No separate "About" page — keep it on the homepage.                               |
| **Projects**            | Article-based for now. Each project is a card with title, description, tech stack, and a link to a detailed write-up. You'll add real projects as you build them later. |
| **Blog / Case Studies** | MDX-powered. Your Sunday posts live here. This is where you'll eventually document your learning journey, technical decisions, and project deep-dives.                  |
| **Contact**             | Simple — links to GitHub, LinkedIn, email. No complex contact form needed for v1.                                                                                       |
| **Resume / CV**         | A downloadable PDF link. One click, no friction.                                                                                                                        |

---

## Before You Start (Day 0 — Setup Checklist)

Do this the evening before you begin. Takes ~30 minutes.

- [ ] Make sure Node.js (v18+) is installed on your machine
- [ ] Make sure Git is installed and configured with your GitHub account
- [ ] Create a new GitHub repository called `nahidbuilds.dev` (public)
- [ ] Have your Vercel account ready (sign up with GitHub at vercel.com)
- [ ] Have your Cloudflare dashboard open (you'll need it for DNS later)
- [ ] Bookmark these docs — you'll reference them during the build:
  - Next.js App Router: https://nextjs.org/docs/app
  - Tailwind CSS v4: https://tailwindcss.com/docs
  - shadcn/ui: https://ui.shadcn.com/docs
  - MDX with Next.js: https://nextjs.org/docs/app/building-your-application/configuring/mdx
  - GitHub Actions: https://docs.github.com/en/actions

---

## Week 1: Build the Foundation

The goal this week is simple: a working site with all sections, running locally, with CI/CD pipeline ready. By Sunday, you're writing your first blog post.

---

### Day 1 — Project Setup + Layout Shell

**Time: 2–2.5 hours**

**Tasks:**

1. Initialize Next.js project with TypeScript and App Router:
   ```
   npx create-next-app@latest nahidbuilds.dev --typescript --tailwind --eslint --app --src-dir
   ```
2. Install and configure shadcn/ui following their docs (init command + add a few base components: Button, Card, Badge)
3. Set up your project structure:
   ```
   src/
   ├── app/
   │   ├── layout.tsx        ← Root layout (nav + footer)
   │   ├── page.tsx           ← Homepage
   │   ├── blog/
   │   │   └── page.tsx       ← Blog listing
   │   └── projects/
   │       └── page.tsx       ← Projects listing
   ├── components/
   │   ├── nav.tsx
   │   ├── footer.tsx
   │   └── ...
   └── content/
       └── blog/              ← MDX files will go here
   ```
4. Build the root layout: navigation bar + footer. Keep the nav simple — Logo/Name, Blog, Projects, Contact link, Resume download link.
5. Push to GitHub. Create a `dev` branch. From now on, all work happens on feature branches merged into `dev`.

**Done when:** You can run `npm run dev` and see a page with working navigation and footer.

---

### Day 2 — Hero / About Section

**Time: 2–2.5 hours**

**Tasks:**

1. Build the Hero section on the homepage. It should include:
   - Your name (Nahid Hasan)
   - A one-liner: what you do and what you're looking for (e.g., "Full-stack engineer building reliable web applications. Open to remote opportunities.")
   - Links to GitHub, LinkedIn, email
   - A "Download Resume" button
   - Optional: a professional photo or avatar
2. Build a brief "About" section below the hero — 2–3 short paragraphs about your experience, what you enjoy building, and what kind of work you're looking for.
3. Style everything with Tailwind. Make it responsive (mobile-first).

**Design tips:**

- Keep it minimal. Lots of whitespace. No clutter.
- Use shadcn/ui's color system for consistency.
- Look at https://brittanychiang.com or https://leerob.io for inspiration on clean developer portfolios. Don't copy — just notice the simplicity.

**Done when:** The homepage hero looks clean and professional on both desktop and mobile.

---

### Day 3 — Projects Section

**Time: 2–2.5 hours**

**Tasks:**

1. Create a project data file (`src/data/projects.ts`) — a simple array of objects:
   ```typescript
   type Project = {
     title: string;
     description: string;
     techStack: string[];
     link?: string;
     github?: string;
     featured: boolean;
   };
   ```
2. Add 2–3 placeholder projects. Use real descriptions of things you've worked on (even if you can't link the code). If you don't have public projects yet, describe them as case studies — focus on the problem you solved and how.
3. Build a ProjectCard component using shadcn/ui Card. Each card shows: title, short description, tech stack as Badge components, and links.
4. Build the Projects section on the homepage (show featured projects) and the `/projects` page (show all).
5. Make sure the grid is responsive — 1 column on mobile, 2 on tablet, 3 on desktop.

**Done when:** Projects section looks good and renders from your data file. Easy to add new projects later by just editing the array.

---

### Day 4 — Blog Setup with MDX

**Time: 2–2.5 hours**

**Tasks:**

1. Install and configure MDX for Next.js. Follow the official Next.js MDX docs. You have two approaches:
   - **Option A (simpler):** Use `@next/mdx` package — treats .mdx files as pages
   - **Option B (more control):** Use `next-mdx-remote` or `contentlayer` — loads MDX from a content directory, gives you frontmatter parsing, better for a blog
   - **Recommendation:** Go with Option B using `next-mdx-remote` — it's slightly more setup but gives you proper blog functionality with frontmatter (title, date, description, tags).
2. Create a utility function that reads all MDX files from `src/content/blog/`, parses frontmatter, and returns sorted blog posts.
3. Build the `/blog` page — lists all posts with title, date, description, and a "Read more" link.
4. Build the `/blog/[slug]` dynamic route — renders a single MDX post with proper typography.
5. Create a placeholder blog post to test: `hello-world.mdx` with basic frontmatter.

**Frontmatter structure:**

```yaml
---
title: "Hello World"
date: "2026-03-28"
description: "My first post on nahidbuilds.dev"
tags: ["introduction"]
---
```

**Done when:** You can write a `.mdx` file, and it shows up on the blog listing page and renders at its own URL.

---

### Day 5 — Contact + Resume + Polish

**Time: 2–2.5 hours**

**Tasks:**

1. Build the Contact section on the homepage — keep it dead simple:
   - A short line: "Want to work together? Reach out."
   - Links to: Email (mailto), GitHub, LinkedIn
   - No contact form for v1 — it adds complexity without adding value at this stage
2. Add the Resume/CV download:
   - Place your PDF resume in the `public/` folder
   - Add a download button/link in the hero section and in the nav
   - Make sure the PDF is up to date. If it's not ready, use a placeholder and update it before Week 2 ends.
3. Polish pass on everything built so far:
   - Check every page on mobile (use browser dev tools)
   - Fix any spacing, alignment, or typography issues
   - Make sure all links work
   - Check dark mode if you've implemented it (optional for v1, but shadcn/ui makes it easy)
4. Add basic metadata — page titles, descriptions, Open Graph tags for social sharing.

**Done when:** All five sections exist and work. The site feels complete (even if simple). You'd be comfortable showing it to someone.

---

### Day 6 — CI/CD Pipeline + Git Workflow

**Time: 2–2.5 hours**

**Tasks:**

1. Set up GitHub Actions. Create `.github/workflows/ci.yml`:

   ```yaml
   name: CI
   on:
     pull_request:
       branches: [dev, main]
     push:
       branches: [dev, main]

   jobs:
     quality:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: "npm"
         - run: npm ci
         - run: npm run lint
         - run: npx tsc --noEmit
         - run: npm run build
   ```

2. Test it — create a feature branch, make a small change, open a PR to `dev`. Watch the pipeline run. Fix any lint or type errors that come up.
3. Set up branch protection rules on GitHub:
   - `main` branch: require PR reviews, require CI to pass
   - `dev` branch: require CI to pass
4. Document your branching strategy in the README:
   - `main` = production (what's deployed)
   - `dev` = integration branch
   - Feature branches (`feat/blog-setup`, `fix/mobile-nav`) branch off `dev`
5. Clean up the README. It should include:
   - What the project is
   - Tech stack
   - How to run locally (`npm install` → `npm run dev`)
   - Project structure overview
   - Branching strategy

**Done when:** CI pipeline passes on every PR. Branch protection is enforced. README is professional.

---

### Day 7 (Sunday) — First Blog Post

**Time: 1.5–2 hours**

**Tasks:**

1. Write your first real blog post: **"Building nahidbuilds.dev — Week 1 Decisions and Setup"**
   - What tech stack you chose and why
   - How you set up CI/CD
   - What your project structure looks like
   - One thing that tripped you up and how you solved it
   - Keep it honest and practical. Not a tutorial — a case study of YOUR decisions.
2. Push it. Make sure it renders properly on the blog page.
3. Review the week. Is anything broken? Any section feeling incomplete? Make a list for Week 2.

**Done when:** First blog post is live on your local dev server. You have a clear list of Week 2 tasks.

---

## Week 2: Deploy, Connect, Polish

The goal this week: nahidbuilds.dev is live on the internet, polished, fast, and you're proud to share the link.

---

### Day 8 — Deploy to Vercel

**Time: 2–2.5 hours**

**Tasks:**

1. Connect your GitHub repo to Vercel:
   - Go to vercel.com → New Project → Import your `nahidbuilds.dev` repo
   - Set the production branch to `main`
   - Vercel will auto-detect Next.js and configure the build
2. Merge `dev` into `main` and trigger your first production deploy
3. Verify the site works on Vercel's default URL (something like `nahidbuilds-dev.vercel.app`)
4. Connect your custom domain:
   - In Vercel dashboard: Settings → Domains → Add `nahidbuilds.dev`
   - Vercel will give you DNS records to add
   - Go to Cloudflare dashboard → DNS → Add the records Vercel provides (usually an A record and/or CNAME)
   - **Important:** If using Cloudflare, set the DNS proxy status to "DNS only" (grey cloud) for the Vercel records. This avoids SSL conflicts since Vercel handles SSL itself.
5. Wait for DNS propagation (usually 5–30 minutes). Test that `nahidbuilds.dev` loads your site.

**Done when:** Typing `nahidbuilds.dev` in a browser shows your portfolio. SSL works (padlock icon visible).

---

### Day 9 — Performance + SEO

**Time: 2–2.5 hours**

**Tasks:**

1. Run Lighthouse in Chrome DevTools on every page. Target 90+ on all scores (Performance, Accessibility, Best Practices, SEO).
2. Fix common issues:
   - Images: Use Next.js `<Image>` component for automatic optimization
   - Fonts: Use `next/font` for optimized font loading
   - Largest Contentful Paint: Make sure the hero loads fast
   - Accessibility: Check color contrast, alt text on images, proper heading hierarchy
3. Add comprehensive metadata:
   ```typescript
   // In layout.tsx or page.tsx
   export const metadata = {
     title: "Nahid Hasan | Full-Stack Developer",
     description: "Full-stack engineer building reliable web applications...",
     openGraph: {
       title: "Nahid Hasan | Full-Stack Developer",
       description: "...",
       url: "https://nahidbuilds.dev",
       siteName: "nahidbuilds.dev",
       type: "website",
     },
   };
   ```
4. Add a `sitemap.ts` and `robots.ts` in the app directory (Next.js has built-in support for these).
5. Test social sharing — paste your URL into LinkedIn's Post Inspector or Twitter's Card Validator. Make sure the preview looks good.

**Done when:** Lighthouse scores are 90+ across the board. Social sharing preview looks professional.

---

### Day 10 — Visual Polish + Responsiveness

**Time: 2–2.5 hours**

**Tasks:**

1. Review every page on actual devices if possible — or at minimum, test these viewport widths in browser dev tools: 375px (mobile), 768px (tablet), 1024px (small laptop), 1440px (desktop).
2. Polish the typography:
   - Blog posts should be comfortable to read (max-width ~65 characters per line, proper line-height)
   - Use a clean font combination — one for headings, one for body (or just one versatile font)
3. Add subtle micro-interactions if you have time:
   - Smooth scroll to sections
   - Hover effects on project cards and nav links
   - Page transition animations (keep these subtle — no flashy stuff)
4. Check the overall visual consistency:
   - Is spacing consistent across sections?
   - Do colors feel cohesive?
   - Does the footer balance the header?
5. Get feedback from someone — a friend, colleague, or online community. Fresh eyes catch things you've gone blind to.

**Done when:** The site looks polished and professional at every screen size. You've gotten at least one person's feedback.

---

### Day 11 — Final Features + Edge Cases

**Time: 2–2.5 hours**

**Tasks:**

1. Add a 404 page (Next.js: `app/not-found.tsx`). Make it helpful — include a link back to the homepage.
2. Add loading states if any pages need them.
3. Check all external links (GitHub, LinkedIn, email). Make sure they open in new tabs where appropriate.
4. Add a favicon and app icons:
   - Create a simple favicon (your initials or a simple icon)
   - Add `icon.tsx` or place favicon files in the `app/` directory
5. Final accessibility check:
   - Tab through the entire site with keyboard only
   - Make sure focus states are visible
   - Check heading hierarchy (one H1 per page, H2s for sections, etc.)
6. Review your README one more time. Update if anything changed during the build.

**Done when:** No broken links, no missing pages, no accessibility issues. The site handles edge cases gracefully.

---

### Day 12 — Content Quality + Resume

**Time: 2 hours**

**Tasks:**

1. Re-read every piece of text on the site. Out loud if possible. Fix anything that sounds awkward, has a typo, or doesn't add value.
2. Finalize your resume PDF:
   - Make sure it reflects your current skills and experience
   - Include nahidbuilds.dev as your portfolio link
   - Keep it to 1 page (2 max if you have significant experience)
   - Place the final version in `public/resume.pdf`
3. Review your project descriptions. Are they clear? Do they explain the problem you solved, not just the tech you used? Each should answer: What was the problem? What did I build? What was the outcome?
4. Review your "About" section. Does it sound like you, or does it sound like a generic developer bio? Make it personal.

**Done when:** Every word on the site is intentional. Resume is current and downloadable.

---

### Day 13 — Final Deploy + Smoke Test

**Time: 1.5–2 hours**

**Tasks:**

1. Merge everything to `main`. Trigger production deploy.
2. Full smoke test on the live site (nahidbuilds.dev):
   - [ ] Homepage loads correctly
   - [ ] Navigation works on all pages
   - [ ] All project cards render properly
   - [ ] Blog listing shows all posts
   - [ ] Individual blog post renders correctly
   - [ ] Contact links work (email opens mail client, GitHub/LinkedIn open in new tabs)
   - [ ] Resume downloads successfully
   - [ ] Site works on mobile
   - [ ] SSL is working (padlock icon, https://)
   - [ ] 404 page works (try a random URL)
   - [ ] Social sharing preview works (paste URL on LinkedIn)
   - [ ] Lighthouse scores still 90+
3. Fix anything that's broken. Deploy again if needed.
4. Share the link with 2–3 people and ask for honest feedback.

**Done when:** nahidbuilds.dev is live, polished, and you're confident sharing it with the world.

---

### Day 14 (Sunday) — Second Blog Post + Retrospective

**Time: 1.5–2 hours**

**Tasks:**

1. Write your second blog post: **"Deploying nahidbuilds.dev — CI/CD, Vercel, and Cloudflare DNS Setup"**
   - Walk through your deployment pipeline
   - Explain how Vercel auto-deploys from GitHub
   - Cover the DNS setup with Cloudflare
   - Mention any gotchas you ran into
2. Push and deploy.
3. Write a personal retrospective (just for yourself, not published):
   - What went well?
   - What took longer than expected?
   - What would you do differently?
   - What are you most proud of?

---

## You're Live. What's Next?

Your portfolio is shipped. nahidbuilds.dev is on the internet. You have 2 blog posts published, a CI/CD pipeline, and a clean codebase. That's more than most people ever get to.

Now the other tracks begin — on your own schedule:

### Start Hello Interview

System design and DSA. You have a dedicated platform for this. Go at your own pace. As you learn concepts, you'll naturally find ways to improve your portfolio's architecture.

### Start Applying (Week 3)

- Target platforms: Turing, Toptal, Arc.dev, LinkedIn Remote, WeWorkRemotely, Remotive
- Include your portfolio link (nahidbuilds.dev) in every application
- Your blog posts prove you can communicate technically in writing
- Consider recording a 2–3 min Loom walkthrough of your site's architecture as a differentiator

### Keep Writing (Every Sunday)

The Sunday blog post habit is your long-term asset. Topic ideas:

- What you're learning from Hello Interview
- Technical deep-dives on concepts you're studying
- "I tried X — here's what happened" posts about new tools or techniques
- Case studies of projects at work (without sharing proprietary info)

### Future Portfolio Additions (When Ready)

These are the ideas we discussed earlier — add them when you have the skills and time:

- AI Content Pipeline (auto-draft articles, approval workflow, LinkedIn post generation)
- AI Skills Analyzer (job requirements vs your skills, gap analysis)
- More projects as you build them
- "Work With Me" page once you have case studies and testimonials

---

## Daily Checklist Template

Copy this for each working day:

```
## Day [X] — [Date]

### Plan
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

### Completed
- ...

### Blocked / Issues
- ...

### Tomorrow
- ...
```

---

## Quick Reference

| Need                 | Where                                      |
| -------------------- | ------------------------------------------ |
| Next.js docs         | https://nextjs.org/docs                    |
| Tailwind CSS docs    | https://tailwindcss.com/docs               |
| shadcn/ui components | https://ui.shadcn.com                      |
| GitHub Actions docs  | https://docs.github.com/en/actions         |
| Vercel deployment    | https://vercel.com/docs                    |
| Cloudflare DNS       | Your Cloudflare dashboard                  |
| Your repo            | github.com/[your-username]/nahidbuilds.dev |
| Your live site       | https://nahidbuilds.dev                    |

---

## The Only Rule

**Ship it.** Don't let perfect be the enemy of live. A deployed portfolio with clean code and 2 blog posts beats a local masterpiece that nobody can see. You can always improve it tomorrow — but only if it's live today.
