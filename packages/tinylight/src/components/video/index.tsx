import type {
  HTMLAttributes,
  MutableRefObject,
  ReactNode,
  VideoHTMLAttributes,
  MouseEvent,
} from 'react';
import {
  useCallback,
  useMemo,
  useState,
  useRef,
  createContext,
  useContext,
} from 'react';

import type { MaybeRenderProp } from '../../types';
import { formatTime, runIfFunction, scaleValue } from '../../utils/helpers';
import { useIsomorphicEffect } from '../../utils/hooks';

interface VideoState {
  ref: MutableRefObject<HTMLVideoElement | null>;
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
  skip: (props: SeekProps) => void;
  seekTo: (e: MouseEvent<HTMLDivElement>) => void;
}

const VideoContext = createContext<VideoState | null>(null);

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};

export function VideoProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const skip = useCallback(({ type, seconds }: SeekProps) => {
    if (!ref) return;
    const value = type === 'skip' ? seconds : -seconds;
    ref.current!.currentTime = ref.current!.currentTime + value;
  }, []);

  const seekTo = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!ref) return;
    const seekTargetOffset = e.currentTarget.getBoundingClientRect();
    const getSeekTime = scaleValue(
      seekTargetOffset.left,
      seekTargetOffset.right,
      0,
      ref.current!.duration
    );
    ref.current!.currentTime = getSeekTime(e.clientX);
  }, []);

  const value = useMemo(
    () => ({
      ref,
      isPlaying,
      togglePlay,
      duration,
      setDuration,
      currentTime,
      setCurrentTime,
      volume,
      setVolume,
      isMuted,
      toggleMute,
      skip,
      seekTo,
    }),
    [
      isPlaying,
      togglePlay,
      duration,
      currentTime,
      volume,
      isMuted,
      toggleMute,
      skip,
      seekTo,
    ]
  );

  return (
    <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
  );
}

interface SeekProps {
  type: 'skip' | 'rewind';
  seconds: number;
}

interface ControlsFnProps
  extends Pick<
    VideoState,
    | 'isPlaying'
    | 'togglePlay'
    | 'volume'
    | 'setVolume'
    | 'isMuted'
    | 'toggleMute'
    | 'skip'
    | 'seekTo'
  > {
  duration: {
    formatted: string;
    raw: number;
  };
  currentTime: {
    formatted: string;
    raw: number;
  };
}

interface ControlsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: MaybeRenderProp<ControlsFnProps>;
}

const Controls = ({ children, ...props }: ControlsProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const {
    ref,
    skip,
    seekTo,
    isPlaying,
    togglePlay,
    duration,
    currentTime,
    setVolume,
  } = useVideo();

  const toggleMute = () => {
    if (!ref) return;
    setIsMuted(!isMuted);
    ref.current!.volume = ref.current!.volume === 1 ? 0 : 1;
  };

  return (
    <div {...props}>
      {runIfFunction(children, {
        isPlaying,
        togglePlay,
        duration: {
          formatted: formatTime(duration),
          raw: duration,
        },
        currentTime: {
          formatted: formatTime(currentTime),
          raw: currentTime,
        },
        skip,
        isMuted,
        toggleMute,
        volume: ref?.current?.volume ?? 0,
        setVolume: (newVolume: number) => {
          setVolume(newVolume);
          ref.current!.volume = newVolume;
        },
        seekTo,
      })}
    </div>
  );
};

interface PlayerProps extends VideoHTMLAttributes<HTMLVideoElement> {
  children?: never;
}

const Player = ({ onClick, ...props }: PlayerProps) => {
  const { ref, togglePlay, isPlaying, setCurrentTime, setDuration } =
    useVideo();

  console.log({ volume: ref.current?.volume });

  useIsomorphicEffect(() => {
    const video = ref.current;
    if (!video) return;
    setDuration(video.duration);
  }, []);

  useIsomorphicEffect(() => {
    const video = ref.current;
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

  return (
    <video
      onClick={(e) => {
        onClick?.(e);
        togglePlay();
      }}
      onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
      ref={ref}
      {...props}
    />
  );
};

interface WrapperProps {
  children: ReactNode;
}

const Root = ({ children }: WrapperProps) => {
  return <VideoProvider>{children}</VideoProvider>;
};

export const Video = { Root, Player, Controls };
