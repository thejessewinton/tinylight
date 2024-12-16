import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { capitalize } from 'remeda'

const docs = defineCollection({
  name: 'docs',
  directory: 'src/docs',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    order: z.number(),
  }),
  transform: async (doc, ctx) => {
    const docs = await ctx.collection.documents()
    const idx = docs.findIndex((d) => doc._meta.filePath === d._meta.filePath)
    const mdx = await compileMDX(ctx, doc)

    const getTableOfContents = (markdown: string) => {
      const headings = markdown.match(/#+\s.+/g) || []
      return headings.map((heading) => ({
        value: heading.replace(/#+\s/, ''),
        id: heading.replace(/#+\s/, '').toLowerCase().replace(/ /g, '-'),
      }))
    }

    return {
      ...doc,
      mdx,
      slug: doc.title.toLowerCase().replace(/ /g, '-'),
      group: capitalize(doc._meta.directory),
      tableOfContents: getTableOfContents(doc.content),
      prev: idx > 0 ? docs[idx - 1] : null,
      next: idx < docs.length - 1 ? docs[idx + 1] : null,
    }
  },
})

export default defineConfig({
  collections: [docs],
})
