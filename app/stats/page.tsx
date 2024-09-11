import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { Header } from "@/widgets/Header";
import { Navbar } from "@/widgets/Navbar";
import { StatsMain } from "@/widgets/StatsMain";
import { Gradient } from "@/shared/ui/Gradient";

interface IStatsProps {}

const Stats: NextPage<IStatsProps> = () => {
  return (
    <>
      <View
        fadeInOnLoad
        className="relative flex h-screen w-full flex-col gap-4 overflow-x-hidden px-4 pt-6"
      >
        <Header />
        <StatsMain />

        <Navbar />
      </View>

      <Gradient.First className="absolute top-0 scale-150" />
      <Gradient.Second className="absolute bottom-[-20%] right-[-30%]" />
    </>
  );
};
export default Stats;
