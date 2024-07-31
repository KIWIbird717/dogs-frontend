"use client";

import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { Navbar } from "@/widgets/Navbar";
import { GuildBanner, IGuild } from "@/widgets/GuildBanner";
import GuildImage from "@/public/images/guild.png";
import { Button } from "@/shared/ui/Button/Button";
import { GuildPlayers, IUserPlayer } from "@/widgets/GuildPlayers";
import Gradient1 from "@/public/images/svg/guild/inner-guild/gradient/gradient1.svg";
import Gradient2 from "@/public/images/svg/guild/inner-guild/gradient/gradient2.svg";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ShareAndInvite } from "@/widgets/ShareAndInvite";
import { GuildsService, IGuildResponse } from "@/shared/lib/services/guilds/guilds";
import { Logger } from "@/shared/lib/utils/logger/Logger";

interface IGuildPageProps {
}

const players: IUserPlayer[] = [
  {
    id: "1",
    avatarUrl: "",
    title: "Name",
    league: "Gold",
    coins: "2,64",
  },
  {
    id: "2",
    avatarUrl: "",
    title: "Name",
    league: "Alligator",
    coins: "2,64",
  },
];

const players: IUserPlayer[] = [
  {
    id: "1",
    avatarUrl: "",
    title: "Name",
    league: "Gold",
    coins: "2,64",
  },
  {
    id: "2",
    avatarUrl: "",
    title: "Name",
    league: "Alligator",
    coins: "2,64",
  },
];

const GuildPage: NextPage<IGuildPageProps> = () => {
  const logger = new Logger("GuildPage");

  const guildId = useParams() as { id: string };
  const pathName = usePathname();
  const [guild, setGuild] = useState<IGuildResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { push } = useRouter();
  const [isGuildJoined, setIsGuildJoined] = useState(false);

  const handleToggleGuild = () => {
    if (isGuildJoined) {
      setIsGuildJoined(false);
      push("/guilds");
    } else {
      setIsGuildJoined(true);
    }
  };

  const onCopyHandler = () => {
    if (guild) {
      navigator.clipboard.writeText(pathName as string);
    }

  };

  const onShareHandler = () => {
    if (guild) {
      navigator.share({ text: pathName as string });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await GuildsService.getGuild(guildId.id);
        setGuild(data);
      } catch (error) {
        logger.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  return (
    <View
      fadeInOnLoad
      className="relative flex h-screen w-full flex-col gap-4 overflow-hidden px-4 pt-6"
    >
      <div className={"z-[10] flex w-full flex-col gap-2"}>
        {isLoading
          ? "Загрузка"
          : <GuildBanner guildInfo={guild!} isBanner={false} isGuildJoined={isGuildJoined} />
        }

        <Button
          variant={isGuildJoined ? "default" : "deepBlue"}
          className={twMerge(
            "text-[18px] font-bold leading-6",
            isGuildJoined && "border border-black-500 px-2 py-4 text-white-800",
            !isGuildJoined && "text-white-900",
          )}
          onClick={handleToggleGuild}
        >
          {isGuildJoined ? "Leave Guild" : "Join Pack"}
        </Button>
      </div>

      <GuildPlayers title={"Players"}
                    players={players}
      />

      {isGuildJoined && (
        <ShareAndInvite onShareHandler={onShareHandler} onCopyHandler={onCopyHandler} />
      )}

      <Navbar />

      <Gradient1 className={"absolute left-0 top-0 z-[1]"} />
      <Gradient2 className={"absolute bottom-[75px] right-0 z-[1]"} />
    </View>
  );
};
export default GuildPage;
