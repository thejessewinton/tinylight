import { MDX } from '@/components/mdx/MDX'
import { getIndex } from '@/utils/content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'tinylight',
  description:
    '🎉 A set of small, unopinionated component primitives for building lightbox components in React.',
}

const Index = () => {
  const data = getIndex()

  return (
    <div className="flex flex-col gap-2 pb-4">
      <div className="relative z-50 animate-enter">
        <h1 className="group relative mb-4 inline-block w-full max-w-xs cursor-pointer font-medium">
          {data.title}
        </h1>

        <div className="font-light">
          <MDX code={data.body.code} />
        </div>
      </div>
    </div>
  )
}

export default Index
