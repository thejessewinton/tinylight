"use client";

import React from "react";
import { createPortal } from "react-dom";
import { getValidChildren, runIfFunction } from "../../utils/helpers";
import type { MaybeRenderProp } from "../../types";
import { ACTIONS, Provider, useLightboxContext } from "./provider";

type ToggleProps = React.HTMLAttributes<HTMLButtonElement>;

const Toggle = ({ children, ...props }: ToggleProps) => {
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
      {...props}
    >
      {children}
    </button>
  );
};

// Lightbox items component
type PortalProps = React.HTMLAttributes<HTMLDivElement>;

const Portal = ({ children, ...props }: PortalProps) => {
  const { state, dispatch } = useLightboxContext();

  React.useEffect(() => {
    if (state.open) {
      document.body.style.overflow = "hidden";
    } else {
      null;
    }
  }, [state.open]);

  React.useEffect(() => {
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
  }, [dispatch]);

  return (
    <>
      {state.open
        ? createPortal(<div {...props}>{children}</div>, document.body)
        : null}
    </>
  );
};

type ThumbProps = React.HTMLAttributes<HTMLDivElement>;

const Thumbs = ({ children, ...props }: ThumbProps) => {
  const items = getValidChildren(children);
  const { dispatch } = useLightboxContext();

  React.useEffect(() => {
    dispatch({
      type: ACTIONS.SET_ITEMS_COUNT,
      payload: {
        length: items.length,
      },
    });
  }, [dispatch, items.length]);

  return (
    <div {...props}>
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

const Items = ({ children, ...props }: ItemsProps) => {
  const items = getValidChildren(children);
  const { state, dispatch } = useLightboxContext();

  React.useEffect(() => {
    dispatch({
      type: ACTIONS.SET_ITEMS_COUNT,
      payload: {
        length: items.length,
      },
    });
  }, [dispatch, items.length]);

  return (
    <div {...props}>
      {items.map((child, index) => {
        return (
          <div
            key={child.key}
            data-active={state.activeItem === index}
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

const Nav = ({ children, direction, ...props }: NavProps) => {
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
    <button onClick={handleNav} {...props}>
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

const Wrapper = ({ children, ...props }: WrapperProps) => {
  return <Provider {...props}>{children}</Provider>;
};

export const Lightbox = Object.assign(Wrapper, {
  Toggle,
  Portal,
  Thumbs,
  Items,
  Nav,
  Pagination,
});
