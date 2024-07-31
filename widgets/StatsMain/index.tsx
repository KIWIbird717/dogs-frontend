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

  return (
    <div className={"z-[10] flex w-full flex-col gap-4"}>
      <CarouselWrapper handlePrevious={handlePrevious} handleNext={handleNext} ranks={ranks} />

      <GuildPlayers title={"Leaderboard Legue"} players={ranks[currentSlide].users} />
    </div>
  );
};
