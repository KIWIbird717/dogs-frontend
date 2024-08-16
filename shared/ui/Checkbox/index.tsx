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
>(({ className, ...props }, ref) => {
  const {joinMethod} = props

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer h-8 w-8 shrink-0 rounded-xl border border-[#4D4A65] shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 bg-none data-[state=checked]:border-white",
        className,
      )}
      {...props}
    >
      <div
        className={cn("w-full h-full flex items-center justify-center")}
      >
        <TickIcon className={twMerge(joinMethod === "bylink" && "[&>path]:fill-white-900")} />
      </div>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
