"use client";

import { FC, useState } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import AvatarImage from "@/public/images/avatar.png";
import Image from "next/image";
import { Button } from "@/shared/ui/Button/Button";
import { TotalCoin } from "@/shared/ui/TotalCoin";
import { twMerge } from "tailwind-merge";
import UserImagePlaceholder from "@/public/images/user-placeholder.png";

interface IGuildPlayerItemProps {
  avatarUrl?: string;
  title: string;
  league: string;
  coins: number | string;
  index: number;
  id: number | string;
  handleRedirect?: (id: number | string) => void;
  className?: string;
}

export const GuildPlayerItem: FC<IGuildPlayerItemProps> = ({
  avatarUrl,
  league,
  title,
  coins,
  index,
  id,
  handleRedirect,
  className,
}) => {
  const numberGuild = index + 1;
  const [isAvatarLoadingError, setIsAvatarLoadingError] = useState(false);

  return (
    <div
      className={twMerge(
        "shadow-fix flex h-[64px] w-full items-center justify-between gap-2 rounded-xl border border-black-300 px-3 py-2 text-left shadow-buttonNoAccent",
        className ? className : "bg-black-400",
      )}
    >
      <div className={"flex w-auto max-w-[261px] items-center gap-2"}>
        <Typography tag={"p"} className={"text-[17px] font-bold leading-6 text-white-900"}>
          {numberGuild}
        </Typography>
        <div
          className={
            "relative flex h-[48px] w-[48px] flex-shrink-0 items-center justify-center rounded-xl"
          }
        >
          <img
            src={
              isAvatarLoadingError ? UserImagePlaceholder.src : avatarUrl || "https://no-photo.huh"
            }
            alt={`guild-${index}`}
            onError={() => setIsAvatarLoadingError(true)}
            width={48}
            height={48}
            className={"h-full w-full rounded-xl border border-white-900 object-cover"}
          />
        </div>

        <div className={"flex h-full flex-col justify-center gap-1"}>
          <Typography tag={"h3"} className="line-clamp-1">
            {title}
          </Typography>
          <Typography tag={"span"} className={"text-[13px] font-normal leading-4 text-white-800"}>
            Guild: &nbsp;
            <span className={"text-[15px] font-bold leading-[18px] text-white-900"}>
              {league ? league : "-"}
            </span>
          </Typography>
        </div>
      </div>

      <div className={"flex h-full min-w-[89px] items-center gap-2"}>
        <TotalCoin
          coin={Intl.NumberFormat("en-US", {
            notation: "compact",
            maximumFractionDigits: 1,
          }).format(typeof coins === "string" ? parseInt(coins) : coins)}
          tag={"h4"}
          size={"middle"}
        />
      </div>
    </div>
  );
};
