"use client";

import Image from "next/image";
import { Lightbox } from "tinylight";

const items = [
  {
    src: "https://source.unsplash.com/random/800x600",
    alt: "Image 1",
  },
  {
    src: "https://source.unsplash.com/random/800x500",
    alt: "Image 2",
  },
  {
    src: "https://source.unsplash.com/random/800x700",
    alt: "Image 2",
  },
  {
    src: "https://source.unsplash.com/random/800x400",
    alt: "Image 2",
  },
];

const Demo = () => {
  return (
    <>
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
          <div className="absolute z-10 h-full">
            <Lightbox.Nav direction="previous" className="left-0">
              Previous
            </Lightbox.Nav>
            <Lightbox.Nav direction="next" className="right-0">
              Next
            </Lightbox.Nav>
          </div>
          <Lightbox.Pagination>
            {({ activeItem, itemsCount }) => (
              <p>
                {activeItem + 1} of {itemsCount}
              </p>
            )}
          </Lightbox.Pagination>
        </Lightbox.Portal>
      </Lightbox>
    </>
  );
};

export default Demo;
