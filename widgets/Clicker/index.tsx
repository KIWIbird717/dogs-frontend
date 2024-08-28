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
  level: number;
}

export const Clicker: FC<IClickerProps> = ({ handleClick, clickEffects, level }) => {
  const [image, setImage] = useState(Level20);

  useEffect(() => {
    const bowl = setBowlsByLevel(level);
    setImage(bowl);
  }, [level]);

  return (
    <div className={"flex w-full justify-center"}>
      <Button
        onClick={handleClick}
        className={
          "h-full max-h-[296px] w-full max-w-[296px] rounded-[52px] bg-gradient-button-accent p-4 shadow-buttonSec"
        } /*h-[296px] w-[296px]*/
      >
        <div
          className={
            "relative flex h-full w-full items-center justify-center rounded-[42px] bg-gradient-button-sec" /*h-[264px] w-[264px]*/
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
