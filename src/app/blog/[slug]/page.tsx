// src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getPostSource } from "@/lib/posts";
import MDXRenderer from "@/components/MDXRenderer";

export default async function PostPage(props: any) {
  const { slug } = (props.params || {}) as { slug: string };

  let post;
  try {
    post = await getPostSource(slug);
  } catch (err: unknown) {
    console.error("Error loading post:", slug, err);
    return notFound();
  }

  if (!post || !post.meta) {
    return notFound();
  }

  const { meta, html } = post;

  return (
    <article className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
        {meta.title || meta.slug}
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        {meta.date ? new Date(String(meta.date)).toDateString() : ""}
      </p>

      <div className="prose prose-lg md:prose-xl mdx-article">
        <MDXRenderer html={html} />
      </div>
    </article>
  );
}
