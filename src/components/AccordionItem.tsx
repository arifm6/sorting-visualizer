import React, { useRef, useState } from "react";

type Props = {
  accordionTitle: string;
  accordionContent: React.ReactNode;
};

export default function AccordionItem({
  accordionTitle,
  accordionContent,
}: Props) {
  //label and content
  const [isActive, setIsActive] = useState(false);
  const contentElement = useRef<HTMLDivElement>(null);
  return (
    <div>
      <div
        className={`flex ${
          isActive ? "rounded-t-[5px]" : "rounded-[5px]"
        } bg-[rgba(0,0,0,0.5)]  px-2 space-x-2 cursor-pointer`}
        onClick={() =>
          setIsActive((prevIsActive) => {
            return !prevIsActive;
          })
        }
      >
        <button>{isActive ? "-" : "+"}</button>
        <h1>{accordionTitle}</h1>
      </div>
      <div
        ref={contentElement}
        className={`px-6 h-0 overflow-hidden transition-all ease-in-out bg-[rgba(0,0,0,0.3)] rounded-b-md`}
        style={
          isActive
            ? { height: contentElement.current?.scrollHeight }
            : { height: "0px" }
        }
      >
        {accordionContent}
      </div>
    </div>
  );
}
