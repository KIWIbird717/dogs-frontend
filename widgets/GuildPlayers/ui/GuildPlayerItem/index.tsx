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

export const GuildPlayerItem: FC<IGuildPlayerItemProps> = ({
  avatarUrl,
  league,
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
        <div className={"relative flex h-[48px] w-[48px] items-center justify-center rounded-xl"}>
          <Image
            src={avatarUrl || AvatarImage}
            alt={`guild-${index}`}
            width={48}
            height={48}
            className={"h-full w-full rounded-xl border border-white-900 object-cover"}
          />

          <Image
            src={"/images/guild.png"}
            alt={"avatar"}
            width={16}
            height={16}
            className={"absolute bottom-0 left-0 rounded"}
          />
        </div>

        <div className={"flex h-full flex-col justify-center gap-1"}>
          <Typography tag={"h3"}>{title}</Typography>
          <Typography tag={"span"} className={"text-[13px] font-normal leading-4 text-white-800"}>
            League: &nbsp;
            <span className={"text-[15px] font-bold leading-[18px] text-white-900"}>{league}</span>
          </Typography>
        </div>
      </div>

      <div className={"flex h-full min-w-[89px] items-center gap-2"}>
        <TotalCoin coin={coins as number} tag={"h4"} size={"middle"} info={"M"} />
      </div>
    </Button>
  );
};
