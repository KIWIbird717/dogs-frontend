import { FC, ReactNode } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import ClockIcon from "@/public/images/svg/earn/clock.svg";
import { CountDownWrapper } from "@/shared/ui/CountDownWrapper";
import { UserApiTypes } from "@/shared/lib/services/users/types";

interface ITimeProps {
  onToggleDisabled: (disabled: boolean) => void;
  daily: UserApiTypes.DailyRewardResponse | null;
  titleCompleted: ReactNode
  titleUnCompleted: ReactNode,
}

export const Time: FC<ITimeProps> = (
  {
    titleCompleted,
    daily,
    onToggleDisabled,
    titleUnCompleted
  }
) => {
  return (
    <div className={"flex w-fit gap-2"}>
      <div className={"flex w-full items-center justify-end"}>
        <CountDownWrapper onToggleDisabled={onToggleDisabled}
                          daily={daily}
                          titleCompleted={titleCompleted}
                          titleUnCompleted={titleUnCompleted}
                          className={"text-[13px] leading-4 font-normal text-right"}
        />
      </div>
      <div className={"flex items-center"}>
        <ClockIcon />
      </div>
    </div>
  );
};
