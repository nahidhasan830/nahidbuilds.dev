"use client";

import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { ContactButton } from "@/components/contact-button";
import { SocialLinks } from "@/components/social-links";
import { siteConfig, visibleNavItems } from "@/data/site";

export function Footer() {
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
            <BrandMark className="size-8 text-sm" />

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

            <SocialLinks buttonClassName="size-8" />
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
