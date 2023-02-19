"use client";

import React from "react";
import { createPortal } from "react-dom";
import { getValidChildren, runIfFunction } from "../../utils/helpers";
import type { MaybeRenderProp } from "../../types";
import { atom, useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";

export const lightboxAtom = atom({
  open: false,
  itemsCount: 0,
  activeItem: 0,
});

const itemsReadOnlyAtom = atom((get) => {
  return {
    itemsCount: get(lightboxAtom).itemsCount,
    activeItem: get(lightboxAtom).activeItem,
  };
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
  const [state, setState] = useAtom(lightboxAtom);

  React.useEffect(() => {
    console.log("items", items);
    setState({ ...state, itemsCount: items.length });
  }, []);

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
  const [state] = useAtom(itemsReadOnlyAtom);

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
  const [state] = useAtom(lightboxAtom);
  useHydrateAtoms([[lightboxAtom, { ...state, open }]]);

  return (
    <>
      {state.open
        ? createPortal(<div {...props}>{children}</div>, document.body)
        : null}
    </>
  );
};

export const Lightbox = Object.assign(Wrapper, {
  Items,
  Nav,
  Pagination,
  Thumbs,
});
