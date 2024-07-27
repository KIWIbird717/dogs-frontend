import { ComponentProps, FC } from "react";
import { twMerge } from "tailwind-merge";

interface ITextareaProps extends ComponentProps<"textarea"> {
}

export const Textarea: FC<ITextareaProps> = (
  {
    value,
    onChange,
    placeholder,
    maxLength,
    ...rest
  },
) => {
  return (
    <textarea
      className={twMerge(
        "w-full p-3 text-[17px] outline-none border border-black-300 bg-black-400 shadow-buttonNoAccent text-white-900 font-normal leading-6 rounded-xl z-[10] placeholder:text-[17px] placeholder:font-normal placeholder:leading-6 placeholder:text-white-800",
        "focus-visible:border-[2px] focus-visible:border-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
      )}
      {...rest}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
    />
  );
};