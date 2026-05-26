import { defineField, defineType } from "sanity";

const categorySlugOptions = [
  { title: "Innovators", value: "innovators" },
  { title: "Creators", value: "creators" },
  { title: "Artisanal", value: "artisanal" },
  { title: "Global", value: "global" },
  { title: "Wellness", value: "wellness" },
  { title: "FoodCo.s", value: "foodcos" },
];

const accentColorOptions = [
  { title: "Citrine — var(--ft-citrine)", value: "var(--ft-citrine)" },
  { title: "Denim — var(--ft-denim)", value: "var(--ft-denim)" },
  { title: "Viola — var(--ft-viola)", value: "var(--ft-viola)" },
  { title: "Blush — var(--ft-blush)", value: "var(--ft-blush)" },
  { title: "Menta — var(--ft-menta)", value: "var(--ft-menta)" },
  { title: "Pomodori — var(--ft-pomodori)", value: "var(--ft-pomodori)" },
];

const softAccentColorOptions = [
  {
    title: "Citrine soft — rgba(239, 209, 30, 0.18)",
    value: "rgba(239, 209, 30, 0.18)",
  },
  {
    title: "Denim soft — rgba(0, 114, 174, 0.16)",
    value: "rgba(0, 114, 174, 0.16)",
  },
  {
    title: "Viola soft — rgba(122, 115, 181, 0.16)",
    value: "rgba(122, 115, 181, 0.16)",
  },
  {
    title: "Blush soft — rgba(243, 183, 191, 0.22)",
    value: "rgba(243, 183, 191, 0.22)",
  },
  {
    title: "Menta soft — rgba(55, 175, 135, 0.16)",
    value: "rgba(55, 175, 135, 0.16)",
  },
  {
    title: "Pomodori soft — rgba(238, 84, 46, 0.16)",
    value: "rgba(238, 84, 46, 0.16)",
  },
];

export const foodCharacterCategoryPreset = defineType({
  name: "foodCharacterCategoryPreset",
  title: "Food Character Category Preset",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Category label",
      description: "Customer-facing category name shown on the website.",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(40),
    }),
    defineField({
      name: "slug",
      title: "Category slug",
      description:
        "Must match the website route. Example: creators, innovators, foodcos.",
      type: "string",
      options: {
        list: categorySlugOptions,
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "accentColor",
      title: "Accent color",
      description:
        "Main color used for this category on character cards and profile pages.",
      type: "string",
      options: {
        list: accentColorOptions,
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "accentSoftColor",
      title: "Soft accent color",
      description:
        "Soft background glow color used on profile pages and category visuals.",
      type: "string",
      options: {
        list: softAccentColorOptions,
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "slug",
    },
  },
});
