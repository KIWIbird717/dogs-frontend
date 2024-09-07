import { FC } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { Header } from "@/widgets/RewardsBoard/ui/Header";
import { Time } from "@/widgets/RewardsBoard/ui/Time";
import { Days } from "@/widgets/RewardsBoard/ui/Days";
import { CountDownWrapper } from "@/shared/ui/CountDownWrapper";
import { useDailyReward } from "@/widgets/RewardsBoard/hooks/useDailyReward";
import { twMerge } from "tailwind-merge";
import { Typography } from "@/shared/ui/Typography/Typography";
import { Toaster } from "react-hot-toast";

interface IRewardsBoardProps {}

export const RewardsBoard: FC<IRewardsBoardProps> = () => {
  const { daily, onClaimDailyReward, isDisabled, onToggleDisabled } = useDailyReward();

  return (
    <div
      className={
        "flex w-full flex-col gap-6 rounded-xl border border-black-300 bg-black-400 px-3 py-5 shadow-buttonNoAccent"
      }
    >
      <Toaster />
      <div className={"flex w-full"}>
        <Header />
        <Time
          titleUnCompleted={
            <>
              Available <br /> at
            </>
          }
          titleCompleted={
            <>
              Available <br /> at <br /> NOW
            </>
          }
          onToggleDisabled={onToggleDisabled}
          timeStamp={daily?.timestamp!}
          key={String(daily?.nextLevel)}
        />
      </div>

      <Days level={daily?.currentLevel! || 0} />

      <Button
        variant={"primary"}
        disabled={isDisabled}
        className={"flex h-[48px] items-center gap-1"}
        onClick={onClaimDailyReward}
      >
        {daily ? (
          <CountDownWrapper
            timeStamp={daily?.timestamp!}
            onToggleDisabled={onToggleDisabled}
            titleCompleted={"Claim"}
            titleUnCompleted={"Claim at"}
            key={String(daily?.nextLevel)}
          />
        ) : (
          <Typography
            className={twMerge("text-[18px] font-bold leading-6 text-white-900")}
            tag={"p"}
          >
            Claim
          </Typography>
        )}
      </Button>
    </div>
  );
};
