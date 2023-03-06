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
  volume: number;
  setVolume: (newVolume: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
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
  volume: 1,
  setVolume: (newVolume) => set({ volume: newVolume }),
  isMuted: false,
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
}));

interface SeekerFnProps {
  type: "skip" | "rewind";
  seconds: number;
}

interface ControlsFnProps
  extends Pick<
    VideoState,
    | "isPlaying"
    | "togglePlay"
    | "duration"
    | "volume"
    | "setVolume"
    | "isMuted"
    | "toggleMute"
    | "currentTime"
  > {
  seek: (props: SeekerFnProps) => void;
  handleSeekerClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

interface ControlsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: MaybeRenderProp<ControlsFnProps>;
}

const Controls = ({ children, ...props }: ControlsProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const { ref, isPlaying, togglePlay, duration, currentTime, setVolume } =
    useVideoStore((state) => ({
      ref: state.ref,
      isPlaying: state.isPlaying,
      togglePlay: state.togglePlay,
      duration: state.duration,
      currentTime: state.currentTime,
      setVolume: state.setVolume,
    }));

  const handleSeek = ({ type, seconds }: SeekerFnProps) => {
    const value = type === "skip" ? seconds : -seconds;
    if (!ref) return;
    ref.currentTime = ref.currentTime + value;
  };

  const toggleMute = () => {
    if (!ref) return;
    setIsMuted(!isMuted);
    ref.volume = ref.volume === 1 ? 0 : 1;
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
        seek: handleSeek,
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
    if (!video) return;
    setDuration(video.duration);
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

  const handleTimeUpdate = (e: SyntheticEvent<HTMLVideoElement>) => {
    setCurrentTime(e.currentTarget.currentTime);
  };

  return (
    <video
      onClick={togglePlay}
      onTimeUpdate={handleTimeUpdate}
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
