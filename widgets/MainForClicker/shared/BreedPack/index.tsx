"use client";

import { FC, useEffect } from "react";
import { LocalStorageKeys } from "@/shared/constants/localstorage-keys";
import { useState } from "react";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux-store/hooks";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";

const MotionButton = dynamic(() => import("framer-motion").then((mod) => mod.motion.button));

type BreedPackLocalStorage = {
  lastUpdate: Date | string;
  bagsPerDay: number;
  caught: number;
};

// utils/randomIntervals.ts
const getRandomIntervals = (count: number, duration: number): number[] => {
  const intervals: number[] = [];
  let totalTime = 0;

  for (let i = 0; i < count; i++) {
    const randomTime = Math.random() * (duration / count);
    totalTime += randomTime;
    intervals.push(totalTime);
  }

  return intervals;
};

const TOTAL_NOTIFICATIONS = 7;
const DAY_DURATION = 24 * 60 * 60 * 1000; // Миллисекунды в дне
const NOTIFICATION_DURATION = 5 * 1000; // 5 секунд

type BreedPackProps = {
  onPackClick?: () => void;
};
export const BreedPack: FC<BreedPackProps> = (props) => {
  const dispatch = useAppDispatch();
  const maxBoost = useAppSelector((store) => store.user.energyLimit);
  const [notificationVisible, setNotificationVisible] = useState(true);
  const [lastShownTime, setLastShownTime] = useLocalStorage<number>("lastShownTime", 0);
  const [notificationsLeft, setNotificationsLeft] = useLocalStorage<number>(
    "notificationsLeft",
    TOTAL_NOTIFICATIONS,
  );

  const handleMissPack = () => {
    if (!notificationVisible) return; // если пак уже забрали

    setNotificationVisible(false);
    setNotificationsLeft(notificationsLeft - 1);
    dispatch(UserSlice.setCurrentBoost(maxBoost));
    toast.success("Boost restored");
  };

  const handleClickPack = () => {
    props.onPackClick && props.onPackClick();
    setNotificationVisible(false);
    setNotificationsLeft(notificationsLeft - 1);
  };

  useEffect(() => {
    const now = Date.now();

    // Если день сменился, сбросить уведомления
    if (now - lastShownTime > DAY_DURATION) {
      setNotificationsLeft(TOTAL_NOTIFICATIONS);
      setLastShownTime(now);
    }

    if (notificationsLeft > 0) {
      const intervals = getRandomIntervals(notificationsLeft, DAY_DURATION);

      const timers = intervals.map((interval) => {
        return setTimeout(() => {
          setNotificationVisible(true);

          setTimeout(() => {
            handleMissPack();
          }, NOTIFICATION_DURATION);
        }, interval);
      });

      return () => {
        timers.forEach((timer) => clearTimeout(timer));
      };
    }
  }, [lastShownTime, notificationsLeft, setNotificationsLeft, setLastShownTime]);

  /**
   * Handle breed pack logic
   */
  useEffect(() => {
    console.log(localStorage.getItem(LocalStorageKeys.BreedPack));
  }, [window.localStorage.getItem(LocalStorageKeys.BreedPack)]);

  return (
    <div className="absolute h-full w-full">
      {notificationVisible && (
        <MotionButton
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={handleClickPack}
          className="animate-bounce"
        >
          <img src={"images/breed-pack.png"} alt="breed-pack" />
        </MotionButton>
      )}
    </div>
  );
};
