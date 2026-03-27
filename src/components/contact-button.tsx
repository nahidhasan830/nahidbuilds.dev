"use client";

import { Mail } from "lucide-react";
import { useContactDialog } from "@/components/contact-dialog-context";
import { Button } from "@/components/ui/button";

export function ContactButton() {
  const { openContactDialog } = useContactDialog();

  return (
    <div className="mt-6">
      <Button className="gap-2" onClick={openContactDialog}>
        <Mail className="size-4" />
        Get in touch
      </Button>
    </div>
  );
}
