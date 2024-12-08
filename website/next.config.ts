import createMDX from '@next/mdx'

import type { NextConfig } from 'next'

const config: NextConfig = {
  pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      { hostname: 'picsum.photos' },
      { hostname: 'placehold.co' },
    ],
  },
}

const withMDX = createMDX()

export default withMDX(config)
