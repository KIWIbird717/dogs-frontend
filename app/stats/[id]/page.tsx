"use client";

import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { Navbar } from "@/widgets/Navbar";
import { Button } from "@/shared/ui/Button/Button";
import { BonusList } from "@/widgets/BonusList";
import { Typography } from "@/shared/ui/Typography/Typography";

import Gradient1 from "@/public/images/svg/leaderboard/currentStats/gradient/gradient1.svg";
import Gradient2 from "@/public/images/svg/leaderboard/currentStats/gradient/gradient2.svg";

interface ISingleRankStatsProps {}

const SingleRankStats: NextPage<ISingleRankStatsProps> = () => {
  const onShareHandler = () => {
    navigator.share({ text: "" as string });
  };

  return (
    <View
      fadeInOnLoad
      className="relative flex h-screen w-full flex-col gap-4 overflow-hidden px-4 pt-6"
    >
      <div className={"z-10"}>
        <Typography tag={"h2"}>All Legue</Typography>
      </div>

      <BonusList />

      <div className={"absolute bottom-[116px] left-4 z-[10] flex w-[calc(100%-32px)] gap-2"}>
        <Button
          variant={"deepBlue"}
          className={"w-full text-[18px] font-bold leading-6 text-white-900"}
          onClick={onShareHandler}
        >
          Invite Friend
        </Button>
      </div>

      <Navbar />

      <Gradient1 className={"absolute left-0 top-0 z-[1]"} />
      <Gradient2 className={"absolute bottom-0 left-0 z-[1]"} />
    </View>
  );
};
export default SingleRankStats;
