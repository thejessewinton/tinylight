"use client";

import { getIndex } from "@/utils/content";
import type { Metadata } from "next";
import { Video } from "tinylight";

const Index = () => {
  const data = getIndex();

  return (
    <div className="flex flex-col gap-2 pb-4">
      <div className="animate-enter relative z-50">
        <h1 className="group relative mb-4 inline-block w-full max-w-xs cursor-pointer font-medium">
          {data.title}
        </h1>

        <div className="font-light">
          <Video className="group relative flex items-center justify-center">
            {({ isPlaying }) => (
              <>
                <Video.Player
                  poster="https://jessewinton.com/images/og.jpg"
                  src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  className={isPlaying ? "border-2 border-green-500" : ""}
                />
                <Video.Controls className="absolute bottom-0 z-10 w-full flex-1 bg-neutral-900 bg-gradient-to-t transition-opacity duration-1000 ">
                  {({
                    currentTime,
                    duration,
                    isMuted,
                    seekTo,
                    volume,
                    setVolume,
                    toggleMute,
                  }) => {
                    return (
                      <div className="flex">
                        <div onClick={seekTo} className="h-2 w-full bg-white">
                          <div
                            className="h-2 origin-left bg-pink-300"
                            style={{
                              transform: `scaleX(${
                                currentTime.raw / duration.raw
                              })`,
                            }}
                          />
                        </div>
                        {isMuted ? "Muted" : "Unmuted"}
                        <input
                          type="range"
                          defaultValue={volume * 100}
                          onChange={(e) => {
                            setVolume(e.target.value);
                          }}
                        />
                        <button onClick={toggleMute}>Toggler</button>
                      </div>
                    );
                  }}
                </Video.Controls>
              </>
            )}
          </Video>
        </div>
      </div>
    </div>
  );
};

export default Index;
