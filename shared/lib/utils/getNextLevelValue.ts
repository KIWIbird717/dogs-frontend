import { GameSlice } from "../redux-store/slices/game-slice/gameSlice";

export const getNextLevelValue = (level: number, providedLevels: GameSlice.Type["levels"]) => {
  if (!providedLevels) {
    return {
      currentLevelBalance: 0,
      nextLevelBalance: 0,
    };
  }

  const levels = Object.values(providedLevels);

  const index = level - 1;

  const nextLevelBalance = levels[level];
  const currentLevelBalance = levels[index];
  const preLevelBalance = levels[index - 1];

  return {
    currentLevelBalance,
    nextLevelBalance,
    preLevelBalance
  };
};
