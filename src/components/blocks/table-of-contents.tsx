"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocEntry {
  title: string;
  url: string;
  items?: TocEntry[];
}

interface TableOfContentsProps {
  toc: TocEntry[];
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = document.querySelectorAll("article h2, article h3");
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0px 0px -80% 0px", threshold: 0 },
    );

    for (const heading of headings) {
      observer.observe(heading);
    }

    return () => observer.disconnect();
  }, []);

  if (toc.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="border-l border-border pl-4">
      <p className="mb-3 text-xs font-medium text-muted-foreground">
        On this page
      </p>
      <ul className="space-y-1">
        {toc.map((entry) => (
          <TocItem key={entry.url} entry={entry} activeId={activeId} />
        ))}
      </ul>
    </nav>
  );
}

function TocItem({
  entry,
  activeId,
  depth = 0,
}: {
  entry: TocEntry;
  activeId: string;
  depth?: number;
}) {
  const id = entry.url.replace("#", "");
  const isActive = activeId === id;

  return (
    <li>
      <a
        href={entry.url}
        className={cn(
          "block py-1 text-[13px] leading-snug transition-colors",
          depth > 0 && "pl-3",
          isActive
            ? "text-primary font-medium"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {entry.title}
      </a>
      {entry.items && entry.items.length > 0 && (
        <ul className="space-y-0.5">
          {entry.items.map((child) => (
            <TocItem
              key={child.url}
              entry={child}
              activeId={activeId}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
