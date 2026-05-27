"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useRef, useState, type ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { GradientBackground } from "@/components/ui/paper-design-shader-background";

const media = {
  logo: "/brand/foodtheatre-logo.png",
  heroVideo: "/media/high-res-website-video.webm",

  platformExperiences: "/media/home/platform-experiences.jpg",
  platformCharacters: "/media/home/platform-characters.jpg",
  platformTheatre: "/media/home/platform-theatre.jpg",

  theatreLoopVideo: "/media/home/theatre-loop.mp4",

  experienceDiscovery: "/media/home/experience-discovery.jpg",

  experienceConcert: "/media/home/experiences/concert.jpg",
  experiencePastaWorkshop: "/media/home/experiences/pasta-workshop.jpg",
  experienceGardenParty: "/media/home/experiences/garden-party.jpg",
  experienceTastingTable: "/media/home/experiences/tasting-table.jpg",
  experienceChefNight: "/media/home/experiences/chef-night.jpg",

  trendingTable: "/media/home/journals/stories-behind-the-table.jpg",
  trendingStages: "/media/home/journals/inside-the-stages.jpg",
  trendingCharacters: "/media/home/journals/characters-in-focus.jpg",

  characterInnovators: "/media/home/character-innovators.jpg",
  characterGlobal: "/media/home/character-global.jpg",
  characterArtisanal: "/media/home/character-artisanal.jpg",
  characterFoodcos: "/media/home/character-foodcos.jpg",
  characterWellness: "/media/home/character-wellness.jpg",
  characterCreators: "/media/home/character-creators.jpg",

  featureDiscovery: "/media/home/feature-discovery.jpg",
  featureCharacterLed: "/media/home/feature-character-led.jpg",
  featureTheatreInfrastructure: "/media/home/feature-theatre-infrastructure.jpg"
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
    text: "Thoughtful food moments shaped around lower waste, local care, and stronger community connections.",
    color: "var(--ft-menta)"
  },
  {
    label: "Convivial",
    text: "Shared tables, warm encounters, and food experiences designed to bring people together.",
    color: "var(--ft-citrine)"
  },
  {
    label: "Diverse",
    text: "A platform for different cultures, makers, kitchens, voices, and ways of experiencing food.",
    color: "var(--ft-blush)"
  },
  {
    label: "Transversal",
    text: "A meeting point for food, culture, hospitality, storytelling, logistics, and technology.",
    color: "var(--ft-denim)"
  },
  {
    label: "Ethical",
    text: "A more transparent and respectful food ecosystem for makers, hosts, guests, and communities.",
    color: "var(--ft-pomodori)"
  },
  {
    label: "Smart",
    text: "Better discovery, better planning, and more meaningful food experiences supported by digital tools.",
    color: "var(--ft-viola)"
  }
];

const platformSignals = [
  { label: "Story-led dining", color: "var(--ft-pomodori)" },
  { label: "Character-led gastronomy", color: "var(--ft-menta)" },
  { label: "Hosted experiences", color: "var(--ft-viola)" },
  { label: "City-based discovery", color: "var(--ft-denim)" },
  { label: "Food stages", color: "var(--ft-blush)" },
  { label: "Shared tables", color: "var(--ft-citrine)" },
  { label: "Cultural food formats", color: "var(--ft-pomodori)" },
  { label: "Local makers", color: "var(--ft-menta)" },
  { label: "Backstage access", color: "var(--ft-viola)" },
  { label: "Book by date", color: "var(--ft-denim)" }
];

const platformParts = [
  {
    title: "Experiences",
    eyebrow: "What guests discover",
    href: "#experiences",
    number: "01",
    color: "var(--ft-pomodori)",
    buttonTone: "pomodoriViola",
    definition:
      "Discover dinners, tastings, workshops, pairings, pop-ups, and hosted food moments shaped by people, places, and stories.",
    marketing:
      "Each Experience is designed to feel inviting before the booking: rich in atmosphere, easy to understand, and connected to the character behind it.",
    image: media.platformExperiences
  },
  {
    title: "Characters",
    eyebrow: "Who brings the story",
    href: "/food-characters",
    number: "02",
    color: "var(--ft-menta)",
    buttonTone: "mentaDenim",
    definition:
      "Meet chefs, makers, artisans, hosts, brands, creators, and food-focused people who turn their craft into memorable experiences.",
    marketing:
      "Food Characters are the voices of the platform: personal, creative, skilled, and ready to share food culture in a more human way.",
    image: media.platformCharacters
  },
  {
    title: "Theatre",
    eyebrow: "Where it comes alive",
    href: "#theatre",
    number: "03",
    color: "var(--ft-viola)",
    buttonTone: "violaCitrine",
    definition:
      "Explore Theatre locations, Food Stages, hosted spaces, restaurants, homes, and local settings where food stories can unfold.",
    marketing:
      "Theatre gives every experience a setting, a sense of arrival, and a place inside the wider Food Theatre world.",
    image: media.platformTheatre
  }
] as const;

const searchFields = [
  { label: "Where", placeholder: "Choose a city or stage" },
  { label: "When", placeholder: "Pick a date or period" },
  { label: "Who", placeholder: "Character, mood, or format" }
];

const calendarFacets = [
  {
    label: "Date",
    text: "Find the right food moment for your next free evening, weekend, or special occasion."
  },
  {
    label: "City",
    text: "Explore food culture through local neighbourhoods, cities, and future destination pages."
  },
  {
    label: "Stage",
    text: "See where each hosted moment takes place, from Food Stages to partner spaces."
  },
  {
    label: "Character",
    text: "Meet the person, brand, or maker who gives each experience its identity."
  },
  {
    label: "Format",
    text: "Browse by dinner, tasting, workshop, pairing, pop-up, cultural format, or hybrid event."
  }
];

const calendarEvents: Record<
  number,
  {
    label: string;
    shortLabel: string;
    title: string;
    time: string;
    place: string;
    color: string;
    textClassName: string;
  }
> = {
  3: {
    label: "Dinner",
    shortLabel: "Dinner",
    title: "Seasonal character dinner",
    time: "19:30",
    place: "Hosted table",
    color: "var(--ft-pomodori)",
    textClassName: "text-white"
  },
  6: {
    label: "Tasting",
    shortLabel: "Taste",
    title: "Guided tasting table",
    time: "18:00",
    place: "Food Stage",
    color: "var(--ft-citrine)",
    textClassName: "text-black"
  },
  9: {
    label: "Stage",
    shortLabel: "Stage",
    title: "Open stage food night",
    time: "20:00",
    place: "Theatre space",
    color: "var(--ft-denim)",
    textClassName: "text-white"
  },
  12: {
    label: "Workshop",
    shortLabel: "Work",
    title: "Hands-on food workshop",
    time: "15:00",
    place: "Maker table",
    color: "var(--ft-menta)",
    textClassName: "text-white"
  },
  17: {
    label: "Pairing",
    shortLabel: "Pair",
    title: "Flavour pairing session",
    time: "18:30",
    place: "Tasting room",
    color: "var(--ft-viola)",
    textClassName: "text-white"
  },
  21: {
    label: "Market",
    shortLabel: "Market",
    title: "Character market table",
    time: "11:00",
    place: "Food courtyard",
    color: "var(--ft-blush)",
    textClassName: "text-black"
  },
  26: {
    label: "Chef night",
    shortLabel: "Chef",
    title: "Chef-led night",
    time: "20:30",
    place: "Private table",
    color: "var(--ft-pomodori)",
    textClassName: "text-white"
  }
};

const calendarLegend = [
  { label: "Dinner", color: "var(--ft-pomodori)", textClassName: "text-white" },
  { label: "Tasting", color: "var(--ft-citrine)", textClassName: "text-black" },
  { label: "Stage", color: "var(--ft-denim)", textClassName: "text-white" },
  { label: "Workshop", color: "var(--ft-menta)", textClassName: "text-white" },
  { label: "Pairing", color: "var(--ft-viola)", textClassName: "text-white" },
  { label: "Market", color: "var(--ft-blush)", textClassName: "text-black" }
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const experienceCards = [
  {
    title: "Concert",
    image: media.experienceConcert,
    text:
      "Live food, music, shared plates, and a warm social atmosphere made for memorable evenings."
  },
  {
    title: "Pasta Workshop",
    image: media.experiencePastaWorkshop,
    text:
      "A hands-on culinary moment where guests learn, taste, and enjoy the craft behind the table."
  },
  {
    title: "Garden Party",
    image: media.experienceGardenParty,
    text:
      "A relaxed hosted gathering shaped around seasonal food, conversation, and a beautiful setting."
  },
  {
    title: "Tasting Table",
    image: media.experienceTastingTable,
    text:
      "A guided tasting format for discovering flavours, makers, pairings, and stories in one sitting."
  },
  {
    title: "Chef Night",
    image: media.experienceChefNight,
    text:
      "An intimate evening led by a Food Character, built around signature dishes and personal stories."
  }
] as const;

const characterTypes = [
  {
    name: "Innovators",
    color: "var(--ft-pomodori)",
    href: "/food-characters",
    buttonTone: "violaCitrine",
    image: media.characterInnovators,
    text: "New techniques, unexpected formats, and fresh ways of experiencing taste.",
    titleClassName: "text-white",
    textClassName: "text-white/84"
  },
  {
    name: "Creators",
    color: "var(--ft-citrine)",
    href: "/food-characters",
    buttonTone: "denimPomodori",
    image: media.characterCreators,
    text: "Food storytellers shaping flavour, visuals, content, and atmosphere.",
    titleClassName: "text-black",
    textClassName: "text-black/68"
  },
  {
    name: "Artisanal",
    color: "var(--ft-viola)",
    href: "/food-characters",
    buttonTone: "citrineMenta",
    image: media.characterArtisanal,
    text: "Small makers creating distinctive food through skill and craft.",
    titleClassName: "text-white",
    textClassName: "text-white/84"
  },
  {
    name: "Global",
    color: "var(--ft-blush)",
    href: "/food-characters",
    buttonTone: "mentaDenim",
    image: media.characterGlobal,
    text: "Recipes, traditions, memories, and flavours from around the world.",
    titleClassName: "text-black",
    textClassName: "text-black/68"
  },
  {
    name: "Wellness",
    color: "var(--ft-menta)",
    href: "/food-characters",
    buttonTone: "pomodoriViola",
    image: media.characterWellness,
    text: "Healthy food made generous, balanced, beautiful, and enjoyable.",
    titleClassName: "text-white",
    textClassName: "text-white/84"
  },
  {
    name: "FoodCo.s",
    color: "var(--ft-denim)",
    href: "/food-characters",
    buttonTone: "citrineMenta",
    image: media.characterFoodcos,
    text: "Restaurants, caterers, producers, operators, and food brands.",
    titleClassName: "text-white",
    textClassName: "text-white/84"
  }
] as const;

const theatreLayers = [
  {
    title: "Food Theatre",
    text:
      "The main world of the platform: a network of places where guests, makers, stages, and food stories meet."
  },
  {
    title: "Food Stage",
    text:
      "A smaller or temporary format inside the Theatre world, ready to host Characters, menus, and curated moments."
  },
  {
    title: "Hosted Experience",
    text:
      "The food moment itself: a dinner, tasting, workshop, pairing, pop-up, or gathering brought to life by a Character."
  }
];

const cityCarouselSlots = [
  {
    title: "City collections",
    text:
      "Future city pages can help guests discover experiences by location, date, stage, and Food Character."
  },
  {
    title: "Local theatres",
    text: "Each city can reveal Theatre locations, hosted spaces, and the stages connected to them."
  },
  {
    title: "Neighbourhood stories",
    text: "Guests can follow food culture through places, makers, seasonal menus, and local encounters."
  }
];

const featureItems = [
  {
    title: "Discovery-first experiences",
    text:
      "Guests can feel the mood, maker, place, format, and story before choosing the experience that fits them.",
    image: media.featureDiscovery,
    color: "var(--ft-pomodori)"
  },
  {
    title: "Character-led storytelling",
    text:
      "Food Characters are presented as living creative identities, not anonymous names in a basic listing.",
    image: media.featureCharacterLed,
    color: "var(--ft-menta)"
  },
  {
    title: "Theatre as infrastructure",
    text:
      "Physical locations, temporary stages, partner spaces, and hosted formats come together inside one food ecosystem.",
    image: media.featureTheatreInfrastructure,
    color: "var(--ft-viola)"
  }
];

const trendingItems = [
  {
    tag: "Taste stories",
    title: "Stories behind the table",
    image: media.trendingTable,
    text:
      "Discover the people, places, and little rituals that turn a meal into something guests remember long after the evening ends.",
    cta: "Explore the story",
    buttonTone: "denimPomodori"
  },
  {
    tag: "Places to discover",
    title: "Inside the stages",
    image: media.trendingStages,
    text:
      "Step into the spaces where Food Characters host dinners, tastings, workshops, and intimate moments shaped by mood and place.",
    cta: "See the atmosphere",
    buttonTone: "mentaDenim"
  },
  {
    tag: "Meet the makers",
    title: "Characters in focus",
    image: media.trendingCharacters,
    text:
      "Follow the chefs, makers, creators, and food voices bringing flavour, craft, culture, and personality into the Food Theatre world.",
    cta: "Meet the characters",
    buttonTone: "violaCitrine"
  }
] as const;

function getCalendarCells(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const mondayFirstOffset = (firstDay + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();

  return Array.from({ length: 42 }, (_, index) => {
    const dayNumber = index - mondayFirstOffset + 1;

    if (dayNumber < 1) {
      return {
        number: daysInPreviousMonth + dayNumber,
        inCurrentMonth: false
      };
    }

    if (dayNumber > daysInMonth) {
      return {
        number: dayNumber - daysInMonth,
        inCurrentMonth: false
      };
    }

    return {
      number: dayNumber,
      inCurrentMonth: true
    };
  });
}

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

function ImmersiveSquarePhoto({
  src,
  alt,
  className = "",
  sizes = "(max-width: 1024px) 100vw, 42vw"
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0.92, y: 18, scale: 1.035 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      className={`relative aspect-square w-full overflow-hidden rounded-[2rem] border border-black/10 bg-white ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition duration-700 hover:scale-[1.035]"
      />
    </motion.div>
  );
}

function TheatreLoopVideo() {
  return (
    <motion.div
      initial={{ opacity: 0.92, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      className="relative aspect-[4/3] w-full self-center overflow-hidden rounded-[2.2rem] bg-white"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={media.theatreLoopVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Food Theatre location atmosphere video"
      />
    </motion.div>
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

function ExperienceCard({
  item
}: {
  item: (typeof experienceCards)[number];
}) {
  return (
    <motion.article
      whileHover={{
        y: -5,
        boxShadow: "0 24px 60px rgba(0,0,0,0.16)"
      }}
      transition={{ type: "spring", stiffness: 250, damping: 28 }}
      className="flex h-[360px] min-w-[calc(100%-1rem)] snap-start flex-col rounded-[2rem] border border-white/44 bg-white/10 p-5 text-white backdrop-blur-[2px] sm:h-[370px] md:min-w-[calc((100%-1.25rem)/2)] lg:min-w-[calc((100%-2.5rem)/3)]"
    >
      <div className="relative h-[128px] w-full shrink-0 overflow-hidden rounded-[1.35rem] bg-white/15">
        <Image
          src={item.image}
          alt={`${item.title} experience`}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover"
        />
      </div>

      <div className="mt-6 flex min-h-0 flex-1 flex-col">
        <h3 className="text-3xl font-semibold tracking-[-0.03em] text-white">
          {item.title}
        </h3>

        <p className="mt-4 max-w-[22rem] text-sm font-semibold leading-7 text-white/82">
          {item.text}
        </p>

        <Link
          href="#experiences"
          className="mt-auto inline-flex w-fit items-center justify-center rounded-full border border-white/70 px-5 py-2.5 text-sm font-black text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-black"
        >
          Book now
        </Link>
      </div>
    </motion.article>
  );
}

function ExperienceShowcase() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollRight = () => {
    scrollerRef.current?.scrollBy({
      left: 360,
      behavior: "smooth"
    });
  };

  return (
    <Reveal delay={0.08}>
      <div className="relative mt-14 overflow-visible px-1 py-4">
        <div className="overflow-visible rounded-[2.2rem] bg-[var(--ft-menta)] p-4 shadow-[0_22px_70px_rgba(17,17,17,0.08)] sm:p-5 lg:p-6">
          <div
            ref={scrollerRef}
            className="flex items-stretch gap-5 overflow-x-auto overflow-y-hidden scroll-smooth py-8 pr-7 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Experience carousel"
          >
            {experienceCards.map((item) => (
              <ExperienceCard key={item.title} item={item} />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollRight}
          aria-label="Scroll to more experiences"
          className="absolute right-0 top-1/2 z-30 flex h-14 w-14 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-[var(--ft-citrine)] text-2xl font-black text-black shadow-[0_14px_35px_rgba(17,17,17,0.18)] transition duration-300 hover:-translate-y-[56%] hover:bg-[var(--ft-denim)] hover:text-white"
        >
          →
        </button>
      </div>
    </Reveal>
  );
}

function TrendingCard({
  item
}: {
  item: (typeof trendingItems)[number];
}) {
  return (
    <motion.article
      whileHover={{
        y: -5,
        boxShadow: "0 24px 60px rgba(0,0,0,0.14)"
      }}
      transition={{ type: "spring", stiffness: 250, damping: 28 }}
      className="flex h-[520px] min-w-[calc(100%-1rem)] snap-start flex-col overflow-hidden rounded-[2rem] bg-white/76 p-5 text-black sm:h-[520px] md:min-w-[calc((100%-1.25rem)/2)] lg:min-w-[calc((100%-2.5rem)/3)]"
    >
      <div className="relative h-[148px] w-full shrink-0 overflow-hidden rounded-[1.35rem] bg-white/35">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover"
        />
      </div>

      <div className="mt-6 flex min-h-0 flex-1 flex-col">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-black/48">
          {item.tag}
        </p>

        <h3 className="ft-display mt-4 text-[clamp(2.05rem,2.7vw,3rem)] leading-[0.98] tracking-[0.002em]">
          {item.title}
        </h3>

        <p className="mt-5 text-sm font-semibold leading-7 text-black/64">
          {item.text}
        </p>

        <div className="mt-auto pt-6">
          <BrandButton
            href="#"
            tone={item.buttonTone}
            className="px-5 py-3 text-xs"
          >
            {item.cta}
            <TextArrow />
          </BrandButton>
        </div>
      </div>
    </motion.article>
  );
}

function TrendingShowcase() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollRight = () => {
    scrollerRef.current?.scrollBy({
      left: 360,
      behavior: "smooth"
    });
  };

  return (
    <Reveal delay={0.08}>
      <div className="relative mt-14 overflow-visible px-1 py-4">
        <div className="overflow-visible rounded-[2.2rem] bg-[var(--ft-blush)] p-4 shadow-[0_22px_70px_rgba(17,17,17,0.08)] sm:p-5 lg:p-6">
          <div
            ref={scrollerRef}
            className="flex items-stretch gap-5 overflow-x-auto overflow-y-hidden scroll-smooth py-8 pr-7 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Food Theatre trending carousel"
          >
            {trendingItems.map((item) => (
              <TrendingCard key={item.title} item={item} />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollRight}
          aria-label="Scroll to more stories"
          className="absolute right-0 top-1/2 z-30 flex h-14 w-14 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-[var(--ft-citrine)] text-2xl font-black text-black shadow-[0_14px_35px_rgba(17,17,17,0.18)] transition duration-300 hover:-translate-y-[56%] hover:bg-[var(--ft-denim)] hover:text-white"
        >
          →
        </button>
      </div>
    </Reveal>
  );
}

function CalendarPreview() {
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [selectedDay, setSelectedDay] = useState(3);

  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();

  const calendarCells = useMemo(() => getCalendarCells(year, month), [year, month]);
  const selectedEvent = calendarEvents[selectedDay];
  const monthTitle = `${monthNames[month]} ${year}`;
  const selectedDateLabel = `${String(selectedDay).padStart(2, "0")} ${monthNames[month]} ${year}`;

  const changeMonth = (direction: -1 | 1) => {
    setVisibleMonth((currentMonth) => {
      return new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + direction,
        1
      );
    });
  };

  return (
    <div className="lg:sticky lg:top-28 rounded-[2.2rem] border border-black/10 bg-[#fffdf8] p-4 shadow-[0_18px_55px_rgba(17,17,17,0.06)] sm:p-7">
      <div className="flex items-start justify-between gap-4 border-b border-black/10 pb-5">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-black/42">
            Experience calendar
          </p>
          <h3 className="ft-display mt-2 max-w-full text-[clamp(2rem,8vw,3rem)] leading-[0.95]">
            Find food moments
          </h3>
          <p className="mt-3 text-sm font-black uppercase tracking-[0.16em] text-black/44">
            {monthTitle}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            aria-label="Show previous month"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-lg font-black text-black transition hover:bg-[var(--ft-citrine)]"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={() => changeMonth(1)}
            aria-label="Show next month"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-lg font-black text-black transition hover:bg-[var(--ft-citrine)]"
          >
            ›
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1.5 text-center text-[0.62rem] font-black uppercase tracking-[0.08em] text-black/42 sm:gap-2 sm:text-xs">
        {weekdayLabels.map((day, index) => (
          <span key={day} className="flex flex-col items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: brandValues[index % brandValues.length].color }}
            />
            {day}
          </span>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1.5 sm:gap-2">
        {calendarCells.map((day, index) => {
          const event = day.inCurrentMonth ? calendarEvents[day.number] : undefined;
          const isSelected = day.inCurrentMonth && selectedDay === day.number;

          return (
            <motion.button
              key={`${day.inCurrentMonth ? "current" : "outside"}-${index}-${day.number}`}
              type="button"
              disabled={!day.inCurrentMonth}
              onClick={() => setSelectedDay(day.number)}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.22, delay: index * 0.006 }}
              className={`flex aspect-square min-w-0 flex-col justify-between overflow-hidden rounded-[1rem] border p-1.5 text-left font-black transition duration-300 sm:rounded-2xl sm:p-2 ${
                day.inCurrentMonth
                  ? "bg-white text-black hover:border-black/24"
                  : "cursor-default border-black/5 bg-black/[0.025] text-black/18"
              } ${
                isSelected
                  ? "border-black shadow-[0_10px_28px_rgba(17,17,17,0.12)]"
                  : "border-black/10"
              }`}
            >
              <span className="text-[0.72rem] leading-none sm:text-sm">
                {String(day.number).padStart(2, "0")}
              </span>

              {event ? (
                <span
                  className={`max-w-full truncate rounded-full px-1 py-0.5 text-center text-[0.43rem] uppercase leading-none tracking-[0.02em] sm:px-1.5 sm:py-1 sm:text-[0.55rem] ${event.textClassName}`}
                  style={{ backgroundColor: event.color }}
                >
                  {event.shortLabel}
                </span>
              ) : day.inCurrentMonth ? (
                <span className="h-1.5 w-1.5 rounded-full bg-black/12" />
              ) : (
                <span />
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-5 rounded-[1.5rem] border border-black/10 bg-white px-4 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-black/38">
              Selected date
            </p>
            <p className="mt-1 text-lg font-black leading-tight text-black sm:text-xl">
              {selectedDateLabel}
            </p>
          </div>

          {selectedEvent ? (
            <span
              className={`w-fit rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.12em] ${selectedEvent.textClassName}`}
              style={{ backgroundColor: selectedEvent.color }}
            >
              {selectedEvent.label}
            </span>
          ) : null}
        </div>

        {selectedEvent ? (
          <div className="mt-4 border-t border-black/10 pt-4">
            <h4 className="ft-display text-[clamp(1.8rem,6vw,2.8rem)] leading-[0.98]">
              {selectedEvent.title}
            </h4>
            <p className="mt-3 text-sm font-semibold leading-7 text-black/60">
              {selectedEvent.time} · {selectedEvent.place}
            </p>
          </div>
        ) : (
          <p className="mt-4 border-t border-black/10 pt-4 text-sm font-semibold leading-7 text-black/58">
            No highlighted food moment on this date yet. Choose another date or explore the month.
          </p>
        )}
      </div>

      <div className="mt-5 border-t border-black/10 pt-5">
        <p className="text-sm font-semibold leading-7 text-black/58">
          Choose a date and discover dinners, tastings, workshops, markets, pairings, and chef-led
          nights shaped by Food Characters.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {calendarLegend.map((item) => (
            <span
              key={item.label}
              className={`rounded-full px-3 py-2 text-[0.62rem] font-black uppercase tracking-[0.1em] sm:px-4 sm:text-xs ${item.textClassName}`}
              style={{ backgroundColor: item.color }}
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
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

function PlatformChapter({
  part,
  index
}: {
  part: (typeof platformParts)[number];
  index: number;
}) {
  const isReversed = index % 2 === 1;

  return (
    <Reveal delay={index * 0.06}>
      <motion.article
        whileHover={{ x: isReversed ? -8 : 8 }}
        transition={{ type: "spring", stiffness: 240, damping: 26 }}
        className={`relative grid gap-8 border-y border-black/10 py-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-14 ${
          isReversed ? "lg:grid-flow-dense" : ""
        }`}
      >
        <div className={isReversed ? "lg:col-start-2" : ""}>
          <div className="flex items-center gap-4">
            <span
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-sm font-black text-black"
              style={{ backgroundColor: part.color }}
            >
              {part.number}
            </span>

            <p className="text-xs font-black uppercase tracking-[0.22em] text-black/42">
              {part.eyebrow}
            </p>
          </div>

          <h3 className="ft-display mt-7 max-w-full text-[clamp(3rem,6vw,6.6rem)] leading-[0.98] tracking-[0.002em]">
            {part.title}
          </h3>

          <p className="mt-7 max-w-3xl text-lg font-semibold leading-8 text-black/74 sm:text-xl sm:leading-9">
            {part.definition}
          </p>

          <p className="mt-5 max-w-2xl text-base leading-8 text-black/58">
            {part.marketing}
          </p>

          <BrandButton href={part.href} tone={part.buttonTone} className="mt-8">
            Explore {part.title}
            <TextArrow />
          </BrandButton>
        </div>

        <ImmersiveSquarePhoto
          src={part.image}
          alt={`${part.title} preview`}
          className={isReversed ? "lg:col-start-1" : ""}
        />
      </motion.article>
    </Reveal>
  );
}

export function HomePageClient() {
  return (
    <main className="bg-white">
      <section className="relative isolate min-h-[calc(100svh-80px)] overflow-hidden bg-white">
        <motion.div
          initial={{ scale: 1.03 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 -z-30 bg-white"
        >
          <video
            className="h-full w-full object-cover opacity-100 contrast-[1.02] saturate-[1.08]"
            src={media.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Food Theatre culinary experience video"
          />
        </motion.div>

        <div
          className="absolute inset-0 -z-20"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.62) 38%, rgba(255,255,255,0.22) 70%, rgba(255,255,255,0.05) 100%)"
          }}
        />
        <div className="absolute inset-x-0 bottom-0 -z-20 h-44 bg-gradient-to-t from-white via-white/62 to-transparent" />

        <div className="ft-container relative z-10 flex min-h-[calc(100svh-80px)] flex-col justify-center py-12 sm:py-16">
          <div className="max-w-[980px]">
            <Reveal>
              <LocalLogo eager className="mb-7 h-20 w-20 object-contain sm:h-24 sm:w-24" />
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="ft-display max-w-[1020px] text-[clamp(3.2rem,8.2vw,8rem)] leading-[0.9] tracking-[0.002em]">
                An experiential gastronomic stage
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-7 max-w-3xl border-l-4 border-[var(--ft-pomodori)] pl-5 text-lg font-semibold leading-8 text-black/76 sm:text-xl sm:leading-9">
                Discover food stories, meet the people behind them, and step into culinary moments
                shaped by culture, craft, place, and atmosphere.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8">
                <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-black/58 sm:text-sm">
                  Looking for something new in food?
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <BrandButton href="#experiences" tone="denimPomodori">
                    Explore experiences
                    <TextArrow />
                  </BrandButton>

                  <BrandButton href="#experiences" tone="citrineMenta">
                    See what is happening
                    <TextArrow />
                  </BrandButton>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 max-w-5xl rounded-[2rem] border border-black/10 bg-white/78 p-3 backdrop-blur-md">
                <div className="grid gap-2 md:grid-cols-[1fr_1fr_1fr_auto]">
                  {searchFields.map((field) => (
                    <label
                      key={field.label}
                      className="rounded-[1.4rem] border border-black/10 bg-white/90 px-4 py-3"
                    >
                      <span className="block text-xs font-black uppercase tracking-[0.18em] text-black/42">
                        {field.label}
                      </span>
                      <span className="mt-1 block text-sm font-semibold text-black/64">
                        {field.placeholder}
                      </span>
                    </label>
                  ))}

                  <BrandButton
                    href="#experiences"
                    tone="violaCitrine"
                    className="w-full rounded-[1.4rem] px-6 py-4 md:w-auto"
                  >
                    Find a food moment
                    <TextArrow />
                  </BrandButton>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <PlatformSignalTicker />

      <section
        id="platform"
        className="relative scroll-mt-28 overflow-hidden bg-[#fffdf8] py-16 sm:py-24"
      >
        <div className="pointer-events-none absolute inset-0 ft-brand-grid opacity-55" />

        <div className="ft-container relative">
          <SectionIntro label="The platform" title="A connected Food Theatre world.">
            <p>
              Explore a food ecosystem where guests discover meaningful experiences, Food Characters
              share their craft, and Theatre spaces bring every story to life.
            </p>
            <LocalLogo className="mt-7 h-20 w-20 object-contain" />
          </SectionIntro>

          <div className="mt-14 space-y-6">
            {platformParts.map((part, index) => (
              <PlatformChapter key={part.title} part={part} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="experiences"
        className="relative scroll-mt-28 overflow-hidden bg-white py-16 sm:py-24"
      >
        <div className="ft-container">
          <SectionIntro label="Experiences" title="Curated food moments worth discovering.">
            <p className="text-xl font-semibold leading-9 text-black/70">
              Food experiences that feel personal, atmospheric, and memorable before guests arrive.
            </p>
            <p className="mt-3 text-base leading-8 text-black/58">
              From intimate tables to cultural tastings and creative formats, Experiences help guests
              discover food through story, place, maker, and mood.
            </p>
          </SectionIntro>

          <ExperienceShowcase />

          <div className="mt-14 grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal>
              <CalendarPreview />
            </Reveal>

            <div>
              <Reveal delay={0.05}>
                <div className="overflow-hidden rounded-[2.2rem] border border-black/10 bg-white shadow-[0_18px_55px_rgba(17,17,17,0.06)]">
                  <ImmersiveSquarePhoto
                    src={media.experienceDiscovery}
                    alt="Food Theatre experience discovery"
                    className="rounded-none border-0"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />

                  <div className="p-6">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-black/42">
                      Plan your visit
                    </p>
                    <p className="mt-2 max-w-2xl text-base font-semibold leading-8 text-black/66">
                      Guests can browse by where, when, who, and format, making each food moment
                      easier to understand, choose, and remember.
                    </p>
                  </div>
                </div>
              </Reveal>

              <div className="mt-7 border-y border-black/10">
                {calendarFacets.map((item, index) => (
                  <Reveal key={item.label} delay={index * 0.03}>
                    <motion.div
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 240, damping: 24 }}
                      className="flex flex-col gap-2 border-b border-black/10 py-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="h-4 w-4 rounded-full"
                          style={{ backgroundColor: brandValues[index % brandValues.length].color }}
                        />
                        <h3 className="ft-display text-3xl leading-none">{item.label}</h3>
                      </div>

                      <p className="max-w-md text-sm font-semibold leading-6 text-black/58 sm:text-right">
                        {item.text}
                      </p>
                    </motion.div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.08}>
                <BrandButton href="#experiences" tone="pomodoriViola" className="mt-8">
                  Browse experience ideas
                  <TextArrow />
                </BrandButton>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section
        id="characters"
        className="relative scroll-mt-28 overflow-hidden bg-[#fffdf8] py-16 sm:py-24"
      >
        <div className="pointer-events-none absolute inset-0 ft-brand-grid opacity-55" />

        <div className="ft-container relative">
          <SectionIntro label="Characters" title="Meet the people behind the food.">
            Food Characters are chefs, makers, artisans, creators, hosts, producers, and brands who
            bring taste, culture, craft, health, creativity, and identity into the Food Theatre
            world.
          </SectionIntro>

          <CharacterMosaic />

          <Reveal delay={0.08}>
            <BrandButton href="/food-characters" tone="mentaDenim" className="mt-10">
              Meet all character types
              <TextArrow />
            </BrandButton>
          </Reveal>
        </div>
      </section>

      <section
        id="theatre"
        className="relative scroll-mt-28 overflow-hidden bg-white py-16 sm:py-24"
      >
        <div className="ft-container">
          <SectionIntro label="Theatre" title="Places where food stories unfold.">
            Food Theatre brings together locations, stages, restaurants, homes, and hosted spaces
            where guests can step into food culture instead of only reading about it.
          </SectionIntro>

          <div className="mt-14 grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal>
              <TheatreLoopVideo />
            </Reveal>

            <div className="relative border-y border-black/10">
              <div className="absolute bottom-8 left-[13px] top-8 w-px bg-black/12 sm:left-[17px]" />

              {theatreLayers.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.06}>
                  <motion.div
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 250, damping: 26 }}
                    className="relative flex flex-col gap-4 border-b border-black/10 py-8 pl-12 last:border-b-0"
                  >
                    <span
                      className="absolute left-0 top-9 h-7 w-7 rounded-full border-4 border-white"
                      style={{ backgroundColor: brandValues[(index + 3) % brandValues.length].color }}
                    />
                    <h3 className="ft-display text-[clamp(2.15rem,4.2vw,4.2rem)] leading-[0.95]">
                      {item.title}
                    </h3>
                    <p className="max-w-2xl text-base font-semibold leading-8 text-black/62">
                      {item.text}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.08}>
            <div className="mt-12 overflow-hidden border-y border-black/10 py-5">
              <div className="flex gap-4 overflow-x-auto pb-2">
                {cityCarouselSlots.map((item, index) => (
                  <div
                    key={item.title}
                    className="min-w-[280px] rounded-[1.8rem] border border-black/10 bg-[#fffdf8] p-5"
                  >
                    <span
                      className="block h-5 w-5 rounded-full"
                      style={{ backgroundColor: brandValues[index + 1].color }}
                    />
                    <h3 className="ft-display mt-6 text-3xl">{item.title}</h3>
                    <p className="mt-3 text-sm font-semibold leading-7 text-black/58">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="ft-container">
          <SectionIntro label="Features" title="Designed for meaningful discovery.">
            The platform helps guests feel why an experience matters: the maker, the mood, the place,
            the format, and the story all become part of the decision.
          </SectionIntro>

          <div className="mt-14 space-y-8">
            {featureItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <motion.article
                  whileHover={{ x: index % 2 === 0 ? 8 : -8 }}
                  transition={{ type: "spring", stiffness: 240, damping: 26 }}
                  className={`flex flex-col gap-6 border-y border-black/10 py-7 lg:items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                  }`}
                >
                  <ImmersiveSquarePhoto
                    src={item.image}
                    alt={item.title}
                    className="lg:w-[38%]"
                    sizes="(max-width: 1024px) 100vw, 38vw"
                  />

                  <div className="min-w-0 flex-1">
                    <span
                      className="block h-7 w-7 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <h3 className="ft-display mt-6 max-w-3xl text-[clamp(2.25rem,4.8vw,4.9rem)] leading-[1]">
                      {item.title}
                    </h3>
                    <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-black/58">
                      {item.text}
                    </p>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#fffdf8] py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0 ft-brand-grid opacity-55" />

        <div className="ft-container relative">
          <SectionIntro
            label="Food Theatre stories"
            title="Stories that make the table feel alive."
          >
            <p className="text-xl font-semibold leading-9 text-black/70">
              Food Theatre is not only about booking a seat. It is about the people,
              rituals, places, flavours, and little moments that make every table feel
              personal.
            </p>

            <p className="mt-3 text-base leading-8 text-black/58">
              Follow the makers, discover the atmosphere behind each stage, and step
              closer to the stories shaping a more expressive, memorable, and human
              food culture.
            </p>
          </SectionIntro>

          <TrendingShowcase />
        </div>
      </section>

      <section
        id="join"
        className="relative isolate scroll-mt-28 overflow-hidden bg-[#fffdf8] py-16 sm:py-24"
      >
        <GradientBackground />

        <div className="ft-container relative">
          <SectionIntro
            label="Join the movement"
            title="Get closer to the next Food Theatre moment."
            className="mx-auto max-w-4xl text-center [&>div]:mx-auto"
          >
            <p className="text-xl font-semibold leading-9 text-black/70">
              Join a growing food community built around memorable tables, creative
              Characters, hosted stages, special invitations, and stories worth
              sharing.
            </p>

            <p className="mt-3 text-base leading-8 text-black/58">
              Be part of the early circle around future experiences, rewards,
              backstage access, and food moments designed to bring people together
              through taste, place, and atmosphere.
            </p>
          </SectionIntro>

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
                      Early access
                    </p>

                    <h2 className="ft-display mt-3 max-w-3xl text-[clamp(2.1rem,4vw,4rem)] leading-[1] tracking-[0.002em]">
                      Be part of food stories before everyone talks about them.
                    </h2>

                    <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-black/64 sm:text-base sm:leading-8">
                      Join the Food Theatre community and discover future rewards, invitations,
                      special access, backstage moments, and memorable food experiences as the
                      platform grows.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {["Rewards", "Invitations", "Community", "Backstage access"].map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-black/12 bg-white/38 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-black/64"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <BrandButton href="#" tone="denimPomodori" className="md:justify-self-end">
                    Sign up
                    <TextArrow />
                  </BrandButton>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
