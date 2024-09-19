import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { Navbar } from "@/widgets/Navbar";
import { Gradient } from "@/shared/ui/Gradient";
import { BoostHeaderWithIcon } from "@/entities/BoostHeaderWithIcon";
import dynamic from "next/dynamic";

const BoostBowl = dynamic(() => import("@/features/BoostBowl").then((mod) => mod.BoostBowl), {
  ssr: false,
});

interface IBoostPageProps {}

const BoostPage: NextPage<IBoostPageProps> = () => {
  return (
    <>
      <View
        fadeInOnLoad
        className="relative flex h-svh w-full flex-col gap-4 overflow-x-hidden bg-gradient-background px-4 pt-6"
      >
        <BoostHeaderWithIcon />
        <BoostBowl />

        <Navbar />
      </View>

      <Gradient.First className="absolute left-[-70%] top-[-30%] scale-125" />
      <Gradient.Second className="absolute bottom-[-20%] right-[-50%] scale-125" />
    </>
  );
};
export default BoostPage;
