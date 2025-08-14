import { defineField, defineType } from "sanity";

export const heroImages = defineType({
  name: "heroImages",
  title: "Hero Carousel Images",
  type: "document",
  fields: [
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subTitle",
      type: "string",
      title: "Sub Title",
      validation: (rule) => rule.required(),
    }),
  ],
});
