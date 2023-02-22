/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";

import {
  type HTMLAttributes,
  useId,
  useRef,
  type MutableRefObject,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { getValidChildren, runIfFunction } from "../../utils/helpers";
import type { MaybeRenderProp } from "../../types";
import { create } from "zustand";

export interface LighboxState {
  items: ItemDataRef[];
  addItem: (item: ItemDataRef) => void;
  itemsCount: number;
  setItemsCount: (count: number) => void;
  activeItemIndex: number;
  setactiveItemIndex: (index: number) => void;
  loop: boolean | undefined;
  toPrev: () => void;
  toNext: () => void;
}

// State
export const useLightboxStore = create<LighboxState>((set) => ({
  items: [],
  addItem: (item) => () => {
    console.log("addItem", item);
    set((state) => ({ items: [...state.items, item] }));
  },
  itemsCount: 0,
  activeItemIndex: 0,
  loop: false,
  toPrev: () =>
    set((state) => ({ activeItemIndex: state.activeItemIndex - 1 })),
  toNext: () =>
    set((state) => ({ activeItemIndex: state.activeItemIndex + 1 })),
  setactiveItemIndex: (activeItemIndex: number) => set({ activeItemIndex }),
  setItemsCount: (itemsCount: number) => set({ itemsCount }),
}));

type ThumbProps = HTMLAttributes<HTMLDivElement>;

const Thumbs = ({ children, ...props }: ThumbProps) => {
  const items = getValidChildren(children);
  const setactiveItemIndex = useLightboxStore(
    (state) => state.setactiveItemIndex
  );

  return (
    <div {...props}>
      {items.map((child, index) => {
        return (
          <button key={index} onClick={() => setactiveItemIndex(index)}>
            {child}
          </button>
        );
      })}
    </div>
  );
};

interface ItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: MaybeRenderProp<{
    isActive: boolean;
  }>;
}

type ItemDataRef = MutableRefObject<{
  domRef: MutableRefObject<HTMLElement | null>;
}>;

export const Item = ({ children, ...props }: ItemProps) => {
  const itemRef = useRef(null);
  const internalId = useId();
  const { id = `tinylight-lightbox-item-${internalId}` } = props;
  const addItem = useLightboxStore((state) => state.addItem);
  const items = useLightboxStore((state) => state.items);
  const [isActive, setIsActive] = useState(false);

  const bag = useRef<ItemDataRef["current"]>({
    domRef: itemRef,
  });

  useEffect(() => {
    console.log("adding");
    addItem(bag);
    console.log(items);
  }, [items]);

  useEffect(() => {
    const item = items.find((item) => item.current.domRef.current?.id === id);
    if (item) {
      setIsActive(item.current.domRef.current?.id === id);
    }
  }, [items, id]);

  return (
    <div ref={itemRef} id={id} {...props}>
      {runIfFunction(children, {
        isActive,
      })}
    </div>
  );
};

// Lightbox items component
type ItemsProps = HTMLAttributes<HTMLDivElement>;

const Items = ({ children, ...props }: ItemsProps) => {
  const items = getValidChildren(children);
  const { activeItemIndex } = useLightboxStore((state) => ({
    items: state.items,
    setItemsCount: state.setItemsCount,
    activeItemIndex: state.activeItemIndex,
  }));

  return (
    <div {...props}>
      {items.map((child, index) => {
        return <>{child}</>;
      })}
    </div>
  );
};

interface NavProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children: MaybeRenderProp<{
    toPrev: () => void;
    toNext: () => void;
  }>;
}

const Nav = ({ children }: NavProps) => {
  return (
    <>
      {runIfFunction(children, {
        toPrev: useLightboxStore((state) => state.toPrev),
        toNext: useLightboxStore((state) => state.toNext),
      })}
    </>
  );
};

interface PaginationProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children: MaybeRenderProp<{
    activeItem: number;
    itemsCount: number;
  }>;
}

const Pagination = ({ children }: PaginationProps) => {
  const { itemsCount, activeItemIndex } = useLightboxStore((state) => ({
    itemsCount: state.itemsCount,
    activeItemIndex: state.activeItemIndex,
  }));

  if (itemsCount === 0) return null;

  return (
    <>
      {runIfFunction(children, {
        activeItem: activeItemIndex + 1,
        itemsCount,
      })}
    </>
  );
};

interface WrapperProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  loop?: boolean;
}

const Wrapper = ({ children, open, loop, ...props }: WrapperProps) => {
  const hasOpen = Object.keys(props).includes("open");
  if (hasOpen) {
    throw new Error(`You forgot an \`open\` prop.`);
  }

  if (typeof open !== "boolean") {
    throw new Error(`The \`open\` prop must be a boolean value.`);
  }

  useLightboxStore.setState({ loop });

  return (
    <>
      {open
        ? createPortal(<div {...props}>{children}</div>, document.body)
        : null}
    </>
  );
};

export const Lightbox = Object.assign(Wrapper, {
  Items,
  Item,
  Pagination,
  Nav,
  Thumbs,
});
