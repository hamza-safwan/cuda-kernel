import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github-dark.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { site } from "@/site.config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: `${site.name} – ${site.role}`,
    template: `%s – ${site.name}`,
  },
  description: site.tagline,
  metadataBase: new URL("https://hamza.vercel.app"),
  openGraph: {
    title: `${site.name} – ${site.role}`,
    description: site.tagline,
    url: "https://hamza.vercel.app",
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} – ${site.role}`,
    description: site.tagline,
    creator: site.socials.twitter?.handle ?? undefined,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-dvh flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
