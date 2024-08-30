import { MouseEvent, useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import { UsersService } from "@/shared/lib/services/users/users";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux-store/hooks";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";
import { useLocalStorage } from "@uidotdev/usehooks";

export interface ClickEffect {
  id: number;
  x: number;
  y: number;
}

export const useClicker = (isSetInterval?: boolean) => {
  const dispatch = useAppDispatch();
  const logger = new Logger("useClicker");
  const [boostsLS, setBoostsLS] = useLocalStorage<{
    boost: number;
    time: string;
  } | null>("lastBoostTime", null);

  const { energyLimit, currentBoost } = useAppSelector((state) => state.user);

  const [state, setState] = useState({
    earned: 0,
    touches: 0,
  });
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);
  const [dateNow, setDateNow] = useState<number[]>([]);

  const maxBoost = energyLimit;

  const calculateBoosts = useCallback(() => {
    if (!boostsLS) return;

    const currentTime = Date.now();
    const timeElapsed = currentTime - parseInt(boostsLS.time, 10);
    const boostsToAdd = Math.floor(timeElapsed / 1000) * 3;

    const newBoost = Math.min(boostsLS.boost + boostsToAdd, maxBoost);

    if (newBoost > boostsLS.boost) {
      dispatch(UserSlice.setCurrentBoost(newBoost));
      setBoostsLS({ time: currentTime.toString(), boost: newBoost });
    }
  }, [boostsLS, dispatch, maxBoost]);

  useEffect(() => {
    calculateBoosts();
  }, []);

  useEffect(() => {
    if (boostsLS) {
      dispatch(UserSlice.setCurrentBoost(boostsLS.boost));
    }
  }, [boostsLS]);

  const sendCoins = async (clickEffectValue: number, touches: number) => {
    try {
      const { data } = await UsersService.addUseMoney({
        startTimestamp: new Date(clickEffectValue),
        taps: touches,
      });

      dispatch(UserSlice.setBalance(data.balance));
      dispatch(UserSlice.setLevel(data.level));
      // TODO: добавить, когда исправят на беке
      // dispatch(UserSlice.setLevel(data.serverEnergy));
      setState({ earned: 0, touches: 0 });
      setDateNow([]);
    } catch (error) {
      logger.error(error);
    }
  };

  const debouncedSendEarned = useCallback(debounce(sendCoins, 4000), []);

  const onIncrementEarn = useCallback(async (dateNowValue: number) => {
    if (currentBoost > 2) {
      const newEarned = state.earned + 1;
      const newTouches = state.touches + 1;

      setState({ earned: newEarned, touches: newTouches });
      setBoostsLS({ time: Date.now().toString(), boost: currentBoost - 2 });
      dispatch(UserSlice.setCurrentBoost(currentBoost - 2));

      await debouncedSendEarned(dateNowValue, newTouches);
    }
  }, [currentBoost, state.earned, state.touches, dispatch, debouncedSendEarned]);

  useEffect(() => {
    if (!isSetInterval || currentBoost >= maxBoost) return;

    const interval = setInterval(() => {
      const newBoost = Math.min(currentBoost + 3, maxBoost);

      setBoostsLS({ time: Date.now().toString(), boost: newBoost });
      dispatch(UserSlice.setCurrentBoost(newBoost));
    }, 1000);

    return () => clearInterval(interval);
  }, [isSetInterval, currentBoost, maxBoost, dispatch, setBoostsLS]);

  const handleClick = useCallback(async (event: MouseEvent) => {
    const { clientX, clientY, currentTarget } = event;
    const { left, top } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    const newEffect: ClickEffect = { id: Date.now(), x, y };

    setDateNow((prev) => [...prev, newEffect.id]);
    setClickEffects((prev) => [...prev, newEffect]);

    await onIncrementEarn(dateNow[0]);

    setTimeout(() => {
      setClickEffects((prev) => prev.filter((effect) => effect.id !== newEffect.id));
    }, 1000);
  }, [dateNow, onIncrementEarn]);

  const onMaxBoost = useCallback(() => {
    setState((prevState) => ({ ...prevState, boosts: maxBoost }));
  }, [maxBoost]);

  return {
    boosts: currentBoost,
    maxBoost,
    earned: state.earned,
    clickEffects,
    onIncrementEarn,
    handleClick,
    onMaxBoost,
  };
};
