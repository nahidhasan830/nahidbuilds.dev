"use client";

import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm({ onSuccess }: { onSuccess?: () => void }) {
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Message sent! I'll get back to you soon.");
        form.reset();
        onSuccess?.();
      } else {
        toast.error(data.error || "Failed to send message");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-4">
        <div>
          <Label htmlFor="name" className="mb-2 block">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            required
            disabled={isPending}
          />
        </div>

        <div>
          <Label htmlFor="email" className="mb-2 block">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            required
            disabled={isPending}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="message" className="mb-2 block">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Hi Nahid, I'd love to discuss..."
          className="min-h-[120px] resize-none"
          required
          disabled={isPending}
        />
      </div>

      <Button type="submit" className="w-full gap-2" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="size-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
