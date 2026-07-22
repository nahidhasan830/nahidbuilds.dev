"use client";

import { FileDown } from "lucide-react";
import Link from "next/link";
import { SocialLinks } from "@/components/social-links";
import { AnimatedBorderButton } from "@/components/ui/animated-border-button";
import { Badge } from "@/components/ui/badge";
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
        <Link href="/#projects" className="group mb-6 rounded-4xl">
          <Badge className="h-auto gap-2 border-primary/20 bg-primary/10 px-3 py-1.5 text-sm text-primary transition-colors group-hover:bg-primary/15">
            <PingDot />
            Building{" "}
            <span className="text-foreground">
              {siteConfig.currentlyBuilding}
            </span>
          </Badge>
        </Link>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3">
          {siteConfig.name}
        </h1>

        <p className="text-xl md:text-2xl text-foreground/60 mb-4">
          {siteConfig.title}
        </p>

        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base mb-10">
          {siteConfig.summary}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <AnimatedBorderButton asChild>
            <a href={siteConfig.resumeUrl} download>
              <FileDown data-icon="inline-start" />
              Resume
            </a>
          </AnimatedBorderButton>

          <div className="h-6 w-px bg-foreground/20" />

          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
