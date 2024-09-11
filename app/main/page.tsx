"use client";

import { View } from "@/shared/layout/View";
import { Navbar } from "@/widgets/Navbar";
import { InvitationHandler } from "@/entities/MainPage/InvitationHandler";
import { usePreventOnSwipeWindowClose } from "@/shared/hooks/usePreventSwipeClose";
import dynamic from "next/dynamic";
import { Gradient } from "@/shared/ui/Gradient";

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
      <Gradient.First className={"scale-130 absolute left-[-60%] top-[-20%]"} />
      <Gradient.Second className={"absolute -bottom-[27%] right-[-50%] z-[1] scale-150"} />

      <InvitationHandler />

      <MainForClicker />

      <Navbar />
    </View>
  );
};
export default MainPage;
