"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { z } from "zod";
import {
  contactSchema,
  type ContactFieldErrors,
  type ContactInput,
  type ContactResponse,
} from "@/lib/contact-schema";
import { cn } from "@/lib/utils";
import { buttonStyles, labelClass, nudge } from "./ui";

type Status = "idle" | "sending" | "success" | "error";
type Values = ContactInput & { website: string };

const emptyValues: Values = { name: "", email: "", message: "", website: "" };

const fieldClass =
  "w-full rounded-card border bg-carbon px-3.5 py-3 text-base text-fg transition-colors duration-150 placeholder:text-muted/70 focus:border-fg focus-visible:outline-none";

export function ContactForm() {
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const update =
    (field: keyof Values) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }));
      // Hapus error field ini begitu pengunjung mulai memperbaiki
      if (field !== "website" && errors[field]) {
        setErrors((current) => ({ ...current, [field]: undefined }));
      }
    };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    // Validasi di browser dulu biar cepat — server tetap validasi ulang
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors = z.flattenError(parsed.error).fieldErrors;
      setErrors(fieldErrors);
      setStatus("idle");
      const firstInvalid = (["name", "email", "message"] as const).find(
        (f) => fieldErrors[f],
      );
      if (firstInvalid)
        form.querySelector<HTMLElement>(`#contact-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("sending");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, website: values.website }),
      });
      const data = (await response
        .json()
        .catch(() => null)) as ContactResponse | null;

      if (response.ok && data?.ok) {
        setStatus("success");
        setStatusMessage("Thanks! I'll get back to you soon.");
        setValues(emptyValues);
        setErrors({});
        return;
      }

      setStatus("error");
      setStatusMessage(
        data && !data.ok
          ? data.error
          : "Something went wrong. Please try again.",
      );
      if (data && !data.ok && data.fieldErrors) setErrors(data.fieldErrors);
    } catch {
      setStatus("error");
      setStatusMessage("Network error. Check your connection and try again.");
    }
  };

  const isSending = status === "sending";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative rounded-card border border-line p-6 md:p-8"
    >
      <div className="grid gap-6">
        <Field id="contact-name" label="Name" error={errors.name?.[0]}>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={cn(
              fieldClass,
              errors.name ? "border-danger" : "border-line-strong",
            )}
          />
        </Field>

        <Field id="contact-email" label="Email" error={errors.email?.[0]}>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={cn(
              fieldClass,
              errors.email ? "border-danger" : "border-line-strong",
            )}
          />
        </Field>

        <Field id="contact-message" label="Message" error={errors.message?.[0]}>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            placeholder="What would you like to talk about?"
            value={values.message}
            onChange={update("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? "contact-message-error" : undefined
            }
            className={cn(
              fieldClass,
              "min-h-40 resize-y",
              errors.message ? "border-danger" : "border-line-strong",
            )}
          />
        </Field>

        {/* Honeypot: tidak terlihat oleh manusia, tapi bot biasanya mengisi semua field */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={update("website")}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSending}
          className={cn(buttonStyles.primary, "w-full sm:w-auto")}
        >
          {isSending ? "Sending…" : "Send message"}
          {!isSending && (
            <ArrowRight
              size={16}
              strokeWidth={1.5}
              className={nudge.right}
              aria-hidden="true"
            />
          )}
        </button>

        <p
          role="status"
          aria-live="polite"
          className={cn(
            "flex items-center gap-2 text-body-sm",
            status === "error" ? "text-danger" : "text-muted",
          )}
        >
          {status === "success" && (
            <span
              className="size-1.5 shrink-0 rounded-full bg-live"
              aria-hidden="true"
            />
          )}
          {statusMessage}
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={cn(labelClass, "mb-2 block text-muted")}>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-[13px] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
