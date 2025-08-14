// imageColorType.js
import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category Name",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Category Name",
      validation: (rule) => rule.required(),
    }),
  ],
});
