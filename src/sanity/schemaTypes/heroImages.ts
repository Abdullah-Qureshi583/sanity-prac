import { defineField, defineType } from "sanity";

export const heroImages = defineType({
  name: "heroImages",
  title: "Hero Carousel Images",
  type: "document",
  fields: [
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              type: "image",
              title: "Image",
              options: { hotspot: true },
            },
            {
              name: "heading",
              type: "string",
              title: "Heading",
            },
            {
              name: "subHeading",
              type: "string",
              title: "Sub Heading",
            },
          ],
        },
      ],
    }),
  ],
});
