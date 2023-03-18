import { InitialStateType } from "@/globalState/context";
import {
  setCurrentFrameIndex,
  swapArrayIndices,
  updateHighlighted,
} from "@/globalState/reducers";

//direction 1 = forward, -1 = backward
export function animateFrame(
  state: InitialStateType,
  dispatch: React.Dispatch<any>,
  direction = 1
) {
  const { array, frames, currentFrameIndex } = { ...state.sorting };
  let currentFrame = frames[currentFrameIndex];
  if (direction === -1) {
    if (currentFrameIndex <= 0) {
      return;
    }
    currentFrame = frames[currentFrameIndex + direction];

    dispatch(setCurrentFrameIndex(currentFrameIndex + direction));
  }
  //if
  if (!currentFrame) {
    return;
  }

  dispatch(updateHighlighted(currentFrame.highlighted));
  if (currentFrame.elements.length === 2) {
    dispatch(swapArrayIndices(currentFrame.elements));
  }
  dispatch(setCurrentFrameIndex(currentFrameIndex + direction));
}

export function skipToEnd(
  state: InitialStateType,
  dispatch: React.Dispatch<any>
) {
  let { array, frames, currentFrameIndex } = { ...state.sorting };
  let currentFrame = frames[currentFrameIndex];
  while (currentFrame) {
    if (currentFrame.elements.length === 2) {
      dispatch(swapArrayIndices(currentFrame.elements));
    }
    currentFrameIndex += 1;
    currentFrame = frames[currentFrameIndex];
  }
  currentFrameIndex = frames.length - 1;
  currentFrame = frames[currentFrameIndex];
  dispatch(updateHighlighted(currentFrame.highlighted));
  dispatch(setCurrentFrameIndex(currentFrameIndex));
}

export function skipToBeginning(
  state: InitialStateType,
  dispatch: React.Dispatch<any>
) {
  let { array, frames, currentFrameIndex } = { ...state.sorting };
  currentFrameIndex -= 1;
  let currentFrame = frames[currentFrameIndex];
  while (currentFrame) {
    if (currentFrame.elements.length === 2) {
      dispatch(swapArrayIndices(currentFrame.elements));
    }
    currentFrameIndex -= 1;
    currentFrame = frames[currentFrameIndex];
  }
  currentFrameIndex = 0;
  currentFrame = frames[currentFrameIndex];
  dispatch(updateHighlighted(currentFrame.highlighted));
  dispatch(setCurrentFrameIndex(currentFrameIndex));
}
