"use client";

import React from "react";
import { createPortal } from "react-dom";
import { getValidChildren, runIfFunction } from "../../utils/helpers";
import type { MaybeRenderProp } from "../../types";
import { ACTIONS, Provider, useLightboxContext } from "./provider";

const IS_SERVER = typeof window === "undefined";
const useIsomorphicLayoutEffect = IS_SERVER
  ? React.useLayoutEffect
  : React.useEffect;

type ToggleProps = React.HTMLAttributes<HTMLButtonElement>;

const Toggle = ({ children, ...rest }: ToggleProps) => {
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

const Portal = ({ children, style, ...rest }: PortalProps) => {
  const { state, dispatch } = useLightboxContext();

  useIsomorphicLayoutEffect(() => {
    if (state.open) {
      document.body.style.overflow = "hidden";
    } else {
      null;
    }
  }, [state.open]);

  useIsomorphicLayoutEffect(() => {
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

  return (
    <>
      {state.open
        ? createPortal(
            <div style={{ position: "absolute", ...style }} {...rest}>
              {children}
            </div>,
            document.body
          )
        : null}
    </>
  );
};

type ThumbProps = React.HTMLAttributes<HTMLDivElement>;

const Thumbs = ({ children, ...rest }: ThumbProps) => {
  const items = getValidChildren(children);
  const { dispatch } = useLightboxContext();

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
          <button
            key={child.key}
            onClick={() =>
              dispatch({
                type: ACTIONS.SET_ACTIVE_ITEM,
                payload: {
                  index,
                },
              })
            }
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

interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
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
        activeItem: state.activeItem + 1,
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

Lightbox.Toggle = Toggle;
Lightbox.Overlay = Overlay;
Lightbox.Portal = Portal;
Lightbox.Items = Items;
Lightbox.Nav = Nav;
Lightbox.Pagination = Pagination;
