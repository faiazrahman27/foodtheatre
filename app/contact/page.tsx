"use client";

import Image from "next/image";
import { type FormEvent, useMemo, useState } from "react";
import { GradientBackground } from "@/components/ui/paper-design-shader-background";

const CONTACT_EMAIL = "hello@foodtheatre.com";

const contactTypes = [
  "I want to discover an experience",
  "I want to become a Food Character",
  "I want to host a Food Theatre or Food Stage",
  "I want to plan a private table",
  "I represent a restaurant, brand, producer, or caterer",
  "I want to collaborate",
  "Press or story request",
  "Something else",
];

const preferredReplyOptions = ["Email", "Phone", "WhatsApp", "Instagram"];

function FieldLabel({
  htmlFor,
  children,
  required = false,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="font-semibold text-black/70">
      {children}
      {required ? <span className="ml-1 text-[var(--ft-pomodori)]">*</span> : null}
    </label>
  );
}

function TextInput({
  id,
  name,
  label,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder: string;
  autoComplete?: string;
}) {
  return (
    <div className="w-full">
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>

      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-2 h-12 w-full rounded-full border border-black/15 bg-white/92 px-4 text-sm font-semibold text-black outline-none transition placeholder:text-black/30 focus:border-[var(--ft-denim)] focus:ring-2 focus:ring-[var(--ft-denim)]/20"
      />
    </div>
  );
}

function SelectInput({
  id,
  name,
  label,
  required = false,
  options,
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  options: string[];
}) {
  return (
    <div className="w-full">
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>

      <select
        id={id}
        name={name}
        required={required}
        defaultValue=""
        className="mt-2 h-12 w-full rounded-full border border-black/15 bg-white/92 px-4 text-sm font-semibold text-black outline-none transition focus:border-[var(--ft-denim)] focus:ring-2 focus:ring-[var(--ft-denim)]/20"
      >
        <option value="" disabled>
          Choose one
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const hiddenField = String(formData.get("website") || "").trim();

    if (hiddenField) {
      return;
    }

    const contactType = String(formData.get("contactType") || "");
    const fullName = String(formData.get("fullName") || "");
    const email = String(formData.get("email") || "");
    const phone = String(formData.get("phone") || "");
    const organization = String(formData.get("organization") || "");
    const city = String(formData.get("city") || "");
    const country = String(formData.get("country") || "");
    const preferredReply = String(formData.get("preferredReply") || "");
    const websiteOrSocial = String(formData.get("websiteOrSocial") || "");
    const dateOrTiming = String(formData.get("dateOrTiming") || "");
    const guestsOrScale = String(formData.get("guestsOrScale") || "");
    const message = String(formData.get("message") || "");

    const subject = `Food Theatre message — ${contactType || "Contact request"}`;

    const body = [
      "Food Theatre contact message",
      "",
      `Type: ${contactType}`,
      `Name: ${fullName}`,
      `Email: ${email}`,
      `Cell / WhatsApp: ${phone || "Not provided"}`,
      `Organization / brand / venue: ${organization || "Not provided"}`,
      `City: ${city || "Not provided"}`,
      `Country: ${country || "Not provided"}`,
      `Best way to reply: ${preferredReply || "Not provided"}`,
      `Website / Instagram: ${websiteOrSocial || "Not provided"}`,
      `Date or timing: ${dateOrTiming || "Not provided"}`,
      `Guests or scale: ${guestsOrScale || "Not provided"}`,
      "",
      "Message:",
      message,
      "",
      `Sent from Food Theatre contact page, ${currentYear}.`,
    ].join("\n");

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
    setSent(true);
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#fffdf8] px-4 py-14 text-sm text-black sm:py-20">
      <GradientBackground />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 mx-auto flex w-full max-w-[760px] flex-col items-center rounded-[2.2rem] border border-black/10 bg-[#fffdf8]/86 px-5 py-8 shadow-[0_30px_90px_rgba(17,17,17,0.10)] backdrop-blur-md sm:px-8 sm:py-10"
      >
        <input
          tabIndex={-1}
          autoComplete="off"
          name="website"
          className="hidden"
          aria-hidden="true"
        />

        <Image
          src="/brand/foodtheatre-logo.png"
          alt="Food Theatre logo"
          width={96}
          height={96}
          priority
          className="mb-5 h-20 w-20 object-contain"
        />

        <p className="rounded-full bg-[var(--ft-citrine)] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-black">
          Contact Us
        </p>

        <h1 className="ft-display mt-5 max-w-2xl text-center text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] tracking-[0.002em]">
          Let’s Get in Touch.
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-center text-base font-semibold leading-8 text-black/60">
          Tell us what you would like to discover, create, host, or share. You can also reach us at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-black text-[var(--ft-denim)] underline-offset-4 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>

        <div className="mt-10 grid w-full gap-5 md:grid-cols-2">
          <SelectInput
            id="contactType"
            name="contactType"
            label="Type"
            required
            options={contactTypes}
          />

          <TextInput
            id="fullName"
            name="fullName"
            label="Name"
            required
            placeholder="Enter your name"
            autoComplete="name"
          />

          <TextInput
            id="email"
            name="email"
            type="email"
            label="Email"
            required
            placeholder="Enter your email"
            autoComplete="email"
          />

          <TextInput
            id="phone"
            name="phone"
            type="tel"
            label="Cell / WhatsApp"
            placeholder="Enter your number"
            autoComplete="tel"
          />

          <TextInput
            id="organization"
            name="organization"
            label="Organization, brand, or venue"
            placeholder="Optional"
            autoComplete="organization"
          />

          <SelectInput
            id="preferredReply"
            name="preferredReply"
            label="Best way to reply"
            options={preferredReplyOptions}
          />

          <TextInput
            id="city"
            name="city"
            label="City"
            placeholder="Enter your city"
            autoComplete="address-level2"
          />

          <TextInput
            id="country"
            name="country"
            label="Country"
            placeholder="Enter your country"
            autoComplete="country-name"
          />

          <TextInput
            id="websiteOrSocial"
            name="websiteOrSocial"
            label="Website or Instagram"
            placeholder="Optional"
            autoComplete="url"
          />

          <TextInput
            id="dateOrTiming"
            name="dateOrTiming"
            label="Date or timing"
            placeholder="Optional"
          />

          <div className="md:col-span-2">
            <TextInput
              id="guestsOrScale"
              name="guestsOrScale"
              label="Guests or scale"
              placeholder="Example: 20 guests, private dinner, city event"
            />
          </div>

          <div className="md:col-span-2">
            <FieldLabel htmlFor="message" required>
              Message
            </FieldLabel>

            <textarea
              id="message"
              name="message"
              required
              rows={6}
              placeholder="Write your message"
              className="mt-2 w-full resize-none rounded-[1.3rem] border border-black/15 bg-white/92 p-4 text-sm font-semibold leading-7 text-black outline-none transition placeholder:text-black/30 focus:border-[var(--ft-denim)] focus:ring-2 focus:ring-[var(--ft-denim)]/20"
            />
          </div>
        </div>

        <label className="mt-6 flex w-full cursor-pointer items-start gap-3 rounded-[1.3rem] border border-black/10 bg-white/88 px-4 py-4 text-sm font-semibold leading-7 text-black/62">
          <input
            type="checkbox"
            required
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--ft-pomodori)]"
          />
          Please use my message and contact details to reply to this request.
        </label>

        <button
          type="submit"
          className="mt-6 flex h-12 w-full max-w-[260px] items-center justify-center gap-2 rounded-full bg-[var(--ft-denim)] px-6 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[var(--ft-pomodori)] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[var(--ft-citrine)]"
        >
          Send Message
          <span>→</span>
        </button>

        <p className="mt-5 text-center text-sm font-semibold leading-7 text-black/46">
          {sent
            ? "Your email app should open with the message ready to send."
            : "Fields marked with an asterisk are required."}
        </p>
      </form>
    </main>
  );
}
