import type { MDXComponents } from 'mdx/types'
import type { ComponentPropsWithoutRef } from 'react'
import { CodePreview } from './components/docs/code-preview'
import { CodeRenderer } from './components/docs/code-renderer'

const generateId = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
}

export const components: MDXComponents = {
  h1: ({ children, ...props }: ComponentPropsWithoutRef<'h1'>) => {
    const id = generateId(children?.toString() ?? '')

    return (
      <h1
        className="mt-8 mb-4 scroll-m-8 font-bold text-4xl"
        id={id}
        {...props}
      >
        {children}
      </h1>
    )
  },
  h2: ({ children, ...props }: ComponentPropsWithoutRef<'h2'>) => {
    const id = generateId(children?.toString() ?? '')

    return (
      <h2
        className="mt-8 mb-4 scroll-m-8 font-bold text-2xl"
        id={id}
        {...props}
      >
        {children}
      </h2>
    )
  },
  CodePreview,
  CodeRenderer,
}
