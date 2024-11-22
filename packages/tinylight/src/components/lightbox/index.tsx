'use client'

import type { ReactNode } from 'react'
import {
  createContext,
  type HTMLAttributes,
  type MutableRefObject,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
} from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import { useSwipeable } from 'react-swipeable'
import type { MaybeRenderProp } from '../../types'
import { getValidChildren, runIfFunction } from '../../utils/helpers'
import { useIsomorphicEffect } from '../../utils/hooks'

interface LightboxContextValue {
  items: ItemDataRef[]
  registerItem: (item: ItemDataRef) => void
  activeItemIndex: number
  setActiveItemIndex: (index: number) => void
  loop: boolean | undefined
  toPrev: () => void
  toNext: () => void
}

const LightboxContext = createContext<LightboxContextValue | null>(null)

const useLightbox = () => {
  const context = useContext(LightboxContext)
  if (!context) {
    throw new Error('useLightbox must be used within a LightboxProvider')
  }
  return context
}

type ThumbProps = HTMLAttributes<HTMLDivElement>

const Thumbs = ({ children, ...props }: ThumbProps) => {
  const items = getValidChildren(children)
  const { setActiveItemIndex } = useLightbox()

  return (
    <div {...props}>
      {items.map((child, index) => {
        return (
          <button
            type="button"
            key={child.key}
            onClick={() => setActiveItemIndex(index)}
          >
            {child}
          </button>
        )
      })}
    </div>
  )
}

// Lightbox items component
type ItemsProps = HTMLAttributes<HTMLDivElement>

const Items = ({ children, ...props }: ItemsProps) => {
  const items = getValidChildren(children)

  const { toPrev, toNext } = useLightbox()

  const handlers = useSwipeable({
    onSwipedRight: toPrev,
    onSwipedLeft: toNext,
  })

  return (
    <div {...handlers} {...props}>
      {items.map((child) => {
        return <div key={child.key}>{child}</div>
      })}
    </div>
  )
}

interface ItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children: MaybeRenderProp<{
    isActive: boolean
  }>
}

type ItemDataRef = MutableRefObject<{
  domRef: MutableRefObject<HTMLElement | null>
}>

export const Item = ({ children, ...props }: ItemProps) => {
  const itemRef = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const internalId = useId()
  const { id = `tinylight-lightbox-item-${internalId}` } = props
  const { items, registerItem, activeItemIndex } = useLightbox()

  const item = useRef<ItemDataRef['current']>({
    domRef: itemRef,
  })

  useIsomorphicEffect(() => {
    registerItem(item)
  }, [])

  useIsomorphicEffect(() => {
    if (items.length === 0) return
    setIsActive(items[activeItemIndex]?.current.domRef.current?.id === id)
  }, [activeItemIndex, id, items])

  return (
    <div ref={itemRef} id={id} {...props}>
      {runIfFunction(children, {
        isActive,
      })}
    </div>
  )
}

interface NavProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: MaybeRenderProp<{
    toPrev: () => void
    toNext: () => void
  }>
}

const Nav = ({ children }: NavProps) => {
  const { toPrev, toNext } = useLightbox()
  return (
    <>
      {runIfFunction(children, {
        toPrev,
        toNext,
      })}
    </>
  )
}

interface PaginationProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: MaybeRenderProp<{
    activeItem: number
    itemsCount: number
  }>
}

const Pagination = ({ children }: PaginationProps) => {
  const { items, activeItemIndex } = useLightbox()

  if (items.length === 0) return null

  return (
    <>
      {runIfFunction(children, {
        activeItem: activeItemIndex + 1,
        itemsCount: items.length,
      })}
    </>
  )
}

interface WrapperProps extends Dialog.DialogProps {
  children: ReactNode
  loop?: boolean
}

const Root = ({
  children,
  open,
  onOpenChange,
  loop,
  ...props
}: WrapperProps) => {
  const [items, setItems] = useState<ItemDataRef[]>([])
  const [activeItemIndex, setActiveItemIndex] = useState(0)

  const registerItem = useCallback((item: ItemDataRef) => {
    setItems((prev) => [...prev, item])
  }, [])

  const toPrev = useCallback(() => {
    setActiveItemIndex((current) => {
      const prevIndex = current - 1
      if (prevIndex < 0) {
        return loop ? items.length - 1 : 0
      }
      return prevIndex
    })
  }, [items.length, loop])

  const toNext = useCallback(() => {
    setActiveItemIndex((current) => {
      const nextIndex = current + 1
      if (nextIndex >= items.length) {
        return loop ? 0 : items.length - 1
      }
      return nextIndex
    })
  }, [items.length, loop])

  const contextValue = {
    items,
    registerItem,
    activeItemIndex,
    setActiveItemIndex,
    loop,
    toPrev,
    toNext,
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} {...props}>
      <LightboxContext.Provider value={contextValue}>
        {children}
      </LightboxContext.Provider>
    </Dialog.Root>
  )
}

export const Lightbox = Object.assign(Root, {
  Items,
  Item,
  Pagination,
  Nav,
  Thumbs,
})
