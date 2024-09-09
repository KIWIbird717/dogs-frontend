"use client";

import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { Navbar } from "@/widgets/Navbar";
import { GuildBanner } from "@/widgets/GuildBanner";
import { Button } from "@/shared/ui/Button/Button";
import { GuildPlayers } from "@/widgets/GuildPlayers";
import Gradient1 from "@/public/images/svg/guild/inner-guild/gradient/gradient1.svg";
import Gradient2 from "@/public/images/svg/guild/inner-guild/gradient/gradient2.svg";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import { ShareAndInvite } from "@/widgets/ShareAndInvite";
import { useGuild } from "@/shared/hooks/useGuild";
import { LoaderIcon } from "react-hot-toast";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";

const MotionDic = dynamic(() => import("framer-motion").then((mod) => mod.motion.div));

interface IGuildPageProps {}

const GuildPage: NextPage<IGuildPageProps> = () => {
  const pathName = usePathname();

  const {
    isLoading,
    guildId,
    isMyGuild,
    guild,
    guildImage,
    handleToggleGuild,
    handleFetchGuildById,
  } = useGuild();

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
      await handleFetchGuildById(guildId);
    })();
  }, [guildId]);

  return (
    <View
      fadeInOnLoad
      className="relative flex h-screen w-full flex-col gap-4 overflow-hidden px-4 pt-6"
    >
      <div className={"z-[10] flex w-full flex-col gap-2"}>
        {isLoading ? (
          <div className="flex h-[176px] w-full items-center justify-center">
            <LoaderIcon style={{ width: 30, height: 30 }} />
          </div>
        ) : (
          <AnimatePresence>
            <MotionDic initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <GuildBanner
                guild={guild!}
                isBanner={false}
                isGuildJoined={isMyGuild}
                guildImage={guildImage}
              />
            </MotionDic>
          </AnimatePresence>
        )}

        <Button
          variant={isMyGuild ? "default" : "deepBlue"}
          className={twMerge(
            "text-[18px] font-bold leading-6",
            isMyGuild && "border border-black-500 px-2 py-4 text-white-800",
            !isMyGuild && "text-white-900",
          )}
          onClick={handleToggleGuild}
        >
          {isMyGuild ? "Leave Guild" : "Join Pack"}
        </Button>
      </div>

      {!isLoading && guild?.members && <GuildPlayers title={"Players"} friends={guild.members} />}

      {isMyGuild && <ShareAndInvite onCopyHandler={onCopyHandler} />}

      <Navbar />

      <Gradient1 className={"absolute left-0 top-0 z-[1]"} />
      <Gradient2 className={"absolute bottom-[75px] right-0 z-[1]"} />
    </View>
  );
};
export default GuildPage;
