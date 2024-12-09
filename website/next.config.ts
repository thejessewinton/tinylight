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

export default config
