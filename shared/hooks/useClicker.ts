import { useCallback, useEffect, useState } from "react";

export const useClicker = (isSetInterval?: boolean) => {
  const [coins, setCoins] = useState(27139454);

  const [boosts, setBoosts] = useState(200);
  const maxBoost = 500;

  const onMaxBoost = () => {
    setBoosts(maxBoost);
  };

  const onIncrementCoin = () => {
    if (boosts > 2) {
      setCoins((prevCoins) => prevCoins + 2);
      onDecrementBoost();
    }
  };

  const onIncrementBoost = useCallback(() => {
    setBoosts((prevBoosts) => Math.min(prevBoosts + 3, maxBoost));
  }, []);

  const onDecrementBoost = useCallback(() => {
    setBoosts((prevBoosts) => Math.max(prevBoosts - 2, 0));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isSetInterval) {
      interval = setInterval(() => {
        if (boosts < maxBoost) {
          onIncrementBoost();
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [boosts, isSetInterval, onIncrementBoost]);

  return {
    boosts,
    maxBoost,
    coins,
    onIncrementCoin,
    onIncrementBoost,
    onDecrementBoost,
    onMaxBoost,
  };
};
