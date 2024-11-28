'use client'

import * as Slider from '@radix-ui/react-slider'
import React from 'react'
import './styles.css'
import {
  FullVolumeIcon,
  MutedIcon,
  PartialVolumeIcon,
  PauseIcon,
  PlayIcon,
} from './assets'

import { scaleValue } from './helpers'
import { useIsomorphicEffect } from './hooks'

interface VideoState {
  ref: React.MutableRefObject<HTMLVideoElement | null>
  isPlaying: boolean
  togglePlay: () => void
  duration: number
  setDuration: (duration: number) => void
  currentTime: number
  setCurrentTime: (currentTime: number) => void
  volume: number
  setVolume: (newVolume: number) => void
  isMuted: boolean
  toggleMuted: () => void
  skip: (props: SeekProps) => void
  seekTo: (e: React.MouseEvent<HTMLDivElement>) => void
}

const VideoContext = React.createContext<VideoState | null>(null)

export const useVideo = () => {
  const context = React.useContext(VideoContext)
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider')
  }
  return context
}

export const VideoProvider = ({ children }: { children: React.ReactNode }) => {
  const ref = React.useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [duration, setDuration] = React.useState(0)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [volume, setVolume] = React.useState(1)
  const [isMuted, setIsMuted] = React.useState(false)

  const currentVolume = React.useRef(volume)

  const togglePlay = React.useCallback(() => {
    if (!ref.current) return
    if (isPlaying) {
      ref.current.pause()
    } else {
      ref.current.play()
    }
    setIsPlaying((prev) => !prev)
  }, [isPlaying])

  const toggleMuted = React.useCallback(() => {
    if (!ref.current) return

    ref.current.muted = !ref.current.muted
    setIsMuted((prev) => !prev)

    if (ref.current.muted) {
      ref.current.volume = 0
    } else {
      ref.current.volume = currentVolume.current
    }
  }, [])

  const skip = React.useCallback(({ type, seconds }: SeekProps) => {
    if (!ref) return
    const value = type === 'skip' ? seconds : -seconds
    ref.current!.currentTime = ref.current!.currentTime + value
  }, [])

  const seekTo = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref) return
    const seekTargetOffset = e.currentTarget.getBoundingClientRect()
    const getSeekTime = scaleValue(
      seekTargetOffset.left,
      seekTargetOffset.right,
      0,
      ref.current!.duration,
    )
    ref.current!.currentTime = getSeekTime(e.clientX)
  }, [])

  const value = React.useMemo(
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
      toggleMuted,
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
      toggleMuted,
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

const Controls = () => {
  const {
    isPlaying,
    togglePlay,
    isMuted,
    toggleMuted,
    volume,
    setVolume,
    duration,
    currentTime,
  } = useVideo()

  return (
    <div data-tinylight-controls="">
      <button
        onClick={togglePlay}
        type="button"
        data-tinylight-pause=""
        data-tinylight-button=""
      >
        {isPlaying ? PauseIcon : PlayIcon}
      </button>

      <Slider.Root
        className="relative flex h-5 w-[200px] touch-none select-none items-center"
        defaultValue={[volume]}
        max={100}
        step={1}
        onValueChange={([value]) => {
          setVolume(value ?? 0 / 100)
        }}
      >
        <Slider.Track className="relative h-[3px] grow rounded-full">
          <Slider.Range className="absolute h-full rounded-full bg-white" />
        </Slider.Track>
        <Slider.Thumb
          className="block size-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA5 focus:outline-none"
          aria-label="Volume"
        />
      </Slider.Root>

      <div data-tinylight-duration="">
        <div
          data-tinylight-duration-track=""
          style={{
            transform: `scaleX(${currentTime / duration})`,
          }}
        />
      </div>

      <button
        onClick={toggleMuted}
        type="button"
        data-tinylight-button=""
        data-tinylight-mute=""
      >
        {isMuted ? MutedIcon : volume > 50 ? PartialVolumeIcon : FullVolumeIcon}
      </button>
    </div>
  )
}

interface PlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {}

const Player = ({ onClick, children, className, ...props }: PlayerProps) => {
  const { ref, togglePlay, setDuration, setCurrentTime } = useVideo()

  useIsomorphicEffect(() => {
    const video = ref.current
    if (!video) return
    setDuration(video.duration)
  }, [])

  return (
    <div data-tinylight-player="" className={className}>
      <video
        onClick={(e) => {
          onClick?.(e)
          togglePlay()
        }}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        ref={ref}
        {...props}
      />
      <Controls />
    </div>
  )
}

interface TinylightProps extends PlayerProps {}

export const Tinylight = ({ ...props }: TinylightProps) => {
  return (
    <VideoProvider>
      <Player {...props} />
    </VideoProvider>
  )
}
