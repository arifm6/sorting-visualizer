import { AppContext } from "@/globalState/context";
import { sortArray } from "@/globalState/reducers";
import React, { useContext, useRef } from "react";
import Draggable from "react-draggable";

type Props = {};

export default function StartPanel({}: Props) {
  const nodeRef = useRef(null);
  const dispatch = useContext(AppContext).dispatch;
  return (
    <Draggable nodeRef={nodeRef} cancel=".disable-drag">
      <div
        className="start-panel grid grid-rows-2 grid-cols-3 gap-2"
        ref={nodeRef}
      >
        <button className="button start-panel-button">Skip Back</button>
        <button className="button start-panel-button">Step Back</button>
        <button
          className="button start-panel-button disable-drag"
          onClick={() => {
            dispatch(sortArray());
          }}
        >
          Start Search
        </button>
        <button className="button start-panel-button">Pause Search</button>
        <button className="button start-panel-button">Step Forward</button>
        <button className="button start-panel-button">Skip Forward</button>
      </div>
    </Draggable>
  );
}
