import type {
  HTMLAttributes,
  MutableRefObject,
  ReactNode,
  SyntheticEvent,
  VideoHTMLAttributes,
  MouseEvent,
} from 'react'
import {
  useCallback,
  useMemo,
  useState,
  useRef,
  createContext,
  useContext,
} from 'react'

import type { MaybeRenderProp } from '../../types'
import { formatTime, runIfFunction, scaleValue } from '../../utils/helpers'
import { useIsomorphicEffect } from '../../utils/hooks'

interface VideoState {
  ref: MutableRefObject<HTMLVideoElement>['current'] | null
  setRef: (ref: MutableRefObject<HTMLVideoElement>['current'] | null) => void
  isPlaying: boolean
  togglePlay: () => void
  duration: number
  setDuration: (duration: number) => void
  currentTime: number
  setCurrentTime: (currentTime: number) => void
  volume: number
  setVolume: (newVolume: number) => void
  isMuted: boolean
  toggleMute: () => void
  skip: (props: SeekProps) => void
  seekTo: (e: MouseEvent<HTMLDivElement>) => void
}

const VideoContext = createContext<VideoState | null>(null)

export function useVideo() {
  const context = useContext(VideoContext)
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider')
  }
  return context
}

export function VideoProvider({ children }: { children: ReactNode }) {
  const [ref, setRef] = useState<
    MutableRefObject<HTMLVideoElement>['current'] | null
  >(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
  }, [])

  const skip = useCallback(
    ({ type, seconds }: SeekProps) => {
      if (!ref) return
      const value = type === 'skip' ? seconds : -seconds
      ref.currentTime = ref.currentTime + value
    },
    [ref],
  )

  const seekTo = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!ref) return
      const seekToerOffset = e.currentTarget.getBoundingClientRect()
      const getSeekTime = scaleValue(
        seekToerOffset.left,
        seekToerOffset.right,
        0,
        ref.duration,
      )
      ref.currentTime = getSeekTime(e.clientX)
    },
    [ref],
  )

  const value = useMemo(
    () => ({
      ref,
      setRef,
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
      ref,
      isPlaying,
      togglePlay,
      duration,
      currentTime,
      volume,
      isMuted,
      toggleMute,
      skip,
      seekTo,
    ],
  )

  return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
}

interface SeekProps {
  type: 'skip' | 'rewind'
  seconds: number
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
    formatted: string
    raw: number
  }
  currentTime: {
    formatted: string
    raw: number
  }
}

interface ControlsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: MaybeRenderProp<ControlsFnProps>
}

const Controls = ({ children, ...props }: ControlsProps) => {
  const [isMuted, setIsMuted] = useState(false)
  const {
    ref,
    skip,
    seekTo,
    isPlaying,
    togglePlay,
    duration,
    currentTime,
    setVolume,
  } = useVideo()

  const toggleMute = () => {
    if (!ref) return
    setIsMuted(!isMuted)
    ref.volume = ref.volume === 1 ? 0 : 1
  }

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
        volume: ref?.volume ?? 0,
        setVolume,
        seekTo,
      })}
    </div>
  )
}

interface PlayerProps extends VideoHTMLAttributes<HTMLVideoElement> {
  children?: never
}

const Player = (props: PlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const { togglePlay, isPlaying, setCurrentTime, setDuration, setRef } =
    useVideo()

  useIsomorphicEffect(() => {
    setRef(videoRef.current)
  }, [])

  useIsomorphicEffect(() => {
    const video = videoRef.current
    if (!video) return
    setDuration(video.duration)
  }, [])

  useIsomorphicEffect(() => {
    const video = videoRef.current
    const handlePlay = () => {
      if (!video) return
      video.play().catch(console.error)
    }

    const handlePause = () => {
      if (!video) return
      video.pause()
    }

    if (isPlaying) {
      handlePlay()
    } else {
      handlePause()
    }
  }, [isPlaying])

  const handleTimeUpdate = (e: SyntheticEvent<HTMLVideoElement>) => {
    setCurrentTime(e.currentTarget.currentTime)
  }

  return (
    <video
      onClick={togglePlay}
      onTimeUpdate={handleTimeUpdate}
      ref={videoRef}
      {...props}
    />
  )
}

interface WrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const Wrapper = ({ children, ...props }: WrapperProps) => {
  return <div {...props}>{children}</div>
}

export const Video = Object.assign(Wrapper, { Player, Controls })
