import { AppProvider } from "@/globalState/context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  //create global store here
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
