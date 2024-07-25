import { NextPage } from "next";
import { DuckBackground } from "@/widgets/DuckBackground";
import { View } from "@/shared/layout/View";
import { ModalNft } from "@/widgets/ModalNft";
import { Navbar } from "@/widgets/Navbar";

interface INftPageProps {
}

const NftPage: NextPage<INftPageProps> = () => {
  return (
    <View fadeInOnLoad
          className="flex flex-col justify-center items-center px-[17px] w-full h-screen relative bg-gradient-background">
      <DuckBackground isNftPage />
      <ModalNft />

      <Navbar />
    </View>
  );
};
export default NftPage;