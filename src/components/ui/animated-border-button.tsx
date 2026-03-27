"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./button";

interface AnimatedBorderButtonProps extends ButtonProps {
  children: ReactNode;
}

export function AnimatedBorderButton({
  children,
  className,
  ...props
}: AnimatedBorderButtonProps) {
  return (
    <div className="relative inline-flex overflow-hidden rounded-lg p-[2px]">
      {/* Rotating gradient for border effect */}
      <div
        className="absolute inset-[-100%]"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg 300deg, var(--primary) 360deg)",
          animation: "border-rotate 2.5s linear infinite",
        }}
      />
      {/* Mask layer - covers gradient except border */}
      <div className="absolute inset-[2px] rounded-[calc(var(--radius-lg)-2px)] bg-background" />
      {/* Actual button */}
      <Button className={cn("relative", className)} {...props}>
        {children}
      </Button>
    </div>
  );
}
