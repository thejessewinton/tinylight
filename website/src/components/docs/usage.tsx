export const Usage = async () => {
  const code = `
import * as Lightbox from 'tinylight/lightbox';
import Image from 'next/image';

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
`

  return (
    <div className="space-y-2">
      <h3>Usage</h3>
      <p>
        Import <span className="font-mono">tinylight</span>, and use the
        primitives to compose a lightbox in your app.
      </p>
      <code className="block overflow-scroll rounded-lg bg-neutral-950 p-4 font-mono">
        <pre>{code.trim()}</pre>
      </code>
    </div>
  )
}
