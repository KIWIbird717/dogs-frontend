"use client";

import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { Header } from "@/widgets/Header";
import { Navbar } from "@/widgets/Navbar";
import BronzeImage from "@/public/images/ranks/bronze.png";
import SilverImage from "@/public/images/ranks/silver.png";
import GoldImage from "@/public/images/ranks/gold.png";
import DiamondImage from "@/public/images/ranks/diamond.png";
import MasterImage from "@/public/images/ranks/master.png";
import GangsterImage from "@/public/images/ranks/gangster.png";
import BossImage from "@/public/images/ranks/boss.png";
import { IUserPlayer } from "@/widgets/GuildPlayers";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/ui/Carousel";
import Image from "next/image";
import { useState } from "react";
import { CarouselWrapper } from "@/widgets/CarouselWrapper";

interface ILeaderBoardProps {
}

export interface IRank {
  rank: string,
  value: string
  description: string
  image: any,
  users: IUserPlayer[]
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

const LeaderBoard: NextPage<ILeaderBoardProps> = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? ranks.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === ranks.length - 1 ? 0 : prev + 1));
  };


  return (
    <View
      fadeInOnLoad
      className="relative flex h-screen w-full flex-col gap-4 overflow-hidden px-4 pt-6"
    >
      <Header />

      <CarouselWrapper handlePrevious={handlePrevious}
                       handleNext={handleNext}
                       ranks={ranks}
      />

      <Navbar />
    </View>
  );
};
export default LeaderBoard;