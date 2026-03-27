import { Resend } from "resend";

let resend: Resend | null = null;

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

type BaseEmailOptions = {
  to: string | string[];
  subject: string;
  replyTo?: string;
};

type TextEmail = BaseEmailOptions & { text: string; html?: string };
type HtmlEmail = BaseEmailOptions & { html: string; text?: string };

export type SendEmailOptions = TextEmail | HtmlEmail;

export type EmailResult = {
  success: boolean;
  id?: string;
  error?: string;
};

export async function sendEmail(
  options: SendEmailOptions,
): Promise<EmailResult> {
  const { to, subject, replyTo } = options;

  const client = getResend();
  if (!client) {
    console.error("RESEND_API_KEY is not configured");
    return { success: false, error: "Email service not configured" };
  }

  const text = "text" in options ? options.text : undefined;
  const html = "html" in options ? options.html : undefined;

  try {
    const { data, error } = await client.emails.send({
      from: process.env.EMAIL_FROM || "Portfolio <onboarding@resend.dev>",
      to: Array.isArray(to) ? to : [to],
      subject,
      text: text || "",
      ...(html && { html }),
      ...(replyTo && { replyTo }),
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    console.error("Email send error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
