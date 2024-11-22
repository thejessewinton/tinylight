'use client'

import type { ReactNode } from 'react'
import {
  type HTMLAttributes,
  type MutableRefObject,
  useId,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { useSwipeable } from 'react-swipeable'
import { create } from 'zustand'
import type { MaybeRenderProp } from '../../types'
import { getValidChildren, runIfFunction } from '../../utils/helpers'
import { useIsomorphicEffect } from '../../utils/hooks'

interface LighboxState {
  items: ItemDataRef[]
  registerItem: (item: ItemDataRef) => void
  activeItemIndex: number
  setActiveItemIndex: (index: number) => void
  loop: boolean | undefined
  toPrev: () => void
  toNext: () => void
}

// State
const useLightboxStore = create<LighboxState>((set) => ({
  items: [],
  registerItem: (item) => set((state) => ({ items: [...state.items, item] })),
  activeItemIndex: 0,
  setActiveItemIndex: (activeItemIndex: number) => set({ activeItemIndex }),
  loop: false,
  toPrev: () => {
    set((state) => {
      const { items, activeItemIndex, loop } = state
      const prevIndex = activeItemIndex - 1

      if (prevIndex < 0) {
        if (loop) return { activeItemIndex: items.length - 1 }
        return { activeItemIndex: 0 }
      }

      return { activeItemIndex: prevIndex }
    })
  },
  toNext: () => {
    set((state) => {
      const { items, activeItemIndex, loop } = state
      const nextIndex = activeItemIndex + 1

      if (nextIndex >= items.length) {
        if (loop) return { activeItemIndex: 0 }
        return { activeItemIndex: items.length - 1 }
      }

      return { activeItemIndex: nextIndex }
    })
  },
}))

type ThumbProps = HTMLAttributes<HTMLDivElement>

const Thumbs = ({ children, ...props }: ThumbProps) => {
  const items = getValidChildren(children)
  const setActiveItemIndex = useLightboxStore(
    (state) => state.setActiveItemIndex,
  )

  return (
    <div {...props}>
      {items.map((child, index) => {
        return (
          <button
            key={child.key}
            type="button"
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

  const { toPrev, toNext } = useLightboxStore((state) => ({
    toPrev: state.toPrev,
    toNext: state.toNext,
  }))

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

/**
 * Shoutout to HeadlessUI for inspiration on the implementation of an item's active state.
 * {@link https://github.com/tailwindlabs/headlessui/blob/d1ca3a9797bce9e8677051ecd73bb34a4f4969aa/packages/%40headlessui-react/src/components/menu/menu.tsx#L614|Check it out in the repo}.
 */

export const Item = ({ children, ...props }: ItemProps) => {
  const itemRef = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const internalId = useId()
  const { id = `tinylight-lightbox-item-${internalId}` } = props
  const { items, registerItem, activeItemIndex } = useLightboxStore(
    (state) => ({
      items: state.items,
      registerItem: state.registerItem,
      activeItemIndex: state.activeItemIndex,
    }),
  )

  const item = useRef<ItemDataRef['current']>({
    domRef: itemRef,
  })

  useIsomorphicEffect(() => {
    registerItem(item)
  }, [])

  useIsomorphicEffect(() => {
    if (items.length === 0) return
    setIsActive(items[activeItemIndex].current.domRef.current?.id === id)
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
  return (
    <>
      {runIfFunction(children, {
        toPrev: useLightboxStore((state) => state.toPrev),
        toNext: useLightboxStore((state) => state.toNext),
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
  const { items, activeItemIndex } = useLightboxStore((state) => ({
    items: state.items,
    activeItemIndex: state.activeItemIndex,
  }))

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

interface WrapperProps {
  children: ReactNode
  open: boolean
  handleClose: () => void
  loop?: boolean
}

const Wrapper = ({
  children,
  open,
  handleClose,
  loop,
  ...props
}: WrapperProps) => {
  useLightboxStore.setState({ loop })

  useIsomorphicEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  useIsomorphicEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [handleClose])

  return (
    <>
      {open
        ? createPortal(<div {...props}>{children}</div>, document.body)
        : null}
    </>
  )
}

export const Lightbox = Object.assign(Wrapper, {
  Items,
  Item,
  Pagination,
  Nav,
  Thumbs,
})
