import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { mainReducer } from "./reducers";

export type Frame = {
  //elements to swap
  elements: number[];
  //highlighted elements
  highlighted: number[];
};

export type AnimationType = {
  speed: number;
  highlighted: number[];
};
export type SortingType = {
  algorithm: string;
  array: number[];
  frames: Frame[];
  currentFrameIndex: number;
};
export type InitialStateType = {
  animation: AnimationType;
  sorting: SortingType;
};
export const initialState = {
  animation: { speed: 50, highlighted: [-1, -1] },
  sorting: {
    algorithm: "",
    array: new Array(50),
    frames: [{ elements: [], highlighted: [] }],
    currentFrameIndex: 0,
  },
};

export const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

type AppProviderProps = {
  children: ReactNode;
};
export const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
