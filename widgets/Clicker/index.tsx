import { FC, MouseEvent, TouchEvent, TouchEventHandler, useEffect, useState } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { AnimatePresence } from "framer-motion";
import { Typography } from "@/shared/ui/Typography/Typography";
import { ClickEffect } from "@/shared/hooks/useClicker";
import dynamic from "next/dynamic";
import Image from "next/image";
import Level1 from "@/public/images/bowls/level1.png";
import { setBowlsByLevel } from "@/shared/lib/utils/setBowlsByLevel";

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div));
const MotionButton = dynamic(() => import("framer-motion").then((mod) => mod.motion.button));

interface IClickerProps {
  handleClick: TouchEventHandler<HTMLButtonElement>;
  clickEffects: ClickEffect[];
  level: number;
  tabValue: number;
}

export const Clicker: FC<IClickerProps> = ({ handleClick, clickEffects, level, tabValue }) => {
  const [image, setImage] = useState(Level1);

  useEffect(() => {
    const bowl = setBowlsByLevel(level);
    setImage(bowl);
  }, [level]);

  return (
    <div className={"flex h-full w-full justify-center"}>
      <MotionButton
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", bounce: 20, stiffness: 2000 }}
        onTouchEnd={handleClick}
        className={
          "h-fit max-h-[296px] w-fit max-w-[296px] rounded-[52px] bg-gradient-button-accent p-4 shadow-buttonSec"
        } /*h-[296px] w-[296px]*/
      >
        <div
          className={
            "relative flex max-h-[264px] max-w-[264px] items-center justify-center rounded-[42px] bg-gradient-button-sec" /*h-[264px] w-[264px]*/
          }
        >
          <Image
            src={image}
            alt={`bowl-${level}`}
            className={"max-h-full max-w-full object-cover"}
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
                className="pointer-events-none absolute rounded-xl border-[6px] border-black-400 bg-white-100 text-center text-[28px] font-normal text-white backdrop-blur-xl"
                style={{
                  left: effect.x - 40,
                  top: effect.y,
                }}
              >
                <Typography tag={"h1"} className={"text-[28px] font-normal leading-8"}>
                  +{tabValue}
                </Typography>
              </MotionDiv>
            ))}
          </AnimatePresence>
        </div>
      </MotionButton>
    </div>
  );
};
