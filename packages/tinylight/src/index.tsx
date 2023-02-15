"use client";

import React from "react";
import { create } from "zustand";
import { clsx } from "clsx";

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

// Create a default state for the lightbox
export interface LightboxState {
  isOpen: boolean;
  items: number[];
  length: number;
  setLength: (length: number) => void;
  toggleOpen: () => void;
  currentItem: number;
  setCurrentItem: (index: number) => void;
}

// create a Zustand store, declared as a React hook
export const useLightboxStore = create<LightboxState>((set) => ({
  isOpen: false,
  items: [1, 2, 3, 4, 5],
  length: 0,
  setLength: (length) => set({ length }),
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  currentItem: 0,
  setCurrentItem: (index: number) => set(() => ({ currentItem: index })),
}));

interface TriggerProps extends React.HTMLAttributes<HTMLButtonElement> {}

const Trigger = ({ children, onClick, ...rest }: TriggerProps) => {
  const { toggleOpen } = useLightboxStore();

  return (
    <button onClick={toggleOpen} {...rest}>
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
  const { isOpen, currentItem } = useLightboxStore();
  return (
    <div {...rest}>
      {isOpen ? getValidChildren(children)[currentItem] : null}
    </div>
  );
};

// Lightbox item component
interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {}

const Item = ({ children, ...rest }: ItemProps) => {
  return <div {...rest}>{children}</div>;
};

// Lightbox navigation component
interface NavProps extends React.HTMLAttributes<HTMLButtonElement> {
  direction: "next" | "previous";
}

const Nav = ({ children, direction, ...rest }: NavProps) => {
  const { items, currentItem, setCurrentItem, toggleOpen } = useLightboxStore();

  const handleNav = () => {
    if (direction === "previous") {
      if (currentItem === 0) {
        toggleOpen();
      } else {
        setCurrentItem(currentItem - 1);
      }
    }
    if (direction === "next") {
      if (currentItem >= items.length - 1) {
        toggleOpen();
      } else {
        setCurrentItem(currentItem + 1);
      }
    }
  };

  return (
    <button onClick={handleNav} {...rest}>
      {children}
    </button>
  );
};

// The whole shebang
interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Lightbox = ({ children, ...rest }: WrapperProps) => {
  const { toggleOpen } = useLightboxStore();

  useIsomorphicLayoutEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        toggleOpen();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);
  return <div {...rest}>{children}</div>;
};

Lightbox.Trigger = Trigger;
Lightbox.Overlay = Overlay;
Lightbox.Items = Items;
Lightbox.Item = Item;
Lightbox.Nav = Nav;
