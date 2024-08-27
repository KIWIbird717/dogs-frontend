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
    setEarned(0);
    setTouches(0);
  };

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
      const { data } = await UsersService.addUseMoney({
        touches: touches,
        earned: newCoins,
      });

      dispatch(UserSlice.setBalance(data.balance));
      dispatch(UserSlice.setLevel(data.level));
      onEarnReset();
    } catch (error) {
      logger.error(error);
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

    if (isSetInterval && state.boosts < maxBoost) {
      interval = setInterval(() => {
        // Увеличение бустов на 3 каждую секунду, но не выше maxBoost
        setState((prevState) => ({
          ...prevState,
          boosts: Math.min(prevState.boosts + 3, maxBoost),
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSetInterval, state.boosts]);

  // Обработчик клика, который создает эффект клика и увеличивает заработанные монеты
  const handleClick = useCallback(
    async (event: MouseEvent) => {
      const { clientX, clientY, currentTarget } = event;
      const { left, top } = currentTarget.getBoundingClientRect();

      const x = clientX - left;
      const y = clientY - top;

      // Создание нового эффекта клика с уникальным id
      const newEffect: ClickEffect = { id: Date.now(), x, y };
      setClickEffects((prev) => [...prev, newEffect]);

      await onIncrementEarn(); // Увеличение заработанных монет
      await onIncrementEarn(); // Увеличение заработанных монет

      // Удаление эффекта клика через 1 секунду
      setTimeout(() => {
        setClickEffects((prev) => prev.filter((effect) => effect.id !== newEffect.id));
        setClickEffects((prev) => prev.filter((effect) => effect.id !== newEffect.id));
      }, 1000);
    },
    [onIncrementEarn],
  );

  const onMaxBoost = () => {
    setState((prevState) => ({
      ...prevState,
      boosts: maxBoost,
    }));
  };

  return {
    boosts: state.boosts,
    maxBoost,
    earned: state.earned,
    clickEffects,

    onIncrementEarn,
    handleClick,
    onMaxBoost,
  };
};
