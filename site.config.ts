export const site = {
  name: "Hamza Safwan",
  role: "Software Engineer",
  headline: "Software Engineer · Generative AI Developer · Machine Learning Engineer",
  tagline:
    "I design and ship production AI systems, LLM applications, and scalable web platforms with exceptional UX and performance.",
  location: "Remote • GMT+5",
  email: "hamza@example.com",
  about: [
    "Full‑stack engineer specializing in product engineering, developer experience, and performance.",
    "I build scalable web apps with modern stacks (Next.js, TypeScript, Node, Postgres) and cloud‑native patterns.",
    "My recent work focuses on LLM applications: RAG, evaluation, guardrails, and agentic tooling.",
    "I care deeply about DX, reliability, and shipping features that move metrics.",
    "Strong collaborator across product, design, and data to deliver delightful user experiences.",
  ],
  resume: {
    // If you want to link a static file in /public, set url: "/Hamza-Resume.pdf"
    url: null as string | null,
  },
  socials: {
    github: { url: "https://github.com/your-github", handle: "@your-github" },
    linkedin: { url: "https://linkedin.com/in/your-link", handle: "@your-link" },
    twitter: { url: null as string | null, handle: null as string | null },
  },
} as const;

export type SiteConfig = typeof site;
