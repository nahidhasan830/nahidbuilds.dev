import { Code, Headphones, Laptop } from "lucide-react";
import { ExternalLink } from "@/components/external-link";
import type { InfoSection } from "@/components/info-sections";

const externalLinkClassName =
  "text-foreground underline decoration-primary/50 underline-offset-2 transition-colors hover:decoration-primary";

export const usesSections: InfoSection[] = [
  {
    title: "Workstation",
    icon: Laptop,
    items: [
      {
        content: (
          <>
            <strong className="text-foreground">MacBook Pro M4</strong> - 24GB
            RAM. Fast, silent, and handles everything I throw at it.
          </>
        ),
      },
      {
        content: (
          <>
            <strong className="text-foreground">
              27&quot; external monitor
            </strong>{" "}
            + MacBook&apos;s retina display - dual screen setup for coding and
            reference.
          </>
        ),
      },
      {
        content: (
          <>
            <strong className="text-foreground">
              Built-in keyboard &amp; trackpad
            </strong>{" "}
            - Apple&apos;s trackpad is hard to beat.
          </>
        ),
      },
    ],
  },
  {
    title: "Development",
    icon: Code,
    items: [
      {
        content: (
          <>
            <ExternalLink
              href="https://code.visualstudio.com"
              className={externalLinkClassName}
            >
              VS Code
            </ExternalLink>{" "}
            with{" "}
            <ExternalLink
              href="https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme"
              className={externalLinkClassName}
            >
              One Dark Pro
            </ExternalLink>{" "}
            theme - my daily driver for all coding.
          </>
        ),
      },
      {
        content: (
          <>
            <strong className="text-foreground">Terminal.app</strong> -
            Mac&apos;s built-in terminal. Simple and gets the job done.
          </>
        ),
      },
      {
        content: (
          <>
            <ExternalLink
              href="https://www.monolisa.dev"
              className={externalLinkClassName}
            >
              MonoLisa Variable
            </ExternalLink>{" "}
            - Clean, readable font with great ligatures.
          </>
        ),
      },
    ],
  },
  {
    title: "Audio",
    icon: Headphones,
    items: [
      {
        content: (
          <>
            <ExternalLink
              href="https://www.soundcore.com/products/liberty-4-nc-a3947z11"
              className={externalLinkClassName}
            >
              Anker Soundcore Liberty 4 Pro
            </ExternalLink>{" "}
            - ANC earbuds for focused work sessions.
          </>
        ),
      },
    ],
  },
];
