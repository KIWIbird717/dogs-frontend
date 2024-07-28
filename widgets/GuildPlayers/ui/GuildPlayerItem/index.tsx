"use client";

import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import AvatarImage from "@/public/images/avatar.png";
import Image from "next/image";
import { Button } from "@/shared/ui/Button/Button";
import { TotalCoin } from "@/shared/ui/TotalCoin";


interface IGuildPlayerItemProps {
  avatarUrl: string;
  title: string;
  league: string;
  coins: number | string;
  index: number;
  id: string;
  handleRedirect: (id: string) => void;
}

export const GuildPlayerItem: FC<IGuildPlayerItemProps> = (
  {
    avatarUrl,
    league,
    title,
    coins,
    index,
    id,
    handleRedirect,
  },
) => {
  const numberGuild = index + 1;
  const onClickHandler = () => handleRedirect(id);

  return (
    <Button onClick={onClickHandler}
            className={"h-[64px] text-left w-full px-3 py-2 flex items-center justify-between gap-2 rounded-xl bg-black-400 border border-black-300 shadow-buttonNoAccent"}
    >
      <div className={"w-auto max-w-[261px] flex items-center gap-2 "}>
        <Typography tag={"p"}
                    className={"font-bold text-[17px] leading-6 text-white-900"}
        >
          {numberGuild}
        </Typography>
        <div
          className={"w-[48px] h-[48px] flex items-center justify-center rounded-xl relative"}
        >
          <Image src={avatarUrl || AvatarImage}
                 alt={`guild-${index}`}
                 width={48}
                 height={48}
                 className={"object-cover w-full h-full rounded-xl border border-white-900"}
          />

          <Image src={"/images/guild.png"}
                 alt={"avatar"}
                 width={16}
                 height={16}
                 className={"rounded absolute bottom-0 left-0"}
          />
        </div>

        <div className={" h-full flex flex-col justify-center gap-1"}>
          <Typography tag={"h3"}>
            {title}
          </Typography>
          <Typography tag={"span"}
                      className={"text-[13px] font-normal leading-4 text-white-800"}
          >
            League: <span className={"text-[15px] font-bold leading-[18px] text-white-900"}>{league}</span>
          </Typography>
        </div>
      </div>


      <div className={"min-w-[89px] h-full flex gap-2 items-center"}>
        <TotalCoin coin={coins as number}
                   tag={"h4"}
                   size={"middle"}
                   info={"M"}
        />
      </div>
    </Button>
  );
};