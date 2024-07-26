import { ChangeEvent, FC, useState } from "react";
import { Input } from "@/shared/ui/Input";
import { Typography } from "@/shared/ui/Typography/Typography";
import { Label } from "@/shared/ui/Label";
import { twMerge } from "tailwind-merge";

interface IFieldProps {
  keyForLabel: string;
  label: string;
  labelDescription: string;
  errorText?: string
  value: string
  onChange: (value: ChangeEvent<HTMLInputElement>) => void
  isError: boolean
}

export const Field: FC<IFieldProps> = (
  {
    keyForLabel,
    labelDescription,
    label,
    errorText,
    value,
    onChange,
    isError
  },
) => {


  return (
    <div className={"w-full flex flex-col gap-2"}>
      <Label keyForLabel={keyForLabel}
             label={label}
             labelDescription={labelDescription}
      />

      <Input
        id={keyForLabel}
        name={keyForLabel}
        placeholder={"Age"}
        value={value}
        type={"number"}
        onChange={onChange}
        // className={twMerge(isError ? "focus-visible:border-red" : "")}
        isInputError={isError}
      />
      {isError && (
        <Typography tag={"span"} className={"text-red text-[13px] font-normal leading-4 text-right"}>
          {errorText}
        </Typography>
      )}

    </div>
  );
};