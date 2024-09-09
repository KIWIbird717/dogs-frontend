"use client";

import { FC, MouseEvent, useEffect, useState } from "react";
import { useModal } from "@/shared/hooks/useModal";
import { Button } from "@/shared/ui/Button/Button";
import { Typography } from "@/shared/ui/Typography/Typography";
import { formatNumber } from "@/shared/lib/utils/formatNumber";
import { AnimatePresence, motion } from "framer-motion";
import { TotalCoin } from "@/shared/ui/TotalCoin";
import { useAppSelector } from "@/shared/lib/redux-store/hooks";

interface IModalBoostsProps {}

export const ModalBoosts: FC<IModalBoostsProps> = () => {
  const { onClose, modalData } = useModal();
  const balance = useAppSelector((store) => store.user.balance);
  const { isOpen, data, type } = modalData;

  const [value, setValue] = useState<number>(data?.boost?.value!);

  useEffect(() => {
    if (data?.boost?.value) {
      setValue(data.boost.value);
    }
  }, [data?.boost]);

  const isModalOpen = isOpen && type === "boosts";

  const formattedPrice = formatNumber(data ? data?.boost?.price! : 0);

  const infoTurbo = data?.boost?.key === "turbo" && `${value}/3 available`;
  const infoFullTank = data?.boost?.key === "full-tank" && `${value}/3 in day`;
  const info =
    data?.boost?.key === "turbo"
      ? infoTurbo
      : data?.boost?.key === "full-tank"
        ? infoFullTank
        : data?.boost?.info;

  const onCloseHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const disabled = balance < data?.boost?.price!;

  const onClickHandler = () => {
    data?.boost?.onClick();
    if (data?.boost?.value) {
      setValue(value - 1);
    }
    onClose();
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
              "shadow-fix relative z-[11] flex w-full flex-col gap-8 rounded-xl border border-black-300 bg-black-750 p-4 pb-20 shadow-buttonNoAccent backdrop-blur-lg"
            }
            key="boosts"
          >
            <div className={"flex w-full flex-col gap-4"}>
              <Button
                className={"leading-4.5 h-[18px] w-fit !p-0 text-[15px] font-normal"}
                onClick={onClose}
              >
                Cancel
              </Button>

              <div>{data?.boost?.icon}</div>

              <Typography
                tag={"p"}
                className={"text-[32px] font-bold leading-[38px] text-white-900"}
              >
                {data?.boost?.title}
              </Typography>
              <Typography tag={"h2"} className={"font-normal text-white-900"}>
                {info}
              </Typography>
              {data?.boost?.description && (
                <Typography tag={"h3"} className={"font-normal text-white-800"}>
                  {data.boost.description}
                </Typography>
              )}

              {data?.boost?.price! && (
                <div
                  className={
                    "flex h-[56px] w-full items-center gap-4 rounded-xl border border-blue-800 p-3"
                  }
                >
                  <Typography tag={"span"} className={"text-white-800"}>
                    Price Boost
                  </Typography>
                  <div className={"flex items-center gap-1"}>
                    <TotalCoin
                      coin={formattedPrice}
                      isPlus
                      tag={"h2"}
                      size={"middle"}
                      classNameText={"font-bold text-[24px] leading-8"}
                    />
                  </div>
                </div>
              )}
            </div>
            <div>
              <Button
                disabled={disabled}
                variant={"deepBlue"}
                className={"text-[18px] font-bold leading-6 text-white-900"}
                onClick={onClickHandler}
              >
                {data?.boost?.buttonTitle}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
