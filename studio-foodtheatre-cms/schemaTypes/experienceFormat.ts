import { defineField, defineType } from "sanity";

export const experienceFormat = defineType({
  name: "experienceFormat",
  title: "Experience Format",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Format label",
      description:
        "Customer-facing format. Example: Pop-up table, Private dinner, Workshop, Tasting, Delivery.",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(60),
    }),
    defineField({
      name: "value",
      title: "Internal value",
      description:
        "Simple reusable value. Example: pop-up-table, private-dinner, workshop.",
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
