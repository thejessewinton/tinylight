/* eslint-disable @typescript-eslint/restrict-template-expressions */
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
  registerItem: (item: ItemDataRef) => void;
  activeItemIndex: number;
  setActiveItemIndex: (index: number) => void;
  loop: boolean | undefined;
  toPrev: () => void;
  toNext: () => void;
}

// State
export const useLightboxStore = create<LighboxState>((set) => ({
  items: [],
  registerItem: (item) => set((state) => ({ items: [...state.items, item] })),
  activeItemIndex: 0,
  setActiveItemIndex: (activeItemIndex: number) => set({ activeItemIndex }),
  loop: false,
  toPrev: () => {
    set((state) => {
      const { items, activeItemIndex, loop } = state;
      const prevIndex = activeItemIndex - 1;

      if (prevIndex < 0) {
        if (loop) return { activeItemIndex: items.length - 1 };
        return { activeItemIndex: 0 };
      }

      return { activeItemIndex: prevIndex };
    });
  },
  toNext: () => {
    set((state) => {
      const { items, activeItemIndex, loop } = state;
      const nextIndex = activeItemIndex + 1;

      if (nextIndex >= items.length) {
        if (loop) return { activeItemIndex: 0 };
        return { activeItemIndex: items.length - 1 };
      }

      return { activeItemIndex: nextIndex };
    });
  },
}));

// type ThumbProps = HTMLAttributes<HTMLDivElement>;

// const Thumbs = ({ children, ...props }: ThumbProps) => {
//   const items = getValidChildren(children);
//   const setActiveItemIndex = useLightboxStore(
//     (state) => state.setActiveItemIndex
//   );

//   return (
//     <div {...props}>
//       {items.map((child, index) => {
//         return (
//           <button key={index} onClick={() => setActiveItemIndex(index)}>
//             {child}
//           </button>
//         );
//       })}
//     </div>
//   );
// };

interface ItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: MaybeRenderProp<{
    isActive: boolean;
  }>;
}

type ItemDataRef = MutableRefObject<{
  domRef: MutableRefObject<HTMLElement | null>;
}>;

/**
 * Shoutout to headlessui for inspiration on the implementation of an item's active state.
 * {@link https://github.com/tailwindlabs/headlessui/blob/d1ca3a9797bce9e8677051ecd73bb34a4f4969aa/packages/%40headlessui-react/src/components/menu/menu.tsx#L607|Github}.
 */

export const Item = ({ children, ...props }: ItemProps) => {
  const itemRef = useRef(null);
  const internalId = useId();
  const { id = `tinylight-lightbox-item-${internalId}` } = props;
  const registerItem = useLightboxStore((state) => state.registerItem);
  const items = useLightboxStore((state) => state.items);
  const activeItem = useLightboxStore((state) => state.activeItemIndex);
  const [isActive, setIsActive] = useState(false);

  const item = useRef<ItemDataRef["current"]>({
    domRef: itemRef,
  });

  useEffect(() => {
    registerItem(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    setIsActive(items[activeItem].current.domRef.current?.id === id);
  }, [activeItem, id, items]);

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
  const defaultItems = getValidChildren(children);
  const activeItemIndex = useLightboxStore((state) => state.activeItemIndex);

  return (
    <div {...props}>
      {defaultItems.map((child, index) => {
        const isActive = activeItemIndex === index;
        return (
          <div
            key={child.key}
            style={{
              display: isActive ? "block" : "none",
            }}
          >
            {child}
          </div>
        );
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
  const { items, activeItemIndex } = useLightboxStore((state) => ({
    items: state.items,
    activeItemIndex: state.activeItemIndex,
  }));

  if (items.length === 0) return null;

  return (
    <>
      {runIfFunction(children, {
        activeItem: activeItemIndex + 1,
        itemsCount: items.length,
      })}
    </>
  );
};

interface WrapperProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  loop?: boolean;
}

const Wrapper = ({ children, open, onClose, loop, ...props }: WrapperProps) => {
  useLightboxStore.setState({ loop });

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

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
  //Thumbs,
});
