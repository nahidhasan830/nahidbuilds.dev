import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SeriesPost {
  title: string;
  slugAsParams: string;
  seriesOrder?: number;
}

interface PostSeriesProps {
  seriesName: string;
  posts: SeriesPost[];
  currentSlug: string;
}

export function PostSeries({
  seriesName,
  posts,
  currentSlug,
}: PostSeriesProps) {
  const sorted = [...posts].sort(
    (a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0),
  );
  const currentIndex = sorted.findIndex((p) => p.slugAsParams === currentSlug);

  return (
    <Card className="mt-12">
      <CardHeader>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Series
        </p>
        <CardTitle className="text-lg">{seriesName}</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-2">
          {sorted.map((post, index) => {
            const isCurrent = post.slugAsParams === currentSlug;
            return (
              <li key={post.slugAsParams} className="flex items-start gap-3">
                <span
                  className={cn(
                    "flex-shrink-0 flex items-center justify-center size-6 rounded-full text-xs font-medium",
                    isCurrent
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {index + 1}
                </span>
                {isCurrent ? (
                  <span className="text-sm font-medium pt-0.5">
                    {post.title}
                  </span>
                ) : (
                  <Link
                    href={`/blog/${post.slugAsParams}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors pt-0.5"
                  >
                    {post.title}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>

        {currentIndex < sorted.length - 1 && (
          <Link
            href={`/blog/${sorted[currentIndex + 1].slugAsParams}`}
            className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-primary hover:underline"
          >
            Next: {sorted[currentIndex + 1].title} &rarr;
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
