import Link from "next/link";
import { Container } from "@/components/Container";
import { site } from "@/site.config";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-black/5 py-8 text-sm text-black/60 dark:border-white/10 dark:text-white/60">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p>© {year} {site.name}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </div>
      </Container>
    </footer>
  );
}

