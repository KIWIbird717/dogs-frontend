import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import ClockIcon from "@/public/images/svg/earn/clock.svg";

interface ITimeProps {}

export const Time: FC<ITimeProps> = () => {
  return (
    <div className={"flex w-fit gap-2"}>
      <div className={"flex w-full items-center justify-end"}>
        <Typography
          tag={"span"}
          className={"text-right text-[13px] font-normal leading-4 text-white-800"}
        >
          Available at <br />
          <Typography tag={"span"} className={"text-right text-[13px] text-white-900"}>
            9:21:31
          </Typography>
        </Typography>
      </div>
      <div className={"flex items-center"}>
        <ClockIcon />
      </div>
    </div>
  );
};
