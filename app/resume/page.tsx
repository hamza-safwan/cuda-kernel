"use client";
import { Container } from "@/components/Container";
import { site } from "@/site.config";
import { Button } from "@/components/ui/Button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

export default function ResumePage() {
  const ref = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, { scale: 2, backgroundColor: "#0b1220" });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
    const x = (pageWidth - canvas.width * ratio) / 2;
    const y = 24;
    pdf.addImage(imgData, "PNG", x, y, canvas.width * ratio, canvas.height * ratio);
    pdf.save(`${site.name}-Resume.pdf`);
  };

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="mb-6 flex items-center justify-between gap-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Resume</h1>
          {site.resume.url ? (
            <Button href={site.resume.url} download>
              Download PDF
            </Button>
          ) : (
            <Button onClick={handleDownload}>Download PDF</Button>
          )}
        </div>

        <div ref={ref} className="card bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">
          <header className="mb-4">
            <h2 className="text-2xl font-semibold">{site.name}</h2>
            <p className="text-sm text-slate-300">{site.role} • {site.location}</p>
            <p className="text-sm text-slate-300"><a href={`mailto:${site.email}`}>{site.email}</a></p>
          </header>
          <section className="space-y-2">
            <h3 className="text-lg font-semibold">Summary</h3>
            <p className="text-sm text-slate-200">
              {site.tagline}
            </p>
          </section>
          <section className="mt-4 space-y-1">
            <h3 className="text-lg font-semibold">Core Skills</h3>
            <p className="text-sm text-slate-200">
              React, Next.js, TypeScript, Node.js, Postgres, Tailwind, Vercel, Testing
            </p>
          </section>
          <section className="mt-4 space-y-1">
            <h3 className="text-lg font-semibold">Experience</h3>
            <p className="text-sm text-slate-200">Senior Full‑Stack Engineer – Stealth Startup (2023—Present)</p>
            <ul className="list-disc pl-5 text-sm text-slate-200">
              <li>Architected multi‑tenant SaaS on Next.js (app router)</li>
              <li>Reduced TTFB by 45% with smart caching and ISR</li>
              <li>Led reliability initiatives across serverless platform</li>
            </ul>
          </section>
        </div>
      </Container>
    </section>
  );
}
