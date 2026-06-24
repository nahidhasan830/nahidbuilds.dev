import type { Metadata } from "next";
import { ExternalLink } from "@/components/external-link";
import { InfoSections } from "@/components/info-sections";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/ui/section";
import { usesSections } from "@/data/uses";

export const metadata: Metadata = {
  title: "Uses | Nahid Hasan",
  description: "The tools, hardware, and software I use daily.",
};

export default function UsesPage() {
  return (
    <main className="pt-16">
      <Section>
        <div className="max-w-2xl">
          <PageHeader
            title="What I use"
            description={
              <p>
                My daily tools and setup - inspired by{" "}
                <ExternalLink
                  href="https://uses.tech"
                  className="text-primary underline underline-offset-4"
                >
                  uses.tech
                </ExternalLink>
              </p>
            }
          />

          <InfoSections
            sections={usesSections}
            listClassName="ml-7 list-disc marker:text-primary/50"
          />
        </div>
      </Section>
    </main>
  );
}
