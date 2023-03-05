import type { HTMLAttributes, MutableRefObject, ReactNode } from "react";
import { useRef } from "react";
import { create } from "zustand";
import type { MaybeRenderProp } from "../../types";
import { runIfFunction } from "../../utils/helpers";
import { useIsomorphicEffect } from "../../utils/hooks";

interface VideoState {
  ref: MutableRefObject<HTMLVideoElement>["current"] | null;
  setRef: (ref: MutableRefObject<HTMLVideoElement>["current"] | null) => void;
  isPlaying: boolean;
  togglePlay: () => void;
  duration: number;
  setDuration: (duration: number) => void;
  progress: number;
  setProgress: (progress: number) => void;
}

const useVideoStore = create<VideoState>((set) => ({
  ref: null,
  setRef: (ref) => set({ ref }),
  isPlaying: false,
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  duration: 0,
  setDuration: (duration) => set({ duration }),
  progress: 0,
  setProgress: (progress) => set({ progress }),
}));

interface ControlsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: MaybeRenderProp<{
    isPlaying: boolean;
    togglePlay: () => void;
    duration: number;
    progress: number;
    rewind: (seconds: number) => void;
    skip: (seconds: number) => void;
  }>;
}

const Controls = ({ children, ...props }: ControlsProps) => {
  const { isPlaying, togglePlay, duration, progress, ref } = useVideoStore(
    (state) => ({
      ref: state.ref,
      isPlaying: state.isPlaying,
      togglePlay: state.togglePlay,
      duration: state.duration,
      progress: state.progress,
      setProgress: state.setProgress,
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

  return (
    <div {...props}>
      {runIfFunction(children, {
        isPlaying,
        togglePlay,
        duration,
        progress,
        rewind: handleRewind,
        skip: handleSkip,
      })}
    </div>
  );
};

interface PlayerProps extends HTMLAttributes<HTMLVideoElement> {
  src: string;
  children?: never;
}

const Player = ({ src, ...props }: PlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { togglePlay, isPlaying, setDuration, progress, setProgress, setRef } =
    useVideoStore((state) => ({
      togglePlay: state.togglePlay,
      isPlaying: state.isPlaying,
      setDuration: state.setDuration,
      progress: state.progress,
      setProgress: state.setProgress,
      setRef: state.setRef,
    }));

  useIsomorphicEffect(() => {
    setRef(videoRef.current);
  }, []);

  useIsomorphicEffect(() => {
    const video = videoRef.current;
    const handlePlay = async () => {
      if (!video) return;
      await video.play();
    };

    const handlePause = () => {
      if (!video) return;
      video.pause();
    };

    if (isPlaying) {
      handlePlay().catch(console.error);
    } else {
      handlePause();
    }
  }, [isPlaying]);

  useIsomorphicEffect(() => {
    const video = videoRef.current;

    const handleSetDuration = () => {
      if (!video) return;
      setDuration(video.duration);
    };

    if (!video) return;
    video.addEventListener("setduration", handleSetDuration);
    return () => {
      video.removeEventListener("setduration", handleSetDuration);
    };
  }, []);

  useIsomorphicEffect(() => {
    const video = videoRef.current;

    const handleSetProgress = () => {
      if (!video) return;
      setProgress(video.currentTime);
    };

    if (!video) return;

    const setter = setTimeout(() => {
      video.addEventListener("timeupdate", handleSetProgress);
    }, 1000);

    return () => {
      clearTimeout(setter);
    };
  }, []);

  useIsomorphicEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = progress;
    setProgress(progress);
  }, [progress]);

  return <video onClick={togglePlay} src={src} ref={videoRef} {...props} />;
};

interface WrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Wrapper = ({ children, ...props }: WrapperProps) => {
  return <div {...props}>{children}</div>;
};

export const Video = Object.assign(Wrapper, { Player, Controls });
