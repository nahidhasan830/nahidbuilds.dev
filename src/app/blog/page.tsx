import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { blog } from "#site/content";
import { BlogList } from "@/components/blocks/blog-list";

export const metadata: Metadata = {
  title: "Blog | Nahid Hasan",
  description:
    "Thoughts on software engineering, building products, and lessons learned along the way.",
};

function getPublishedPosts() {
  return blog
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function getAllTags(posts: ReturnType<typeof getPublishedPosts>) {
  const tagCount = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagCount.set(tag, (tagCount.get(tag) ?? 0) + 1);
    }
  }
  return [...tagCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);
}

export default function BlogPage() {
  const posts = getPublishedPosts();
  const allTags = getAllTags(posts);

  const serializedPosts = posts.map((post) => ({
    slug: post.slug,
    slugAsParams: post.slugAsParams,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    readingTime: post.readingTime,
  }));

  return (
    <main className="container px-6 md:px-12 lg:px-24 py-16 md:py-24">
      <Link
        href="/#blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="size-4" />
        Back to home
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-4">
          Blog
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Thoughts on software engineering, building products, and lessons
          learned along the way.
        </p>
      </div>

      <BlogList posts={serializedPosts} allTags={allTags} />
    </main>
  );
}
