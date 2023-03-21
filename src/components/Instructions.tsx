import React, { useRef, useState } from "react";
import Draggable from "react-draggable";

type Props = {};

export default function Instructions({}: Props) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Draggable nodeRef={nodeRef} cancel=".disable-drag">
      <div
        className={`instructions flex flex-col overflow-hidden  transition-all duration-300 `}
        ref={nodeRef}
        style={{ height: isOpen ? nodeRef.current?.scrollHeight : "0px" }}
      >
        <div className="flex justify-between my-2">
          <h1 className="font-bold text-lg ">Instructions</h1>
          <button
            className="text-xs disable-drag absolute top-2 right-2"
            onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
          >
            hide
          </button>
        </div>
        <p className="instructions-text">
          Use the <span className="text-red-400">Control Panel</span> to update
          settings
        </p>
        <p className="instructions-text pb-2">
          Use the <span className="text-blue-400">Animation Panel</span> to go
          through animations
        </p>
      </div>
    </Draggable>
  );
}
