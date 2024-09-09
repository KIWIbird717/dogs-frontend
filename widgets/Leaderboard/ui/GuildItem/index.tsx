"use client";

import { FC, useState } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import GuildImagePlaceholder from "@/public/images/guild.png";
import Image from "next/image";
import { Button } from "@/shared/ui/Button/Button";
import { TotalCoin } from "@/shared/ui/TotalCoin";
import { JoinMethod } from "@/shared/lib/services/guilds/guilds";

interface IGuildItemProps {
  title: string;
  joinMethod: JoinMethod;
  members: number;
  coins: number | string;
  index: number;
  id: string;
  handleRedirect: (id: string) => void;
  image: string;
}

export const GuildItem: FC<IGuildItemProps> = ({
  members,
  joinMethod,
  title,
  coins,
  index,
  id,
  image,
  handleRedirect,
}) => {
  const numberGuild = index + 1;
  const onClickHandler = () => handleRedirect(id);

  const [isImageLoadingError, setIsImageLoadingError] = useState(false);

  return (
    <Button
      onClick={onClickHandler}
      className={
        "shadow-fix flex h-[64px] w-full items-center justify-between gap-2 rounded-xl border border-black-300 bg-black-400 px-3 py-2 text-left shadow-buttonNoAccent"
      }
    >
      <div className={"flex w-auto max-w-[261px] items-center gap-2"}>
        <Typography tag={"p"} className={"text-[17px] font-bold leading-6 text-white-900"}>
          {numberGuild}
        </Typography>

        <div className="flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-xl border border-white-900">
          <img
            src={isImageLoadingError ? GuildImagePlaceholder.src : image}
            alt={`guild-${index}`}
            width={48}
            height={48}
            className={"h-full w-full object-cover"}
            onError={() => setIsImageLoadingError(true)}
          />
        </div>

        <div className={"flex h-full flex-col justify-center gap-1"}>
          <Typography tag={"h4"} className="w-[100px] max-w-[100px] overflow-hidden text-ellipsis">
            {title}
          </Typography>
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
          coin={Intl.NumberFormat("en-US", {
            notation: "compact",
            maximumFractionDigits: 1,
          }).format(typeof coins === "string" ? parseInt(coins) : coins)}
          tag={"h4"}
          size={"middle"}
          className={"gap-2"}
          classNameText={"font-normal"}
        />
      </div>
    </Button>
  );
};
