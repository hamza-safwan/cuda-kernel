export type Category = "frontend" | "backend" | "ml" | "genai" | "cloud";

export type Project = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  repo: { owner: string; name: string };
  featured?: boolean;
  demo?: string | null;
  category: Category;
};

// Edit this list to match your real projects
export const projects: Project[] = [
  {
    slug: "nextjs-starter",
    title: "Next.js Starter",
    description: "Production-ready Next.js starter with Tailwind, dark mode, and best practices.",
    tech: ["Next.js", "Tailwind", "TypeScript"],
    repo: { owner: "vercel", name: "next.js" },
    featured: true,
    demo: "https://nextjs.org/",
    category: "frontend",
  },
  {
    slug: "awesome-api",
    title: "Awesome API",
    description: "Lightweight REST API with caching, validation, and OpenAPI docs.",
    tech: ["Node.js", "Express", "Zod"],
    repo: { owner: "octocat", name: "Hello-World" },
    featured: true,
    demo: null,
    category: "backend",
  },
  {
    slug: "ml-playground",
    title: "ML Playground",
    description: "Interactive ML demos and visualizations in the browser.",
    tech: ["TensorFlow.js", "React"],
    repo: { owner: "your-github", name: "ml-playground" },
    demo: "https://example.com/ml-playground",
    category: "ml",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
