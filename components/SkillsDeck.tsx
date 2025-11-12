"use client";
import { useState } from "react";
import { clsx } from "clsx";

export type DeckSkill = { name: string; level: 1 | 2 | 3 | 4 | 5 };
export type DeckCategory = {
  key: string;
  title: string;
  description: string;
  color: "blue" | "green" | "violet" | "pink" | "indigo";
  icon?: React.ReactNode;
  skills: DeckSkill[];
};

export function SkillsDeck({ categories }: { categories: DeckCategory[] }) {
  const [active, setActive] = useState(categories[0]?.key);
  const [hovered, setHovered] = useState<string | null>(null);
  const currentKey = hovered ?? active;
  const activeCat = categories.find((c) => c.key === currentKey) ?? categories[0];

  return (
    <div className="grid items-stretch gap-6 md:grid-cols-5 lg:grid-cols-7">
      <div className="md:col-span-3 lg:col-span-5">
        <div className="flex h-full items-stretch gap-3 overflow-visible">
          {categories.map((c) => {
            const isActive = c.key === currentKey;
            const colorCls = colorToNeutralGradient(c.color);
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => setActive(c.key)}
                onMouseEnter={() => setHovered(c.key)}
                onMouseLeave={() => setHovered(null)}
                className={clsx(
                  "relative h-full w-28 shrink-0 rounded-3xl p-3 text-left text-white shadow-sm transition-all duration-300 md:w-28",
                  isActive && "w-56 md:w-60 p-4 shadow-md",
                  colorCls,
                )}
              >
                <div className="flex h-full flex-col justify-between opacity-90">
                  <div>{c.icon}</div>
                  <div className={clsx("font-semibold drop-shadow-sm leading-tight space-y-0.5")}
                  >
                    {c.title.split(" ").map((w) => (
                      <span key={w} className={clsx(isActive ? "block text-sm" : "block text-xs")}>{w}</span>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <div className="md:col-span-2 lg:col-span-2 min-w-0">
        <div className="card flex flex-col">
          <h3 className="text-xl font-semibold">{activeCat.title}</h3>
          <p className="mt-1 text-sm text-black/70 dark:text-white/70">{activeCat.description}</p>
          <div className="mt-4 space-y-3">
            {activeCat.skills.map((s) => (
              <div key={s.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{s.name}</span>
                  <span className="text-black/60 dark:text-white/60">{s.level}/5</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-200 dark:to-neutral-300"
                    style={{ width: `${(s.level / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function colorToNeutralGradient(color: DeckCategory["color"]) {
  switch (color) {
    case "blue":
      return "bg-gradient-to-b from-neutral-600 to-neutral-800";
    case "green":
      return "bg-gradient-to-b from-neutral-500 to-neutral-800";
    case "violet":
      return "bg-gradient-to-b from-neutral-700 to-neutral-900";
    case "pink":
      return "bg-gradient-to-b from-neutral-600 to-neutral-900";
    case "indigo":
      return "bg-gradient-to-b from-neutral-700 to-neutral-900";
    default:
      return "bg-gradient-to-b from-neutral-600 to-neutral-900";
  }
}
