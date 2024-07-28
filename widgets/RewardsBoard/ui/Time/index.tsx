import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import ClockIcon from "@/public/images/svg/earn/clock.svg";



interface ITimeProps {
}

export const Time: FC<ITimeProps> = () => {
  return (
    <div className={"w-fit flex gap-2"}>
      <div className={"w-full flex justify-end items-center"}>
        <Typography tag={"span"}
                    className={"text-right text-white-800"}
        >
          Available at <br />
          <Typography tag={"span"}
                      className={"text-right text-white-900"}
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