'use client'
import Image from 'next/image'
import { Lightbox } from 'tinylight'
import { allIndices } from '~/content-collections'

const index = allIndices[0]!

// export const metadata: Metadata = {
//   title: index.title,
//   description: index.description,
// }

export default function Index() {
  return (
    <div className="flex flex-col gap-2 pb-4">
      <div className="relative animate-enter">
        <h1 className="group relative mb-4 inline-block w-full font-medium">
          {index.title}
        </h1>

        <Lightbox.Root>
          <Lightbox.Trigger>
            <Image
              src="https://placehold.co/800x400/png"
              width={800}
              height={400}
              alt="Placeholder"
            />
          </Lightbox.Trigger>

          <Lightbox.Content title="Lightbox" description="Lightbox desc">
            <Lightbox.Close aria-label="Close" />
            <Lightbox.Items>
              <Lightbox.Image asChild>
                <Image
                  src="https://placehold.co/800x400/png"
                  width={800}
                  height={400}
                  alt="Placeholder"
                />
              </Lightbox.Image>
              <Lightbox.Image asChild>
                <Image
                  src="https://placehold.co/1200x670/png"
                  width={1200}
                  height={670}
                  alt="Placeholder"
                />
              </Lightbox.Image>
              <Lightbox.Video
                poster="https://placehold.co/1920x1080/png"
                controls
                src="https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.1080p.vp9.webm"
              />
            </Lightbox.Items>
            <div className="flex justify-between">
              <Lightbox.Prev />
              <Lightbox.Thumbs />
              <Lightbox.Next />
            </div>
          </Lightbox.Content>
        </Lightbox.Root>

        <div
          className="prose prose-neutral dark:prose-invert max-w-none space-y-4 font-light prose-a:font-italic prose-a:font-serif! prose-a:no-underline"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{ __html: index.html }}
        />
      </div>
    </div>
  )
}
