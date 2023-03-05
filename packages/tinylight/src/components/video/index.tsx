import type {
  HTMLAttributes,
  MutableRefObject,
  ReactNode,
  SyntheticEvent,
  VideoHTMLAttributes,
} from "react";
import { useState } from "react";
import { useRef } from "react";
import { create } from "zustand";
import type { MaybeRenderProp } from "../../types";
import { runIfFunction, scaleValue } from "../../utils/helpers";
import { useIsomorphicEffect } from "../../utils/hooks";

interface VideoState {
  ref: MutableRefObject<HTMLVideoElement>["current"] | null;
  setRef: (ref: MutableRefObject<HTMLVideoElement>["current"] | null) => void;
  isPlaying: boolean;
  togglePlay: () => void;
  duration: number;
  setDuration: (duration: number) => void;
  currentTime: number;
  setCurrentTime: (currentTime: number) => void;
}

const useVideoStore = create<VideoState>((set) => ({
  ref: null,
  setRef: (ref) => set({ ref }),
  isPlaying: false,
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  duration: 0,
  setDuration: (duration) => set({ duration }),
  currentTime: 0,
  setCurrentTime: (currentTime) => set({ currentTime }),
}));

interface ControlsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: MaybeRenderProp<{
    isPlaying: boolean;
    togglePlay: () => void;
    duration: number;
    currentTime: number;
    rewind: (seconds: number) => void;
    skip: (seconds: number) => void;
    isMuted: boolean;
    toggleMute: () => void;
    volume: number;
    setVolume: (volume: string) => void;
    handleSeekerClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  }>;
}

const Controls = ({ children, ...props }: ControlsProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const { isPlaying, togglePlay, duration, currentTime, ref } = useVideoStore(
    (state) => ({
      ref: state.ref,
      isPlaying: state.isPlaying,
      togglePlay: state.togglePlay,
      duration: state.duration,
      currentTime: state.currentTime,
      setCurrentTime: state.setCurrentTime,
    })
  );

  const handleRewind = (seconds: number) => {
    if (!ref) return;
    ref.currentTime = ref.currentTime - seconds;
  };

  const handleSkip = (seconds: number) => {
    if (!ref) return;
    ref.currentTime = ref.currentTime + seconds;
  };

  const toggleMute = () => {
    if (!ref) return;
    setIsMuted(!isMuted);
    ref.volume = ref.volume === 1 ? 0 : 1;
  };

  const setVolume = (volume: string) => {
    if (!ref) return;
    ref.volume = Number(volume);
  };

  const handleSeekerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref) return;
    const seekerOffset = e.currentTarget.getBoundingClientRect();
    const getSeekTime = scaleValue(
      seekerOffset.left,
      seekerOffset.right,
      0,
      ref.duration
    );

    ref.currentTime = getSeekTime(e.clientX);
  };

  return (
    <div {...props}>
      {runIfFunction(children, {
        isPlaying,
        togglePlay,
        duration,
        currentTime,
        rewind: handleRewind,
        skip: handleSkip,
        isMuted,
        toggleMute,
        volume: ref?.volume ?? 0,
        setVolume,
        handleSeekerClick,
      })}
    </div>
  );
};

interface PlayerProps extends VideoHTMLAttributes<HTMLVideoElement> {
  children?: never;
}

const Player = (props: PlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { togglePlay, isPlaying, setCurrentTime, setDuration, setRef } =
    useVideoStore((state) => ({
      togglePlay: state.togglePlay,
      isPlaying: state.isPlaying,
      setDuration: state.setDuration,
      currentTime: state.currentTime,
      setCurrentTime: state.setCurrentTime,
      setRef: state.setRef,
    }));

  useIsomorphicEffect(() => {
    setRef(videoRef.current);
  }, []);

  useIsomorphicEffect(() => {
    const video = videoRef.current;
    const handlePlay = () => {
      if (!video) return;
      video.play().catch(console.error);
    };

    const handlePause = () => {
      if (!video) return;
      video.pause();
    };

    if (isPlaying) {
      handlePlay();
    } else {
      handlePause();
    }
  }, [isPlaying]);

  const handleLoadMetadata = (event: SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    setDuration(video.duration);
  };

  const handleTimeUpdate = (e: SyntheticEvent<HTMLVideoElement>) => {
    setCurrentTime(e.currentTarget.currentTime);
  };

  return (
    <video
      onClick={togglePlay}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadMetadata}
      ref={videoRef}
      {...props}
    />
  );
};

interface WrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Wrapper = ({ children, ...props }: WrapperProps) => {
  return <div {...props}>{children}</div>;
};

export const Video = Object.assign(Wrapper, { Player, Controls });
