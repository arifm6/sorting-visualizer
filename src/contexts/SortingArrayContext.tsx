import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type SortingArrayContextProviderProps = {
  children: ReactNode;
};
type SortingArrayContextType = {
  sortingArray: number[];
  setSortingArray: Dispatch<SetStateAction<number[]>>;
  arraySize: number;
  setArraySize: Dispatch<SetStateAction<number>>;
};
export const SortingArrayContext =
  createContext<SortingArrayContextType | null>(null);

export const SortingArrayContextProvider = ({
  children,
}: SortingArrayContextProviderProps) => {
  const [arraySize, setArraySize] = useState<number>(50);
  const [sortingArray, setSortingArray] = useState<number[]>(
    Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100))
  );
  return (
    <SortingArrayContext.Provider
      value={{ arraySize, setArraySize, sortingArray, setSortingArray }}
    >
      {children}
    </SortingArrayContext.Provider>
  );
};
