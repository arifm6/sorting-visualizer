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
  frameIndexInterval: any;
  highlighted: number[];
  active: boolean;
  animationFrameIndex: number;
};
export type SortingType = {
  algorithm: string;
  originalArray: number[];
  array: number[];
  sortedArray: number[];
  frames: Frame[];
  currentFrameIndex: number;
  direction: number;
};
export type InitialStateType = {
  animation: AnimationType;
  sorting: SortingType;
};
export const initialState = {
  animation: {
    speed: 50,
    frameIndexInterval: null,
    highlighted: [-1, -1],
    active: false,
    animationFrameIndex: 0,
  },
  sorting: {
    algorithm: "",
    originalArray: new Array(50),

    array: new Array(50),
    sortedArray: new Array(50),

    frames: [{ elements: [], highlighted: [] }],
    currentFrameIndex: 0,
    direction: 1,
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
