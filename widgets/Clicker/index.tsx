import { FC, MouseEvent, TouchEvent, TouchEventHandler, useEffect, useState } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { AnimatePresence } from "framer-motion";
import { Typography } from "@/shared/ui/Typography/Typography";
import { ClickEffect } from "@/shared/hooks/useClicker/useClicker";
import dynamic from "next/dynamic";
import Image from "next/image";
import Level1 from "@/public/images/bowls/level1.png";
import { setBowlsByLevel } from "@/shared/lib/utils/setBowlsByLevel";

const MotionButton = dynamic(() => import("framer-motion").then((mod) => mod.motion.button));

interface IClickerProps {
  handleClick: TouchEventHandler<HTMLButtonElement>;
  level: number;
  tabValue: number;
}

export const Clicker: FC<IClickerProps> = ({ handleClick, level, tabValue }) => {
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
        </div>
      </MotionButton>
    </div>
  );
};
