import { FC, TouchEventHandler, useEffect, useState } from "react";
import { useAnimationControls } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import Level1 from "@/public/images/bowls/level1.png";
import { setBowlsByLevel } from "@/shared/lib/utils/setBowlsByLevel";

const MotionButton = dynamic(() => import("framer-motion").then((mod) => mod.motion.button));
const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div));

interface IClickerProps {
  handleClick: TouchEventHandler<HTMLButtonElement>;
  level: number;
  tabValue: number;
}

export const Clicker: FC<IClickerProps> = ({ handleClick, level, tabValue }) => {
  const controls = useAnimationControls();
  const [image, setImage] = useState(Level1);
  const [isClickAvailable, setIsClickAvailable] = useState(true);

  useEffect(() => {
    (async () => {
      const bowl = setBowlsByLevel(level);
      setImage(bowl);

      setIsClickAvailable(false);
      await controls.start({ scale: 1.5, transition: { duration: 0.2 } });
      await controls.start({ scale: 1 });
      setIsClickAvailable(true);
    })();
  }, [level]);

  return (
    <div className={"flex h-full w-full justify-center"}>
      <MotionButton
        whileTap={{ scale: isClickAvailable ? 0.95 : 1 }}
        transition={{ type: "spring", bounce: 20, stiffness: 2000 }}
        onTouchEnd={(event) => {
          if (isClickAvailable) handleClick(event);
        }}
        className={
          "h-fit max-h-[296px] w-fit max-w-[296px] rounded-[52px] bg-gradient-button-accent p-4 shadow-buttonSec"
        }
      >
        <div
          className={
            "relative flex max-h-[264px] max-w-[264px] items-center justify-center rounded-[42px] bg-gradient-button-sec" /*h-[264px] w-[264px]*/
          }
        >
          <MotionDiv className="max-h-full max-w-full object-cover" animate={controls}>
            <Image
              src={image}
              alt={`bowl-${level}`}
              className={"max-h-full max-w-full object-cover"}
              layout="responsive"
              width={100}
              height={100}
            />
          </MotionDiv>
        </div>
      </MotionButton>
    </div>
  );
};
