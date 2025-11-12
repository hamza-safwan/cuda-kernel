"use client";
import { useState } from "react";
import { ProjectGrid } from "@/components/ProjectGrid";
import type { Category } from "@/data/projects";

const filters: { label: string; value: Category | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
  { label: "Machine Learning", value: "ml" },
  { label: "Generative AI", value: "genai" },
  { label: "Cloud & DevOps", value: "cloud" },
];

export function ProjectsFilter() {
  const [active, setActive] = useState<Category | "all">("all");
  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-1 overflow-x-auto rounded-2xl border border-black/10 bg-white/40 p-1 backdrop-blur dark:border-white/10 dark:bg-white/10">
        {filters.map((f) => {
          const isActive = active === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setActive(f.value)}
              className={`rounded-xl px-3 py-1.5 text-sm transition ${
                isActive
                  ? "bg-white text-black shadow-sm dark:bg-white/20 dark:text-white"
                  : "text-black/70 hover:bg-white/60 dark:text-white/70 dark:hover:bg-white/20"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
      <ProjectGrid category={active} />
    </div>
  );
}
