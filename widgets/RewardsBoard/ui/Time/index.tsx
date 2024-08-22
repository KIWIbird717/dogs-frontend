import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import ClockIcon from "@/public/images/svg/earn/clock.svg";

interface ITimeProps {}

export const Time: FC<ITimeProps> = () => {
  return (
    <div className={"flex w-fit gap-2"}>
      <div className={"flex w-full items-center justify-end"}>
        <Typography tag={"span"}
                    className={"text-[13px] text-right text-white-800 leading-4 font-normal"}
        >
          Available at <br />
          <Typography tag={"span"}
                      className={"text-[13px] text-right text-white-900"}
          >
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
