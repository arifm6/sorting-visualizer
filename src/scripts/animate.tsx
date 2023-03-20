import { InitialStateType } from "@/globalState/context";
import {
  decrementCurrentFrameIndex,
  incrementCurrentFrameIndex,
  setCurrentFrameIndex,
  setFrameIndexInterval,
  swapArrayIndices,
  updateArray,
  updateHighlighted,
} from "@/globalState/reducers";

//direction 1 = forward, -1 = backward
export function animateFrame(
  state: InitialStateType,
  dispatch: React.Dispatch<any>,
  direction: number = 1
) {
  var { frames, currentFrameIndex } = { ...state.sorting };
  if (currentFrameIndex !== 0 && direction === -1) {
    currentFrameIndex -= 1;
  }
  const frameToAnimate = frames[currentFrameIndex];
  if (direction === 1) {
    dispatch(incrementCurrentFrameIndex());
  } else if (direction === -1) {
    dispatch(decrementCurrentFrameIndex());
  }
  dispatch(updateHighlighted(frameToAnimate.highlighted));
  if (frameToAnimate.elements.length === 2) {
    dispatch(swapArrayIndices(frameToAnimate.elements));
  }
}
export function skipToEnd(
  state: InitialStateType,
  dispatch: React.Dispatch<any>
) {
  dispatch(updateArray(state.sorting.sortedArray));
  dispatch(setCurrentFrameIndex(state.sorting.frames.length - 1));
  dispatch(
    updateHighlighted(
      state.sorting.frames[state.sorting.frames.length - 1].highlighted
    )
  );
}

export function skipToBeginning(
  state: InitialStateType,
  dispatch: React.Dispatch<any>
) {
  dispatch(updateArray(state.sorting.originalArray));
  dispatch(setCurrentFrameIndex(0));
  dispatch(updateHighlighted(state.sorting.frames[0].highlighted));
}
export function startAnimation(
  state: InitialStateType,
  dispatch: React.Dispatch<any>
) {}
