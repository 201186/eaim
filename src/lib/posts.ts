// src/lib/posts.ts
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize from "rehype-sanitize";

export type PostMeta = { slug: string; title: string; date: string; excerpt?: string };

const POSTS_DIR = path.join(process.cwd(), "src", "posts");

export async function getAllPosts(): Promise<PostMeta[]> {
  try {
    const stat = await fs.stat(POSTS_DIR).catch(() => null);
    if (!stat) return [];
    const files = (await fs.readdir(POSTS_DIR)).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
    const posts = await Promise.all(
      files.map(async (file) => {
        const slug = file.replace(/\.(mdx|md)$/, "");
        const raw = await fs.readFile(path.join(POSTS_DIR, file), "utf8");
        const { data } = matter(raw);
        return {
          slug,
          title: data.title ?? slug,
          date: String(data.date ?? ""),
          excerpt: data.excerpt ?? "",
        } as PostMeta;
      })
    );
    posts.sort((a, b) => (a.date < b.date ? 1 : -1));
    return posts;
  } catch (err) {
    console.error("getAllPosts error:", err);
    return [];
  }
}

/**
 * Read MDX/MD and return sanitized HTML + meta
 */
export async function getPostSource(slug: string) {
  const filePathMd = path.join(POSTS_DIR, `${slug}.mdx`);
  const filePathMdAlt = path.join(POSTS_DIR, `${slug}.md`);
  let filePath = filePathMd;
  try {
    await fs.access(filePathMd);
  } catch {
    try {
      await fs.access(filePathMdAlt);
      filePath = filePathMdAlt;
    } catch {
      throw new Error(`Post not found: ${slug}`);
    }
  }

  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);

  const processed = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSanitize)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  const html = String(processed);

  return {
    html,
    meta: {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      excerpt: data.excerpt ?? "",
    },
  };
}
