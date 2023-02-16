import type { ACTIONS } from "./actions";

export type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type ReducerPayload = {
  [ACTIONS.RESET_STATE]: undefined;
  [ACTIONS.TOGGLE_OPEN]: {
    open: boolean;
  };
  [ACTIONS.SET_ITEMS_COUNT]: {
    length: number;
  };
  [ACTIONS.SET_ACTIVE_ITEM]: {
    index: number;
  };
};

export type ReducerActions =
  ActionMap<ReducerPayload>[keyof ActionMap<ReducerPayload>];

export type MaybeRenderProp<P> =
  | React.ReactNode
  | ((props: P) => React.ReactNode);
