"use client";

import { useState } from "react";
import { Lightbox } from "tinylight";
import Image from "next/image";
import { clsx } from "clsx";

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

export const Example = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open lightbox</button>
      <Lightbox open={isOpen} handleClose={closeModal} loop>
        <button onClick={closeModal} className="relative z-20">
          Close
        </button>
        <div className="fixed inset-0 bg-black/50 backdrop-blur" />
        <div className="fixed inset-0 flex h-full flex-col justify-center">
          <Lightbox.Items className="flex items-center justify-center">
            {items.map((item) => (
              <Lightbox.Item key={item.src}>
                {({ isActive }) => (
                  <div
                    key={item.src}
                    className={clsx(
                      isActive ? "opacity-100" : "opacity-0",
                      "transition-opacity duration-1000"
                    )}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={800}
                      height={600}
                    />
                  </div>
                )}
              </Lightbox.Item>
            ))}
          </Lightbox.Items>

          <div className="relative z-20 flex flex-col gap-4">
            <nav className="flex w-full justify-between gap-4">
              <Lightbox.Nav>
                {({ toPrev, toNext }) => (
                  <>
                    <button onClick={toPrev}>Prev</button>
                    <button onClick={toNext}>Next</button>
                  </>
                )}
              </Lightbox.Nav>
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
      </Lightbox>
    </>
  );
};
