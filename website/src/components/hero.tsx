import { Button } from './button'

export const Hero = () => {
  return (
    <div className="mx-auto mb-20 w-full text-center">
      <h1 className="group relative inline-block w-full text-center font-medium text-3xl">
        tinylight
      </h1>
      <span>A beautifully designed set of lightbox primitives for React.</span>

      <div className="mt-8 flex justify-center gap-4">
        <Button href="/docs" className="w-1/2">
          Documentation
        </Button>
        <Button
          href="https://github.com/thejessewinton/tinylight"
          className="w-1/2"
        >
          GitHub
        </Button>
      </div>
    </div>
  )
}
