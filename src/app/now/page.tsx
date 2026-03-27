import type { Metadata } from "next";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Now | Nahid Hasan",
  description: "What I'm currently working on, learning, and exploring.",
};

export default function NowPage() {
  return (
    <main className="pt-16">
      <Section>
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            What I'm doing now
          </h1>
          <p className="mt-2 text-muted-foreground">
            Updated March 2026 — inspired by{" "}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4"
            >
              nownownow.com
            </a>
          </p>

          <div className="mt-12 space-y-10">
            {/* Building */}
            <div>
              <h2 className="text-xl font-semibold">Building</h2>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">nahidbuilds.dev</strong> —
                  This portfolio site. Dark-first design, bento layouts, and
                  learning Next.js 16 along the way.
                </li>
                <li>
                  Planning{" "}
                  <strong className="text-foreground">SkillPulse</strong> — An
                  AI-powered job market analyzer to track trending skills.
                </li>
              </ul>
            </div>

            {/* Learning */}
            <div>
              <h2 className="text-xl font-semibold">Learning</h2>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                <li>
                  Deep-diving into{" "}
                  <strong className="text-foreground">
                    AI/LLM integration
                  </strong>{" "}
                  — Claude API, LangChain, building practical AI tools.
                </li>
                <li>
                  Improving my{" "}
                  <strong className="text-foreground">system design</strong>{" "}
                  skills for scalable architectures.
                </li>
              </ul>
            </div>

            {/* Reading */}
            <div>
              <h2 className="text-xl font-semibold">Reading</h2>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                <li>
                  <em>Designing Data-Intensive Applications</em> by Martin
                  Kleppmann
                </li>
                <li>
                  Various engineering blogs — ByteByteGo, The Pragmatic Engineer
                </li>
              </ul>
            </div>

            {/* Life */}
            <div>
              <h2 className="text-xl font-semibold">Life</h2>
              <p className="mt-3 text-muted-foreground">
                Based in Bangladesh. Focused on building my skills and shipping
                projects that solve real problems.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
