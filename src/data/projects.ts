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
      "Designed a **4-phase processing pipeline** for fixture ingestion, event matching, market normalization, and value-bet detection against Pinnacle sharp prices.",
      "Built the platform through an **agentic engineering workflow**, authoring system architecture and specifications while directing **Claude Code and OpenAI Codex** throughout implementation.",
      "Architected a **2-process TypeScript system** using Next.js, PostgreSQL, Drizzle ORM, and a standalone detection engine.",
      "Integrated **4+ betting data providers** including Pinnacle, NineWickets, Velki, and SABA, with normalized fixtures, markets, odds, event matching, and value-bet calculations.",
      "Built an **ML training pipeline** using LightGBM, Cloud SQL, and Cloud Run Jobs for automated model retraining.",
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
