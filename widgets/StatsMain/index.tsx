"use client";
"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { CarouselWrapper } from "@/widgets/CarouselWrapper";
import { GuildPlayers } from "@/widgets/GuildPlayers";
import BronzeImage from "@/public/images/ranks/bronze.png";
import SilverImage from "@/public/images/ranks/silver.png";
import GoldImage from "@/public/images/ranks/gold.png";
import DiamondImage from "@/public/images/ranks/diamond.png";
import MasterImage from "@/public/images/ranks/master.png";
import GangsterImage from "@/public/images/ranks/gangster.png";
import BossImage from "@/public/images/ranks/boss.png";
import { IRank } from "@/app/stats/page";
import { GuildPlayerItem } from "@/widgets/GuildPlayers/ui/GuildPlayerItem";
import { useUser } from "@/shared/hooks/useUser";
import { Button } from "@/shared/ui/Button/Button";
import { GuildPlayerItem } from "@/widgets/GuildPlayers/ui/GuildPlayerItem";
import { useUser } from "@/shared/hooks/useUser";
import { Button } from "@/shared/ui/Button/Button";
import { StatsService } from "@/shared/lib/services/stats/stats";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";
import { Progress } from "@/widgets/StatsMain/entities/Progress";

interface IStatsMainProps {}

export interface IRank {
  rank: string;
  image: any;
}

const ranks: IRank[] = [
  {
    rank: "bronze",
    image: BronzeImage,
    users: [
      {
        id: "1",
        avatarUrl: "",
        title: "Name Bronse",
        league: "Alligator",
        coins: "2,64",
      },
      {
        id: "2",
        avatarUrl: "",
        title: "Name",
        league: "Alligator",
        coins: "2,64",
      },
      {
        id: "1",
        avatarUrl: "",
        title: "Name Bronse",
        league: "Alligator",
        coins: "2,64",
      },
      {
        id: "2",
        avatarUrl: "",
        title: "Name",
        league: "Alligator",
        coins: "2,64",
      },
      {
        id: "1",
        avatarUrl: "",
        title: "Name Bronse",
        league: "Alligator",
        coins: "2,64",
      },
      {
        id: "2",
        avatarUrl: "",
        title: "Name",
        league: "Alligator",
        coins: "2,64",
      },
      {
        id: "2",
        avatarUrl: "",
        title: "Name",
        league: "Alligator",
        coins: "2,64",
      },
      {
        id: "1",
        avatarUrl: "",
        title: "Name Bronse",
        league: "Alligator",
        coins: "2,64",
      },
      {
        id: "2",
        avatarUrl: "",
        title: "Name",
        league: "Alligator",
        coins: "2,64",
      },
      {
        id: "1",
        avatarUrl: "",
        title: "Name Bronse",
        league: "Alligator",
        coins: "2,64",
      },
      {
        id: "2",
        avatarUrl: "",
        title: "Name",
        league: "Alligator",
        coins: "2,64",
      },
      {
        id: "1",
        avatarUrl: "",
        title: "Name Bronse",
        league: "Alligator",
        coins: "2,64",
      },
      {
        id: "2",
        avatarUrl: "",
        title: "Name",
        league: "Alligator",
        coins: "2,64",
      },
      {
        id: "2",
        avatarUrl: "",
        title: "Name",
        league: "Alligator",
        coins: "2,64",
      },
      {
        id: "1",
        avatarUrl: "",
        title: "Name Bronse",
        league: "Alligator",
        coins: "2,64",
      },
      {
        id: "2",
        avatarUrl: "",
        title: "Name",
        league: "Alligator",
        coins: "2,64",
      },
      {
        id: "1",
        avatarUrl: "",
        title: "Name Bronse",
        league: "Alligator",
        coins: "2,64",
      },
      {
        id: "2",
        avatarUrl: "",
        title: "Name",
        league: "Alligator",
        coins: "2,64",
      },
      {
        id: "1",
        avatarUrl: "",
        title: "Name Bronse",
        league: "Alligator",
        coins: "2,64",
      },
      {
        id: "2",
        avatarUrl: "",
        title: "Name",
        league: "Alligator",
        coins: "2,64",
      },
      {
        id: "2",
        avatarUrl: "",
        title: "Name",
        league: "Alligator",
        coins: "2,64",
      },
      {
        id: "1",
        avatarUrl: "",
        title: "Name Bronse",
        league: "Alligator",
        coins: "2,64",
      },
      {
        id: "2",
        avatarUrl: "",
        title: "Name",
        league: "Alligator",
        coins: "2,64",
      },
    ],
  },
  {
    rank: "silver",
    image: SilverImage,
  },
  {
    rank: "gold",
    image: GoldImage,
  },
  {
    rank: "diamond",
    image: DiamondImage,
  },
  {
    rank: "master",
    image: MasterImage,
  },
  {
    rank: "gangster",
    image: GangsterImage,
  },
  {
    rank: "boss",
    image: BossImage,
  },
];

export const StatsMain: FC<IStatsMainProps> = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [usersByLevel, setUsersByLevel] = useState<UserSlice.IUserSlice[]>([]);

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? ranks.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === ranks.length - 1 ? 0 : prev + 1));
  };

  const { user } = useUser();
  const { _id, first_name, guild, balance } = user;

  const { user } = useUser();
  const { _id, first_name, guild, balance } = user;

  return (
    <div className={"z-[10] flex w-full flex-col gap-4 overflow-hidden"}>
      <div className={"flex flex-col gap-2 pb-2"}>
        <CarouselWrapper handlePrevious={handlePrevious} handleNext={handleNext} ranks={ranks} />
        <Progress currentRank={currentRank} serialNumber={currentUser?.serialNumber || 0} />
      </div>

      <GuildPlayers
        title={"Leaderboard Legue"}
        players={usersByLevel}
        classNameList={"pb-[190px]"}
      />

      {currentUser && (
        <Button
          className={
            "fixed bottom-[55px] left-0 z-[11] flex h-[112px] w-full items-start rounded-xl border-t border-t-black-300 bg-black-400 shadow-buttonNoAccent backdrop-blur-[16px]"
          }
        >
          <GuildPlayerItem
            id={currentUser._id}
            title={currentUser.first_name}
            league={currentUser ? guildName! : ""}
            avatarUrl={""}
            coins={currentUser.balance}
            index={0}
            className={"border-none shadow-none"}
          />
        </Button>
      )}
    </div>
  );
};
