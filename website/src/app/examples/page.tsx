"use client";

import { Lightbox } from "tinylight";
import Image from "next/image";

const items = [
  {
    src: "https://source.unsplash.com/random/1400x599",
    alt: "Random image 1",
  },
  {
    src: "https://source.unsplash.com/random/1400x600",
    alt: "Random image 2",
  },
  {
    src: "https://source.unsplash.com/random/1400x601",
    alt: "Random image 3",
  },
];

const Examples = () => {
  return (
    <Lightbox>
      <Lightbox.Toggle>Open</Lightbox.Toggle>
      <Lightbox.Portal className="fixed inset-0 z-10">
        <div className="fixed inset-0 bg-black/50 backdrop-blur" />
        <div className="flex h-full flex-col items-center justify-center">
          <Lightbox.Toggle>Close</Lightbox.Toggle>
          <Lightbox.Items className="relative z-20">
            {items.map((item) => (
              <Image
                key={item.src}
                src={item.src}
                alt={item.alt}
                width={800}
                height={600}
              />
            ))}
          </Lightbox.Items>

          <div className="relative z-20 flex flex-col gap-4">
            <nav className="flex w-full justify-between gap-4">
              <Lightbox.Nav direction="previous">Previous</Lightbox.Nav>
              <Lightbox.Nav direction="next">Next</Lightbox.Nav>
            </nav>

            <Lightbox.Pagination>
              {({ activeItem, itemsCount }) => (
                <>
                  {activeItem} / {itemsCount}
                </>
              )}
            </Lightbox.Pagination>
          </div>
        </div>
      </Lightbox.Portal>
    </Lightbox>
  );
};

export default Examples;
