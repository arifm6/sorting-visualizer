import React from "react";

type Props = {
  value: number;
  index: number;
  highlighted: number[];
};

export default function ArrayItem({ value, index, highlighted }: Props) {
  let isHighlighted = false;
  for (let i = 0; i < highlighted.length; i++) {
    if (highlighted[i] === index) {
      isHighlighted = true;
      break;
    }
  }
  return (
    <div
      className={` h-full w-[10rem] flex flex-col items-center justify-end  `}
    >
      <div
        className={`w-full ${
          isHighlighted ? "bg-red-400" : "bg-blue-400"
        } bg-blue-400 array-item`}
        id={`array-item-${index}`}
        style={{ height: value.toString() + "%" }}
      ></div>
      <p className="array-value-font hidden xl:block ">{value}</p>
    </div>
  );
}
