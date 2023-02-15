"use client";

import { TinyLight } from "tinylight";

const Demo = () => {
  return (
    <>
      Test
      <TinyLight>
        <TinyLight.Trigger>Open</TinyLight.Trigger>

        <TinyLight.Items>
          <TinyLight.Item>Sweeet</TinyLight.Item>
        </TinyLight.Items>
      </TinyLight>
    </>
  );
};

export default Demo;
