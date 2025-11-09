import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/Container";
import { getProjectBySlug } from "@/data/projects";
import { fetchGithubReadme, resolveReadmeAssetUrl } from "@/lib/github";
import { Button } from "@/components/ui/Button";

type Params = { slug: string };

export async function generateStaticParams() {
  const { projects } = await import("@/data/projects");
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default async function ProjectDetailPage({ params }: { params: Params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const res = await fetchGithubReadme({ owner: project.repo.owner, repo: project.repo.name });

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="mb-6">
          <div className="mb-3">
            <Button variant="secondary" href="/projects">← Back to Projects</Button>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h1>
          <p className="mt-2 max-w-2xl text-black/70 dark:text-white/70">{project.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="rounded-full bg-sky-50 px-2 py-0.5 text-xs text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
                {t}
              </span>
            ))}
          </div>
        </div>

        {!res ? (
          <div className="card">
            <p className="text-sm text-black/70 dark:text-white/70">
              README not found. Make sure the repository is public and contains a README.md on main/master.
            </p>
          </div>
        ) : (
          <article className="prose-custom card">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ node, src, ...props }) => {
                  const url = resolveReadmeAssetUrl({
                    owner: project.repo.owner,
                    repo: project.repo.name,
                    branch: res.branch,
                    src: src ?? "",
                  });
                  return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={url} alt={props.alt as string} className="rounded-lg" />
                  );
                },
              }}
            >
              {res.content}
            </ReactMarkdown>
          </article>
        )}
      </Container>
    </section>
  );
}
