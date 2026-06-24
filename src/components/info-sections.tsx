import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type InfoListItem = {
  content: ReactNode;
};

export type InfoSection = {
  title: string;
  icon?: ElementType<{ className?: string }>;
  items?: InfoListItem[];
  body?: ReactNode;
};

type InfoSectionsProps = {
  sections: InfoSection[];
  listClassName?: string;
};

export function InfoSections({ sections, listClassName }: InfoSectionsProps) {
  return (
    <div className="space-y-10">
      {sections.map((section) => {
        const Icon = section.icon;

        return (
          <section key={section.title}>
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              {Icon && <Icon className="size-5 text-primary" />}
              {section.title}
            </h2>

            {section.items && (
              <ul
                className={cn(
                  "mt-3 space-y-2 text-muted-foreground",
                  listClassName,
                )}
              >
                {section.items.map((item, index) => (
                  <li key={`${section.title}-${index}`}>{item.content}</li>
                ))}
              </ul>
            )}

            {section.body && (
              <div className="mt-3 text-muted-foreground">{section.body}</div>
            )}
          </section>
        );
      })}
    </div>
  );
}
