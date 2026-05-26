import { defineField, defineType } from "sanity";

export const foodStyleTag = defineType({
  name: "foodStyleTag",
  title: "Taste / Style / Format Tag",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Tag label",
      description:
        "Customer-facing tag. Example: Visual food storytelling, Brunch table, Handmade pasta.",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(60),
    }),
    defineField({
      name: "value",
      title: "Internal value",
      description:
        "Simple reusable value. Example: visual-food-storytelling, brunch-table.",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(80)
          .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
            name: "kebab-case",
            invert: false,
          }),
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "value",
    },
  },
});
