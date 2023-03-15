import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type AnimationContextProviderProps = {
  children: ReactNode;
};
type AnimationContextProvider = {
  animationSpeed: number;
  setAnimationSpeed: Dispatch<SetStateAction<number>>;
};
export const AnimationContext = createContext<AnimationContextProvider | null>(
  null
);
export const AnimationContextProvider = ({
  children,
}: AnimationContextProviderProps) => {
  const [animationSpeed, setAnimationSpeed] = useState(50);
  return (
    <AnimationContext.Provider value={{ animationSpeed, setAnimationSpeed }}>
      {children}
    </AnimationContext.Provider>
  );
};
