export type FoodCharacterCardShape = "circle" | "frame";

export type FoodCharacterCategorySlug =
  | "innovators"
  | "creators"
  | "artisanal"
  | "global"
  | "wellness"
  | "foodcos";

export type FoodCharacterCategory = {
  slug: FoodCharacterCategorySlug;
  label: string;
  pluralLabel: string;
  href: string;
  accentColor: string;
  accentSoftColor: string;
  heroImage: string;
  shortDescription: string;
  sortOrder: number;
  isPublished: boolean;
};

export type FoodCharacterMenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  imageAlt: string;
  dietaryTags?: string[];
};

export type FoodCharacterMenuSection = {
  id: string;
  title: string;
  items: FoodCharacterMenuItem[];
};

export type FoodCharacterConnectedExperience = {
  id: string;
  title: string;
  format: string;
  description: string;
};

export type FoodCharacterProfile = {
  id: string;
  category: FoodCharacterCategorySlug;
  categoryLabel: string;
  slug: string;
  name: string;
  role: string;
  city: string;
  country: string;
  location: string;
  availability: string;
  relocation: string;

  /**
   * Normal profile image used on the individual character page.
   * Recommended: square or near-portrait JPG/WebP/PNG, not transparent cutout.
   */
  portraitImage: string;
  portraitImageAlt: string;

  /**
   * Transparent PNG used only for stylized category/poster cards.
   */
  cutoutImage: string;
  cutoutImageAlt: string;

  /**
   * Immersive hero/atmosphere image.
   * Can temporarily be the same as portraitImage.
   */
  heroImage: string;
  heroImageAlt: string;

  /**
   * Short visual headline shown on category cards.
   * Example: "Food Story", "Visual Table", "Maker Table".
   */
  cardHeadline: string;

  cardShape: FoodCharacterCardShape;
  cardImageBoxClassName: string;

  /**
   * For now these stay as CSS-compatible values.
   * Later Sanity can store a color token or hex value and map it into this format.
   */
  accentColor: string;
  accentSoftColor: string;

  shortIntro: string;
  bio: string;

  instagram: string;
  website: string;
  facebook: string;

  cuisineStyleFormat: string[];
  collaborationTypes: string[];

  bringsToTable: string[];
  connectedExperiences: FoodCharacterConnectedExperience[];

  menu: {
    title: string;
    subtitle: string;
    currency: string;
    note: string;
    sections: FoodCharacterMenuSection[];
  };

  sortOrder: number;
  isFeatured: boolean;
  isPublished: boolean;
};

export const foodCharacterCategories: FoodCharacterCategory[] = [
  {
    slug: "innovators",
    label: "Innovators",
    pluralLabel: "Innovators",
    href: "/food-characters/innovators",
    accentColor: "var(--ft-pomodori)",
    accentSoftColor: "rgba(238, 84, 46, 0.16)",
    heroImage: "/media/home/character-innovators.jpg",
    shortDescription:
      "New techniques, unexpected formats, and fresh ways of experiencing taste.",
    sortOrder: 1,
    isPublished: true,
  },
  {
    slug: "creators",
    label: "Creators",
    pluralLabel: "Creators",
    href: "/food-characters/creators",
    accentColor: "var(--ft-citrine)",
    accentSoftColor: "rgba(239, 209, 30, 0.18)",
    heroImage: "/media/home/character-creators.jpg",
    shortDescription:
      "Food storytellers shaping flavour, visuals, content, and atmosphere.",
    sortOrder: 2,
    isPublished: true,
  },
  {
    slug: "artisanal",
    label: "Artisanal",
    pluralLabel: "Artisanal Characters",
    href: "/food-characters/artisanal",
    accentColor: "var(--ft-viola)",
    accentSoftColor: "rgba(122, 115, 181, 0.16)",
    heroImage: "/media/home/character-artisanal.jpg",
    shortDescription:
      "Small makers creating distinctive food through skill, process, and craft.",
    sortOrder: 3,
    isPublished: true,
  },
  {
    slug: "global",
    label: "Global",
    pluralLabel: "Global Characters",
    href: "/food-characters/global",
    accentColor: "var(--ft-blush)",
    accentSoftColor: "rgba(243, 183, 191, 0.22)",
    heroImage: "/media/home/character-global.jpg",
    shortDescription:
      "Recipes, traditions, memories, and flavours from around the world.",
    sortOrder: 4,
    isPublished: true,
  },
  {
    slug: "wellness",
    label: "Wellness",
    pluralLabel: "Wellness Characters",
    href: "/food-characters/wellness",
    accentColor: "var(--ft-menta)",
    accentSoftColor: "rgba(55, 175, 135, 0.16)",
    heroImage: "/media/home/character-wellness.jpg",
    shortDescription:
      "Fresh, balanced, generous food moments shaped around feeling good.",
    sortOrder: 5,
    isPublished: true,
  },
  {
    slug: "foodcos",
    label: "FoodCo.s",
    pluralLabel: "FoodCo.s",
    href: "/food-characters/foodcos",
    accentColor: "var(--ft-denim)",
    accentSoftColor: "rgba(0, 114, 174, 0.16)",
    heroImage: "/media/home/character-foodcos.jpg",
    shortDescription:
      "Restaurants, caterers, producers, operators, and food brands.",
    sortOrder: 6,
    isPublished: true,
  },
];

export const foodCharacterProfiles: FoodCharacterProfile[] = [
  {
    id: "character-mira-dale",
    category: "creators",
    categoryLabel: "Creators",
    slug: "mira-dale",
    name: "Mira Dale",
    role: "Food Storyteller",
    city: "Bologna",
    country: "Italy",
    location: "Bologna, Italy",
    availability:
      "Available for selected tables, creator-led tastings, and hosted storytelling moments.",
    relocation: "Open to travel for special Food Theatre experiences.",

    portraitImage: "/media/food-characters/creators/mira-dale.jpg",
    portraitImageAlt: "Mira Dale, Food Storyteller",

    cutoutImage: "/media/food-characters/creators/mira-dale-cutout.png",
    cutoutImageAlt: "Mira Dale cutout portrait",

    heroImage: "/media/food-characters/creators/mira-dale.jpg",
    heroImageAlt: "Mira Dale Food Theatre profile image",

    cardHeadline: "Food Story",
    cardShape: "circle",
    cardImageBoxClassName: "right-0 bottom-[38px] h-[236px] w-[168px]",

    accentColor: "var(--ft-citrine)",
    accentSoftColor: "rgba(239, 209, 30, 0.18)",

    shortIntro:
      "Mira turns food into a visual story guests can taste, follow, and remember.",
    bio:
      "Mira Dale is a food storyteller based in Bologna, shaping dining moments around colour, table atmosphere, hosting rhythm, and the emotional memory of food. Her work sits between food culture, visual presentation, and guest experience, making each table feel personal without becoming formal or distant.",

    instagram: "https://instagram.com/",
    website: "https://foodtheatre.com/",
    facebook: "https://facebook.com/",

    cuisineStyleFormat: [
      "Italian-inspired",
      "Visual storytelling",
      "Styled table",
      "Creator-led tasting",
      "Hosted storytelling",
    ],

    collaborationTypes: [
      "Pop-up",
      "Special events",
      "3 times a week",
      "Private table",
    ],

    bringsToTable: [
      "Visual food storytelling for intimate and social tables.",
      "Warm hosting that helps guests understand the idea behind each plate.",
      "Table styling, mood, and story-led presentation.",
      "Creator-friendly formats for content, food culture, and shared moments.",
    ],

    connectedExperiences: [
      {
        id: "story-table",
        title: "Story Table",
        format: "Creator-led tasting",
        description:
          "A guided food moment where guests discover plates through story, atmosphere, and visual detail.",
      },
      {
        id: "visual-tasting",
        title: "Visual Tasting",
        format: "Hosted table",
        description:
          "A colourful tasting format designed for guests who enjoy food, design, and conversation together.",
      },
    ],

    menu: {
      title: "Mira Dale Table Menu",
      subtitle: "A visual food story shaped for Food Theatre guests",
      currency: "EUR",
      note:
        "This menu is sample structured data for the character profile. Later, the same fields can come from Sanity and be rendered into the same branded Food Theatre menu view.",
      sections: [
        {
          id: "opening",
          title: "Opening",
          items: [
            {
              id: "seasonal-welcome-bite",
              name: "Seasonal Welcome Bite",
              description:
                "A small seasonal bite designed to introduce Mira’s colour-led table mood.",
              price: "€7",
              image:
                "/media/food-characters/menus/mira-dale/seasonal-welcome-bite.png",
              imageAlt: "Seasonal welcome bite",
              dietaryTags: ["Seasonal", "Small plate"],
            },
            {
              id: "herb-oil-focaccia",
              name: "Herb Oil Focaccia",
              description:
                "Soft focaccia served with aromatic herb oil and a bright table garnish.",
              price: "€9",
              image:
                "/media/food-characters/menus/mira-dale/herb-oil-focaccia.png",
              imageAlt: "Herb oil focaccia",
              dietaryTags: ["Vegetarian", "Sharing"],
            },
            {
              id: "citrus-table-spritz",
              name: "Citrus Table Spritz",
              description:
                "A fresh citrus drink prepared as a visual opening ritual for the table.",
              price: "€6",
              image:
                "/media/food-characters/menus/mira-dale/citrus-table-spritz.png",
              imageAlt: "Citrus table spritz",
              dietaryTags: ["Drink", "Fresh"],
            },
          ],
        },
        {
          id: "table-story",
          title: "Table Story",
          items: [
            {
              id: "colour-led-vegetable-plate",
              name: "Colour-Led Vegetable Plate",
              description:
                "A plated vegetable composition shaped around colour, freshness, and visual rhythm.",
              price: "€16",
              image:
                "/media/food-characters/menus/mira-dale/colour-led-vegetable-plate.png",
              imageAlt: "Colour-led vegetable plate",
              dietaryTags: ["Vegetarian", "Signature"],
            },
            {
              id: "fresh-cheese-fruit-grain",
              name: "Fresh Cheese, Fruit, and Toasted Grain",
              description:
                "Creamy cheese, seasonal fruit, and toasted grain arranged as a soft visual tasting.",
              price: "€14",
              image:
                "/media/food-characters/menus/mira-dale/fresh-cheese-fruit-grain.png",
              imageAlt: "Fresh cheese, fruit, and toasted grain",
              dietaryTags: ["Vegetarian", "Table story"],
            },
            {
              id: "shared-pasta-garden-herbs",
              name: "Shared Pasta With Garden Herbs",
              description:
                "A generous shared pasta dish with garden herbs and a warm hosted-table feeling.",
              price: "€19",
              image:
                "/media/food-characters/menus/mira-dale/shared-pasta-garden-herbs.png",
              imageAlt: "Shared pasta with garden herbs",
              dietaryTags: ["Sharing", "Italian-inspired"],
            },
          ],
        },
        {
          id: "sweet-finish",
          title: "Sweet Finish",
          items: [
            {
              id: "soft-cream-roasted-fruit",
              name: "Soft Cream, Roasted Fruit, and Edible Flowers",
              description:
                "A gentle dessert plate with roasted fruit, soft cream, and floral colour.",
              price: "€11",
              image:
                "/media/food-characters/menus/mira-dale/soft-cream-roasted-fruit.png",
              imageAlt: "Soft cream, roasted fruit, and edible flowers",
              dietaryTags: ["Dessert", "Visual"],
            },
            {
              id: "small-closing-biscuit",
              name: "Small Closing Biscuit",
              description:
                "A small final sweet bite served as a closing gesture for the table.",
              price: "€4",
              image:
                "/media/food-characters/menus/mira-dale/small-closing-biscuit.png",
              imageAlt: "Small closing biscuit",
              dietaryTags: ["Dessert", "Small bite"],
            },
          ],
        },
      ],
    },

    sortOrder: 1,
    isFeatured: true,
    isPublished: true,
  },
];

export function isFoodCharacterCategorySlug(
  value: string
): value is FoodCharacterCategorySlug {
  return foodCharacterCategories.some((category) => category.slug === value);
}

export function getFoodCharacterProfileUrl(profile: FoodCharacterProfile) {
  return `/food-characters/${profile.category}/${profile.slug}`;
}

export function getFoodCharacterCategoryUrl(category: FoodCharacterCategorySlug) {
  return `/food-characters/${category}`;
}

export function getFoodCharacterCategories() {
  return [...foodCharacterCategories]
    .filter((category) => category.isPublished)
    .sort((firstCategory, secondCategory) => firstCategory.sortOrder - secondCategory.sortOrder);
}

export function getFoodCharacterCategory(category: string) {
  return foodCharacterCategories.find(
    (item) => item.slug === category && item.isPublished
  );
}

export function getFoodCharacterProfiles() {
  return [...foodCharacterProfiles]
    .filter((profile) => profile.isPublished)
    .sort((firstProfile, secondProfile) => firstProfile.sortOrder - secondProfile.sortOrder);
}

export function getFoodCharacterProfilesByCategory(category: string) {
  return getFoodCharacterProfiles().filter((profile) => profile.category === category);
}

export function getFeaturedFoodCharacterProfilesByCategory(category: string) {
  return getFoodCharacterProfilesByCategory(category).filter(
    (profile) => profile.isFeatured
  );
}

export function findFoodCharacterProfile(category: string, slug: string) {
  return foodCharacterProfiles.find(
    (profile) =>
      profile.category === category &&
      profile.slug === slug &&
      profile.isPublished
  );
}
