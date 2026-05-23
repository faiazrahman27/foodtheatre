"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const media = {
  logo: "/brand/foodtheatre-logo.png",
  characterHero: "/media/food-characters/hero.jpg",

  characterInnovators: "/media/home/character-innovators.jpg",
  characterGlobal: "/media/home/character-global.jpg",
  characterArtisanal: "/media/home/character-artisanal.jpg",
  characterFoodcos: "/media/home/character-foodcos.jpg",
  characterWellness: "/media/home/character-wellness.jpg",
  characterCreators: "/media/home/character-creators.jpg",

  joinMovement: "/media/home/join-movement.jpg"
};

type ButtonTone =
  | "denimPomodori"
  | "citrineMenta"
  | "pomodoriViola"
  | "mentaDenim"
  | "violaCitrine";

const buttonToneClasses: Record<ButtonTone, string> = {
  denimPomodori:
    "bg-[var(--ft-denim)] text-white hover:bg-[var(--ft-pomodori)] hover:text-white",
  citrineMenta:
    "bg-[var(--ft-citrine)] text-black hover:bg-[var(--ft-menta)] hover:text-white",
  pomodoriViola:
    "bg-[var(--ft-pomodori)] text-white hover:bg-[var(--ft-viola)] hover:text-white",
  mentaDenim:
    "bg-[var(--ft-menta)] text-white hover:bg-[var(--ft-denim)] hover:text-white",
  violaCitrine:
    "bg-[var(--ft-viola)] text-white hover:bg-[var(--ft-citrine)] hover:text-black"
};

const brandValues = [
  {
    label: "Sustainable",
    color: "var(--ft-menta)"
  },
  {
    label: "Convivial",
    color: "var(--ft-citrine)"
  },
  {
    label: "Diverse",
    color: "var(--ft-blush)"
  },
  {
    label: "Transversal",
    color: "var(--ft-denim)"
  },
  {
    label: "Ethical",
    color: "var(--ft-pomodori)"
  },
  {
    label: "Smart",
    color: "var(--ft-viola)"
  }
];

const characterSignals = [
  { label: "Chefs", color: "var(--ft-pomodori)" },
  { label: "Makers", color: "var(--ft-menta)" },
  { label: "Creators", color: "var(--ft-citrine)" },
  { label: "Artisans", color: "var(--ft-viola)" },
  { label: "Food brands", color: "var(--ft-denim)" },
  { label: "Hosts", color: "var(--ft-blush)" },
  { label: "Wellness voices", color: "var(--ft-menta)" },
  { label: "Global kitchens", color: "var(--ft-citrine)" },
  { label: "Local producers", color: "var(--ft-pomodori)" },
  { label: "Experience leaders", color: "var(--ft-denim)" }
];

const characterTypes = [
  {
    name: "Innovators",
    slug: "innovators",
    color: "var(--ft-pomodori)",
    href: "#innovators",
    buttonTone: "violaCitrine",
    image: media.characterInnovators,
    text: "New techniques, unexpected formats, and fresh ways of experiencing taste.",
    titleClassName: "text-white",
    textClassName: "text-white/84"
  },
  {
    name: "Creators",
    slug: "creators",
    color: "var(--ft-citrine)",
    href: "#creators",
    buttonTone: "denimPomodori",
    image: media.characterCreators,
    text: "Food storytellers shaping flavour, visuals, content, and atmosphere.",
    titleClassName: "text-black",
    textClassName: "text-black/68"
  },
  {
    name: "Artisanal",
    slug: "artisanal",
    color: "var(--ft-viola)",
    href: "#artisanal",
    buttonTone: "citrineMenta",
    image: media.characterArtisanal,
    text: "Small makers creating distinctive food through skill and craft.",
    titleClassName: "text-white",
    textClassName: "text-white/84"
  },
  {
    name: "Global",
    slug: "global",
    color: "var(--ft-blush)",
    href: "#global",
    buttonTone: "mentaDenim",
    image: media.characterGlobal,
    text: "Recipes, traditions, memories, and flavours from around the world.",
    titleClassName: "text-black",
    textClassName: "text-black/68"
  },
  {
    name: "Wellness",
    slug: "wellness",
    color: "var(--ft-menta)",
    href: "#wellness",
    buttonTone: "pomodoriViola",
    image: media.characterWellness,
    text: "Healthy food made generous, balanced, beautiful, and enjoyable.",
    titleClassName: "text-white",
    textClassName: "text-white/84"
  },
  {
    name: "FoodCo.s",
    slug: "foodcos",
    color: "var(--ft-denim)",
    href: "#foodcos",
    buttonTone: "citrineMenta",
    image: media.characterFoodcos,
    text: "Restaurants, caterers, producers, operators, and food brands.",
    titleClassName: "text-white",
    textClassName: "text-white/84"
  }
] as const;

const characterDetails = [
  {
    name: "Innovators",
    slug: "innovators",
    eyebrow: "New formats",
    number: "01",
    color: "var(--ft-pomodori)",
    image: media.characterInnovators,
    buttonTone: "pomodoriViola",
    intro:
      "Innovators bring surprise into Food Theatre. They test formats, techniques, tools, and new ways of presenting food so guests feel they have stepped into something fresh.",
    body:
      "They can lead experimental dinners, future-facing tastings, sensory workshops, unusual pairings, hybrid food events, and formats that turn curiosity into a memorable experience.",
    highlights: ["Experimental dinners", "Sensory formats", "Unexpected pairings", "New food rituals"]
  },
  {
    name: "Creators",
    slug: "creators",
    eyebrow: "Story and atmosphere",
    number: "02",
    color: "var(--ft-citrine)",
    image: media.characterCreators,
    buttonTone: "denimPomodori",
    intro:
      "Creators shape the visual and emotional side of food. They turn flavour, content, setting, and personality into moments people want to remember and share.",
    body:
      "They can bring content-led dining, edible storytelling, branded food moments, creative workshops, visual food culture, and mood-led experiences into the Food Theatre world.",
    highlights: ["Food storytelling", "Visual culture", "Content-led moments", "Mood and identity"]
  },
  {
    name: "Artisanal",
    slug: "artisanal",
    eyebrow: "Craft and origin",
    number: "03",
    color: "var(--ft-viola)",
    image: media.characterArtisanal,
    buttonTone: "violaCitrine",
    intro:
      "Artisanal Characters are makers with a clear hand, process, and point of view. Their value comes from skill, patience, material knowledge, and the intimacy of craft.",
    body:
      "They can host bakery tables, fermentation tastings, cheese and chocolate sessions, handmade pasta workshops, small-batch showcases, and process-led experiences.",
    highlights: ["Small-batch craft", "Maker sessions", "Process-led tasting", "Hands-on learning"]
  },
  {
    name: "Global",
    slug: "global",
    eyebrow: "Culture and memory",
    number: "04",
    color: "var(--ft-blush)",
    image: media.characterGlobal,
    buttonTone: "mentaDenim",
    intro:
      "Global Characters bring recipes, rituals, languages, family memories, and cultural references into the table. They help guests experience food as a living cultural story.",
    body:
      "They can lead regional dinners, migration stories, family-table formats, cultural tastings, festive menus, and food journeys connected to place, memory, and identity.",
    highlights: ["Cultural dinners", "Regional menus", "Family-table stories", "Food memory"]
  },
  {
    name: "Wellness",
    slug: "wellness",
    eyebrow: "Balance and care",
    number: "05",
    color: "var(--ft-menta)",
    image: media.characterWellness,
    buttonTone: "pomodoriViola",
    intro:
      "Wellness Characters make healthy food feel generous, desirable, and social. They connect nourishment with beauty, rhythm, seasonality, and everyday wellbeing.",
    body:
      "They can host mindful breakfasts, seasonal wellness tables, plant-forward experiences, nutrition-led workshops, restorative menus, and calm food rituals.",
    highlights: ["Plant-forward food", "Mindful tables", "Seasonal wellbeing", "Restorative menus"]
  },
  {
    name: "FoodCo.s",
    slug: "foodcos",
    eyebrow: "Food businesses",
    number: "06",
    color: "var(--ft-denim)",
    image: media.characterFoodcos,
    buttonTone: "citrineMenta",
    intro:
      "FoodCo.s are restaurants, caterers, producers, food brands, operators, and hospitality teams that want to appear with a clearer story and stronger experience language.",
    body:
      "They can use Food Theatre to present signature menus, pop-ups, product tastings, collaborations, city activations, brand-led dinners, and community-facing food moments.",
    highlights: ["Restaurants", "Caterers", "Food brands", "Producers and operators"]
  }
] as const;

type FloatingImageProps = {
  src: string;
  alt: string;
  className: string;
};

const heroImages: FloatingImageProps[] = [
  {
    src: "https://b.zmtcdn.com/data/o2_assets/110a09a9d81f0e5305041c1b507d0f391743058910.png",
    alt: "A delicious cheeseburger",
    className:
      "w-40 sm:w-56 md:w-64 lg:w-72 top-10 left-4 sm:left-10 md:top-20 md:left-20"
  },
  {
    src: "https://b.zmtcdn.com/data/o2_assets/b4f62434088b0ddfa9b370991f58ca601743060218.png",
    alt: "A bamboo steamer with dumplings",
    className:
      "w-28 sm:w-36 md:w-48 top-10 right-4 sm:right-10 md:top-16 md:right-16"
  },
  {
    src: "https://b.zmtcdn.com/data/o2_assets/316495f4ba2a9c9d9aa97fed9fe61cf71743059024.png",
    alt: "A slice of pizza",
    className:
      "w-32 sm:w-40 md:w-56 bottom-8 right-5 sm:right-10 md:bottom-16 md:right-20"
  },
  {
    src: "https://b.zmtcdn.com/data/o2_assets/70b50e1a48a82437bfa2bed925b862701742892555.png",
    alt: "A basil leaf",
    className: "w-8 sm:w-12 top-1/4 left-1/3"
  },
  {
    src: "https://b.zmtcdn.com/data/o2_assets/9ef1cc6ecf1d92798507ffad71e9492d1742892584.png",
    alt: "A slice of tomato",
    className: "w-8 sm:w-10 top-1/2 right-1/4"
  },
  {
    src: "https://b.zmtcdn.com/data/o2_assets/9ef1cc6ecf1d92798507ffad71e9492d1742892584.png",
    alt: "A slice of tomato",
    className: "w-8 sm:w-10 top-3/4 left-1/4"
  }
];

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
  children,
  className = ""
}: {
  label: string;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal>
      <div className={`space-y-7 ${className}`}>
        <div>
          <SectionLabel>{label}</SectionLabel>
          <h2 className="ft-display mt-4 max-w-6xl text-[clamp(2.45rem,5vw,5.25rem)] leading-[1.04] tracking-[0.002em]">
            {title}
          </h2>
        </div>

        {children ? (
          <div className="max-w-3xl text-base font-semibold leading-8 text-black/64 sm:text-lg sm:leading-9">
            {children}
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}

function TextArrow() {
  return <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>;
}

function LocalLogo({
  className = "",
  eager = false
}: {
  className?: string;
  eager?: boolean;
}) {
  return (
    <Image
      src={media.logo}
      alt="Food Theatre logo"
      width={180}
      height={180}
      loading={eager ? "eager" : "lazy"}
      className={className}
    />
  );
}

function Swirls() {
  return (
    <>
      <svg
        className="absolute left-0 top-0 -translate-x-1/3 -translate-y-1/3 text-[var(--ft-blush)]/55"
        width="600"
        height="600"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M515.266 181.33C377.943 51.564 128.537 136.256 50.8123 293.565C-26.9127 450.874 125.728 600 125.728 600"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <svg
        className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 text-[var(--ft-citrine)]/45"
        width="700"
        height="700"
        viewBox="0 0 700 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M26.8838 528.274C193.934 689.816 480.051 637.218 594.397 451.983C708.742 266.748 543.953 2.22235 543.953 2.22235"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
}

function FloatingFoodHero({
  title,
  description,
  images,
  className
}: {
  title: string;
  description: string;
  images: FloatingImageProps[];
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative flex min-h-[72vh] w-full items-center justify-center overflow-hidden bg-white py-20 sm:min-h-[78vh] md:py-28 lg:min-h-[84vh]",
        className
      )}
    >
      <div className="absolute inset-0 z-0">
        <Swirls />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10">
        {images.map((image, index) => (
          <motion.img
            key={`${image.src}-${index}`}
            src={image.src}
            alt={image.alt}
            className={cn("absolute object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.14)]", image.className)}
            animate={{
              y: [0, -16, 0],
              rotate: [0, index % 2 === 0 ? 2 : -2, 0]
            }}
            transition={{
              duration: 4.8 + index * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.18
            }}
          />
        ))}
      </div>

      <div className="relative z-20 mx-auto max-w-2xl px-4 text-center">
        <Reveal>
          <LocalLogo eager className="mx-auto mb-8 h-20 w-20 object-contain sm:h-24 sm:w-24" />
        </Reveal>

        <Reveal delay={0.06}>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-black/42">
            Food Characters
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="ft-display mt-5 text-[clamp(3.25rem,8vw,7.4rem)] leading-[0.88] tracking-[0.002em] text-black">
            {title}
          </h1>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mx-auto mt-7 max-w-2xl text-lg font-semibold leading-8 text-black/66 sm:text-xl sm:leading-9">
            {description}
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
            <BrandButton href="/#experiences" tone="denimPomodori">
              Explore experiences
              <TextArrow />
            </BrandButton>

            <BrandButton href="#join" tone="citrineMenta">
              Become a Character
              <TextArrow />
            </BrandButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CharacterPortrait({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-full border border-white/55 bg-white/25 sm:h-[82px] sm:w-[82px] lg:h-[88px] lg:w-[88px]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 76px, (max-width: 1024px) 82px, 88px"
        className="scale-[1.12] object-cover grayscale transition duration-500 ease-out group-hover:grayscale-0"
      />
    </div>
  );
}

function CharacterMosaicCard({
  type,
  shape,
  layout = "wide"
}: {
  type: (typeof characterTypes)[number];
  shape: string;
  layout?: "wide" | "tall";
}) {
  const isTall = layout === "tall";

  return (
    <motion.article
      whileHover={{
        y: -6,
        zIndex: 20
      }}
      transition={{ type: "spring", stiffness: 250, damping: 28 }}
      className={`group relative isolate flex min-h-[250px] origin-center transform-gpu overflow-hidden border border-black/10 shadow-none will-change-transform sm:min-h-[260px] lg:min-h-[270px] ${shape}`}
      style={{ backgroundColor: type.color }}
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/14" />
      <div className="pointer-events-none absolute -bottom-16 left-8 h-44 w-44 rounded-full bg-white/10" />

      <div
        className={`relative z-10 flex h-full w-full min-w-0 flex-col gap-5 p-6 sm:p-7 ${
          isTall
            ? "items-center justify-between text-center"
            : "justify-between sm:flex-row sm:items-center"
        }`}
      >
        <CharacterPortrait src={type.image} alt={`${type.name} Food Character`} />

        <div className={`flex min-w-0 flex-1 flex-col ${isTall ? "items-center" : ""}`}>
          <h3
            className={`ft-display max-w-full whitespace-normal break-words text-[clamp(2rem,2.6vw,3rem)] leading-[1.02] tracking-[0.002em] ${type.titleClassName}`}
          >
            {type.name}
          </h3>

          <p className={`mt-4 max-w-[360px] text-sm font-semibold leading-6 ${type.textClassName}`}>
            {type.text}
          </p>

          <div className="mt-auto flex w-full justify-center pt-6">
            <BrandButton
              href={type.href}
              tone={type.buttonTone}
              className="min-w-[122px] px-5 py-3 text-xs"
            >
              Learn more
              <TextArrow />
            </BrandButton>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function CharacterMosaic() {
  return (
    <div className="mt-14 overflow-x-auto overflow-y-visible px-1 py-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="mx-auto grid min-w-[980px] max-w-[1120px] gap-5 overflow-visible">
        <div className="grid grid-cols-[1.18fr_1.18fr_0.9fr] gap-5 overflow-visible">
          <Reveal delay={0.03}>
            <CharacterMosaicCard
              type={characterTypes[0]}
              shape="rounded-[2.4rem] rounded-tl-[5.5rem] rounded-br-[5.5rem]"
            />
          </Reveal>

          <Reveal delay={0.06}>
            <CharacterMosaicCard
              type={characterTypes[1]}
              shape="rounded-[2.4rem] rounded-tr-[999px] rounded-br-[999px]"
            />
          </Reveal>

          <Reveal delay={0.09}>
            <CharacterMosaicCard
              type={characterTypes[2]}
              layout="tall"
              shape="rounded-t-[999px] rounded-b-[2.4rem]"
            />
          </Reveal>
        </div>

        <div className="grid grid-cols-[0.9fr_1.18fr_1.18fr] gap-5 overflow-visible">
          <Reveal delay={0.12}>
            <CharacterMosaicCard
              type={characterTypes[3]}
              layout="tall"
              shape="rounded-t-[2.4rem] rounded-b-[999px]"
            />
          </Reveal>

          <Reveal delay={0.15}>
            <CharacterMosaicCard
              type={characterTypes[4]}
              shape="rounded-[2.4rem] rounded-tl-[999px] rounded-bl-[999px]"
            />
          </Reveal>

          <Reveal delay={0.18}>
            <CharacterMosaicCard
              type={characterTypes[5]}
              shape="rounded-[2.4rem] rounded-tr-[5.5rem] rounded-bl-[5.5rem]"
            />
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function CharacterSignalTicker() {
  const tickerItems = [...characterSignals, ...characterSignals];

  return (
    <section
      className="overflow-hidden border-y border-black/10 bg-white py-5"
      aria-label="Food Theatre character signals"
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

function DetailSection({
  detail,
  index
}: {
  detail: (typeof characterDetails)[number];
  index: number;
}) {
  const isReversed = index % 2 === 1;
  const textOnDark =
    detail.color === "var(--ft-pomodori)" ||
    detail.color === "var(--ft-viola)" ||
    detail.color === "var(--ft-menta)" ||
    detail.color === "var(--ft-denim)";

  return (
    <Reveal delay={index * 0.04}>
      <motion.article
        id={detail.slug}
        whileHover={{ x: isReversed ? -6 : 6 }}
        transition={{ type: "spring", stiffness: 230, damping: 28 }}
        className="group relative scroll-mt-32 overflow-visible border-y border-black/10 py-10 sm:py-14"
      >
        <div
          className={`grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center ${
            isReversed ? "lg:grid-flow-dense" : ""
          }`}
        >
          <div className={isReversed ? "lg:col-start-2" : ""}>
            <div
              className={`relative overflow-hidden rounded-[2.6rem] p-6 sm:p-8 ${
                textOnDark ? "text-white" : "text-black"
              }`}
              style={{ backgroundColor: detail.color }}
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/18" />
              <div className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-white/10" />

              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <p
                    className={`text-xs font-black uppercase tracking-[0.24em] ${
                      textOnDark ? "text-white/72" : "text-black/46"
                    }`}
                  >
                    {detail.eyebrow}
                  </p>

                  <span
                    className={`rounded-full border px-4 py-2 text-xs font-black ${
                      textOnDark ? "border-white/28 text-white/78" : "border-black/12 text-black/52"
                    }`}
                  >
                    {detail.number}
                  </span>
                </div>

                <h2 className="ft-display mt-8 max-w-3xl text-[clamp(3rem,7vw,7.2rem)] leading-[0.9] tracking-[0.002em]">
                  {detail.name}
                </h2>

                <p
                  className={`mt-7 max-w-2xl text-lg font-semibold leading-8 sm:text-xl sm:leading-9 ${
                    textOnDark ? "text-white/86" : "text-black/70"
                  }`}
                >
                  {detail.intro}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {detail.highlights.map((item) => (
                    <span
                      key={item}
                      className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.12em] ${
                        textOnDark
                          ? "border border-white/22 bg-white/14 text-white"
                          : "border border-black/10 bg-white/38 text-black/64"
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={isReversed ? "lg:col-start-1" : ""}>
            <div className="relative">
              <div
                className="absolute -left-4 -top-4 h-24 w-24 rounded-full opacity-75"
                style={{ backgroundColor: detail.color }}
                aria-hidden="true"
              />

              <div className="relative grid gap-5 sm:grid-cols-[0.92fr_1.08fr] sm:items-end">
                <div className="relative aspect-[0.92/1] overflow-hidden rounded-t-[999px] rounded-b-[2.2rem] border border-black/10 bg-[#fffdf8]">
                  <Image
                    src={detail.image}
                    alt={`${detail.name} Food Character`}
                    fill
                    sizes="(max-width: 768px) 100vw, 28vw"
                    className="scale-[1.04] object-cover grayscale transition duration-700 group-hover:scale-[1.08] group-hover:grayscale-0"
                  />
                </div>

                <div className="border-y border-black/10 py-6">
                  <p className="max-w-xl text-base font-semibold leading-8 text-black/64">
                    {detail.body}
                  </p>

                  <BrandButton href={`#${detail.slug}`} tone={detail.buttonTone} className="mt-7">
                    Explore {detail.name}
                    <TextArrow />
                  </BrandButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

function CharacterRhythm() {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-[2.4rem] bg-[#fffdf8] px-5 py-7 sm:px-7 lg:px-9">
        <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-[var(--ft-blush)]/45" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-[var(--ft-citrine)]/38" />

        <div className="relative grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-black/42">
              How Characters move
            </p>
            <h3 className="ft-display mt-4 max-w-xl text-[clamp(2.5rem,5vw,5.4rem)] leading-[0.95]">
              Craft becomes a moment guests can enter.
            </h3>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                title: "Point of view",
                text: "A maker, chef, brand, or host brings taste, craft, culture, and personality.",
                color: "var(--ft-pomodori)"
              },
              {
                title: "Food format",
                text: "The idea becomes a dinner, tasting, workshop, pairing, pop-up, or table.",
                color: "var(--ft-menta)"
              },
              {
                title: "Shared place",
                text: "The Theatre or Stage gives the story atmosphere, rhythm, and memory.",
                color: "var(--ft-denim)"
              }
            ].map((item) => (
              <motion.article
                key={item.title}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 250, damping: 26 }}
                className="relative min-h-[220px] overflow-hidden rounded-[1.8rem] border border-black/10 bg-white p-5"
              >
                <span
                  className="block h-5 w-5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <h4 className="ft-display mt-8 text-3xl leading-none">{item.title}</h4>
                <p className="mt-4 text-sm font-semibold leading-7 text-black/58">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function BecomeCharacterBox() {
  return (
    <Reveal>
      <div className="mx-auto max-w-5xl">
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 250, damping: 28 }}
          className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-[var(--ft-citrine)] p-5 sm:p-6 lg:p-8"
        >
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/34" />
          <div className="pointer-events-none absolute bottom-4 left-1/2 h-8 w-8 rounded-full bg-[var(--ft-pomodori)]/70" />

          <div className="relative grid gap-7 md:grid-cols-[1fr_auto] md:items-center">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-black/48">
                Become a Character
              </p>

              <h2 className="ft-display mt-3 max-w-3xl text-[clamp(2.1rem,4vw,4rem)] leading-[1] tracking-[0.002em]">
                Bring your food story into the Food Theatre world.
              </h2>

              <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-black/64 sm:text-base sm:leading-8">
                For chefs, makers, hosts, producers, restaurants, brands, and creators who want a
                stronger stage for their craft, story, and guest experience.
              </p>
            </div>

            <BrandButton href="/#join" tone="denimPomodori" className="md:justify-self-end">
              Become a Character
              <TextArrow />
            </BrandButton>
          </div>
        </motion.div>
      </div>
    </Reveal>
  );
}

export default function FoodCharactersPage() {
  return (
    <main className="bg-white">
      <FloatingFoodHero
        title="The people behind every food story."
        description="Food Characters are chefs, makers, artisans, creators, hosts, producers, restaurants, brands, and food-focused voices who turn their craft into memorable experiences."
        images={heroImages}
      />

      <CharacterSignalTicker />

      <section
        id="character-worlds"
        className="relative scroll-mt-28 overflow-hidden bg-[#fffdf8] py-16 sm:py-24"
      >
        <div className="pointer-events-none absolute inset-0 ft-brand-grid opacity-55" />

        <div className="ft-container relative">
          <SectionIntro label="Character worlds" title="Six ways food culture comes alive.">
            Food Theatre gives every Character a clearer place in the story: what they make, how they
            host, what they stand for, and why guests should step into their world.
          </SectionIntro>

          <CharacterMosaic />
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-10 sm:py-16">
        <div className="ft-container">
          <CharacterRhythm />
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        <div className="ft-container">
          <div className="space-y-4">
            {characterDetails.map((detail, index) => (
              <DetailSection key={detail.slug} detail={detail} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="join" className="relative scroll-mt-28 overflow-hidden bg-[#fffdf8] py-12 sm:py-20">
        <div className="pointer-events-none absolute inset-0 ft-brand-grid opacity-55" />

        <div className="ft-container relative">
          <SectionIntro
            label="For food makers"
            title="A stage for the people who make food feel personal."
            className="mx-auto max-w-5xl text-center [&_h2]:mx-auto [&>div:last-child]:mx-auto"
          >
            <p className="text-xl font-semibold leading-9 text-black/70">
              Food Theatre is built for the people, teams, and brands who do more than serve food.
              It gives your craft a clearer voice, your story a stronger setting, and your guests a
              reason to remember the moment.
            </p>

            <p className="mt-3 text-base leading-8 text-black/58">
              Whether you are a chef, artisan, creator, producer, host, restaurant, or food brand,
              becoming a Character means turning your point of view into experiences people can
              discover, book, share, and talk about.
            </p>
          </SectionIntro>

          <div className="mt-12">
            <BecomeCharacterBox />
          </div>

          <Reveal delay={0.08}>
            <div className="mx-auto mt-8 flex max-w-5xl flex-wrap gap-2">
              {brandValues.map((item) => (
                <span
                  key={item.label}
                  className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-black/56"
                >
                  <span
                    className="mr-2 inline-block h-2.5 w-2.5 rounded-full align-middle"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
