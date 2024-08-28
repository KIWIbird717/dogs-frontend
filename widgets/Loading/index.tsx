"use client";

import { FC, useEffect } from "react";
import BoneIcon from "@/public/images/svg/bone.svg";
import { Typography } from "@/shared/ui/Typography/Typography";
import Lottie from "react-lottie";
import animationData from "@/public/lotties/loading.json";
import { useRouter } from "next/navigation";
import { useUser } from "@/shared/hooks/useUser";

interface IModalLoadingProps {}

export const ModalLoading: FC<IModalLoadingProps> = () => {
  const { push } = useRouter();
  const { getMe } = useUser();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    /**
     * Проверка авторизации:
     * - получаем информацию пользователя /users/get-me
     * - если есть пользователь в /users/get-me то осуществляем вход в приложение (страница main)
     * - если есть пользователь не найден переходим на страницу onboarding
     */

    (async () => {
      try {
        await getMe();
        push("/main");
      } catch (error) {
        push("/onboarding");
      }
    })();
  }, [push]);

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
            <Typography tag={"h2"} className={"font-epilogue font-normal"}>
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
