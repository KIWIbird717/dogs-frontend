"use client";

import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { Header } from "@/widgets/Header";
import { Navbar } from "@/widgets/Navbar";
import { Board } from "@/widgets/Board";
import { ProfileInfo } from "@/widgets/ProfileInfo";

import { useClicker } from "@/shared/hooks/useClicker";
import { StatsInfo } from "@/widgets/StatsInfo";

import Gradient1 from "@/public/images/svg/profile/gradient/gradient1.svg";
import Gradient2 from "@/public/images/svg/profile/gradient/gradient2.svg";

interface IProfilePageProps {
}

const statics = [
  {
    title: "Total Players",
    value: 323000234,
  }, {
    title: "Dayly Users",
    value: 69000,
  }, {
    title: "Online Players",
    value: 100234,
  },
];

const ProfilePage: NextPage<IProfilePageProps> = () => {
  const {
    coins,
  } = useClicker(false);


  return (
    <View fadeInOnLoad
          className="flex flex-col gap-4 w-full h-screen relative pt-6 px-4 overflow-hidden "
    >
      <div className={"w-full flex flex-col gap-4 z-[10]"}>
        <Header />
        <div className={"w-full flex flex-col gap-2"}>
          <Board />
          <ProfileInfo />
        </div>
      </div>

      <div className={"w-full flex-col relative pt-6 z-[10]"}>
        <div className={"absolute top-0 left-0 w-full h-[1px] bg-gradient-border"} />

        <StatsInfo value={coins}
                   title={"Total Touches:"}
                   isIcon
        />

        <div className={"w-full flex flex-col gap-10 pt-6"}>
          {statics.map((item, i) => {
            return <StatsInfo key={i}
                              title={item.title}
                              value={item.value}
            />;
          })}
        </div>
      </div>


      <Navbar />

      <Gradient1 className={"absolute left-0 top-0 z-[1]"} />
      <Gradient2 className={"absolute right-0 bottom-[75px] z-[1]"} />
    </View>
  );
};
export default ProfilePage;