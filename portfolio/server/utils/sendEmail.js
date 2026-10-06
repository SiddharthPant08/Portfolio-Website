import { Resend } from "resend";

export async function sendContactEmail({ name, email, message }) {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL } = process.env;

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
    throw new Error("Resend email service is not configured.");
  }

  const resend = new Resend(RESEND_API_KEY);

  const escapeHtml = (value) =>
    value.replace(/[&<>"']/g, (character) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };

      return entities[character];
    });

  const { data, error } = await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: [CONTACT_TO_EMAIL],
    replyTo: email,
    subject: "New portfolio contact message",

    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n"),

    html: `
      <h2>New portfolio contact message</h2>

      <p>
        <strong>Name:</strong> ${escapeHtml(name)}
      </p>

      <p>
        <strong>Email:</strong> ${escapeHtml(email)}
      </p>

      <p>
        <strong>Message:</strong>
      </p>

      <p>
        ${escapeHtml(message).replace(/\r?\n/g, "<br>")}
      </p>
    `,
  });

  if (error) {
    throw new Error(error.message || "Failed to send email.");
  }

  console.log("✅ Contact email sent:", data?.id);
}