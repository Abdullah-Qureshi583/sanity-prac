import { type SchemaTypeDefinition } from "sanity";
import { product } from "./product";
import { color } from "./color";
import { heroImages } from "./heroImages";
import { category } from "./category";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, color, heroImages, category], 
};
