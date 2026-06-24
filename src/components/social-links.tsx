"use client";

import { Mail } from "lucide-react";
import { useContactDialog } from "@/components/contact-dialog-context";
import { ExternalLink } from "@/components/external-link";
import { GithubIcon } from "@/components/icons/github";
import { LinkedinIcon } from "@/components/icons/linkedin";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

type SocialLinksProps = {
  iconSize?: string;
  buttonClassName?: string;
  onAction?: () => void;
};

export function SocialLinks({
  iconSize = "size-4",
  buttonClassName,
  onAction,
}: SocialLinksProps) {
  const { openContactDialog } = useContactDialog();

  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon" className={buttonClassName} asChild>
        <ExternalLink
          href={siteConfig.socials.github}
          className="inline-flex items-center justify-center"
        >
          <GithubIcon className={iconSize} />
          <span className="sr-only">GitHub</span>
        </ExternalLink>
      </Button>
      <Button variant="ghost" size="icon" className={buttonClassName} asChild>
        <ExternalLink
          href={siteConfig.socials.linkedin}
          className="inline-flex items-center justify-center"
        >
          <LinkedinIcon className={iconSize} />
          <span className="sr-only">LinkedIn</span>
        </ExternalLink>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={buttonClassName}
        onClick={() => {
          onAction?.();
          openContactDialog();
        }}
        aria-label="Email"
      >
        <Mail className={iconSize} />
      </Button>
    </div>
  );
}
