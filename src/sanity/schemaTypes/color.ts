// imageColorType.js
import { defineField, defineType } from "sanity";

export const color = defineType({
  name: "color",
  title: "Color Name",
  type: "document",
  fields: [defineField({ name: "name", type: "string", title: "Color Name" })],
});
