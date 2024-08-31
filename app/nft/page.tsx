import { NextPage } from "next";
import { DuckBackground } from "@/widgets/DuckBackground";
import { View } from "@/shared/layout/View";
import { ModalNft } from "@/widgets/ModalNft";
import { Navbar } from "@/widgets/Navbar";

interface INftPageProps {}

const NftPage: NextPage<INftPageProps> = () => {
  return (
    <View
      fadeInOnLoad
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-background px-[17px]"
    >
      <DuckBackground isNftPage />
      <ModalNft />

      <Navbar />
    </View>
  );
};
export default NftPage;
