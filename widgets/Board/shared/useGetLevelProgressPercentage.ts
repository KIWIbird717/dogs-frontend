import { useAppSelector } from "@/shared/lib/redux-store/hooks";
import { GameServiceTypes } from "@/shared/lib/services/game/types";
import { useEffect, useState } from "react";

export const useGetLevelProgressPercentage = (balance: number) => {
  const [percentage, setPercentage] = useState<number | "max">(0);

  const level = useAppSelector((store) => store.user.level);
  const levels = useAppSelector((store) => store.game.levels);

  useEffect(() => {
    if (level === null || level === undefined) return;
    if (levels === null || levels === undefined) return;

    const balanceFrom = levels[level as GameServiceTypes.LeagueLevels];
    const balanceTo = levels[(level + 1) as GameServiceTypes.LeagueLevels] || null;

    if (!balanceTo) return;

    // если максимальный уровень
    if (!balanceTo) setPercentage("max");

    setPercentage(((balance - balanceFrom) / (balanceTo - balanceFrom)) * 100);
  }, [balance, level, levels]);

  return percentage;
};
