import { Button } from "@/shared/ui/Button/Button";
import dynamic from "next/dynamic";
import React, { FC } from "react";
import BoostIcon from "@/public/images/svg/modal/boosts/boost.svg";
import PrizeIcon from "@/public/images/svg/modal/prize.svg";
import { Typography } from "@/shared/ui/Typography/Typography";
import ConfettiAnimation from "@/public/gifs/confetti.gif";

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div));

type PackPrizeModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onTakePrise?: () => void;
};
export const PackPrizeModal: FC<PackPrizeModalProps> = (props) => {
  return (
    <>
      {props.isOpen && (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed left-0 top-0 z-[120] flex h-svh w-full items-center justify-center bg-[#000]/30"
          onClick={props.onClose}
        >
          <MotionDiv
            initial={{ opacity: 0, y: 464 }}
            animate={{ opacity: 1, y: -30 }}
            exit={{ opacity: 0, y: 464 }}
            className="shadow-fix relative mx-3 flex w-full flex-col gap-8 rounded-xl border border-black-300 bg-black-750 p-5 shadow-buttonNoAccent backdrop-blur-lg"
          >
            <div className="flex w-full flex-col gap-4">
              <Button
                className={"leading-4.5 h-[18px] w-fit !p-0 text-[15px] font-normal"}
                onClick={props.onClose}
              >
                Cancel
              </Button>

              <BoostIcon />

              <Typography
                tag={"p"}
                className={"text-[32px] font-bold leading-[38px] text-white-900"}
              >
                Congratulations!
              </Typography>

              <Typography tag={"h2"} className={"font-normal text-white-900"}>
                You caught the Turbo Bowl
              </Typography>

              <Typography tag={"h3"} className={"font-normal text-white-800"}>
                The center button goes into turbo mode for 20 seconds and each tap x5 points.
              </Typography>
            </div>

            <ProseButton onTakePrise={props.onTakePrise} />
          </MotionDiv>
        </MotionDiv>
      )}
    </>
  );
};

type ProseButtonProps = {
  onTakePrise?: () => void;
};
const ProseButton: FC<ProseButtonProps> = (props) => {
  return (
    <Button
      variant={"deepBlue"}
      className="relative flex items-center justify-center gap-3 text-[18px] font-bold leading-6 text-white-900"
      onClick={props.onTakePrise}
    >
      <img
        src={ConfettiAnimation.src}
        alt="confetti-animation"
        className="absolute left-[32%] top-[50%] z-[130] h-[150px] min-h-[150px] w-[150px] translate-x-[-50%] translate-y-[-50%]"
      />
      <PrizeIcon />
      Take the prize
    </Button>
  );
};
