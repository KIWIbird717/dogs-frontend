import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import { UsersService } from "@/shared/lib/services/users/users";
import { useAppDispatch } from "@/shared/lib/redux-store/hooks";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";

export const useClicker = (isSetInterval?: boolean) => {
  const dispatch = useAppDispatch();
  const logger = new Logger("useClicker");

  const [earned, setEarned] = useState(0);
  const [touches, setTouches] = useState(0);
  const [boosts, setBoosts] = useState(200);
  const maxBoost = 500;

  const onTouchesInc = () => setTouches(touches + 1);


  const onMaxBoost = () => {
    setBoosts(maxBoost);
  };

  const onEarnReset = () => {
    setEarned(0)
    setTouches(0);
  }

  const onIncrementEarn = async () => {
    if (boosts > 2) {
      setEarned((prevCoins) => prevCoins + 2);
      onTouchesInc();
      onDecrementBoost();

      await debouncedSendEarned(earned + 2, touches + 1);
    }
  };

  const sendCoins = async (newCoins: number, touches: number) => {
    try {
      const {data} = await UsersService.addUseMoney({
        touches: touches,
        earned: newCoins
      })

      dispatch(UserSlice.setBalance(data.balance))
      dispatch(UserSlice.setLevel(data.level))
      onEarnReset();
    } catch (error) {
      logger.error(error)
    }
  };

  const debouncedSendEarned = useCallback(debounce(sendCoins, 4000), []);

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
    coins: earned,
    onIncrementCoin: onIncrementEarn,
    onIncrementBoost,
    onDecrementBoost,
    onMaxBoost,
  };
};