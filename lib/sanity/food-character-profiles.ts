import {
  getFoodCharacterCategory,
  isFoodCharacterCategorySlug,
  type FoodCharacterCardShape,
  type FoodCharacterConnectedExperience,
  type FoodCharacterMenuItem,
  type FoodCharacterMenuSection,
  type FoodCharacterProfile,
} from "@/lib/food-character-profiles";
import { sanityClient } from "@/lib/sanity/client";

type SanityImageField = {
  url?: string | null;
  alt?: string | null;
};

type SanityConnectedExperience = {
  _key?: string;
  title?: string | null;
  format?: string | null;
  description?: string | null;
};

type SanityMenuItem = {
  _key?: string;
  name?: string | null;
  description?: string | null;
  price?: string | null;
  image?: SanityImageField | null;
  dietaryTags?: string[] | null;
};

type SanityMenuSection = {
  _key?: string;
  title?: string | null;
  items?: SanityMenuItem[] | null;
};

type SanityFoodCharacterDocument = {
  _id?: string;
  category?: string | null;
  slug?: string | null;
  name?: string | null;
  role?: string | null;
  city?: string | null;
  country?: string | null;
  location?: string | null;
  availability?: string | null;
  relocation?: string | null;

  portraitImage?: SanityImageField | null;
  cutoutImage?: SanityImageField | null;
  heroImage?: SanityImageField | null;

  cardHeadline?: string | null;
  cardShape?: FoodCharacterCardShape | null;
  cardImageBoxClassName?: string | null;

  accentColor?: string | null;
  accentSoftColor?: string | null;

  shortIntro?: string | null;
  bio?: string | null;

  instagram?: string | null;
  website?: string | null;
  facebook?: string | null;

  cuisineStyleFormat?: string[] | null;
  collaborationTypes?: string[] | null;
  bringsToTable?: string[] | null;
  connectedExperiences?: SanityConnectedExperience[] | null;

  menu?: {
    title?: string | null;
    subtitle?: string | null;
    currency?: string | null;
    note?: string | null;
    sections?: SanityMenuSection[] | null;
  } | null;

  sortOrder?: number | null;
  isFeatured?: boolean | null;
  isPublished?: boolean | null;
};

const FOOD_CHARACTER_PROJECTION = `
  _id,
  category,
  name,
  "slug": slug.current,
  role,
  city,
  country,
  location,
  availability,
  relocation,
  portraitImage{
    "url": asset->url,
    alt
  },
  cutoutImage{
    "url": asset->url,
    alt
  },
  heroImage{
    "url": asset->url,
    alt
  },
  cardHeadline,
  cardShape,
  cardImageBoxClassName,
  accentColor,
  accentSoftColor,
  shortIntro,
  bio,
  instagram,
  website,
  facebook,
  cuisineStyleFormat,
  collaborationTypes,
  bringsToTable,
  connectedExperiences[]{
    _key,
    title,
    format,
    description
  },
  menu{
    title,
    subtitle,
    currency,
    note,
    sections[]{
      _key,
      title,
      items[]{
        _key,
        name,
        description,
        price,
        image{
          "url": asset->url,
          alt
        },
        dietaryTags
      }
    }
  },
  sortOrder,
  isFeatured,
  isPublished
`;

const FOOD_CHARACTER_BY_SLUG_QUERY = `
  *[
    _type == "foodCharacter" &&
    isPublished == true &&
    category == $category &&
    slug.current == $slug
  ][0]{
    ${FOOD_CHARACTER_PROJECTION}
  }
`;

const FEATURED_FOOD_CHARACTERS_BY_CATEGORY_QUERY = `
  *[
    _type == "foodCharacter" &&
    isPublished == true &&
    isFeatured == true &&
    category == $category
  ] | order(sortOrder asc, name asc){
    ${FOOD_CHARACTER_PROJECTION}
  }
`;

function cleanString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function cleanStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => cleanString(item))
    .filter((item) => item.length > 0);
}

function toSafeId(value: string, fallback: string): string {
  const safeValue = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  return safeValue || fallback;
}

function getCardShape(value: unknown): FoodCharacterCardShape {
  return value === "frame" ? "frame" : "circle";
}

function getImageUrl(image: SanityImageField | null | undefined): string {
  return cleanString(image?.url);
}

function getImageAlt(
  image: SanityImageField | null | undefined,
  fallback: string
): string {
  return cleanString(image?.alt) || fallback;
}

function mapConnectedExperiences(
  experiences: SanityConnectedExperience[] | null | undefined
): FoodCharacterConnectedExperience[] {
  if (!Array.isArray(experiences)) {
    return [];
  }

  const mappedExperiences: FoodCharacterConnectedExperience[] = [];

  experiences.forEach((experience, index) => {
    const title = cleanString(experience.title);
    const format = cleanString(experience.format);
    const description = cleanString(experience.description);

    if (!title && !format && !description) {
      return;
    }

    mappedExperiences.push({
      id:
        cleanString(experience._key) ||
        toSafeId(title, `connected-experience-${index + 1}`),
      title,
      format,
      description,
    });
  });

  return mappedExperiences;
}

function mapMenuItems(
  items: SanityMenuItem[] | null | undefined
): FoodCharacterMenuItem[] {
  if (!Array.isArray(items)) {
    return [];
  }

  const mappedItems: FoodCharacterMenuItem[] = [];

  items.forEach((item, index) => {
    const name = cleanString(item.name);
    const description = cleanString(item.description);
    const price = cleanString(item.price);
    const image = getImageUrl(item.image);
    const imageAlt = getImageAlt(item.image, name || "Food Theatre menu item");
    const dietaryTags = cleanStringArray(item.dietaryTags);

    if (!name && !description && !price && !image) {
      return;
    }

    const mappedItem: FoodCharacterMenuItem = {
      id: cleanString(item._key) || toSafeId(name, `menu-item-${index + 1}`),
      name,
      description,
      price,
      image,
      imageAlt,
      dietaryTags,
    };

    mappedItems.push(mappedItem);
  });

  return mappedItems;
}

function mapMenuSections(
  sections: SanityMenuSection[] | null | undefined
): FoodCharacterMenuSection[] {
  if (!Array.isArray(sections)) {
    return [];
  }

  const mappedSections: FoodCharacterMenuSection[] = [];

  sections.forEach((section, index) => {
    const title = cleanString(section.title);
    const items = mapMenuItems(section.items);

    if (!title && items.length === 0) {
      return;
    }

    mappedSections.push({
      id:
        cleanString(section._key) ||
        toSafeId(title, `menu-section-${index + 1}`),
      title,
      items,
    });
  });

  return mappedSections;
}

function mapSanityFoodCharacterToProfile(
  document: SanityFoodCharacterDocument | null
): FoodCharacterProfile | null {
  if (!document) {
    return null;
  }

  const category = cleanString(document.category);

  if (!isFoodCharacterCategorySlug(category)) {
    return null;
  }

  const categoryMeta = getFoodCharacterCategory(category);

  if (!categoryMeta) {
    return null;
  }

  const slug = cleanString(document.slug);
  const name = cleanString(document.name);

  if (!slug || !name) {
    return null;
  }

  const role = cleanString(document.role);
  const city = cleanString(document.city);
  const country = cleanString(document.country);
  const location =
    cleanString(document.location) ||
    [city, country].filter(Boolean).join(", ");

  const portraitImage = getImageUrl(document.portraitImage);
  const cutoutImage = getImageUrl(document.cutoutImage);

  if (!portraitImage || !cutoutImage) {
    return null;
  }

  const heroImage = getImageUrl(document.heroImage) || portraitImage;

  const cuisineStyleFormat = cleanStringArray(document.cuisineStyleFormat);
  const collaborationTypes = cleanStringArray(document.collaborationTypes);
  const bringsToTable = cleanStringArray(document.bringsToTable);
  const connectedExperiences = mapConnectedExperiences(
    document.connectedExperiences
  );
  const menuSections = mapMenuSections(document.menu?.sections);

  return {
    id: cleanString(document._id) || `character-${slug}`,
    category,
    categoryLabel: categoryMeta.label,
    slug,
    name,
    role,
    city,
    country,
    location,

    availability: cleanString(document.availability),
    relocation: cleanString(document.relocation),

    portraitImage,
    portraitImageAlt: getImageAlt(
      document.portraitImage,
      `${name}${role ? `, ${role}` : ""}`
    ),

    cutoutImage,
    cutoutImageAlt: getImageAlt(
      document.cutoutImage,
      `${name} transparent cutout`
    ),

    heroImage,
    heroImageAlt: getImageAlt(
      document.heroImage,
      `${name} Food Theatre profile image`
    ),

    cardHeadline: cleanString(document.cardHeadline) || "Food Story",
    cardShape: getCardShape(document.cardShape),
    cardImageBoxClassName:
      cleanString(document.cardImageBoxClassName) ||
      "right-0 bottom-[38px] h-[236px] w-[168px]",

    accentColor: cleanString(document.accentColor) || categoryMeta.accentColor,
    accentSoftColor:
      cleanString(document.accentSoftColor) || categoryMeta.accentSoftColor,

    shortIntro: cleanString(document.shortIntro),
    bio: cleanString(document.bio),

    instagram: cleanString(document.instagram),
    website: cleanString(document.website),
    facebook: cleanString(document.facebook),

    cuisineStyleFormat,
    collaborationTypes,
    bringsToTable,
    connectedExperiences,

    menu: {
      title: cleanString(document.menu?.title) || `${name} Menu`,
      subtitle: cleanString(document.menu?.subtitle),
      currency: cleanString(document.menu?.currency) || "EUR",
      note: cleanString(document.menu?.note),
      sections: menuSections,
    },

    sortOrder: typeof document.sortOrder === "number" ? document.sortOrder : 999,
    isFeatured:
      typeof document.isFeatured === "boolean" ? document.isFeatured : true,
    isPublished:
      typeof document.isPublished === "boolean" ? document.isPublished : true,
  };
}

export async function findFoodCharacterProfileFromSanity(
  category: string,
  slug: string
): Promise<FoodCharacterProfile | null> {
  if (!isFoodCharacterCategorySlug(category)) {
    return null;
  }

  const document = await sanityClient.fetch<SanityFoodCharacterDocument | null>(
    FOOD_CHARACTER_BY_SLUG_QUERY,
    {
      category,
      slug,
    }
  );

  return mapSanityFoodCharacterToProfile(document);
}

export async function getFeaturedFoodCharacterProfilesByCategoryFromSanity(
  category: string
): Promise<FoodCharacterProfile[]> {
  if (!isFoodCharacterCategorySlug(category)) {
    return [];
  }

  const documents = await sanityClient.fetch<SanityFoodCharacterDocument[]>(
    FEATURED_FOOD_CHARACTERS_BY_CATEGORY_QUERY,
    {
      category,
    }
  );

  const profiles: FoodCharacterProfile[] = [];

  documents.forEach((document) => {
    const profile = mapSanityFoodCharacterToProfile(document);

    if (profile) {
      profiles.push(profile);
    }
  });

  return profiles.sort(
    (firstProfile, secondProfile) =>
      firstProfile.sortOrder - secondProfile.sortOrder
  );
}
