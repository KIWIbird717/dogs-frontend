"use client";

import dynamic from "next/dynamic";
import { FC } from "react";
import { FieldError } from "react-hook-form";

const MotionSpan = dynamic(() => import("framer-motion").then((mod) => mod.motion.span));

type ErrorSpanProps = {
  error?: FieldError;
};

export const ErrorSpan: FC<ErrorSpanProps> = (props) => {
  if (!props.error) return null;

  return (
    <MotionSpan
      initial={{ height: 0 }}
      animate={{ height: 14 }}
      exit={{ height: 0 }}
      className="flex w-full justify-end overflow-hidden pr-[10px] text-[13px] leading-[20px] text-red"
    >
      {props.error.message}
    </MotionSpan>
  );
};
