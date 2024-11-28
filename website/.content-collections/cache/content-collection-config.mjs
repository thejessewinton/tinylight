// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";
var index = defineCollection({
  name: "index",
  directory: "src/content",
  include: "index.md",
  schema: (z) => ({
    title: z.string(),
    description: z.string()
  }),
  transform: async (document, context) => {
    const html = await compileMarkdown(context, document);
    return {
      ...document,
      html
    };
  }
});
var content_collections_default = defineConfig({
  collections: [index]
});
export {
  content_collections_default as default
};
