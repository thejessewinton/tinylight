import { ACTIONS } from "./actions";

export type ActionMap<M extends { [index: string]: any }> = {
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
  [ACTIONS.TOGGLE_OPEN]: {
    id: number;
    name: string;
    price: number;
  };
  [ACTIONS.SET_ACTIVE_ITEM]: {
    id: number;
  };
};

export type ReducerActions =
  ActionMap<ReducerPayload>[keyof ActionMap<ReducerPayload>];
