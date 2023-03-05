"use client";

import { allExamples, type Examples } from "contentlayer/generated";
import { type Metadata } from "next";
import { Mdx } from "@/components/Mdx";
import { Video } from "tinylight";

interface ExamplesPageProps {
  params: {
    slug: string;
  };
}

// export const generateMetadata = ({ params }: ExamplesPageProps): Metadata => {
//   const doc = allExamples.find(
//     (doc) => doc.slugAsParams === params.slug
//   ) as Examples;

//   return {
//     title: doc.title,
//     description: doc.description,
//   };
// };

const ExamplesPage = ({ params }: ExamplesPageProps) => {
  const slug = params?.slug || "";
  const doc = allExamples.find((doc) => doc.slugAsParams === slug) as Examples;

  return (
    <>
      <Mdx code={doc.body.code} />
      <Video className="group relative flex items-center justify-center">
        <Video.Player src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
        <Video.Controls className="absolute bottom-0 z-10 w-full flex-1 bg-neutral-900 bg-gradient-to-t opacity-0 transition-opacity duration-1000 group-hover:opacity-100">
          {({ isPlaying, togglePlay, rewind, skip, toggleMute, isMuted }) => (
            <div className="flex">
              <button onClick={togglePlay}>
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button onClick={toggleMute}>
                {isMuted ? "Unmute" : "Mute"}
              </button>
              <button onClick={() => rewind(10)}>Rewind 10s</button>
              <button onClick={() => skip(10)}>Skip 10s</button>
            </div>
          )}
        </Video.Controls>
      </Video>
    </>
  );
};

export default ExamplesPage;
