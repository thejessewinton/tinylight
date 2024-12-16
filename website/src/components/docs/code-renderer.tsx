import { CommandLineIcon, DocumentIcon } from '@heroicons/react/24/solid'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { Fragment } from 'react'
import { jsx, jsxs } from 'react/jsx-runtime'
import { type BundledLanguage, codeToHast } from 'shiki'
import { cn } from '~/utils/cn'
import { getCodeFromFile } from '~/utils/code'

export type CodeRendererProps = {
  title: string
  lang: BundledLanguage
} & (
  | { children: string; filepath?: never }
  | { filepath: string; children?: never }
)

export const CodeRenderer = async ({
  filepath,
  children,
  title,
  lang,
}: CodeRendererProps) => {
  const out = await codeToHast(children ?? getCodeFromFile(filepath), {
    lang: lang,
    themes: {
      dark: 'github-dark',
      light: 'github-light',
    },
  })

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700/40">
      <button
        type="button"
        className="flex cursor-pointer items-center gap-2 bg-neutral-800/40 p-4"
      >
        {lang === 'bash' ? (
          <CommandLineIcon className="size-4 text-secondary" />
        ) : (
          <DocumentIcon className="size-4 text-secondary" />
        )}
        <span className="font-medium text-sm">{title}</span>
      </button>

      {toJsxRuntime(out, {
        Fragment,
        jsx,
        jsxs,
        components: {
          pre: ({ className, ...props }) => (
            <pre
              className={cn('w-full overflow-auto px-4 py-2', className)}
              {...props}
            />
          ),
        },
      })}
    </div>
  )
}
