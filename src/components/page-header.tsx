import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description: ReactNode;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-12 max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
      <div className="mt-2 text-muted-foreground">{description}</div>
    </header>
  );
}
