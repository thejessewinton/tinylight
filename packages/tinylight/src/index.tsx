"use client";

import React from "react";
import { Provider, useLightboxContext } from "./provider";
import { ACTIONS } from "./utils/actions";
import { runIfFunction } from "./utils/helpers";
import type { MaybeRenderProp } from "./utils/types";

const IS_SERVER = typeof window === "undefined";
const useIsomorphicLayoutEffect = IS_SERVER
  ? React.useLayoutEffect
  : React.useEffect;

const getValidChildren = (children: React.ReactNode) => {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  ) as React.ReactElement[];
};

type TriggerProps = React.HTMLAttributes<HTMLButtonElement>;

const Trigger = ({ children, ...rest }: TriggerProps) => {
  const { state, dispatch } = useLightboxContext();
  return (
    <button
      onClick={() =>
        dispatch({
          type: ACTIONS.TOGGLE_OPEN,
          payload: {
            open: !state.open,
          },
        })
      }
      {...rest}
    >
      {children}
    </button>
  );
};

interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: never;
}

const Overlay = (props: OverlayProps) => {
  const { state } = useLightboxContext();
  return (
    <>
      {state.open ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          {...props}
        />
      ) : null}
    </>
  );
};

// Lightbox items component
type PortalProps = React.HTMLAttributes<HTMLDivElement>;

const Portal = ({ children, ...rest }: PortalProps) => {
  const { state, dispatch } = useLightboxContext();

  useIsomorphicLayoutEffect(() => {
    if (state.open) {
      document.body.style.overflow = "hidden";
    } else {
      null;
    }
  }, [state.open]);

  useIsomorphicLayoutEffect(() => {
    // close lightbox on escape key press
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch({
          type: ACTIONS.TOGGLE_OPEN,
          payload: {
            open: false,
          },
        });
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return <>{state.open ? <div {...rest}>{children}</div> : null}</>;
};

// Lightbox items component
type ItemsProps = React.HTMLAttributes<HTMLDivElement>;

const Items = ({ children, ...rest }: ItemsProps) => {
  const items = getValidChildren(children);
  const { state, dispatch } = useLightboxContext();

  useIsomorphicLayoutEffect(() => {
    dispatch({
      type: ACTIONS.SET_ITEMS_COUNT,
      payload: {
        length: items.length,
      },
    });
  }, [dispatch, items.length]);

  return (
    <div {...rest}>
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

// Lightbox navigation component
interface NavProps extends React.HTMLAttributes<HTMLButtonElement> {
  direction: "next" | "previous";
}

const Nav = ({ children, direction, ...rest }: NavProps) => {
  const { state, dispatch } = useLightboxContext();
  const handleNav = () => {
    if (direction === "previous") {
      if (state.activeItem === 0) {
        dispatch({
          type: ACTIONS.RESET_STATE,
        });
      } else {
        dispatch({
          type: ACTIONS.SET_ACTIVE_ITEM,
          payload: {
            index: state.activeItem - 1,
          },
        });
      }
    }
    if (direction === "next") {
      if (state.activeItem === state.itemsCount - 1) {
        dispatch({
          type: ACTIONS.RESET_STATE,
        });
      } else {
        dispatch({
          type: ACTIONS.SET_ACTIVE_ITEM,
          payload: {
            index: state.activeItem + 1,
          },
        });
      }
    }
  };
  return (
    <button onClick={handleNav} {...rest}>
      {children}
    </button>
  );
};

interface PaginationProps {
  children: MaybeRenderProp<{
    activeItem: number;
    itemsCount: number;
  }>;
}

const Pagination = ({ children }: PaginationProps) => {
  const { state } = useLightboxContext();
  return (
    <>
      {runIfFunction(children, {
        activeItem: state.activeItem,
        itemsCount: state.itemsCount,
      })}
    </>
  );
};

// The whole shebang
type WrapperProps = React.HTMLAttributes<HTMLDivElement>;

export const Lightbox = ({ children, ...rest }: WrapperProps) => {
  return <Provider {...rest}>{children}</Provider>;
};

Lightbox.Trigger = Trigger;
Lightbox.Overlay = Overlay;
Lightbox.Portal = Portal;
Lightbox.Items = Items;
Lightbox.Nav = Nav;
Lightbox.Pagination = Pagination;
