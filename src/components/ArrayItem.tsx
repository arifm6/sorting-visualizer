import React from "react";

type Props = {
  value: number;
  arraySize: number;
  id: number;
};

export default function ArrayItem({ value, arraySize, id }: Props) {
  return (
    <div
      className={` h-full w-[10rem] flex flex-col items-center justify-end  `}
    >
      <div
        className="w-full bg-blue-400"
        id={`array-item-${id}`}
        style={{ height: value.toString() + "%" }}
      ></div>
      <p className="array-value-font hidden xl:block ">{value}</p>
    </div>
  );
}
