import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { Navbar } from "@/widgets/Navbar";
import { EarnTasks } from "@/features/EarnTasks";
import { Gradient } from "@/shared/ui/Gradient";

interface IEarnPageProps {}

const EarnPage: NextPage<IEarnPageProps> = () => {
  return (
    <View
      fadeInOnLoad
      className="relative flex h-screen w-full flex-col gap-4 overflow-hidden px-4 pt-6"
    >
      <EarnTasks />

      <Navbar />

      <Gradient.First className="absolute left-[-70%] top-[-30%] scale-125" />
      <Gradient.Second className="absolute bottom-[-20%] right-[-50%] scale-125" />
    </View>
  );
};
export default EarnPage;
