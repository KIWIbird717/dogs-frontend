"use client";

import { DuckBackground } from "@/widgets/DuckBackground";
import { View } from "@/shared/layout/View";
import { ModalNft } from "@/widgets/ModalNft";
import { Navbar } from "@/widgets/Navbar";
import { usePreventOnSwipeWindowClose } from "@/shared/hooks/usePreventSwipeClose";

const NftPage = () => {
  usePreventOnSwipeWindowClose(true);

  return (
    <View
      fadeInOnLoad
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-[17px]"
    >
      <DuckBackground isNftPage />
      <ModalNft />

      <Navbar />
    </View>
  );
};
export default NftPage;
