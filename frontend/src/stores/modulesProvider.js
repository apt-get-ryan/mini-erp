"use client"

import { createContext, useContext } from "react";

const ModulesContext = createContext(null);

export function ModulesProvider({ modules, children }) {
  return (
    <ModulesContext.Provider value={modules}>
      {children}
    </ModulesContext.Provider>
  );
}

export function useModules() {
  return useContext(ModulesContext);
}