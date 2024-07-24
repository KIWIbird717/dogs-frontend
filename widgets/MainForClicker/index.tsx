"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { Header } from "@/widgets/Header";
import { Board } from "@/widgets/Board";
import { Money } from "@/widgets/Money";
import { Clicker } from "@/widgets/Clicker";
import { EnergyBoost } from "@/widgets/EnergyBoost";

interface IMainForClickerProps {
}

export const MainForClicker: FC<IMainForClickerProps> = () => {
  const [coins, setCoins] = useState(27139454);
  const [boosts, setBoosts] = useState(500);
  const maxBoost = 500;

  const onIncrementCoin = () => {
    if (boosts > 2) {
      setCoins(prevCoins => prevCoins + 2);
      onDecrementBoost();
    }
  };

  const onIncrementBoost = useCallback(() => {
    setBoosts(prevBoosts => Math.min(prevBoosts + 3, maxBoost));
  }, []);

  const onDecrementBoost = useCallback(() => {
    setBoosts(prevBoosts => Math.max(prevBoosts - 2, 0));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (boosts < maxBoost) {
        onIncrementBoost();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [boosts, onIncrementBoost]);


  return (
    <div className={"w-full h-full flex flex-col gap-4 px-4 z-[10]"}>
      <Header />

      <div className={"flex h-full flex-col justify-between gap-8"}>
        <div className={"w-full flex flex-col gap-8"}>
          <div className={"w-full flex flex-col gap-6"}>
            <Board />
            <Money coins={coins} />
          </div>

          <Clicker onIncrementCoin={onIncrementCoin} />
        </div>

        <EnergyBoost boosts={boosts}
                     maxBoost={maxBoost}
        />
      </div>
    </div>
  );
};