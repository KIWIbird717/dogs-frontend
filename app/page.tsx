"use client";

import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { ModalLoading } from "@/widgets/Loading";
import { DuckBackground } from "@/widgets/DuckBackground";
import { useTelegram } from "@/shared/hooks/useTelegram";

interface ILoadingPageProps {}

const handleInvitation = (inviterId?: string) => {
  if (!inviterId) return;

  const inviteLinkPrefix = process.env.NEXT_PUBLIC_INVITE_LINK_PREFIX || "";
  const serializedId = inviterId.replace(inviteLinkPrefix, "");

  localStorage.setItem("inviterId", serializedId);
};

const LoadingPage: NextPage<ILoadingPageProps> = () => {
  const telegram = useTelegram();
  const startAppParams = telegram?.initDataUnsafe.start_param;

  handleInvitation(startAppParams);

  return (
    <View
      fadeInOnLoad
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-background"
    >
      <DuckBackground />
      <ModalLoading />
    </View>
  );
};
export default LoadingPage;
