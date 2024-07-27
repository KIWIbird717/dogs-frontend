"use client";

import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { GuildItem } from "@/widgets/Leaderboard/ui/GuildItem";
import { useRouter } from "next/navigation";
import { GuildPlayerItem } from "@/widgets/GuildPlayers/ui/GuildPlayerItem";

interface IGuildPlayersProps {
}

const players = {
  id: "1",
  avatarUrl: "",
  title: "Name",
  league: "Gold",
  coins: "2,64",
};

export const GuildPlayers: FC<IGuildPlayersProps> = () => {
  const { push } = useRouter();

  const handleRedirect = (id: string) => {
    // push(`/guilds/${id}`)
  };

  return (
    <div className={"w-full flex flex-col gap-2 overflow-y-auto z-[10]"}>
      <Typography tag={"h3"}
      >
        Players
      </Typography>

      <div className={"w-full flex flex-col gap-2 overflow-y-auto pb-28"}>
        {Array.from(Array(20)).map((_, index) => {
          return <GuildPlayerItem key={index}
                                  id={players.id}
                                  title={players.title}
                                  league={players.league}
                                  avatarUrl={players.avatarUrl}
                                  coins={players.coins}
                                  index={index}
                                  handleRedirect={handleRedirect}
          />;
        })
        }

      </div>
    </div>
  );
};