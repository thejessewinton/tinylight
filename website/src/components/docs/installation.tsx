'use client'

import copy from 'copy-to-clipboard'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'

import { useCallback, useState } from 'react'

const variants = {
  visible: { opacity: 1, transform: 'scale(1)' },
  hidden: { opacity: 0, transform: 'scale(0.5)' },
}

export const Installation = () => {
  const [copying, setCopying] = useState(0)

  const onCopy = useCallback(() => {
    copy('npm install sonner')
    setCopying((c) => c + 1)
    setTimeout(() => {
      setCopying((c) => c - 1)
    }, 2000)
  }, [])

  return (
    <div className="w-full space-y-2">
      <h2>Installation</h2>
      <code
        onClick={onCopy}
        className="flex w-full cursor-copy items-center justify-between rounded-lg bg-neutral-950 px-3 py-2"
      >
        pnpm install tinylight
        <div aria-label="Copy code">
          <MotionConfig transition={{ duration: 0.15 }}>
            <AnimatePresence initial={false} mode="wait">
              {copying ? (
                <motion.div
                  animate="visible"
                  exit="hidden"
                  initial="hidden"
                  key="check"
                  variants={variants}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
                  </svg>
                </motion.div>
              ) : (
                <motion.div
                  animate="visible"
                  exit="hidden"
                  initial="hidden"
                  key="copy"
                  variants={variants}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </MotionConfig>
        </div>
      </code>
    </div>
  )
}
