"use client";
import { motion } from "framer-motion";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
  url?: string;
  logo?: string; // public path like /companies/acme.svg
  tech?: string[];
};

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-4 top-0 h-full w-px bg-gradient-to-b from-sky-500/40 via-fuchsia-500/40 to-emerald-500/40" />
      <div className="space-y-6">
        {items.map((it, idx) => (
          <TimelineItem key={it.company + it.role} item={it} idx={idx} />)
        )}
      </div>
    </div>
  );
}

function TimelineItem({ item: it, idx }: { item: ExperienceItem; idx: number }) {
  const [expanded, setExpanded] = useState(false);
  const maxBullets = 3;
  const hasExtra = it.bullets.length > maxBullets;
  const bullets = expanded ? it.bullets : it.bullets.slice(0, maxBullets);

  return (
    <motion.article
      className="relative pl-14"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: idx * 0.05 }}
    >
      <span className="absolute left-0 top-1.5 inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full ring-4 ring-white/70 shadow-sm dark:ring-black/40">
        {it.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={it.logo} alt={`${it.company} logo`} className="h-full w-full object-cover" />
        ) : (
          <span className="h-full w-full rounded-full bg-gradient-to-br from-sky-500 to-fuchsia-500" />
        )}
      </span>
      <div className="card">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="min-w-0">
            <h2 className="truncate text-xl font-semibold tracking-tight">
              {it.url ? (
                <a href={it.url} target="_blank" rel="noreferrer" className="hover:underline">
                  {it.role}
                </a>
              ) : (
                it.role
              )}
            </h2>
            <p className="truncate text-black/70 dark:text-white/70">
              {it.url ? (
                <a href={it.url} target="_blank" rel="noreferrer" className="hover:underline">
                  {it.company}
                </a>
              ) : (
                it.company
              )}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {it.url && (
              <a
                href={it.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm text-sky-700 hover:underline dark:text-sky-300"
              >
                Visit <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            <span className="text-sm text-black/60 dark:text-white/60">{it.period}</span>
          </div>
        </div>
        {it.tech && it.tech.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {it.tech.map((t) => (
              <span key={t} className="rounded-full bg-sky-50 px-2 py-0.5 text-xs text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
                {t}
              </span>
            ))}
          </div>
        )}
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-black/80 dark:text-white/80">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        {hasExtra && (
          <div className="mt-3">
            <Button variant="ghost" onClick={() => setExpanded((v) => !v)} className="gap-1 px-0 text-sky-700 hover:text-sky-900 dark:text-sky-300 dark:hover:text-sky-200">
              {expanded ? (
                <>
                  Show less <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Show more <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </motion.article>
  );
}
