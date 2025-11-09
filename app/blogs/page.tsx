import Link from "next/link";
import { Container } from "@/components/Container";
import { getAllBlogs } from "@/lib/blogs";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Blogs" };

export default async function BlogsPage() {
  const posts = await getAllBlogs();
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Blogs</h1>
        <p className="mb-8 max-w-2xl text-black/70 dark:text-white/70">
          Writing on software engineering, generative AI, and machine learning.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <article key={p.slug} className="card flex h-full flex-col">
              {p.cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`/blogs/${p.slug}/${p.cover.replace(/^\.\//, "")}`}
                  alt="Cover"
                  className="mb-3 h-40 w-full rounded-lg object-cover"
                />
              )}
              <div className="mb-1 text-xs text-black/60 dark:text-white/60">
                {new Date(p.date).toLocaleDateString()}
              </div>
              <h2 className="mb-2 text-lg font-semibold">
                <Link href={`/blogs/${p.slug}`} className="hover:underline">
                  {p.title}
                </Link>
              </h2>
              {p.excerpt && (
                <p className="mb-3 text-sm text-black/70 dark:text-white/70">{p.excerpt}</p>
              )}
              {p.tags && p.tags.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full bg-black/5 px-2 py-0.5 text-xs dark:bg-white/10">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-auto">
                <Button href={`/blogs/${p.slug}`}>Read</Button>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

