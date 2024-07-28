import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Typography } from "@/shared/ui/Typography/Typography";
import TickIcon from "@/public/images/svg/breed/tick.svg";

interface IDaysProps {
}

export const Days: FC<IDaysProps> = () => {
  return (
    <div className={"w-full flex gap-2"}>
      {Array.from(Array(7)).map((_, index) => {
        return <div key={index}
                    className={"flex flex-col justify-between w-[30px] h-[40px] rounded-[5px] border border-black-300"}
        >
          <div className={"w-full h-full flex items-center justify-center"}>
            <TickIcon className={twMerge(
              index > 2 && "[&>path]:fill-black-400",
            )} />
          </div>
          <div className={"bg-black-400 h-full max-h-[12px] flex items-center justify-center"}>
            <Typography tag={"p"}
                        className={"text-[8px] leading-[10px] font-medium text-center"}
            >
              Day {index + 1}
            </Typography>
          </div>
        </div>;
      })}
    </div>
  );
};