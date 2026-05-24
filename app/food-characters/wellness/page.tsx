"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useMemo, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { GradientBackground } from "@/components/ui/paper-design-shader-background";
import { Typewriter } from "@/components/ui/typewriter";

const media = {
  logo: "/brand/foodtheatre-logo.png",

  wellnessHero: "/media/home/character-wellness.jpg",
  guestJourney: "/media/food-characters/3-photo.jpg",

  avaLumi: "/media/food-characters/wellness/ava-lumi.jpg",
  noahVale: "/media/food-characters/wellness/noah-vale.jpg",
  mayaRen: "/media/food-characters/wellness/maya-ren.jpg",
};

type ButtonTone =
  | "denimPomodori"
  | "citrineMenta"
  | "pomodoriViola"
  | "mentaCitrine"
  | "violaBlush"
  | "blushDenim";

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
  blushDenim:
    "bg-[var(--ft-blush)] text-black hover:bg-[var(--ft-denim)] hover:text-white",
};

const heroTypewriterWords = [
  "Fresh Tables.",
  "Balanced Food.",
  "Seasonal Moments.",
  "Feel-Good Dining.",
];

const heroLetterColors = [
  "var(--ft-menta)",
  "var(--ft-citrine)",
  "var(--ft-denim)",
  "var(--ft-blush)",
  "var(--ft-pomodori)",
  "var(--ft-viola)",
];

const wellnessSignals = [
  { label: "Fresh Food Moments", color: "var(--ft-menta)" },
  { label: "Seasonal Tables", color: "var(--ft-citrine)" },
  { label: "Plant-Forward Menus", color: "var(--ft-denim)" },
  { label: "Balanced Flavour", color: "var(--ft-blush)" },
  { label: "Bright Morning Tables", color: "var(--ft-pomodori)" },
  { label: "Feel-Good Hosting", color: "var(--ft-viola)" },
  { label: "Natural Ingredients", color: "var(--ft-menta)" },
  { label: "Memorable Wellness Food", color: "var(--ft-citrine)" },
];

const featuredWellnessCharacters = [
  {
    name: "Ava Lumi",
    role: "Seasonal Food Host",
    city: "Copenhagen",
    image: media.avaLumi,
    accent: "var(--ft-menta)",
    headline: "A fresh seasonal table built around colour, balance, and generous flavour.",
    format: "Seasonal Table",
    mood: "Fresh · Calm · Uplifting",
    experience: "Made for guests who want food that feels light, beautiful, social, and satisfying.",
  },
  {
    name: "Noah Vale",
    role: "Plant-Forward Cook",
    city: "Amsterdam",
    image: media.noahVale,
    accent: "var(--ft-citrine)",
    headline: "Plant-forward food presented with warmth, craft, and strong table energy.",
    format: "Plant Table",
    mood: "Bright · Modern · Ingredient-Led",
    experience: "A clear, flavour-first experience for guests who enjoy vegetables, grains, herbs, and creative plates.",
  },
  {
    name: "Maya Ren",
    role: "Breakfast Experience Host",
    city: "Vienna",
    image: media.mayaRen,
    accent: "var(--ft-denim)",
    headline: "A morning food moment shaped around rhythm, freshness, and easy conversation.",
    format: "Morning Table",
    mood: "Gentle · Social · Refreshing",
    experience: "Built for guests looking for a welcoming start, thoughtful food, and a table worth sharing.",
  },
] as const;

const guestPath = [
  {
    step: "01",
    title: "Find the Feeling",
    text: "Discover food moments with freshness, balance, colour, and a clear guest mood.",
    color: "var(--ft-menta)",
  },
  {
    step: "02",
    title: "Meet the Host",
    text: "Connect with the Character shaping the ingredients, the table, and the atmosphere.",
    color: "var(--ft-citrine)",
  },
  {
    step: "03",
    title: "Join the Table",
    text: "Choose a breakfast, tasting, workshop, or fresh food moment that fits your day.",
    color: "var(--ft-denim)",
  },
];

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
  tone,
  onClick,
}: {
  children: ReactNode;
  tone: ButtonTone;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex w-fit items-center justify-center gap-2 rounded-full border border-black/10 px-6 py-4 text-sm font-black transition duration-300 hover:-translate-y-0.5 hover:border-black/20 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[var(--ft-citrine)] ${buttonToneClasses[tone]}`}
    >
      {children}
    </button>
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
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <Reveal>
      <div className="grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_0.75fr] lg:items-end">
        <div>
          <SectionLabel>{label}</SectionLabel>

          <h2 className="ft-display ft-text-balance mt-4 max-w-5xl text-[clamp(2.45rem,4.8vw,5rem)] leading-[1.04] tracking-[0.002em]">
            {title}
          </h2>
        </div>

        <p className="max-w-2xl text-base font-semibold leading-8 text-black/64 sm:text-lg sm:leading-9 lg:justify-self-end">
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
  priority = false,
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

function WellnessSignalTicker() {
  const tickerItems = [...wellnessSignals, ...wellnessSignals];

  return (
    <section
      className="relative overflow-hidden border-y border-black/10 bg-white py-5"
      aria-label="Wellness food experience signals"
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

function WellnessHero() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10rem] top-[-7rem] h-[30rem] w-[30rem] rounded-full bg-[var(--ft-menta)]/22 blur-3xl" />
        <div className="absolute right-[-11rem] top-16 h-[32rem] w-[32rem] rounded-full bg-[var(--ft-citrine)]/14 blur-3xl" />
        <div className="absolute bottom-[-14rem] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[var(--ft-blush)]/18 blur-3xl" />
      </div>

      <div className="ft-container">
        <Reveal>
          <div className="flex flex-wrap items-center gap-4">
            <LocalLogo className="h-20 w-20 object-contain sm:h-24 sm:w-24" />

            <span className="text-xs font-black uppercase tracking-[0.24em] text-black/58">
              Food Characters / Wellness
            </span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end xl:grid-cols-[minmax(0,1fr)_390px]">
          <Reveal delay={0.06}>
            <div className="min-w-0">
              <h1 className="ft-display ft-text-balance max-w-6xl text-[clamp(3rem,6.2vw,6.4rem)] leading-[1.02] tracking-[0.002em]">
                <span>Wellness Characters Create </span>
                <span className="inline-block min-h-[1.05em] min-w-[13.5ch] align-baseline sm:min-w-[14.5ch]">
                  <Typewriter
                    text={heroTypewriterWords}
                    speed={32}
                    initialDelay={160}
                    waitTime={850}
                    deleteSpeed={17}
                    showCursor={false}
                    colorizeLetters
                    letterColors={heroLetterColors}
                    className="inline-block !whitespace-nowrap"
                  />
                </span>
              </h1>

              <p className="mt-8 max-w-3xl border-l-4 border-[var(--ft-menta)] pl-5 text-lg font-semibold leading-9 text-black/72 sm:text-xl sm:leading-10">
                Discover Food Characters turning fresh ingredients, balanced flavour, and thoughtful
                hosting into feel-good food moments guests can enjoy and remember.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <BrandButton href="#featured-wellness" tone="mentaCitrine">
                  Meet Wellness Characters
                  <TextArrow />
                </BrandButton>

                <BrandButton href="/#experiences" tone="denimPomodori">
                  Explore Experiences
                  <TextArrow />
                </BrandButton>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative mx-auto w-full max-w-[390px] lg:mx-0">
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-[var(--ft-citrine)]" />
              <div className="absolute -bottom-4 -left-4 h-14 w-14 rounded-full bg-[var(--ft-menta)]" />

              <SquarePhoto
                src={media.wellnessHero}
                alt="Wellness Food Character preparing a fresh food moment"
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
  );
}

function FeaturedWellnessCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCharacter = featuredWellnessCharacters[activeIndex];

  const activeLabel = useMemo(
    () => `${activeCharacter.name}, ${activeCharacter.role}`,
    [activeCharacter]
  );

  const showPrevious = () => {
    setActiveIndex(
      (currentIndex) =>
        (currentIndex - 1 + featuredWellnessCharacters.length) %
        featuredWellnessCharacters.length
    );
  };

  const showNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % featuredWellnessCharacters.length);
  };

  return (
    <section
      id="featured-wellness"
      className="relative isolate overflow-hidden bg-[#fffdf8] py-16 sm:py-24"
    >
      <div className="ft-container relative">
        <SectionIntro
          label="Featured Wellness Characters"
          title="Fresh Food Moments With Real Table Appeal."
          text="Meet the Characters turning seasonal ingredients, balanced plates, and welcoming hosting into Food Theatre experiences."
        />

        <Reveal delay={0.08}>
          <div className="relative isolate mt-14 overflow-hidden rounded-[2.5rem] border border-black/10 bg-white/62 shadow-[0_30px_90px_rgba(17,17,17,0.12)] backdrop-blur-xl">
            <GradientBackground />

            <div className="absolute inset-0 z-0 bg-white/30" />

            <div className="relative z-10 grid gap-0 lg:grid-cols-[minmax(320px,460px)_minmax(0,1fr)]">
              <div className="relative p-5 sm:p-6 lg:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCharacter.name}
                    initial={{ opacity: 0, scale: 0.985, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.015, y: -8 }}
                    transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <SquarePhoto
                      src={activeCharacter.image}
                      alt={`${activeCharacter.name}, ${activeCharacter.role}`}
                      className="rounded-[2rem] border border-black/10 bg-white shadow-[0_24px_70px_rgba(17,17,17,0.14)]"
                      imageClassName="scale-[1.018]"
                      sizes="(max-width: 1024px) 100vw, 460px"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <div className="flex gap-2">
                    {featuredWellnessCharacters.map((character, index) => (
                      <button
                        key={character.name}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          activeIndex === index
                            ? "w-10 bg-[var(--ft-menta)]"
                            : "w-2.5 bg-black/18 hover:bg-black/38"
                        }`}
                        aria-label={`Show ${character.name}`}
                      />
                    ))}
                  </div>

                  <p className="rounded-full border border-black/10 bg-white/74 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-black/42 backdrop-blur-md">
                    {activeIndex + 1} / {featuredWellnessCharacters.length}
                  </p>
                </div>
              </div>

              <div className="relative flex min-h-[500px] flex-col justify-between p-6 sm:p-8 lg:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLabel}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.28 }}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className="h-3.5 w-3.5 shrink-0 rounded-full"
                        style={{ backgroundColor: activeCharacter.accent }}
                      />

                      <p className="text-xs font-black uppercase tracking-[0.22em] text-black/42">
                        {activeCharacter.role}
                      </p>

                      <span className="h-px w-8 bg-black/14" />

                      <p className="text-xs font-black uppercase tracking-[0.22em] text-black/42">
                        {activeCharacter.format}
                      </p>
                    </div>

                    <h3 className="ft-display ft-text-balance mt-7 max-w-5xl text-[clamp(3rem,6vw,6.25rem)] leading-[0.96] tracking-[0.002em] text-black">
                      {activeCharacter.name}
                    </h3>

                    <p className="mt-7 max-w-3xl text-xl font-black leading-9 text-black/78 sm:text-2xl sm:leading-10">
                      {activeCharacter.headline}
                    </p>

                    <div className="mt-8 grid gap-4 border-y border-black/10 py-6 md:grid-cols-2">
                      <div className="rounded-[1.5rem] border border-black/10 bg-white/74 p-4 backdrop-blur-md">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-black/34">
                          Guest Feeling
                        </p>

                        <p className="mt-2 text-sm font-semibold leading-7 text-black/68 sm:text-base">
                          {activeCharacter.mood}
                        </p>
                      </div>

                      <div className="rounded-[1.5rem] border border-black/10 bg-white/74 p-4 backdrop-blur-md">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-black/34">
                          Why It Stands Out
                        </p>

                        <p className="mt-2 text-sm font-semibold leading-7 text-black/68 sm:text-base">
                          {activeCharacter.experience}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-10 flex flex-col gap-3 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-3">
                    <ActionButton onClick={showPrevious} tone="denimPomodori">
                      Previous
                    </ActionButton>

                    <ActionButton onClick={showNext} tone="citrineMenta">
                      Next
                    </ActionButton>
                  </div>

                  <BrandButton href="/#experiences" tone="violaBlush">
                    Find Experiences
                    <TextArrow />
                  </BrandButton>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function GuestPath() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-10rem] top-10 h-[28rem] w-[28rem] rounded-full bg-[var(--ft-menta)]/12 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-[-8rem] h-[30rem] w-[30rem] rounded-full bg-[var(--ft-citrine)]/10 blur-3xl" />
      </div>

      <div className="ft-container">
        <SectionIntro
          label="Guest Journey"
          title="From Fresh Curiosity to a Feel-Good Table."
          text="Guests quickly understand the mood, meet the host, and move toward a food moment that feels fresh, social, and easy to enjoy."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,0.94fr)_minmax(320px,440px)] lg:items-center">
          <Reveal delay={0.05}>
            <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_20px_70px_rgba(17,17,17,0.06)]">
              {guestPath.map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 240, damping: 24 }}
                  className="grid gap-5 border-b border-black/10 px-5 py-8 last:border-b-0 sm:grid-cols-[88px_1fr] sm:px-7"
                >
                  <div className="flex items-center gap-4 sm:block">
                    <span className="ft-display block text-5xl leading-none text-black/20">
                      {item.step}
                    </span>

                    <span
                      className="mt-4 block h-5 w-5 shrink-0 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="ft-display ft-text-balance max-w-4xl text-[clamp(2rem,4vw,4rem)] leading-[1.06]">
                      {item.title}
                    </h3>

                    <p className="mt-4 max-w-2xl text-base font-semibold leading-8 text-black/62 sm:text-lg sm:leading-9">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 230, damping: 26 }}
              className="relative mx-auto w-full max-w-[440px]"
            >
              <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-[var(--ft-menta)]" />
              <div className="absolute -bottom-4 -left-4 h-12 w-12 rounded-full bg-[var(--ft-citrine)]" />

              <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white p-3 shadow-[0_24px_80px_rgba(17,17,17,0.10)]">
                <div className="relative aspect-square overflow-hidden rounded-[1.55rem] bg-[#fffdf8]">
                  <Image
                    src={media.guestJourney}
                    alt="Food Theatre brand graphic"
                    fill
                    sizes="(max-width: 1024px) 100vw, 440px"
                    className="object-cover"
                  />
                </div>

                <div className="mt-4 rounded-[1.45rem] border border-black/10 bg-white px-4 py-4">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-black/42">
                    Looking for Food That Feels Good?
                  </p>

                  <p className="mt-2 text-sm font-semibold leading-7 text-black/68">
                    Discover the host, feel the freshness, and choose the wellness food moment you want to join.
                  </p>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function JoinWellnessCharacters() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div className="ft-container">
        <Reveal>
          <div className="mx-auto max-w-5xl">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 250, damping: 28 }}
              className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-[var(--ft-menta)] p-5 text-white sm:p-6 lg:p-8"
            >
              <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/18" />
              <div className="pointer-events-none absolute bottom-4 left-1/2 h-8 w-8 rounded-full bg-[var(--ft-citrine)]/80" />
              <div className="pointer-events-none absolute -bottom-20 -left-12 h-44 w-44 rounded-full bg-[var(--ft-blush)]/24" />

              <div className="relative grid gap-7 md:grid-cols-[1fr_auto] md:items-center">
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-white/62">
                    For Fresh Food Voices
                  </p>

                  <h3 className="ft-display ft-text-balance mt-3 max-w-3xl text-[clamp(2.1rem,4vw,4rem)] leading-[1] tracking-[0.002em]">
                    Bring Your Balanced Food Moment to the Table.
                  </h3>

                  <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-white/74 sm:text-base sm:leading-8">
                    Turn your fresh ingredients, hosting rhythm, and food point of view into a
                    connected Food Theatre experience.
                  </p>
                </div>

                <div className="flex flex-col gap-3 md:justify-self-end">
                  <BrandButton href="/#join" tone="denimPomodori">
                    Become a Character
                    <TextArrow />
                  </BrandButton>

                  <BrandButton href="/contact" tone="violaBlush">
                    Contact Us
                    <TextArrow />
                  </BrandButton>
                </div>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function WellnessPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-white">
      <WellnessHero />
      <WellnessSignalTicker />
      <FeaturedWellnessCarousel />
      <GuestPath />
      <JoinWellnessCharacters />
    </main>
  );
}
