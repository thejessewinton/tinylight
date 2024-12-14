export const Usage = () => {
  const code = `
import { Lightbox } from '@tinylight-ui/lightbox';
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
    <Lightbox.Controls>
      <Lightbox.PrevButton />
      <Lightbox.Thumbs />
      <Lightbox.NextButton />
    </Lightbox.Controls>
  </Lightbox.Content>
</Lightbox.Root>
`

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="font-bold">Composition</h3>
        <p>
          tinylight supports image and video slides with{' '}
          <span className="font-mono">{`<Lightbox.Image />`}</span> and{' '}
          <span className="font-mono">{`<Lightbox.Video />`}</span> . These each
          accept an optional <span className="font-mono">asChild</span> prop
          which will pass the props down and render the child component as the
          slide.
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="font-bold">Usage</h3>
        <p>
          Import <span className="font-mono">@tinylight-ui/lightbox</span>, and
          compose a lightbox in your app. Below is a basic example within
          Next.js, using the <span className="font-mono">next/image</span>{' '}
          component.
        </p>
      </div>
      <code className="mt-4 block overflow-scroll rounded-lg bg-neutral-950 p-4 font-mono">
        <pre>{code.trim()}</pre>
      </code>
    </div>
  )
}
