import React, { ReactNode, useRef } from "react";
import Accordion from "./Accordion";
import { useContext } from "react";
import { SortingArrayContext } from "@/contexts/SortingArrayContext";
import Draggable from "react-draggable";
type Props = {};

export default function Header({}: Props) {
  const sortingArray = useContext(SortingArrayContext)?.sortingArray;
  const setSortingArray = useContext(SortingArrayContext)?.setSortingArray;
  const nodeRef = useRef(null);
  return (
    <Draggable nodeRef={nodeRef}>
      <div
        ref={nodeRef}
        id="panel"
        className="panel"
        onDrag={(e) => {
          console.log("HI");
        }}
      >
        <h1 className="font-bold py-1">Control Panel</h1>
        <Accordion />
      </div>
    </Draggable>
  );
}
