'use client'

import { Lightbox } from '@tinylight/lightbox'
import Image from 'next/image'

export const Example = () => {
  return (
    <div className="space-y-2">
      <h3>Example</h3>

      <Lightbox.Root>
        <div className="flex justify-between gap-4">
          <Lightbox.Trigger>
            <Image
              src="https://placehold.co/800x400/png"
              width={800}
              height={400}
              alt="Placeholder"
            />
          </Lightbox.Trigger>
          <Lightbox.Trigger>
            <Image
              src="https://placehold.co/800x400/png"
              width={800}
              height={400}
              alt="Placeholder"
            />
          </Lightbox.Trigger>
        </div>

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
                src="https://placehold.co/800x400/png"
                width={800}
                height={400}
                alt="Placeholder"
              />
            </Lightbox.Image>
            <Lightbox.Image asChild>
              <Image
                src="https://placehold.co/800x400/png"
                width={800}
                height={400}
                alt="Placeholder"
              />
            </Lightbox.Image>

            <Lightbox.Video
              poster="https://placehold.co/1920x1080/png"
              controls
              src="https://www.w3schools.com/html/mov_bbb.mp4"
            />
          </Lightbox.Items>
          <div className="flex items-center justify-between">
            <Lightbox.Prev />
            <Lightbox.Thumbs />
            <Lightbox.Next />
          </div>
        </Lightbox.Content>
      </Lightbox.Root>
    </div>
  )
}