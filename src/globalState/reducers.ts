import { insertionSort } from "@/scripts/algorithms";
import { AnimationType, SortingType, InitialStateType } from "./context";

export const updateSpeed = (speed = 50) => {
  return { type: "UPDATE_SPEED", payload: speed };
};

export const updateHighlighted = (highlighted: number[]) => {
  return { type: "UPDATE_HIGHLIGHTED", payload: highlighted };
};

export const animationReducer = (state: AnimationType, action: any) => {
  switch (action.type) {
    case "UPDATE_SPEED":
      return { ...state, speed: action.payload };
    case "UPDATE_HIGHLIGHTED":
      return { ...state, highlighted: [...action.payload] };
    default:
      return state;
  }
};

export const updateAlgorithm = (algorithm = "insertion sort") => {
  return { type: "UPDATE_ALGORITHM", payload: algorithm };
};
export const updateArray = (array: number[]) => {
  return { type: "UPDATE_ARRAY", payload: array };
};
export const updateArraySize = (arraySize = 50) => {
  return { type: "UPDATE_ARRAY_SIZE", payload: arraySize };
};
export const randomizeArray = () => {
  return { type: "RANDOMIZE_ARRAY" };
};
export const generateFrames = () => {
  return { type: "GENERATE_FRAMES" };
};
export const swapArrayIndices = (payload: number[]) => {
  return { type: "SWAP_ARRAY_INDICES", payload };
};
export const setCurrentFrameIndex = (payload: number) => {
  return { type: "SET_CURRENT_FRAME_INDEX", payload };
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
        array: Array.from({ length: state.array.length }, () =>
          Math.floor(Math.random() * 100)
        ),
      };
    case "UPDATE_ARRAY_SIZE":
      return {
        ...state,
        array: Array.from({ length: action.payload }, () =>
          Math.floor(Math.random() * 100)
        ),
      };
    case "GENERATE_FRAMES": {
      const { array } = state;
      const tempArray = [...array];

      return {
        ...state,
        frames: [...insertionSort(tempArray)],
      };
    }
    case "SWAP_ARRAY_INDICES": {
      const tempArray = [...state.array];
      const temp = tempArray[action.payload[0]];
      tempArray[action.payload[0]] = tempArray[action.payload[1]];
      tempArray[action.payload[1]] = temp;
      return { ...state, array: [...tempArray] };
    }
    case "SET_CURRENT_FRAME_INDEX":
      return { ...state, currentFrameIndex: action.payload };
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
