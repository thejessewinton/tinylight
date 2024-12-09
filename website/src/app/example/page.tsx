'use client'

import Image from 'next/image'
import { Lightbox } from 'tinylight'

export default function Example() {
  return (
    <div>
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
          <div className="flex justify-between">
            <Lightbox.Prev />
            <Lightbox.Thumbs />
            <Lightbox.Next />
          </div>
        </Lightbox.Content>
      </Lightbox.Root>
    </div>
  )
}
