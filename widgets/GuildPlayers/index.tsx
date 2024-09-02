"use client";

import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { useRouter } from "next/navigation";
import { GuildPlayerItem } from "@/widgets/GuildPlayers/ui/GuildPlayerItem";
import { twMerge } from "tailwind-merge";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";
import { GameServiceTypes } from "@/shared/lib/services/game/types";
import { StatsApiTypes } from "@/shared/lib/services/stats/types";

interface IGuildPlayersProps {
  title: string;
  classNameList?: string;
  players: StatsApiTypes.LeagueLeadersResponse["leaders"];
}

export interface IUserPlayer {
  id: string;
  avatarUrl: string;
  title: string;
  league: string;
  coins: string | number;
  image?: any;
}

export const GuildPlayers: FC<IGuildPlayersProps> = ({ title, classNameList, players }) => {
  const { push } = useRouter();

  const handleRedirect = (id: string | number) => {
    // push(`/guilds/${id}`)
  };

  return (
    <div className={"z-[10] flex w-full flex-col gap-2"}>
      <Typography tag={"h3"}>{title}</Typography>

      <div className={twMerge("flex w-full flex-col gap-2 pb-28", classNameList)}>
        {players.map((player, index) => {
          return (
            <GuildPlayerItem
              key={index}
              id={index}
              title={player.username}
              league={player.guild || "-"}
              avatarUrl={""}
              coins={player.balance}
              index={index}
              handleRedirect={handleRedirect}
            />
          );
        })}
      </div>
    </div>
  );
};
