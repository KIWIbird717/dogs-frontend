"use client";

import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { Header } from "@/widgets/Header";
import { Navbar } from "@/widgets/Navbar";
import { Board } from "@/widgets/Board";
import { ProfileInfo } from "@/widgets/ProfileInfo";
import { StatsInfo } from "@/widgets/StatsInfo";

import Gradient1 from "@/public/images/svg/profile/gradient/gradient1.svg";
import Gradient2 from "@/public/images/svg/profile/gradient/gradient2.svg";
import useSWR from "swr";
import { StatsService } from "@/shared/lib/services/stats/stats";

interface IProfilePageProps {}

const statics = [
  {
    title: "Total Players",
    value: 323000234,
  },
  {
    title: "Dayly Users",
    value: 69000,
  },
  {
    title: "Online Players",
    value: 100234,
  },
];

const ProfilePage: NextPage<IProfilePageProps> = () => {
  const { coins } = useClicker(false);

  const { data } = useSWR("/stats/all-users-stats", StatsService.getAllUsersStats);

  return (
    <View
      fadeInOnLoad
      className="relative flex h-screen w-full flex-col gap-4 overflow-hidden px-4 pt-6"
    >
      <div className={"z-[10] flex w-full flex-col gap-4"}>
        <Header />
        <div className={"flex w-full flex-col gap-2"}>
          <Board />
          <ProfileInfo />
        </div>
      </div>

      <div className={"relative z-[10] w-full flex-col pt-6"}>
        <div className={"absolute left-0 top-0 h-[1px] w-full bg-gradient-border"} />

        <StatsInfo value={totalTouches || 0} title={"Total Touches:"} isIcon />
        <StatsInfo value={totalTouches || 0} title={"Total Touches:"} isIcon />

        <div className={"flex w-full flex-col gap-10 pt-6"}>
          {statics.map((item, i) => {
            return <StatsInfo key={i} title={item.title} value={item.value} />;
          })}
        </div>
      </div>

      <Navbar />

      <Gradient1 className={"absolute left-0 top-0 z-[1]"} />
      <Gradient2 className={"absolute bottom-[75px] right-0 z-[1]"} />
    </View>
  );
};
export default ProfilePage;
