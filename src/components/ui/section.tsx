"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
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
  const { setActiveSection } = useActiveSection();
  const { ref, inView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView && id) {
      setActiveSection(id);
      window.history.replaceState(null, "", `#${id}`);
    }
  }, [inView, id, setActiveSection]);

  return (
    <section ref={ref} id={id} className={cn("py-16 md:py-20", className)}>
      <div className="container px-6 md:px-12 lg:px-24">{children}</div>
    </section>
  );
}
