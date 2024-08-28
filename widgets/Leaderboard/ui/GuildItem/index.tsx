"use client";

import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import GuildImage from "@/public/images/guild.png";
import Image from "next/image";
import { Button } from "@/shared/ui/Button/Button";
import { TotalCoin } from "@/shared/ui/TotalCoin";
import { JoinMethod } from "@/shared/lib/services/guilds/guilds";

interface IGuildItemProps {
  avatarUrl: string;
  title: string;
  joinMethod: JoinMethod;
  members: number;
  coins: number | string;
  index: number;
  id: string;
  handleRedirect: (id: string) => void;
}

export const GuildItem: FC<IGuildItemProps> = ({
  avatarUrl,
  members,
  joinMethod,
  title,
  coins,
  index,
  id,
  handleRedirect,
}) => {
  const numberGuild = index + 1;
  const onClickHandler = () => handleRedirect(id);

  return (
    <Button
      onClick={onClickHandler}
      className={
        "flex h-[64px] w-full items-center justify-between gap-2 rounded-xl border border-black-300 bg-black-400 px-3 py-2 text-left shadow-buttonNoAccent"
      }
    >
      <div className={"flex w-auto max-w-[261px] items-center gap-2"}>
        <Typography tag={"p"} className={"text-[17px] font-bold leading-6 text-white-900"}>
          {numberGuild}
        </Typography>

        <div
          className={
            "flex h-[48px] w-[48px] items-center justify-center rounded-xl border border-white-900"
          }
        >
          <Image
            src={avatarUrl || GuildImage}
            alt={`guild-${index}`}
            width={48}
            height={48}
            className={"h-full w-full object-cover"}
          />
        </div>

        <div className={"flex h-full flex-col justify-center gap-1"}>
          <Typography tag={"h3"}>{title}</Typography>
          <Typography tag={"span"} className={"text-[13px] font-normal leading-4 text-white-800"}>
            {joinMethod === "bylink" ? "By invitation only" : "Free"}
          </Typography>
        </div>

        <div className={"flex h-full min-w-[60px] flex-col justify-center gap-1"}>
          <Typography tag={"span"} className={"text-[13px] font-normal leading-4 text-white-800"}>
            Members
          </Typography>
          <Typography
            tag={"span"}
            className={"text-center text-[13px] font-normal leading-4 text-white-900"}
          >
            {members}
          </Typography>
        </div>
      </div>

      <div className={"flex h-full w-[89px] items-center gap-2"}>
        <TotalCoin
          coin={coins as number}
          tag={"h4"}
          size={"middle"}
          info={"K"}
          className={"gap-2"}
          classNameText={"font-normal"}
        />
      </div>
    </Button>
  );
};
