"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import { ContactButton } from "@/components/contact-button";
import { useContactDialog } from "@/components/contact-dialog-context";
import { GithubIcon } from "@/components/icons/github";
import { LinkedinIcon } from "@/components/icons/linkedin";
import { Button } from "@/components/ui/button";
import { navItems, siteConfig } from "@/data/site";

const visibleNavItems = navItems.filter((item) => item.showInNav !== false);

export function Footer() {
  const { openContactDialog } = useContactDialog();

  return (
    <footer>
      <div className="bg-muted/40 py-16">
        <div className="container px-6 md:px-12 lg:px-24 text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Let's build something together
          </h2>
          <p className="mt-2 text-muted-foreground">
            Available for freelance projects and full-time opportunities.
          </p>
          <ContactButton />
        </div>
      </div>

      <div className="border-t border-border/50">
        <div className="container px-6 md:px-12 lg:px-24 py-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <Link
              href="/"
              className="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary font-bold text-sm"
              aria-label="Home"
            >
              N
            </Link>

            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {visibleNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="size-8" asChild>
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <GithubIcon className="size-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="size-8" asChild>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="size-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={openContactDialog}
                aria-label="Email"
              >
                <Mail className="size-4" />
              </Button>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
