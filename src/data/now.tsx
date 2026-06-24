import type { InfoSection } from "@/components/info-sections";

export const nowSections: InfoSection[] = [
  {
    title: "Building",
    items: [
      {
        content: (
          <>
            <strong className="text-foreground">nahidbuilds.dev</strong> - This
            portfolio site. Dark-first design, bento layouts, and learning
            Next.js 16 along the way.
          </>
        ),
      },
      {
        content: (
          <>
            Planning <strong className="text-foreground">SkillPulse</strong> -
            An AI-powered job market analyzer to track trending skills.
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
    title: "Reading",
    items: [
      {
        content: (
          <>
            <em>Designing Data-Intensive Applications</em> by Martin Kleppmann
          </>
        ),
      },
      {
        content:
          "Various engineering blogs - ByteByteGo, The Pragmatic Engineer",
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
