import { Container } from "@/components/Container";
import { ExperienceTimeline, type ExperienceItem } from "@/components/ExperienceTimeline";

const timeline: ExperienceItem[] = [
  {
    company: "Stealth Startup",
    role: "Senior Full‑Stack Engineer",
    period: "2023 — Present",
    url: "https://example.com",
    logo: "/companies/stealth.svg",
    tech: ["Next.js", "TypeScript", "Prisma", "Postgres", "Vercel"],
    bullets: [
      "Led architecture for a multi‑tenant SaaS platform (Next.js, Prisma, Postgres)",
      "Shipped Vercel‑friendly serverless features with queues and background jobs",
      "Improved TTFB by ~45% via route revalidation and caching",
      "Worked with product/design to drive outcomes across squads",
      "Built internal tools for faster developer experience",
    ],
  },
  {
    company: "Acme Corp",
    role: "Software Engineer",
    period: "2020 — 2023",
    url: "https://example.com",
    logo: "/companies/acme.svg",
    tech: ["Node.js", "Express", "GraphQL", "Docker", "AWS"],
    bullets: [
      "Built internal design system and codegen pipelines",
      "Scaled Node APIs to millions of requests/day with observability",
      "Mentored 5 engineers across web and platform teams",
      "Cut infra costs by 20% via caching and tuning",
    ],
  },
];

export default function ExperiencePage() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">Experience</h1>
        <ExperienceTimeline items={timeline} />
      </Container>
    </section>
  );
}
