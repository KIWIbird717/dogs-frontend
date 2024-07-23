import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { ModalLoading } from "@/widgets/Loading";
import { DuckBackground } from "@/widgets/DuckBackground";

interface ILoadingPageProps {
}

const LoadingPage: NextPage<ILoadingPageProps> = () => {
  return (
    <View fadeInOnLoad className="flex flex-col justify-center items-center w-full h-screen relative bg-gradient-background">
        <DuckBackground />
        <ModalLoading />
    </View>
  );
};
export default LoadingPage;