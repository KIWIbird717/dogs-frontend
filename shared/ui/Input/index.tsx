"use client";

import React, { ComponentProps, forwardRef, useImperativeHandle, useRef } from "react";
import SearchIcon from "@/public/images/svg/faq/search.svg";
import CloseIcon from "@/public/images/svg/close.svg";
import { twMerge } from "tailwind-merge";
import { Button } from "@/shared/ui/Button/Button";
import { cn } from "@/shared/lib/utils/cn";

type InputRefType = HTMLInputElement | null;

export namespace InputNS {
  export const DEFAULT_CLASSES = twMerge(
    "w-full p-3 pl-10 h-[48px] text-[17px] border border-black-300 !bg-black-400 shadow-buttonNoAccent shadow-fix text-white-900 font-normal leading-6 rounded-xl z-[10] placeholder:text-[17px] placeholder:font-normal placeholder:leading-6 placeholder:text-white-800",
    "focus-visible:border-[2px] focus-visible:border-blue-900 disabled:cursor-not-allowed disabled:opacity-50",
  );
  export const DEFAULT_WRAPPER_LASSES = "w-full flex items-center relative z-[10]";

  export type Props = {
    isIcon?: boolean;
    isInputError?: boolean;
    onClear?: () => void;
  } & ComponentProps<"input">;
}

export const Input = forwardRef<InputRefType, InputNS.Props>((props, ref) => {
  const { isIcon, isInputError, onClear, disabled, className, value, type, ...rest } = props;
  const inputRef = useRef<InputRefType>(null);
  useImperativeHandle<InputRefType, InputRefType>(ref, () => inputRef.current, []);

  return (
    <div className={cn(InputNS.DEFAULT_WRAPPER_LASSES)}>
      {isIcon && (
        <div className={"absolute left-3"}>
          <SearchIcon />
        </div>
      )}

      <input
        ref={inputRef}
        disabled={disabled}
        className={cn(
          InputNS.DEFAULT_CLASSES,
          isInputError && "focus-visible:border-red",
          className,
          !isIcon && "pl-3",
        )}
        value={value}
        type={type}
        {...rest}
      />

      {type === "search" && value && (
        <Button className={"h-fit w-fit p-0"} variant={"default"} onClick={onClear}>
          <CloseIcon className={"absolute right-[10px] z-[10]"} />
        </Button>
      )}
    </div>
  );
});

Input.displayName = Input.name;
