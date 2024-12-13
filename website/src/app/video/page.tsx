'use client'

import { MediaPlayer } from '@tinylight-ui/media-player'

export default function VideoPage() {
  return (
    <div>
      <MediaPlayer.Root>
        <MediaPlayer.Video
          src="https://static.linear.app/assets/web/quality/basheer-full.CF2D1941-40F3-418C-8BA3-D8E830B44FF5.mp4"
          poster="https://static.linear.app/assets/web/quality/basheer-poster.54A37C54-7A04-4EAE-ACE3-9B783D38EB54.jpg"
        />
        <MediaPlayer.PlaybackControl />
        <MediaPlayer.Elapsed />
        <MediaPlayer.Remaining />
      </MediaPlayer.Root>
    </div>
  )
}
