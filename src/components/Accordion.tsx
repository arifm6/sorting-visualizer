import React from "react";
import AccordionItem from "./AccordionItem";
type Props = {
  accordionData: any;
};

export default function Accordion({ accordionData }: Props) {
  return (
    <div>
      {/**accordionItem is of type any for ease but you should make an interface and input the types */}
      {accordionData.map((accordionItem: any, i: number) => {
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
