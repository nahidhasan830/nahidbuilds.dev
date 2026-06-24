import type * as React from "react";
import { cn } from "@/lib/utils";

type LabelProps = React.ComponentProps<"label"> & {
  htmlFor: string;
};

function Label({ className, htmlFor, children, ...props }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      data-slot="label"
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}

export { Label };
