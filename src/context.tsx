import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { mainReducer } from "./reducers";

export type AnimationType = {
  speed: number;
};
export type SortingType = {
  algorithm: string;
  array: number[];
  arraySize: number;
};
export type InitialStateType = {
  animation: AnimationType;
  sorting: SortingType;
};
export const initialState = {
  animation: { speed: 50 },
  sorting: {
    algorithm: "",
    array: new Array(50),
    arraySize: 50,
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
