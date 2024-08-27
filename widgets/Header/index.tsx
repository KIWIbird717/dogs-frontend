"use client";

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
import { useUser } from "@/shared/hooks/useUser";

interface IHeaderProps {}

export const Header: FC<IHeaderProps> = () => {
  const { onOpenModal } = useModal();
  const { push } = useRouter();
  const redirectToFaq = () => push("/faq");
  const redirectToProfile = () => push("/profile");

  const { user } = useUser();
  const { first_name, guildName } = user;

  const onOpenSettings = () => {
    onOpenModal("settings");
  };

  return (
    <div className={"z-[10] flex h-[48px] w-full gap-4"}>
      <div className={"flex w-[56%] justify-between gap-2"} onClick={redirectToProfile}>
        <div className={"relative"}>
          <div className={"h-[48px] w-[48px]"}>
            <Image
              src={AvatarIcon}
              alt={"avatar"}
              className={"h-full w-full rounded-2xl object-cover"}
            />
          </div>

          <Image
            src={"/images/guild.png"}
            alt={"avatar"}
            width={16}
            height={16}
            className={"absolute bottom-0 left-0 rounded"}
          />
        </div>

        <div className={"flex w-full flex-col"}>
          <Typography
            tag={"p"}
            className={"line-clamp-1 text-[18px] font-bold leading-6 text-white-900"}
          >
            {first_name}
          </Typography>
          <Typography tag={"h4"} className={"font-portico font-normal text-blue-800"}>
            {guildName || "-"}
          </Typography>
        </div>
      </div>

      <div className={"flex gap-2"}>
        <Button
          className={
            "h-[48px] w-[48px] border border-black-400 bg-black-400 p-3 opacity-45 shadow-buttonNoAccent"
          }
        >
          <WalletIcon />
        </Button>
        <Button
          className={
            "h-[48px] w-[48px] border border-black-400 bg-black-400 p-3 shadow-buttonNoAccent"
          }
          onClick={redirectToFaq}
        >
          <QuestionIcon />
        </Button>
        <Button
          className={
            "h-[48px] w-[48px] border border-black-400 bg-black-400 p-3 shadow-buttonNoAccent"
          }
          onClick={onOpenSettings}
        >
          <SettingsIcon />
        </Button>
      </div>
    </div>
  );
};
