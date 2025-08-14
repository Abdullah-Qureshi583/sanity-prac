import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title of Product",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title:"Images for Product",
      description:"Add images for the product",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "productImages",
              type: "array",
              of: [{ type: "image" }],
              title:"Images for Product",
              description:"Add image for the product",
              options: { hotspot: true },

            },
            {
              name: "color",
              type: "reference",
              title:"Color of Product",
              to: [{ type: "color" }],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "price",
      type: "number",
      title: "Price of Product",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "reference",
      title:"Category of Product",
      to: [{ type: "category" }],
    }),
  ],
});
