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
      title: "Images for Product",
      description: "Add images for the product",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "productImages",
              type: "array",
              of: [{ type: "image" }],
              title: "Images for Product",
              description: "Add image for the product",
              options: { hotspot: true },
            },
            {
              name: "color",
              type: "reference",
              title: "Color of Product",
              to: [{ type: "color" }],
              // options: {
              //   filter: ({ document, parent }) => {
              //     // Get all selected color IDs from the parent array
              //     const usedColors =
              //       document.images
              //         ?.filter((item): item is any[] => Array.isArray(item))
              //         ?.map((img) => img?.color?._ref)
              //         ?.filter((ref) => ref && ref !== parent?.color?._ref) ||
              //       [];

              //     if (usedColors.length === 0) {
              //       return {};
              //     }

              //     // Filter out already-used colors
              //     return {
              //       filter: `!(_id in $usedColors)`,
              //       params: { usedColors },
              //     };
              //   },
              // },
            },
          ],
        },
      ],

      // validation: (Rule) =>
      //   Rule.custom((images) => {
      //     if (!images) return true;
      //     const colors = images.map((img) => img.color?._ref);
      //     const uniqueColors = new Set(colors);
      //     return colors.length === uniqueColors.size
      //       ? true
      //       : "Each color should be unique in the product images.";
      //   }),
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
      title: "Category of Product",
      to: [{ type: "category" }],
    }),
  ],
});
