import type { InfoSection } from "@/components/info-sections";

export const nowSections: InfoSection[] = [
  {
    title: "Building",
    items: [
      {
        content: (
          <>
            <strong className="text-foreground">NahidArbX</strong> - A real-time
            sports-market analytics platform for detecting value bets against
            Pinnacle sharp prices.
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
            Deep-diving into{" "}
            <strong className="text-foreground">AI/LLM integration</strong> -
            Claude API, LangChain, building practical AI tools.
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
