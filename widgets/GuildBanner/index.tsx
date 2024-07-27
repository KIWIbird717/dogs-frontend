import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import Image from "next/image";
import { Block } from "@/widgets/GuildBanner/ui/Block";
import { IGuild } from "@/app/guilds/page";
import { formatNumber } from "@/shared/lib/utils/formatNumber";

interface IGuildBannerProps {
  guild: IGuild
}



export const GuildBanner: FC<IGuildBannerProps> = (
  {
    guild
  }
) => {

  const totalScore = formatNumber(guild.totalScore)

  return (
    <div
      className={"w-full flex flex-col gap-2 rounded-xl border border-black-400 bg-black-400 shadow-buttonNoAccent p-4 z-[10]"}>
      <div className={"w-full flex gap-2"}>
        <Image src={guild.icon}
               alt={"guild"}
               className={"w-[80px] h-[80px]"}
        />

        <div className={"w-full flex flex-col justify-center gap-1"}>
          <Typography tag={"h1"}
                      className={"font-normal"}
          >
            {guild.name}
          </Typography>
          <Typography tag={"p"}
                      className={"font-normal text-[18px] leading-6 text-white-900"}
          >
            {guild.author}
          </Typography>
        </div>
      </div>
      <div className={"w-full flex gap-2"}>
        <Block value={totalScore} title={"Total score"} />
        <Block value={guild.members} title={"Members"} />
      </div>
    </div>
  );
};