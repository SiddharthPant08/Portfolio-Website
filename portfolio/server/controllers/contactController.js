import { sendContactEmail } from "../utils/sendEmail.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(req, res) {
  const name =
    typeof req.body?.name === "string" ? req.body.name.trim() : "";

  const email =
    typeof req.body?.email === "string"
      ? req.body.email.trim()
      : "";

  const message =
    typeof req.body?.message === "string"
      ? req.body.message.trim()
      : "";

  // Server-side validation: frontend validation alone is not enough.
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and message are required.",
    });
  }

  if (name.length < 2 || name.length > 100) {
    return res.status(400).json({
      success: false,
      message: "Name must be between 2 and 100 characters.",
    });
  }

  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address.",
    });
  }

  if (message.length < 10 || message.length > 5000) {
    return res.status(400).json({
      success: false,
      message: "Message must be between 10 and 5000 characters.",
    });
  }

  try {
    await sendContactEmail({ name, email, message });

    return res.status(200).json({
      success: true,
      message: "Your message was accepted by the email service.",
    });
  } catch (error) {
    // Keep credentials and message contents out of logs.
    console.error("Contact email delivery failed:", error.message);

    return res.status(503).json({
      success: false,
      message:
        "We couldn't send your message right now. Please try again later.",
    });
  }
}