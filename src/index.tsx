'use client'

import * as Slider from '@radix-ui/react-slider'
import React from 'react'
import './styles.css'

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
  toggleMute: () => void
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

  const togglePlay = React.useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  const toggleMute = React.useCallback(() => {
    setIsMuted((prev) => !prev)
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
    ],
  )

  return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
}

interface SeekProps {
  type: 'skip' | 'rewind'
  seconds: number
}

const Controls = () => {
  const [isMuted, setIsMuted] = React.useState(false)
  const {
    ref,
    isPlaying,
    volume,
    setVolume,
    duration,
    currentTime,
    setCurrentTime,
  } = useVideo()
  const currentVolume = React.useRef(volume)

  const toggleMute = () => {
    if (!ref) return
    setIsMuted(!isMuted)
    currentVolume.current = ref.current!.volume
    ref.current!.muted = !ref.current?.muted

    if (ref.current?.muted) {
      ref.current!.volume = 0
    } else {
      ref.current!.volume = currentVolume.current
    }
  }

  return (
    <div data-tinylight-controls="">
      {isPlaying ? 'Playing' : 'Paused'}

      <Slider.Root
        className="relative flex h-5 w-[200px] touch-none select-none items-center"
        defaultValue={[50]}
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

      <button onClick={toggleMute} type="button" data-tinylight-mute="">
        {isMuted ? 'Unmute' : 'Mute'}
      </button>
    </div>
  )
}

interface PlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {}

const Player = ({ onClick, children, ...props }: PlayerProps) => {
  const { ref, togglePlay, isPlaying, setCurrentTime, setDuration } = useVideo()

  useIsomorphicEffect(() => {
    const video = ref.current
    if (!video) return
    setDuration(video.duration)
  }, [])

  useIsomorphicEffect(() => {
    const video = ref.current
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

  return (
    <div data-tinylight-player="">
      <video
        onClick={(e) => {
          onClick?.(e)
          togglePlay()
        }}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        ref={ref}
        {...props}
      />
      {children}
    </div>
  )
}

interface VideoProps extends PlayerProps {}

export const Video = ({ ...props }: VideoProps) => {
  return (
    <VideoProvider>
      <Player {...props}>
        <Controls />
      </Player>
    </VideoProvider>
  )
}
