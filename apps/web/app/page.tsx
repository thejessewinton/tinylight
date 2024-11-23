'use client';
import styles from './page.module.css';
import { Lightbox } from 'tinylight';
import Image from 'next/image';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Lightbox.Root>
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
                src="https://picsum.photos/id/20/1024/768"
                width={1024}
                height={768}
                alt="test"
              />
            </Lightbox.Item>
          </Lightbox.Items>

          <Lightbox.Nav>
            {({ toPrev, toNext }) => (
              <>
                <button onClick={toPrev} type="button">
                  Previous
                </button>
                <button onClick={toNext} type="button">
                  Next
                </button>
              </>
            )}
          </Lightbox.Nav>

          <Lightbox.Pagination>
            {({ activeItem, itemsCount }) => (
              <div>
                {activeItem} / {itemsCount}
              </div>
            )}
          </Lightbox.Pagination>

          <Lightbox.Thumbs className="flex">
            <Image
              src="https://picsum.photos/id/10/100/100"
              width={100}
              height={100}
              alt="test"
            />
            <Image
              src="https://picsum.photos/id/10/100/100"
              width={100}
              height={100}
              alt="test"
            />
          </Lightbox.Thumbs>
        </Lightbox.Root>
      </main>
    </div>
  );
}
