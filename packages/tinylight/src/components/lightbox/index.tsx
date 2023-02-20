"use client";

import React from "react";
import { createPortal } from "react-dom";
import { getValidChildren, runIfFunction } from "../../utils/helpers";
import type { MaybeRenderProp } from "../../types";
import { atom, useAtom } from "jotai";

export const lightboxAtom = atom({
  itemsCount: 0,
  activeItem: 0,
});

type ThumbProps = React.HTMLAttributes<HTMLDivElement>;

const Thumbs = ({ children, ...props }: ThumbProps) => {
  const items = getValidChildren(children);
  const [state, setState] = useAtom(lightboxAtom);

  return (
    <div {...props}>
      {items.map((child, index) => {
        return (
          <button
            key={child.key}
            onClick={() => setState({ ...state, activeItem: index })}
          >
            {child}
          </button>
        );
      })}
    </div>
  );
};

// Lightbox items component
type ItemsProps = React.HTMLAttributes<HTMLDivElement>;

const Items = ({ children, ...props }: ItemsProps) => {
  const items = getValidChildren(children);
  const [state, dispatch] = useAtom(lightboxAtom);

  // set items count in state
  React.useMemo(() => {
    dispatch({ ...state, itemsCount: items.length });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  return (
    <div {...props}>
      {items.map((child, index) => {
        return (
          <div
            key={child.key}
            style={{
              display: state.activeItem === index ? "block" : "none",
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

interface NavProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: MaybeRenderProp<{
    toPrev: () => void;
    toNext: () => void;
  }>;
}

const Nav = ({ children }: NavProps) => {
  const [state, setState] = useAtom(lightboxAtom);

  return (
    <>
      {runIfFunction(children, {
        toPrev: () => setState({ ...state, activeItem: state.activeItem - 1 }),
        toNext: () => setState({ ...state, activeItem: state.activeItem + 1 }),
      })}
    </>
  );
};

interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: MaybeRenderProp<{
    activeItem: number;
    itemsCount: number;
  }>;
}

const Pagination = ({ children }: PaginationProps) => {
  const [state] = useAtom(lightboxAtom);

  if (state.itemsCount === 0) return null;

  return (
    <>
      {runIfFunction(children, {
        activeItem: state.activeItem + 1,
        itemsCount: state.itemsCount,
      })}
    </>
  );
};

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
}

const Wrapper = ({ children, open, ...props }: WrapperProps) => {
  const hasOpen = Object.keys(props).includes("open");
  if (hasOpen) {
    throw new Error(`You forgot an \`open\` prop.`);
  }

  if (typeof open !== "boolean") {
    throw new Error(`The \`open\` prop must be a boolean value.`);
  }

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
  Pagination,
  Nav,
  Thumbs,
});
