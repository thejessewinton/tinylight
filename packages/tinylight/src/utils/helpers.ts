import React from "react";

const isFunction = <T extends CallableFunction = CallableFunction>(
  value: unknown
): value is T => typeof value === "function";

export const runIfFunction = <T, U>(
  valueOrFn: T | ((...fnArgs: U[]) => T),
  ...args: U[]
) => {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
};

export const getValidChildren = (children: React.ReactNode) => {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  ) as React.ReactElement[];
};
