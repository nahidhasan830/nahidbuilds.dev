import type { InfoSection } from "@/components/info-sections";

export const nowSections: InfoSection[] = [
  {
    title: "Building",
    items: [
      {
        content: (
          <>
            <strong className="text-foreground">NahidArbX</strong> — a real-time
            sports-market analytics platform for detecting value bets against
            Pinnacle sharp prices, built through an agentic engineering
            workflow.
          </>
        ),
      },
    ],
  },
  {
    title: "Learning",
    items: [
      {
        content: (
          <>
            Deepening{" "}
            <strong className="text-foreground">agentic engineering</strong> —
            directing Claude Code, OpenAI Codex, and related tools with clear
            specs and architecture to ship production-ready software.
          </>
        ),
      },
      {
        content: (
          <>
            Improving my{" "}
            <strong className="text-foreground">system design</strong> skills
            for scalable architectures.
          </>
        ),
      },
    ],
  },
  {
    title: "Life",
    body: (
      <p>
        Based in Bangladesh. Focused on building my skills and shipping projects
        that solve real problems.
      </p>
    ),
  },
];
