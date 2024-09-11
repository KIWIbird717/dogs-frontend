"use client";

import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { Header } from "@/widgets/Header";
import { Navbar } from "@/widgets/Navbar";
import { Board } from "@/widgets/Board";
import { ProfileInfo } from "@/widgets/ProfileInfo";
import { StatsInfo } from "@/widgets/StatsInfo";
import { StatsService } from "@/shared/lib/services/stats/stats";
import { useMemo } from "react";
import useSWR from "swr";
import { Gradient } from "@/shared/ui/Gradient";
import { usePreventOnSwipeWindowClose } from "@/shared/hooks/usePreventSwipeClose";

const ProfilePage = () => {
  usePreventOnSwipeWindowClose(true);

  const { data } = useSWR("/stats/all-users-stats", StatsService.getAllUsersStats);

  const statics = useMemo(
    () => [
      {
        title: "Total Players",
        value: data?.data.totalUsers || 0,
      },
      {
        title: "Dayly Users",
        value: data?.data.dailyUsers || 0,
      },
      {
        title: "Online Players",
        value: data?.data.online || 0,
      },
    ],
    [data?.data.totalUsers, data?.data.dailyUsers, data?.data.online],
  );

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

        <StatsInfo value={data?.data.totalTouches || 0} title={"Total Touches:"} isIcon />

        <div className={"flex w-full flex-col gap-10 pt-6"}>
          {statics.map((item, i) => {
            return <StatsInfo key={i} title={item.title} value={item.value || 0} />;
          })}
        </div>
      </div>

      <Navbar />

      <Gradient.First className={"scale-130 absolute left-[-60%] top-[-20%]"} />
      <Gradient.Second className={"absolute -bottom-[27%] right-[-50%] z-[1] scale-150"} />
    </View>
  );
};
export default ProfilePage;
