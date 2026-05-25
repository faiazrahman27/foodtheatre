import { defineField, defineType } from "sanity";

const foodCharacterCategories = [
  { title: "Innovators", value: "innovators" },
  { title: "Creators", value: "creators" },
  { title: "Artisanal", value: "artisanal" },
  { title: "Global", value: "global" },
  { title: "Wellness", value: "wellness" },
  { title: "FoodCo.s", value: "foodcos" },
];

const cardShapeOptions = [
  { title: "Circle", value: "circle" },
  { title: "Frame", value: "frame" },
];

export const foodCharacter = defineType({
  name: "foodCharacter",
  title: "Food Character",
  type: "document",
  fields: [
    defineField({
      name: "isPublished",
      title: "Published",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "isFeatured",
      title: "Show on category page",
      description:
        "Enable this if the character should appear on its category page poster/card section.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: foodCharacterCategories,
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "name",
      title: "Character name",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (Rule) => Rule.required().max(90),
    }),

    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "location",
      title: "Display location",
      description: "Example: Bologna, Italy",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),

    defineField({
      name: "availability",
      title: "Availability",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(260),
    }),
    defineField({
      name: "relocation",
      title: "Relocation / travel",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(260),
    }),

    defineField({
      name: "portraitImage",
      title: "Normal profile photo",
      description:
        "Used on the individual character page. Upload a normal square or near-portrait photo, not a transparent cutout.",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) => Rule.required().max(140),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "cutoutImage",
      title: "Transparent PNG cutout",
      description:
        "Used only for stylized category/poster cards. Recommended: transparent PNG.",
      type: "image",
      options: {
        hotspot: false,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) => Rule.required().max(140),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heroImage",
      title: "Hero / atmosphere image",
      description:
        "Optional. Can be the same visual direction as the portrait photo for now.",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) => Rule.max(140),
        }),
      ],
    }),

    defineField({
      name: "cardHeadline",
      title: "Category card headline",
      description: 'Example: "Food Story", "Visual Table", "Maker Table".',
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(34),
    }),
    defineField({
      name: "cardShape",
      title: "Category card shape",
      type: "string",
      options: {
        list: cardShapeOptions,
        layout: "radio",
      },
      initialValue: "circle",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cardImageBoxClassName",
      title: "Card image position class",
      description:
        "Keep the default unless a cutout needs manual visual adjustment.",
      type: "string",
      initialValue: "right-0 bottom-[38px] h-[236px] w-[168px]",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "accentColor",
      title: "Accent color",
      description:
        "Use an existing Food Theatre CSS value for now, for example var(--ft-citrine).",
      type: "string",
      initialValue: "var(--ft-citrine)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "accentSoftColor",
      title: "Soft accent color",
      description:
        "Use an rgba value for background glow, for example rgba(239, 209, 30, 0.18).",
      type: "string",
      initialValue: "rgba(239, 209, 30, 0.18)",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "shortIntro",
      title: "Short intro",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(20).max(240),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 6,
      validation: (Rule) => Rule.required().min(80).max(1200),
    }),

    defineField({
      name: "instagram",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "website",
      title: "Website URL",
      type: "url",
    }),
    defineField({
      name: "facebook",
      title: "Facebook URL",
      type: "url",
    }),

    defineField({
      name: "cuisineStyleFormat",
      title: "Cuisine / style / format tags",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "collaborationTypes",
      title: "Collaboration types",
      description:
        "Examples: Daily, 3 times a week, Pop-up, Special events, Food delivery, Private table.",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "bringsToTable",
      title: "What they bring to the table",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "connectedExperiences",
      title: "Connected experiences",
      type: "array",
      of: [
        defineField({
          name: "connectedExperience",
          title: "Connected experience",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "format",
              title: "Format",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "format",
            },
          },
        }),
      ],
    }),

    defineField({
      name: "menu",
      title: "Character menu",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Menu title",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "subtitle",
          title: "Menu subtitle",
          type: "text",
          rows: 2,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "currency",
          title: "Currency",
          type: "string",
          initialValue: "EUR",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "note",
          title: "Menu note",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "sections",
          title: "Menu sections",
          type: "array",
          of: [
            defineField({
              name: "menuSection",
              title: "Menu section",
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Section title",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "items",
                  title: "Menu items",
                  type: "array",
                  of: [
                    defineField({
                      name: "menuItem",
                      title: "Menu item",
                      type: "object",
                      fields: [
                        defineField({
                          name: "name",
                          title: "Item name",
                          type: "string",
                          validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                          name: "description",
                          title: "Description",
                          type: "text",
                          rows: 3,
                          validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                          name: "price",
                          title: "Price",
                          description: "Example: €12",
                          type: "string",
                          validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                          name: "image",
                          title: "Item image",
                          type: "image",
                          options: {
                            hotspot: true,
                          },
                          fields: [
                            defineField({
                              name: "alt",
                              title: "Alt text",
                              type: "string",
                              validation: (Rule) => Rule.max(140),
                            }),
                          ],
                        }),
                        defineField({
                          name: "dietaryTags",
                          title: "Dietary tags",
                          type: "array",
                          of: [{ type: "string" }],
                        }),
                      ],
                      preview: {
                        select: {
                          title: "name",
                          subtitle: "price",
                          media: "image",
                        },
                      },
                    }),
                  ],
                }),
              ],
              preview: {
                select: {
                  title: "title",
                },
              },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "portraitImage",
    },
  },
});
