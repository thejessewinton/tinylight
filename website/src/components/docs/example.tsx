'use client'

import { Lightbox } from '@tinylight-ui/lightbox'
import Image from 'next/image'
import { Button } from '../button'

export const Example = () => {
  return (
    <div className="space-y-2" id="example">
      <h3 className="font-bold">Example</h3>

      <Lightbox.Root>
        <Lightbox.Trigger asChild>
          <Button className="mt-4 w-1/2 bg-neutral-100! text-neutral-900">
            Open Lightbox
          </Button>
        </Lightbox.Trigger>

        <Lightbox.Content title="Lightbox" description="Lightbox desc">
          <Lightbox.Close aria-label="Close" />
          <Lightbox.Items>
            <Lightbox.Image asChild>
              <Image
                src="https://placehold.co/1400x2200/png"
                width={1400}
                height={2200}
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
                src="https://placehold.co/960x650/png"
                width={960}
                height={650}
                alt="Placeholder"
              />
            </Lightbox.Image>
            <Lightbox.Image asChild>
              <Image
                src="https://placehold.co/1300x500/png"
                width={1300}
                height={500}
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
            </Lightbox.Image>{' '}
            <Lightbox.Image asChild>
              <Image
                src="https://placehold.co/960x650/png"
                width={960}
                height={650}
                alt="Placeholder"
              />
            </Lightbox.Image>
            <Lightbox.Video
              poster="https://placehold.co/960x540/png"
              controls
              preload="auto"
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
            />
          </Lightbox.Items>
          <div className="flex items-center justify-between">
            <Lightbox.PrevButton />
            <Lightbox.Thumbs />
            <Lightbox.NextButton />
          </div>
        </Lightbox.Content>
      </Lightbox.Root>
    </div>
  )
}
