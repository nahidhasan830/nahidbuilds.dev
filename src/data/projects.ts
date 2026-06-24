export type ProjectStatus = "live" | "in-progress";

export interface Project {
  id: string;
  title: string;
  description: string;
  role?: string;
  period?: string;
  repository?: string;
  highlights?: string[];
  techStack: string[];
  status: ProjectStatus;
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: "nahidarb-x",
    title: "NahidArbX: Real-Time Value-Bet Detection Platform",
    description:
      "Real-time sports-market analytics platform for detecting value bets against Pinnacle sharp prices.",
    role: "Personal Project / Self-Directed",
    period: "September 2025 - Present",
    repository: "github.com/nahidhasan830/nahidArbX",
    highlights: [
      "Built a 4-phase pipeline for fixtures, event matching, market normalization, and value-bet detection against Pinnacle sharp prices.",
      "Architected a 2-process TypeScript system with a Next.js frontend, standalone engine, PostgreSQL database, Drizzle ORM, and reactive detection using a 500ms debounce.",
      "Integrated 4+ betting data providers including Pinnacle, NineWickets, Velki, and SABA, with normalized fixtures, markets, odds, event matching, and value-bet calculations.",
      "Built an ML training pipeline using LightGBM, Google Cloud SQL, and Cloud Run Jobs to support model retraining and betting performance analysis.",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Drizzle ORM",
      "LightGBM",
      "Cloud Run Jobs",
    ],
    status: "in-progress",
    githubUrl: "https://github.com/nahidhasan830/nahidArbX",
  },
];
