export type ProjectStatus = "live" | "in-progress";

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
];
