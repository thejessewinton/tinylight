import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { LightboxComponent } from '~/components/docs/examples/basic'
import { Button } from '~/components/shared/button'

export default function Home() {
  return (
    <>
      <div className="mx-auto mb-20 text-center">
        <div className="relative flex h-48 w-full max-w-4xl items-center justify-between px-8 [mask-image:linear-gradient(0deg,_transparent_0,_#000_75%)]">
          {Array.from({ length: 3 }).map((_, i) => {
            return (
              <div
                className="h-48 w-1/3 rounded-lg border border-neutral-200 shadow-[0_4px_12px_#0000001a] first-of-type:scale-90 last-of-type:scale-90 dark:border-neutral-800/40"
                key={i}
              />
            )
          })}
        </div>
        <div className="-mt-20">
          <h1 className="group relative inline-block w-full text-center font-medium font-serif text-3xl italic">
            tinylight
          </h1>
          <span>A beautifully designed lightbox primitive for React.</span>

          <div className="mt-8 flex justify-center gap-4">
            <LightboxComponent />
            <Button href="/getting-started" className="w-1/2">
              Documentation
            </Button>
          </div>
          <a
            href="https://github.com/thejessewinton/tinylight-ui"
            className="mt-4 flex items-center justify-center gap-1"
            target="_blank"
            rel="noreferrer"
          >
            Github
            <ChevronRightIcon className="size-3" />
          </a>
        </div>
      </div>
    </>
  )
}
