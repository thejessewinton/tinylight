import { withContentlayer } from 'next-contentlayer'

/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['source.unsplash.com'],
  },
}

export default withContentlayer(config)
