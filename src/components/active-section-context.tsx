"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type ActiveSectionContextValue = {
  activeSection: string | null;
  registerSection: (id: string) => void;
  unregisterSection: (id: string) => void;
};

const ActiveSectionContext = createContext<ActiveSectionContextValue | null>(
  null,
);

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionsRef = useRef<Set<string>>(new Set());

  const registerSection = useCallback((id: string) => {
    sectionsRef.current.add(id);
  }, []);

  const unregisterSection = useCallback((id: string) => {
    sectionsRef.current.delete(id);
  }, []);

  useEffect(() => {
    const calculateActiveSection = () => {
      const sectionIds = Array.from(sectionsRef.current);
      const offset = 80;

      const sections = sectionIds
        .map((id) => {
          const element = document.getElementById(id);
          if (!element) return null;
          return { id, top: element.getBoundingClientRect().top };
        })
        .filter((s): s is { id: string; top: number } => s !== null)
        .sort((a, b) => a.top - b.top);

      let currentSection: string | null = null;

      for (const section of sections) {
        if (section.top <= offset) {
          currentSection = section.id;
        } else {
          break;
        }
      }

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
        window.history.replaceState(null, "", `#${currentSection}`);
      }
    };

    calculateActiveSection();
    window.addEventListener("scroll", calculateActiveSection, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", calculateActiveSection);
  }, [activeSection]);

  return (
    <ActiveSectionContext.Provider
      value={{ activeSection, registerSection, unregisterSection }}
    >
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
