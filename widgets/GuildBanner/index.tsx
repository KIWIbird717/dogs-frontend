"use client";

import { FC, useEffect } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { Block } from "@/widgets/GuildBanner/ui/Block";
import { formatNumber } from "@/shared/lib/utils/formatNumber";
import { twMerge } from "tailwind-merge";
import SettingsIcon from "@/public/images/svg/settings.svg";
import { Button } from "@/shared/ui/Button/Button";
import { useRouter } from "next/navigation";
import { GuildResponseWithMembersType } from "@/shared/lib/services/guilds/guilds";
import GuildImage from "@/public/images/guild.png";

interface IGuildBannerProps {
  guild: GuildResponseWithMembersType;
  isGuildJoined?: boolean;
  guildImage: any;
  // для страницы /guilds - должен быть true,
  // Для страницы /guilds/id  - должен быть false,
  isBanner?: boolean;
}

export const GuildBanner: FC<IGuildBannerProps> = ({
  guild,
  isBanner = true,
  isGuildJoined,
  guildImage,
}) => {
  const { push } = useRouter();
  const totalScore = formatNumber(guild.guildBalance || 0);

  const redirectHandler = () => {
    if (isBanner) {
      push(`/guilds/${guild._id}`);
    }
  };

  const members = guild.membersCount || guild.members.length;

  return (
    <div
      className={twMerge(
        "z-[10] flex w-full flex-col rounded-xl",
        isBanner && "gap-2 border border-black-400 bg-black-400 p-4 shadow-buttonNoAccent",
        !isBanner && "gap-4",
      )}
      onClick={redirectHandler}
    >
      <div className={"flex w-full items-center gap-2"}>
        <div className={"flex w-full gap-2"}>
          <img
            src={GuildImage.src} //TODO: Не приходит изображение с бэка. Нужно изменить
            alt={"guild"}
            width={isBanner ? 80 : 56}
            height={isBanner ? 80 : 56}
            className={twMerge(isBanner ? "h-[80px] w-[80px]" : "h-[56px] w-[56px]")}
          />

          <div className={"flex w-full flex-col justify-center gap-1"}>
            <Typography
              tag={isBanner ? "h1" : "h2"}
              className={twMerge(
                isBanner
                  ? "font-normal uppercase"
                  : "w-[200px] max-w-[200px] overflow-hidden text-ellipsis font-bold",
              )}
            >
              {guild.name}
            </Typography>
            <Typography tag={"p"} className={"text-[18px] font-normal leading-6 text-white-900"}>
              {"Author"}
            </Typography>
          </div>
        </div>

        {!isBanner && isGuildJoined && (
          <Button
            className={
              "h-[48px] w-[48px] border border-black-400 bg-black-400 p-3 shadow-buttonNoAccent"
            }
          >
            <SettingsIcon />
          </Button>
        )}
      </div>
      <div className={"flex w-full gap-2"}>
        <Block value={totalScore} title={"Total score"} isBanner={isBanner} />
        <Block value={members} title={"Members"} isBanner={isBanner} />
      </div>
    </div>
  );
};
