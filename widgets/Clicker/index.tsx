import { FC, MouseEvent, useEffect, useState } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { AnimatePresence } from "framer-motion";
import { Typography } from "@/shared/ui/Typography/Typography";
import { ClickEffect } from "@/shared/hooks/useClicker";
import dynamic from "next/dynamic";
import Image from "next/image";
import Level20 from "@/public/images/bowls/level20.png";
import { setBowlsByLevel } from "@/shared/lib/utils/setBowlsByLevel";

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div));


interface IClickerProps {
  handleClick: (event: MouseEvent) => void;
  clickEffects: ClickEffect[];
  level: number
}

export const Clicker: FC<IClickerProps> = (
  {
    handleClick,
    clickEffects,
    level
  },
) => {
  const [image, setImage] = useState(Level20)
  
  useEffect(() => {
    const bowl = setBowlsByLevel(level)
    setImage(bowl)
  }, [level])
  
  return (
    <div className={"flex w-full justify-center"}>
      <Button onClick={handleClick}
              className={"w-full h-full max-h-[296px] max-w-[296px] p-4 rounded-[52px] bg-gradient-button-accent shadow-buttonSec"} /*h-[296px] w-[296px]*/
      >
        <div
          className={
            "relative flex w-full h-full items-center justify-center rounded-[42px] bg-gradient-button-sec" /*h-[264px] w-[264px]*/
          }
        >
          <Image src={image}
                 alt={`bowl-${level}`}
                 className={"object-cover max-w-full max-h-full"}
                 layout="responsive"
                 width={100}
                 height={100}
          />
          <AnimatePresence>
            {clickEffects.map((effect) => (
              <MotionDiv
                key={effect.id}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: -200 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute text-white text-center text-[28px] font-normal pointer-events-none rounded-xl border-[6px] border-black-400 bg-white-100 backdrop-blur-xl"
                style={{
                  left: effect.x - 40,
                  top: effect.y,
                }}
              >
                <Typography tag={"h1"}
                            className={"text-[28px] leading-8 font-normal"}
                >
                  +2
                </Typography>
              </MotionDiv>
            ))}
          </AnimatePresence>
        </div>
      </Button>
    </div>
  );
};
