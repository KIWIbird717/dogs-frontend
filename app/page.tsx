"use client";

import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { ModalLoading } from "@/widgets/Loading";
import { DuckBackground } from "@/widgets/DuckBackground";
import { useTelegram } from "@/shared/hooks/useTelegram";
import toast, { Toaster } from "react-hot-toast";

interface ILoadingPageProps {}

const LoadingPage: NextPage<ILoadingPageProps> = () => {
  const telegram = useTelegram();
  const startAppParams = telegram?.initDataUnsafe.start_param;

  if (startAppParams) {
    toast.success(JSON.stringify(startAppParams));
  } else {
    toast.error("huh");
  }

  return (
    <View
      fadeInOnLoad
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-background"
    >
      <Toaster />
      <DuckBackground />
      <ModalLoading />
    </View>
  );
};
export default LoadingPage;
