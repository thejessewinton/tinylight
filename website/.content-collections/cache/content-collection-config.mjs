// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypePrettyCode from "rehype-pretty-code";
var docs = defineCollection({
  name: "docs",
  directory: "src/docs",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    summary: z.string()
  }),
  transform: async (document, context) => {
    const docs2 = await context.collection.documents();
    const idx = docs2.findIndex(
      (d) => document._meta.filePath === d._meta.filePath
    );
    const mdx = await compileMDX(context, document, {
      rehypePlugins: [rehypePrettyCode]
    });
    return {
      ...document,
      mdx,
      slug: document.title.toLowerCase().replace(/ /g, "-"),
      prev: idx > 0 ? docs2[idx - 1] : null,
      next: idx < docs2.length - 1 ? docs2[idx + 1] : null
    };
  }
});
var content_collections_default = defineConfig({
  collections: [docs]
});
export {
  content_collections_default as default
};
