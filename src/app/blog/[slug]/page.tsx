import { ArrowLeft, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blog } from "#site/content";
import { PostSeries } from "@/components/blocks/post-series";
import { TableOfContents } from "@/components/blocks/table-of-contents";
import { MDXContent } from "@/components/mdx/mdx-components";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

function getPostBySlug(slug: string) {
  return blog.find((post) => post.slugAsParams === slug);
}

export async function generateStaticParams() {
  return blog.map((post) => ({
    slug: post.slugAsParams,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Nahid Hasan`,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  const seriesPosts = post.series
    ? blog
        .filter((p) => p.published && p.series === post.series)
        .map((p) => ({
          title: p.title,
          slugAsParams: p.slugAsParams,
          seriesOrder: p.seriesOrder,
        }))
    : [];

  return (
    <main className="container px-6 md:px-12 lg:px-24 py-16 md:py-24">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="size-4" />
        Back to blog
      </Link>

      <div className="xl:grid xl:grid-cols-[1fr_12rem] xl:gap-10">
        <div>
          {/* Cover Image */}
          {post.cover && (
            <div className="relative aspect-[2/1] overflow-hidden rounded-xl mb-8">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Post Header */}
          <header className="mb-10 pb-8 border-b border-border">
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl mb-4">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-4">
              {post.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" />
                {post.readingTime} min read
              </span>
            </div>
          </header>

          {/* Article Content */}
          <article>
            <div className="prose dark:prose-invert max-w-none prose-headings:tracking-tight prose-a:text-primary prose-blockquote:border-primary">
              <MDXContent code={post.body} />
            </div>

            {post.series && seriesPosts.length > 1 && (
              <PostSeries
                seriesName={post.series}
                posts={seriesPosts}
                currentSlug={post.slugAsParams}
              />
            )}
          </article>
        </div>

        {/* TOC — sticky in right column */}
        <aside className="hidden xl:block">
          <div className="sticky top-24">
            <TableOfContents toc={post.toc} />
          </div>
        </aside>
      </div>
    </main>
  );
}
