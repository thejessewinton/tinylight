'use client'
import { allIndices } from '~/content-collections'

const index = allIndices[0]!

// export const metadata: Metadata = {
//   title: index.title,
//   description: index.description,
// }

export default function Index() {
  return (
    <div className="flex flex-col gap-2 py-24">
      <div className="relative animate-enter">
        <h1 className="group relative mb-4 inline-block w-full text-center font-light text-3xl">
          {index.title}
        </h1>

        <div
          className="prose prose-neutral dark:prose-invert max-w-none space-y-4 font-light prose-a:font-italic prose-a:font-serif! prose-a:no-underline"
          dangerouslySetInnerHTML={{ __html: index.html }}
        />
      </div>
    </div>
  )
}
