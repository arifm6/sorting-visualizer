import { sort } from "@/scripts/algorithms";
import { AnimationType, SortingType, InitialStateType } from "./context";

export const updateSpeed = (speed = 50) => {
  return { type: "UPDATE_SPEED", payload: speed };
};

export const updateHighlighted = (highlighted: number[]) => {
  return { type: "UPDATE_HIGHLIGHTED", payload: highlighted };
};
export const setFrameIndexInterval = (timerFunction: any) => {
  return { type: "SET_FRAME_INDEX_INTERVAL", payload: timerFunction };
};
export const setActive = () => {
  return { type: "SET_ACTIVE" };
};
export const setInactive = () => {
  return { type: "SET_INACTIVE" };
};
export const setAnimationFrameIndex = (animateFrameIndex: number) => {
  return { type: "SET_ANIMATION_FRAME_INDEX", payload: animateFrameIndex };
};
export const incrementAnimationFrameIndex = () => {
  return { type: "INCREMENT_ANIMATION_FRAME_INDEX" };
};

export const animationReducer = (state: AnimationType, action: any) => {
  switch (action.type) {
    case "UPDATE_SPEED":
      return { ...state, speed: action.payload };
    case "UPDATE_HIGHLIGHTED":
      return { ...state, highlighted: [...action.payload] };
    case "SET_FRAME_INDEX_INTERVAL":
      return { ...state, frameIndexInterval: action.payload };
    case "SET_ACTIVE":
      return { ...state, active: true };
    case "SET_INACTIVE":
      return { ...state, active: false };
    case "SET_ANIMATION_FRAME_INDEX":
      return { ...state, animationFrameIndex: action.payload };
    case "INCREMENT_ANIMATION_FRAME_INDEX":
      return { ...state, animationFrameIndex: state.animationFrameIndex + 1 };
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
export const incrementCurrentFrameIndex = () => {
  return { type: "INCREMENT_CURRENT_FRAME_INDEX" };
};
export const decrementCurrentFrameIndex = () => {
  return { type: "DECREMENT_CURRENT_FRAME_INDEX" };
};
export const animateFrame = () => {
  return { type: "ANIMATE_FRAME" };
};
export const sortingReducer = (state: SortingType, action: any) => {
  switch (action.type) {
    case "UPDATE_ALGORITHM":
      return { ...state, algorithm: action.payload };
    case "UPDATE_ARRAY":
      return { ...state, array: [...action.payload] };
    case "RANDOMIZE_ARRAY":
      const randomArray = Array.from({ length: state.array.length }, () =>
        Math.floor(Math.random() * 100)
      );
      return {
        ...state,
        originalArray: [...randomArray],
        array: [...randomArray],
      };
    case "UPDATE_ARRAY_SIZE":
      return {
        ...state,
        array: Array.from({ length: action.payload }, () =>
          Math.floor(Math.random() * 100)
        ),
      };
    //sorts as well as generates frames and saves original for use in animation
    case "GENERATE_FRAMES": {
      const { array } = state;
      const tempArray = [...array];
      return {
        ...state,
        frames: [...sort(tempArray, state.algorithm)],
        sortedArray: [...tempArray],
      };
    }
    case "SWAP_ARRAY_INDICES": {
      const tempArray = [...state.array];

      //if 3, then update and not swap first is index, second is value, third empty

      if (action.payload.length === 3) {
        if (action.payload[1] === undefined) {
          return { ...state };
        }
        tempArray[action.payload[0]] = action.payload[1];
        return { ...state, array: [...tempArray] };
      }
      const temp = tempArray[action.payload[0]];
      tempArray[action.payload[0]] = tempArray[action.payload[1]];
      tempArray[action.payload[1]] = temp;
      return { ...state, array: [...tempArray] };
    }
    case "SET_CURRENT_FRAME_INDEX":
      return { ...state, currentFrameIndex: action.payload };
    case "INCREMENT_CURRENT_FRAME_INDEX":
      if (state.currentFrameIndex === state.frames.length - 1) {
        return state;
      }
      return {
        ...state,
        currentFrameIndex: state.currentFrameIndex + 1,
        direction: 1,
      };
    case "DECREMENT_CURRENT_FRAME_INDEX":
      if (state.currentFrameIndex === 0) {
        return state;
      }
      return {
        ...state,
        currentFrameIndex: state.currentFrameIndex - 1,
        direction: -1,
      };

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
