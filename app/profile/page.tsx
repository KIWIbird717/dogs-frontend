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
import { StatsService } from "@/shared/lib/services/stats/stats";
import { useEffect, useMemo } from "react";
import { useStats } from "@/shared/hooks/useStats";
import { Logger } from "@/shared/lib/utils/logger/Logger";

interface IProfilePageProps {}

const ProfilePage: NextPage<IProfilePageProps> = () => {
  const logger = new Logger("ProfilePage");
  const { coins } = useClicker(false);

  const { onChangeStats, online, dailyUsers, totalUsers } = useStats();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await StatsService.getAllUsersStats();
        onChangeStats({
          totalUsers: data.totalUsers,
          online: data.online!,
          dailyUsers: data.online!,
        });
      } catch (error) {
        logger.error(error);
      } finally {
      }
    })();
  }, []);

  const statics = useMemo(
    () => [
      {
        title: "Total Players",
        value: totalUsers || 0,
      },
      {
        title: "Dayly Users",
        value: dailyUsers?.length,
      },
      {
        title: "Online Players",
        value: online?.length,
      },
    ],
    [dailyUsers?.length, online?.length, totalUsers],
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
