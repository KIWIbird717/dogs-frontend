"use client";

import { FC, useEffect } from "react";
import BoneIcon from "@/public/images/svg/bone.svg";
import { Typography } from "@/shared/ui/Typography/Typography";
import animationData from "@/public/lotties/loading.json";
import { useRouter } from "next/navigation";
import { useTelegram } from "@/shared/hooks/useTelegram";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import { useAppDispatch } from "@/shared/lib/redux-store/hooks";
import { setGameInfo } from "./shared/func/setGameInfo";
import Lottie from "react-lottie";
import { Platforms } from "@twa-dev/types";
import { setUserInfo } from "./shared/func/setUserInfo";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const allowedPlatforms: Platforms[] = ["android", "android_x", "ios"];

interface IModalLoadingProps {}

export const ModalLoading: FC<IModalLoadingProps> = () => {
  const router = useRouter();
  const telegram = useTelegram();
  const dispatch = useAppDispatch();
  const logger = new Logger("ModalLoading");

  logger.debug({ telegram });

  useEffect(() => {
    /**
     * Проверка авторизации:
     * - получаем информацию пользователя /users/get-me
     * - если есть пользователь в /users/get-me то осуществляем вход в приложение (страница main)
     * - если есть пользователь не найден переходим на страницу onboarding
     */

    (async () => {
      // для запуска платформы в браузере во время дебага
      const isDebug = parseInt(process.env.NEXT_PUBLIC_IS_DEBUG || "0");

      if (!isDebug) {
        if (!telegram?.platform) return;
        if (!allowedPlatforms.includes(telegram.platform)) {
          return router.push("/not-allowed-platform");
        }
      }

      router.prefetch("/main");
      router.prefetch("/onboarding");

      try {
        await Promise.all([setGameInfo(dispatch), setUserInfo(dispatch)]);
        router.push("/main");
      } catch (error) {
        router.push("/onboarding");
      }
    })();
  }, [telegram?.platform]);

  return (
    <div
      className={
        "relative z-[10] flex w-[296px] flex-col gap-4 rounded-xl border-[1px] border-black-300 px-4 pb-4 pt-6 shadow-loadingModal"
      }
    >
      <div className={"flex w-full flex-col gap-2"}>
        <div className={"flex gap-2"}>
          <div>
            <BoneIcon />
          </div>
          <div>
            <Typography tag={"h2"} className={"font-epilogue font-normal text-white-900"}>
              DOGS
            </Typography>
          </div>
        </div>
        <div className={"w-[128px]"}>
          <Typography tag={"span"} className={"text-[15px] leading-[18px] text-white-800"}>
            Welcome to the future of NFT
          </Typography>
        </div>
      </div>

      <div className={"flex h-[52px] w-full"}>
        <div className={"flex h-full w-1/2 items-center"}>
          <Typography tag={"p"} className={"text-[20px] text-white-900"}>
            Loading...
          </Typography>
        </div>
        <div className={"h-full w-1/2"}>
          <Lottie options={defaultOptions} height={52} width={130} />
        </div>
      </div>

      <div
        className={
          "absolute left-0 top-0 z-[-1] h-full w-full rounded-xl bg-black-750 backdrop-blur-[16px]"
        }
      />
    </div>
  );
};
