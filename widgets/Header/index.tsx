"use client"

import { FC } from "react";
import Image from "next/image";
import { Typography } from "@/shared/ui/Typography/Typography";
import { Button } from "@/shared/ui/Button/Button";

import AvatarIcon from "@/public/images/avatar.png";
import WalletIcon from "@/public/images/svg/wallet.svg";
import QuestionIcon from "@/public/images/svg/question-icon.svg";
import SettingsIcon from "@/public/images/svg/settings.svg";
import { useRouter } from "next/navigation";
import { useModal } from "@/shared/hooks/useModal";

interface IHeaderProps {
}

export const Header: FC<IHeaderProps> = () => {
  const { onOpenModal } = useModal();
  const { push } = useRouter();
  const redirectToFaq = () => push("/faq");

  const onOpenSettings = () => {
    onOpenModal("settings", {});
  };

  return (
    <div className={"w-full flex gap-4 h-[48px]"}>
      <div className={"w-[56%] flex justify-between gap-2"}>
        <div className={"relative"}>
          <div className={"w-[48px] h-[48px]"}>
            <Image src={AvatarIcon}
                   alt={"avatar"}
                   className={"rounded-2xl w-full h-full"}
            />
          </div>

          <Image src={"/images/guilds.png"}
                 alt={"avatar"}
                 width={16}
                 height={16}
                 className={"rounded absolute bottom-0 left-0"}
          />
        </div>

        <div className={"flex flex-col"}>
          <Typography tag={"p"}
                      className={"text-white-900 text-[18px] leading-6 font-bold line-clamp-1"}
          >
            Keren Kvain Moundsucich
          </Typography>
          <Typography tag={"h4"}
                      className={"font-portico text-blue-800 font-normal"}
          >
            Tom & Jerry
          </Typography>
        </div>
      </div>

      <div className={"flex gap-2"}>
        <Button
          className={"w-[48px] h-[48px] p-3 shadow-buttonNoAccent opacity-45 bg-black-400 border border-black-400"}>
          <WalletIcon />
        </Button>
        <Button className={"w-[48px] h-[48px] p-3 shadow-buttonNoAccent bg-black-400 border border-black-400"}
                onClick={redirectToFaq}
        >
          <QuestionIcon />
        </Button>
        <Button className={"w-[48px] h-[48px] p-3 shadow-buttonNoAccent bg-black-400 border border-black-400"}
                onClick={onOpenSettings}
        >
          <SettingsIcon />
        </Button>
      </div>
    </div>
  );
};