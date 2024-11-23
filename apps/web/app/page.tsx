'use client';
import styles from './page.module.css';
import { Video } from 'tinylight';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Video.Root>
          <Video.Player
            className="max-w-lg"
            autoPlay
            src="https://ik.imagekit.io/ikmedia/example_video.mp4"
          />
          <Video.Controls>
            {(controls) => <>{controls.isPlaying ? 'Playing' : 'Paused'}</>}
          </Video.Controls>
        </Video.Root>
      </main>
    </div>
  );
}
