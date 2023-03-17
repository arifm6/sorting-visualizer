import Head from "next/head";
import ControlPanel from "@/components/ControlPanel";
import StartPanel from "@/components/StartPanel";
import { useContext, useEffect } from "react";
import { AppContext } from "@/globalState/context";
import ArrayItem from "@/components/ArrayItem";
import { Animation, Frame } from "@/scripts/algorithms";
const { v4: uuidv4 } = require("uuid");

export default function Home() {
  const { state } = useContext(AppContext);
  return (
    <div className="min-h-screen">
      <Head>
        <title>Sorting Visualizer</title>
        <meta name="description" content="A simple sorting visualizer app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-center text-3xl p-4 w-full ">Sorting Visualizer</h1>
      <ControlPanel />
      <StartPanel />
      <div className="h-[calc(100vh_-_68px)]  w-full  px-1 flex justify-center items-end space-x-[1px] md:space-x-[2px] lg:space-x-1">
        {state.sorting.array.map((value) => {
          const uuid = uuidv4();
          return (
            <ArrayItem
              id={uuid}
              value={value}
              key={uuid}
              arraySize={state.sorting.arraySize}
            />
          );
        })}
      </div>
      <main></main>
    </div>
  );
}
