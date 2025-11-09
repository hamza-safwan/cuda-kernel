"use client";
import { useState } from "react";
import { Container } from "@/components/Container";

type Skill = { name: string; level: 1 | 2 | 3 | 4 | 5 };
const skills: Record<string, Skill[]> = {
  "Frontend": [
    { name: "React", level: 5 },
    { name: "Next.js", level: 5 },
    { name: "TypeScript", level: 5 },
    { name: "Tailwind", level: 5 },
    { name: "Zustand", level: 4 },
    { name: "TanStack Query", level: 4 },
  ],
  "Backend": [
    { name: "Node.js", level: 5 },
    { name: "Express", level: 4 },
    { name: "tRPC", level: 4 },
    { name: "GraphQL", level: 4 },
    { name: "Prisma", level: 4 },
    { name: "Postgres", level: 4 },
    { name: "Redis", level: 3 },
  ],
  "Machine Learning": [
    { name: "Python", level: 5 },
    { name: "NumPy/Pandas", level: 5 },
    { name: "scikit-learn", level: 4 },
    { name: "PyTorch", level: 4 },
    { name: "Data Viz", level: 4 },
  ],
  "Generative AI": [
    { name: "LLMs (OpenAI, local)", level: 5 },
    { name: "RAG", level: 4 },
    { name: "Embeddings", level: 4 },
    { name: "Prompt Engineering", level: 5 },
    { name: "Tool Use / Agents", level: 4 },
  ],
  "Cloud & DevOps": [
    { name: "Vercel", level: 5 },
    { name: "Docker", level: 3 },
    { name: "CI/CD", level: 4 },
    { name: "GitHub Actions", level: 4 },
  ],
};

const tabs = [
  "Frontend",
  "Backend",
  "Machine Learning",
  "Generative AI",
  "Cloud & DevOps",
] as const;

export default function SkillsPage() {
  const [active, setActive] = useState<(typeof tabs)[number]>("Frontend");

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Skills</h1>
        <div className="mb-6 inline-flex items-center gap-1 rounded-2xl border border-black/10 bg-white/40 p-1 backdrop-blur dark:border-white/10 dark:bg-white/10">
          {tabs.map((t) => {
            const isActive = active === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setActive(t)}
                className={`rounded-xl px-3 py-1.5 text-sm transition ${
                  isActive
                    ? "bg-white text-black shadow-sm dark:bg-white/20 dark:text-white"
                    : "text-black/70 hover:bg-white/60 dark:text-white/70 dark:hover:bg-white/20"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        <div className="card">
          <h2 className="mb-4 text-lg font-semibold">{active}</h2>
          <div className="space-y-3">
            {skills[active].map((s) => (
              <div key={s.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{s.name}</span>
                  <span className="text-black/60 dark:text-white/60">{s.level}/5</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-500 via-fuchsia-500 to-emerald-500"
                    style={{ width: `${(s.level / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
