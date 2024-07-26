"use client";

import { cn } from "../../lib/utils/cn";
import React, { ComponentProps, forwardRef, useImperativeHandle, useRef } from "react";
import SearchIcon from "@/public/images/svg/faq/search.svg";
import CloseIcon from "@/public/images/svg/close.svg";
import { twMerge } from "tailwind-merge";
import { Button } from "@/shared/ui/Button/Button";

type InputRefType = HTMLInputElement | null;


export namespace InputNS {

  export const DEFAULT_CLASSES = twMerge(
    "w-full p-3 pl-10 h-[48px] text-[17px] border border-black-300 bg-black-400 shadow-buttonNoAccent text-white-900 font-normal leading-6 rounded-xl z-[10] placeholder:text-[17px] placeholder:font-normal placeholder:leading-6 placeholder:text-white-800",
    "focus-visible:border-[2px] focus-visible:border-blue-900 disabled:cursor-not-allowed disabled:opacity-50");
  export const DEFAULT_WRAPPER_LASSES = "w-full flex items-center relative z-[1]";

  export type Props = {
    isIcon?: boolean
    isInputError?: boolean
    onClear?: () => void
  } & ComponentProps<"input">;
}

export const Input = forwardRef<InputRefType, InputNS.Props>((props, ref) => {
  const inputRef = useRef<InputRefType>(null);
  useImperativeHandle<InputRefType, InputRefType>(ref, () => inputRef.current, []);

  return (
    <div
      className={cn(
        InputNS.DEFAULT_WRAPPER_LASSES,
      )}
    >
      {props.isIcon && <div className={"absolute left-3"}>
        <SearchIcon />
      </div>}

      <input
        ref={inputRef}
        disabled={props.disabled}
        className={cn(
          InputNS.DEFAULT_CLASSES,
          props.isInputError && "focus-visible:border-red",
          props.className,
          !props.isIcon && "pl-3",
        )}
        {...props}
      />

      {props.type === "search" && props.value
        && <Button className={"w-fit h-fit p-0"}
                   variant={"default"}
                   onClick={props.onClear}
        >
          <CloseIcon className={"absolute right-[10px] z-[10]"} />
        </Button>}
    </div>
  );
});

Input.displayName = Input.name;
