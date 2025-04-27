"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  adventureId: string | null;
  setAdventureId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [adventureId, setAdventureId] = useState<string | null>(null);


  return (
    <AppContext.Provider value={{ adventureId, setAdventureId }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAdventure() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAdventure must be used within an AdventureProvider");
  }
  return context;
}