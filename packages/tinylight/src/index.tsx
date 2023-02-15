"use client";

import React from "react";
import { Provider, useLightboxContext } from "./provider";
import { ACTIONS } from "./utils/actions";

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

// Lightbox items component
type ItemsProps = React.HTMLAttributes<HTMLDivElement>;

const Items = ({ children, ...rest }: ItemsProps) => {
  return (
    <div {...rest}>
      {getValidChildren(children).map((child) => {
        return <div key={child.key}>{child}</div>;
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
      if (state.activeItem >= 1) {
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
  const context = useLightboxContext();
  console.log(context.state);

  return (
    <button onClick={handleNav} {...rest}>
      {children}
    </button>
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
