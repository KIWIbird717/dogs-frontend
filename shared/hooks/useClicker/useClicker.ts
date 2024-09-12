"use client";

import { MouseEvent, TouchEvent, useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import { UsersService } from "@/shared/lib/services/users/users";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux-store/hooks";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";
import { useLocalStorage } from "../useLocalStorage";
import { LocalStorageKeys } from "@/shared/constants/localstorage-keys";

export interface ClickEffect {
  id: number;
  x: number | string;
  y: number | string;
}

const HZ_VARIABLE_NET_VREMENY_DEBAZHIT_NO_TAK_RABOTAET = 1;

export const useClicker = (isSetInterval?: boolean) => {
  const dispatch = useAppDispatch();
  const logger = new Logger("useClicker");
  const currentBoost = useAppSelector((store) => store.user.currentBoost);
  const [boostsLS, setBoostsLS] = useLocalStorage<{
    boost: number;
    time: string;
  } | null>(LocalStorageKeys.Clicker, {
    boost: currentBoost,
    time: new Date().toString(),
  });

  const energyLimit = useAppSelector((store) => store.user.energyLimit);
  const rechargeMultiplication = useAppSelector((store) => store.user.rechargeMultiplication);
  const tapMultiplication = useAppSelector((store) => store.user.tapMultiplication);
  const tapBotExpired = useAppSelector((store) => store.user.tapBotExpired);
  const levels = useAppSelector((store) => store.game.levels);
  const balance = useAppSelector((store) => store.user.balance);

  const tabValue = 1 * rechargeMultiplication * tapMultiplication;

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
        startTimestamp: new Date(clickEffectValue || new Date().getTime()),
        taps: touches,
      });

      dispatch(UserSlice.setBalance(data.balance));
      dispatch(UserSlice.setLevel(data.level));

      setState({ earned: 0, touches: 0 });
      setDateNow([]);
    } catch (error) {
      logger.error(error);
    }
  };

  const debouncedSendEarned = useCallback(debounce(sendCoins, 2000), []);

  const onIncrementEarn = useCallback(
    async (dateNowValue: number) => {
      if (boostsLS?.boost && boostsLS.boost > 1) {
        const newEarned = state.earned + tabValue;
        const newTouches = state.touches + 1;

        setState({ earned: newEarned, touches: newTouches });
        setBoostsLS({ time: Date.now().toString(), boost: currentBoost - 1 });
        dispatch(UserSlice.setCurrentBoost(currentBoost - 1));
        debouncedSendEarned(dateNowValue, newTouches);

        const currentBalance = balance + state.earned;

        let userLevel = 1;

        if (!levels) return;

        for (const [level, requiredExperience] of Object.entries(levels)) {
          if (
            currentBalance >=
            requiredExperience - HZ_VARIABLE_NET_VREMENY_DEBAZHIT_NO_TAK_RABOTAET
          ) {
            userLevel = Number(level);
          } else {
            break;
          }
        }

        dispatch(UserSlice.updateUser({ level: userLevel }));
      }
    },
    [currentBoost, state.earned, state.touches, dispatch, debouncedSendEarned],
  );

  useEffect(() => {
    if (!isSetInterval || currentBoost >= maxBoost) return;

    const interval = setInterval(() => {
      const energyIncome = 1 * rechargeMultiplication * tapMultiplication;
      const newBoost = Math.min(currentBoost + energyIncome, maxBoost);

      setBoostsLS({ time: Date.now().toString(), boost: newBoost });
      dispatch(UserSlice.setCurrentBoost(newBoost));
    }, 1000);

    return () => clearInterval(interval);
  }, [
    isSetInterval,
    currentBoost,
    maxBoost,
    rechargeMultiplication,
    tapMultiplication,
    dispatch,
    setBoostsLS,
  ]);

  const handleClick = useCallback(
    async (event: TouchEvent) => {
      let newEffect: ClickEffect;

      for (let index = 0; index <= event.touches.length; index++) {
        if (index >= 5) return;
        const energyIncome = 1 * rechargeMultiplication * tapMultiplication;
        if (boostsLS?.boost && boostsLS.boost < energyIncome + 1) return; // если не хватает энергии на тап

        const { currentTarget } = event;
        const { clientX, clientY } = event.changedTouches.item(index);
        const { left, top } = currentTarget.getBoundingClientRect();

        const x = clientX - left;
        const y = clientY - top;

        newEffect = { id: Date.now(), x, y };

        setDateNow((prev) => [...prev, newEffect.id]);
        setClickEffects((prev) => [...prev, newEffect]);

        onIncrementEarn(dateNow[0]);
      }
    },
    [boostsLS?.boost, dateNow, onIncrementEarn, rechargeMultiplication, tapMultiplication],
  );

  /**
   * Clear click effects
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setClickEffects((prev) => prev.filter((effect) => effect.id > Date.now() - 3000));
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  /**
   * Passive income
   */
  useEffect(() => {
    const isTapbotActive = new Date(tapBotExpired).getTime() > new Date().getTime();
    if (!isTapbotActive) return;

    const interval = setInterval(() => {
      if (currentBoost < tabValue) return; // если не хватает энергии на тап

      const x = "50%";
      const y = "50%";
      const newEffect = { id: Date.now(), x, y };

      setDateNow((prev) => [...prev, newEffect.id]);
      setClickEffects((prev) => [...prev, newEffect]);

      onIncrementEarn(dateNow[0]);
    }, 800);

    return () => {
      clearInterval(interval);
    };
  }, [dateNow, onIncrementEarn, tapBotExpired]);

  const onMaxBoost = useCallback(() => {
    dispatch(UserSlice.setCurrentBoost(maxBoost));
  }, [maxBoost]);

  return {
    boosts: currentBoost,
    maxBoost,
    tabValue,
    earned: state.earned,
    clickEffects,
    onIncrementEarn,
    handleClick,
    onMaxBoost,
  };
};
