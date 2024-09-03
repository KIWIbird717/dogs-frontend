import { useEffect, useState } from "react";
import { getNextLevelValue } from "@/shared/lib/utils/getNextLevelValue";
import { useUser } from "@/shared/hooks/useUser";
export const useProgressBar = (
  currentBalance: number,
  balanceTo: number,
) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const percent = Math.round(currentBalance / balanceTo  * 100);
    setPercentage(percent);
  }, [balanceTo, currentBalance]);

  return {
    percentage,
    nextLevelBalance: balanceTo,
    balance: currentBalance,
  };
};
