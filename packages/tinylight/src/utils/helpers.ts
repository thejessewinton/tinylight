import React from "react";
import { clamp } from "remeda";

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

export const formatTime = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);

  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export const scaleValue = (
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number
) => {
  return function mapLinearly(input: number) {
    const newInput = clamp(input, { min: inputMin, max: inputMax });

    const distance = outputMax - outputMin;
    const pct = (newInput - inputMin) / (inputMax - inputMin);

    return outputMin + distance * pct;
  };
};
