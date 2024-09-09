"use client";

import { forwardRef, ReactNode } from "react";
import { FieldError } from "react-hook-form";
import { cn } from "@/shared/lib/utils/cn";
import { AnimatePresence } from "framer-motion";
import { Label } from "@/shared/ui/Label";
import { ErrorSpan } from "./shared/ErrorSpan";

export namespace Field {
  export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string | ReactNode;
    labelAfter?: string | ReactNode;
    error?: FieldError;
  }

  export const Input = forwardRef<HTMLInputElement, InputFieldProps>(
    ({ className, label, labelAfter, type, ...props }) => {
      return (
        <div className="flex w-full flex-col gap-[1px]">
          {label && <Label className="ml-[10px]" label={label} labelDescription={labelAfter} />}

          <input
            type={type}
            {...props}
            className={cn(
              className,
              "shadow-fix z-[10] h-[48px] w-full rounded-xl border border-black-300 !bg-black-400 p-3 text-[17px] font-normal leading-6 text-white-900 shadow-buttonNoAccent placeholder:text-[17px] placeholder:font-normal placeholder:leading-6 placeholder:text-white-800",
              "focus-visible:border-[1px] focus-visible:border-blue-900 disabled:cursor-not-allowed disabled:opacity-50",
              props.error && "border-red",
            )}
          />

          <AnimatePresence>{props.error && <ErrorSpan error={props.error} />}</AnimatePresence>
        </div>
      );
    },
  );

  Input.displayName = "Field.Input";

  export interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string | ReactNode;
    labelAfter?: string | ReactNode;
    error?: FieldError | undefined;
  }

  export const Textarea = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
    ({ className, label, labelAfter, ...props }) => {
      return (
        <div className="flex w-full flex-col gap-[1px]">
          {label && <Label className="ml-[10px]" label={label} labelDescription={labelAfter} />}
          <textarea
            className={cn(
              className,
              "shadow-fix z-[10] w-full rounded-xl border border-black-300 bg-black-400 p-3 text-[17px] font-normal leading-6 text-white-900 shadow-buttonNoAccent outline-none placeholder:text-[17px] placeholder:font-normal placeholder:leading-6 placeholder:text-white-800",
              "focus-visible:border-[1px] focus-visible:border-blue-900 disabled:cursor-not-allowed disabled:opacity-50",
              props.error && "border-red",
            )}
            {...props}
          />
          <AnimatePresence>{props.error && <ErrorSpan error={props.error} />}</AnimatePresence>
        </div>
      );
    },
  );

  Textarea.displayName = "Field.Textarea";
}
