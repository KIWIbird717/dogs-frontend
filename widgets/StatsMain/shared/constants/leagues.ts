import { GameServiceTypes } from "@/shared/lib/services/game/types";

import RookieImage from "@/public/images/ranks/rookie.png";
import BronzeImage from "@/public/images/ranks/bronze.png";
import SilverImage from "@/public/images/ranks/silver.png";
import GoldImage from "@/public/images/ranks/gold.png";
import PlatinumImage from "@/public/images/ranks/platinum.png";
import DiamondImage from "@/public/images/ranks/diamond.png";
import MasterImage from "@/public/images/ranks/master.png";
import GangsterImage from "@/public/images/ranks/gangster.png";
import BossImage from "@/public/images/ranks/boss.png";
import CreatorImage from "@/public/images/ranks/creator.png";

export interface ILeague {
  level: GameServiceTypes.Levels;
  rank: string;
  image: any;
}

export const leagues: ILeague[] = [
  {
    level: 1,
    rank: "rookie",
    image: RookieImage,
  },
  {
    level: 2,
    rank: "bronze",
    image: BronzeImage,
  },
  {
    level: 3,
    rank: "silver",
    image: SilverImage,
  },
  {
    level: 4,
    rank: "gold",
    image: GoldImage,
  },
  {
    level: 5,
    rank: "platinum",
    image: PlatinumImage,
  },
  {
    level: 6,
    rank: "diamond",
    image: DiamondImage,
  },
  {
    level: 7,
    rank: "master",
    image: MasterImage,
  },
  {
    level: 8,
    rank: "gangster",
    image: GangsterImage,
  },
  {
    level: 9,
    rank: "boss",
    image: BossImage,
  },
  {
    level: 10,
    rank: "creator",
    image: CreatorImage,
  },
];
