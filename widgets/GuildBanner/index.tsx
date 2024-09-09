"use client";

import { FC, useEffect, useState } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { Block } from "@/widgets/GuildBanner/ui/Block";
import { formatNumber } from "@/shared/lib/utils/formatNumber";
import { twMerge } from "tailwind-merge";
import SettingsIcon from "@/public/images/svg/settings.svg";
import { Button } from "@/shared/ui/Button/Button";
import { useRouter } from "next/navigation";
import { GuildResponseWithMembersType } from "@/shared/lib/services/guilds/guilds";
import GuildImagePlaceholder from "@/public/images/guild.png";
import dynamic from "next/dynamic";

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div));

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

  const redirectHandler = () => {
    if (isBanner) {
      push(`/guilds/${guild._id}`);
    }
  };

  const [isImageLoadingError, setIsImageLoadingError] = useState(false);

  const members = guild?.membersCount || guild?.members.length;

  return (
    <MotionDiv
      initial={{ scale: isBanner ? 0 : 1 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className={twMerge(
        "z-[10] flex w-full flex-col rounded-xl",
        isBanner &&
          "shadow-fix gap-2 border border-black-400 bg-black-400 p-4 shadow-buttonNoAccent",
        !isBanner && "gap-4",
      )}
      onClick={redirectHandler}
    >
      <div className={"flex w-full items-center gap-2"}>
        <div className={"flex w-full gap-2"}>
          <img
            src={
              isImageLoadingError
                ? GuildImagePlaceholder.src
                : guild?.image || "https://no-photo.huh"
            }
            alt={"guild"}
            width={isBanner ? 80 : 56}
            height={isBanner ? 80 : 56}
            className={twMerge(
              isBanner
                ? "h-[80px] w-[80px] rounded-[20px] border-[2px] border-white"
                : "h-[56px] w-[56px] rounded-[10px] border-[2px] border-white",
            )}
            onError={() => setIsImageLoadingError(true)}
          />

          <div className={"flex w-full flex-col justify-center gap-1"}>
            <Typography
              tag={isBanner ? "h1" : "h2"}
              className={twMerge(
                "text-white",
                isBanner
                  ? "font-normal uppercase"
                  : "w-[200px] max-w-[200px] overflow-hidden text-ellipsis font-bold",
              )}
            >
              {guild?.name}
            </Typography>
            <Typography tag={"p"} className={"text-[18px] font-normal leading-6 text-white-900"}>
              {"Author"}
            </Typography>
          </div>
        </div>

        {!isBanner && isGuildJoined && (
          <Button
            className={
              "shadow-fix h-[48px] w-[48px] border border-black-400 bg-black-400 p-3 shadow-buttonNoAccent"
            }
          >
            <SettingsIcon />
          </Button>
        )}
      </div>
      <div className={"flex w-full gap-2"}>
        <Block
          value={Intl.NumberFormat("en-US", {
            notation: "compact",
            maximumFractionDigits: 1,
          }).format(guild?.guildBalacne || 0)}
          title={"Guild balance"}
          isBanner={isBanner}
        />
        <Block value={members} title={"Members"} isBanner={isBanner} />
      </div>
    </MotionDiv>
  );
};
