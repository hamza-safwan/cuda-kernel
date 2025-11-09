import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { getAllBlogs, getBlogBySlug } from "@/lib/blogs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import { Button } from "@/components/ui/Button";

type Params = { slug: string };

export async function generateStaticParams() {
  const posts = await getAllBlogs();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const post = await getBlogBySlug(params.slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogDetailPage({ params }: { params: Params }) {
  const post = await getBlogBySlug(params.slug);
  if (!post) notFound();

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="mb-6">
          <div className="mb-3">
            <Button variant="secondary" href="/blogs">← Back to Blogs</Button>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
          <div className="mt-2 text-sm text-black/60 dark:text-white/60">
            {new Date(post.date).toLocaleDateString()}
          </div>
        </div>
        <article className="prose-custom card">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[[rehypeKatex, { strict: false }], rehypeHighlight]}
            components={{
              img: ({ src, ...props }) => {
                const url = (src || "").startsWith("http")
                  ? (src as string)
                  : `/blogs/${post.slug}/${(src as string).replace(/^\.\//, "")}`;
                // eslint-disable-next-line @next/next/no-img-element
                return <img src={url} alt={(props.alt as string) || ""} className="rounded-lg" />;
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </Container>
    </section>
  );
}

