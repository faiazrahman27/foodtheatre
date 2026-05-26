"use client";

import Image from "next/image";
import { type FormEvent, type ReactNode, useMemo, useState } from "react";
import { GradientBackground } from "@/components/ui/paper-design-shader-background";

const CONTACT_EMAIL = "hello@foodtheatre.com";

const characterCategories = [
  "Innovators",
  "Creators",
  "Artisanal",
  "Global",
  "Wellness",
  "FoodCo.s",
  "Not sure yet",
];

const applicantTypes = [
  "Independent chef / cook",
  "Food creator / storyteller",
  "Artisan / maker",
  "Restaurant / food business",
  "Producer / brand",
  "Wellness food host",
  "Caterer / private table host",
  "Bartender / drink creator",
  "Other",
];

const preferredFoodTheatreLocations = [
  "Bologna Food Theatre",
  "Food Stage / pop-up location",
  "Private venue",
  "Guest home / private table",
  "Restaurant / brand location",
  "Own studio / kitchen space",
  "Delivery area",
  "Travelling / flexible",
  "Not sure yet",
];

const availabilityOptions = [
  "Pop-up availability",
  "Food delivery",
  "Weekly availability",
  "Monthly availability",
  "Special events",
  "Private tables",
  "Private dinners",
  "Seasonal residency",
  "Brand or venue collaboration",
  "Travel available",
];

const experienceFormatOptions = [
  "Tasting menu",
  "Workshop",
  "Supper club",
  "Cultural dinner",
  "Chef’s table",
  "Brunch table",
  "Product tasting",
  "Content-friendly table",
  "Community table",
  "Private dining",
  "Cooking class",
  "Food story session",
];

const preferredReplyOptions = ["Email", "Phone", "WhatsApp", "Instagram"];

function FieldLabel({
  htmlFor,
  children,
  required = false,
}: {
  htmlFor: string;
  children: ReactNode;
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

function CheckboxGroup({
  legend,
  description,
  name,
  options,
}: {
  legend: string;
  description?: string;
  name: string;
  options: string[];
}) {
  return (
    <fieldset className="rounded-[1.5rem] border border-black/10 bg-white/88 p-4">
      <legend className="px-1 text-sm font-semibold text-black/70">{legend}</legend>

      {description ? (
        <p className="mt-2 text-sm font-semibold leading-7 text-black/52">
          {description}
        </p>
      ) : null}

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-start gap-3 rounded-[1rem] border border-black/10 bg-[#fffdf8] px-3 py-3 text-sm font-semibold leading-6 text-black/62 transition hover:border-black/20 hover:bg-[var(--ft-citrine)]/20"
          >
            <input
              type="checkbox"
              name={name}
              value={option}
              className="mt-1 h-4 w-4 shrink-0 accent-[var(--ft-pomodori)]"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function FileUploadInput() {
  return (
    <div className="rounded-[1.5rem] border border-black/10 bg-white/88 p-4">
      <FieldLabel htmlFor="menuUpload">Menu, sample dishes, or visual reference</FieldLabel>

      <p className="mt-2 text-sm font-semibold leading-7 text-black/52">
        Share a menu, dish photo, PDF, presentation, or document that helps us understand your food
        direction.
      </p>

      <input
        id="menuUpload"
        name="menuUpload"
        type="file"
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        className="mt-4 block w-full cursor-pointer rounded-full border border-black/15 bg-white/92 px-4 py-3 text-sm font-semibold text-black file:mr-4 file:rounded-full file:border-0 file:bg-[var(--ft-citrine)] file:px-4 file:py-2 file:text-sm file:font-black file:text-black hover:file:bg-[var(--ft-menta)] hover:file:text-white"
      />
    </div>
  );
}

export default function BeACharacterPage() {
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

    const fullName = String(formData.get("fullName") || "");
    const email = String(formData.get("email") || "");
    const phone = String(formData.get("phone") || "");
    const city = String(formData.get("city") || "");
    const country = String(formData.get("country") || "");
    const applicantType = String(formData.get("applicantType") || "");
    const characterCategory = String(formData.get("characterCategory") || "");
    const preferredLocation = String(formData.get("preferredLocation") || "");
    const preferredReply = String(formData.get("preferredReply") || "");
    const instagram = String(formData.get("instagram") || "");
    const facebook = String(formData.get("facebook") || "");
    const websiteUrl = String(formData.get("websiteUrl") || "");
    const otherSocial = String(formData.get("otherSocial") || "");
    const foodStyle = String(formData.get("foodStyle") || "");
    const shortIntro = String(formData.get("shortIntro") || "");
    const experience = String(formData.get("experience") || "");
    const message = String(formData.get("message") || "");

    const selectedAvailability = formData
      .getAll("availabilityOptions")
      .map((value) => String(value))
      .filter(Boolean);

    const selectedFormats = formData
      .getAll("experienceFormats")
      .map((value) => String(value))
      .filter(Boolean);

    const uploadedFile = formData.get("menuUpload");
    const uploadedFileName =
      uploadedFile instanceof File && uploadedFile.name ? uploadedFile.name : "Not provided";

    const subject = `Food Character application — ${fullName || "New applicant"}`;

    const body = [
      "Food Theatre character application",
      "",
      `Name: ${fullName}`,
      `Email: ${email}`,
      `Cell / WhatsApp: ${phone || "Not provided"}`,
      `City: ${city || "Not provided"}`,
      `Country: ${country || "Not provided"}`,
      "",
      `Applicant type: ${applicantType}`,
      `Preferred character category: ${characterCategory}`,
      `Preferred Food Theatre / Stage location: ${preferredLocation}`,
      `Best way to reply: ${preferredReply || "Not provided"}`,
      "",
      `Instagram: ${instagram || "Not provided"}`,
      `Facebook: ${facebook || "Not provided"}`,
      `Website: ${websiteUrl || "Not provided"}`,
      `Other social link: ${otherSocial || "Not provided"}`,
      "",
      `Availability: ${
        selectedAvailability.length ? selectedAvailability.join(", ") : "Not provided"
      }`,
      `Experience formats: ${selectedFormats.length ? selectedFormats.join(", ") : "Not provided"}`,
      `Food style / cuisine / direction: ${foodStyle || "Not provided"}`,
      `Menu or reference file selected: ${uploadedFileName}`,
      "",
      "Short introduction:",
      shortIntro || "Not provided",
      "",
      "Previous experience:",
      experience || "Not provided",
      "",
      "Application note:",
      message || "Not provided",
      "",
      `Sent from Food Theatre Be a Character page, ${currentYear}.`,
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
        className="relative z-10 mx-auto flex w-full max-w-[860px] flex-col items-center rounded-[2.2rem] border border-black/10 bg-[#fffdf8]/86 px-5 py-8 shadow-[0_30px_90px_rgba(17,17,17,0.10)] backdrop-blur-md sm:px-8 sm:py-10"
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
          Be a Character
        </p>

        <h1 className="ft-display mt-5 max-w-3xl text-center text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] tracking-[0.002em]">
          Bring Your Food Story to the Stage.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-center text-base font-semibold leading-8 text-black/60">
          Tell us who you are, where you create, how guests can experience your food, and what kind
          of Food Theatre moment you want to bring to life.
        </p>

        <div className="mt-10 grid w-full gap-5 md:grid-cols-2">
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
            required
            placeholder="Enter your number"
            autoComplete="tel"
          />

          <SelectInput
            id="preferredReply"
            name="preferredReply"
            label="Best way to reply"
            required
            options={preferredReplyOptions}
          />

          <TextInput
            id="city"
            name="city"
            label="City"
            required
            placeholder="Enter your city"
            autoComplete="address-level2"
          />

          <TextInput
            id="country"
            name="country"
            label="Country"
            required
            placeholder="Enter your country"
            autoComplete="country-name"
          />

          <SelectInput
            id="applicantType"
            name="applicantType"
            label="What best describes you?"
            required
            options={applicantTypes}
          />

          <SelectInput
            id="characterCategory"
            name="characterCategory"
            label="Which Food Character world fits you best?"
            required
            options={characterCategories}
          />

          <SelectInput
            id="preferredLocation"
            name="preferredLocation"
            label="Where would you like to host or appear?"
            required
            options={preferredFoodTheatreLocations}
          />

          <TextInput
            id="instagram"
            name="instagram"
            label="Instagram"
            placeholder="https://instagram.com/..."
            autoComplete="url"
          />

          <TextInput
            id="facebook"
            name="facebook"
            label="Facebook"
            placeholder="https://facebook.com/..."
            autoComplete="url"
          />

          <TextInput
            id="websiteUrl"
            name="websiteUrl"
            label="Website"
            placeholder="https://..."
            autoComplete="url"
          />

          <TextInput
            id="otherSocial"
            name="otherSocial"
            label="Other social link"
            placeholder="TikTok, YouTube, portfolio, or other"
            autoComplete="url"
          />

          <div className="md:col-span-2">
            <TextInput
              id="foodStyle"
              name="foodStyle"
              label="Food style, cuisine, or creative direction"
              required
              placeholder="Example: Italian-inspired tasting, vegan brunch, cultural dinner, pastry workshop"
            />
          </div>

          <div className="md:col-span-2">
            <CheckboxGroup
              legend="Availability"
              description="Choose how and when guests, stages, or partners could work with you."
              name="availabilityOptions"
              options={availabilityOptions}
            />
          </div>

          <div className="md:col-span-2">
            <CheckboxGroup
              legend="Experience formats"
              description="Choose the kind of food moments you would like to create."
              name="experienceFormats"
              options={experienceFormatOptions}
            />
          </div>

          <div className="md:col-span-2">
            <FileUploadInput />
          </div>

          <div className="md:col-span-2">
            <FieldLabel htmlFor="shortIntro" required>
              Your food story
            </FieldLabel>

            <textarea
              id="shortIntro"
              name="shortIntro"
              required
              rows={4}
              placeholder="Introduce yourself and the kind of food moment you want to create."
              className="mt-2 w-full resize-none rounded-[1.3rem] border border-black/15 bg-white/92 p-4 text-sm font-semibold leading-7 text-black outline-none transition placeholder:text-black/30 focus:border-[var(--ft-denim)] focus:ring-2 focus:ring-[var(--ft-denim)]/20"
            />
          </div>

          <div className="md:col-span-2">
            <FieldLabel htmlFor="experience">Previous food, hosting, or creative experience</FieldLabel>

            <textarea
              id="experience"
              name="experience"
              rows={4}
              placeholder="Example: dinners hosted, restaurant work, content, delivery, catering, workshops, events, or brand collaborations."
              className="mt-2 w-full resize-none rounded-[1.3rem] border border-black/15 bg-white/92 p-4 text-sm font-semibold leading-7 text-black outline-none transition placeholder:text-black/30 focus:border-[var(--ft-denim)] focus:ring-2 focus:ring-[var(--ft-denim)]/20"
            />
          </div>

          <div className="md:col-span-2">
            <FieldLabel htmlFor="message">Anything else you want to share?</FieldLabel>

            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Share any detail that helps us understand your table, audience, food world, or preferred collaboration."
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
          Food Theatre may use my application details to review my request and contact me.
        </label>

        <button
          type="submit"
          className="mt-6 flex h-12 w-full max-w-[300px] items-center justify-center gap-2 rounded-full bg-[var(--ft-denim)] px-6 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[var(--ft-pomodori)] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[var(--ft-citrine)]"
        >
          Send Application
          <span>→</span>
        </button>

        <p className="mt-5 text-center text-sm font-semibold leading-7 text-black/46">
          {sent
            ? "Your email app should open with the application ready to send."
            : "Fields marked with an asterisk are required."}
        </p>
      </form>
    </main>
  );
}
