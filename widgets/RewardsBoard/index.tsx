import { FC } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { Header } from "@/widgets/RewardsBoard/ui/Header";
import { Time } from "@/widgets/RewardsBoard/ui/Time";
import { Days } from "@/widgets/RewardsBoard/ui/Days";

interface IRewardsBoardProps {}

export const RewardsBoard: FC<IRewardsBoardProps> = () => {
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

      <Days />

      <Button
        variant={"primary"}
        disabled
        className={"h-[48px] text-[18px] font-bold leading-6 text-white-900"}
      >
        Claim at 9:21:31
      </Button>
    </div>
  );
};
