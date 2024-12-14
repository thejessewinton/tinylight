import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import rehypePrettyCode from 'rehype-pretty-code'

const docs = defineCollection({
  name: 'docs',
  directory: 'src/docs',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    summary: z.string(),
  }),
  transform: async (document, context) => {
    const docs = await context.collection.documents()
    const idx = docs.findIndex(
      (d) => document._meta.filePath === d._meta.filePath,
    )
    const mdx = await compileMDX(context, document, {
      rehypePlugins: [rehypePrettyCode],
    })

    return {
      ...document,
      mdx,
      slug: document.title.toLowerCase().replace(/ /g, '-'),
      prev: idx > 0 ? docs[idx - 1] : null,
      next: idx < docs.length - 1 ? docs[idx + 1] : null,
    }
  },
})

export default defineConfig({
  collections: [docs],
})
