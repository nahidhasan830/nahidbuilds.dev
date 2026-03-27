"use client";

import { Check, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

export function ContactButton() {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(siteConfig.socials.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${siteConfig.socials.email}`;
    }
  }

  return (
    <Button className="mt-6 gap-2" onClick={handleClick}>
      {copied ? (
        <>
          <Check className="size-4" />
          Copied!
        </>
      ) : (
        <>
          <Mail className="size-4" />
          Get in touch
        </>
      )}
    </Button>
  );
}
