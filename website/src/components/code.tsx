import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { Fragment } from 'react'
import { jsx, jsxs } from 'react/jsx-runtime'
import { type BundledLanguage, codeToHast } from 'shiki'
import { cn } from '~/utils/cn'

export interface CodeProps {
  children: string
  lang: BundledLanguage
}

export const Code = async ({ children, lang }: CodeProps) => {
  const out = await codeToHast(children, {
    lang: lang,
    theme: 'github-dark',
  })

  return toJsxRuntime(out, {
    Fragment,
    jsx,
    jsxs,
    components: {
      pre: ({ className, ...props }) => (
        <pre className={cn('overflow-auto p-4', className)} {...props} />
      ),
    },
  })
}
