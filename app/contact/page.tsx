"use client";
import { useState } from "react";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/site.config";

export default function ContactPage() {
  const [status, setStatus] = useState<null | "idle" | "sending" | "sent" | "error">(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      form.reset();
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  }

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact</h1>
          <p className="mt-2 max-w-2xl text-black/70 dark:text-white/70">
            Prefer email? <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>

        <form onSubmit={submit} className="card max-w-xl space-y-3">
          <div>
            <label className="mb-1 block text-sm">Name</label>
            <input name="name" required className="w-full rounded-md border border-black/10 bg-white/70 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500 dark:border-white/10 dark:bg-white/10" />
          </div>
          <div>
            <label className="mb-1 block text-sm">Email</label>
            <input type="email" name="email" required className="w-full rounded-md border border-black/10 bg-white/70 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500 dark:border-white/10 dark:bg-white/10" />
          </div>
          <div>
            <label className="mb-1 block text-sm">Message</label>
            <textarea name="message" required rows={5} className="w-full rounded-md border border-black/10 bg-white/70 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500 dark:border-white/10 dark:bg-white/10" />
          </div>
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send message"}
            </Button>
            {status === "sent" && <span className="text-sm text-green-600 dark:text-green-400">Sent! I will reply soon.</span>}
            {status === "error" && <span className="text-sm text-red-600 dark:text-red-400">Something went wrong. Try email.</span>}
          </div>
        </form>
      </Container>
    </section>
  );
}

