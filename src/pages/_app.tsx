import { SortingAlgorithmContextProvider } from "@/contexts/SortingAlgorithmContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useState } from "react";
import { SortingArrayContextProvider } from "../contexts/SortingArrayContext";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SortingArrayContextProvider>
      <SortingAlgorithmContextProvider>
        <Component {...pageProps} />
      </SortingAlgorithmContextProvider>
    </SortingArrayContextProvider>
  );
}
