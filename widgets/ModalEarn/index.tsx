"use client";

import { FC, MouseEvent, useState } from "react";
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
import { useTelegram } from "@/shared/hooks/useTelegram";
import toast, { Toaster } from "react-hot-toast";
import { TasksService } from "@/shared/lib/services/tasks/stats";
import { AxiosError } from "axios";
import { useAppDispatch } from "@/shared/lib/redux-store/hooks";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";
import { IModalData } from "@/shared/lib/redux-store/slices/modal-slice/type";

interface IModalEarnProps {
  isOpen: boolean;
  data: IModalData | null;
  onClose: () => void;
  onComplete?: (task: TasksApiTypes.TasksDto | null) => void;
}

export const ModalEarn: FC<IModalEarnProps> = (props) => {
  const [isUserOpenLink, setIsUserOpenLink] = useState(false);

  const coin = formatNumber(props.data ? props.data?.task?.amount! : 0);
  const telegram = useTelegram();
  const dispatch = useAppDispatch();

  const onCloseHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  };

  const buttonName =
    props.data?.task?.type === TasksApiTypes.TaskTypeEnum.YOUTUBE
      ? "Watch Video"
      : props.data?.task?.type === TasksApiTypes.TaskTypeEnum.XTWITTER
        ? "Share us at X"
        : "Start";

  const onSubmit = async () => {
    try {
      if (!props.data?.task?.link) {
        return toast.error("Can not open the link");
      }

      telegram?.openLink(props.data?.task?.link!);
      setIsUserOpenLink(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message === "Task is expired") {
          return toast.error("Task is expired");
        }
      }
      toast.error("Can not complete the task");
    }
  };

  const handleCompleteTask = async () => {
    try {
      if (!props.data?.task?.link) {
        return toast.error("Can not finish task");
      }

      const response = await TasksService.setTask(props.data.task.id);

      const earned = Intl.NumberFormat("ja").format(response.data.earned);
      toast.success(`Task complied +${earned} coins`);

      // update user balance
      dispatch(UserSlice.updateUser({ balance: response.data.currentBalance }));

      setIsUserOpenLink(false); // refresh state

      props.onComplete && props.onComplete(props.data.task);
      props.onClose(); // close modal
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message === "Task is expired") {
          return toast.error("Task is expired");
        }
      }
      toast.error("Can not complete the task");
    }
  };

  return (
    <>
      <Toaster />
      <AnimatePresence initial={true}>
        {props.isOpen && (
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
                  onClick={props.onClose}
                >
                  Cancel
                </Button>

                <div>
                  {props.data?.task?.type === TasksApiTypes.TaskTypeEnum.YOUTUBE ? (
                    <YoutubeIcon />
                  ) : props.data?.task?.type === TasksApiTypes.TaskTypeEnum.XTWITTER ? (
                    <TwitterIcon />
                  ) : (
                    <NFTIcon />
                  )}
                </div>

                <Typography
                  tag={"p"}
                  className={"line-clamp-3 text-[32px] font-bold leading-[38px] text-white-900"}
                >
                  {props.data?.task?.name}
                </Typography>
                <Typography tag={"h2"} className={"font-normal text-white-900"}>
                  What need to do?
                </Typography>
                <Typography tag={"h3"} className={"font-normal text-white-800"}>
                  {props.data?.task?.desc}
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
                {isUserOpenLink ? (
                  <Button
                    onClick={handleCompleteTask}
                    variant={"deepBlue"}
                    className={"text-[18px] font-bold leading-6 text-white-900"}
                    disabled={props.data?.task?.isCompleted}
                  >
                    Claim bonus
                  </Button>
                ) : (
                  <Button
                    onClick={onSubmit}
                    variant={"deepBlue"}
                    className={"text-[18px] font-bold leading-6 text-white-900"}
                    disabled={props.data?.task?.isCompleted}
                  >
                    {buttonName}
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
