import { AppContext } from "@/globalState/context";
import { generateFrames } from "@/globalState/reducers";
import { animateFrame, skipToBeginning, skipToEnd } from "@/scripts/animate";
import React, { use, useContext, useEffect, useRef } from "react";
import Draggable from "react-draggable";

type Props = {};

export default function StartPanel({}: Props) {
  const nodeRef = useRef(null);
  const { state, dispatch } = useContext(AppContext);
  return (
    <Draggable nodeRef={nodeRef} cancel=".disable-drag">
      <div
        className="start-panel grid grid-rows-2 grid-cols-3 gap-2"
        ref={nodeRef}
      >
        <button
          className="button start-panel-button disable-drag"
          onClick={() => {
            skipToBeginning(state, dispatch);
          }}
        >
          Skip Back
        </button>
        <button
          className="button start-panel-button disable-drag"
          onClick={() => {
            animateFrame(state, dispatch, -1);
          }}
        >
          Step Back
        </button>
        <button className="button start-panel-button disable-drag">
          Start Search
        </button>
        <button className="button start-panel-button disable-drag">
          Pause Search
        </button>
        <button
          className="button start-panel-button disable-drag"
          onClick={() => {
            animateFrame(state, dispatch);
          }}
        >
          Step Forward
        </button>
        <button
          className="button start-panel-button disable-drag"
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
