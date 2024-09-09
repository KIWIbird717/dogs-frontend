import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { twMerge } from "tailwind-merge";

interface IBlockProps {
  title: string;
  value: string | number;
  isBanner?: boolean;
}

export const Block: FC<IBlockProps> = ({ title, value, isBanner }) => {
  return (
    <div
      className={twMerge(
        "shadow-fix flex w-1/2 flex-col items-center justify-center gap-3 rounded-xl border border-black-400 bg-black-750 p-4 shadow-buttonNoAccent",
        isBanner && "h-[93px]",
        !isBanner && "h-[100px]",
      )}
    >
      <Typography tag={"p"} className={"text-[17px] font-normal leading-6 text-white-800"}>
        {title}
      </Typography>
      <Typography tag={"h1"} className={"font-normal text-white-900"}>
        {value}
      </Typography>
    </div>
  );
};
