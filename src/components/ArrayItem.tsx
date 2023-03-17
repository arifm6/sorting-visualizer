import React from "react";

type Props = {
  value: number;
  arraySize: number;
  i: number;
};

export default function ArrayItem({ value, arraySize, i }: Props) {
  return (
    <div
      className={` h-full w-[10rem] flex flex-col items-center justify-end  `}
    >
      <div
        className="w-full bg-blue-400"
        style={{ height: value.toString() + "%" }}
      ></div>
      <p className="array-value-font">{value}</p>
    </div>
  );
}
