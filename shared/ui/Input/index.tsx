"use client";

import { cn } from "../../lib/utils/cn";
import React, { ComponentProps, forwardRef, useImperativeHandle, useRef, useState } from "react";
import SearchIcon from "@/public/images/svg/faq/search.svg";
import { motion, AnimatePresence } from "framer-motion";

type InputRefType = HTMLInputElement | null;
type Props = {} & ComponentProps<"input">;

export const Input = forwardRef<InputRefType, Props>((props, ref) => {
  const inputRef = useRef<InputRefType>(null);
  useImperativeHandle<InputRefType, InputRefType>(ref, () => inputRef.current, []);

  return (
    <div
      className={cn("w-full flex items-center relative")}
    >
      <div className={"absolute left-3"}>
        <SearchIcon />
      </div>
      <input
        ref={inputRef}
        disabled={props.disabled}
        className={cn(
          "w-full p-3 pl-10 h-[48px] rounded-xl border border-black-300 bg-black-400 z-10 shadow-buttonNoAccent",
          "placeholder:text-[17px] placeholder:font-normal placeholder:leading-6 placeholder:text-white-800"
        )}
        {...props}
      />
    </div>
  );
});

Input.displayName = Input.name;
