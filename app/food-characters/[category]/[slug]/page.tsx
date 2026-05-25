"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "next/navigation";
import { type FormEvent, type ReactNode, useMemo, useState } from "react";
import {
  findFoodCharacterProfile,
  type FoodCharacterMenuItem,
  type FoodCharacterProfile,
} from "@/lib/food-character-profiles";

const CONTACT_EMAIL = "hello@foodtheatre.com";

type RouteParams = {
  category?: string | string[];
  slug?: string | string[];
};

type ButtonTone = "denimPomodori" | "citrineMenta" | "pomodoriViola" | "violaBlush";

const buttonToneClasses: Record<ButtonTone, string> = {
  denimPomodori:
    "bg-[var(--ft-denim)] text-white hover:bg-[var(--ft-pomodori)] hover:text-white",
  citrineMenta:
    "bg-[var(--ft-citrine)] text-black hover:bg-[var(--ft-menta)] hover:text-white",
  pomodoriViola:
    "bg-[var(--ft-pomodori)] text-white hover:bg-[var(--ft-viola)] hover:text-white",
  violaBlush:
    "bg-[var(--ft-viola)] text-white hover:bg-[var(--ft-blush)] hover:text-black",
};

function getParamValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] || "";
  }

  return value || "";
}

function BrandButton({
  href,
  children,
  tone = "denimPomodori",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: ButtonTone;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex w-fit items-center justify-center gap-2 rounded-full border border-black/10 px-6 py-4 text-sm font-black transition duration-300 hover:-translate-y-0.5 hover:border-black/20 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[var(--ft-citrine)] ${buttonToneClasses[tone]} ${className}`}
    >
      {children}
    </Link>
  );
}

function ActionButton({
  children,
  onClick,
  tone = "denimPomodori",
  className = "",
}: {
  children: ReactNode;
  onClick: () => void;
  tone?: ButtonTone;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex w-fit items-center justify-center gap-2 rounded-full border border-black/10 px-6 py-4 text-sm font-black transition duration-300 hover:-translate-y-0.5 hover:border-black/20 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[var(--ft-citrine)] ${buttonToneClasses[tone]} ${className}`}
    >
      {children}
    </button>
  );
}

function TextArrow() {
  return <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>;
}

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
    <label htmlFor={htmlFor} className="text-sm font-black text-black/70">
      {children}
      {required ? <span className="ml-1 text-[var(--ft-pomodori)]">*</span> : null}
    </label>
  );
}

function TextInput({
  id,
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  autoComplete,
  maxLength,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  maxLength?: number;
}) {
  return (
    <div>
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
        maxLength={maxLength}
        className="mt-2 h-12 w-full rounded-full border border-black/15 bg-white px-4 text-sm font-semibold text-black outline-none transition placeholder:text-black/32 focus:border-[var(--ft-denim)] focus:ring-2 focus:ring-[var(--ft-denim)]/20"
      />
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-black uppercase tracking-[0.24em] text-black/42">
      {children}
    </p>
  );
}

function ModalCloseButton({
  onClose,
  label,
}: {
  onClose: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="fixed right-4 top-4 z-[120] flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white text-2xl font-black leading-none text-black shadow-[0_14px_34px_rgba(0,0,0,0.22)] transition hover:bg-[var(--ft-citrine)] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[var(--ft-citrine)]"
      aria-label={label}
    >
      ×
    </button>
  );
}

function TagGroup({
  label,
  items,
  accentColor,
}: {
  label: string;
  items: string[];
  accentColor: string;
}) {
  if (!items.length) {
    return null;
  }

  return (
    <div className="rounded-[1.4rem] border border-black/10 bg-white/82 p-4 backdrop-blur-md">
      <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-black/38">
        {label}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-black/10 px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.11em] text-black/64"
            style={{ backgroundColor: accentColor }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProfileSnapshot({ profile }: { profile: FoodCharacterProfile }) {
  const items = [
    {
      label: "Home base",
      title: profile.location,
      text: `${profile.city} gives this Food Character a real local starting point inside the Food Theatre world.`,
    },
    {
      label: "Availability",
      title: "Selected moments",
      text: profile.availability,
    },
    {
      label: "Travel",
      title: "Relocation",
      text: profile.relocation,
    },
  ].filter((item) => item.title || item.text);

  return (
    <div className="mt-8 grid gap-3">
      <div className="grid gap-3 sm:grid-cols-3">
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            className="relative overflow-hidden rounded-[1.5rem] border border-black/10 bg-white/78 p-4 backdrop-blur-md"
          >
            <span
              className="absolute right-4 top-4 h-3 w-3 rounded-full"
              style={{
                backgroundColor:
                  index === 0
                    ? profile.accentColor
                    : index === 1
                      ? "var(--ft-menta)"
                      : "var(--ft-pomodori)",
              }}
            />

            <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-black/38">
              {item.label}
            </p>

            <h3 className="mt-4 text-base font-black leading-tight text-black">
              {item.title}
            </h3>

            <p className="mt-3 text-xs font-semibold leading-6 text-black/56">
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <TagGroup
          label="Cuisine / Style / Format"
          items={profile.cuisineStyleFormat}
          accentColor={profile.accentSoftColor}
        />

        <TagGroup
          label="Collaboration Type"
          items={profile.collaborationTypes}
          accentColor="rgba(255, 255, 255, 0.88)"
        />
      </div>
    </div>
  );
}

function CharacterVisual({ profile }: { profile: FoodCharacterProfile }) {
  const previewTags = profile.cuisineStyleFormat.slice(0, 3);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 230, damping: 26 }}
      className="relative mx-auto w-full max-w-[460px] lg:mx-0"
    >
      <div
        className="absolute -right-5 -top-5 h-24 w-24 rounded-full"
        style={{ backgroundColor: profile.accentColor }}
      />
      <div className="absolute -bottom-5 -left-5 h-16 w-16 rounded-full bg-[var(--ft-denim)]" />
      <div className="absolute right-10 top-1/2 h-8 w-8 rounded-full bg-[var(--ft-citrine)]" />

      <div className="relative overflow-hidden rounded-[2.4rem] border border-black/10 bg-[#fffdf8] p-3 shadow-[0_30px_90px_rgba(17,17,17,0.14)]">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-65"
          style={{ backgroundColor: profile.accentColor }}
        />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-60 w-60 rounded-full bg-[var(--ft-blush)]/28" />

        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-white">
          <Image
            src={profile.portraitImage}
            alt={profile.portraitImageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 460px"
            priority
            className="object-cover"
          />
        </div>

        <div className="relative z-10 mt-4 rounded-[1.6rem] border border-black/10 bg-white/88 p-5 backdrop-blur-md">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-black/42">
            {profile.categoryLabel} · {profile.city}
          </p>

          <h2 className="ft-display mt-3 text-[clamp(2.2rem,6vw,4rem)] leading-[0.9] text-black">
            {profile.name}
          </h2>

          <p className="mt-3 text-sm font-semibold text-black/58">{profile.role}</p>

          {previewTags.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {previewTags.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-black/10 bg-[#fffdf8] px-3 py-2 text-[0.66rem] font-black uppercase tracking-[0.1em] text-black/58"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

function MenuItemCard({ item }: { item: FoodCharacterMenuItem }) {
  return (
    <div className="grid gap-4 rounded-[1.45rem] border border-black/10 bg-white/92 p-3 shadow-[0_12px_36px_rgba(17,17,17,0.05)] sm:grid-cols-[116px_1fr] sm:items-start">
      {item.image ? (
        <div className="relative aspect-square overflow-hidden rounded-[1.15rem] bg-[#fffdf8]">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, 116px"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-square items-center justify-center rounded-[1.15rem] bg-[#fffdf8]">
          <span className="text-[0.62rem] font-black uppercase tracking-[0.16em] text-black/32">
            Menu item
          </span>
        </div>
      )}

      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          <h5 className="text-base font-black leading-tight text-black">{item.name}</h5>

          <span className="shrink-0 rounded-full bg-black px-3 py-1.5 text-xs font-black text-white">
            {item.price}
          </span>
        </div>

        <p className="mt-2 text-sm font-semibold leading-6 text-black/62">
          {item.description}
        </p>

        {item.dietaryTags?.length ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.dietaryTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/10 bg-[#fffdf8] px-2.5 py-1 text-[0.6rem] font-black uppercase tracking-[0.09em] text-black/48"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function MenuArtwork({
  profile,
  large = false,
}: {
  profile: FoodCharacterProfile;
  large?: boolean;
}) {
  const sections = profile.menu.sections;

  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-black/10 bg-[#fffdf8] p-4 shadow-[0_24px_80px_rgba(17,17,17,0.10)] sm:p-5 ${
        large ? "w-full max-w-[860px]" : "w-full"
      }`}
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-70"
        style={{ backgroundColor: profile.accentColor }}
      />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-[var(--ft-blush)]/34" />
      <div className="pointer-events-none absolute bottom-14 right-10 h-9 w-9 rounded-full bg-[var(--ft-menta)]/70" />

      <div className="relative z-10">
        <div className="grid gap-5 border-b border-black/10 pb-5 sm:grid-cols-[1fr_auto] sm:items-start">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-black/42">
              Food Theatre menu
            </p>

            <h3 className="ft-display mt-3 max-w-xl text-[clamp(2.35rem,6vw,4.6rem)] leading-[0.92] tracking-[0.002em]">
              {profile.menu.title}
            </h3>

            <p className="mt-3 text-sm font-black uppercase tracking-[0.16em] text-black/52">
              By {profile.name} · {profile.role}
            </p>
          </div>

          <Image
            src="/brand/foodtheatre-logo.png"
            alt="Food Theatre logo"
            width={96}
            height={96}
            className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16"
          />
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-black/10 bg-white/80 p-4 backdrop-blur-md">
          <p className="max-w-2xl text-sm font-semibold leading-7 text-black/66">
            {profile.menu.subtitle}
          </p>

          <p className="mt-3 text-[0.68rem] font-black uppercase tracking-[0.18em] text-black/38">
            Currency · {profile.menu.currency}
          </p>
        </div>

        {sections.length ? (
          <div className="mt-7 grid gap-5">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="rounded-[1.6rem] border border-black/10 bg-white/54 p-4 backdrop-blur-md"
              >
                <div className="flex items-center gap-3 border-b border-black/10 pb-4">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-black text-black"
                    style={{ backgroundColor: profile.accentColor }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h4 className="text-sm font-black uppercase tracking-[0.18em] text-black/58">
                    {section.title}
                  </h4>
                </div>

                <div className="mt-4 grid gap-3">
                  {section.items.map((item) => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-7 rounded-[1.6rem] border border-black/10 bg-white/76 p-5">
            <p className="text-sm font-semibold leading-7 text-black/58">
              This character menu is not available yet.
            </p>
          </div>
        )}

        {profile.menu.note ? (
          <p className="mt-6 border-t border-black/10 pt-5 text-xs font-semibold leading-6 text-black/48">
            {profile.menu.note}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function ConnectionModal({
  profile,
  open,
  onClose,
}: {
  profile: FoodCharacterProfile;
  open: boolean;
  onClose: () => void;
}) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const hiddenField = String(formData.get("website") || "").trim();

    if (hiddenField) {
      return;
    }

    const fullName = String(formData.get("fullName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const organization = String(formData.get("organization") || "").trim();
    const dateOrTiming = String(formData.get("dateOrTiming") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = `Connection request — ${profile.name}`;

    const body = [
      "Food Theatre connection request",
      "",
      `Character: ${profile.name}`,
      `Category: ${profile.categoryLabel}`,
      `Role: ${profile.role}`,
      `Cuisine / style / format: ${profile.cuisineStyleFormat.join(", ") || "Not provided"}`,
      `Collaboration type: ${profile.collaborationTypes.join(", ") || "Not provided"}`,
      "",
      `Name: ${fullName}`,
      `Email: ${email}`,
      `Cell / WhatsApp: ${phone || "Not provided"}`,
      `Organization / brand / venue: ${organization || "Not provided"}`,
      `Preferred date or timing: ${dateOrTiming || "Not provided"}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
    setSent(true);
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] overflow-y-auto bg-black/42 px-4 py-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Connect with ${profile.name}`}
          onClick={onClose}
        >
          <ModalCloseButton onClose={onClose} label="Close form" />

          <div className="mx-auto flex min-h-full max-w-3xl items-center justify-center py-10">
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.28 }}
              className="relative w-full overflow-hidden rounded-[2rem] border border-black/10 bg-[#fffdf8] p-5 shadow-[0_30px_110px_rgba(0,0,0,0.30)] sm:p-7"
              onClick={(event) => event.stopPropagation()}
            >
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-60"
                style={{ backgroundColor: profile.accentColor }}
              />

              <div className="relative z-10 border-b border-black/10 pb-5 pr-12">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-black/42">
                  Connection request
                </p>
                <h2 className="ft-display mt-3 text-[clamp(2.2rem,6vw,4rem)] leading-[0.95]">
                  Connect with {profile.name}.
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="relative z-10 mt-6">
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  name="website"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid gap-5 md:grid-cols-2">
                  <TextInput
                    id="fullName"
                    name="fullName"
                    label="Name"
                    placeholder="Enter your name"
                    required
                    autoComplete="name"
                    maxLength={90}
                  />

                  <TextInput
                    id="email"
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    required
                    autoComplete="email"
                    maxLength={120}
                  />

                  <TextInput
                    id="phone"
                    name="phone"
                    label="Cell / WhatsApp"
                    placeholder="Enter your number"
                    type="tel"
                    autoComplete="tel"
                    maxLength={40}
                  />

                  <TextInput
                    id="organization"
                    name="organization"
                    label="Organization, brand, or venue"
                    placeholder="Optional"
                    autoComplete="organization"
                    maxLength={120}
                  />

                  <div className="md:col-span-2">
                    <TextInput
                      id="dateOrTiming"
                      name="dateOrTiming"
                      label="Preferred date or timing"
                      placeholder="Example: weekend evening, next month, private dinner"
                      maxLength={140}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FieldLabel htmlFor="message" required>
                      Message
                    </FieldLabel>

                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      maxLength={1200}
                      placeholder={`Tell us how you would like to connect with ${profile.name}`}
                      className="mt-2 w-full resize-none rounded-[1.3rem] border border-black/15 bg-white p-4 text-sm font-semibold leading-7 text-black outline-none transition placeholder:text-black/32 focus:border-[var(--ft-denim)] focus:ring-2 focus:ring-[var(--ft-denim)]/20"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--ft-denim)] px-6 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[var(--ft-pomodori)] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[var(--ft-citrine)] sm:w-auto"
                >
                  Send request
                  <span>→</span>
                </button>

                <p className="mt-4 text-sm font-semibold leading-7 text-black/48">
                  {sent
                    ? "Your email app should open with the request ready to send."
                    : "Fields marked with an asterisk are required."}
                </p>
              </form>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function MenuModal({
  profile,
  open,
  onClose,
}: {
  profile: FoodCharacterProfile;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[90] overflow-y-auto bg-black/50 px-4 py-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${profile.name} menu`}
          onClick={onClose}
        >
          <ModalCloseButton onClose={onClose} label="Close menu" />

          <div className="mx-auto flex min-h-full max-w-5xl items-center justify-center py-10">
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.28 }}
              className="relative w-full"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex justify-center">
                <MenuArtwork profile={profile} large />
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function NotFoundProfile() {
  return (
    <main className="min-h-screen bg-white px-5 py-20">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-black/10 bg-[#fffdf8] p-7 text-center">
        <Image
          src="/brand/foodtheatre-logo.png"
          alt="Food Theatre logo"
          width={120}
          height={120}
          className="mx-auto h-20 w-20 object-contain"
        />

        <h1 className="ft-display mt-6 text-[clamp(2.5rem,7vw,5rem)] leading-[0.95]">
          Character not found.
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base font-semibold leading-8 text-black/62">
          This Food Character profile is not available yet.
        </p>

        <BrandButton href="/food-characters" tone="citrineMenta" className="mt-7">
          Back to Food Characters
          <TextArrow />
        </BrandButton>
      </div>
    </main>
  );
}

export default function FoodCharacterProfilePage() {
  const params = useParams<RouteParams>();
  const category = getParamValue(params.category);
  const slug = getParamValue(params.slug);

  const profile = useMemo(() => {
    return findFoodCharacterProfile(category, slug);
  }, [category, slug]);

  const [connectionOpen, setConnectionOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  if (!profile) {
    return <NotFoundProfile />;
  }

  const socialLinks = [
    { label: "Instagram", href: profile.instagram },
    { label: "Website", href: profile.website },
    { label: "Facebook", href: profile.facebook },
  ].filter((item): item is { label: string; href: string } => Boolean(item.href));

  const hasWorkingFormats =
    profile.cuisineStyleFormat.length > 0 || profile.collaborationTypes.length > 0;

  const hasMenu =
    Boolean(profile.menu.title) ||
    Boolean(profile.menu.subtitle) ||
    profile.menu.sections.length > 0;

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-white">
      <ConnectionModal
        profile={profile}
        open={connectionOpen}
        onClose={() => setConnectionOpen(false)}
      />

      <MenuModal profile={profile} open={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="relative isolate overflow-hidden bg-white py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute left-[-10rem] top-[-8rem] h-[32rem] w-[32rem] rounded-full blur-3xl"
            style={{ backgroundColor: profile.accentSoftColor }}
          />
          <div className="absolute right-[-12rem] top-12 h-[34rem] w-[34rem] rounded-full bg-[var(--ft-blush)]/18 blur-3xl" />
          <div className="absolute bottom-[-16rem] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[var(--ft-menta)]/12 blur-3xl" />
        </div>

        <div className="ft-container">
          <div className="flex flex-wrap items-center gap-4">
            <Image
              src="/brand/foodtheatre-logo.png"
              alt="Food Theatre logo"
              width={120}
              height={120}
              priority
              className="h-20 w-20 object-contain"
            />

            <Link
              href={`/food-characters/${profile.category}`}
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-black/54 transition hover:bg-[var(--ft-citrine)] hover:text-black"
            >
              Food Characters / {profile.categoryLabel}
            </Link>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-end">
            <div>
              <p
                className="text-xs font-black uppercase tracking-[0.24em]"
                style={{ color: profile.accentColor }}
              >
                {profile.role}
              </p>

              <h1 className="ft-display mt-4 max-w-5xl text-[clamp(3.4rem,8vw,8rem)] leading-[0.88] tracking-[0.002em]">
                {profile.name}
              </h1>

              <p
                className="mt-7 max-w-3xl border-l-4 pl-5 text-lg font-semibold leading-9 text-black/72 sm:text-xl sm:leading-10"
                style={{ borderColor: profile.accentColor }}
              >
                {profile.shortIntro}
              </p>

              <ProfileSnapshot profile={profile} />

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ActionButton onClick={() => setConnectionOpen(true)} tone="denimPomodori">
                  Connect with {profile.name}
                  <TextArrow />
                </ActionButton>
              </div>
            </div>

            <CharacterVisual profile={profile} />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#fffdf8] py-16 sm:py-24">
        <div className="ft-container">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionLabel>About the Character</SectionLabel>

              <h2 className="ft-display mt-4 max-w-4xl text-[clamp(2.6rem,5vw,5.2rem)] leading-[1]">
                The person behind the table.
              </h2>

              <p className="mt-7 max-w-2xl text-base font-semibold leading-8 text-black/66 sm:text-lg sm:leading-9">
                {profile.bio}
              </p>

              {socialLinks.length ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-black/10 bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-black transition hover:-translate-y-0.5 hover:bg-[var(--ft-citrine)]"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="grid gap-5">
              {profile.bringsToTable.length ? (
                <div className="rounded-[2rem] border border-black/10 bg-white p-5">
                  <SectionLabel>What {profile.name} brings to the table</SectionLabel>

                  <div className="mt-6 grid gap-3">
                    {profile.bringsToTable.map((item, index) => (
                      <div
                        key={`${profile.id}-brings-${index}`}
                        className="grid gap-4 rounded-[1.4rem] border border-black/10 bg-[#fffdf8] p-4 sm:grid-cols-[54px_1fr] sm:items-start"
                      >
                        <span
                          className="flex h-11 w-11 items-center justify-center rounded-full text-xs font-black text-black"
                          style={{ backgroundColor: profile.accentColor }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <p className="text-sm font-semibold leading-7 text-black/66">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {profile.connectedExperiences.length ? (
                <div className="rounded-[2rem] border border-black/10 bg-white p-5">
                  <SectionLabel>Connected experiences</SectionLabel>

                  <div className="mt-6 grid gap-4">
                    {profile.connectedExperiences.map((experience) => (
                      <div
                        key={experience.id}
                        className="rounded-[1.4rem] border border-black/10 bg-[#fffdf8] p-4"
                      >
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-black/42">
                          {experience.format}
                        </p>
                        <h3 className="ft-display mt-3 text-[clamp(2rem,4vw,3.2rem)] leading-[0.98]">
                          {experience.title}
                        </h3>
                        <p className="mt-3 text-sm font-semibold leading-7 text-black/62">
                          {experience.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {hasWorkingFormats ? (
                <div className="rounded-[2rem] border border-black/10 bg-white p-5">
                  <SectionLabel>Working formats</SectionLabel>

                  <div className="mt-6 grid gap-3">
                    <TagGroup
                      label="Cuisine / Style / Format"
                      items={profile.cuisineStyleFormat}
                      accentColor={profile.accentSoftColor}
                    />

                    <TagGroup
                      label="Collaboration Type"
                      items={profile.collaborationTypes}
                      accentColor="rgba(255, 253, 248, 0.95)"
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {hasMenu ? (
        <section className="bg-white py-16 sm:py-24">
          <div className="ft-container">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <SectionLabel>Character Menu</SectionLabel>

                <h2 className="ft-display mt-4 max-w-4xl text-[clamp(2.6rem,5vw,5.2rem)] leading-[1]">
                  A menu direction for this Food Theatre moment.
                </h2>

                <p className="mt-6 max-w-xl text-base font-semibold leading-8 text-black/62">
                  Explore this Character’s menu direction with dishes, descriptions, prices, and
                  visual details.
                </p>

                <ActionButton
                  onClick={() => setMenuOpen(true)}
                  tone="pomodoriViola"
                  className="mt-8"
                >
                  Open Menu
                  <TextArrow />
                </ActionButton>
              </div>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="block w-full text-left transition duration-300 hover:-translate-y-1 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[var(--ft-citrine)]"
                aria-label={`Open ${profile.name} menu`}
              >
                <MenuArtwork profile={profile} />
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
