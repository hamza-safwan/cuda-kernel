import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/Container";
import { site } from "@/site.config";
import { ProjectGrid } from "@/components/ProjectGrid";
import { HeroFX } from "@/components/HeroFX";

export default function HomePage() {
  return (
    <>
      <section className="py-2 sm:py-3">
        <Container className="!max-w-none !px-2 sm:!px-3">
          <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white/60 p-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 sm:p-4 min-h-[calc(100dvh-56px-16px)] sm:min-h-[calc(100dvh-56px-24px)] flex items-center">
            <HeroFX />
            <div className="relative flex h-full w-full flex-col items-start justify-center gap-6">
              <span className="inline-flex items-center rounded-full border border-black/10 px-3 py-1 text-xs font-medium text-black/70 dark:border-white/10 dark:text-white/70">
                {site.location} • Available for remote work
              </span>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                {site.headline}
              </h1>
            <div className="flex flex-wrap gap-2">
              {[
                "Software Engineer",
                "Generative AI Developer",
                "Machine Learning Engineer",
              ].map((label) => (
                <span key={label} className="inline-flex items-center rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs font-medium text-black/70 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                  {label}
                </span>
              ))}
            </div>
            <p className="max-w-2xl text-lg text-black/70 dark:text-white/70">
              {site.tagline}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button href="/projects">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="secondary" href="/contact">Hire Me</Button>
              <div className="ml-2 flex items-center gap-2">
                {site.socials.github?.url && (
                  <a
                    href={site.socials.github.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 bg-white/60 text-black/70 backdrop-blur transition hover:bg-white/90 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
                {site.socials.linkedin?.url && (
                  <a
                    href={site.socials.linkedin.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 bg-white/60 text-black/70 backdrop-blur transition hover:bg-white/90 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 bg-white/60 text-black/70 backdrop-blur transition hover:bg-white/90 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24 border-t border-black/5 dark:border-white/10">
        <Container>
          <h2 className="mb-6 text-2xl font-semibold tracking-tight sm:text-3xl">About Me</h2>
          <div className="rounded-3xl bg-gradient-to-b from-slate-950 to-slate-900 p-6 text-slate-100 shadow-sm ring-1 ring-white/10 sm:p-10">
            <div className="grid gap-6 md:grid-cols-3 md:gap-8">
              <div className="md:col-span-1">
                <h3 className="text-xl font-semibold">Professional Summary</h3>
                <p className="mt-1 text-sm text-slate-300">A quick snapshot of what I bring to teams.</p>
              </div>
              <div className="md:col-span-2 space-y-3">
                {site.about?.map((line, i) => (
                  <p key={i} className="text-slate-200">{line}</p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <h2 className="mb-6 text-2xl font-semibold tracking-tight sm:text-3xl">
            Featured Projects
          </h2>
          <ProjectGrid limit={3} />
          <div className="mt-8">
            <Button variant="ghost" href="/projects">Browse all projects</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
