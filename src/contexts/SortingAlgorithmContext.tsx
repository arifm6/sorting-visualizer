import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type SortingAlgorithmContextProviderProps = {
  children: ReactNode;
};
type SortingAlgorithmContextProvider = {
  algorithm?: string;
  setAlgorithm?: Dispatch<SetStateAction<string>>;
};
export const SortingAlgorithmContext =
  createContext<SortingAlgorithmContextProvider | null>(null);
export const SortingAlgorithmContextProvider = ({
  children,
}: SortingAlgorithmContextProviderProps) => {
  const [algorithm, setAlgorithm] = useState("");
  return (
    <SortingAlgorithmContext.Provider value={{ algorithm, setAlgorithm }}>
      {children}
    </SortingAlgorithmContext.Provider>
  );
};
