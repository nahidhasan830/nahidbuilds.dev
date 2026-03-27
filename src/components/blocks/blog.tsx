import { PenLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";

export function Blog() {
  return (
    <Section id="blog">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Blog
          </h2>
          <Badge variant="secondary">Coming Soon</Badge>
        </div>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Thoughts on software engineering, building products, and lessons
          learned along the way.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-dashed border-border bg-muted/30">
        <div className="flex items-center justify-center size-16 rounded-full bg-primary/10 mb-4">
          <PenLine className="size-7 text-primary" />
        </div>
        <p className="text-muted-foreground text-center">
          I'm working on some posts. Check back soon!
        </p>
      </div>
    </Section>
  );
}
