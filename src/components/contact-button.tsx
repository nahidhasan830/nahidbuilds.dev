"use client";

import { Check, Copy, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

export function ContactButton() {
  const [copied, setCopied] = useState(false);

  async function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(siteConfig.socials.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard failed, do nothing - user can still click the main button
    }
  }

  return (
    <div className="mt-6 flex items-center gap-2">
      <Button className="gap-2" asChild>
        <a href={`mailto:${siteConfig.socials.email}`}>
          <Mail className="size-4" />
          Get in touch
        </a>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleCopy}
        aria-label={copied ? "Copied!" : "Copy email"}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </Button>
    </div>
  );
}
