"use client";

import { View } from "@/shared/layout/View";
import { Navbar } from "@/widgets/Navbar";
import Gradient1 from "@/public/images/svg/main/gradient1.svg";
import Gradient2 from "@/public/images/svg/main/gradient2.svg";
import { InvitationHandler } from "@/entities/MainPage/InvitationHandler";
import { usePreventOnSwipeWindowClose } from "@/shared/hooks/usePreventSwipeClose";
import dynamic from "next/dynamic";

const MainForClicker = dynamic(
  () => import("@/widgets/MainForClicker").then((mod) => mod.MainForClicker),
  { ssr: false },
);

const MainPage = () => {
  usePreventOnSwipeWindowClose(true);

  return (
    <View
      fadeInOnLoad
      className="relative flex h-screen w-full flex-col gap-[21px] overflow-hidden bg-gradient-accent-center pt-6"
    >
      <Gradient1 className={"absolute top-0"} />
      <Gradient2 className={"absolute -bottom-[100px] z-[1]"} />
      <Gradient2 className={"absolute -bottom-[50px] left-0 z-[1]"} />

      <InvitationHandler />

      <MainForClicker />

      <Navbar />
    </View>
  );
};
export default MainPage;
