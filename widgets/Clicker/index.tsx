import { FC, MouseEvent } from "react";
import { Button } from "@/shared/ui/Button/Button";
import BoneIcon from "@/public/images/svg/boneBig.svg";
import { AnimatePresence, motion } from "framer-motion";
import { Typography } from "@/shared/ui/Typography/Typography";
import { ClickEffect } from "@/shared/hooks/useClicker";


interface IClickerProps {
  handleClick: (event: MouseEvent) => void;
  clickEffects: ClickEffect[];
}

export const Clicker: FC<IClickerProps> = (
  {
    handleClick,
    clickEffects,
  },
) => {
  return (
    <div className={"flex w-full justify-center"}>
      <Button onClick={handleClick}
              className={"h-[296px] w-[296px] rounded-[52px] bg-gradient-button-accent shadow-buttonSec"}
      >
        <div
          className={
            "relative flex h-[264px] w-[264px] items-center justify-center rounded-[42px] bg-gradient-button-sec"
          }
        >
          <BoneIcon />
          <AnimatePresence>
            {clickEffects.map((effect) => (
              <motion.div
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
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Button>
    </div>
  );
};
