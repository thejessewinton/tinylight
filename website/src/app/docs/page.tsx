"use client";

import { Code } from "@/components/Code";

const codeSnippet = `import { Lightbox } from "tinylight";

<Lightbox>
  <Lightbox.Toggle className="relative">Open</Lightbox.Toggle>
  <Lightbox.Overlay className="z-0 bg-black/50 backdrop-blur" />
  <Lightbox.Portal className="z-10">
    <Lightbox.Toggle className="absolute top-0 right-0 z-10 p-4">
      Close
    </Lightbox.Toggle>
    <Lightbox.Items className="mx-auto w-auto">
      {items.map((item) => (
        <Image
          key={item.src}
          src={item.src}
          alt={item.alt}
          height={600}
          width={800}
        />
      ))}
    </Lightbox.Items>
          
    <Lightbox.Pagination>
      {({ activeItem, itemsCount }) => (
        <p>
          {activeItem + 1} of {itemsCount}
        </p>
      )}
    </Lightbox.Pagination>
  </Lightbox.Portal>
</Lightbox>`;

const installSnippet = `npm install tinylight`;

const Demo = () => {
  return (
    <>
      <Code hasCopiedCode>{installSnippet}</Code>
      <Code hasCopiedCode filename="Lightbox.tsx">
        {codeSnippet}
      </Code>
    </>
  );
};

export default Demo;
