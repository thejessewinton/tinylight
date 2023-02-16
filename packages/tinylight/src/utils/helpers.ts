// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = <T extends Function = Function>(
  value: unknown
): value is T => typeof value === "function";

export const runIfFunction = <T, U>(
  valueOrFn: T | ((...fnArgs: U[]) => T),
  ...args: U[]
) => {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
};
