import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Typography } from "@/shared/ui/Typography/Typography";
import TickIcon from "@/public/images/svg/breed/tick.svg";

interface IDaysProps {}

export const Days: FC<IDaysProps> = () => {
  return (
    <div className={"flex w-full gap-2"}>
      {Array.from(Array(7)).map((_, index) => {
        return (
          <div
            key={index}
            className={
              "flex h-[40px] w-[30px] flex-col justify-between rounded-[5px] border border-black-300"
            }
          >
            <div className={"flex h-full w-full items-center justify-center"}>
              <TickIcon className={twMerge(index > 2 && "[&>path]:fill-black-400")} />
            </div>
            <div className={"flex h-full max-h-[12px] items-center justify-center bg-black-400"}>
              <Typography
                tag={"p"}
                className={"text-center text-[8px] font-medium leading-[10px] text-white-900"}
              >
                Day {index + 1}
              </Typography>
            </div>
          </div>
        );
      })}
    </div>
  );
};
