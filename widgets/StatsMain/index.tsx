"use client";

import { FC, useState } from "react";
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

interface IStatsMainProps {
}

const ranks: IRank[] = [
  {
    rank: "bronze",
    value: "#1023 Bronze",
    description: "333,54m/1B",
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
      }, {
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
      }, {
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
      }, {
        id: "2",
        avatarUrl: "",
        title: "Name",
        league: "Alligator",
        coins: "2,64",
      }, {
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
    value: "#1023 Silver",
    description: "333,54m/1B",
    image: SilverImage,
    users: [
      {
        id: "1",
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
    ],
  },
  {
    rank: "gold",
    value: "#1023 Gold",
    description: "333,54m/1B",
    image: GoldImage,
    users: [
      {
        id: "1",
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
    ],
  }, {
    rank: "diamond",
    value: "#1023 diamond",
    description: "333,54m/1B",
    image: DiamondImage,
    users: [
      {
        id: "1",
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
    ],
  }, {
    rank: "master",
    value: "#1023 master",
    description: "333,54m/1B",
    image: MasterImage,
    users: [
      {
        id: "1",
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
    ],
  }, {
    rank: "gangster",
    value: "#1023 gangster",
    description: "333,54m/1B",
    image: GangsterImage,
    users: [
      {
        id: "1",
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
    ],
  }, {
    rank: "boss",
    value: "#1023 boss",
    description: "333,54m/1B",
    image: BossImage,
    users: [
      {
        id: "1",
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
    ],
  },
];


export const StatsMain: FC<IStatsMainProps> = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? ranks.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === ranks.length - 1 ? 0 : prev + 1));
  };

  const { user } = useUser();
  const { _id, first_name, guild, balance } = user;

  return (
    <div className={"w-full flex flex-col gap-4 z-[10] overflow-hidden"}>
      <CarouselWrapper handlePrevious={handlePrevious}
                       handleNext={handleNext}
                       ranks={ranks}
      />

      <GuildPlayers title={"Leaderboard Legue"}
                    players={ranks[currentSlide].users}
                    classNameList={"pb-[190px]"}
      />

      <Button
        className={"fixed bottom-[55px] flex items-start left-0 w-full h-[112px] backdrop-blur-[16px] shadow-buttonNoAccent bg-black-400 border-t border-t-black-300 rounded-xl z-[11]"}
      >
        <GuildPlayerItem
          id={_id}
          title={first_name}
          league={guild!}
          avatarUrl={""}
          coins={balance}
          index={0}
          className={"border-none shadow-none "}
        />
      </Button>


    </div>
  );
};