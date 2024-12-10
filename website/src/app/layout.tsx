import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Newsreader } from 'next/font/google'
import type { ReactNode } from 'react'
import { Footer } from '~/components/footer'

import '~/styles/globals.css'

const sans = Inter({
  variable: '--font-sans',
  display: 'optional',
  subsets: ['latin'],
})

const serif = Newsreader({
  variable: '--font-serif',
  display: 'optional',
  style: 'italic',
  subsets: ['latin'],
  weight: ['300'],
})

const mono = JetBrains_Mono({
  variable: '--font-mono',
  display: 'optional',
  subsets: ['latin'],
  weight: ['300'],
})

export const metadata: Metadata = {
  title: {
    default: 'Jesse Winton',
    template: '%s — Jesse Winton',
  },
}

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable} text-sm`}
    >
      <body className="flex min-h-screen flex-col items-center justify-center scroll-smooth bg-neutral-900 text-neutral-200 leading-loose antialiased selection:bg-neutral-800">
        <main className="mx-auto my-32 w-full max-w-4xl px-8">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
