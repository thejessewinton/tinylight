export const metadata: Metadata = {
  title: 'tinylight',
  description: 'A beautifully designed set of lightbox primitives for React.',
}

import type { Metadata } from 'next'
import { Example } from '~/components/docs/example'
import { Usage } from '~/components/docs/usage'
import { Installation } from '../components/docs/installation'
import { Hero } from '../components/hero'

export default function Home() {
  return (
    <div className="space-y-8">
      <Hero />
      <Installation />
      <Usage />
      <Example />
    </div>
  )
}
