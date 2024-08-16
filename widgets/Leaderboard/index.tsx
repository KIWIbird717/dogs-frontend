"use client";

import { FC, useEffect, useState } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { GuildItem } from "@/widgets/Leaderboard/ui/GuildItem";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { UsersService } from "@/shared/lib/services/users/users";
import { GuildsService, IGuildResponse } from "@/shared/lib/services/guilds/guilds";

interface ILeaderboardProps {}

const guildItem = {
  id: "1",
  avatarUrl: "",
  title: "coin up",
  description: "By invitation only",
  members: "44/50",
  coins: "2,64",
};

export const Leaderboard: FC<ILeaderboardProps> = () => {
  const { push } = useRouter();

  const handleRedirect = (id: string) => {
    push(`/guilds/${id}`);
  };

  const [guilds, setGuilds] = useState<IGuildResponse[]>([])

  useEffect(() => {
    (async () => {
      const {data} = await GuildsService.getGuilds(0, 50)
      setGuilds(data)
    })()
  }, []);

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
              avatarUrl={guildItem.avatarUrl}
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
