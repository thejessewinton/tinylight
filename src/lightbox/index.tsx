'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import React from 'react'
import { getValidChildren, useIsomorphicLayoutEffect } from '../helpers'

import './styles.css'
import type { MaybeRenderProp } from '../types'

interface LightboxContextValue {
  items: React.ReactElement[]
  setItems: (items: React.ReactElement[]) => void
  activeItemIndex: number
  setActiveItemIndex: (index: number) => void
  toPrev: () => void
  toNext: () => void
}

const LightboxContext = React.createContext<LightboxContextValue | null>(null)

const useLightbox = () => {
  const context = React.useContext(LightboxContext)
  if (!context) {
    throw new Error('useLightbox must be used within a LightboxProvider')
  }
  return context
}

interface LightboxRootProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {}

const LightboxRoot: React.FC<LightboxRootProps> = (props) => {
  const [items, setItems] = React.useState<React.ReactElement[]>([])
  const [activeItemIndex, setActiveItemIndex] = React.useState(0)

  const toPrev = React.useCallback(() => {
    setActiveItemIndex((current) => {
      const prevIndex = current - 1
      if (prevIndex < 0) {
        return 0
      }
      return prevIndex
    })
  }, [])

  const toNext = React.useCallback(() => {
    setActiveItemIndex((current) => {
      const nextIndex = current + 1
      if (nextIndex >= items.length) {
        return items.length - 1
      }
      return nextIndex
    })
  }, [items.length])

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          toPrev()
          break
        case 'ArrowRight':
          toNext()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [toPrev, toNext])

  const contextValue = React.useMemo(
    () => ({
      items,
      setItems,
      activeItemIndex,
      setActiveItemIndex,
      toPrev,
      toNext,
    }),
    [items, activeItemIndex, toPrev, toNext],
  )

  return (
    <LightboxContext.Provider value={contextValue}>
      <DialogPrimitive.Root {...props} />
    </LightboxContext.Provider>
  )
}

type LightboxTriggersProps = React.ComponentPropsWithRef<'button'>

const LightboxTriggers: React.FC<LightboxTriggersProps> = ({ children }) => {
  const validChildren = getValidChildren(children)
  const { setActiveItemIndex } = useLightbox()

  return (
    <>
      {validChildren.map((item, index) => {
        return (
          <button
            key={item.key}
            onClick={() => setActiveItemIndex(index)}
            type="button"
            data-tinylight-trigger=""
          >
            {React.cloneElement(item, {})}
          </button>
        )
      })}
    </>
  )
}

type LightboxTriggerElement = React.ElementRef<typeof DialogPrimitive.Trigger>

interface LightboxTriggerProps
  extends Omit<DialogPrimitive.DialogTriggerProps, 'asChild'> {}

const LightboxTrigger: React.FC<LightboxTriggerProps> = React.forwardRef<
  LightboxTriggerElement,
  LightboxTriggerProps
>(({ children, ...props }, forwardedRef) => {
  return (
    <DialogPrimitive.Trigger ref={forwardedRef} asChild {...props}>
      {children}
    </DialogPrimitive.Trigger>
  )
})

LightboxTrigger.displayName = 'LightboxTrigger'

type LightboxContentElement = React.ElementRef<typeof DialogPrimitive.Content>

interface LightboxContentProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    'asChild'
  > {
  loop?: boolean
  container?: React.ComponentProps<typeof DialogPrimitive.Portal>['container']
  title: string
  description: string
}

const LightboxContent: React.FC<LightboxContentProps> = React.forwardRef<
  LightboxContentElement,
  LightboxContentProps
>(
  (
    { title, description, children, className, container, ...props },
    forwardedRef,
  ) => {
    return (
      <DialogPrimitive.Portal container={container}>
        <DialogPrimitive.Title data-tinylight-title="">
          {title}
        </DialogPrimitive.Title>
        <DialogPrimitive.Description data-tinylight-description="">
          {description}
        </DialogPrimitive.Description>

        <DialogPrimitive.Overlay data-tinylight-overlay="">
          <DialogPrimitive.Content
            data-tinylight-content=""
            ref={forwardedRef}
            {...props}
          >
            {children}
          </DialogPrimitive.Content>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    )
  },
)

LightboxContent.displayName = 'LightboxContent'

interface LightboxItemsProps extends React.HTMLAttributes<HTMLDivElement> {}

const LightboxItems: React.FC<LightboxItemsProps> = ({
  children,
  ...props
}) => {
  const { setItems, activeItemIndex, setActiveItemIndex } = useLightbox()

  const validChildren = getValidChildren(children)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  // Update the active slide based on scroll position
  const handleScroll = React.useCallback(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const slideWidth = container.firstElementChild?.clientWidth || 0
    const newIndex = Math.round(container.scrollLeft / slideWidth)

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setActiveItemIndex(newIndex)
    }, 100)
  }, [setActiveItemIndex])

  React.useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  React.useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const activeItem = container.children[activeItemIndex] as HTMLElement

    if (activeItem) {
      container.scrollTo({
        left: activeItem.offsetLeft,
        behavior: 'smooth',
      })
    }
  }, [activeItemIndex])

  // Attach the scroll event listener
  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useIsomorphicLayoutEffect(() => {
    setItems(validChildren)
  }, [])

  return (
    <div data-tinylight-container="">
      <div ref={containerRef} data-tinylight-items="" {...props}>
        {validChildren.map((child, i) => {
          return (
            <div
              data-tinylight-item=""
              data-tinylight-active-item={activeItemIndex === i}
              key={child.key}
            >
              {React.cloneElement(child, {})}
            </div>
          )
        })}
      </div>
      <LightboxClose />
      <LightboxPrevButton />
      <LightboxNextButton />
    </div>
  )
}

type LightboxImageProps = React.ComponentPropsWithoutRef<'div'>

const LightboxImage: React.FC<LightboxImageProps> = (props) => {
  return <div {...props} />
}

type LightboxVideoProps = React.ComponentPropsWithoutRef<'video'>

const LightboxVideo: React.FC<LightboxVideoProps> = ({
  controls = true,
  ...props
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null)

  if (!videoRef.current?.parentElement.dataset['tinylight-active-item']) {
    videoRef.current?.pause()
  }

  return <video controls={controls} {...props} ref={videoRef} />
}

interface LightboxPrevButtonProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'children'> {
  children?: never
}

const LightboxPrevButton: React.FC<LightboxPrevButtonProps> = React.forwardRef<
  HTMLButtonElement,
  LightboxPrevButtonProps
>(({ className, ...props }, ref) => {
  const { toPrev, activeItemIndex } = useLightbox()

  return (
    <button
      onClick={toPrev}
      ref={ref}
      disabled={activeItemIndex === 0}
      aria-label="Previous item"
      data-tinylight-prev-button=""
      data-tinylight-nav-button=""
      {...props}
    >
      left arrow
    </button>
  )
})

interface LightboxNextButtonProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'children'> {
  children?: never
}

const LightboxNextButton: React.FC<LightboxNextButtonProps> = React.forwardRef<
  HTMLButtonElement,
  LightboxNextButtonProps
>(({ className, ...props }, ref) => {
  const { toNext, activeItemIndex, items } = useLightbox()

  return (
    <button
      onClick={toNext}
      ref={ref}
      disabled={activeItemIndex === items.length - 1}
      aria-label="Next item"
      data-tinylight-next-button=""
      data-tinylight-nav-button=""
      {...props}
    >
      right arrow
    </button>
  )
})

LightboxNextButton.displayName = 'LightboxNextButton'

interface LightboxThumbsProps
  extends Omit<React.ComponentPropsWithRef<'div'>, 'children'> {
  children: MaybeRenderProp<{
    items: Array<{
      src: string
    }>
  }>
}

const LightboxThumbs: React.FC<LightboxThumbsProps> = ({
  className,
  ...props
}) => {
  const { items, activeItemIndex, setActiveItemIndex } = useLightbox()
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Scroll to center the active item
  React.useEffect(() => {
    if (containerRef.current && items.length > 0) {
      const container = containerRef.current
      const activeChild = container.children[activeItemIndex] as HTMLElement
      const containerCenter = container.offsetWidth / 2
      const childCenter = activeChild.offsetLeft + activeChild.offsetWidth / 2

      container.scrollTo({
        left: childCenter - containerCenter,
        behavior: 'smooth',
      })
    }
  }, [activeItemIndex, items.length])

  return (
    <div data-tinylight-thumbs="" ref={containerRef} {...props}>
      {items.map((item, index) => {
        const isVideo = item.type === LightboxVideo
        const imgSrc: string = isVideo ? item.props.poster : item.props.src
        return (
          <button
            onClick={() => setActiveItemIndex(index)}
            type="button"
            key={item.key}
            data-tinylight-thumb=""
          >
            <img src={imgSrc} alt="" className="fui-LightboxThumbImage" />
          </button>
        )
      })}
    </div>
  )
}

type LightboxCloseElement = React.ElementRef<typeof DialogPrimitive.Close>
interface LightboxCloseProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>,
    'asChild' | 'children'
  > {
  children?: never
}

const LightboxClose = React.forwardRef<
  LightboxCloseElement,
  LightboxCloseProps
>(({ className, ...props }, forwardedRef) => (
  <DialogPrimitive.Close
    //className={classNames('fui-LightboxClose', className)}
    {...props}
    ref={forwardedRef}
    asChild
  >
    <button type="button" aria-label="Close lightbox">
      close button
    </button>
  </DialogPrimitive.Close>
))

LightboxClose.displayName = 'LightboxClose'

export {
  LightboxContent as Content,
  LightboxItems as Items,
  LightboxRoot as Root,
  LightboxThumbs as Thumbs,
  LightboxTrigger as Trigger,
  LightboxTriggers as Triggers,
  LightboxImage as Image,
  LightboxVideo as Video,
}

export type {
  LightboxContentProps as ContentProps,
  LightboxItemsProps as ItemsProps,
  LightboxRootProps as RootProps,
  LightboxThumbsProps as ThumbsProps,
  LightboxTriggerProps as TriggerProps,
  LightboxTriggersProps as TriggersProps,
  LightboxImageProps as ImageProps,
  LightboxVideoProps as VideoProps,
}
