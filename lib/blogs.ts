import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export type BlogMeta = {
  slug: string;
  title: string;
  date: string; // ISO
  excerpt?: string;
  tags?: string[];
  cover?: string | null;
};

export type BlogPost = BlogMeta & {
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blogs");

export async function getAllBlogs(): Promise<BlogMeta[]> {
  const files = await fs.readdir(BLOG_DIR);
  const posts: BlogMeta[] = [];
  for (const file of files) {
    if (!file.endsWith(".md") && !file.endsWith(".mdx")) continue;
    const slug = file.replace(/\.(md|mdx)$/i, "");
    const raw = await fs.readFile(path.join(BLOG_DIR, file), "utf8");
    const { data } = matter(raw);
    posts.push({
      slug,
      title: data.title ?? slug,
      date: new Date(data.date ?? Date.now()).toISOString(),
      excerpt: data.excerpt ?? "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      cover: data.cover ?? null,
    });
  }
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const file = await fs.readFile(path.join(BLOG_DIR, `${slug}.md`), "utf8");
    const { data, content } = matter(file);
    return {
      slug,
      title: data.title ?? slug,
      date: new Date(data.date ?? Date.now()).toISOString(),
      excerpt: data.excerpt ?? "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      cover: data.cover ?? null,
      content,
    };
  } catch {
    try {
      const file = await fs.readFile(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
      const { data, content } = matter(file);
      return {
        slug,
        title: data.title ?? slug,
        date: new Date(data.date ?? Date.now()).toISOString(),
        excerpt: data.excerpt ?? "",
        tags: Array.isArray(data.tags) ? data.tags : [],
        cover: data.cover ?? null,
        content,
      };
    } catch {
      return null;
    }
  }
}

