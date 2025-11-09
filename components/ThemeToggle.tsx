"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const active = (resolvedTheme ?? theme) === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(active ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 bg-white/60 text-black/70 backdrop-blur transition hover:bg-white/90 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
    >
      {mounted && active ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}

