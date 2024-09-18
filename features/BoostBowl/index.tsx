"use client";

import { FC, ReactNode, useRef } from "react";
import { BoostBowlItem } from "@/widgets/BoostBowlItem";
import { Typography } from "@/shared/ui/Typography/Typography";
import { useBoostsInfo } from "./shared/hooks/useBoostsInfo";

interface IBoostBowlProps {}

export type BoostBowlItemType = {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
};

const isServer = typeof window === "undefined";

export const BoostBowl: FC<IBoostBowlProps> = () => {
  const { firstBowlItems, secondBowlItems } = useBoostsInfo();

  const refBowlsFirst = useRef<HTMLDivElement>(null);
  const refBowlsSecond = useRef<HTMLDivElement>(null);

  if (isServer) return null;

  return (
    <div className={"z-[10] flex w-full flex-col gap-6"}>
      <div ref={refBowlsFirst} className={"flex w-full flex-col gap-2"}>
        <Typography tag={"h3"} className={"text-white-900"}>
          Free Daily Boosts
        </Typography>

        <div className={"flex w-full flex-col gap-2"}>
          {firstBowlItems.map((item, i) => {
            return (
              <BoostBowlItem
                key={i}
                item={item}
                disabled={item.disabled || false}
                onClick={item.onClick}
              />
            );
          })}
        </div>
      </div>

      <div ref={refBowlsSecond} className={"flex w-full flex-col gap-2"}>
        <Typography tag={"h3"} className={"text-white-900"}>
          Boosts
        </Typography>

        <div className={"flex w-full flex-col gap-2"}>
          {secondBowlItems.map((item, i) => {
            return <BoostBowlItem key={i} item={item} onClick={item.onClick} />;
          })}
        </div>
      </div>

      <div
        style={{
          height:
            window?.innerHeight -
            (refBowlsFirst.current?.clientHeight || 0) -
            (refBowlsSecond.current?.clientHeight || 0) -
            142 + // на угад подбирал, лень думать уже, я сонный пипец
            1, // это чтобы скрол в 1 пиксель появлялся на странице
        }}
      />
    </div>
  );
};
