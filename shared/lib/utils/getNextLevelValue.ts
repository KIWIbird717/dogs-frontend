const levels = [
  200, 500, 1000, 2500, 5000, 10000, 25000, 50000, 75000, 100000, 200000, 300000, 400000, 500000,
  600000, 700000, 800000, 900000, 1000000, 2000000,
];

export const getNextLevelValue = (level: number) => {
  const index = level - 1;

  const nextLevelBalance = levels[level + 1];
  const currentLevelBalance = levels[index];

  return {
    currentLevelBalance,
    nextLevelBalance,
  };
};
