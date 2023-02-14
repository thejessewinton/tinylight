import React from 'react';
import { create } from 'zustand';

export interface LightboxState {
  isOpen: boolean;
  items: number[];
  toggleOpen: () => void;
  currentItem: number;
  setCurrentItem: (index: number) => void;
}

export const useLightboxStore = create<LightboxState>((set) => ({
  isOpen: false,
  items: [1, 2, 3, 4, 5],
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  currentItem: 0,
  setCurrentItem: (index: number) => set(() => ({ currentItem: index })),
}));

const TinyboxWrapper = ({
  children,
  as: Wrapper = 'div',
}: {
  children: React.ReactNode;
  as?: React.ElementType;
}) => {
  return <Wrapper>{children}</Wrapper>;
};

const TinyboxItem = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const TinyboxNav = ({
  children,
  direction,
}: {
  children: React.ReactNode;
  direction: 'next' | 'previous';
}) => {
  const { items, currentItem, setCurrentItem, toggleOpen } = useLightboxStore();

  const handleNav = () => {
    if (direction === 'next') {
      if (currentItem === 0) {
        toggleOpen();
      }
      setCurrentItem(currentItem - 1);
    }
    if (direction === 'previous') {
      if (currentItem >= items.length - 1) {
        toggleOpen();
      } else {
        setCurrentItem(currentItem + 1);
      }
    }
  };

  return (
    <div>
      <button onClick={handleNav}>{children}</button>
    </div>
  );
};

export const Tinybox = ({ children }: { children: React.ReactNode }) => {
  return <TinyboxWrapper>{children}</TinyboxWrapper>;
};

Tinybox.Item = TinyboxItem;
Tinybox.Nav = TinyboxNav;
