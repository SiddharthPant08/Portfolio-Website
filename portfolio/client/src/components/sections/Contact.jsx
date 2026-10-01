
import { useState } from "react";

import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal.jsx";
import Button from "@/components/ui/Button.jsx";
import MagneticButton from "@/components/ui/MagneticButton.jsx";
import SocialLinks from "@/components/ui/SocialLinks.jsx";
import portfolioConfig from "@/data/portfolioConfig.js";
import api from "@/services/api.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};

  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = "Enter your name.";
  } else if (name.length < 2 || name.length > 100) {
    errors.name = "Name must be between 2 and 100 characters.";
  }

  if (!email) {
    errors.email = "Enter your email.";
  } else if (email.length > 254 || !EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!message) {
    errors.message = "Write a short message.";
  } else if (message.length < 10 || message.length > 5000) {
    errors.message = "Message must be between 10 and 5000 characters.";
  }

  return errors;
}

const fieldClasses =
  "w-full rounded-xl border border-line-strong bg-white/[0.03] px-4 py-3 text-sm text-fg placeholder:text-subtle transition-colors duration-300 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

export default function Contact() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;

    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => {
      const nextErrors = { ...previous };
      delete nextErrors[name];
      return nextErrors;
    });

    if (status !== "sending") {
      setStatus("idle");
      setStatusMessage("");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions.
    if (status === "sending") return;

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setStatusMessage("Please fix the fields above.");
      return;
    }

    setStatus("sending");
    setStatusMessage("Sending your message...");

    try {
      const response = await api.post("/contact", {
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      });

      if (response.data?.success !== true) {
        throw new Error(
          response.data?.message || "Unable to send your message."
        );
      }

      setStatus("sent");
      setStatusMessage(
        "Message sent successfully! I'll get back to you soon."
      );

      setValues({
        name: "",
        email: "",
        message: "",
      });

      setErrors({});
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error.message ||
          "Unable to send your message. Please try again later."
      );
    }
  };

  return (
    <section
      id="contact"
      className="relative border-t border-line py-24 sm:py-32"
    >
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">06 · Contact</p>

            <h2 className="mt-6 text-balance text-4xl font-semibold uppercase leading-[1.02] tracking-tight sm:text-5xl">
              Let&apos;s build
              <br />
              something
              <br />
              <span className="text-gradient">great.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-sm leading-relaxed text-muted">
              Have a role, a project, or just want to talk shop? My inbox is
              open.
            </p>
          </Reveal>

          <Reveal
            delay={0.16}
            className="mt-8 flex flex-col gap-4"
          >
            {portfolioConfig.email && (
              <MagneticButton className="self-start">
                <a
                  href={`mailto:${portfolioConfig.email}`}
                  className="group inline-flex items-center gap-2.5 text-fg"
                >
                  <span className="glass grid h-10 w-10 place-items-center rounded-full transition-colors duration-300 group-hover:border-line-strong">
                    <Mail className="h-4 w-4" />
                  </span>

                  <span className="text-sm sm:text-base">
                    {portfolioConfig.email}
                  </span>
                </a>
              </MagneticButton>
            )}

            <SocialLinks />
          </Reveal>
        </div>

        <Reveal
          delay={0.1}
          className="lg:col-span-7"
        >
          <form
            onSubmit={onSubmit}
            noValidate
            className="glass rounded-(--radius-card) p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm text-muted"
                >
                  Name
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  maxLength={100}
                  value={values.name}
                  onChange={onChange}
                  placeholder="Your name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={
                    errors.name ? "contact-name-error" : undefined
                  }
                  className={fieldClasses}
                />

                {errors.name && (
                  <p
                    id="contact-name-error"
                    className="mt-2 text-xs text-rose-400"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-sm text-muted"
                >
                  Email
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  value={values.email}
                  onChange={onChange}
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? "contact-email-error" : undefined
                  }
                  className={fieldClasses}
                />

                {errors.email && (
                  <p
                    id="contact-email-error"
                    className="mt-2 text-xs text-rose-400"
                  >
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="contact-message"
                className="mb-2 block text-sm text-muted"
              >
                Message
              </label>

              <textarea
                id="contact-message"
                name="message"
                rows={5}
                maxLength={5000}
                value={values.message}
                onChange={onChange}
                placeholder="What are you looking to build, or what would you like to ask?"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? "contact-message-error" : undefined
                }
                className={`${fieldClasses} resize-none`}
              />

              {errors.message && (
                <p
                  id="contact-message-error"
                  className="mt-2 text-xs text-rose-400"
                >
                  {errors.message}
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <MagneticButton>
                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending..." : "Send Message"}

                  {status !== "sending" && (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </MagneticButton>

              <div
                role="status"
                aria-live="polite"
                className="text-sm"
              >
                {statusMessage && (
                  <span
                    className={`inline-flex items-center gap-1.5 ${
                      status === "sent"
                        ? "text-emerald-400"
                        : status === "error"
                          ? "text-rose-400"
                          : "text-muted"
                    }`}
                  >
                    {status === "sent" && (
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                    )}

                    {status === "error" && (
                      <AlertCircle className="h-4 w-4 shrink-0" />
                    )}

                    {statusMessage}
                  </span>
                )}
              </div>
            </div>

            <p className="mt-5 text-xs text-subtle">
              Your message is sent through the contact form. Please don&apos;t
              include sensitive personal information.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}