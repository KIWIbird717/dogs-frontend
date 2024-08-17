"use client";

import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { Header } from "@/widgets/Header";
import { GuildBanner } from "@/widgets/GuildBanner";
import { Button } from "@/shared/ui/Button/Button";
import { Leaderboard } from "@/widgets/Leaderboard";
import { Navbar } from "@/widgets/Navbar";

import Gradient1 from "@/public/images/svg/guild/gradient/gradient1.svg";
import Gradient2 from "@/public/images/svg/guild/gradient/gradient2.svg";
import Link from "next/link";
import { useGuild } from "@/shared/hooks/useGuild";
import { useEffect } from "react";
import { GuildsService } from "@/shared/lib/services/guilds/guilds";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import { Search } from "@/widgets/Search";

interface IGuildsProps {}

const Guilds: NextPage<IGuildsProps> = () => {
  const logger = new Logger("GuildsPage");

  const {
    guild,
    isLoading,
    myGuildId,
    inputValue,
    FoundOrFetchedGuilds: guilds,

    setIsLoading,
    setGuild,
    setGuilds,
    setFoundGuilds,
    handleRandomJoinGuild,
    onChangeValueDebounce,
  } = useGuild();

  useEffect(() => {
    (async () => {
      const { data } = await GuildsService.getGuilds(0, 50);
      setGuilds(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await GuildsService.getGuild(myGuildId!);
        setGuild(data);
      } catch (error) {
        logger.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [myGuildId]);

  useEffect(() => {
    if (inputValue) {
      (async () => {
        try {
          const { data } = await GuildsService.searchGuild({
            name: inputValue,
            start: 0,
            pagination: 50,
          });
          setFoundGuilds(data);
        } catch (error) {
          logger.error(error);
          setFoundGuilds([]);
        }
      })();
    }
  }, [inputValue]);

  console.log({ guilds });

  return (
    <View
      fadeInOnLoad
      className="relative flex h-screen w-full flex-col gap-4 overflow-hidden px-4 pt-6"
    >
      <Header />
      <Search value={inputValue || ""} onChange={onChangeValueDebounce} />

      {guild && !isLoading ? (
        <GuildBanner guildInfo={guild!} />
      ) : (
        <div className={"z-[10] flex w-full gap-2"}>
          <Button
            onClick={handleRandomJoinGuild}
            variant={"primary"}
            className={"text-[18px] font-bold leading-6 text-white-900"}
          >
            Join Guild
          </Button>
          <Button variant={"default"} className={"text-[18px] font-bold leading-6 text-white-900"}>
            <Link href={"/guilds/create"}>Create Guild</Link>
          </Button>
        </div>
      )}

      <Leaderboard guilds={guilds} />

      <Navbar />

      <Gradient1 className={"absolute right-0 top-0 z-[1]"} />
      <Gradient2 className={"absolute bottom-0 left-0 z-[1]"} />
    </View>
  );
};
export default Guilds;
