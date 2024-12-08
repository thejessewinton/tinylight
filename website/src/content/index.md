---
title: tinylight
description: A beautifully designed, open source video component for React.
---

A beautifully designed, open source video component for React; work in progress, so check back soon for updates!

```tsx
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
```