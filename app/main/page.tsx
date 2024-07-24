import { NextPage } from "next";
import { View } from "@/shared/layout/View";

import { Navbar } from "@/widgets/Navbar";
import { MainForClicker } from "@/widgets/MainForClicker";

interface IMainPageProps {
}

const MainPage: NextPage<IMainPageProps> = () => {
  return (
    <View fadeInOnLoad
          className="flex flex-col gap-[21px] w-full h-screen relative bg-gradient-accent-center pt-6"
    >
      <MainForClicker />

      <Navbar />
    </View>
  );
};
export default MainPage;