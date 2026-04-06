// anything we need to put in the global state

"use client";

import React from "react";
import StoreProvider from "@/state/redux";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <StoreProvider>{children}</StoreProvider>;
};

export default Providers;
