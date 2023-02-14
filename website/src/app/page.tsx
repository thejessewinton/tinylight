"use client";

import { TinyLight } from "tinylight";
import Image from "next/image";

const items = [
  {
    src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    alt: "A tall, red pine tree overlooking a valley near a lake.",
  },
  {
    src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
    alt: "A lake with a dock.",
  },
];

const Index = () => {
  return (
    <main className="min-h-screen bg-neutral-900">
      <TinyLight>
        <TinyLight.Items>
          {items.map((item, index) => (
            <TinyLight.Item key={index}>
              <Image src={item.src} alt={item.alt} width={800} height={600} />
            </TinyLight.Item>
          ))}
        </TinyLight.Items>
      </TinyLight>
    </main>
  );
};

export default Index;
