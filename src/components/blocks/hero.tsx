import { FileDown, Mail } from "lucide-react";
import { GithubIcon } from "@/components/icons/github";
import { LinkedinIcon } from "@/components/icons/linkedin";
import { AnimatedBorderButton } from "@/components/ui/animated-border-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

function PingDot() {
  return (
    <span className="relative flex size-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
      <span className="relative inline-flex size-2 rounded-full bg-primary" />
    </span>
  );
}

export function Hero() {
  return (
    <section className="hero-glow min-h-screen pt-16 flex items-center">
      <div className="container px-6 md:px-12 lg:px-24 flex flex-col items-center text-center">
        <Badge className="mb-6 h-auto gap-2 border-primary/20 bg-primary/10 px-3 py-1.5 text-sm text-primary">
          <PingDot />
          Building{" "}
          <span className="text-foreground">
            {siteConfig.currentlyBuilding}
          </span>
        </Badge>

        {/* Name */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3">
          {siteConfig.name}
        </h1>

        {/* Title */}
        <p className="text-xl md:text-2xl text-foreground/60 mb-10">
          {siteConfig.title}
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Resume download */}
          <AnimatedBorderButton asChild>
            <a href={siteConfig.resumeUrl} download>
              <FileDown data-icon="inline-start" />
              Resume
            </a>
          </AnimatedBorderButton>

          {/* Divider */}
          <div className="h-6 w-px bg-foreground/20" />

          {/* Social links */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" asChild>
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <GithubIcon className="size-4" />
              </a>
            </Button>

            <Button variant="ghost" size="icon" asChild>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="size-4" />
              </a>
            </Button>

            <Button variant="ghost" size="icon" asChild>
              <a href={`mailto:${siteConfig.socials.email}`} aria-label="Email">
                <Mail />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
