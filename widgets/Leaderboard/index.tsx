"use client";

import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { GuildItem } from "@/widgets/Leaderboard/ui/GuildItem";
import { useRouter } from "next/navigation";
import { IGuildResponse } from "@/shared/lib/services/guilds/guilds";

interface ILeaderboardProps {
  guilds: IGuildResponse[];
}

export const Leaderboard: FC<ILeaderboardProps> = ({ guilds }) => {
  const { push } = useRouter();

  const handleRedirect = (id: string) => {
    push(`/guilds/${id}`);
  };

  return (
    <div className={"z-[10] flex w-full flex-col gap-2 overflow-y-auto"}>
      <Typography tag={"h3"}>Leaderboard</Typography>

      <div className={"flex w-full flex-col gap-2 overflow-y-auto pb-28"}>
        {guilds.map((guild, index) => {
          return (
            <GuildItem
              key={index}
              id={guild._id}
              title={guild.name}
              joinMethod={guild.joinMethod}
              avatarUrl={""}
              members={guild.members}
              coins={guild.guildBalance || 0}
              index={index}
              handleRedirect={handleRedirect}
            />
          );
        })}
      </div>
    </div>
  );
};
