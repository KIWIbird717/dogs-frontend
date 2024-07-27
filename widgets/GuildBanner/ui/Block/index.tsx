import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";

interface IBlockProps {
  title: string
  value: string
}

export const Block: FC<IBlockProps> = (
  {
    title,
    value
  }
) => {
  return (
    <div
      className={"w-1/2 h-[93px] rounded-xl p-4 flex flex-col items-center justify-center gap-3 bg-black-750 border border-black-400 shadow-buttonNoAccent"}>
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