import type { ReactNode } from 'react'
import type { BundledLanguage } from 'shiki/langs'
import { CodeRenderer } from '~/components/docs/code-renderer'
import * as Tabs from '~/components/shared/tabs'
import { getCodeFromFile } from '~/utils/code'

type ExampleProps = {
  lang: BundledLanguage
  children: ReactNode
  filePath: string
}

export const CodePreview = ({ lang, filePath, children }: ExampleProps) => {
  const code = getCodeFromFile(filePath)
  return (
    <div>
      <Tabs.Root defaultValue="preview">
        <Tabs.List>
          <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
          {filePath && <Tabs.Trigger value="code">Code</Tabs.Trigger>}
        </Tabs.List>
        <Tabs.Content value="preview">Preview here {children}</Tabs.Content>
        {filePath && (
          <Tabs.Content value="code">
            <CodeRenderer lang={lang}>{code}</CodeRenderer>
          </Tabs.Content>
        )}
      </Tabs.Root>
    </div>
  )
}
