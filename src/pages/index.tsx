import Head from "next/head";
import ControlPanel from "@/components/ControlPanel";
import StartPanel from "@/components/StartPanel";
import { useContext, useEffect } from "react";
import { AppContext } from "@/context";
import ArrayItem from "@/components/ArrayItem";
export default function Home() {
  const { state, dispatch } = useContext(AppContext);
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
      <div className="h-[calc(100vh_-_68px)]  w-[90vw] mx-auto  px-1 flex justify-center items-end space-x-1">
        {state.sorting.array.map((value, i) => {
          return (
            <ArrayItem
              i={i}
              value={value}
              key={i}
              arraySize={state.sorting.arraySize}
            />
          );
        })}
      </div>
      <main></main>
    </div>
  );
}
