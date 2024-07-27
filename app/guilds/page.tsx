"use client"

import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { Header } from "@/widgets/Header";
import { Input } from "@/shared/ui/Input";
import { GuildBanner, IGuild } from "@/widgets/GuildBanner";
import { Button } from "@/shared/ui/Button/Button";
import GuildImage from "@/public/images/guild.png";
import { Leaderboard } from "@/widgets/Leaderboard";
import { Navbar } from "@/widgets/Navbar";

import Gradient1 from "@/public/images/svg/guild/gradient/gradient1.svg"
import Gradient2 from "@/public/images/svg/guild/gradient/gradient2.svg"
import Link from "next/link";
import { useState } from "react";

interface IGuildsProps {
}

const guild: IGuild = {
  icon: GuildImage,
  name: "TOM & JERRY",
  author: "Nick Name Founder",
  members: "50/100",
  totalScore: 923132,
};


const Guilds: NextPage<IGuildsProps> = () => {
  const [isGuildJoined, setIsGuildJoined] = useState(false);
  return (
    <View fadeInOnLoad
          className="flex flex-col gap-4 w-full h-screen relative px-4 pt-6 overflow-hidden"
    >
      <Header />
      <Input isIcon
             placeholder={"Search Guild"}
             className={"z-[10]"}
      />

      {isGuildJoined
        ? <GuildBanner guildInfo={guild} />
        : <div className={"w-full flex gap-2 z-[10]"}>
            <Button variant={"primary"}
                    className={"text-[18px] font-bold leading-6 text-white-900"}
            >
              Join Guild
            </Button>
            <Button variant={"default"}
                    className={"text-[18px] font-bold leading-6 text-white-900"}
            >
              <Link href={"/guilds/create"}>
                Create Guild
              </Link>
            </Button>
        </div>
      }

      <Leaderboard />

      <Navbar />


      <Gradient1 className={"absolute right-0 top-0 z-[1]"} />
      <Gradient2 className={"absolute left-0 bottom-0 z-[1]"} />

    </View>
  );
};
export default Guilds;