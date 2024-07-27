"use client"

import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import GuildImage from "@/public/images/guild.png";
import Image from "next/image";
import CoinIcon from "@/public/images/svg/guild/coin.svg";
import { Button } from "@/shared/ui/Button/Button";


interface IGuildItemProps {
  avatarUrl: string;
  title: string;
  description: string;
  members: string;
  coins: number | string;
  index: number;
  id: string;
  handleRedirect: (id: string) => void;
}

export const GuildItem: FC<IGuildItemProps> = (
  {
    avatarUrl,
    members,
    description,
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
          className={"w-[48px] h-[48px] flex items-center justify-center rounded-xl border border-white-900"}>
          <Image src={avatarUrl || GuildImage}
                 alt={`guild-${index}`}
                 width={48}
                 height={48}
                 className={"object-cover w-full h-full "}
          />
        </div>

        <div className={" h-full flex flex-col justify-center gap-1"}>
          <Typography tag={"h3"}>
            {title}
          </Typography>
          <Typography tag={"span"}
                      className={"text-[13px] font-normal leading-4 text-white-800"}
          >
            {description}
          </Typography>
        </div>

        <div className={"min-w-[60px] h-full flex flex-col justify-center  gap-1"}>
          <Typography tag={"span"}
                      className={"text-white-800 text-[13px] leading-4 font-normal"}
          >
            Members
          </Typography>
          <Typography tag={"span"}
                      className={"text-white-900 text-[13px] leading-4 font-normal text-center"}
          >
            {members}
          </Typography>
        </div>
      </div>


      <div className={"w-[89px] h-full flex gap-2 items-center"}>
        <div>
          <CoinIcon />
        </div>
        <Typography tag={"h4"}
                    className={"text-white-900"}
        >
          {coins} K
        </Typography>
      </div>
    </Button>
  );
};