import { DocumentDuplicateIcon, DocumentIcon } from '@heroicons/react/24/solid'

import { Code, type CodeProps } from '../code'

interface CodeBlockProps extends CodeProps {
  filename?: string
  enableCopy?: boolean
}

export const CodeBlock = ({
  filename,
  enableCopy = true,
  children,
  ...props
}: CodeBlockProps) => {
  return (
    <div className="overflow-hidden rounded-xl bg-neutral-800">
      {filename && (
        <div className="flex items-center justify-between gap-2 rounded-xl p-4 text-sm">
          <div className="flex items-center gap-2">
            <DocumentIcon className="size-4 text-neutral-500" />
            {filename}
          </div>
          {enableCopy && (
            <button className="" type="button">
              <DocumentDuplicateIcon />
            </button>
          )}
        </div>
      )}
      <Code {...props}>{children}</Code>
    </div>
  )
}
