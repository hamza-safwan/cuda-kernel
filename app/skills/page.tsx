"use client";
import { Container } from "@/components/Container";
import { SkillsDeck, type DeckCategory } from "@/components/SkillsDeck";

type Skill = { name: string; level: 1 | 2 | 3 | 4 | 5 };

const skillData: Record<string, Skill[]> = {
  Frontend: [
    { name: "React", level: 5 },
    { name: "Next.js", level: 5 },
    { name: "TypeScript", level: 5 },
    { name: "Tailwind", level: 5 },
    { name: "Zustand", level: 4 },
    { name: "TanStack Query", level: 4 },
  ],
  Backend: [
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

const deck: DeckCategory[] = [
  {
    key: "genai",
    title: "Generative AI",
    description: "LLM apps, RAG, agents, prompt engineering, and evaluation.",
    color: "violet",
    skills: skillData["Generative AI"],
  },
  {
    key: "ml",
    title: "Machine Learning",
    description: "Classical ML, model training, data tooling, and visualization.",
    color: "indigo",
    skills: skillData["Machine Learning"],
  },
  {
    key: "frontend",
    title: "Frontend",
    description: "Accessible, performant UIs with React, Next.js, and TypeScript.",
    color: "blue",
    skills: skillData["Frontend"],
  },
  {
    key: "backend",
    title: "Backend",
    description: "Robust APIs, validation, and data layers with Node/GraphQL.",
    color: "green",
    skills: skillData["Backend"],
  },
  {
    key: "cloud",
    title: "Cloud & DevOps",
    description: "Serverless, CI/CD, and reliable delivery on modern infra.",
    color: "pink",
    skills: skillData["Cloud & DevOps"],
  },
];

export default function SkillsPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Skills</h1>
        <SkillsDeck categories={deck} />
      </Container>
    </section>
  );
}
