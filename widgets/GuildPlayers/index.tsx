"use client";

import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { useRouter } from "next/navigation";
import { GuildPlayerItem } from "@/widgets/GuildPlayers/ui/GuildPlayerItem";
import { twMerge } from "tailwind-merge";

interface IGuildPlayersProps {
  title: string
  classNameList?: string
}

const players = {
  id: "1",
  avatarUrl: "",
  title: "Name",
  league: "Gold",
  coins: "2,64",
};

export const GuildPlayers: FC<IGuildPlayersProps> = (
  {
    title,
    classNameList
  }
) => {
  const { push } = useRouter();

  const handleRedirect = (id: string) => {
    // push(`/guilds/${id}`)
  };

  return (
    <div className={"w-full flex flex-col gap-2 overflow-y-auto z-[10]"}>
      <Typography tag={"h3"}
      >
        {title}
      </Typography>

      <div className={twMerge(
        "w-full flex flex-col gap-2 overflow-y-auto pb-28",
        classNameList
      )
      }>
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