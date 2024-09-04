import { useAppSelector } from "@/shared/lib/redux-store/hooks";
import { GameServiceTypes } from "@/shared/lib/services/game/types";

export const useGetLevelProgressPercentage = () => {
  const { level, balance } = useAppSelector((store) => store.user);
  const { levels } = useAppSelector((store) => store.game);

  if (!level) return 0;
  if (!levels) return 0;

  const balanceFrom = levels[level as GameServiceTypes.LeagueLevels];
  const balanceTo = levels[(level + 1) as GameServiceTypes.LeagueLevels] || null;

  // если максимальный уровень
  if (!balanceTo) return "max";

  const percentage = ((balance - balanceFrom) / (balanceTo - balanceFrom)) * 100;

  return percentage;
};
