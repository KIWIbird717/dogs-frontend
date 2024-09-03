import BronzeImage from "@/public/images/ranks/bronze.png";
import SilverImage from "@/public/images/ranks/silver.png";
import GoldImage from "@/public/images/ranks/gold.png";
import DiamondImage from "@/public/images/ranks/diamond.png";
import MasterImage from "@/public/images/ranks/master.png";
import GangsterImage from "@/public/images/ranks/gangster.png";
import BossImage from "@/public/images/ranks/boss.png";

export interface ILeague {
  rank: string;
  image: any;
}

export const leagues: ILeague[] = [
  {
    rank: "bronze",
    image: BronzeImage,
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
