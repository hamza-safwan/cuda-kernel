import { Container } from "@/components/Container";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ProjectsFilter } from "@/components/ProjectsFilter";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Projects</h1>
        <p className="mb-6 max-w-2xl text-black/70 dark:text-white/70">
          A selection of personal and client projects. Click a project to view its GitHub README with details.
        </p>
        <ProjectsFilter />
      </Container>
    </section>
  );
}
