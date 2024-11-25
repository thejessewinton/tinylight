import { Video } from 'tinylight'

export default function Home() {
  return (
    <div>
      <main>
        <div className="relative">
          <Video
            autoPlay
            src="https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.1080p.vp9.webm"
          />
        </div>
      </main>
    </div>
  )
}
