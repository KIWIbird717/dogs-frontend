import { useEffect, useState } from "react";
import { getNextLevelValue } from "@/shared/lib/utils/getNextLevelValue";
import { useUser } from "@/shared/hooks/useUser";
import { useAppSelector } from "../lib/redux-store/hooks";

export const useProgressBar = () => {
  const { user } = useUser();
  const { level, balance } = user;
  const [percentage, setPercentage] = useState(0);
  const { levels } = useAppSelector((store) => store.game);
  const { nextLevelBalance } = getNextLevelValue(level, levels);

  useEffect(() => {
    const percent = Math.round((balance / nextLevelBalance) * 100);
    setPercentage(percent);
  }, [balance, level, nextLevelBalance]);

  return {
    percentage,
    nextLevelBalance,
    balance,
  };
};
