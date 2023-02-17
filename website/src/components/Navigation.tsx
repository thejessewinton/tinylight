export const Navigation = () => {
  return (
    <nav className="sticky top-14 flex w-1/6 flex-col items-center border-r border-dotted border-neutral-700"></nav>
  );
};

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
  {
    src: "https://source.unsplash.com/random/800x600",
    alt: "Image 2",
  },
  {
    src: "https://source.unsplash.com/random/800x600",
    alt: "Image 2",
  },
];

const T = () => {
  return (
    <Lightbox>
      <Lightbox.Toggle>Open</Lightbox.Toggle>
      <Lightbox.Overlay />
      <Lightbox.Portal>
        <Lightbox.Toggle>Close</Lightbox.Toggle>
        <Lightbox.Items>
          {items.map((item) => (
            <img key={item.src} src={item.src} alt={item.alt} />
          ))}
        </Lightbox.Items>

        <Lightbox.Nav direction="previous" className="left-0">
          Previous
        </Lightbox.Nav>
        <Lightbox.Nav direction="next" className="right-0">
          Next
        </Lightbox.Nav>

        <Lightbox.Pagination>
          {({ activeItem, itemsCount }) => (
            <p>
              {activeItem} of {itemsCount}
            </p>
          )}
        </Lightbox.Pagination>
        <Lightbox.Thumbs>
          {items.map((item) => (
            <img key={item.src} src={item.src} alt={item.alt} />
          ))}
        </Lightbox.Thumbs>
      </Lightbox.Portal>
    </Lightbox>
  );
};
