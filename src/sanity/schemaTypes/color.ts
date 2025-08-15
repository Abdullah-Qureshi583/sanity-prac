import { defineField, defineType } from "sanity";

export const color = defineType({
  name: "color",
  title: "Color",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Color Name",
      type: "string",
      validation: (Rule) =>
        Rule.required().custom(async (name, context) => {
          if (!name) return true;

          const { document, getClient } = context;
          const client = getClient({ apiVersion: "2025-08-15" });

          // Find if there is already a color with the same name
          const query = `*[_type == "color" && lower(name) == lower($name) && _id != $id][0]`;
          const params = { name, id: document?._id ?? '' };

          const existing = await client.fetch(query, params);

          if (existing) {
            return "This color already exists. Please select it instead of creating a new one.";
          }

          return true;
        }),
    }),
  ],
});
