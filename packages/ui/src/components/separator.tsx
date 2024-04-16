"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@repo/common";
import { forwardRef } from "react";

const Separator = forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { children, className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      className={cn(
        orientation === "horizontal"
          ? "relative w-full"
          : "shrink-0 bg-border h-full w-[1px]",
        className,
      )}
      decorative={decorative}
      orientation={orientation}
      ref={ref}
      {...props}>
      {orientation === "horizontal" && (
        <>
          <div className="absolute inset-0 flex items-center ">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">{children}</span>
          </div>
        </>
      )}
    </SeparatorPrimitive.Root>
  ),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
