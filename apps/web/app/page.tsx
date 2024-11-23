'use client'
import styles from './page.module.css'
import { Lightbox } from 'tinylight'
import Image from 'next/image'

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Lightbox>
          <Lightbox.Items>
            <Lightbox.Item>
              <Image
                src="https://picsum.photos/id/10/1024/768"
                width={1024}
                height={768}
                alt="test"
              />
            </Lightbox.Item>
            <Lightbox.Item>
              <Image
                src="https://picsum.photos/id/10/1024/768"
                width={1024}
                height={768}
                alt="test"
              />
            </Lightbox.Item>
          </Lightbox.Items>
          <Lightbox.PrevButton>Prev</Lightbox.PrevButton>
          <Lightbox.NextButton>Next</Lightbox.NextButton>

          <Lightbox.Thumbs>
            <Image
              src="https://picsum.photos/id/10/1024/768"
              width={1024}
              height={768}
              alt="test"
            />
            <Image
              src="https://picsum.photos/id/10/1024/768"
              width={1024}
              height={768}
              alt="test"
            />
          </Lightbox.Thumbs>
        </Lightbox>
      </main>
    </div>
  )
}
