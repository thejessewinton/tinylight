import React, { useReducer } from "react";
import type { ReducerActions } from "../../types";

export const ACTIONS = {
  RESET_STATE: "RESET_STATE",
  TOGGLE_OPEN: "TOGGLE_OPEN",
  SET_ITEMS_COUNT: "SET_ITEMS_COUNT",
  SET_ACTIVE_ITEM: "SET_ACTIVE_ITEM",
  SET_ITEM: "SET_ITEM",
} as const;

const initialState = {
  open: false,
  itemsCount: 0,
  activeItem: 0,
};

type ReducerPayload = {
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

type DispatchActions = ReducerActions<ReducerPayload>;

export const LightboxContext = React.createContext<{
  state: typeof initialState;
  dispatch: React.Dispatch<DispatchActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: typeof initialState, action: DispatchActions) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_OPEN:
      return {
        ...state,
        open: action.payload.open,
      };
    case ACTIONS.SET_ACTIVE_ITEM:
      return {
        ...state,
        activeItem: action.payload.index,
      };
    case ACTIONS.SET_ITEMS_COUNT:
      return {
        ...state,
        itemsCount: action.payload.length,
      };
    case ACTIONS.RESET_STATE:
      return {
        ...state,
        open: false,
        activeItem: 0,
      };
    default:
      return state;
  }
};

interface ProviderProps {
  children: React.ReactNode;
}

export const Provider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <LightboxContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </LightboxContext.Provider>
  );
};

export const useLightboxContext = () => {
  const context = React.useContext(LightboxContext);
  if (context === undefined) {
    throw new Error(
      "useLightboxContext must be used within a LightboxProvider"
    );
  }
  return context;
};
