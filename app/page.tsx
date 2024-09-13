"use client";

import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { ModalLoading } from "@/widgets/Loading";
import { DuckBackground } from "@/widgets/DuckBackground";
import { useTelegram } from "@/shared/hooks/useTelegram";
import { useEffect } from "react";
import { LocalStorageKeys } from "@/shared/constants/localstorage-keys";
import { Logger } from "@/shared/lib/utils/logger/Logger";

interface ILoadingPageProps {}

const handleFriendInvitation = (inviterId?: string) => {
  if (!inviterId) return;

  const inviteLinkPrefix = process.env.NEXT_PUBLIC_INVITE_LINK_PREFIX || "";
  if (!inviterId.includes(inviteLinkPrefix)) return;
  const serializedId = inviterId.replace(inviteLinkPrefix, "");

  localStorage.setItem(LocalStorageKeys.InviterId, serializedId);
};

const handleGuildInvitation = (inviterId?: string) => {
  if (!inviterId) return;

  const inviteLinkPrefix = process.env.NEXT_PUBLIC_GUILD_INVITE_PREFIX || "";
  if (!inviterId.includes(inviteLinkPrefix)) return;
  const serializedId = inviterId.replace(inviteLinkPrefix, "");

  localStorage.setItem(LocalStorageKeys.InviterGuildId, serializedId);
};

const LoadingPage: NextPage<ILoadingPageProps> = () => {
  const logger = new Logger("LoadingPage");
  const telegram = useTelegram();
  const startAppParams = telegram?.initDataUnsafe.start_param;

  useEffect(() => {
    logger.debug({ startAppParams, rest: telegram?.initDataUnsafe });
    handleFriendInvitation(startAppParams);
    handleGuildInvitation(startAppParams);
  }, [startAppParams]);

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
