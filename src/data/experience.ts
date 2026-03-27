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
      "Resolved a systemic average-calculation bug across 5+ dashboards where the system divided traffic metrics by expected data points instead of actual ones, restoring **accurate data reporting** for platform users",
      "Developed and maintained **8+ dashboards** — including Site Summary, Flows, Alert History, and Conflict Heatmaps — as part of a small frontend team on a real-time **traffic video analytics platform** serving public and private sector clients",
      "Revamped the **alert management UI** — covering configuration, trend and incident-based alert types, multi-site support, timezone-aware history, and configurable recipients — enabling **real-time road safety monitoring** across multiple geographies",
      "Added a visual coverage statistics module to the Input Quality Reporting feature and resolved critical issues including broken chart axes and false failure statuses — ensuring **platform users** could trust the data powering downstream analytics",
      "Shipped **full-stack features** including raw data export, trajectory overlays and bulk video management — owning both the **UI and supporting APIs** end-to-end",
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
      "Independently drove a **full-stack date library modernization** across the entire platform, replacing the deprecated Moment.js with date-fns to keep the platform on a **supported, actively maintained** dependency",
      "Built the **conflict heatmaps and video clips** feature from scratch — including TTC, PET, and conflict severity filtering, CSV export, and map view — establishing the platform's **primary road safety analysis tool**",
      "Developed the **camera calibration tooling** including angle shift detection, undo/redo workflows, and trajectory visualization — ensuring precise calibration so the **video processing pipeline** produces more accurate traffic data",
      "Engineered the **speed analytics dashboards** including speed histograms, percentile views, multi-unit support, and 15-minute and hourly binned data viewing and export — delivering granular **speed reporting for traffic engineers**",
      "Designed and delivered **full-stack data export** across heatmaps, speeds, flows, and manual validation — enabling traffic engineers to disseminate **safety analysis** to downstream stakeholders",
    ],
    techStack: ["React", "Redux", "Node.js", "AWS SAM", "DynamoDB"],
  },
];
