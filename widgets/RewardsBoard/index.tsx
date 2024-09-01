import { FC, useEffect, useState } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { Header } from "@/widgets/RewardsBoard/ui/Header";
import { Time } from "@/widgets/RewardsBoard/ui/Time";
import { Days } from "@/widgets/RewardsBoard/ui/Days";
import useSWR from "swr";
import { UsersService } from "@/shared/lib/services/users/users";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import { UserApiTypes } from "@/shared/lib/services/users/types";
import Countdown from "react-countdown";
import { Typography } from "@/shared/ui/Typography/Typography";

interface IRewardsBoardProps {
}

export const RewardsBoard: FC<IRewardsBoardProps> = () => {
  const [daily, setDaily] = useState<UserApiTypes.DailyRewardResponse | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const logger = new Logger("RewardsBoard");

  useEffect(() => {
    (async () => {
      await getDailyReward();
    })();
  }, []);

  const getDailyReward = async () => {
    try {
      const { data } = await UsersService.getBonusDaily();
      setDaily(data);
    } catch (error) {
      logger.error(error);
    }
  };

  const claimDailyReward = async () => {
    try {
      await UsersService.useBonusDaily();
      await getDailyReward();
    } catch (error) {
      logger.error(error);
    }
  };

  console.log(new Date(new Date().getTime() + daily?.timestamp!));

  const renderer = ({ hours, minutes, seconds, completed } : {hours: number, minutes: number, seconds: number, completed: boolean}) => {

    if (completed) {
      setIsDisabled(false);
      return <Typography className={"text-[18px] font-bold leading-6 text-white-900"}
                         tag={"p"}
      >
        Claim at
      </Typography>;
    } else {
      setIsDisabled(true);
      return <Typography className={"text-[18px] font-bold leading-6 text-white-900"}
                         tag={"p"}
      >
        Claim at {hours}:{minutes}:{seconds}
      </Typography>;
    }
  };

  console.log({daily});

  return (
    <div
      className={
        "flex w-full flex-col gap-6 rounded-xl border border-black-300 bg-black-400 px-3 py-5 shadow-buttonNoAccent"
      }
    >
      <div className={"flex w-full"}>
        <Header />
        <Time />
      </div>

      <Days level={daily?.currentLevel!} />

      <Button
        variant={"primary"}
        disabled={isDisabled}
        className={"h-[48px] flex gap-1 items-center"}
        onClick={claimDailyReward}
      >

        <Countdown
          date={Date.now() + daily?.timestamp!}
          renderer={renderer}
          className={"!text-[18px] !font-bold !leading-6 !text-white-900"}

        />

      </Button>
    </div>
  );
};
