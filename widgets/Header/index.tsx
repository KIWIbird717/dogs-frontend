"use client";

import { FC, memo, useEffect, useState } from "react";
import Image from "next/image";
import { Typography } from "@/shared/ui/Typography/Typography";
import { Button } from "@/shared/ui/Button/Button";

import WalletIcon from "@/public/images/svg/wallet.svg";
import QuestionIcon from "@/public/images/svg/question-icon.svg";
import SettingsIcon from "@/public/images/svg/settings.svg";
import { useModal } from "@/shared/hooks/useModal";
import { useAppSelector } from "@/shared/lib/redux-store/hooks";
import { LinkButton } from "@/shared/ui/LinkButton";
import Link from "next/link";
import UserImagePlaceholder from "@/public/images/user-placeholder.png";
import useSWR, { useSWRConfig } from "swr";
import { GuildsService } from "@/shared/lib/services/guilds/guilds";
import GuildPlaceholderImage from "@/public/images/guild.png";

interface IHeaderProps {}

export const Header: FC<IHeaderProps> = memo(() => {
  const { onOpenModal } = useModal();
  const [isIconLoadingError, setIsIconLoadingError] = useState(false);
  const [isGuildImageLoadError, setIsGuildImageLoadError] = useState(false);

  const first_name = useAppSelector((store) => store.user.first_name);
  const guildName = useAppSelector((store) => store.user.guildName);
  const guild = useAppSelector((store) => store.user.guild);
  const avatar = useAppSelector((store) => store.user.avatar) || "https://no-photo.huh";

  const { data } = useSWR("/guilds/get-guilds", () => GuildsService.getGuild(guild || ""));
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (!guild) return;
    mutate("/guilds/get-guilds");
  }, [guild]);

  const onOpenSettings = () => {
    onOpenModal("settings");
  };

  return (
    <div className={"z-[10] flex h-[48px] w-full gap-4"}>
      <Link href={"/profile"} prefetch className={"flex w-[56%] justify-between gap-2"}>
        <div className={"relative"}>
          <div className={"h-[48px] w-[48px]"}>
            <img
              src={isIconLoadingError ? UserImagePlaceholder.src : avatar}
              alt={isIconLoadingError ? "placeholder" : "avatar"}
              onError={() => setIsIconLoadingError(true)}
              className={"h-full w-full rounded-2xl object-cover"}
            />
          </div>

          {guild && (
            <img
              src={isGuildImageLoadError ? GuildPlaceholderImage.src : data?.data.image}
              onError={() => setIsGuildImageLoadError(true)}
              alt={"avatar"}
              width={16}
              height={16}
              className={"absolute bottom-0 left-0 rounded border-[1px] border-white"}
            />
          )}
        </div>

        <div className={"flex w-full flex-col"}>
          <Typography
            tag={"p"}
            className={"line-clamp-1 text-[18px] font-bold leading-6 text-white-900"}
          >
            {first_name}
          </Typography>

          {guildName ? (
            <Typography tag={"h4"} className={"font-portico font-normal text-blue-800"}>
              {guildName}
            </Typography>
          ) : (
            <Typography tag="p" className="text-[15px] text-white-500">
              Press & join <span className="max-[410px]:hidden">to</span>{" "}
              <span className="text-ellipsis font-semibold text-white-900 max-[410px]:hidden">
                Guild
              </span>
            </Typography>
          )}
        </div>
      </Link>

      <div className={"flex gap-2"}>
        <LinkButton href={""} disabled>
          <WalletIcon />
        </LinkButton>

        <LinkButton href={"/faq"} prefetch>
          <QuestionIcon />
        </LinkButton>

        <Button
          className={
            "shadow-fix shadow-fix h-[48px] w-[48px] border border-black-400 bg-black-400 p-3 shadow-buttonNoAccent"
          }
          onClick={onOpenSettings}
        >
          <SettingsIcon />
        </Button>
      </div>
    </div>
  );
});

Header.displayName = "Header";
