import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

export default async function BlogPage() {
  // make sure getAllPosts() returns a Promise if it does async work
  const posts = await getAllPosts();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Blog</h1>

      {posts.length === 0 && (
        <p>
          No posts yet. Add .mdx files in <code>src/posts</code>.
        </p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((p) => (
          <article
            key={p.slug}
            className="border rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-semibold text-lg">
              <Link href={`/blog/${p.slug}`} className="hover:underline">
                {p.title}
              </Link>
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(p.date).toDateString()}
            </p>
            {p.excerpt && (
              <p className="text-sm text-gray-700 mt-2 line-clamp-3">
                {p.excerpt}
              </p>
            )}
            <Link
              href={`/blog/${p.slug}`}
              className="text-blue-600 text-sm mt-3 inline-block"
            >
              Read →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
