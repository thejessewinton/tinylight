type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type ReducerActions<P extends { [index: string]: unknown }> =
  ActionMap<P>[keyof ActionMap<P>];

export type MaybeRenderProp<P> =
  | React.ReactNode
  | ((props: P) => React.ReactNode);
