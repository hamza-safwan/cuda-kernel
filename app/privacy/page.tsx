import { Container } from "@/components/Container";

export default function PrivacyPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Privacy</h1>
        <div className="card space-y-3 text-sm text-black/70 dark:text-white/70">
          <p>We only collect information you submit via the contact form. It is used solely to respond to your inquiry.</p>
          <p>Deployments may collect standard server logs and analytics as provided by hosting.</p>
          <p>For removal requests, email us at the address on the contact page.</p>
        </div>
      </Container>
    </section>
  );
}

