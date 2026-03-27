"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

type ActiveSectionContextValue = {
  activeSection: string | null;
  setActiveSection: (id: string | null) => void;
};

const ActiveSectionContext = createContext<ActiveSectionContextValue | null>(
  null,
);

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSection() {
  const context = useContext(ActiveSectionContext);
  if (!context) {
    throw new Error(
      "useActiveSection must be used within ActiveSectionProvider",
    );
  }
  return context;
}
