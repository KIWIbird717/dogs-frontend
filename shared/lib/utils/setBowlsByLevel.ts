import Level1 from "@/public/images/bowls/level1.png"
import Level2 from "@/public/images/bowls/level2.png"
import Level3 from "@/public/images/bowls/level3.png"
import Level4 from "@/public/images/bowls/level4.png"
import Level5 from "@/public/images/bowls/level5.png"
import Level6 from "@/public/images/bowls/level6.png"
import Level7 from "@/public/images/bowls/level7.png"
import Level8 from "@/public/images/bowls/level8.png"
import Level9 from "@/public/images/bowls/level9.png"
import Level10 from "@/public/images/bowls/level10.png"
import Level11 from "@/public/images/bowls/level11.png"
import Level12 from "@/public/images/bowls/level12.png"
import Level13 from "@/public/images/bowls/level13.png"
import Level14 from "@/public/images/bowls/level14.png"
import Level15 from "@/public/images/bowls/level15.png"
import Level16 from "@/public/images/bowls/level16.png"
import Level17 from "@/public/images/bowls/level17.png"
import Level18 from "@/public/images/bowls/level18.png"
import Level19 from "@/public/images/bowls/level19.png"
import Level20 from "@/public/images/bowls/level20.png"

const levelImages = [
  Level1,
  Level2,
  Level3,
  Level4,
  Level5,
  Level6,
  Level7,
  Level8,
  Level9,
  Level10,
  Level11,
  Level12,
  Level13,
  Level14,
  Level15,
  Level16,
  Level17,
  Level18,
  Level19,
  Level20,
];

export const setBowlsByLevel = (level: number) => {
  return levelImages[level - 1] || Level20;
};