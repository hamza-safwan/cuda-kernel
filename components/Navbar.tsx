"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Container } from "@/components/Container";
import { site } from "@/site.config";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/resume", label: "Resume" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/5 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-white/10 dark:supports-[backdrop-filter]:bg-black/20">
      <Container className="flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          {site.name}
        </Link>
        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition hover:bg-black/5 dark:hover:bg-white/10 ${
                pathname === l.href ? "text-black dark:text-white" : "text-black/60 dark:text-white/60"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-black/70 hover:bg-black/5 sm:hidden dark:text-white/80 dark:hover:bg-white/10"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>
      {open && (
        <div className="sm:hidden">
          <Container>
            <div className="mb-3 rounded-lg border border-black/10 bg-white/70 p-2 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-3 py-2 text-sm font-medium transition hover:bg-black/5 dark:hover:bg-white/10 ${
                    pathname === l.href ? "text-black dark:text-white" : "text-black/60 dark:text-white/60"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
