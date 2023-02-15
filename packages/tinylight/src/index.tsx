"use client";

import React from "react";
import { Provider, useLightboxContext } from "./provider";

const IS_SERVER = typeof window === "undefined";
const useIsomorphicLayoutEffect = IS_SERVER
  ? React.useEffect
  : React.useLayoutEffect;

// Get the valid children from the children prop, ignoring null or falsy values
const getValidChildren = (children: React.ReactNode) => {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  ) as React.ReactElement[];
};

interface TriggerProps extends React.HTMLAttributes<HTMLButtonElement> {}

const Trigger = ({ children, onClick, ...rest }: TriggerProps) => {
  return (
    <button onClick={() => console.log("clicked")} {...rest}>
      {children}
    </button>
  );
};

interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {}

const Overlay = ({ children, style, ...rest }: OverlayProps) => {
  return <div {...rest}>{children}</div>;
};

// Lightbox items component
interface ItemsProps extends React.HTMLAttributes<HTMLDivElement> {}

const Items = ({ children, ...rest }: ItemsProps) => {
  return (
    <div {...rest}>
      {getValidChildren(children).map((child, index) => {
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
  // const handleNav = () => {
  //   if (direction === "previous") {
  //     if (currentItem === 0) {
  //       toggleOpen();
  //       setCurrentItem(items.length - 1);
  //     } else {
  //       setCurrentItem(currentItem - 1);
  //     }
  //   }
  //   if (direction === "next") {
  //     if (currentItem >= items.length - 1) {
  //       toggleOpen();
  //       setCurrentItem(items.length - 1);
  //     } else {
  //       setCurrentItem(currentItem + 1);
  //     }
  //   }
  // };
  const context = useLightboxContext();
  console.log(context.state);

  return (
    <button onClick={() => console.log("nav handler")} {...rest}>
      {children}
    </button>
  );
};

// The whole shebang
interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {}

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
