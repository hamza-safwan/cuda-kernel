import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <section className="py-24">
      <Container>
        <h1 className="mb-3 text-4xl font-bold tracking-tight">Page not found</h1>
        <p className="mb-6 text-black/70 dark:text-white/70">The page you’re looking for doesn’t exist.</p>
        <Link href="/" className="text-sky-700 underline hover:text-sky-900 dark:text-sky-300 dark:hover:text-sky-200">Go back home</Link>
      </Container>
    </section>
  );
}

