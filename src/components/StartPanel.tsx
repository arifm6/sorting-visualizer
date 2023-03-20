import { AppContext } from "@/globalState/context";
import {
  decrementCurrentFrameIndex,
  incrementAnimationFrameIndex,
  incrementCurrentFrameIndex,
  setActive,
  setAnimationFrameIndex,
  setFrameIndexInterval,
  setInactive,
} from "@/globalState/reducers";
import {
  animateFrame,
  skipToBeginning,
  skipToEnd,
  startAnimation,
} from "@/scripts/animate";
import React, { use, useContext, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
type Props = {};
export default function StartPanel({}: Props) {
  const nodeRef = useRef(null);
  const { state, dispatch } = useContext(AppContext);
  const [start, setStart] = useState(true);
  //stop initial useEffect
  //whenever the frame index changes, animate the previous frame
  useEffect(() => {
    if (start) {
      setStart(false);
      return;
    }
    animateFrame(state, dispatch);
    console.log(state.animation.animationFrameIndex);
    if (
      state.animation.animationFrameIndex ===
      state.sorting.frames.length - 1
    ) {
      clearInterval(state.animation.frameIndexInterval);
      dispatch(setInactive());
    }
  }, [state.animation.animationFrameIndex]);
  useEffect(() => {
    dispatch(setAnimationFrameIndex(state.sorting.currentFrameIndex));

    if (state.animation.active) {
      dispatch(
        setFrameIndexInterval(
          setInterval(() => {
            dispatch(incrementAnimationFrameIndex());
          }, state.animation.speed)
        )
      );
    } else {
      clearInterval(state.animation.frameIndexInterval);
    }
  }, [state.animation.active]);
  const buttonStyle = `${
    state.animation.active ? "disabled-button" : "button"
  } start-panel-button disable-drag `;

  return (
    <Draggable nodeRef={nodeRef} cancel=".disable-drag">
      <div
        className="start-panel grid grid-rows-2 grid-cols-3 gap-2"
        ref={nodeRef}
      >
        <button
          className={buttonStyle}
          onClick={() => {
            skipToBeginning(state, dispatch);
          }}
        >
          Skip Back
        </button>
        <button
          className={buttonStyle}
          onClick={() => {
            animateFrame(state, dispatch, -1);
          }}
        >
          Step Back
        </button>
        <button
          className={buttonStyle}
          onClick={() => {
            if (
              state.sorting.algorithm &&
              !(
                state.sorting.currentFrameIndex ===
                state.sorting.frames.length - 1
              )
            ) {
              dispatch(setActive());
            }
          }}
        >
          Start Search
        </button>
        <button
          className={`${
            !state.animation.active ? "disabled-button" : "button"
          } start-panel-button disable-drag`}
          onClick={() => {
            dispatch(setInactive());
          }}
        >
          Pause Search
        </button>
        <button
          className={buttonStyle}
          onClick={() => {
            animateFrame(state, dispatch, 1);
          }}
        >
          Step Forward
        </button>
        <button
          className={buttonStyle}
          onClick={() => {
            skipToEnd(state, dispatch);
          }}
        >
          Skip Forward
        </button>
      </div>
    </Draggable>
  );
}
function setsetFrameIndexInterval(arg0: NodeJS.Timeout): any {
  throw new Error("Function not implemented.");
}
