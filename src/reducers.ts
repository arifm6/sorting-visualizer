import { AnimationType, SortingType, InitialStateType } from "./context";
export const animationReducer = (state: AnimationType, action: any) => {
  switch (action.type) {
    case "UPDATE_SPEED":
      return { ...action.payload, speed: action.payload };
    default:
      return state;
  }
};
export const updateSpeed = (speed = 50) => {
  return { type: "UPDATE_SPEED", payload: speed };
};
export const updateAlgorithm = (algorithm = "insertion sort") => {
  return { type: "UPDATE_ALGORITHM", payload: algorithm };
};
export const updateArraySize = (arraySize = 50) => {
  return { type: "UPDATE_ARRAY_SIZE", payload: arraySize };
};
export const randomizeArray = () => {
  return { type: "RANDOMIZE_ARRAY" };
};
export const sortingReducer = (state: SortingType, action: any) => {
  switch (action.type) {
    case "UPDATE_ALGORITHM":
      return { ...state, algorithm: action.payload };
    case "UPDATE_ARRAY":
      return { ...state, array: action.payload };
    case "RANDOMIZE_ARRAY":
      return {
        ...state,
        array: Array.from({ length: state.arraySize }, () =>
          Math.floor(Math.random() * 100)
        ),
      };
    case "UPDATE_ARRAY_SIZE":
      return { ...state, arraySize: action.payload };
    default:
      return state;
  }
};

export const mainReducer = (
  { animation, sorting }: InitialStateType,
  action: any
) => ({
  animation: animationReducer(animation, action),
  sorting: sortingReducer(sorting, action),
});
