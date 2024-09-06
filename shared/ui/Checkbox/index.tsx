"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@/shared/lib/utils/cn";
import TickIcon from "@/public/images/svg/guild/create/tick.svg";
import { twMerge } from "tailwind-merge";
import { JoinMethod } from "@/shared/lib/services/guilds/guilds";

interface ICheckbox {
  joinMethod: JoinMethod;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & ICheckbox
>(({ className, joinMethod, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "focus-visible:ring-ring peer h-8 w-8 shrink-0 rounded-xl border border-[#4D4A65] bg-none shadow focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-white",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "flex h-full w-full items-center justify-center transition-all duration-150",
          joinMethod === JoinMethod.OPEN ? "opacity-0" : "opacity-100",
        )}
      >
        <TickIcon className={twMerge("[&>path]:fill-white-900")} />
      </div>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
