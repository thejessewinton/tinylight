'use client';

import { Video } from 'tinylight';
import * as Slider from '@radix-ui/react-slider';

export default function Home() {
  return (
    <div>
      <main>
        <div className="relative">
          <Video.Root>
            <Video.Player
              className="max-w-lg"
              autoPlay
              src="https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.1080p.vp9.webm"
            />
            <Video.Controls className="absolute bottom-0">
              {(controls) => (
                <div className="flex">
                  {controls.isPlaying ? 'Playing' : 'Paused'}
                  {controls.isMuted ? 'Muted' : 'Unmuted'}
                  <Slider.Root
                    className="relative flex h-5 w-[200px] touch-none select-none items-center"
                    defaultValue={[50]}
                    max={100}
                    step={1}
                    onValueChange={([value]) => {
                      controls.setVolume(value! / 100);
                    }}
                  >
                    <Slider.Track className="relative h-[3px] grow rounded-full bg-blackA7">
                      <Slider.Range className="absolute h-full rounded-full bg-white" />
                    </Slider.Track>
                    <Slider.Thumb
                      className="block size-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA5 focus:outline-none"
                      aria-label="Volume"
                    />
                  </Slider.Root>
                </div>
              )}
            </Video.Controls>
          </Video.Root>
        </div>
      </main>
    </div>
  );
}
