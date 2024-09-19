import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { Navbar } from "@/widgets/Navbar";
import { Gradient } from "@/shared/ui/Gradient";
import dynamic from "next/dynamic";

const EarnTasks = dynamic(() => import("@/features/EarnTasks").then((mod) => mod.EarnTasks));

interface IEarnPageProps {}

const EarnPage: NextPage<IEarnPageProps> = () => {
  return (
    <>
      <View
        fadeInOnLoad
        className="relative flex h-full w-full flex-col gap-4 overflow-x-hidden px-4 pt-6"
      >
        <EarnTasks />

        <Navbar />
      </View>

      <Gradient.First className="absolute left-[-70%] top-[-30%] scale-125" />
      <Gradient.Second className="absolute bottom-[-20%] right-[-50%] scale-125" />
    </>
  );
};
export default EarnPage;
