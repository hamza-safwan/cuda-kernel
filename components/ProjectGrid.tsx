import Link from "next/link";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { projects, type Category } from "@/data/projects";
import { Button } from "@/components/ui/Button";

export function ProjectGrid({ limit, category }: { limit?: number; category?: Category | "all" }) {
  let items = projects;
  if (category && category !== "all") {
    items = items.filter((p) => p.category === category);
  }
  items = typeof limit === "number" ? items.slice(0, limit) : items;
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <div key={p.slug} className="card group relative flex h-full flex-col transition hover:shadow-md">
          <div className="mb-3 flex flex-wrap gap-2">
            {p.tech.slice(0, 3).map((t) => (
              <span key={t} className="rounded-full bg-sky-50 px-2 py-0.5 text-xs text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
                {t}
              </span>
            ))}
          </div>
          <h3 className="mb-1 text-lg font-semibold group-hover:underline">{p.title}</h3>
          <p className="mb-4 text-sm text-black/70 dark:text-white/70">{p.description}</p>
          <div className="mt-auto flex flex-wrap gap-2">
            <Button href={`/projects/${p.slug}`} className="gap-2">
              Details <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href={`https://github.com/${p.repo.owner}/${p.repo.name}`} variant="secondary" className="gap-2" target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" /> GitHub
            </Button>
            {p.demo && (
              <Button href={p.demo} variant="ghost" className="gap-2" target="_blank" rel="noreferrer">
                <ExternalLink className="h-4 w-4" /> Demo
              </Button>
            )}
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <div className="col-span-full text-sm text-black/60 dark:text-white/60">No projects found for the selected filter.</div>
      )}
    </div>
  );
}
