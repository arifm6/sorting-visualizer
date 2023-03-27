import React, { ReactNode, useEffect, useRef, useState } from "react";
import Accordion from "./Accordion";
import { useContext } from "react";
import Draggable from "react-draggable";
import { AppContext } from "@/globalState/context";
import {
  generateFrames,
  randomizeArray,
  setActive,
  setCurrentFrameIndex,
  setFrameIndexInterval,
  setInactive,
  updateAlgorithm,
  updateArraySize,
  updateHighlighted,
  updateSpeed,
} from "@/globalState/reducers";
import { skipToBeginning, startAnimation } from "@/scripts/animate";
type Props = {};

export default function Header({}: Props) {
  const [controlPanelOpen, setControlPanelOpen] = useState(true);

  const { state, dispatch } = useContext(AppContext);
  //whenever arraySize is updated, update array
  const resetBoard = () => {
    clearInterval(state.animation.frameIndexInterval);
    dispatch(setInactive());
    dispatch(randomizeArray());
    dispatch(generateFrames());
    dispatch(setCurrentFrameIndex(0));
    dispatch(updateHighlighted([-1, -1]));
  };
  useEffect(() => {
    resetBoard();
  }, [state.sorting.array.length]);
  useEffect(() => {
    dispatch(generateFrames());
  }, [state.sorting.algorithm]);
  function handleAlgorithmChange(algorithm: string) {
    dispatch(setInactive());
    skipToBeginning(state, dispatch);

    dispatch(setCurrentFrameIndex(0));
    dispatch(updateHighlighted([-1, -1]));
    dispatch(updateAlgorithm(algorithm));
  }
  const [activeSpeedLock, setActiveSpeedLock] = useState(false);
  useEffect(() => {
    if (activeSpeedLock) {
      dispatch(setActive());
      setActiveSpeedLock(false);
    }
  }, [activeSpeedLock]);

  //should have heading which is a button for the dropdown AND a dropdown with content
  const accordionData = [
    {
      accordionTitle: "Algorithms",
      accordionContent: (
        <form className="[&>input]:mr-3 disable-drag space-y-2 mb-2">
          <input
            id="insertion-sort"
            type="radio"
            value="insertion sort"
            name="sorting algorithm"
            onChange={() => handleAlgorithmChange("insertion sort")}
            defaultChecked
          />
          <label htmlFor="insertion-sort">Insertion Sort</label>
          <br />
          <input
            id="selection-sort"
            type="radio"
            value="selection sort"
            name="sorting algorithm"
            onChange={() => handleAlgorithmChange("selection sort")}
          />
          <label htmlFor="selection-sort">Selection Sort</label>
          <br />
          <input
            id="quick-sort"
            type="radio"
            value="quick sort"
            name="sorting algorithm"
            onChange={() => handleAlgorithmChange("quick sort")}
          />
          <label htmlFor="quick-sort">Quick Sort</label>
          <br />
          <input
            id="merge-sort"
            type="radio"
            value="merge sort"
            name="sorting algorithm"
            onChange={() => handleAlgorithmChange("merge sort")}
          />
          <label htmlFor="merge-sort">Merge Sort</label>
          <br />
          <input
            id="bubble-sort"
            type="radio"
            value="bubble sort"
            name="sorting algorithm"
            onChange={() => handleAlgorithmChange("bubble sort")}
          />
          <label htmlFor="bubble-sort">Bubble Sort</label>
          <br />
          <input
            id="shell-sort"
            type="radio"
            value="shell sort"
            name="sorting algorithm"
            onChange={() => handleAlgorithmChange("shell sort")}
          />
          <label htmlFor="shell-sort">Shell Sort</label>
        </form>
      ),
    },
    {
      accordionTitle: "Array Settings",
      accordionContent: (
        <div className="flex flex-col items-center disable-drag">
          <button
            className="button  my-2"
            onClick={() => {
              resetBoard();
            }}
          >
            Randomize Array
          </button>
          <label htmlFor="array-size">Array Size</label>
          <input
            type="range"
            id="array-size"
            name="array settings"
            min="1"
            max="100"
            value={state.sorting.array.length}
            onChange={(e) => {
              dispatch(updateArraySize(parseInt(e.target.value)));
            }}
          />
          <output>{state.sorting.array.length}</output>
        </div>
      ),
    },
    {
      accordionTitle: "Animation Settings",
      accordionContent: (
        <form className="flex flex-col items-center disable-drag">
          <label htmlFor="animation-speed">Animation Speed</label>
          <input
            type="range"
            id="animation-speed"
            name="animation settings"
            min="1"
            max="100"
            value={state.animation.speed}
            onChange={(e) => {
              dispatch(updateSpeed(parseInt(e.target.value)));
              if (state.animation.active) {
                clearInterval(state.animation.frameIndexInterval);

                dispatch(setInactive());

                setActiveSpeedLock(true);
              }
            }}
          />
          <output>{state.animation.speed}</output>
        </form>
      ),
    },
  ];

  const nodeRef = useRef(null);
  return (
    <Draggable cancel=".disable-drag" nodeRef={nodeRef}>
      <div ref={nodeRef} className="control-panel">
        <div>
          <button
            className="float-right disable-drag"
            onClick={() => {
              setControlPanelOpen((prevState) => !prevState);
            }}
          >
            {controlPanelOpen ? "-" : "+"}
          </button>
          <h1 className="font-bold py-1 cursor-default">
            <span className="text-red-400">Control Panel</span>
          </h1>
        </div>
        <div className={`${!controlPanelOpen && "h-0"} overflow-hidden`}>
          <Accordion accordionData={accordionData} />
        </div>
      </div>
    </Draggable>
  );
}
