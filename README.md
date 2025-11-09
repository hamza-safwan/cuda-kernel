Hamza Portfolio – Next.js

Overview

- Modern, fast, and deploy-ready portfolio built with Next.js 14 (App Router), TypeScript, and Tailwind.
- Pages: Home, Experience, Projects (with dynamic README from GitHub), Skills, Resume (PDF download), Contact (serverless API).
- Shiny UI with dark mode, gradients, and responsive cards.

Getting Started

1) Install deps

   npm install

2) Run locally

   npm run dev

Customize Your Info

- Edit site.config.ts for your name, role, email, socials, and resume URL (optional if you prefer client-side PDF generation).
- Edit data/projects.ts to list your real projects. Use your GitHub username and repo names so READMEs render on project pages.

Projects README Rendering

- Project detail pages fetch README.md from GitHub via raw URLs for branch main or master and render with react-markdown.
- Relative images in README are resolved to raw GitHub URLs automatically.

Contact Form (Serverless)

- The form posts to /api/contact.
- Out of the box it will log submissions in server logs.
- To send real emails, create a Resend API key and set these env vars in Vercel:
  - RESEND_API_KEY
  - CONTACT_TO_EMAIL (your destination email)

Resume Download

- If site.config.ts has resume.url, the Resume page will download that static file (e.g., /Hamza-Resume.pdf in public/).
- If not set, it will generate a PDF from the on-page content using html2canvas + jsPDF client-side.

Deploy to Vercel

1) Push this repo to GitHub or GitLab
2) Import the project in Vercel
3) Set env vars if using email via Resend (optional)
4) Deploy. Target URL can be configured as hamza.vercel.app

Notes

- To change featured projects on the homepage, toggle featured in data/projects.ts or adjust the grid limit on app/page.tsx.
- Dark mode toggle is built-in (next-themes).

