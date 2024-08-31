import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { ModalLoading } from "@/widgets/Loading";
import { DuckBackground } from "@/widgets/DuckBackground";

interface ILoadingPageProps {}

const LoadingPage: NextPage<ILoadingPageProps> = () => {
  return (
    <View
      fadeInOnLoad
      className="relative flex h-screen w-full flex-col items-center justify-center bg-gradient-background"
    >
      <DuckBackground />
      <ModalLoading />
    </View>
  );
};
export default LoadingPage;
