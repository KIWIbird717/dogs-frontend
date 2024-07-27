"use client";

import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { Navbar } from "@/widgets/Navbar";
import { GuildBanner, IGuild } from "@/widgets/GuildBanner";
import GuildImage from "@/public/images/guild.png";
import { Button } from "@/shared/ui/Button/Button";
import LinkIcon from "@/public/images/svg/guild/inner-guild/link.svg";
import { GuildPlayers } from "@/widgets/GuildPlayers";
import Gradient1 from "@/public/images/svg/guild/inner-guild/gradient/gradient1.svg";
import Gradient2 from "@/public/images/svg/guild/inner-guild/gradient/gradient2.svg";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

interface IGuildPageProps {
}

const guild: IGuild = {
  icon: GuildImage,
  name: "Tom & Jerry",
  author: "Nick Name Founder",
  members: "50/100",
  totalScore: 300000,
  link: "/guild/1"
};

const GuildPage: NextPage<IGuildPageProps> = () => {
  const {push} = useRouter()
  const [isGuildJoined, setIsGuildJoined] = useState(false);

  const handleToggleGuild = () => {
    if (isGuildJoined) {
      setIsGuildJoined(false);
      push("/guilds")
    } else {
      setIsGuildJoined(true);
    }
  };

  const onCopyHandler =  () => {
    navigator.clipboard.writeText(guild.link as string);
  };

  const onShareHandler =  () => {
    navigator.share({text: guild.link as string});
  };

  return (
    <View fadeInOnLoad
          className="flex flex-col gap-4 w-full h-screen relative px-4 pt-6 overflow-hidden"
    >
      <div className={"w-full flex flex-col gap-2 z-[10]"}>
        <GuildBanner guildInfo={guild} isBanner={false} isGuildJoined={isGuildJoined} />

        <Button variant={isGuildJoined ? "default" : "deepBlue"}
                className={twMerge("text-[18px] font-bold leading-6",
                  isGuildJoined && "border-black-500 border px-2 py-4 text-white-800 ",
                  !isGuildJoined && "text-white-900",
                )}
                onClick={handleToggleGuild}
        >
          {isGuildJoined ? "Leave Guild" : "Join Pack"}
        </Button>
      </div>

      <GuildPlayers />

      {isGuildJoined && <div className={"absolute left-4 bottom-[116px] w-[calc(100%-32px)] flex gap-2 z-[10]"}>
        <Button variant={"deepBlue"}
                className={"text-[18px] font-bold leading-6 text-white-900"}
                onClick={onShareHandler}
        >
          Invite Friend
        </Button>
        <Button variant={"deepBlue"}
                className={"w-fit p-4"}
                onClick={onCopyHandler}
        >
          <LinkIcon />
        </Button>
      </div>}


      <Navbar />


      <Gradient1 className={"absolute left-0 top-0 z-[1]"} />
      <Gradient2 className={"absolute right-0 bottom-[75px] z-[1]"} />
    </View>
  );
};
export default GuildPage;