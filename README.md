# tinylight 🎉

---

tinylight is a tiny, ustyled, unopinionated lightbox component for React projects, built as a set of lightweight primitives. The primitives handle the heavy lifting of state management, letting you focus on other, more important parts of your project. If you have any suggestions as I'm developing, please open an issue or a PR! I'd love to get feedback from other devs who have encountered similar issues.

# What this is

## The core principle behind tinylight has take a lot of inspiration from libraries like [HeadlessUI](https://headlessui.com) or [Radix](https://radix-ui.com). I'm a big fan of both, and I wanted to create something similar for components that I've found are less often considered. Right now, that means lightboxes, but the idea is to expand this to some other components as well, and the roadmap includes an oEmbed container for custom Vimeo and YouTube players, with hooks to customize controls, and HTML video and audio components.

## Installation

First, install tinylight using your package manager of choice.

```bash title="pnpm (recommended)"
pnpm install tinylight
```

```bash title="yarn"
yarn install tinylight
```

```bash title="npm"
npm install tinylight
```

Then, import it into your component:

```tsx
import { Lightbox } from "tinylight";
```

## And build away!

## Usage

I'm in process of building out more detailed examples, but in the meantime here is a fully-functional, but unstyled, version of the component with all currently stable features.
Note, that the API has changed a bit; you should now manage the open and closed state of the lightbox within your application.

```tsx title="Lightbox.tsx"
import { useState } from "react";
import { Lightbox as LightboxPrimitive } from "tinylight";

export const Lightbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <button onClick={handleOpen}>Open Lightbox</button>
      <LightboxPrimitive open={isOpen}>
        <button onClick={handleOpen} className="relative z-20">
          Close
        </button>
        <div className="fixed inset-0 bg-black/50 backdrop-blur" />
        <div className="fixed inset-0 flex h-full flex-col items-center justify-center">
          <LightboxPrimitive.Items className="relative z-20">
            {items.map((item) => (
              <Image
                key={item.src}
                src={item.src}
                alt={item.alt}
                width={800}
                height={600}
              />
            ))}
          </LightboxPrimitive.Items>
          <div className="relative z-20 flex flex-col gap-4">
            <nav className="flex w-full justify-between gap-4">
              <LightboxPrimitive.Nav>
                {({ toPrev, toNext }) => (
                  <>
                    <button onClick={toPrev}>Prev</button>
                    <button onClick={toNext}>Next</button>
                  </>
                )}
              </LightboxPrimitive.Nav>
            </nav>
            <LightboxPrimitive.Pagination>
              {({ activeItem, itemsCount }) => (
                <>
                  {activeItem} / {itemsCount}
                </>
              )}
            </LightboxPrimitive.Pagination>
          </div>
        </div>
      </LightboxPrimitive>
    </>
  );
};
```

## In Progress

- [x] Basic lightbox functionality
- [x] Pagination
- [ ] Thumbnails
- [ ] Drop-in animated slides

## Roadmap

- [ ] Make the primitives headless.
- [ ] Allow for multiple lightboxes on the same page.
- [ ] Make all the components fully accessible.
- [ ] Add component primitives to handle video components.
- [ ] Add component primitives to handle iframe components for external video providers.
