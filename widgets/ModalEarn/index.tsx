"use client";

import { FC, MouseEvent } from "react";
import { useModal } from "@/shared/hooks/useModal";
import { Button } from "@/shared/ui/Button/Button";
import { Typography } from "@/shared/ui/Typography/Typography";
import { formatNumber } from "@/shared/lib/utils/formatNumber";
import { AnimatePresence, motion } from "framer-motion";
import { TotalCoin } from "@/shared/ui/TotalCoin";
import { TasksApiTypes } from "@/shared/lib/services/tasks/types";
import YoutubeIcon from "@/public/images/svg/earn/youtube.svg";
import TwitterIcon from "@/public/images/svg/earn/x.svg";
import NFTIcon from "@/public/images/svg/earn/nft.svg";
import { useRouter } from "next/navigation";

interface IModalEarnProps {
}

export const ModalEarn: FC<IModalEarnProps> = () => {
  const { push } = useRouter();
  const { onClose, modalData } = useModal();
  const { isOpen, data, type } = modalData;

  const isModalOpen = isOpen && type === "earn";

  const coin = formatNumber(data ? data?.task?.amount! : 0);

  const onCloseHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const buttonName = data?.task?.type === TasksApiTypes.TaskTypeEnum.YOUTUBE
    ? "Watch Video"
    : data?.task?.type === TasksApiTypes.TaskTypeEnum.XTWITTER
      ? "Share us at X"
      : "Start";

  const onSubmit = () => {
    push(data?.task?.link!);
  };

  return (
    <AnimatePresence initial={true}>
      {isModalOpen && (
        <div
          className={
            "fixed left-0 top-0 z-[100] flex h-full w-full flex-col items-center justify-end bg-[#000]/30"
          }
          onClick={onCloseHandler}
        >
          <motion.div
            initial={{ opacity: 0, y: 464 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 464 }}
            transition={{ duration: 0.4 }}
            className={
              "relative z-[11] flex w-full flex-col gap-8 rounded-xl border border-black-300 bg-black-750 p-4 pb-20 shadow-buttonNoAccent backdrop-blur-lg"
            }
            key="audioPlayer"
          >
            <div className={"flex w-full flex-col gap-4"}>
              <Button
                className={"leading-4.5 h-[18px] w-fit !p-0 text-[15px] font-normal"}
                onClick={onClose}
              >
                Cancel
              </Button>

              <div>
                {data?.task?.type === TasksApiTypes.TaskTypeEnum.YOUTUBE
                  ? <YoutubeIcon />
                  : data?.task?.type === TasksApiTypes.TaskTypeEnum.XTWITTER
                    ? <TwitterIcon />
                    : <NFTIcon />}
              </div>

              <Typography
                tag={"p"}
                className={"text-[32px] font-bold leading-[38px] text-white-900"}
              >
                {data?.task?.name}
              </Typography>
              <Typography tag={"h2"} className={"font-normal text-white-900"}>
                What need to do?
              </Typography>
              <Typography tag={"h3"} className={"font-normal text-white-800"}>
                {data?.task?.desc}
              </Typography>

              <div
                className={
                  "flex h-[56px] w-full items-center gap-4 rounded-xl border border-blue-800 p-3"
                }
              >
                <Typography tag={"span"} className={"text-white-800"}>
                  Reward
                </Typography>
                <div className={"flex items-center gap-1"}>
                  <TotalCoin
                    coin={coin}
                    isPlus
                    tag={"h2"}
                    size={"middle"}
                    classNameText={"font-bold text-[24px] leading-8"}
                  />
                </div>

                <Typography
                  tag={"span"}
                  className={"text-[15px] font-normal leading-[18px] text-white-800"}
                >
                  Every 24 Hours
                </Typography>
              </div>
            </div>
            <div>
              {/*<Field*/}
              {/*  onChange={() => {*/}
              {/*  }}*/}
              {/*  isError={false}*/}
              {/*  placeholder={"Attach File"}*/}
              {/*  type={"file"}*/}
              {/*  buttonClassName={"h-[56px]"}*/}
              {/*/>*/}

              <Button onClick={onSubmit}
                      variant={"deepBlue"}
                      className={"text-[18px] font-bold leading-6 text-white-900"}
                      disabled={data?.task?.isCompleted}
              >
                {buttonName}
              </Button>
            </div>

            {/*<div*/}
            {/*  className={"w-full h-full absolute left-0 top-0  rounded-xl z-[-1]"} />*/}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
