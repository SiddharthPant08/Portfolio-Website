import nodemailer from "nodemailer";

export async function sendContactEmail({ name, email, message }) {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL,
  } = process.env;

  const required = {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL,
  };

  const missing = Object.entries(required)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error("Email service is not configured.");
  }

  const port = Number(SMTP_PORT);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("Invalid SMTP configuration.");
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: SMTP_SECURE === "true",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

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

  await transporter.sendMail({
    from: CONTACT_FROM_EMAIL,
    to: CONTACT_TO_EMAIL,
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
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\r?\n/g, "<br>")}</p>
    `,
  });
}