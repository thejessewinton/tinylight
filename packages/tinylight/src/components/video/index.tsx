import type { HTMLAttributes, ReactNode } from "react";
import { useRef } from "react";
import { create } from "zustand";
import type { MaybeRenderProp } from "../../types";
import { formatTime, runIfFunction } from "../../utils/helpers";
import { useIsomorphicEffect } from "../../utils/hooks";

interface VideoState {
  isPlaying: boolean;
  togglePlay: () => void;
  duration: string;
  setDuration: (duration: number) => void;
  progress: string;
  setProgress: (progress: number) => void;
}

const useVideoStore = create<VideoState>((set) => ({
  isPlaying: false,
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  duration: "",
  setDuration: (duration) => set({ duration: formatTime(duration) }),
  progress: "",
  setProgress: (progress) => set({ progress: formatTime(progress) }),
}));

interface ControlsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: MaybeRenderProp<{
    isPlaying: boolean;
    togglePlay: () => void;
    duration: string;
    progress: string;
  }>;
}

const Controls = ({ children, ...props }: ControlsProps) => {
  const { isPlaying, togglePlay, duration, progress } = useVideoStore(
    (state) => ({
      isPlaying: state.isPlaying,
      togglePlay: state.togglePlay,
      duration: state.duration,
      progress: state.progress,
      setProgress: state.setProgress,
    })
  );

  return (
    <div {...props}>
      {runIfFunction(children, {
        isPlaying,
        togglePlay,
        duration,
        progress,
      })}
    </div>
  );
};

type SeekerProps = HTMLAttributes<HTMLButtonElement>;

const Seeker = (props: SeekerProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isDragging = useRef<boolean>(false);
  const buttonWidth = useRef<number>(0);

  const { setProgress, duration } = useVideoStore((state) => ({
    duration: state.duration,
    setProgress: state.setProgress,
  }));

  useIsomorphicEffect(() => {
    buttonWidth.current = buttonRef.current?.offsetWidth ?? 0;

    const handleMouseDown = (event: MouseEvent) => {
      isDragging.current = true;
      const buttonPosition = buttonRef.current?.getBoundingClientRect();
      const buttonOffset = buttonPosition?.left ?? 0;
      const startPosition = event.clientX;
      const startOffset = startPosition - buttonOffset;

      const handleMouseMove = (event: MouseEvent) => {
        if (isDragging.current) {
          const position = event.clientX - startOffset;
          const maxPosition = window.innerWidth - buttonWidth.current;
          const newPosition = Math.min(Math.max(0, position), maxPosition);
          const progress = newPosition / maxPosition;
          const time = progress * Number(duration);
          setProgress(time);
        }
      };

      const handleMouseUp = () => {
        isDragging.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    buttonRef.current?.addEventListener("mousedown", handleMouseDown);

    return () => {
      buttonRef.current?.removeEventListener("mousedown", handleMouseDown);
    };
  }, [duration]);

  return (
    <button ref={buttonRef} {...props}>
      Draggable Seek Button
    </button>
  );
};

interface PlayerProps extends HTMLAttributes<HTMLVideoElement> {
  src: string;
  children?: never;
}

const Player = ({ src, children, ...props }: PlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { togglePlay, isPlaying, setDuration, setProgress } = useVideoStore(
    (state) => ({
      togglePlay: state.togglePlay,
      isPlaying: state.isPlaying,
      setDuration: state.setDuration,
      setProgress: state.setProgress,
    })
  );

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

  return (
    <video onClick={togglePlay} src={src} ref={videoRef} {...props}>
      {children}
    </video>
  );
};

interface WrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Wrapper = ({ children, ...props }: WrapperProps) => {
  return <div {...props}>{children}</div>;
};

export const Video = Object.assign(Wrapper, { Player, Controls, Seeker });
