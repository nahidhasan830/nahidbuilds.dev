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
      "Built and maintained **10+ dashboards** — including Site Summary, Flows, Alerts, and Conflict Heatmaps — on a **real-time traffic analytics platform** serving ~2,000 sites across government and private sector clients",
      "Fixed a systemic **data accuracy bug across 5+ dashboards** — the platform divided traffic metrics by expected data points instead of actual ones, **restoring reliable reporting** for all platform users",
      "Revamped the **alert management system** — configuration, multiple alert types, **multi-site and timezone support**, and configurable recipients — enabling **real-time safety monitoring across geographies**",
      "Reduced **network requests by up to 80%** on data-heavy pages by loading only the selected camera's data (3–5 per site) and **caching results** until the backend data changed",
    ],
    techStack: ["React", "TypeScript", "Node.js", "DynamoDB"],
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
      "Built the **conflict heatmaps and video clips feature from scratch** — with **advanced filtering** (severity, safety metrics, ratings, and more), CSV export, and map view — establishing the platform's **primary road safety analysis tool**",
      "Developed the **camera calibration tooling** — angle shift detection, undo/redo workflows, and trajectory visualisation — ensuring **accurate traffic data** from the video processing pipeline",
      "Built the **speed analytics dashboards** (histograms, percentiles, multi-unit support) and delivered **full-stack data export across all major dashboards** — enabling traffic engineers to extract and share safety data downstream",
      "Migrated the **entire platform** from Moment.js to date-fns — updating all **frontend and API files** to a modern, actively maintained library with a **smaller footprint**",
    ],
    techStack: ["React", "Redux", "Node.js", "AWS SAM", "DynamoDB"],
  },
];
