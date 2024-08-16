"use client";

import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { Navbar } from "@/widgets/Navbar";
import { GuildBanner } from "@/widgets/GuildBanner";
import { GuildBanner } from "@/widgets/GuildBanner";
import { Button } from "@/shared/ui/Button/Button";
import { GuildPlayers } from "@/widgets/GuildPlayers";
import Gradient1 from "@/public/images/svg/guild/inner-guild/gradient/gradient1.svg";
import Gradient2 from "@/public/images/svg/guild/inner-guild/gradient/gradient2.svg";
import { useEffect } from "react";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import { usePathname } from "next/navigation";
import { ShareAndInvite } from "@/widgets/ShareAndInvite";
import { GuildsService } from "@/shared/lib/services/guilds/guilds";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import { useGuild } from "@/shared/hooks/useGuild";

interface IGuildPageProps {}

const players:IUserPlayer = {
  id: "1",
  avatarUrl: "",
  title: "Name",
  league: "Gold",
  coins: "2,64",
};

const GuildPage: NextPage<IGuildPageProps> = () => {
  const logger = new Logger("GuildPage");
  const pathName = usePathname();

  const {
    isLoading,
    guildId,
    isMyGuild,
    guild,
    setIsLoading,
    setGuild,
    handleToggleGuild,
  } = useGuild()


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
        const { data } = await GuildsService.getGuild(guildId);
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
          : <GuildBanner guildInfo={guild!} isBanner={false} isGuildJoined={isMyGuild} />
        }

        <Button
          variant={isMyGuild ? "default" : "deepBlue"}
          variant={isMyGuild ? "default" : "deepBlue"}
          className={twMerge(
            "text-[18px] font-bold leading-6",
            isMyGuild && "border border-black-500 px-2 py-4 text-white-800",
            !isMyGuild && "text-white-900",
            isMyGuild && "border border-black-500 px-2 py-4 text-white-800",
            !isMyGuild && "text-white-900",
          )}
          onClick={handleToggleGuild}
        >
          {isMyGuild ? "Leave Guild" : "Join Pack"}
          {isMyGuild ? "Leave Guild" : "Join Pack"}
        </Button>
      </div>

      {!isLoading && guild?.members && <GuildPlayers title={"Players"} players={guild.members} />}

      {isMyGuild && (
      {isMyGuild && (
        <ShareAndInvite onShareHandler={onShareHandler} onCopyHandler={onCopyHandler} />
      )}

      <Navbar />

      <Gradient1 className={"absolute left-0 top-0 z-[1]"} />
      <Gradient2 className={"absolute bottom-[75px] right-0 z-[1]"} />
    </View>
  );
};
export default GuildPage;
