"use client";

import Image from "next/image";
import { Lightbox } from "tinylight";

const items = [
  {
    src: "https://source.unsplash.com/random/800x600",
    alt: "Image 1",
  },
  {
    src: "https://source.unsplash.com/random/800x600",
    alt: "Image 2",
  },
];

const Demo = () => {
  return (
    <>
      <Lightbox>
        <Lightbox.Trigger>Open</Lightbox.Trigger>
        <Lightbox.Items>
          <Lightbox.Overlay>
            {items.map((item, i) => (
              <Lightbox.Item key={i}>
                <Image src={item.src} alt={item.alt} height={600} width={800} />
              </Lightbox.Item>
            ))}
            <div className="absolute top-0 right-0 p-6">
              <Lightbox.Nav direction="previous">Previous</Lightbox.Nav>
              <Lightbox.Nav direction="next">Next</Lightbox.Nav>
            </div>
          </Lightbox.Overlay>
        </Lightbox.Items>
      </Lightbox>
    </>
  );
};

export default Demo;
