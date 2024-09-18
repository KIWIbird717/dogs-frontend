"use client";

import { TouchEvent, useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import { UsersService } from "@/shared/lib/services/users/users";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux-store/hooks";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";
import { useLocalStorage } from "../useLocalStorage";
import { LocalStorageKeys } from "@/shared/constants/localstorage-keys";
import { ClickerSlice } from "@/shared/lib/redux-store/slices/clicker-slice/clickerSlice";

export interface ClickEffect {
  id: number;
  x: number | string;
  y: number | string;
}

const HZ_VARIABLE_NET_VREMENY_DEBAZHIT_NO_TAK_RABOTAET = 1;

export const useClicker = (isSetInterval?: boolean) => {
  const dispatch = useAppDispatch();
  const logger = new Logger("useClicker");
  const currentEnergy = useAppSelector((store) => store.clicker.currentEnergy);

  const [energyLS, setEnergyLS] = useLocalStorage<{
    boost: number;
    time: string;
  } | null>(LocalStorageKeys.Clicker, {
    boost: currentEnergy,
    time: new Date().toString(),
  });

  const levels = useAppSelector((store) => store.game.levels);
  const balance = useAppSelector((store) => store.user.balance);

  const energyLimit = useAppSelector((store) => store.user.boosts.energyLimit.energyLimit);
  const rechargeMultiplication = useAppSelector(
    (store) => store.user.boosts.rechargingSpeed.energyRechargeMultiplication,
  );
  const tapMultiplication = useAppSelector((store) => store.user.boosts.multitap);
  const tapBotExpired = useAppSelector((store) => store.user.boosts.tapBot.activeFor);
  const turboBoostExpired = useAppSelector((store) => store.user.boosts.turbo.activeFor);

  const isTurboBoostActive =
    new Date(turboBoostExpired || new Date()).getTime() > new Date().getTime();

  const tabValue = 1 * tapMultiplication.tapMultiplication;

  const [state, setState] = useState({
    earned: 0,
    touches: 0,
  });
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);
  const [dateNow, setDateNow] = useState<number[]>([]);

  const calculateBoosts = useCallback(() => {
    if (!energyLS) return;

    const currentTime = Date.now();
    const timeElapsed = currentTime - parseInt(energyLS.time, 10);
    const boostsToAdd = Math.floor(timeElapsed / 1000) * 3;

    const newEnergy = Math.min(energyLS.boost + boostsToAdd, energyLimit);

    if (newEnergy > energyLS.boost) {
      dispatch(ClickerSlice.setCurrentEnergy(newEnergy));
      setEnergyLS({ time: currentTime.toString(), boost: newEnergy });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [energyLS, dispatch, energyLimit]);

  useEffect(() => {
    calculateBoosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (energyLS) {
      dispatch(ClickerSlice.setCurrentEnergy(energyLS.boost));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [energyLS]);

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSendEarned = useCallback(debounce(sendCoins, 2000), []);

  const onIncrementEarn = useCallback(
    async (dateNowValue: number) => {
      if (energyLS?.boost && energyLS.boost > 1) {
        const newEarned = state.earned + tabValue * (isTurboBoostActive ? 5 : 1); // при активном turbo boost
        const newTouches = state.touches + 1;

        setState({ earned: newEarned, touches: newTouches });
        setEnergyLS({ time: Date.now().toString(), boost: currentEnergy - tabValue });
        dispatch(ClickerSlice.setCurrentEnergy(currentEnergy));
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

        // обновляем сразу и лигу и уровень, т.к. это одно и тоже
        dispatch(UserSlice.updateUser({ level: userLevel, league: userLevel }));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentEnergy, state.earned, state.touches, dispatch, debouncedSendEarned],
  );

  useEffect(() => {
    if (!isSetInterval || currentEnergy >= energyLimit) return;

    const interval = setInterval(() => {
      const energyIncome = 1 * rechargeMultiplication;
      const newBoost = Math.min(currentEnergy + energyIncome, energyLimit);

      setEnergyLS({ time: Date.now().toString(), boost: newBoost });
      dispatch(ClickerSlice.setCurrentEnergy(newBoost));
    }, 1000);

    return () => clearInterval(interval);
  }, [
    isSetInterval,
    currentEnergy,
    energyLimit,
    rechargeMultiplication,
    tapMultiplication,
    dispatch,
    setEnergyLS,
  ]);

  const handleClick = useCallback(
    async (event: TouchEvent) => {
      let newEffect: ClickEffect;

      for (let index = 0; index <= event.touches.length; index++) {
        if (index >= 5) return;
        if (energyLS?.boost && energyLS.boost < tabValue + 1) return; // если не хватает энергии на тап

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
    [energyLS?.boost, dateNow, onIncrementEarn, rechargeMultiplication, tapMultiplication],
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
      if (currentEnergy < tabValue) return; // если не хватает энергии на тап

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateNow, onIncrementEarn, tapBotExpired]);

  const onMaxBoost = useCallback(() => {
    dispatch(ClickerSlice.setCurrentEnergy(energyLimit));
    setEnergyLS({
      boost: energyLimit,
      time: Date.now().toString(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [energyLimit]);

  return {
    boosts: currentEnergy,
    energyLimit,
    tabValue: tabValue * (isTurboBoostActive ? 5 : 1), // при активном турбо
    earned: state.earned,
    clickEffects,
    onIncrementEarn,
    handleClick,
    onMaxBoost,
  };
};
