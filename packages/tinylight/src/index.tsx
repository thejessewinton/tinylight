"use client";

import React from "react";
import { Provider, useLightboxContext } from "./provider";
import { ACTIONS } from "./utils/actions";

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

type OverlayProps = React.HTMLAttributes<HTMLDivElement>;

const Overlay = ({ children, ...rest }: OverlayProps) => {
  return <div {...rest}>{children}</div>;
};

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

const Item = ({ children, index, style, ...rest }: ItemProps) => {
  const { state } = useLightboxContext();
  return (
    <div
      style={{
        display: state.activeItem === index ? "block" : "none",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

// Lightbox items component
type ItemsProps = React.HTMLAttributes<HTMLDivElement>;

const Items = ({ children, ...rest }: ItemsProps) => {
  const items = getValidChildren(children);
  const { state, dispatch } = useLightboxContext();
  console.log(state);

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
          <Item index={index} key={child.key}>
            {child}
          </Item>
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
      if (state.activeItem >= state.itemsCount) {
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

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement;
}

const Pagination = ({ children, ...rest }: PaginationProps) => {
  const { state } = useLightboxContext();
  return (
    <div {...rest}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeItem: state.activeItem })
      )}
    </div>
  );
};

// The whole shebang
type WrapperProps = React.HTMLAttributes<HTMLDivElement>;

export const Lightbox = ({ children, ...rest }: WrapperProps) => {
  return (
    <Provider>
      <div {...rest}>{children}</div>
    </Provider>
  );
};

Lightbox.Trigger = Trigger;
Lightbox.Overlay = Overlay;
Lightbox.Items = Items;
Lightbox.Nav = Nav;
Lightbox.Pagination = Pagination;
