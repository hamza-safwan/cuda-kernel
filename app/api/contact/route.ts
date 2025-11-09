import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  message: z.string().min(1).max(5000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = schema.parse(body);

    // Optional email via Resend (set RESEND_API_KEY and CONTACT_TO_EMAIL)
    if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
      const payload = {
        from: `Portfolio <onboarding@resend.dev>`,
        to: [process.env.CONTACT_TO_EMAIL!],
        subject: `New message from ${name}`,
        html: `<p><b>From:</b> ${name} &lt;${email}&gt;</p><p>${message.replace(/\n/g, "<br/>")}</p>`,
      } satisfies {
        from: string;
        to: string[];
        subject: string;
        html: string;
      };

      // Send via Resend REST API (no extra dependency)
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error("Resend failed", await res.text());
        return NextResponse.json({ ok: false }, { status: 500 });
      }
    } else {
      // If email is not configured, just log in serverless logs.
      console.log("Contact message", { name, email, message: message.slice(0, 200) + (message.length > 200 ? "…" : "") });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

