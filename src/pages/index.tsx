import Head from "next/head";
import ControlPanel from "@/components/ControlPanel";
import StartPanel from "@/components/StartPanel";
import { useContext, useEffect } from "react";
import { AppContext } from "@/context";
export default function Home() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Sorting Visualizer</title>
        <meta name="description" content="A simple sorting visualizer app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-center text-3xl p-4 w-full bg-red-400">
        Sorting Visualizer
      </h1>
      <ControlPanel />
      <StartPanel />
      <main></main>
    </div>
  );
}
