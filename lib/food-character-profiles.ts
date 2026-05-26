export type FoodCharacterCardShape = "circle" | "frame";

export type FoodCharacterCategorySlug =
  | "innovators"
  | "creators"
  | "artisanal"
  | "global"
  | "wellness"
  | "foodcos";

export type FoodCharacterCategory = {
  id: string;
  slug: FoodCharacterCategorySlug;
  label: string;
  pluralLabel: string;
  href: string;
  accentColor: string;
  accentSoftColor: string;
  heroImage: string;
  heroImageAlt: string;
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

  portraitImage: string;
  portraitImageAlt: string;

  cutoutImage: string;
  cutoutImageAlt: string;

  heroImage: string;
  heroImageAlt: string;

  cardHeadline: string;
  cardShape: FoodCharacterCardShape;
  cardImageBoxClassName: string;

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
    id: "category-innovators",
    slug: "innovators",
    label: "Innovators",
    pluralLabel: "Innovators",
    href: "/food-characters/innovators",
    accentColor: "var(--ft-pomodori)",
    accentSoftColor: "rgba(238, 84, 46, 0.16)",
    heroImage: "/media/home/character-innovators.jpg",
    heroImageAlt: "Innovator Food Character preparing a new food experience",
    shortDescription:
      "New techniques, unexpected formats, and fresh ways of experiencing taste.",
    sortOrder: 1,
    isPublished: true,
  },
  {
    id: "category-creators",
    slug: "creators",
    label: "Creators",
    pluralLabel: "Creators",
    href: "/food-characters/creators",
    accentColor: "var(--ft-citrine)",
    accentSoftColor: "rgba(239, 209, 30, 0.18)",
    heroImage: "/media/home/character-creators.jpg",
    heroImageAlt: "Creator Food Character shaping a visual food story",
    shortDescription:
      "Food storytellers shaping flavour, visuals, content, and atmosphere.",
    sortOrder: 2,
    isPublished: true,
  },
  {
    id: "category-artisanal",
    slug: "artisanal",
    label: "Artisanal",
    pluralLabel: "Artisanal Characters",
    href: "/food-characters/artisanal",
    accentColor: "var(--ft-viola)",
    accentSoftColor: "rgba(122, 115, 181, 0.16)",
    heroImage: "/media/home/character-artisanal.jpg",
    heroImageAlt: "Artisanal Food Character shaping handmade food",
    shortDescription:
      "Small makers creating distinctive food through skill, process, and craft.",
    sortOrder: 3,
    isPublished: true,
  },
  {
    id: "category-global",
    slug: "global",
    label: "Global",
    pluralLabel: "Global Characters",
    href: "/food-characters/global",
    accentColor: "var(--ft-blush)",
    accentSoftColor: "rgba(243, 183, 191, 0.22)",
    heroImage: "/media/home/character-global.jpg",
    heroImageAlt: "Global Food Character hosting a cultural food moment",
    shortDescription:
      "Recipes, traditions, memories, and flavours from around the world.",
    sortOrder: 4,
    isPublished: true,
  },
  {
    id: "category-wellness",
    slug: "wellness",
    label: "Wellness",
    pluralLabel: "Wellness Characters",
    href: "/food-characters/wellness",
    accentColor: "var(--ft-menta)",
    accentSoftColor: "rgba(55, 175, 135, 0.16)",
    heroImage: "/media/home/character-wellness.jpg",
    heroImageAlt: "Wellness Food Character preparing a fresh food moment",
    shortDescription:
      "Fresh, balanced, generous food moments shaped around feeling good.",
    sortOrder: 5,
    isPublished: true,
  },
  {
    id: "category-foodcos",
    slug: "foodcos",
    label: "FoodCo.s",
    pluralLabel: "FoodCo.s",
    href: "/food-characters/foodcos",
    accentColor: "var(--ft-denim)",
    accentSoftColor: "rgba(0, 114, 174, 0.16)",
    heroImage: "/media/home/character-foodcos.jpg",
    heroImageAlt: "FoodCo.s Character presenting a branded food experience",
    shortDescription:
      "Restaurants, caterers, producers, operators, and food brands.",
    sortOrder: 6,
    isPublished: true,
  },
];

/**
 * Sanity is now the source of truth for character profiles.
 * Keep this array empty. Do not add local/mock characters here.
 */
export const foodCharacterProfiles: FoodCharacterProfile[] = [];

export function isFoodCharacterCategorySlug(
  value: string
): value is FoodCharacterCategorySlug {
  return foodCharacterCategories.some((category) => category.slug === value);
}

export function getFoodCharacterProfileUrl(
  profile: Pick<FoodCharacterProfile, "category" | "slug">
) {
  return `/food-characters/${profile.category}/${profile.slug}`;
}

export function getFoodCharacterCategoryUrl(category: FoodCharacterCategorySlug) {
  return `/food-characters/${category}`;
}

export function getFoodCharacterCategories() {
  return [...foodCharacterCategories]
    .filter((category) => category.isPublished)
    .sort(
      (firstCategory, secondCategory) =>
        firstCategory.sortOrder - secondCategory.sortOrder
    );
}

export function getFoodCharacterCategory(category: string) {
  return foodCharacterCategories.find(
    (item) => item.slug === category && item.isPublished
  );
}

/**
 * Legacy local-data helpers.
 * These remain only so older imports do not break.
 * They intentionally return no character data because Sanity now owns characters.
 */
export function getFoodCharacterProfiles() {
  return [];
}

export function getFoodCharacterProfilesByCategory(_category: string) {
  return [];
}

export function getFeaturedFoodCharacterProfilesByCategory(_category: string) {
  return [];
}

export function findFoodCharacterProfile(_category: string, _slug: string) {
  return undefined;
}
