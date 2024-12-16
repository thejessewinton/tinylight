import type { MDXComponents } from 'mdx/types'
import type { ComponentPropsWithoutRef } from 'react'
import { CodeRenderer } from '~/components/docs/code-renderer'
import { Table } from '~/components/shared/table'
import { cn } from './utils/cn'

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
  code: ({
    children,
    className,
    ...props
  }: ComponentPropsWithoutRef<'code'>) => (
    <code
      className={cn(
        'rounded-lg border border-neutral-200 px-1 py-0.75 font-mono dark:border-neutral-700/40',
        className,
      )}
      {...props}
    >
      {children}
    </code>
  ),
  CodeRenderer,
  Table: Table.Root,
  TableHead: Table.Head,
  TableHeader: Table.Header,
  TableBody: Table.Body,
  TableRow: Table.Row,
  TableCell: Table.Cell,
}
