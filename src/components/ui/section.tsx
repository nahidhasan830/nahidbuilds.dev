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
  return (
    <section id={id} className={cn("py-24 md:py-32", className)}>
      <div className="container px-6 md:px-12 lg:px-24">{children}</div>
    </section>
  );
}
