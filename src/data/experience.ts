export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  locationType: "remote" | "onsite" | "hybrid";
  startDate: string;
  endDate: string | null;
  achievements: string[];
  techStack: string[];
}

export const experiences: Experience[] = [
  {
    id: "transoft",
    company: "Transoft Solutions",
    role: "Software Engineer",
    location: "Brisbane, Australia",
    locationType: "remote",
    startDate: "2024-10",
    endDate: null,
    achievements: [
      "Built and maintained **10+ real-time dashboards** for a traffic analytics platform serving **~2,000 government and private-sector sites**",
      "Fixed a systemic **data accuracy bug across 5+ dashboards**, restoring reliable traffic reporting platform-wide",
      "Revamped the **alert management system** with multi-site, multi-timezone, and configurable notification support for **real-time safety monitoring**",
      "Reduced **network requests by up to 80%** by loading only selected camera data and implementing caching",
      "Built and maintained **serverless backend infrastructure** using **AWS SAM, Lambda, CloudFormation, and DynamoDB**",
      "Integrated **agentic engineering workflows** with **Claude Code and OpenAI Codex** — authoring technical specifications, orchestrating AI-assisted implementation, and shipping production-ready software",
    ],
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "AWS SAM",
      "Lambda",
      "DynamoDB",
    ],
  },
  {
    id: "amag",
    company: "Advanced Mobility Analytics Group",
    role: "Software Developer",
    location: "Brisbane, Australia",
    locationType: "remote",
    startDate: "2022-01",
    endDate: "2024-09",
    achievements: [
      "Built **conflict heatmaps and video clip features from scratch** with advanced filtering, CSV export, and map visualization",
      "Developed **camera calibration tooling** with angle-shift detection, trajectory visualization, and undo/redo workflows",
      "Built **speed analytics dashboards** and end-to-end data export APIs using **Lambda, DynamoDB, and AWS SAM**",
      "Migrated the platform from **Moment.js to date-fns**, modernizing frontend and API code",
    ],
    techStack: ["React", "Redux", "Node.js", "AWS SAM", "DynamoDB"],
  },
];
