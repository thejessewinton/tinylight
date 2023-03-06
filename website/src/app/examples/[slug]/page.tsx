"use client";

import { allExamples, type Examples } from "contentlayer/generated";
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
        <Video.Player
          poster="https://jessewinton.com/images/og.jpg"
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        />
        <Video.Controls className="absolute bottom-0 z-10 w-full flex-1 bg-neutral-900 bg-gradient-to-t transition-opacity duration-1000 ">
          {({ currentTime, duration, handleSeekerClick }) => {
            console.log(currentTime, duration);
            return (
              <div className="flex">
                <div
                  onClick={handleSeekerClick}
                  className="h-2 w-full bg-white"
                >
                  <div
                    className="h-2 origin-left bg-pink-300"
                    style={{ transform: `scaleX(${currentTime / duration})` }}
                  />
                </div>
              </div>
            );
          }}
        </Video.Controls>
      </Video>
    </>
  );
};

export default ExamplesPage;
