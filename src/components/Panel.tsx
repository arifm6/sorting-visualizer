import React from "react";
import Accordion from "./Accordion";
import { useContext } from "react";
import { SortingArrayContext } from "@/contexts/SortingArrayContext";
type Props = {};

export default function Header({}: Props) {
  const sortingArray = useContext(SortingArrayContext)?.sortingArray;
  const setSortingArray = useContext(SortingArrayContext)?.setSortingArray;

  return (
    <div className="panel">
      <h1 className="font-bold py-1">Control Panel</h1>
      <Accordion />
    </div>
  );
}
