"use client";

import { TinyLight, useLightboxStore } from "tinylight";

const Index = () => {
  const { isOpen } = useLightboxStore();
  return (
    <>
      <h1 className="text-center text-lg text-neutral-200">
        <em className="font-serif">tinylight</em> docs coming soon
      </h1>
    </>
  );
};

export default Index;
