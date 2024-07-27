"use client"

import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { GuildItem } from "@/widgets/Leaderboard/ui/GuildItem";
import { useRouter } from "next/navigation";

interface ILeaderboardProps {
}

const guildItem = {
  id: "1",
  avatarUrl: "",
  title: "coin up",
  description: "By invitation only",
  members: "44/50",
  coins: "2,64",
};

export const Leaderboard: FC<ILeaderboardProps> = () => {
  const {push} = useRouter()

  const handleRedirect = (id: string) => {
    push(`/guilds/${id}`)
  }

  return (
    <div className={"w-full flex flex-col gap-2 overflow-y-auto z-[10]"}>
      <Typography tag={"h3"}
      >
        Leaderboard
      </Typography>

      <div className={"w-full flex flex-col gap-2 overflow-y-auto pb-28"}>
        {Array.from(Array(20)).map((_, index) => {
          return <GuildItem key={index}
                            id={guildItem.id}
                            title={guildItem.title}
                            description={guildItem.description}
                            avatarUrl={guildItem.avatarUrl}
                            members={guildItem.members}
                            coins={guildItem.coins}
                            index={index}
                            handleRedirect={handleRedirect}
          />
        })
        }
      </div>
    </div>
  );
};