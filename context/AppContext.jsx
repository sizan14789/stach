"use client"

import { createContext, useContext } from "react";

const AppContext = createContext(null);

export default function AppProvider ({ children }) {
  const props = {};

  return <AppContext.Provider value={props}>{children}</AppContext.Provider>;
}

export const useAppContext = ()=> useContext(AppContext)
