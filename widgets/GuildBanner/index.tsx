"use client"

import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import Image from "next/image";
import { Block } from "@/widgets/GuildBanner/ui/Block";
import { formatNumber } from "@/shared/lib/utils/formatNumber";
import GuildImage from "@/public/images/guild.png";
import { twMerge } from "tailwind-merge";
import SettingsIcon from "@/public/images/svg/settings.svg";
import { Button } from "@/shared/ui/Button/Button";
import { useRouter } from "next/navigation";

interface IGuildBannerProps {
  guildInfo: IGuild;
  isGuildJoined?: boolean;

  // для страницы /guilds - должен быть true,
  // Для страницы /guilds/id  - должен быть false,
  isBanner?: boolean;
}

export interface IGuild {
  icon: typeof GuildImage,
  name: string,
  author: string,
  members: string,
  totalScore: number
  link?: string
}

export const GuildBanner: FC<IGuildBannerProps> = (
  {
    guildInfo,
    isBanner = true,
    isGuildJoined
  },
) => {
  const { push } = useRouter();
  const totalScore = formatNumber(guildInfo.totalScore);

  const redirectHandler = () => {
    if (isBanner) {
      push("/guilds/1");
    }
  };

  return (
    <div
      className={twMerge(
        "w-full flex flex-col rounded-xl z-[10]",
        isBanner && "border border-black-400 bg-black-400 shadow-buttonNoAccent p-4 gap-2",
        !isBanner && "gap-4",
      )}
      onClick={redirectHandler}
    >
      <div className={"w-full flex items-center gap-2"}>
        <div className={"w-full flex gap-2"}>
          <Image src={guildInfo.icon}
                 alt={"guild"}
                 className={twMerge(
                   isBanner ? "w-[80px] h-[80px]" : "w-[56px] h-[56px]",
                 )}
          />

          <div className={"w-full flex flex-col justify-center gap-1"}>
            <Typography tag={isBanner ? "h1" : "h2"}
                        className={twMerge(isBanner ? "font-normal uppercase" : "font-bold")}
            >
              {guildInfo.name}
            </Typography>
            <Typography tag={"p"}
                        className={"font-normal text-[18px] leading-6 text-white-900"}
            >
              {guildInfo.author}
            </Typography>
          </div>
        </div>

        {!isBanner && isGuildJoined &&
          <Button className={"w-[48px] h-[48px] p-3 shadow-buttonNoAccent bg-black-400 border border-black-400"}
          >
            <SettingsIcon />
          </Button>}

      </div>
      <div className={"w-full flex gap-2"}>
        <Block value={totalScore}
               title={"Total score"}
               isBanner={isBanner}
        />
        <Block value={guildInfo.members}
               title={"Members"}
               isBanner={isBanner}
        />
      </div>
    </div>
  );
};