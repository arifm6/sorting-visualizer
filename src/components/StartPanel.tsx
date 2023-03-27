import { AppContext } from "@/globalState/context";
import {
  incrementAnimationFrameIndex,
  setActive,
  setAnimationFrameIndex,
  setFrameIndexInterval,
  setInactive,
} from "@/globalState/reducers";
import { animateFrame, skipToBeginning, skipToEnd } from "@/scripts/animate";
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
    if (
      state.animation.animationFrameIndex ===
      state.sorting.frames.length - 1
    ) {
      clearInterval(state.animation.frameIndexInterval);
      dispatch(setInactive());
    }
  }, [state.animation.animationFrameIndex]);
  //initial point for starting animation
  useEffect(() => {
    clearInterval(state.animation.frameIndexInterval);
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

  const buttonStyle = `start-panel-button disable-drag `;

  return (
    <Draggable nodeRef={nodeRef} cancel=".disable-drag">
      <div className="flex start-panel flex-col" ref={nodeRef}>
        <h1 className="font-bold pb-1 cursor-default  text-center">
          <span className="text-blue-100">Animation Panel</span>
        </h1>
        <div className=" grid grid-rows-2 grid-cols-3 gap-2">
          <button
            className={`${
              state.animation.active || state.sorting.currentFrameIndex <= 1
                ? "disabled-button"
                : "button"
            } ${buttonStyle}`}
            onClick={() => {
              skipToBeginning(state, dispatch);
            }}
          >
            Skip Back
          </button>
          <button
            className={`${
              state.animation.active || state.sorting.currentFrameIndex <= 1
                ? "disabled-button"
                : "button"
            } ${buttonStyle}`}
            onClick={() => {
              animateFrame(state, dispatch, -1);
            }}
          >
            Step Back
          </button>
          <button
            className={`${
              state.animation.active ||
              state.sorting.currentFrameIndex ===
                state.sorting.frames.length - 1
                ? "disabled-button"
                : "button"
            } ${buttonStyle}`}
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
            className={`${
              state.animation.active ||
              state.sorting.currentFrameIndex >= state.sorting.frames.length - 2
                ? "disabled-button"
                : "button"
            } ${buttonStyle}`}
            onClick={() => {
              animateFrame(state, dispatch, 1);
            }}
          >
            Step Forward
          </button>
          <button
            className={`${
              state.animation.active ||
              state.sorting.currentFrameIndex >= state.sorting.frames.length - 2
                ? "disabled-button"
                : "button"
            } ${buttonStyle}`}
            onClick={() => {
              skipToEnd(state, dispatch);
            }}
          >
            Skip Forward
          </button>
        </div>
      </div>
    </Draggable>
  );
}
function setsetFrameIndexInterval(arg0: NodeJS.Timeout): any {
  throw new Error("Function not implemented.");
}
