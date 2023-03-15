import { AnimationContext } from "@/contexts/AnimationContext";
import { SortingAlgorithmContext } from "@/contexts/SortingAlgorithmContext";
import { SortingArrayContext } from "@/contexts/SortingArrayContext";
import React, { useContext, useEffect } from "react";
import AccordionItem from "./AccordionItem";
type Props = {};

export default function Accordion({}: Props) {
  const setSortingAlgorithm = useContext(SortingAlgorithmContext)?.setAlgorithm;
  const setSortingArray = useContext(SortingArrayContext)?.setSortingArray;
  const arraySize = useContext(SortingArrayContext)?.arraySize;
  const setArraySize = useContext(SortingArrayContext)?.setArraySize;
  const animationSpeed = useContext(AnimationContext)?.animationSpeed;
  const setAnimationSpeed = useContext(AnimationContext)?.setAnimationSpeed;

  const generateRandomArray = () => {
    // randomly generated N = arrLength length array 0 <= A[N] <= arrLength - 1
    const arrLength = arraySize || 50;
    const ret = Array.from({ length: arrLength }, () =>
      Math.floor(Math.random() * arrLength)
    );
    return ret;
  };
  const updateArraySize = (event: any) => {
    const tempArrSize = event.target.value;
    setArraySize?.(tempArrSize);
  };
  //whenever arraySize is updated, update array
  useEffect(() => {
    setSortingArray?.(generateRandomArray());
  }, [arraySize]);
  const accordionData = [
    {
      accordionTitle: "Algorithms",
      accordionContent: (
        <form className="[&>input]:mr-2">
          <input
            id="insertion-sort"
            type="radio"
            value="insertion sort"
            name="sorting algorithm"
            onChange={() => setSortingAlgorithm?.("insertion sort")}
          />
          <label htmlFor="insertion-sort">Insertion Sort</label>
          <br />
          <input
            id="selection-sort"
            type="radio"
            value="selection sort"
            name="sorting algorithm"
            onChange={() => setSortingAlgorithm?.("selection sort")}
          />
          <label htmlFor="selection-sort">Selection Sort</label>
          <br />
          <input
            id="quick-sort"
            type="radio"
            value="quick sort"
            name="sorting algorithm"
            onChange={() => setSortingAlgorithm?.("quick sort")}
          />
          <label htmlFor="quick-sort">Quick Sort</label>
          <br />
          <input
            id="merge-sort"
            type="radio"
            value="merge sort"
            name="sorting algorithm"
            onChange={() => setSortingAlgorithm?.("merge sort")}
          />
          <label htmlFor="merge-sort">Merge Sort</label>
          <br />
          <input
            id="bubble-sort"
            type="radio"
            value="bubble sort"
            name="sorting algorithm"
            onChange={() => setSortingAlgorithm?.("bubble sort")}
          />
          <label htmlFor="bubble-sort">Bubble Sort</label>
          <br />
          <input
            id="shell-sort"
            type="radio"
            value="shell sort"
            name="sorting algorithm"
            onChange={() => setSortingAlgorithm?.("shell sort")}
          />
          <label htmlFor="shell-sort">Shell Sort</label>
        </form>
      ),
    },
    {
      accordionTitle: "Array Settings",
      accordionContent: (
        <div className="flex flex-col items-center">
          <button
            className="button"
            onClick={() => setSortingArray?.(generateRandomArray())}
          >
            Randomize Array
          </button>
          <label htmlFor="array-size" className="">
            Array Size
          </label>
          <input
            type="range"
            id="array-size"
            name="array settings"
            min="1"
            max="100"
            value={arraySize}
            onChange={(e) => updateArraySize(e)}
          />
          <output>{arraySize}</output>
        </div>
      ),
    },
    {
      accordionTitle: "Animation Settings",
      accordionContent: (
        <form className="flex flex-col items-center">
          <label htmlFor="">Animation Speed</label>
          <input
            type="range"
            id="animation-speed"
            name="animation settings"
            min="1"
            max="100"
            value={animationSpeed}
            onChange={(e) => {
              setAnimationSpeed?.(parseInt(e.target.value));
            }}
          />
          <output>{animationSpeed}</output>
        </form>
      ),
    },
  ];
  //should have heading which is a button for the dropdown AND a dropdown with content
  return (
    <div>
      {accordionData.map((accordionItem, i) => {
        return (
          <AccordionItem
            key={i}
            accordionTitle={accordionItem.accordionTitle}
            accordionContent={accordionItem.accordionContent}
          />
        );
      })}
    </div>
  );
}
