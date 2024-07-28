"use client";

import { FC, MouseEvent } from "react";
import { useModal } from "@/shared/hooks/useModal";
import { ITask } from "@/shared/lib/redux-store/slices/modal-slice/type";
import { Button } from "@/shared/ui/Button/Button";
import { Typography } from "@/shared/ui/Typography/Typography";
import { formatNumber } from "@/shared/lib/utils/formatNumber";
import { AnimatePresence, motion } from "framer-motion";
import { Field } from "@/widgets/Field";
import { TotalCoin } from "@/shared/ui/TotalCoin";

interface IModalEarnProps {
}

export const ModalEarn: FC<IModalEarnProps> = () => {
  const { onClose, modalData } = useModal();
  const { isOpen, data, type } = modalData;
  const { task } = data as { task: ITask };

  const isModalOpen = isOpen && type === "earn";

  const onCloseHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const coin = formatNumber(task?.coin || 0);

  return (
    <AnimatePresence initial={true}>
      {isModalOpen && <div
        className={"w-full h-full flex flex-col justify-end items-center fixed top-0 bg-[#000]/30 left-0 z-[100]"}
        onClick={(e) => onCloseHandler(e)}
      >

        <motion.div initial={{ opacity: 0, y: 464 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 464 }}
                    transition={{ duration: 0.4 }}
                    className={"flex flex-col gap-8 w-full p-4 pb-20 rounded-xl border border-black-300 bg-black-750 backdrop-blur-lg shadow-buttonNoAccent relative z-[11]"}
                    key="audioPlayer"
        >
          <div className={"w-full flex flex-col gap-4"}>
            <Button className={"w-fit h-[18px] !p-0 text-[15px] leading-4.5 font-normal"}
                    onClick={onClose}
            >
              Cancel
            </Button>

            <div>
              {/*TODO: Исправить размер на 32х32, когда реальные данные появятся*/}
              {task.icon}
            </div>

            <Typography tag={"p"}
                        className={"text-[32px] leading-[38px] font-bold text-white-900"}
            >
              {task.title}
            </Typography>
            <Typography tag={"h2"}
                        className={"font-normal text-white-900"}
            >
              {task.title}
            </Typography>
            <Typography tag={"h3"}
                        className={"font-normal text-white-800"}
            >
              {task.title}
            </Typography>

            <div className={"w-full p-3 gap-4 flex items-center h-[56px] rounded-xl border border-blue-800"}>
              <Typography tag={"span"}
                          className={"text-white-800"}
              >
                Reward
              </Typography>
              <div className={"flex items-center gap-1"}>
                <TotalCoin coin={coin}
                           isPlus
                           tag={"h2"}
                           size={"middle"}
                           classNameText={"font-bold text-[24px] leading-8"}
                />
              </div>

              <Typography tag={"span"}
                          className={"font-normal text-[15px] leading-[18px] text-white-800"}
              >
                {/*TODO: Настроить, когда реальные данные появятся*/}
                Every 24 Hours
              </Typography>

            </div>

          </div>
          <div>
            {/*TODO: Настроить, когда реальные данные появятся*/}
            <Field onChange={() => {
            }}
                   isError={false}
                   placeholder={"Attach File"}
                   type={"file"}
                   buttonClassName={"h-[56px]"}
            />

            <Button variant={"deepBlue"}

                    className={"text-[18px] font-bold leading-6 text-white-900"}
            >
              Here must be title
            </Button>
          </div>

          {/*<div*/}
          {/*  className={"w-full h-full absolute left-0 top-0  rounded-xl z-[-1]"} />*/}

        </motion.div>

      </div>
      }
    </AnimatePresence>
  );
};