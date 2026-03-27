export type ProjectStatus = "live" | "in-progress" | "planned";

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  status: ProjectStatus;
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: "nahidbuilds",
    title: "nahidbuilds.dev",
    description:
      "My portfolio site built with Next.js 16. Dark-first design with amber accents, bento grid layouts, and smooth animations.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    status: "live",
    githubUrl: "https://github.com/nahidhasan830/nahidbuilds.dev",
    liveUrl: "https://nahidbuilds.dev",
  },
  {
    id: "skillpulse",
    title: "SkillPulse",
    description:
      "AI-powered job market analyzer that scrapes listings from top tech companies, identifies trending skills, and delivers actionable insights for engineers to stay ahead.",
    techStack: ["Python", "Scrapy", "Claude API", "FastAPI", "PostgreSQL"],
    status: "planned",
  },
  {
    id: "scribe",
    title: "Scribe",
    description:
      "Intelligent content engine that researches topics across the web and generates publication-ready articles, LinkedIn posts, and technical blogs with a natural human voice.",
    techStack: [
      "TypeScript",
      "LangChain",
      "Claude API",
      "Next.js",
      "Vercel AI SDK",
    ],
    status: "planned",
  },
];
