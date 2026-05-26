"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "next/navigation";
import { createPortal } from "react-dom";
import { type FormEvent, type ReactNode, useEffect, useState } from "react";
import {
  type FoodCharacterMenuItem,
  type FoodCharacterMenuSection,
  type FoodCharacterProfile,
} from "@/lib/food-character-profiles";
import { findFoodCharacterProfileFromSanity } from "@/lib/sanity/food-character-profiles";

const CONTACT_EMAIL = "hello@foodtheatre.com";

const socialIconPaths: Record<string, string> = {
  Instagram: "/social/instagram.png",
  Facebook: "/social/facebook.png",
};

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

function ModalPortal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(children, document.body);
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
      className="fixed right-4 top-4 z-[2147483647] flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white text-3xl font-black leading-none text-black shadow-[0_18px_46px_rgba(0,0,0,0.28)] transition hover:bg-[var(--ft-citrine)] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[var(--ft-citrine)]"
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
  const homeBaseText = profile.city
    ? `${profile.city} is the starting point for this Food Character’s table, story, and guest experience.`
    : "A starting point for this Food Character’s table, story, and guest experience.";

  const items = [
    {
      label: "Home base",
      title: profile.location,
      text: homeBaseText,
    },
    {
      label: "Availability",
      title: "Selected moments",
      text: profile.availability,
    },
    {
      label: "Travel",
      title: "Travel-ready",
      text: profile.relocation,
    },
  ].filter((item) => item.title || item.text);

  if (!items.length) {
    return null;
  }

  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-3">
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

          {profile.role ? (
            <p className="mt-3 text-sm font-semibold text-black/58">{profile.role}</p>
          ) : null}

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

function SocialLinkButton({ label, href }: { label: string; href: string }) {
  const iconPath = socialIconPaths[label];

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-black transition hover:-translate-y-0.5 hover:bg-[var(--ft-citrine)]"
    >
      {iconPath ? (
        <Image
          src={iconPath}
          alt=""
          width={16}
          height={16}
          aria-hidden="true"
          className="h-4 w-4 shrink-0 object-contain"
        />
      ) : null}
      <span>{label}</span>
    </a>
  );
}

function MenuItemCard({ item }: { item: FoodCharacterMenuItem }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[1.45rem] border border-black/10 bg-white/92 p-3 shadow-[0_12px_36px_rgba(17,17,17,0.05)]">
      {item.image ? (
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.15rem] bg-[#fffdf8]">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 320px"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-[4/3] items-center justify-center rounded-[1.15rem] bg-[#fffdf8]">
          <span className="text-[0.62rem] font-black uppercase tracking-[0.16em] text-black/32">
            Food moment
          </span>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col pt-4">
        <div className="flex items-start justify-between gap-3">
          <h5 className="text-base font-black leading-tight text-black">{item.name}</h5>

          {item.price ? (
            <span className="shrink-0 rounded-full bg-black px-3 py-1.5 text-xs font-black text-white">
              {item.price}
            </span>
          ) : null}
        </div>

        {item.description ? (
          <p className="mt-2 text-sm font-semibold leading-6 text-black/62">
            {item.description}
          </p>
        ) : null}

        {item.dietaryTags?.length ? (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
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

function MenuPreviewCard({
  profile,
  onOpen,
}: {
  profile: FoodCharacterProfile;
  onOpen: () => void;
}) {
  const sections = profile.menu.sections;
  const totalItems = sections.reduce((count, section) => count + section.items.length, 0);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="block w-full text-left transition duration-300 hover:-translate-y-1 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[var(--ft-citrine)]"
      aria-label={`Open ${profile.name} menu`}
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-[#fffdf8] p-5 shadow-[0_24px_80px_rgba(17,17,17,0.10)]">
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
                Menu preview
              </p>

              {profile.menu.title ? (
                <h3 className="ft-display mt-3 max-w-xl text-[clamp(2.35rem,6vw,4.6rem)] leading-[0.92] tracking-[0.002em]">
                  {profile.menu.title}
                </h3>
              ) : (
                <h3 className="ft-display mt-3 max-w-xl text-[clamp(2.35rem,6vw,4.6rem)] leading-[0.92] tracking-[0.002em]">
                  Taste story
                </h3>
              )}

              <p className="mt-3 text-sm font-black uppercase tracking-[0.16em] text-black/52">
                By {profile.name}
                {profile.role ? ` · ${profile.role}` : ""}
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

          {profile.menu.subtitle ? (
            <p className="mt-5 max-w-2xl rounded-[1.5rem] border border-black/10 bg-white/80 p-4 text-sm font-semibold leading-7 text-black/66 backdrop-blur-md">
              {profile.menu.subtitle}
            </p>
          ) : null}

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.35rem] border border-black/10 bg-white/80 p-4 backdrop-blur-md">
              <p className="text-[0.66rem] font-black uppercase tracking-[0.18em] text-black/36">
                Sections
              </p>
              <p className="mt-2 text-2xl font-black text-black">{sections.length}</p>
            </div>

            <div className="rounded-[1.35rem] border border-black/10 bg-white/80 p-4 backdrop-blur-md">
              <p className="text-[0.66rem] font-black uppercase tracking-[0.18em] text-black/36">
                Dishes
              </p>
              <p className="mt-2 text-2xl font-black text-black">{totalItems}</p>
            </div>

            <div className="rounded-[1.35rem] border border-black/10 bg-white/80 p-4 backdrop-blur-md">
              <p className="text-[0.66rem] font-black uppercase tracking-[0.18em] text-black/36">
                Currency
              </p>
              <p className="mt-2 text-2xl font-black text-black">
                {profile.menu.currency || "—"}
              </p>
            </div>
          </div>

          {sections.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {sections.map((section, index) => (
                <span
                  key={section.id}
                  className="rounded-full border border-black/10 bg-white/88 px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.11em] text-black/58"
                >
                  {String(index + 1).padStart(2, "0")} · {section.title}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-black text-white">
            Open full menu
            <TextArrow />
          </div>
        </div>
      </div>
    </button>
  );
}

function MenuSliderArtwork({ profile }: { profile: FoodCharacterProfile }) {
  const sections = profile.menu.sections;
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  useEffect(() => {
    setActiveSectionIndex(0);
  }, [profile.id]);

  const activeSection = sections[activeSectionIndex];

  const goToPreviousSection = () => {
    setActiveSectionIndex((currentIndex) =>
      currentIndex === 0 ? sections.length - 1 : currentIndex - 1
    );
  };

  const goToNextSection = () => {
    setActiveSectionIndex((currentIndex) =>
      currentIndex === sections.length - 1 ? 0 : currentIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-7xl overflow-hidden rounded-[2rem] border border-black/10 bg-[#fffdf8] p-4 shadow-[0_24px_80px_rgba(17,17,17,0.10)] sm:p-5 lg:p-6">
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
              Full menu
            </p>

            <h3 className="ft-display mt-3 max-w-3xl text-[clamp(2.35rem,6vw,4.8rem)] leading-[0.92] tracking-[0.002em]">
              {profile.menu.title || "Taste story"}
            </h3>

            <p className="mt-3 text-sm font-black uppercase tracking-[0.16em] text-black/52">
              By {profile.name}
              {profile.role ? ` · ${profile.role}` : ""}
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

        {profile.menu.subtitle || profile.menu.currency ? (
          <div className="mt-5 rounded-[1.5rem] border border-black/10 bg-white/80 p-4 backdrop-blur-md">
            {profile.menu.subtitle ? (
              <p className="max-w-3xl text-sm font-semibold leading-7 text-black/66">
                {profile.menu.subtitle}
              </p>
            ) : null}

            {profile.menu.currency ? (
              <p className="mt-3 text-[0.68rem] font-black uppercase tracking-[0.18em] text-black/38">
                Prices in {profile.menu.currency}
              </p>
            ) : null}
          </div>
        ) : null}

        {sections.length ? (
          <>
            <div className="mt-6 flex flex-wrap gap-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSectionIndex(index)}
                  className={`rounded-full border px-4 py-2 text-[0.7rem] font-black uppercase tracking-[0.13em] transition ${
                    index === activeSectionIndex
                      ? "border-black bg-black text-white"
                      : "border-black/10 bg-white/86 text-black/54 hover:bg-[var(--ft-citrine)] hover:text-black"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")} · {section.title}
                </button>
              ))}
            </div>

            <div className="mt-7 rounded-[1.7rem] border border-black/10 bg-white/58 p-4 backdrop-blur-md sm:p-5">
              <div className="flex flex-col gap-4 border-b border-black/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-black/38">
                    Menu set {String(activeSectionIndex + 1).padStart(2, "0")} of{" "}
                    {String(sections.length).padStart(2, "0")}
                  </p>

                  <h4 className="ft-display mt-2 text-[clamp(2rem,4.4vw,4.2rem)] leading-[0.95]">
                    {activeSection?.title}
                  </h4>
                </div>

                {sections.length > 1 ? (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={goToPreviousSection}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-xl font-black text-black transition hover:bg-[var(--ft-citrine)]"
                      aria-label="Previous menu section"
                    >
                      ←
                    </button>

                    <button
                      type="button"
                      onClick={goToNextSection}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-xl font-black text-black transition hover:bg-[var(--ft-citrine)]"
                      aria-label="Next menu section"
                    >
                      →
                    </button>
                  </div>
                ) : null}
              </div>

              {activeSection?.items.length ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection.id}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -18 }}
                    transition={{ duration: 0.24 }}
                    className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
                  >
                    {activeSection.items.map((item) => (
                      <MenuItemCard key={item.id} item={item} />
                    ))}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <p className="mt-5 text-sm font-semibold leading-7 text-black/58">
                  This menu set is being shaped for the next Food Theatre moment.
                </p>
              )}
            </div>
          </>
        ) : profile.menu.note ? (
          <div className="mt-7 rounded-[1.6rem] border border-black/10 bg-white/76 p-5">
            <p className="text-sm font-semibold leading-7 text-black/58">
              {profile.menu.note}
            </p>
          </div>
        ) : null}

        {profile.menu.note && sections.length ? (
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

    const subject = `Food Theatre request — ${profile.name}`;

    const body = [
      "Food Theatre table request",
      "",
      `Food Character: ${profile.name}`,
      `Category: ${profile.categoryLabel}`,
      `Role: ${profile.role}`,
      `Taste, style, and format: ${profile.cuisineStyleFormat.join(", ") || "Not provided"}`,
      `Ways to experience it: ${profile.collaborationTypes.join(", ") || "Not provided"}`,
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
    <ModalPortal>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[2147483646] overflow-y-auto overscroll-contain bg-black/72 px-4 py-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Connect with ${profile.name}`}
            onClick={onClose}
          >
            <ModalCloseButton onClose={onClose} label="Close form" />

            <div className="mx-auto flex min-h-dvh max-w-3xl items-center justify-center py-14">
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
                    Plan a food moment
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
                    Send my request
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
    </ModalPortal>
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
    <ModalPortal>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[2147483646] overflow-y-auto overscroll-contain bg-black/76 px-4 py-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${profile.name} menu`}
            onClick={onClose}
          >
            <ModalCloseButton onClose={onClose} label="Close menu" />

            <div className="mx-auto flex min-h-dvh max-w-7xl items-center justify-center py-14">
              <motion.div
                initial={{ opacity: 0, y: 22, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: 0.28 }}
                className="relative w-full"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex justify-center">
                  <MenuSliderArtwork profile={profile} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ModalPortal>
  );
}

function LoadingProfile() {
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
          Preparing this food story.
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base font-semibold leading-8 text-black/62">
          We’re setting the table for this Food Theatre experience.
        </p>
      </div>
    </main>
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
          This food story is being curated.
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base font-semibold leading-8 text-black/62">
          This Food Character experience is not ready to explore yet. Discover the wider character
          world while this table comes together.
        </p>

        <BrandButton href="/food-characters" tone="citrineMenta" className="mt-7">
          Explore Food Characters
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

  const [profile, setProfile] = useState<FoodCharacterProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [connectionOpen, setConnectionOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      if (!category || !slug) {
        setProfile(null);
        setLoadingProfile(false);
        return;
      }

      setLoadingProfile(true);
      setProfile(null);

      try {
        const sanityProfile = await findFoodCharacterProfileFromSanity(category, slug);

        if (!cancelled) {
          setProfile(sanityProfile);
          setLoadingProfile(false);
        }
      } catch (error) {
        console.error("Food character fetch failed:", error);

        if (!cancelled) {
          setProfile(null);
          setLoadingProfile(false);
        }
      }
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [category, slug]);

  useEffect(() => {
    if (!connectionOpen && !menuOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [connectionOpen, menuOpen]);

  if (loadingProfile && !profile) {
    return <LoadingProfile />;
  }

  if (!profile) {
    return <NotFoundProfile />;
  }

  const socialLinks = [
    { label: "Instagram", href: profile.instagram },
    { label: "Website", href: profile.website },
    { label: "Facebook", href: profile.facebook },
  ].filter((item): item is { label: string; href: string } => Boolean(item.href));

  const hasExperienceFormats =
    profile.cuisineStyleFormat.length > 0 || profile.collaborationTypes.length > 0;

  const hasRealMenuSection = profile.menu.sections.some(
    (section: FoodCharacterMenuSection) => section.title || section.items.length > 0
  );

  const hasMenu =
    Boolean(profile.menu.subtitle) ||
    Boolean(profile.menu.note) ||
    hasRealMenuSection;

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
              {profile.role ? (
                <p
                  className="text-xs font-black uppercase tracking-[0.24em]"
                  style={{ color: profile.accentColor }}
                >
                  {profile.role}
                </p>
              ) : null}

              <h1 className="ft-display mt-4 max-w-5xl text-[clamp(3.4rem,8vw,8rem)] leading-[0.88] tracking-[0.002em]">
                {profile.name}
              </h1>

              {profile.shortIntro ? (
                <p
                  className="mt-7 max-w-3xl border-l-4 pl-5 text-lg font-semibold leading-9 text-black/72 sm:text-xl sm:leading-10"
                  style={{ borderColor: profile.accentColor }}
                >
                  {profile.shortIntro}
                </p>
              ) : null}

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
              <SectionLabel>Meet the food voice</SectionLabel>

              <h2 className="ft-display mt-4 max-w-4xl text-[clamp(2.6rem,5vw,5.2rem)] leading-[1]">
                The person behind the table.
              </h2>

              {profile.bio ? (
                <p className="mt-7 max-w-2xl text-base font-semibold leading-8 text-black/66 sm:text-lg sm:leading-9">
                  {profile.bio}
                </p>
              ) : null}

              {socialLinks.length ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <SocialLinkButton key={link.label} label={link.label} href={link.href} />
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
                  <SectionLabel>Experiences with {profile.name}</SectionLabel>

                  <div className="mt-6 grid gap-4">
                    {profile.connectedExperiences.map((experience) => (
                      <div
                        key={experience.id}
                        className="rounded-[1.4rem] border border-black/10 bg-[#fffdf8] p-4"
                      >
                        {experience.format ? (
                          <p className="text-xs font-black uppercase tracking-[0.18em] text-black/42">
                            {experience.format}
                          </p>
                        ) : null}

                        {experience.title ? (
                          <h3 className="ft-display mt-3 text-[clamp(2rem,4vw,3.2rem)] leading-[0.98]">
                            {experience.title}
                          </h3>
                        ) : null}

                        {experience.description ? (
                          <p className="mt-3 text-sm font-semibold leading-7 text-black/62">
                            {experience.description}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {hasExperienceFormats ? (
                <div className="rounded-[2rem] border border-black/10 bg-white p-5">
                  <SectionLabel>Ways to experience this table</SectionLabel>

                  <div className="mt-6 grid gap-3">
                    <TagGroup
                      label="Taste, style, and format"
                      items={profile.cuisineStyleFormat}
                      accentColor={profile.accentSoftColor}
                    />

                    <TagGroup
                      label="Guest formats"
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
                <SectionLabel>Taste the menu</SectionLabel>

                <h2 className="ft-display mt-4 max-w-4xl text-[clamp(2.6rem,5vw,5.2rem)] leading-[1]">
                  A taste direction for this Food Theatre moment.
                </h2>

                <p className="mt-6 max-w-xl text-base font-semibold leading-8 text-black/62">
                  Explore this table’s dishes, descriptions, prices, and visual details before
                  planning your Food Theatre moment.
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

              <MenuPreviewCard profile={profile} onOpen={() => setMenuOpen(true)} />
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
