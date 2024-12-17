import type { MDXComponents } from 'mdx/types'
import type { ComponentPropsWithoutRef } from 'react'
import { CodeBlock } from '~/components/docs/code-block'
import { Table } from '~/components/shared/table'
import { cn } from './utils/cn'

export const components: MDXComponents = {
  h1: ({ children, ...props }: ComponentPropsWithoutRef<'h1'>) => {
    return (
      <h1 className="mt-8 mb-4 scroll-m-8 font-bold text-4xl" {...props}>
        {children}
      </h1>
    )
  },
  h2: ({ children, ...props }: ComponentPropsWithoutRef<'h2'>) => {
    return (
      <h2 className="mt-8 mb-4 scroll-m-8 font-bold text-2xl" {...props}>
        {children}
      </h2>
    )
  },
  code: ({
    children,
    className,
    ...props
  }: ComponentPropsWithoutRef<'code'>) => {
    console.log('children:', children, props)
    return (
      <code
        className={cn(
          'rounded-lg border border-neutral-200 px-1 py-0.75 font-mono dark:border-neutral-700/40',
          className,
        )}
        {...props}
      >
        {children}
      </code>
    )
  },
  CodeBlock,
  Table: Table.Root,
  TableHead: Table.Head,
  TableHeader: Table.Header,
  TableBody: Table.Body,
  TableRow: Table.Row,
  TableCell: Table.Cell,
}
