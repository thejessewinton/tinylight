"use client";

import Image from "next/image";
import { Lightbox } from "tinylight";

const items = [
  {
    src: "https://source.unsplash.com/random/800x600",
    alt: "Image 1",
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
        <Lightbox.Trigger>Open</Lightbox.Trigger>

        <Lightbox.Items>
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
        <div className="">
          <Lightbox.Nav direction="previous">Previous</Lightbox.Nav>
          <Lightbox.Nav direction="next">Next</Lightbox.Nav>
        </div>
      </Lightbox>
    </>
  );
};

export default Demo;
