import { ArrowRight, Calendar, Clock, PenLine } from "lucide-react";
import Link from "next/link";
import { blog } from "#site/content";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { formatDate } from "@/lib/utils";

function getRecentPosts(count = 3) {
  return blog
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export function Blog() {
  const posts = getRecentPosts();

  return (
    <Section id="blog">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-3">
          Blog
        </h2>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Thoughts on software engineering, building products, and lessons
          learned along the way.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-dashed border-border bg-muted/30">
          <div className="flex items-center justify-center size-16 rounded-full bg-primary/10 mb-4">
            <PenLine className="size-7 text-primary" />
          </div>
          <p className="text-muted-foreground text-center">
            I'm working on some posts. Check back soon!
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slugAsParams}`}
                className="group block"
              >
                <Card className="h-full transition-all duration-150 hover:scale-[1.01]">
                  <CardHeader>
                    <CardTitle className="text-base group-hover/card:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="size-3.5" />
                        <time dateTime={post.date}>
                          {formatDate(post.date)}
                        </time>
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="size-3.5" />
                        {post.readingTime} min
                      </span>
                    </div>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              View all posts
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </>
      )}
    </Section>
  );
}
