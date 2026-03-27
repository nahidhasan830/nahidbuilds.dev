"use client";

import { useEffect } from "react";
import { useActiveSection } from "@/components/active-section-context";
import { cn } from "@/lib/utils";

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { registerSection, unregisterSection } = useActiveSection();

  useEffect(() => {
    if (id) {
      registerSection(id);
      return () => unregisterSection(id);
    }
  }, [id, registerSection, unregisterSection]);

  return (
    <section id={id} className={cn("scroll-mt-20 py-16 md:py-20", className)}>
      <div className="container px-6 md:px-12 lg:px-24">{children}</div>
    </section>
  );
}
