'use client'

import './styles.css'
import React from 'react'

import { PauseIcon, PlayIcon } from './assets'

import { formatTime, scaleValue } from './helpers'

interface MediaState {
  ref: React.RefObject<HTMLVideoElement | null>
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
  seekTo: (e: React.MouseEvent<HTMLDivElement>) => void
}

const MediaContext = React.createContext<MediaState | null>(null)

export const useMediaPlayerPlayer = () => {
  const context = React.useContext(MediaContext)
  if (!context) {
    throw new Error('useMediaPlayer must be used within a MediaProvider')
  }
  return context
}

const Root = ({ children }: { children: React.ReactNode }) => {
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
      seekTo,
    ],
  )

  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
}

type PlaybackControlProps = {} & React.ComponentPropsWithRef<'button'>

const PlaybackControl = ({ onClick, ...props }: PlaybackControlProps) => {
  const { isPlaying, togglePlay, ref, setDuration } = useMediaPlayerPlayer()

  const handlePlay = () => {
    if (!ref.current) return
    setDuration(ref.current.duration)
    togglePlay()
  }

  return (
    <button
      onClick={(e) => {
        onClick?.(e)
        handlePlay()
      }}
      {...props}
      data-tinylight-pause=""
      data-tinylight-button=""
    >
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </button>
  )
}

const Elapsed = () => {
  const { currentTime } = useMediaPlayerPlayer()
  return <div data-tinylight-elapsed="">{currentTime.toFixed()}</div>
}

const Remaining = () => {
  const { currentTime, duration } = useMediaPlayerPlayer()

  return (
    <div data-tinylight-remaining="">
      {formatTime(Number(duration - currentTime))}
    </div>
  )
}

interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {}

const Video = ({ onClick, children, className, ...props }: VideoProps) => {
  const { ref, togglePlay, setCurrentTime } = useMediaPlayerPlayer()

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
    </div>
  )
}

export const MediaPlayer = {
  Root,
  Video,
  PlaybackControl,
  Elapsed,
  Remaining,
}
