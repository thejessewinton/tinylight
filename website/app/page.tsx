import { Tinylight } from 'tinylight'

export default function Home() {
  return (
    <div>
      <main>
        <div className="relative">
          <Tinylight
            autoPlay
            className="max-w-2xl"
            poster="https://i.ytimg.com/vi/RW1SlwBx0hk/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg%3D%3D&rs=AOn4CLDNiQMDDptziNw1q6il0goxG_iCbw"
            src="https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.1080p.vp9.webm"
          />
        </div>
      </main>
    </div>
  )
}
