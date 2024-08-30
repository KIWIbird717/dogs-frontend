import { NextPage } from "next";
import { View } from "@/shared/layout/View";

import { Navbar } from "@/widgets/Navbar";
import { MainForClicker } from "@/widgets/MainForClicker";
import Gradient1 from "@/public/images/svg/main/gradient1.svg";
import Gradient2 from "@/public/images/svg/main/gradient2.svg";

interface IMainPageProps {}

const MainPage: NextPage<IMainPageProps> = () => {
  return (
    <View
      fadeInOnLoad
      className="relative flex h-screen w-full flex-col gap-[21px]  bg-gradient-accent-center pt-6"
    >
      <Gradient1 className={"absolute top-0"} />
      <Gradient2 className={"absolute -bottom-[100px] z-[1]"} />
      <Gradient2 className={"absolute -bottom-[50px] left-0 z-[1]"} />

      <MainForClicker />

      <Navbar />
    </View>
  );
};
export default MainPage;
