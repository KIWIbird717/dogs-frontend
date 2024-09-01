import { FC, ReactNode } from "react";
import Countdown, { zeroPad } from "react-countdown";
import { Typography } from "@/shared/ui/Typography/Typography";
import { UserApiTypes } from "@/shared/lib/services/users/types";
import { twMerge } from "tailwind-merge";

interface ICountDownWrapperProps {
  onToggleDisabled: (disabled: boolean) => void;
  timeStamp: number;
  titleCompleted: ReactNode,
  titleUnCompleted: ReactNode,
  className?: string
  key: string
}

type IRendererCountDown = {
  hours: number,
  minutes: number,
  seconds: number,
  completed: boolean,
}

export const CountDownWrapper: FC<ICountDownWrapperProps> = (
  {
    onToggleDisabled,
    timeStamp,
    titleUnCompleted,
    titleCompleted,
    className,
    key
  },
) => {
  const renderer = ({ hours, minutes, seconds, completed }: IRendererCountDown) => {
    if (completed) {
      onToggleDisabled(false);

      return <Typography className={twMerge("text-[18px] font-bold leading-6 text-white-900", className)}
                         tag={"p"}
      >
        {titleCompleted}
      </Typography>
    } else {
      onToggleDisabled(true);

      return <Typography className={twMerge("text-[18px] font-bold leading-6 text-white-900", className)}
                         tag={"p"}
      >
        {titleUnCompleted} {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
      </Typography>;
    }
  };

  return (
    <Countdown
      date={Date.now() + timeStamp}
      renderer={renderer}
      className={"!text-[18px] !font-bold !leading-6 !text-white-900"}
      key={key}
    />
  );
};