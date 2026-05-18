"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";

const media = {
  logo: "/brand/foodtheatre-logo.png",

  aboutHero: "/media/about/about-hero.jpg",
  aboutTable: "/media/about/about-table.jpg",
  aboutCharacter: "/media/about/about-character.jpg",
  aboutStage: "/media/about/about-stage.jpg",
  aboutDiscovery: "/media/about/about-discovery.jpg",
  aboutPrinciples: "/media/about/about-principles.jpg",
  aboutDirection: "/media/about/about-direction.jpg"
};

const platformSignals = [
  { label: "Story-led dining", color: "var(--ft-pomodori)" },
  { label: "Food Characters", color: "var(--ft-menta)" },
  { label: "Hosted tables", color: "var(--ft-citrine)" },
  { label: "Food Stages", color: "var(--ft-denim)" },
  { label: "Theatre locations", color: "var(--ft-viola)" },
  { label: "City discovery", color: "var(--ft-denim)" },
  { label: "Cultural food formats", color: "var(--ft-blush)" },
  { label: "Local makers", color: "var(--ft-menta)" },
  { label: "Calendar discovery", color: "var(--ft-pomodori)" },
  { label: "Shared food moments", color: "var(--ft-viola)" }
];

const pillars = [
  {
    title: "Experiences",
    label: "What guests discover",
    color: "var(--ft-pomodori)",
    image: media.aboutTable,
    buttonTone: "pomodoriViola",
    href: "/#experiences",
    buttonLabel: "Explore experiences",
    text:
      "Curated culinary moments shaped around mood, place, story, season, format, and the people behind the table."
  },
  {
    title: "Food Characters",
    label: "Who brings the story",
    color: "var(--ft-menta)",
    image: media.aboutCharacter,
    buttonTone: "mentaCitrine",
    href: "/food-characters",
    buttonLabel: "Meet Food Characters",
    text:
      "Chefs, artisans, creators, hosts, producers, brands, and food-focused people with a distinctive identity and point of view."
  },
  {
    title: "Theatre",
    label: "Where it comes alive",
    color: "var(--ft-viola)",
    image: media.aboutStage,
    buttonTone: "violaBlush",
    href: "/#theatre",
    buttonLabel: "Discover Theatre",
    text:
      "Locations, stages, hosted spaces, and local settings where food culture becomes something memorable and shared."
  }
] as const;

const principles = [
  {
    title: "Discovery with context",
    text:
      "Every experience can be presented with its mood, maker, place, format, and story, so guests feel the world before they arrive.",
    color: "var(--ft-pomodori)"
  },
  {
    title: "People at the centre",
    text:
      "Food Characters are introduced as creative identities with craft, story, and personality, not as ordinary listings.",
    color: "var(--ft-menta)"
  },
  {
    title: "Places with atmosphere",
    text:
      "Theatre locations and Food Stages give each experience a setting, a memory, and a sense of arrival.",
    color: "var(--ft-viola)"
  },
  {
    title: "A world that grows",
    text:
      "The same ecosystem can expand into profiles, city pages, calendars, editorial stories, hosted formats, and member access.",
    color: "var(--ft-denim)"
  }
];

const journey = [
  {
    step: "01",
    title: "Feel the mood",
    text: "Guests discover the atmosphere, format, timing, city, and story around each food moment."
  },
  {
    step: "02",
    title: "Meet the maker",
    text: "The person, brand, or host behind the experience becomes part of the reason to join."
  },
  {
    step: "03",
    title: "Enter the place",
    text: "The Theatre, Stage, restaurant, home, or hosted space gives the experience its setting."
  },
  {
    step: "04",
    title: "Follow the world",
    text:
      "Guests can return through profiles, calendars, city collections, stories, and future membership layers."
  }
];

const futureLayers = [
  "Character profiles",
  "Experience calendars",
  "City collections",
  "Theatre pages",
  "Food Stage formats",
  "Editorial stories",
  "Membership access",
  "Hosted food moments"
];

type ButtonTone =
  | "denimPomodori"
  | "citrineMenta"
  | "pomodoriViola"
  | "mentaCitrine"
  | "violaBlush"
  | "blushPomodori";

const buttonToneClasses: Record<ButtonTone, string> = {
  denimPomodori:
    "bg-[var(--ft-denim)] text-white hover:bg-[var(--ft-pomodori)] hover:text-white",
  citrineMenta:
    "bg-[var(--ft-citrine)] text-black hover:bg-[var(--ft-menta)] hover:text-white",
  pomodoriViola:
    "bg-[var(--ft-pomodori)] text-white hover:bg-[var(--ft-viola)] hover:text-white",
  mentaCitrine:
    "bg-[var(--ft-menta)] text-white hover:bg-[var(--ft-citrine)] hover:text-black",
  violaBlush:
    "bg-[var(--ft-viola)] text-white hover:bg-[var(--ft-blush)] hover:text-black",
  blushPomodori:
    "bg-[var(--ft-blush)] text-black hover:bg-[var(--ft-pomodori)] hover:text-white"
};

function BrandButton({
  href,
  children,
  tone = "denimPomodori",
  className = ""
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

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-black uppercase tracking-[0.24em] text-black/42">
      {children}
    </p>
  );
}

function SectionIntro({
  label,
  title,
  text
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <Reveal>
      <div className="max-w-6xl">
        <SectionLabel>{label}</SectionLabel>

        <h2 className="ft-display ft-text-balance mt-4 max-w-6xl text-[clamp(2.45rem,4.8vw,5rem)] leading-[1.06] tracking-[0.002em]">
          {title}
        </h2>

        <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-black/64 sm:text-lg sm:leading-9">
          {text}
        </p>
      </div>
    </Reveal>
  );
}

function TextArrow() {
  return <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>;
}

function LocalLogo({ className = "" }: { className?: string }) {
  return (
    <Image
      src={media.logo}
      alt="Food Theatre logo"
      width={180}
      height={180}
      priority
      className={className}
    />
  );
}

function SquarePhoto({
  src,
  alt,
  className = "",
  imageClassName = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw",
  priority = false
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative aspect-square w-full shrink-0 overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${imageClassName}`}
      />
    </div>
  );
}

function PlatformSignalTicker() {
  const tickerItems = [...platformSignals, ...platformSignals];

  return (
    <section
      className="overflow-hidden border-y border-black/10 bg-white py-5"
      aria-label="Food Theatre platform signals"
    >
      <div className="ft-signal-marquee items-center gap-9">
        {tickerItems.map((item, index) => (
          <div key={`${item.label}-${index}`} className="flex shrink-0 items-center gap-9">
            <span
              className="h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: item.color }}
              aria-hidden="true"
            />

            <span className="whitespace-nowrap text-sm font-black uppercase tracking-[0.22em] text-black/58 sm:text-base">
              {item.label}
            </span>

            <span className="h-px w-16 shrink-0 bg-black/14" aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main className="bg-white">
      <section className="relative isolate overflow-hidden bg-white py-16 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-0 -z-20">
          <div className="absolute left-[-10rem] top-[-7rem] h-[30rem] w-[30rem] rounded-full bg-[var(--ft-citrine)]/18 blur-3xl" />
          <div className="absolute right-[-11rem] top-16 h-[32rem] w-[32rem] rounded-full bg-[var(--ft-blush)]/22 blur-3xl" />
          <div className="absolute bottom-[-14rem] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[var(--ft-menta)]/12 blur-3xl" />
        </div>

        <div className="ft-container">
          <Reveal>
            <div className="flex flex-wrap items-center gap-4">
              <LocalLogo className="h-20 w-20 object-contain sm:h-24 sm:w-24" />

              <span className="text-xs font-black uppercase tracking-[0.24em] text-black/58">
                About
              </span>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end xl:grid-cols-[minmax(0,1fr)_390px]">
            <Reveal delay={0.06}>
              <div className="min-w-0">
                <h1 className="ft-display ft-text-balance max-w-6xl text-[clamp(3rem,6.2vw,6.4rem)] leading-[1.02] tracking-[0.002em]">
                  About Food Theatre.
                </h1>

                <p className="mt-8 max-w-3xl border-l-4 border-[var(--ft-pomodori)] pl-5 text-lg font-semibold leading-9 text-black/72 sm:text-xl sm:leading-10">
                  A brand platform for food culture, hosted experiences, creative makers, and
                  places where gastronomy becomes something guests can enter, enjoy, and remember.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <BrandButton href="/#experiences" tone="denimPomodori">
                    Explore experiences
                    <TextArrow />
                  </BrandButton>

                  <BrandButton href="/contact" tone="citrineMenta">
                    Contact us
                    <TextArrow />
                  </BrandButton>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="relative mx-auto w-full max-w-[390px] lg:mx-0">
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-[var(--ft-citrine)]" />
                <div className="absolute -bottom-4 -left-4 h-14 w-14 rounded-full bg-[var(--ft-pomodori)]" />

                <SquarePhoto
                  src={media.aboutHero}
                  alt="Food Theatre shared food experience"
                  className="relative rounded-[2rem] border border-black/10 ft-immersive-shadow"
                  imageClassName="scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 390px"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <PlatformSignalTicker />

      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        <div className="ft-container">
          <SectionIntro
            label="The idea"
            title="Food stories come alive here."
            text="Food Theatre gives every experience a richer frame: the person behind it, the atmosphere around it, the setting that holds it, and the story guests remember."
          />

          <div className="mt-16 space-y-14">
            {pillars.map((item, index) => {
              const isReversed = index % 2 === 1;

              return (
                <Reveal key={item.title} delay={index * 0.06}>
                  <motion.article
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 240, damping: 26 }}
                    className={`grid gap-8 border-y border-black/10 py-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center xl:grid-cols-[minmax(0,1fr)_360px] ${
                      isReversed ? "lg:grid-flow-dense" : ""
                    }`}
                  >
                    <SquarePhoto
                      src={item.image}
                      alt={`${item.title} in Food Theatre`}
                      className={`mx-auto max-w-[380px] rounded-[2rem] border border-black/10 ft-photo-polish lg:mx-0 ${
                        isReversed ? "lg:col-start-2" : ""
                      }`}
                      sizes="(max-width: 1024px) 100vw, 360px"
                    />

                    <div className={`min-w-0 ${isReversed ? "lg:col-start-1" : ""}`}>
                      <div className="flex items-center gap-4">
                        <span
                          className="h-5 w-5 shrink-0 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />

                        <p className="text-xs font-black uppercase tracking-[0.22em] text-black/42">
                          {item.label}
                        </p>
                      </div>

                      <h3 className="ft-display ft-text-balance mt-5 max-w-5xl text-[clamp(2.55rem,4.3vw,4.6rem)] leading-[1.06] tracking-[0.002em]">
                        {item.title}
                      </h3>

                      <p className="mt-7 max-w-3xl text-lg font-semibold leading-9 text-black/66 sm:text-xl sm:leading-10">
                        {item.text}
                      </p>

                      <BrandButton href={item.href} tone={item.buttonTone} className="mt-8">
                        {item.buttonLabel}
                        <TextArrow />
                      </BrandButton>
                    </div>
                  </motion.article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#fffdf8] py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0 ft-brand-grid opacity-55" />

        <div className="ft-container relative">
          <SectionIntro
            label="Platform journey"
            title="From curiosity to a memorable table."
            text="The experience begins before booking. Guests move from atmosphere to context, from context to character, and from character to place."
          />

          <div className="mt-16 grid gap-10 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start xl:grid-cols-[380px_minmax(0,1fr)]">
            <Reveal delay={0.05}>
              <SquarePhoto
                src={media.aboutDiscovery}
                alt="Food Theatre discovery moment"
                className="mx-auto max-w-[380px] rounded-[2rem] border border-black/10 ft-immersive-shadow lg:sticky lg:top-28 lg:mx-0"
                sizes="(max-width: 1024px) 100vw, 380px"
              />
            </Reveal>

            <div className="border-y border-black/10">
              {journey.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.05}>
                  <motion.div
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 240, damping: 24 }}
                    className="grid gap-5 border-b border-black/10 py-8 last:border-b-0 sm:grid-cols-[88px_1fr]"
                  >
                    <div className="flex items-center gap-4 sm:block">
                      <span className="ft-display block text-5xl leading-none text-black/20">
                        {item.step}
                      </span>

                      <span
                        className="mt-4 block h-5 w-5 shrink-0 rounded-full"
                        style={{ backgroundColor: platformSignals[index + 1].color }}
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className="ft-display ft-text-balance max-w-4xl text-[clamp(2rem,4vw,4rem)] leading-[1.06]">
                        {item.title}
                      </h3>

                      <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-black/62 sm:text-lg sm:leading-9">
                        {item.text}
                      </p>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-white py-16 sm:py-24">
        <div className="ft-container">
          <SectionIntro
            label="Brand position"
            title="A more thoughtful way to discover food culture."
            text="Food Theatre is designed for meaningful discovery, warm storytelling, and memorable food moments, while staying structured enough to grow into a real platform."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start xl:grid-cols-[380px_minmax(0,1fr)]">
            <Reveal delay={0.05}>
              <SquarePhoto
                src={media.aboutPrinciples}
                alt="Food Theatre brand principles"
                className="mx-auto max-w-[380px] rounded-[2rem] border border-black/10 ft-immersive-shadow lg:mx-0"
                sizes="(max-width: 1024px) 100vw, 380px"
              />
            </Reveal>

            <div className="border-y border-black/10">
              {principles.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.05}>
                  <motion.div
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 240, damping: 24 }}
                    className="border-b border-black/10 py-7 last:border-b-0"
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className="mt-2 h-5 w-5 shrink-0 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />

                      <h3 className="ft-display ft-text-balance max-w-4xl text-[clamp(2rem,3.8vw,3.9rem)] leading-[1.06]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-black/62">
                      {item.text}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        <div className="ft-container">
          <Reveal>
            <div className="mx-auto max-w-5xl text-center">
              <SectionLabel>Platform direction</SectionLabel>

              <h2 className="ft-display ft-text-balance mx-auto mt-4 max-w-5xl text-[clamp(2.45rem,4.8vw,5rem)] leading-[1.06] tracking-[0.002em]">
                A food culture platform designed to grow without losing its soul.
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-base font-semibold leading-8 text-black/64 sm:text-lg sm:leading-9">
                Food Theatre can expand into profiles, calendars, city collections, theatre pages,
                editorial stories, memberships, and hosted formats while keeping one recognizable
                world: warm, cultural, social, and experience-led.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mx-auto mt-12 max-w-5xl">
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 250, damping: 28 }}
                className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-[var(--ft-citrine)] p-5 sm:p-6 lg:p-8"
              >
                <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/34" />
                <div className="pointer-events-none absolute bottom-4 left-1/2 h-8 w-8 rounded-full bg-[var(--ft-pomodori)]/70" />
                <div className="pointer-events-none absolute -bottom-20 -left-12 h-44 w-44 rounded-full bg-[var(--ft-blush)]/28" />

                <div className="relative grid gap-7 md:grid-cols-[1fr_auto] md:items-center">
                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-black/48">
                      Growth direction
                    </p>

                    <h3 className="ft-display ft-text-balance mt-3 max-w-3xl text-[clamp(2.1rem,4vw,4rem)] leading-[1] tracking-[0.002em]">
                      A place where food culture can be discovered properly.
                    </h3>

                    <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-black/64 sm:text-base sm:leading-8">
                      The platform can grow layer by layer, from memorable experiences to Character
                      profiles, Theatre pages, city discovery, editorial stories, and future
                      membership access.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {futureLayers.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-black/12 bg-white/38 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-black/64"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 md:justify-self-end">
                    <BrandButton href="/#experiences" tone="denimPomodori">
                      Explore experiences
                      <TextArrow />
                    </BrandButton>

                    <BrandButton href="/contact" tone="blushPomodori">
                      Contact us
                      <TextArrow />
                    </BrandButton>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
