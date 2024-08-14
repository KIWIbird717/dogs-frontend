import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { Header } from "@/widgets/Header";
import { Navbar } from "@/widgets/Navbar";
import { IUserPlayer } from "@/widgets/GuildPlayers";
import { StatsMain } from "@/widgets/StatsMain";

import Gradient1 from "@/public/images/svg/leaderboard/gradient/gradient1.svg";
import Gradient2 from "@/public/images/svg/leaderboard/gradient/gradient2.svg";

interface IStatsProps {
}

export interface IRank {
  rank: string,
  value: string
  description: string
  image: any,
  users: IUserPlayer[]
}

const Stats: NextPage<IStatsProps> = () => {

  return (
    <View
      fadeInOnLoad
      className="relative flex h-screen w-full flex-col gap-4 !overflow-hidden px-4 pt-6 "
    >
      <Header />
      <StatsMain />

      <Gradient1 className={"absolute left-0 top-0 z-[1]"} />
      <Gradient2 className={"absolute right-0 bottom-0 z-[1]"} />
      <Navbar />
    </View>
  );
};
export default Stats;