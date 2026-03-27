import { type NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

function validatePayload(body: unknown): ContactPayload | null {
  if (typeof body !== "object" || body === null) return null;

  const { name, email, message } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length === 0) return null;
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return null;
  if (typeof message !== "string" || message.trim().length === 0) return null;

  return { name: name.trim(), email: email.trim(), message: message.trim() };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = validatePayload(body);

    if (!payload) {
      return NextResponse.json(
        {
          error:
            "Invalid request. Name, valid email, and message are required.",
        },
        { status: 400 },
      );
    }

    const { name, email, message } = payload;

    const result = await sendEmail({
      to: process.env.CONTACT_EMAIL || "nahidhasan830@gmail.com",
      subject: `New message from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
