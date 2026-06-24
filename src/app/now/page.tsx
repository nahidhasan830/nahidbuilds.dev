import type { Metadata } from "next";
import { ExternalLink } from "@/components/external-link";
import { InfoSections } from "@/components/info-sections";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/ui/section";
import { nowSections } from "@/data/now";

export const metadata: Metadata = {
  title: "Now | Nahid Hasan",
  description: "What I'm currently working on, learning, and exploring.",
};

export default function NowPage() {
  return (
    <main className="pt-16">
      <Section>
        <div className="max-w-2xl">
          <PageHeader
            title="What I'm doing now"
            description={
              <p>
                Updated March 2026 - inspired by{" "}
                <ExternalLink
                  href="https://nownownow.com/about"
                  className="text-primary underline underline-offset-4"
                >
                  nownownow.com
                </ExternalLink>
              </p>
            }
          />

          <InfoSections sections={nowSections} />
        </div>
      </Section>
    </main>
  );
}
