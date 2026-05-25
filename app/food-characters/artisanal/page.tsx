"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Typewriter } from "@/components/ui/typewriter";
import {
  getFeaturedFoodCharacterProfilesByCategory,
  getFoodCharacterProfileUrl,
  type FoodCharacterProfile,
} from "@/lib/food-character-profiles";

const media = {
  logo: "/brand/foodtheatre-logo.png",

  artisanalHero: "/media/home/character-artisanal.jpg",
  guestJourney: "/media/food-characters/3-photo.jpg",
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
  "Craft Tables.",
  "Handmade Food.",
  "Slow Flavour.",
  "Maker Stories.",
];

const heroLetterColors = [
  "var(--ft-viola)",
  "var(--ft-citrine)",
  "var(--ft-pomodori)",
  "var(--ft-menta)",
  "var(--ft-denim)",
  "var(--ft-blush)",
];

const artisanalSignals = [
  { label: "Handmade Food", color: "var(--ft-viola)" },
  { label: "Small-Batch Craft", color: "var(--ft-citrine)" },
  { label: "Maker-Led Tables", color: "var(--ft-pomodori)" },
  { label: "Local Ingredients", color: "var(--ft-menta)" },
  { label: "Process Stories", color: "var(--ft-denim)" },
  { label: "Freshly Made Moments", color: "var(--ft-blush)" },
  { label: "Craft Discovery", color: "var(--ft-viola)" },
  { label: "Memorable Tastings", color: "var(--ft-citrine)" },
];

const featuredArtisans = getFeaturedFoodCharacterProfilesByCategory("artisanal");

const guestPath = [
  {
    step: "01",
    title: "Find the Craft",
    text: "Discover handmade food moments shaped by skill, process, and clear flavour.",
    color: "var(--ft-viola)",
  },
  {
    step: "02",
    title: "Meet the Maker",
    text: "Connect with the person behind the food, the method, and the table.",
    color: "var(--ft-citrine)",
  },
  {
    step: "03",
    title: "Taste the Story",
    text: "Choose a tasting, workshop, table, or maker-led experience that feels real and memorable.",
    color: "var(--ft-pomodori)",
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

function DiscoverButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex h-10 min-w-[138px] items-center justify-center rounded-full border-2 border-black/70 bg-white px-7 text-xs font-black text-black transition duration-300 hover:-translate-y-0.5 hover:border-[var(--ft-viola)] hover:bg-[var(--ft-viola)] hover:text-white focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[var(--ft-citrine)]"
    >
      Discover
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

function ArtisanalSignalTicker() {
  const tickerItems = [...artisanalSignals, ...artisanalSignals];

  return (
    <section
      className="relative overflow-hidden border-y border-black/10 bg-white py-5"
      aria-label="Artisanal food experience signals"
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

function ArtisanalHero() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10rem] top-[-7rem] h-[30rem] w-[30rem] rounded-full bg-[var(--ft-viola)]/20 blur-3xl" />
        <div className="absolute right-[-11rem] top-16 h-[32rem] w-[32rem] rounded-full bg-[var(--ft-citrine)]/14 blur-3xl" />
        <div className="absolute bottom-[-14rem] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[var(--ft-blush)]/18 blur-3xl" />
      </div>

      <div className="ft-container">
        <Reveal>
          <div className="flex flex-wrap items-center gap-4">
            <LocalLogo className="h-20 w-20 object-contain sm:h-24 sm:w-24" />

            <span className="text-xs font-black uppercase tracking-[0.24em] text-black/58">
              Food Characters / Artisanal
            </span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end xl:grid-cols-[minmax(0,1fr)_390px]">
          <Reveal delay={0.06}>
            <div className="min-w-0">
              <h1 className="ft-display ft-text-balance max-w-6xl text-[clamp(3rem,6.2vw,6.4rem)] leading-[1.02] tracking-[0.002em]">
                <span>Artisans Make </span>
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

              <p className="mt-8 max-w-3xl border-l-4 border-[var(--ft-viola)] pl-5 text-lg font-semibold leading-9 text-black/72 sm:text-xl sm:leading-10">
                Discover Food Characters turning handmade food, patient craft, and local flavour
                into clear, memorable experiences guests can taste and understand.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <BrandButton href="#featured-artisans" tone="violaBlush">
                  Meet Artisans
                  <TextArrow />
                </BrandButton>

                <BrandButton href="/#experiences" tone="citrineMenta">
                  Explore Experiences
                  <TextArrow />
                </BrandButton>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative mx-auto w-full max-w-[390px] lg:mx-0">
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-[var(--ft-citrine)]" />
              <div className="absolute -bottom-4 -left-4 h-14 w-14 rounded-full bg-[var(--ft-viola)]" />

              <SquarePhoto
                src={media.artisanalHero}
                alt="Artisanal Food Character shaping handmade food"
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

function PosterShape({ variant }: { variant: FoodCharacterProfile["cardShape"] }) {
  if (variant === "frame") {
    return (
      <>
        <div className="absolute right-0 top-[42px] h-[230px] w-[230px] rounded-[1.7rem] bg-[var(--ft-viola)]">
          <div className="absolute -right-10 top-7 h-[190px] w-[190px] rounded-full bg-white" />
          <div className="absolute -bottom-8 -left-8 h-[82px] w-[82px] rounded-full bg-white" />
        </div>

        <div className="absolute right-1 top-[42px] h-8 w-8 rounded-full bg-white" />
      </>
    );
  }

  return (
    <>
      <div className="absolute right-5 top-[66px] h-[220px] w-[220px] rounded-full bg-[var(--ft-viola)]" />
      <div className="absolute right-4 top-[38px] h-8 w-8 rounded-full bg-[var(--ft-viola)]" />
      <div className="absolute left-1 bottom-[70px] h-16 w-16 rounded-br-full rounded-tl-full bg-[var(--ft-viola)]" />
    </>
  );
}

function ArtisanPosterCard({ character }: { character: FoodCharacterProfile }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 250, damping: 28 }}
      className="group flex min-h-[390px] flex-col items-center"
    >
      <div className="relative h-[306px] w-full max-w-[292px] overflow-visible">
        <PosterShape variant={character.cardShape} />

        <h3 className="absolute left-[-18px] top-[38px] z-30 max-w-[150px] text-[clamp(1.75rem,2.25vw,2.25rem)] font-black uppercase leading-[0.9] tracking-[-0.07em] text-black">
          {character.cardHeadline}
        </h3>

        <p className="absolute bottom-[58px] left-[-18px] z-30 max-w-[150px] text-[0.76rem] font-black uppercase leading-[0.95] tracking-[-0.035em] text-black/62">
          {character.name}
        </p>

        <div className={`absolute z-20 overflow-visible ${character.cardImageBoxClassName}`}>
          <Image
            src={character.cutoutImage}
            alt={`${character.name}, ${character.role}`}
            fill
            sizes="190px"
            className="object-contain object-bottom grayscale transition duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
          />
        </div>
      </div>

      <DiscoverButton href={getFoodCharacterProfileUrl(character)} />
    </motion.article>
  );
}

function EmptyArtisanState() {
  return (
    <div className="mt-12 rounded-[2rem] border border-black/10 bg-[#fffdf8] p-6 text-center shadow-[0_20px_70px_rgba(17,17,17,0.06)]">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-black/42">
        No Artisanal Characters yet
      </p>

      <h3 className="ft-display mx-auto mt-4 max-w-2xl text-[clamp(2.2rem,5vw,4.2rem)] leading-[0.95]">
        Artisanal profiles will appear here once they are added.
      </h3>

      <p className="mx-auto mt-5 max-w-xl text-sm font-semibold leading-7 text-black/62">
        This section is ready for Sanity. When Artisanal Food Characters are published, their
        names, card headlines, transparent PNG cutouts, and profile links will render here.
      </p>
    </div>
  );
}

function FeaturedArtisans() {
  return (
    <section
      id="featured-artisans"
      className="relative isolate overflow-hidden bg-white py-14 sm:py-20"
    >
      <div className="mx-auto w-full max-w-[850px] px-5">
        <Reveal>
          <div>
            <h2 className="font-black uppercase leading-[0.88] tracking-[-0.065em] text-black text-[clamp(3.6rem,8vw,5.3rem)]">
              Artisanal
            </h2>

            <p className="mt-6 max-w-[520px] text-sm font-semibold leading-7 text-black/70">
              Artisanal Characters bring handmade food, patient craft, local ingredients, and maker
              stories into warm experiences guests can taste, understand, and remember.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          {featuredArtisans.length > 0 ? (
            <div className="mt-12 grid gap-x-9 gap-y-12 md:grid-cols-3">
              {featuredArtisans.map((character) => (
                <ArtisanPosterCard key={character.slug} character={character} />
              ))}
            </div>
          ) : (
            <EmptyArtisanState />
          )}
        </Reveal>
      </div>
    </section>
  );
}

function GuestPath() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-10rem] top-10 h-[28rem] w-[28rem] rounded-full bg-[var(--ft-citrine)]/12 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-[-8rem] h-[30rem] w-[30rem] rounded-full bg-[var(--ft-viola)]/10 blur-3xl" />
      </div>

      <div className="ft-container">
        <SectionIntro
          label="Guest Journey"
          title="From Craft Curiosity to a Maker-Led Table."
          text="Guests quickly understand the craft, meet the maker, and move toward a food moment they can taste, join, and remember."
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
              <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-[var(--ft-citrine)]" />
              <div className="absolute -bottom-4 -left-4 h-12 w-12 rounded-full bg-[var(--ft-viola)]" />

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
                    Looking for Food With Craft?
                  </p>

                  <p className="mt-2 text-sm font-semibold leading-7 text-black/68">
                    Discover the maker, understand the process, and choose the moment you want to
                    join.
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

function JoinArtisans() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div className="ft-container">
        <Reveal>
          <div className="mx-auto max-w-5xl">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 250, damping: 28 }}
              className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-[var(--ft-viola)] p-5 text-white sm:p-6 lg:p-8"
            >
              <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/18" />
              <div className="pointer-events-none absolute bottom-4 left-1/2 h-8 w-8 rounded-full bg-[var(--ft-citrine)]/80" />
              <div className="pointer-events-none absolute -bottom-20 -left-12 h-44 w-44 rounded-full bg-[var(--ft-blush)]/24" />

              <div className="relative grid gap-7 md:grid-cols-[1fr_auto] md:items-center">
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-white/62">
                    For Skilled Food Makers
                  </p>

                  <h3 className="ft-display ft-text-balance mt-3 max-w-3xl text-[clamp(2.1rem,4vw,4rem)] leading-[1] tracking-[0.002em]">
                    Bring Your Craft Into a Food Theatre Moment.
                  </h3>

                  <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-white/74 sm:text-base sm:leading-8">
                    Turn your process, ingredients, technique, and maker story into a connected
                    Food Theatre experience.
                  </p>
                </div>

                <div className="flex flex-col gap-3 md:justify-self-end">
                  <BrandButton href="/#join" tone="citrineMenta">
                    Become a Character
                    <TextArrow />
                  </BrandButton>

                  <BrandButton href="/contact" tone="blushDenim">
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

export default function ArtisanalPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-white">
      <ArtisanalHero />
      <ArtisanalSignalTicker />
      <FeaturedArtisans />
      <GuestPath />
      <JoinArtisans />
    </main>
  );
}
