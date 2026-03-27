"use client";

import { useEffect } from "react";

const ASCII_ART = `
%c
    _   __      __    _     __   ____        _ __    __
   / | / /___ _/ /_  (_)___/ /  / __ )__  __(_) /___/ /____
  /  |/ / __ \`/ __ \\/ / __  /  / __  / / / / / / __  / ___/
 / /|  / /_/ / / / / / /_/ /  / /_/ / /_/ / / / /_/ (__  )
/_/ |_/\\__,_/_/ /_/_/\\__,_/  /_____/\\__,_/_/_/\\__,_/____/

`;

const MESSAGES = [
  [ASCII_ART, "font-family: monospace; font-size: 10px; color: #f59e0b;"],
  [
    "%cHey there, curious developer! 👋",
    "font-size: 16px; font-weight: bold; color: #f59e0b;",
  ],
  [
    "%cLooks like you're checking under the hood.",
    "font-size: 14px; color: #a1a1aa;",
  ],
  [
    "%cThis site is built with Next.js 16, TypeScript, and Tailwind CSS.",
    "font-size: 12px; color: #a1a1aa;",
  ],
  [
    "%cWant to see the code? %chttps://github.com/nahidhasan830/nahidbuilds.dev",
    "font-size: 12px; color: #a1a1aa;",
    "font-size: 12px; color: #f59e0b; text-decoration: underline;",
  ],
  [
    "%c\nLet's connect! Always happy to chat about code.",
    "font-size: 12px; color: #a1a1aa;",
  ],
];

export function ConsoleMessage() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const timer = setTimeout(() => {
      console.clear();

      for (const [message, ...styles] of MESSAGES) {
        console.log(message, ...styles);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
