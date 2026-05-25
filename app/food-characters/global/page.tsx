"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { type ReactNode, useEffect, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Typewriter } from "@/components/ui/typewriter";
import {
  getFoodCharacterCategory,
  getFoodCharacterProfileUrl,
  type FoodCharacterProfile,
} from "@/lib/food-character-profiles";
import { getFeaturedFoodCharacterProfilesByCategoryFromSanity } from "@/lib/sanity/food-character-profiles";

const media = {
  logo: "/brand/foodtheatre-logo.png",
  guestJourney: "/media/food-characters/3-photo.jpg",
};

const globalCategory = getFoodCharacterCategory("global");

const globalAccentColor = globalCategory?.accentColor ?? "var(--ft-blush)";
const globalAccentSoftColor =
  globalCategory?.accentSoftColor ?? "rgba(243, 183, 191, 0.22)";
const globalHeroImage =
  globalCategory?.heroImage ?? "/media/home/character-global.jpg";
const globalHeroImageAlt =
  globalCategory?.heroImageAlt ?? "Global Food Character hosting a cultural food moment";

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
  "Global Tables.",
  "Cultural Flavour.",
  "Shared Rituals.",
  "Food Journeys.",
];

const heroLetterColors = [
  "var(--ft-blush)",
  "var(--ft-pomodori)",
  "var(--ft-citrine)",
  "var(--ft-denim)",
  "var(--ft-menta)",
  "var(--ft-viola)",
];

const globalSignals = [
  { label: "Global Food Stories", color: "var(--ft-blush)" },
  { label: "Cultural Tables", color: "var(--ft-pomodori)" },
  { label: "Family Recipes", color: "var(--ft-citrine)" },
  { label: "Regional Flavours", color: "var(--ft-denim)" },
  { label: "Shared Traditions", color: "var(--ft-menta)" },
  { label: "Food Journeys", color: "var(--ft-viola)" },
  { label: "Heritage Moments", color: "var(--ft-blush)" },
  { label: "Memorable Gatherings", color: "var(--ft-pomodori)" },
];

const guestPath = [
  {
    step: "01",
    title: "Follow the Flavour",
    text: "Discover food moments connected to culture, place, tradition, and personal story.",
    color: "var(--ft-blush)",
  },
  {
    step: "02",
    title: "Meet the Host",
    text: "Connect with the Character bringing the recipe, the memory, and the table to life.",
    color: "var(--ft-pomodori)",
  },
  {
    step: "03",
    title: "Join the Table",
    text: "Choose a dinner, tasting, workshop, or cultural food moment that feels worth sharing.",
    color: "var(--ft-menta)",
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
      className="group inline-flex h-10 min-w-[138px] items-center justify-center rounded-full border-2 border-black/70 bg-white px-7 text-xs font-black text-black transition duration-300 hover:-translate-y-0.5 hover:border-[var(--ft-blush)] hover:bg-[var(--ft-blush)] hover:text-black focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[var(--ft-citrine)]"
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

function GlobalSignalTicker() {
  const tickerItems = [...globalSignals, ...globalSignals];

  return (
    <section
      className="relative overflow-hidden border-y border-black/10 bg-white py-5"
      aria-label="Global food experience signals"
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

function GlobalHero() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-[-10rem] top-[-7rem] h-[30rem] w-[30rem] rounded-full blur-3xl"
          style={{ backgroundColor: globalAccentSoftColor }}
        />
        <div className="absolute right-[-11rem] top-16 h-[32rem] w-[32rem] rounded-full bg-[var(--ft-pomodori)]/12 blur-3xl" />
        <div className="absolute bottom-[-14rem] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[var(--ft-menta)]/14 blur-3xl" />
      </div>

      <div className="ft-container">
        <Reveal>
          <div className="flex flex-wrap items-center gap-4">
            <LocalLogo className="h-20 w-20 object-contain sm:h-24 sm:w-24" />

            <span className="text-xs font-black uppercase tracking-[0.24em] text-black/58">
              Food Characters / Global
            </span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end xl:grid-cols-[minmax(0,1fr)_390px]">
          <Reveal delay={0.06}>
            <div className="min-w-0">
              <h1 className="ft-display ft-text-balance max-w-6xl text-[clamp(3rem,6.2vw,6.4rem)] leading-[1.02] tracking-[0.002em]">
                <span>Global Characters Bring </span>
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

              <p
                className="mt-8 max-w-3xl border-l-4 pl-5 text-lg font-semibold leading-9 text-black/72 sm:text-xl sm:leading-10"
                style={{ borderColor: globalAccentColor }}
              >
                Discover Food Characters turning cultural recipes, family memory, regional flavour,
                and generous hosting into food moments guests can enter, share, and remember.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <BrandButton href="#featured-global" tone="blushDenim">
                  Meet Global Characters
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
              <div
                className="absolute -right-4 -top-4 h-20 w-20 rounded-full"
                style={{ backgroundColor: globalAccentColor }}
              />
              <div className="absolute -bottom-4 -left-4 h-14 w-14 rounded-full bg-[var(--ft-pomodori)]" />

              <SquarePhoto
                src={globalHeroImage}
                alt={globalHeroImageAlt}
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

function PosterShape({
  variant,
  accentColor,
}: {
  variant: FoodCharacterProfile["cardShape"];
  accentColor: string;
}) {
  if (variant === "frame") {
    return (
      <>
        <div
          className="absolute right-0 top-[42px] h-[230px] w-[230px] rounded-[1.7rem]"
          style={{ backgroundColor: accentColor }}
        >
          <div className="absolute -right-10 top-7 h-[190px] w-[190px] rounded-full bg-white" />
          <div className="absolute -bottom-8 -left-8 h-[82px] w-[82px] rounded-full bg-white" />
        </div>

        <div className="absolute right-1 top-[42px] h-8 w-8 rounded-full bg-white" />
      </>
    );
  }

  return (
    <>
      <div
        className="absolute right-5 top-[66px] h-[220px] w-[220px] rounded-full"
        style={{ backgroundColor: accentColor }}
      />
      <div
        className="absolute right-4 top-[38px] h-8 w-8 rounded-full"
        style={{ backgroundColor: accentColor }}
      />
      <div
        className="absolute left-1 bottom-[70px] h-16 w-16 rounded-br-full rounded-tl-full"
        style={{ backgroundColor: accentColor }}
      />
    </>
  );
}

function GlobalPosterCard({ character }: { character: FoodCharacterProfile }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 250, damping: 28 }}
      className="group flex min-h-[390px] flex-col items-center"
    >
      <div className="relative h-[306px] w-full max-w-[292px] overflow-visible">
        <PosterShape variant={character.cardShape} accentColor={character.accentColor} />

        <h3 className="absolute left-[-18px] top-[38px] z-30 max-w-[150px] text-[clamp(1.75rem,2.25vw,2.25rem)] font-black uppercase leading-[0.9] tracking-[-0.07em] text-black">
          {character.cardHeadline}
        </h3>

        <p className="absolute bottom-[58px] left-[-18px] z-30 max-w-[150px] text-[0.76rem] font-black uppercase leading-[0.95] tracking-[-0.035em] text-black/62">
          {character.name}
        </p>

        <div className={`absolute z-20 overflow-visible ${character.cardImageBoxClassName}`}>
          <Image
            src={character.cutoutImage}
            alt={character.cutoutImageAlt}
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

function FeaturedGlobalCharacters() {
  const [featuredGlobalCharacters, setFeaturedGlobalCharacters] = useState<
    FoodCharacterProfile[]
  >([]);
  const [loadingGlobalCharacters, setLoadingGlobalCharacters] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadFeaturedGlobalCharacters() {
      try {
        const profiles = await getFeaturedFoodCharacterProfilesByCategoryFromSanity("global");

        if (!cancelled) {
          setFeaturedGlobalCharacters(profiles);
          setLoadingGlobalCharacters(false);
        }
      } catch (error) {
        console.error("Global food character fetch failed:", error);

        if (!cancelled) {
          setFeaturedGlobalCharacters([]);
          setLoadingGlobalCharacters(false);
        }
      }
    }

    loadFeaturedGlobalCharacters();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="featured-global"
      className="relative isolate overflow-hidden bg-white py-14 sm:py-20"
    >
      <div className="mx-auto w-full max-w-[850px] px-5">
        <Reveal>
          <div>
            <h2 className="font-black uppercase leading-[0.88] tracking-[-0.065em] text-black text-[clamp(3.6rem,8vw,5.3rem)]">
              Global
            </h2>

            <p className="mt-6 max-w-[520px] text-sm font-semibold leading-7 text-black/70">
              Global Characters bring recipes, traditions, memories, and cultural food moments into
              shared tables guests can enter, enjoy, and remember.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          {loadingGlobalCharacters ? (
            <div className="mt-12 rounded-[2rem] border border-black/10 bg-[#fffdf8] p-7">
              <p className="max-w-xl text-sm font-semibold leading-7 text-black/62">
                Global food stories are being prepared for the next Food Theatre table.
              </p>
            </div>
          ) : featuredGlobalCharacters.length > 0 ? (
            <div className="mt-12 grid gap-x-9 gap-y-12 md:grid-cols-3">
              {featuredGlobalCharacters.map((character) => (
                <GlobalPosterCard key={character.id} character={character} />
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-[2rem] border border-black/10 bg-[#fffdf8] p-7">
              <p className="max-w-xl text-sm font-semibold leading-7 text-black/62">
                New global tables are being shaped. Come back soon to discover cultural food
                stories, shared rituals, and memorable hosted moments.
              </p>
            </div>
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
        <div
          className="absolute right-[-10rem] top-10 h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{ backgroundColor: globalAccentSoftColor }}
        />
        <div className="absolute bottom-[-12rem] left-[-8rem] h-[30rem] w-[30rem] rounded-full bg-[var(--ft-menta)]/10 blur-3xl" />
      </div>

      <div className="ft-container">
        <SectionIntro
          label="Guest Journey"
          title="From Cultural Curiosity to a Shared Table."
          text="Guests quickly understand the flavour, meet the host, and move toward a food moment that feels social, generous, and memorable."
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
              <div
                className="absolute -right-4 -top-4 h-16 w-16 rounded-full"
                style={{ backgroundColor: globalAccentColor }}
              />
              <div className="absolute -bottom-4 -left-4 h-12 w-12 rounded-full bg-[var(--ft-pomodori)]" />

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
                    Looking for Food With Culture?
                  </p>

                  <p className="mt-2 text-sm font-semibold leading-7 text-black/68">
                    Discover the host, follow the flavour, and choose the global food moment you want
                    to join.
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

function JoinGlobalCharacters() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div className="ft-container">
        <Reveal>
          <div className="mx-auto max-w-5xl">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 250, damping: 28 }}
              className="relative overflow-hidden rounded-[2rem] border border-black/10 p-5 text-black sm:p-6 lg:p-8"
              style={{ backgroundColor: globalAccentColor }}
            >
              <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/34" />
              <div className="pointer-events-none absolute bottom-4 left-1/2 h-8 w-8 rounded-full bg-[var(--ft-pomodori)]/70" />
              <div className="pointer-events-none absolute -bottom-20 -left-12 h-44 w-44 rounded-full bg-[var(--ft-citrine)]/28" />

              <div className="relative grid gap-7 md:grid-cols-[1fr_auto] md:items-center">
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-black/48">
                    For Global Food Voices
                  </p>

                  <h3 className="ft-display ft-text-balance mt-3 max-w-3xl text-[clamp(2.1rem,4vw,4rem)] leading-[1] tracking-[0.002em]">
                    Bring Your Food Culture Into a Shared Moment.
                  </h3>

                  <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-black/64 sm:text-base sm:leading-8">
                    Turn your recipes, hosting style, cultural memory, and table energy into a
                    connected Food Theatre experience.
                  </p>
                </div>

                <div className="flex flex-col gap-3 md:justify-self-end">
                  <BrandButton href="/#join" tone="denimPomodori">
                    Become a Character
                    <TextArrow />
                  </BrandButton>

                  <BrandButton href="/contact" tone="citrineMenta">
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

export default function GlobalPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-white">
      <GlobalHero />
      <GlobalSignalTicker />
      <FeaturedGlobalCharacters />
      <GuestPath />
      <JoinGlobalCharacters />
    </main>
  );
}
