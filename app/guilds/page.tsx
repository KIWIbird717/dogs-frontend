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
import { AnimatePresence } from "framer-motion";
import { Gradient } from "@/shared/ui/Gradient";

interface IGuildsProps {}

const Guilds: NextPage<IGuildsProps> = () => {
  const logger = new Logger("GuildsPage");

  const {
    guild,
    isLoading,
    myGuildId,
    inputValue,
    FoundOrFetchedGuilds: guilds,
    guildImage,

    setGuilds,
    setFoundGuilds,
    handleRandomJoinGuild,
    onChangeValueDebounce,
    handleFetchGuildById,
  } = useGuild();

  useEffect(() => {
    (async () => {
      const { data } = await GuildsService.getGuilds(0, 50);
      setGuilds(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await handleFetchGuildById(myGuildId!);
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

  return (
    <>
      <View
        fadeInOnLoad
        className="relative flex h-screen w-full flex-col gap-4 overflow-x-hidden px-4 pt-6"
      >
        <Header />
        <Search value={inputValue || ""} onChange={onChangeValueDebounce} />

        <AnimatePresence>
          {guild && !isLoading ? (
            <GuildBanner guild={guild} guildImage={guildImage} />
          ) : (
            <div className={"z-[10] flex w-full gap-2"}>
              <Button
                onClick={handleRandomJoinGuild}
                variant={"primary"}
                className={"text-[18px] font-bold leading-6 text-white-900"}
              >
                Join Guild
              </Button>
              <Button
                variant={"default"}
                className={"text-[18px] font-bold leading-6 text-white-900"}
              >
                <Link href={"/guilds/create"} prefetch>
                  Create Guild
                </Link>
              </Button>
            </div>
          )}
        </AnimatePresence>

        <Leaderboard guilds={guilds} />

        <Navbar />
      </View>

      <Gradient.First className="absolute bottom-[-40%] right-[-50%]" />
      <Gradient.Second className="absolute right-[-10%] top-[-20%] scale-150" />
    </>
  );
};
export default Guilds;
