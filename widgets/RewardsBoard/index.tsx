import { FC } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { Header } from "@/widgets/RewardsBoard/ui/Header";
import { Time } from "@/widgets/RewardsBoard/ui/Time";
import { Days } from "@/widgets/RewardsBoard/ui/Days";

interface IRewardsBoardProps {
}

export const RewardsBoard: FC<IRewardsBoardProps> = () => {
  return (
    <div
      className={"w-full flex flex-col gap-6 px-3 py-5 rounded-xl bg-black-400 border border-black-300 shadow-buttonNoAccent"}

    >
      <div className={"w-full flex"}>
        <Header />
        <Time />
      </div>

      <Days />

      <Button variant={"primary"}
              disabled
              className={"h-[48px] text-white-900 text-[18px] leading-6 font-bold"}
      >
        Claim at 9:21:31
      </Button>
    </div>
  );
};