import { defineField, defineType } from "sanity";

export const dietaryTag = defineType({
  name: "dietaryTag",
  title: "Dietary Tag",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Dietary label",
      description:
        "Use real dietary labels only. Example: Vegetarian, Vegan, Gluten-free, Dairy-free, Contains nuts.",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(50),
    }),
    defineField({
      name: "value",
      title: "Internal value",
      description:
        "Simple reusable value. Example: vegetarian, vegan, gluten-free, dairy-free.",
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
