import { FC, TouchEventHandler, useEffect, useState } from "react";
import { useAnimationControls } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import Level1 from "@/public/images/bowls/level1.png";
import { setBowlsByLevel } from "@/shared/lib/utils/setBowlsByLevel";
import { LocalstorageKeys } from "@/shared/constants/localstorage-keys";

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

      // if localstorage is empty
      const levelBeforeBowlUpdate = localStorage.getItem(LocalstorageKeys.LevelBeforeBowlUpdate);
      if (!levelBeforeBowlUpdate) {
        localStorage.setItem(LocalstorageKeys.LevelBeforeBowlUpdate, `${level}`);
      }

      const isAnimationAvailable =
        parseInt(localStorage.getItem(LocalstorageKeys.LevelBeforeBowlUpdate) || "0") !== level;
      if (isAnimationAvailable) {
        setIsClickAvailable(false);
        await controls.start({ scale: 1.5, transition: { duration: 0.2 } });
        await controls.start({ scale: 1 });
        setIsClickAvailable(true);
        // update level before bowl update
        localStorage.setItem(LocalstorageKeys.LevelBeforeBowlUpdate, `${level}`);
      }
    })();
  }, [level]);

  const handleButtonClick: TouchEventHandler<HTMLButtonElement> = (event) => {
    if (!isClickAvailable) return;
    handleClick(event);
  };

  return (
    <div className={"flex h-full w-full justify-center"}>
      <button
        // whileTap={{ scale: isClickAvailable ? 0.95 : 1 }}
        // transition={{ type: "spring", bounce: 20, stiffness: 2000 }}
        onTouchEnd={handleButtonClick}
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
      </button>
    </div>
  );
};
