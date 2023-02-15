'use client';

import React from 'react';
import { create } from 'zustand';

const IS_SERVER = typeof window === 'undefined';
const useIsomorphicLayoutEffect = IS_SERVER
  ? React.useEffect
  : React.useLayoutEffect;

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

// Get the valid children from the children prop, ignoring null or falsy values
const getValidChildren = (children: React.ReactNode) => {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  ) as React.ReactElement[];
};

interface TriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Trigger = ({ children, onClick, ...rest }: TriggerProps) => {
  return (
    <button
      onClick={() => {
        useLightboxStore.getState().toggleOpen();
        onClick ? onClick : null;
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

// Lightbox items component
interface ItemsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Items = ({ children, ...rest }: ItemsProps) => {
  return <div {...rest}></div>;
};

// Lightbox item component
interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Item = ({ children, ...rest }: ItemProps) => {
  return <div {...rest}>{children}</div>;
};

// Lightbox navigation component
interface NavProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  direction: 'next' | 'previous';
}

const Nav = ({ children, direction, ...rest }: NavProps) => {
  const { items, currentItem, setCurrentItem, toggleOpen } = useLightboxStore();

  const handleNav = () => {
    if (direction === 'previous') {
      if (currentItem === 0) {
        toggleOpen();
      } else {
        setCurrentItem(currentItem - 1);
      }
    }
    if (direction === 'next') {
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
interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const TinyLight = ({ children, ...rest }: WrapperProps) => {
  return <div {...rest}>{children}</div>;
};

TinyLight.Trigger = Trigger;
TinyLight.Items = Items;
TinyLight.Item = Item;
TinyLight.Nav = Nav;
