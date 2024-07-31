"use client";

import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { useRouter } from "next/navigation";
import { GuildPlayerItem } from "@/widgets/GuildPlayers/ui/GuildPlayerItem";
import { twMerge } from "tailwind-merge";

interface IGuildPlayersProps {
  title: string;
  classNameList?: string;
  players: IUserPlayer[]
}

export interface IUserPlayer {
  id: string
  avatarUrl: string
  title: string
  league: string
  coins: string | number
  image?: any
}

export const GuildPlayers: FC<IGuildPlayersProps> = (
  {
    title,
    classNameList,
    players
  }
  ) => {
  const { push } = useRouter();

  const handleRedirect = (id: string) => {
    // push(`/guilds/${id}`)
  };

  return (
    <div className={"z-[10] flex w-full flex-col gap-2 overflow-y-auto"}>
      <Typography tag={"h3"}>{title}</Typography>

      <div className={twMerge("flex w-full flex-col gap-2 overflow-y-auto pb-28", classNameList)}>
        {players.map((player, index) => {
          return (
            <GuildPlayerItem
              key={index}
              id={player.id}
              title={player.title}
              league={player.league}
              avatarUrl={player.avatarUrl}
              coins={player.coins}
              index={index}
              handleRedirect={handleRedirect}
            />
          );
        })}
      </div>
    </div>
  );
};
