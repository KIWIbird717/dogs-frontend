"use client";

import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { useRouter } from "next/navigation";
import { GuildPlayerItem } from "@/widgets/GuildPlayers/ui/GuildPlayerItem";
import { twMerge } from "tailwind-merge";
import { StatsApiTypes } from "@/shared/lib/services/stats/types";
import { UserApiTypes } from "@/shared/lib/services/users/types";

interface IGuildPlayersProps {
  title: string;
  classNameList?: string;
  friends?: UserApiTypes.MyFriendsResponse[]
  leaders?: StatsApiTypes.LeagueLeadersResponse["leaders"];
}

export const GuildPlayers: FC<IGuildPlayersProps> = (
  {
    title,
    classNameList,
    friends,
    leaders
  }
) => {
  const { push } = useRouter();

  const handleRedirect = (id: string | number) => {
    // push(`/guilds/${id}`)
  };

  const items = friends ? friends : leaders


  return (
    <div className={"z-[10] flex w-full flex-col gap-2"}>
      <Typography tag={"h3"}>{title}</Typography>

      <div className={twMerge("flex w-full flex-col gap-2 pb-28", classNameList)}>
        {items?.length !== 0
          ? items?.map((player, index) => {
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
          })
          : <div className={"w-full h-[100px] flex items-center justify-center"}>
            <Typography className={twMerge("text-[20px] text-center font-bold leading-6 text-white-900")}
                        tag={"p"}
            >
              {friends ? "There are no friends" : "There are no leaderboards"}
            </Typography>
          </div>
        }
      </div>
    </div>
  );
};
