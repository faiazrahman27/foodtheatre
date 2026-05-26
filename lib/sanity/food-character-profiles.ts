import {
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

type SanityLabelReference = {
  label?: string | null;
};

type SanityCategoryPreset = {
  label?: string | null;
  slug?: string | null;
  accentColor?: string | null;
  accentSoftColor?: string | null;
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
  dietaryTags?: SanityLabelReference[] | null;
};

type SanityMenuSection = {
  _key?: string;
  title?: string | null;
  items?: SanityMenuItem[] | null;
};

type SanityFoodCharacterDocument = {
  _id?: string;
  categoryPreset?: SanityCategoryPreset | null;

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

  shortIntro?: string | null;
  bio?: string | null;

  instagram?: string | null;
  website?: string | null;
  facebook?: string | null;

  foodStyleTags?: SanityLabelReference[] | null;
  experienceFormats?: SanityLabelReference[] | null;
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
  categoryPreset->{
    label,
    slug,
    accentColor,
    accentSoftColor
  },
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
  shortIntro,
  bio,
  instagram,
  website,
  facebook,
  foodStyleTags[]->{
    label
  },
  experienceFormats[]->{
    label
  },
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
        dietaryTags[]->{
          label
        }
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
    categoryPreset->slug == $category &&
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
    categoryPreset->slug == $category
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

function cleanReferencedLabelArray(
  value: SanityLabelReference[] | null | undefined
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => cleanString(item?.label))
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

function getCardShape(value: unknown): FoodCharacterCardShape | null {
  if (value === "circle" || value === "frame") {
    return value;
  }

  return null;
}

function getImageUrl(image: SanityImageField | null | undefined): string {
  return cleanString(image?.url);
}

function getImageAlt(image: SanityImageField | null | undefined): string {
  return cleanString(image?.alt);
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

    if (!title || !format || !description) {
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
    const imageAlt = getImageAlt(item.image);
    const dietaryTags = cleanReferencedLabelArray(item.dietaryTags);

    if (!name || !description || !price) {
      return;
    }

    mappedItems.push({
      id: cleanString(item._key) || toSafeId(name, `menu-item-${index + 1}`),
      name,
      description,
      price,
      image,
      imageAlt,
      dietaryTags,
    });
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

    if (!title || items.length === 0) {
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

  const categoryPreset = document.categoryPreset;
  const category = cleanString(categoryPreset?.slug);
  const categoryLabel = cleanString(categoryPreset?.label);
  const accentColor = cleanString(categoryPreset?.accentColor);
  const accentSoftColor = cleanString(categoryPreset?.accentSoftColor);

  if (
    !category ||
    !isFoodCharacterCategorySlug(category) ||
    !categoryLabel ||
    !accentColor ||
    !accentSoftColor
  ) {
    return null;
  }

  const id = cleanString(document._id);
  const slug = cleanString(document.slug);
  const name = cleanString(document.name);
  const role = cleanString(document.role);
  const city = cleanString(document.city);
  const country = cleanString(document.country);
  const location = cleanString(document.location);
  const availability = cleanString(document.availability);
  const relocation = cleanString(document.relocation);

  const portraitImage = getImageUrl(document.portraitImage);
  const portraitImageAlt = getImageAlt(document.portraitImage);

  const cutoutImage = getImageUrl(document.cutoutImage);
  const cutoutImageAlt = getImageAlt(document.cutoutImage);

  const heroImage = getImageUrl(document.heroImage);
  const heroImageAlt = getImageAlt(document.heroImage);

  const cardHeadline = cleanString(document.cardHeadline);
  const cardShape = getCardShape(document.cardShape);
  const cardImageBoxClassName = cleanString(document.cardImageBoxClassName);

  const shortIntro = cleanString(document.shortIntro);
  const bio = cleanString(document.bio);

  const cuisineStyleFormat = cleanReferencedLabelArray(document.foodStyleTags);
  const collaborationTypes = cleanReferencedLabelArray(document.experienceFormats);
  const bringsToTable = cleanStringArray(document.bringsToTable);
  const connectedExperiences = mapConnectedExperiences(
    document.connectedExperiences
  );

  const sortOrder = document.sortOrder;
  const isFeatured = document.isFeatured;
  const isPublished = document.isPublished;

  if (
    !id ||
    !slug ||
    !name ||
    !role ||
    !city ||
    !country ||
    !location ||
    !availability ||
    !relocation ||
    !portraitImage ||
    !portraitImageAlt ||
    !cutoutImage ||
    !cutoutImageAlt ||
    !heroImage ||
    !heroImageAlt ||
    !cardHeadline ||
    !cardShape ||
    !cardImageBoxClassName ||
    !shortIntro ||
    !bio ||
    cuisineStyleFormat.length === 0 ||
    collaborationTypes.length === 0 ||
    bringsToTable.length === 0 ||
    typeof sortOrder !== "number" ||
    typeof isFeatured !== "boolean" ||
    typeof isPublished !== "boolean"
  ) {
    return null;
  }

  const menuTitle = cleanString(document.menu?.title);
  const menuSubtitle = cleanString(document.menu?.subtitle);
  const menuCurrency = cleanString(document.menu?.currency);
  const menuNote = cleanString(document.menu?.note);
  const menuSections = mapMenuSections(document.menu?.sections);

  return {
    id,
    category,
    categoryLabel,
    slug,
    name,
    role,
    city,
    country,
    location,

    availability,
    relocation,

    portraitImage,
    portraitImageAlt,

    cutoutImage,
    cutoutImageAlt,

    heroImage,
    heroImageAlt,

    cardHeadline,
    cardShape,
    cardImageBoxClassName,

    accentColor,
    accentSoftColor,

    shortIntro,
    bio,

    instagram: cleanString(document.instagram),
    website: cleanString(document.website),
    facebook: cleanString(document.facebook),

    cuisineStyleFormat,
    collaborationTypes,
    bringsToTable,
    connectedExperiences,

    menu: {
      title: menuTitle,
      subtitle: menuSubtitle,
      currency: menuCurrency,
      note: menuNote,
      sections: menuSections,
    },

    sortOrder,
    isFeatured,
    isPublished,
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
