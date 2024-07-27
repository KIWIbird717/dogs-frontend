import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { twMerge } from "tailwind-merge";

interface IBlockProps {
  title: string
  value: string
  isBanner?: boolean
}

export const Block: FC<IBlockProps> = (
  {
    title,
    value,
    isBanner
  }
) => {
  return (
    <div
      className={twMerge(
        "w-1/2 rounded-xl p-4 flex flex-col items-center justify-center gap-3 bg-black-750 border border-black-400 shadow-buttonNoAccent",
        isBanner && "h-[93px]",
        !isBanner && "h-[100px]",
      )}
    >
      <Typography tag={"p"}
                  className={"text-[17px] font-normal leading-6 text-white-800"}
      >
        {title}
      </Typography>
      <Typography tag={"h1"}
                  className={"text-white-900 font-normal"}
      >
        {value}
      </Typography>
    </div>
  );
};