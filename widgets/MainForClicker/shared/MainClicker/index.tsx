"use client";

import { useMemo, useState } from "react";
import { Board } from "@/widgets/Board";
import { StatsInfo } from "@/widgets/StatsInfo";
import { Clicker } from "../ui/Clicker";
import { EnergyBoost } from "@/widgets/EnergyBoost";
import { useClicker } from "@/shared/hooks/useClicker/useClicker";
import { useAppSelector } from "@/shared/lib/redux-store/hooks";
import { BreedPack } from "../BreedPack";
import styles from "./styles.module.scss";
import { cn } from "@/shared/lib/utils/cn";
import { CoinEffect } from "../CoinEffect";
import { PackPrizeModal } from "../PackPrizeModal";
import toast from "react-hot-toast";

export const MainClicker = () => {
  const [isPackModalOpen, setIsPackModalOpen] = useState(false);
  const { clickEffects, handleClick, tabValue, maxBoost, boosts, earned, onMaxBoost } =
    useClicker(true);

  const balance = useAppSelector((store) => store.user.balance);
  const level = useAppSelector((store) => store.user.level);
  const currentBalance = useMemo(() => balance + earned, [earned, balance]);

  const handleTakePrise = () => {
    onMaxBoost();
    setIsPackModalOpen(false);
    toast.success("Boost restored");
  };

  return (
    <div className={"relative flex h-screen flex-col justify-between gap-8"}>
      <PackPrizeModal
        isOpen={isPackModalOpen}
        onClose={() => setIsPackModalOpen(false)}
        onTakePrise={handleTakePrise}
      />

      <div className="flex w-full flex-col gap-8">
        <div className={cn(styles.boardStatsWrapper, "flex w-full flex-col")}>
          <Board />
          <StatsInfo value={currentBalance} isIcon />
        </div>

        <div className="relative h-full w-full">
          <BreedPack onPackClick={() => setIsPackModalOpen(true)} />
          <CoinEffect tabValue={tabValue} clickEffects={clickEffects} />
          <Clicker handleClick={handleClick} level={level} />
        </div>
      </div>

      <EnergyBoost
        className="absolute bottom-[60px]"
        boosts={boosts}
        maxBoost={maxBoost}
        onMaxBoost={onMaxBoost}
      />
    </div>
  );
};
