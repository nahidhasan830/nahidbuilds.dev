"use client";

import { Calendar, Clock, Search, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";

interface Post {
  slug: string;
  slugAsParams: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: number;
}

interface BlogListProps {
  posts: Post[];
  allTags: string[];
}

export function BlogList({ posts, allTags }: BlogListProps) {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = posts;

    if (selectedTag) {
      result = result.filter((post) => post.tags.includes(selectedTag));
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    return result;
  }, [posts, search, selectedTag]);

  const hasActiveFilters = search.trim() !== "" || selectedTag !== null;

  return (
    <div>
      <div className="space-y-3 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-9"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedTag(null)}
            className={`shrink-0 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
              selectedTag === null
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`shrink-0 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                selectedTag === tag
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "post" : "posts"} found
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedTag(null);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="size-3" />
            Clear
          </button>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 rounded-xl border border-dashed border-border bg-muted/30">
          <p className="text-muted-foreground">No posts match your search.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slugAsParams}`}
              className="group block rounded-xl border bg-card p-5 ring-1 ring-border shadow-card transition-all duration-150 hover:shadow-card-hover hover:scale-[1.01]"
            >
              <h2 className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors mb-1">
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {post.description}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="size-3.5" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3.5" />
                  {post.readingTime} min read
                </span>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
