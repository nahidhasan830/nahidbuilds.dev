import { Code, Headphones, Laptop } from "lucide-react";
import type { Metadata } from "next";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Uses | Nahid Hasan",
  description: "The tools, hardware, and software I use daily.",
};

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-foreground underline decoration-primary/50 underline-offset-2 transition-colors hover:decoration-primary"
    >
      {children}
    </a>
  );
}

export default function UsesPage() {
  return (
    <main className="pt-16">
      <Section>
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            What I use
          </h1>
          <p className="mt-2 text-muted-foreground">
            My daily tools and setup — inspired by{" "}
            <a
              href="https://uses.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4"
            >
              uses.tech
            </a>
          </p>

          <div className="mt-12 space-y-10">
            {/* Workstation */}
            <div>
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <Laptop className="size-5 text-primary" />
                Workstation
              </h2>
              <ul className="mt-3 ml-7 list-disc space-y-2 text-muted-foreground marker:text-primary/50">
                <li>
                  <strong className="text-foreground">MacBook Pro M4</strong> —
                  24GB RAM. Fast, silent, and handles everything I throw at it.
                </li>
                <li>
                  <strong className="text-foreground">
                    27" external monitor
                  </strong>{" "}
                  + MacBook's retina display — dual screen setup for coding and
                  reference.
                </li>
                <li>
                  <strong className="text-foreground">
                    Built-in keyboard & trackpad
                  </strong>{" "}
                  — Apple's trackpad is hard to beat.
                </li>
              </ul>
            </div>

            {/* Development */}
            <div>
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <Code className="size-5 text-primary" />
                Development
              </h2>
              <ul className="mt-3 ml-7 list-disc space-y-2 text-muted-foreground marker:text-primary/50">
                <li>
                  <ExternalLink href="https://code.visualstudio.com">
                    VS Code
                  </ExternalLink>{" "}
                  with{" "}
                  <ExternalLink href="https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme">
                    One Dark Pro
                  </ExternalLink>{" "}
                  theme — my daily driver for all coding.
                </li>
                <li>
                  <strong className="text-foreground">Terminal.app</strong> —
                  Mac's built-in terminal. Simple and gets the job done.
                </li>
                <li>
                  <ExternalLink href="https://www.monolisa.dev">
                    MonoLisa Variable
                  </ExternalLink>{" "}
                  — Clean, readable font with great ligatures.
                </li>
              </ul>
            </div>

            {/* Audio */}
            <div>
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <Headphones className="size-5 text-primary" />
                Audio
              </h2>
              <ul className="mt-3 ml-7 list-disc space-y-2 text-muted-foreground marker:text-primary/50">
                <li>
                  <ExternalLink href="https://www.soundcore.com/products/liberty-4-nc-a3947z11">
                    Anker Soundcore Liberty 4 Pro
                  </ExternalLink>{" "}
                  — ANC earbuds for focused work sessions.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
